# Domain Pitfalls: Adding i18n (Chinese + French) to Existing Astro Site

**Domain:** Internationalization of a 10-page static marketing site
**Researched:** 2026-05-16
**Context:** Astro 6 + Tailwind v4, Cloudflare Pages, General Sans variable font, 10 pages

---

## Critical Pitfalls

Mistakes that cause rewrites, performance regressions, or SEO damage.

### 1. Chinese Font Weight Catastrophe (5-20MB per weight)

**What goes wrong:** Loading a full Chinese font file (e.g., Noto Sans SC) adds 5-20MB to page weight. General Sans only covers Latin -- it has zero CJK glyphs. Naively adding a Chinese font as a single @font-face file destroys the site's Lighthouse 98 score instantly.

**Why it happens:** CJK fonts contain 20,000-70,000 glyphs vs ~500 for Latin. Developers unfamiliar with CJK web fonts load the full file like they would a Latin font.

**Consequences:** First paint goes from <1s to 5-15s on mobile. Lighthouse drops to 30-50. Users on Chinese mobile networks (often throttled) see blank text for seconds. Core Web Vitals fail.

**Prevention:**
- Use Google Fonts' unicode-range subsetting for Noto Sans SC -- it automatically splits into ~100 chunks (~100-500KB total, only needed chunks load per page)
- Alternatively, use `cn-font-split` (GitHub tool) to split any Chinese font into unicode-range subsets
- Set `font-display: swap` so text renders immediately in system font, then swaps
- For zh pages, declare a font stack: `'General Sans', 'Noto Sans SC', system-ui, sans-serif` -- General Sans handles Latin characters in Chinese pages (brand names, numbers), Noto Sans SC handles hanzi only
- Test on throttled connection (Slow 3G) after implementation

**Detection:** Lighthouse performance audit, Network tab showing >1MB font downloads, CLS from font swap.

**Phase:** Infrastructure/foundation phase (font loading must be solved before any translated pages ship).

---

### 2. Hardcoded English Strings Scattered Across 20+ Files

**What goes wrong:** After "completing" translation, dozens of English strings remain embedded in component templates, layouts, alt texts, aria-labels, button texts, error messages, and meta descriptions. The site looks 80% translated but feels broken.

**Why it happens:** Existing site was built English-only for 15+ phases. Strings live in:
- Layout components (BaseLayout, CoachingPageLayout, FeaturePageLayout)
- Header/Footer navigation labels
- CTA buttons ("Download on the App Store", "Start Free Trial")
- Image alt texts
- SEO component defaults
- Blog post metadata
- 404 page copy
- Structured data (JSON-LD)

**Consequences:** Mixed-language pages destroy credibility. Chinese users see "Read More" buttons. French users see English alt text read by screen readers. Google may classify pages as "thin" or "not in declared language."

**Prevention:**
- Before writing any translation: audit ALL source files for English strings. Run grep for common patterns: quoted strings in .astro files, aria-label, alt=, title=, placeholder=
- Create a string extraction checklist covering: navigation, CTAs, labels, alt text, meta tags, structured data, error states, empty states (blog "no posts yet")
- Use a t() function pattern from day one -- never inline translated strings directly
- Build a "translation coverage" CI check that flags untranslated keys

**Detection:** Manual review in each locale. Automated: grep for English words in rendered zh/fr HTML output.

**Phase:** Early extraction phase (must happen before translation begins). This is the highest-effort task.

---

### 3. hreflang Implementation Errors Causing SEO Traffic Loss

**What goes wrong:** Incorrect hreflang tags cause Google to ignore locale signals entirely, show wrong language versions in search results, or treat translated pages as duplicate content. One e-commerce site lost 64% organic traffic from broken hreflang in 3 months.

**Why it happens:** hreflang has strict requirements that are easy to violate:
- Tags must be bidirectional (en page links to zh AND zh page links back to en)
- Must use absolute URLs (not relative paths)
- Language codes must be exact (`zh` not `zh-CN` unless targeting a specific region)
- Every page must include a self-referencing hreflang
- `x-default` must point to the fallback (English in this case)
- Canonical tags must not conflict with hreflang

**Consequences:** Google ignores all hreflang annotations. Chinese users searching in Google see English pages. Duplicate content dilution across locale variants. Wasted crawl budget.

**Prevention:**
- Build hreflang generation into the SEO component systematically -- not manually per page
- Use `x-default` pointing to English (the unprefixed default)
- Always use absolute URLs: `https://tuwa.app/zh/features/recovery-scoring`
- Self-reference every page in its own hreflang set
- Validate with Google Search Console's International Targeting report
- Include hreflang in both HTML `<link>` tags AND sitemap (belt and suspenders)
- Generate a per-locale sitemap with `@astrojs/sitemap` locale config

**Detection:** Google Search Console > International Targeting > hreflang errors. Screaming Frog hreflang audit.

**Phase:** SEO/infrastructure phase. Must be baked into the SEO component before pages ship.

---

### 4. Astro i18n Routing: prefixDefaultLocale Trap

**What goes wrong:** Choosing `prefixDefaultLocale: false` (English at `/`, Chinese at `/zh/`) means existing URLs stay stable BUT creates an asymmetric routing system that breaks helper functions, sitemap generation, and internal linking patterns. Choosing `prefixDefaultLocale: true` breaks all existing English URLs and requires redirects.

**Why it happens:** Astro's i18n has two modes:
- `prefixDefaultLocale: false` -- English stays at `/about`, others at `/zh/about`. But now `getRelativeLocaleUrl()` behaves differently for default vs non-default locale. Internal links in shared components need conditional logic.
- `prefixDefaultLocale: true` -- All locales get prefixes (`/en/about`, `/zh/about`). Clean and symmetric, but `/about` (the current live URL with SEO equity) now needs a 301 redirect.

**Consequences:** With `false`: language switcher logic becomes complex, component `href` generation has edge cases, sitemap has asymmetric URL patterns. With `true`: existing Google-indexed URLs all 404 without redirects, breaking SEO.

**Prevention:**
- Use `prefixDefaultLocale: false` to preserve existing URL equity (tuwa.app already ranks for "tuwa app" queries)
- Accept the asymmetry and use Astro's `getRelativeLocaleUrl()` helper consistently (never hardcode paths)
- Create a `localePath(path, locale)` utility that wraps `getRelativeLocaleUrl` and handles edge cases
- Test language switcher links from every page in every locale

**Detection:** Broken links in non-default locales. 404s on language switch. Duplicate pages in sitemap.

**Phase:** First implementation phase. This decision locks in the URL structure for everything else.

---

## Moderate Pitfalls

### 5. French Text Expansion Breaking Layouts (25-35% longer)

**What goes wrong:** French text is 25-35% longer than English. Headlines that fit perfectly in English overflow containers, break onto extra lines, or cause horizontal scroll. CTAs like "Download on the App Store" become "Telecharger sur l'App Store" and overflow fixed-width buttons. The coaching page with its dense feature strips is especially vulnerable.

**Prevention:**
- Audit every fixed-width element: buttons with `w-[200px]`, grid cells with fixed heights, hero headlines with specific `max-w-` constraints
- Replace fixed widths with `min-w` + `max-w` ranges or let flex/grid handle sizing
- Test with French placeholder text (30% longer) BEFORE real translations arrive
- For hero headlines, allow 2 lines in French where English uses 1 -- add `min-h` instead of fixed `h`
- CSS `text-overflow: ellipsis` is NOT a solution for marketing copy -- truncation destroys messaging
- Use `hyphens: auto` with `lang="fr"` for body text to improve line breaking

**Detection:** Visual regression testing at all breakpoints with French content. Overflow audit with browser DevTools.

**Phase:** Layout hardening phase (before translations are inserted). Can use pseudolocalization (English text padded 35%) to test.

---

### 6. Translation File Architecture That Doesn't Scale

**What goes wrong:** Starting with a single `translations.json` per language. After 10 pages with feature-specific copy, the file becomes 2000+ lines. Merge conflicts on every PR. Can't tell which strings belong to which page. Stale translations accumulate.

**Prevention:**
- Structure by page/component: `src/i18n/en/home.ts`, `src/i18n/zh/features/recovery.ts`
- Keep a shared file for repeated UI: `src/i18n/{locale}/common.ts` (nav, footer, CTAs)
- Use namespaced keys: `features.recovery.hero.title` not `recovery_hero_title`
- Add a "last updated" field or use git blame to detect stale translations
- Use TypeScript const objects over JSON -- you get autocomplete and type-checking on keys

**Detection:** File exceeds 500 lines. Developers struggle to find strings. PRs have merge conflicts in translation files.

**Phase:** Architecture phase. Decide structure before writing the first translation.

---

### 7. Missing Locale-Aware Content for OG Images and Metadata

**What goes wrong:** OG images still show English text when shared on Chinese social media (WeChat, Weibo). Meta descriptions stay in English. `og:locale` tag missing or wrong. Social sharing looks unprofessional in target markets.

**Prevention:**
- Generate per-locale OG images using satori (already in stack) -- pass translated title/description
- Satori supports CJK rendering BUT needs a CJK font file loaded (Noto Sans SC TTF ~16MB at build time is fine since it's build-only, not shipped to clients)
- Set `og:locale` to `zh_CN` and `fr_FR` respectively
- Translate meta descriptions -- these show in Google results for that locale
- Test by sharing URLs in WeChat/LINE (Chinese) and Facebook (French) preview tools

**Detection:** Social share preview tools (Facebook Debugger, Twitter Card Validator). WeChat link preview test.

**Phase:** SEO phase, after base translations exist.

---

### 8. Cloudflare Pages 404 Handling Per Locale

**What goes wrong:** Cloudflare Pages serves `404.html` from the root for all 404s. When a Chinese user hits `/zh/nonexistent`, they see an English 404 page.

**Prevention:**
- Create locale-specific 404 pages: build outputs `zh/404.html` and `fr/404.html`
- Cloudflare Pages looks for `404.html` in the nearest directory -- so `/zh/404.html` handles `/zh/*` 404s automatically
- Verify this behavior in production (Cloudflare's directory-level 404 fallback is documented but must be tested)
- Keep root `404.html` as the English fallback

**Detection:** Hit a nonexistent URL under each locale prefix in production. Check response language.

**Phase:** Implementation phase, when building locale page structure.

---

### 9. General Sans French Diacritics and oe Ligature Gap

**What goes wrong:** General Sans (Fontshare) may not cover all French diacritical marks or the oe ligature (U+0153, used in "oeuvre", "coeur"). If a glyph is missing, the browser falls back to system font for that single character, creating a visible "ransom note" effect with mixed fonts in a single word.

**Prevention:**
- Verify General Sans coverage: test with full French character set including oe ligature, e with all accent variants, c-cedilla
- General Sans from Fontshare likely covers full Latin Extended-A (which includes French) -- but VERIFY with a glyph inspector tool before assuming
- If gaps exist: subset a complementary font for the missing glyphs using unicode-range
- The `oe` ligature (U+0153) is the most commonly missing glyph in otherwise-complete Latin fonts

**Detection:** Render French pages and inspect each accented character in DevTools > Computed > Rendered Fonts.

**Phase:** Font infrastructure phase, at the same time as Chinese font setup.

---

### 10. Content Collections + i18n: Blog Architecture Clash

**What goes wrong:** Blog posts use Astro Content Collections with `[...slug].astro`. Adding locale support means deciding: translate blog posts? Separate collections per locale? Same collection with locale field? Each choice has different routing implications and the blog currently has no posts (empty state only).

**Prevention:**
- For MVP: don't translate blog posts. Keep blog English-only initially. Add a "blog is English-only" notice on zh/fr blog listings
- If translating later: use a flat collection with `locale` field in frontmatter + filter in `getStaticPaths()`
- Do NOT create separate content collections per locale (breaks shared schema, multiplies maintenance)
- URL pattern for translated posts: `/zh/blog/[slug]` where slug stays in English (translated slugs are a maintenance nightmare for a solo dev)

**Detection:** 404s on blog routes under locale prefixes. Duplicate posts appearing in wrong locale.

**Phase:** Content architecture phase. Decide before building locale routing.

---

## Minor Pitfalls

### 11. Language Switcher Losing Current Page Context

**What goes wrong:** Language switcher navigates to homepage of target locale instead of the equivalent page. User is on `/features/recovery-scoring`, clicks Chinese, lands on `/zh/` instead of `/zh/features/recovery-scoring`.

**Prevention:**
- Build switcher using `Astro.url.pathname` to construct equivalent locale URL
- Use `getRelativeLocaleUrl(locale, currentPath)` from `astro:i18n`
- Test switcher on every page type: index, feature pages, blog listing, blog post, legal pages

**Phase:** UI component phase.

---

### 12. Date/Number Formatting Inconsistencies

**What goes wrong:** Blog post dates show "May 16, 2026" in Chinese pages instead of "2026nian5yue16ri". Numbers use wrong separators. Stat counters on the site (animated numbers) need locale-aware formatting in their animation logic.

**Prevention:**
- Use `Intl.DateTimeFormat(locale)` for all date rendering
- Use `Intl.NumberFormat(locale)` for stat counters
- Create locale-aware formatting utilities used by all components
- Animated stat counters need locale passed to their formatting function

**Phase:** Utility/infrastructure phase.

---

### 13. Tailwind Prose Plugin and CJK Line Breaking

**What goes wrong:** `@tailwindcss/typography` prose styles assume Latin text metrics. Chinese text has no word spaces, so `word-break` defaults produce unexpected results. Line height tuned for Latin feels cramped for CJK characters which are taller.

**Prevention:**
- Add `word-break: break-all` or `overflow-wrap: anywhere` for CJK prose sections
- Increase `line-height` by 0.2-0.3 for CJK text (1.8 vs 1.5 for Latin)
- Use CSS `[lang="zh"]` attribute selectors: `[lang="zh"] .prose { line-height: 1.8; }`
- Test blog post rendering with Chinese content if/when blog is translated

**Phase:** Styling phase, after base layout works.

---

### 14. Incomplete Redirect Coverage on Deploy

**What goes wrong:** With `prefixDefaultLocale: false`, English has no prefix. But if any tooling accidentally generates `/en/` prefixed URLs (sitemap plugins, old links, third-party tools), those 404.

**Prevention:**
- Add a `_redirects` file (Cloudflare Pages native) redirecting `/en/*` to `/:splat` with 301
- Validate sitemap contains no `/en/` prefixed URLs
- Check all `<a href>` in rendered HTML across locales

**Phase:** Deployment/QA phase.

---

## Phase-Specific Warnings

| Phase Topic | Likely Pitfall | Mitigation |
|-------------|---------------|------------|
| Font infrastructure | Chinese font bloat (#1), French diacritics gap (#9) | Solve unicode-range subsetting first, verify General Sans coverage |
| Routing setup | prefixDefaultLocale choice (#4), 404 per locale (#8) | Decide URL strategy before touching any pages |
| String extraction | Hardcoded English scattered (#2) | Full audit before translation begins, t() wrapper for everything |
| Translation architecture | File sprawl (#6), blog duplication (#10) | Namespace by page, defer blog translation |
| Layout hardening | French text expansion (#5), CJK line breaking (#13) | Test with pseudolocalized 35%-longer strings |
| SEO implementation | hreflang errors (#3), OG per locale (#7) | Systematic generation in SEO component, never manual |
| UI components | Language switcher context loss (#11) | Use Astro i18n helpers, test from every page |
| QA/deploy | Redirect gaps (#14), date formatting (#12) | _redirects file, Intl API for all formatting |

---

## Sources

- [Astro i18n Routing Docs](https://docs.astro.build/en/guides/internationalization/)
- [Astro i18n Configuration Guide (2025)](https://eastondev.com/blog/en/posts/dev/20251202-astro-i18n-guide/)
- [CJK Font Optimization Guide (2026)](https://font-converters.com/languages/cjk-font-optimization)
- [Font Subsetting by Language](https://font-converters.com/guides/font-subsetting-by-language)
- [Best Chinese Fonts for Websites (2026)](https://www.az-loc.com/choose-best-chinese-fonts-for-websites/)
- [Why Text Expansion Breaks Your UI](https://simplelocalize.io/blog/posts/text-expansion-ui-localization/)
- [UI Localization Technical Guide 2026](https://intlpull.com/blog/ui-localization-technical-guide-2026)
- [Common Hreflang Mistakes - SEO Clarity](https://www.seoclarity.net/blog/12-common-hreflang-mistakes-and-how-to-prevent-them)
- [Hreflang Tags Complete 2026 Guide](https://www.clickrank.ai/hreflang-tags-complete-guide/)
- [Cloudflare Pages Routing Docs](https://developers.cloudflare.com/pages/functions/routing/)
- [Cloudflare Pages Localization Tutorial](https://developers.cloudflare.com/pages/tutorials/localize-a-website/)
