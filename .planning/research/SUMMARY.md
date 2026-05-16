# Project Research Summary

**Project:** Tuwa Marketing Website — i18n (Chinese + French)
**Domain:** Static site internationalization
**Researched:** 2026-05-16
**Confidence:** HIGH

## Executive Summary

Adding Chinese and French to the Tuwa marketing site is a well-trodden path with Astro 6's built-in i18n routing. The recommended approach uses zero external i18n libraries: Astro's native locale routing handles URL prefixes (`/zh/`, `/fr/`), a lightweight TypeScript dictionary pattern provides type-safe translations, and the existing `@astrojs/sitemap` auto-generates per-locale entries. The only new npm dependency is `@fontsource/noto-sans-sc` for Chinese font rendering with automatic unicode-range subsetting.

The architecture follows a "props-down" pattern where locale page files are thin wrappers importing translated content and passing it to existing components. Header and Footer self-detect locale from the URL, minimizing changes to the 10+ existing page files. English URLs remain unprefixed (preserving SEO equity), while zh/fr get directory prefixes. Fallback rewrites serve English content for untranslated pages during incremental rollout.

The primary risks are: (1) Chinese font bloat destroying performance if not properly subsetted, (2) hardcoded English strings scattered across 20+ existing component files that will surface as untranslated fragments, and (3) hreflang implementation errors causing SEO traffic loss. All three are well-understood problems with documented prevention strategies.

## Key Findings

### Stack Additions

One new dependency. Everything else is built-in Astro features plus custom TypeScript utilities.

- **@fontsource/noto-sans-sc**: Chinese font with automatic unicode-range subsetting (browser loads only needed character chunks, ~200-400KB per page vs 5-8MB for full file)
- **Astro i18n config** (built-in): Locale routing, URL helpers, fallback rewrites — no package needed
- **TypeScript translation utilities** (~50 lines): Type-safe `t()` function with per-page translation files — no i18n framework needed
- **HreflangTags component** (~15 lines): Uses `getAbsoluteLocaleUrl()` from `astro:i18n`
- **LanguageSwitcher component** (~20 lines): Globe icon + dropdown, plain `<a>` tags, zero JS

### Feature Table Stakes

Non-negotiable for a credible multilingual site:

- **Subdirectory URL routing** (`/zh/`, `/fr/`) — industry standard, best SEO
- **English unprefixed** (`/` = en) — preserves existing rankings
- **hreflang tags on every page** — prevents duplicate content penalties
- **Per-locale `<html lang="">`** — accessibility and search signals
- **Localized meta/OG tags** — correct language in search results and social shares
- **Language switcher in header** — users must actively choose language
- **All 10 pages translated** — partial translation hurts more than no translation
- **CJK font stack** — Chinese text must not render in Times New Roman
- **Localized sitemap** — Google needs hreflang confirmation in sitemap

### Feature Differentiators

Nice-to-haves that elevate the experience:

- **Language detection banner** — non-intrusive suggestion for mismatched browser locale
- **Locale-aware date formatting** — "2026年5月16日" vs "16 mai 2026"
- **Localized App Store badges** — Apple provides official translated badges
- **Per-locale 404 pages** — Cloudflare Pages supports directory-level 404 fallback

### Defer to Later

- Translated OG images (CJK font in satori is complex, ~16MB build asset)
- Blog post translations (blog is empty state currently)
- URL slug translation (marginal SEO benefit, doubles routing complexity)
- Language detection auto-redirect (requires edge runtime, kills static site)

### Architecture Pattern

Props-down pattern: locale page files import translations and pass content as props to shared components. Header/Footer self-detect locale from URL via utility function. Translation files are per-page TypeScript objects (not one monolithic JSON) to keep 500+ word feature pages manageable.

**File structure:**
1. **`src/i18n/`** — config, utils, shared UI strings, per-page translation objects
2. **`src/pages/zh/` and `src/pages/fr/`** — thin wrapper pages importing same layouts/components
3. **`src/components/LanguageSwitcher.astro`** — new shared component
4. **Modified components** — Hero, Header, Footer, SEO, FeatureGrid accept locale/content props

**Key decisions:**
- `prefixDefaultLocale: false` (English stays at `/`, preserves SEO)
- `fallbackType: "rewrite"` (untranslated pages serve English silently, no 404s during rollout)
- Per-page translation files (not monolithic JSON — prevents 2000-line merge conflicts)
- Components stay locale-agnostic (receive content via props, not importing translations themselves)

### Watch Out For

1. **Chinese font bloat** — Use @fontsource/noto-sans-sc with unicode-range subsetting. Never load a full CJK font file (5-20MB). Test on throttled connection.
2. **Hardcoded English strings** — Audit ALL 20+ source files before translation begins. Grep for quoted strings in .astro files, aria-labels, alt texts, meta defaults.
3. **hreflang errors** — Must be bidirectional, use absolute URLs, include self-reference, x-default to English. Generate systematically in SEO component, never manual per-page.
4. **French text expansion (25-35% longer)** — Audit fixed-width elements. Replace `w-[200px]` with flexible sizing. Test with padded pseudo-text before real translations.
5. **prefixDefaultLocale asymmetry** — Always use `getRelativeLocaleUrl()` helper, never hardcode paths. Add `_redirects` for any accidental `/en/` URLs.

## Suggested Build Order

### Phase 1: i18n Infrastructure
**Rationale:** Everything depends on routing config and translation utilities existing first. Zero visible changes — safe and reversible.
**Delivers:** Astro i18n config, translation utility functions, type definitions, CJK font integration
**Addresses:** Routing, font stack, translation architecture
**Avoids:** Pitfall #1 (font bloat), #4 (routing trap), #6 (file architecture)

### Phase 2: Component Extraction
**Rationale:** Existing components have hardcoded English. Must extract strings into t() pattern before creating locale pages. This is the highest-effort task.
**Delivers:** All components accept locale/content props; Header, Footer, SEO component emit locale-aware markup; LanguageSwitcher built
**Addresses:** Language switcher, hreflang, localized nav
**Avoids:** Pitfall #2 (scattered strings), #3 (hreflang errors), #11 (switcher context loss)

### Phase 3: Home Page Localization (Proof of Concept)
**Rationale:** Prove the full pattern end-to-end on one page before scaling to all 10. Catches layout issues with French expansion and CJK rendering early.
**Delivers:** Chinese and French home pages fully working
**Addresses:** Translated content, layout validation
**Avoids:** Pitfall #5 (French expansion), #13 (CJK line breaking)

### Phase 4: Feature Pages (5 pages x 2 locales)
**Rationale:** Largest content volume. Pattern is proven from Phase 3, this is parallelizable grunt work.
**Delivers:** All 5 feature deep-dives in Chinese and French
**Addresses:** Full feature page translation, localized alt text

### Phase 5: Legal + Support Pages
**Rationale:** Lower priority content but legally important (PIPL, GDPR require accessible language for privacy notices).
**Delivers:** Privacy, terms, support in both locales with "English is binding" disclaimer
**Addresses:** Legal compliance, complete site coverage

### Phase 6: SEO Verification and Polish
**Rationale:** Final validation pass before shipping. Catches hreflang errors, sitemap gaps, broken links across 30 pages.
**Delivers:** Verified hreflang, complete sitemap, per-locale 404 pages, `_redirects` file, Lighthouse audit
**Addresses:** Differentiators (locale 404, date formatting), deployment safety
**Avoids:** Pitfall #3 (hreflang), #8 (404 per locale), #14 (redirect gaps)

### Research Flags

Phases likely needing deeper research during planning:
- **Phase 2:** FeatureGrid.astro is 15.5K and the most complex component to refactor — may need careful decomposition strategy
- **Phase 4:** Feature pages have 500+ words each; translation quality review process needs definition

Phases with standard patterns (skip research):
- **Phase 1:** Well-documented Astro i18n config, official docs cover everything
- **Phase 6:** Standard SEO validation tooling (Search Console, Screaming Frog)

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Stack | HIGH | Only 1 new dependency; Astro i18n is built-in and well-documented |
| Features | HIGH | Standard i18n feature set; clear table stakes vs differentiators |
| Architecture | HIGH | Official Astro patterns, verified for v6 |
| Pitfalls | HIGH | Well-known CJK/i18n issues with documented solutions |

**Overall confidence:** HIGH

### Gaps to Address

- **General Sans oe ligature coverage** (U+0153): Must verify before French pages ship. Render test needed — if missing, need unicode-range patch font.
- **@astrojs/sitemap hreflang output**: Docs say it auto-generates `<xhtml:link>` for i18n config, but should verify actual XML output in Phase 1 testing.
- **Cloudflare Pages directory-level 404 behavior**: Documented but must be tested in production — does `/zh/404.html` actually catch `/zh/nonexistent`?
- **Translation quality process**: Research covers architecture but not who translates and reviews. LLM-assisted translation with human review is assumed but not formalized.

## Open Questions

1. **Translation source**: Use Claude/LLM for initial drafts with human review, or hire professional translators? Affects timeline significantly (hours vs weeks).
2. **Blog handling**: Keep blog English-only for this milestone, or include a translated blog listing page with "content is English" notice?
3. **Localized App Store badges**: Use Apple's official localized SVGs, or keep the English badge everywhere?
4. **Translated OG images**: Defer entirely, or do text-only OG (no CJK font in satori) for v1?
5. **FeatureGrid decomposition**: At 15.5K, should this be split into smaller components as part of the i18n refactor, or keep monolithic and just add props?

## Sources

### Primary (HIGH confidence)
- [Astro i18n Routing Docs](https://docs.astro.build/en/guides/internationalization/)
- [Astro i18n Recipe](https://docs.astro.build/en/recipes/i18n/)
- [Astro i18n API Reference](https://docs.astro.build/en/reference/modules/astro-i18n/)
- [Fontsource Noto Sans SC](https://fontsource.org/fonts/noto-sans-sc)
- [Tailwind CSS v4 dark mode docs](https://tailwindcss.com/docs/dark-mode)

### Secondary (MEDIUM confidence)
- [Type-Safe i18n in Astro Without External Packages](https://rubensmn.dev/blog/type-safe-i18n-with-astro/)
- [Astro i18n Configuration Guide (BetterLink)](https://eastondev.com/blog/en/posts/dev/20251202-astro-i18n-guide/)
- [CJK Font Optimization Guide](https://font-converters.com/languages/cjk-font-optimization)
- [Common Hreflang Mistakes](https://www.seoclarity.net/blog/12-common-hreflang-mistakes-and-how-to-prevent-them)

### Tertiary (LOW confidence)
- Cloudflare Pages directory-level 404 fallback behavior — documented but needs production verification
- General Sans oe ligature coverage — assumed but unverified

---
*Research completed: 2026-05-16*
*Ready for roadmap: yes*
