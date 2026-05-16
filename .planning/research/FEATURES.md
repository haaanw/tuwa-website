# Feature Landscape: i18n (Chinese + French)

**Domain:** Marketing site internationalization
**Researched:** 2026-05-16
**Scope:** Adding zh (Chinese) and fr (French) to existing 10-page Astro 6 static site

## Table Stakes

Features users expect from a multilingual marketing site. Missing = broken SEO or confused visitors.

| Feature | Why Expected | Complexity | Dependencies |
|---------|--------------|------------|--------------|
| Subdirectory URL routing (`/zh/`, `/fr/`) | Industry standard, best SEO equity sharing, Astro native support | Low | astro.config.mjs i18n block |
| English as unprefixed default (`/` = en, not `/en/`) | Existing site already ranks at tuwa.app/*, redirecting breaks SEO | Low | `prefixDefaultLocale: false` |
| hreflang tags on every page | Search engines serve correct language version; prevents duplicate content penalties | Medium | SEO component update |
| Per-locale `<html lang="">` attribute | Accessibility requirement (screen readers), search engine signal | Low | BaseLayout update |
| Per-locale meta/OG tags (title, description) | Social shares and search results must be in the correct language | Medium | SEO component + translated metadata |
| Localized sitemap with hreflang entries | Google requires hreflang in sitemap OR page head; both is best practice | Medium | @astrojs/sitemap i18n config |
| Language switcher in header | Users must be able to actively choose language; cannot rely on browser detection alone | Medium | New component, header layout change |
| Translated page content (all 10 pages) | Partial translation is worse than none — confuses users, hurts SEO (thin content) | High | Translation workflow, content organization |
| CJK-appropriate font stack for Chinese | General Sans has no CJK glyphs; Chinese text must not fall back to Times New Roman | Medium | CSS font-family chain with system CJK fonts |
| Right-to-left: NOT needed | zh and fr are both LTR; no bidi complexity | N/A | None |

## Differentiators

Features that elevate the multilingual experience beyond baseline. Not expected, but valued.

| Feature | Value Proposition | Complexity | Dependencies |
|---------|-------------------|------------|--------------|
| Language detection banner (non-intrusive) | "This page is also available in [Chinese]" for visitors whose browser locale differs from page locale | Low | Read `navigator.language`, show dismissible banner |
| Locale-aware date formatting in blog | Blog posts showing "2026-05-16" vs "2026年5月16日" vs "16 mai 2026" | Low | `Intl.DateTimeFormat` with locale param |
| Translated OG images | Social shares in Chinese show Chinese text on the OG card | High | Satori + CJK font file (adds ~5MB to build) |
| Localized App Store badge | Apple provides localized "Download on the App Store" badges (Chinese: 从App Store下载) | Low | Swap SVG asset per locale |
| URL slug translation (`/features/recovery` vs `/zh/features/recovery`) | Keep slugs in English for simplicity OR translate for SEO in target locale | Medium | Content collection slug config |
| 404 page per locale | Visitors hitting a bad URL under `/zh/` see Chinese 404, not English | Low | `src/pages/zh/404.astro` |

## Anti-Features

Features to explicitly NOT build for this milestone.

| Anti-Feature | Why Avoid | What to Do Instead |
|--------------|-----------|-------------------|
| Auto-redirect based on IP geolocation | Requires edge runtime (kills static site), frustrates expats/VPN users, Google penalizes cloaking | Let users choose; optionally show language suggestion banner |
| Machine-translated content (raw Google Translate output) | Destroys "credible science" brand voice; Chinese athletes spot bad translations instantly | Human translation or high-quality AI translation with human review |
| Subdomain per language (zh.tuwa.app) | DNS complexity, separate Cloudflare Pages deployments, splits domain authority, harder to maintain | Subdirectory (`/zh/`) keeps everything in one build |
| Query parameter routing (`?lang=zh`) | Not indexable by search engines, breaks caching, Astro does not support this pattern | Subdirectory routing |
| Full CMS for translators | No non-technical translators on the team; adds SaaS cost and complexity | JSON/MDX files in Git, developer manages translations |
| Locale-specific pricing or product differences | App Store handles regional pricing; website just drives downloads | Same content structure, translated text only |
| Cookie-based language persistence | Unnecessary for static site; URL IS the state; adds GDPR consent complexity | URL-based language (bookmark /zh/ = always Chinese) |
| Translated URL slugs for v4.0 | Doubles routing complexity for marginal SEO benefit with only 2 additional locales | Keep English slugs; all locales use `/zh/features/recovery` not `/zh/功能/恢复` |

## Feature Dependencies

```
Astro i18n config --> URL routing works
    |-- hreflang tags (needs locale info from routing)
    |-- Language switcher (needs getRelativeLocaleUrl helper)
    +-- Localized sitemap (reads i18n config)

Content organization (locale folders or JSON) --> Translated pages
    |-- Translated metadata --> localized OG tags
    +-- Translated metadata --> localized sitemap entries

CJK font stack --> Chinese pages render correctly
    +-- (Independent, can be done early)

SEO component update --> hreflang + locale meta
    +-- Depends on: i18n routing config being set
```

## Content Strategy Details

### What to Translate (all 10 pages)

| Page | Translation Notes |
|------|-------------------|
| Landing (index) | Full translation including hero copy, feature summaries, CTAs |
| 5 feature deep-dives | Full translation; screenshots stay in English (app is English) |
| Blog listing | Translate UI chrome; blog posts themselves can remain English-only initially |
| Privacy policy | Should translate — GDPR transparency principle, China PIPL requires accessible language |
| Terms of service | Should translate — same legal transparency reasoning |
| Support | Translate; include locale-appropriate contact expectations |

### What NOT to Translate

| Content | Reason |
|---------|--------|
| App screenshots | App UI is English; doctoring screenshots is misleading |
| Code examples (if any in blog) | Code is universal |
| Brand name "Tuwa" | Proper noun, keep as-is |
| English blog posts | Blog content is separate concern; can add translated posts later |
| URLs/slugs | Keep English slugs for consistency and simplicity |

### Legal Pages: Translate or Not?

**Translate.** Both Chinese (PIPL) and French (Quebec language laws, EU GDPR) privacy frameworks emphasize that privacy notices must be in a language the user understands. Since the site actively serves these locales with translated marketing content, serving English-only legal pages creates a disconnect. However, the English version remains the legally binding version — add a disclaimer at the top of translated legal pages stating this.

## Language Switcher UX Specification

### Placement
- Header, right side (before/after App Store CTA badge)
- Visible on all pages, all viewports

### Design Pattern
- Globe icon + current language code (EN / 中文 / FR)
- Dropdown on click showing all 3 options
- Each option shows the language in its own script: "English", "中文", "Francais"
- Never use flags (China flag is politically loaded for Taiwanese users; France flag excludes Quebec/Swiss French)

### Behavior
- Clicking a language navigates to the equivalent page in that locale
- If equivalent page does not exist, navigate to that locale's homepage
- Preserve scroll position is NOT expected (page navigation is fine)
- Mobile: same dropdown, touch-friendly tap targets (44px minimum)

## CJK Font Strategy

### Problem
General Sans (current site font) has zero CJK coverage. Chinese text would render in browser default serif (Times New Roman on macOS, SimSun on Windows) — looks broken.

### Solution
Add a CJK fallback chain to the font-family declaration specifically for Chinese pages, using system fonts:

```css
/* Chinese locale pages get this font stack */
--font-sans-zh: "General Sans", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "Noto Sans SC", sans-serif;
```

### Why NOT load a web font for Chinese
- Noto Sans SC full weight = ~5-8MB per weight
- Subset to common characters still 1-2MB
- Adds significant page load time
- System CJK fonts (PingFang on macOS/iOS, Microsoft YaHei on Windows, Noto Sans on Android/Linux) look good and are already installed
- Performance budget matters: site currently scores Lighthouse 98
- Known Astro bug: CJK fonts with Fonts API cause OOM during build (GitHub issue #15318)

### French: No font change needed
General Sans covers Latin Extended characters (accents: e, a, c, etc.). No font changes for French.

## SEO Requirements Detail

### hreflang Implementation

Every page must include in `<head>`:
```html
<link rel="alternate" hreflang="en" href="https://tuwa.app/features/recovery/" />
<link rel="alternate" hreflang="zh" href="https://tuwa.app/zh/features/recovery/" />
<link rel="alternate" hreflang="fr" href="https://tuwa.app/fr/features/recovery/" />
<link rel="alternate" hreflang="x-default" href="https://tuwa.app/features/recovery/" />
```

- `x-default` points to English (the unprefixed default)
- Every page references ALL language variants including itself
- Must be present on ALL pages in ALL locales (not just the English version)

### Localized Metadata

Each locale needs unique:
- `<title>` (translated, keyword-optimized for that locale)
- `<meta name="description">` (translated)
- `og:title`, `og:description` (translated)
- `og:locale` (e.g., `zh_CN`, `fr_FR`)
- `og:locale:alternate` (the other locales)

### Sitemap

Use `@astrojs/sitemap` with i18n config to auto-generate `<xhtml:link rel="alternate">` entries per URL. This is the second signal to Google (alongside in-page hreflang tags) confirming language relationships.

## MVP Recommendation

### Phase 1: Infrastructure (must come first)
1. Astro i18n config in `astro.config.mjs`
2. Content organization structure (locale folders or JSON translation files)
3. CJK font stack in global CSS
4. SEO component updated for hreflang + locale meta

### Phase 2: Content + UI
5. Language switcher component
6. Translate all 10 pages (Chinese + French)
7. Localized App Store badges

### Defer to Later
- Translated OG images (high complexity, CJK font in satori is painful)
- Language detection banner (nice-to-have polish)
- Blog post translations (separate content initiative)
- Locale-aware date formatting (only matters when blog posts exist in other locales)

## Complexity Budget

| Feature | Estimated Effort | Risk |
|---------|-----------------|------|
| Astro i18n config | 1 hour | Low — well-documented |
| Content folder restructuring | 2-3 hours | Medium — 10 pages to reorganize |
| CJK font stack | 30 min | Low |
| hreflang in SEO component | 1-2 hours | Low |
| Language switcher | 2-3 hours | Medium — responsive, accessible |
| Translation (Chinese, 10 pages) | 4-6 hours | Medium — needs quality review |
| Translation (French, 10 pages) | 4-6 hours | Medium — needs quality review |
| Localized sitemap | 1 hour | Low — config-driven |
| Testing all locale routes | 2-3 hours | Medium — many pages x 3 locales |

**Total estimated: 17-25 hours**

## Sources

- [Astro i18n Routing Documentation](https://docs.astro.build/en/guides/internationalization/)
- [Astro i18n API Reference](https://docs.astro.build/en/reference/modules/astro-i18n/)
- [Astro i18n Configuration Guide (BetterLink)](https://eastondev.com/blog/en/posts/dev/20251202-astro-i18n-guide/)
- [Language Selector Best Practices (SimpleLocalize)](https://simplelocalize.io/blog/posts/language-selector-best-practices/)
- [Website Localization Best Practices 2026 (Lara Translate)](https://blog.laratranslate.com/website-localization-best-practices/)
- [Privacy Policy Multiple Languages (PrivacyPolicies.com)](https://www.privacypolicies.com/blog/privacy-policy-multiple-languages/)
- [Do You Need to Translate Terms of Service (SiteTran)](https://www.sitetran.com/blog/localization-for-growth/do-you-need-to-translate-terms-of-service)
- [CJK Font OOM Issue in Astro (GitHub #15318)](https://github.com/withastro/astro/issues/15318)
- [i18n SEO Checklist (DEV Community)](https://dev.to/lingodotdev/the-i18n-seo-checklist-15-seo-optimization-techniques-to-reach-a-global-audience-59l0)
- [Website Localization Complete Guide 2026 (IntlPull)](https://intlpull.com/blog/website-localization-complete-guide-2026)
