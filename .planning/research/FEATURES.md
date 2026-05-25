# Feature Research — v4.1 Internationalization Follow-ups

**Domain:** Multilingual static marketing site (Astro 6, EN/zh/fr, Cloudflare Pages)
**Researched:** 2026-05-25
**Confidence:** HIGH (OG image pipeline, blog structure, locale formatting); MEDIUM (translated slugs SEO impact)

---

## Context: What v4.0 Already Provides

The v4.0 infrastructure this milestone builds on:

- Astro i18n routing: EN unprefixed (`/`), zh at `/zh/`, fr at `/fr/`
- Type-safe `use*Translations()` per-page namespace pattern
- `SEO.astro` component: hreflang + x-default, og:locale, computed from `Astro.url.pathname`
- Localized sitemap (90 hreflang annotations across 30 pages × 3 locales)
- Per-locale 404 pages
- Noto Sans SC isolated to /zh/ pages
- Path-preserving language switcher (desktop + mobile)
- Blog content collection schema defined; collection currently empty

**Current gap:** All zh/fr pages reference the same English OG images (e.g., `ogImage="/og/recovery-scoring.png"`) regardless of locale. URL slugs are English under locale prefixes (e.g., `/zh/features/recovery-scoring`). Blog has no posts. Dates/numbers are unformatted.

---

## Feature Landscape

### Table Stakes (Users and Search Engines Expect These)

| Feature | Why Expected | Complexity | Notes |
|---------|--------------|------------|-------|
| Translated OG images for zh and fr pages | When a Chinese or French user shares a page, the social preview card currently shows English text. `og:locale` is correctly set, but the image content contradicts it. This is the most visible i18n gap for real users. | MEDIUM | Requires satori + @resvg-js/resvg-wasm pipeline. CJK font must be TTF/OTF/WOFF — satori does not support WOFF2. Noto Sans SC is ~10 MB in full TTF; a build-time subset to the specific glyphs used in each card is essential. General Sans (current EN font) is available via Fontshare as a TTF download. |
| Locale-aware date formatting on blog posts | A Chinese user reading `/zh/blog/post` should see `2026年5月25日`, not `May 25, 2026`. French should see `25 mai 2026`. `Intl.DateTimeFormat` handles all three correctly with zero dependencies. | LOW | Dates appear in: blog post `<time>` element, blog listing card, BlogPostLayout header. Numbers (reading time) are already integers — `Intl.NumberFormat` is overkill unless you add decimal stats. Stat counters on the landing page use `toLocaleString()` which already adapts to the user's OS locale, so those are already correct. |
| Blog posts routable per locale | The blog collection schema exists but posts live under a flat `src/content/blog/` directory. With any real posts, Chinese/French users expect `/zh/blog/[slug]` to work and show translated content. Blog listing pages at `/zh/blog` and `/fr/blog` already exist as translated shells — they will show an empty state until posts exist. | MEDIUM | Two structural options (see Feature Dependencies). The simpler approach for a small blog: locale field in frontmatter, single collection, filter by locale in `getStaticPaths`. Scales fine to dozens of posts. |

### Differentiators (Competitive Advantage)

| Feature | Value Proposition | Complexity | Notes |
|---------|-------------------|------------|-------|
| Per-page localized OG images (not just per-locale template) | Every feature deep-dive page gets a branded social card showing its page title in the correct script — e.g., "恢复评分" on the recovery-scoring card for zh. This is above what most marketing sites do (which is a single brand card per locale). For a product competing on scientific credibility, a branded per-page card signals care and completeness. | MEDIUM | 7 unique OG images × 3 locales = 21 generated PNGs at build time, all static. Build time adds ~2-3 seconds (each image ~100-300ms via satori + resvg). Fully acceptable for Cloudflare Pages. |
| Blog posts exist in subset of locales without broken routing | A post about "ACWR methodology" published only in EN should simply not appear in `/zh/blog` or `/fr/blog`. There should be no 404 or English fallback leaking into locale-prefixed URLs. This is the correct UX: Chinese users see a curated list of only what's in Chinese. It keeps the language promise intact. | LOW | This is actually simpler to implement than a fallback: `getStaticPaths` on `/zh/blog/[...slug]` filters to locale=zh posts only, so untranslated slugs never generate zh routes. |

### Anti-Features (Commonly Requested, Often Problematic)

| Feature | Why Requested | Why Problematic | Alternative |
|---------|---------------|-----------------|-------------|
| Translated URL slugs (e.g., `/zh/features/恢复评分` or `/fr/fonctionnalites/suivi-charge`) | Localized URLs appear more native and have a small SEO keyword signal in the target language | High implementation cost with near-zero SEO benefit for a small-scale marketing site with 5 feature pages. The current slugs (`recovery-scoring`, `workload-tracking`) are already short English technical terms that don't carry keyword weight in any language. hreflang + og:locale already communicate locale to search engines correctly. Maintaining a slug map in the language switcher (which currently derives locale-equivalents by path substitution) would require a lookup table and significant refactor of SEO.astro's hreflang computation. Risk of broken links on slug changes. Ahrefs (a reference multilingual site) uses English slugs for product pages and only translates blog post slugs. | Keep English slugs under locale prefixes. Add translated `<title>` and `description` meta (already done in v4.0). Add translated OG images (v4.1 table stakes). These three together give 95% of the SEO and UX benefit at 5% of the complexity. Revisit only if analytics show zh/fr search impressions for specific keyword-rich slugs. |
| English-content fallback for untranslated blog posts | Seems helpful: Chinese users can at least read something. Avoids an empty blog state. | Breaks the language promise. A user who selected /zh/ explicitly expects Chinese content. Showing English text under a /zh/ URL undermines trust and creates a confusing mixed-language experience. It also risks Google indexing the same English content at two canonical URLs (/blog/slug and /zh/blog/slug), which is a duplicate content footgun even with hreflang set. The v4.0 architecture uses locale-scoped wrapper pages with no cross-locale routing — a fallback would require introducing Astro's `fallback` config or manual redirects, adding complexity to an otherwise clean system. | Hide untranslated posts from locale-prefixed blog listings. Show the locale-specific empty state (already translated in v4.0). When a post exists in all three locales, all three routes generate. |
| Runtime OG image generation (server-side, on request) | Avoids rebuild when content changes; enables truly dynamic cards | The site is purely static on Cloudflare Pages with no `@astrojs/cloudflare` adapter. Runtime endpoints require SSR/edge functions. Introducing the adapter for OG images alone would add deployment complexity and risk the known static+adapter incompatibility documented in project pitfalls. With 21 pages, build-time generation is trivially fast. | Build-time static generation via Astro endpoint with `export const prerender = true`. |
| Locale number formatting for stat counters | Chinese users might expect locale-specific number formatting | The stat counters already use `toLocaleString()` in JavaScript, which reads the user's OS locale setting — not the site locale. This is actually the correct behavior: a Chinese user's browser already uses their preferred number format. Overriding this with the page's locale would create inconsistency with their system preferences. | Leave stat counter formatting as-is (`toLocaleString()`). Only apply explicit `Intl.DateTimeFormat` to dates where locale-specific month/day name formatting is meaningful. |

---

## Feature Dependencies

```
Translated OG images
    └──requires──> satori + @resvg-js/resvg-wasm installed
    └──requires──> General Sans TTF (download from Fontshare, not the CDN WOFF2 used by Astro Font API)
    └──requires──> Noto Sans SC TTF subset (full file is 10MB; subset to OG card glyphs only)
    └──requires──> Astro endpoint pattern (src/pages/og/[locale]/[page].png.ts with prerender=true)
    └──enhances──> SEO.astro ogImage prop (already accepts locale-specific paths)

Blog post i18n routing
    └──requires──> content.config.ts schema extension (add `locale` field + optionally `slug` field)
    └──requires──> src/content/blog/ content structure decision (locale subfolder OR frontmatter locale field)
    └──requires──> /zh/blog/[...slug].astro and /fr/blog/[...slug].astro new pages
    └──requires──> hreflang on blog post pages (SEO.astro already supports hreflangAlternates prop)
    └──depends-on──> blog post content actually existing (currently empty collection)

Locale date formatting
    └──requires──> locale prop passed to BlogPostLayout (already available via BaseLayout pattern)
    └──enhances──> blog listing cards (format pubDate with Intl.DateTimeFormat)
    └──no new dependencies

Translated URL slugs [ANTI-FEATURE — do not build]
    └──would-require──> slug lookup map per locale per page
    └──would-require──> SEO.astro hreflang computation rewrite
    └──would-require──> language switcher path-mapping rewrite
    └──conflicts-with──> current path-substitution switcher pattern
```

### Dependency Notes

- **Translated OG images require General Sans TTF:** The Astro Font API currently loads General Sans from Fontshare's CDN as WOFF2. Satori does not support WOFF2. A separate TTF download of General Sans must be placed in `public/fonts/` (or loaded at build time) specifically for the satori pipeline. This is distinct from the web font already in use — two separate font artifacts for two separate purposes.
- **Noto Sans SC font size is a real build constraint:** The full Noto Sans SC TTF is ~10 MB. Loading it into Node.js memory at build time for every OG image generation call would add significant memory pressure. The correct approach is to subset the font at project setup time (using `pyftsubset` or `glyphhanger`) to only the ~100-200 CJK characters that will actually appear on OG cards. A 200-glyph subset is typically under 100 KB.
- **Blog i18n routing is independent of OG images:** These two features share no implementation surface. They can be developed in parallel or sequenced in either order.
- **Locale formatting has no infrastructure dependencies:** It is a pure utility function addition — a `formatDate(date, locale)` helper using `Intl.DateTimeFormat` — with targeted call sites in BlogPostLayout and blog listing.

---

## MVP Definition for v4.1

### Build First (blocking correctness gaps)

- [ ] **Translated OG images** — zh and fr pages currently serve English-text OG cards. This is the most visible correctness gap and directly affects social sharing, which is a real distribution channel for an App Store product. Template-based approach: one layout component, localized title + brand name rendered per card. 7 pages × 3 locales = 21 images.
- [ ] **Locale date formatting** — Simple utility, small call sites, zero risk. Blog posts will have dates the moment content is added. Fix the formatting before the first post ships.

### Add With First Blog Posts

- [ ] **Blog i18n routing** — The collection is empty. There is nothing to route to yet. Design the content structure correctly (locale subfolder or frontmatter field) before adding posts, so the first post doesn't need a migration. This should be done before the first post is written, not after.

### Defer Until There Is Real Translated Content

- [ ] **Locale number formatting beyond dates** — Not relevant until blog post reading-time stats or new data displays appear. Current stat counters already use `toLocaleString()`. No work needed now.
- [ ] **Translated URL slugs** — Defer indefinitely. Revisit only with evidence of keyword-search traffic on specific localized terms (check Search Console). The implementation cost is not justified without data.

---

## OG Image Content: What Belongs on a Localized Card

**Recommended card layout (applies to all 3 locales, same template):**

```
┌─────────────────────────────────────────────────────────┐
│  [Tuwa logo / wordmark — same in all locales]           │
│                                                         │
│  [Page title in locale script]                          │
│  e.g. "恢复评分" / "Évaluation de la récupération"      │
│                                                         │
│  [Tagline — short, 1 line, from page meta.description]  │
│                                                         │
│  tuwa.app                                               │
└─────────────────────────────────────────────────────────┘
```

**What to include:** Localized page title, localized tagline (one short phrase from the page's translated description), brand name "Tuwa" (untranslated — it is the product name), domain.

**What to omit:** App Store badge (too small to read on a social card), device screenshots (layout complexity not worth it for 21 images), locale indicator text ("中文版") — the script itself communicates locale.

**Per-page vs per-template:** Use a single template component with locale + page data props. Do NOT create 21 separate template files. The design is identical across locales; only the text strings differ. One `OGImageTemplate` component rendered 21 times.

**Size:** 1200×630px (standard OG ratio, works on Twitter/X, iMessage, WeChat, Weibo). PNG output.

---

## Blog i18n: Content Structure Decision

**Recommended approach: locale field in frontmatter, single flat `src/content/blog/` directory**

```
src/content/blog/
  acwr-methodology.mdx          ← EN post
  zh-acwr-methodology.mdx       ← zh post (same slug concept, different file)
  training-load-fundamentals.mdx ← EN-only post (no zh/fr equivalent)
```

Frontmatter:
```yaml
---
title: "ACWR训练负荷方法论"
locale: "zh"
slug: "acwr-methodology"        # canonical slug (same across locales)
date: 2026-06-01
description: "..."
---
```

**Why not locale subfolders (`src/content/blog/zh/`)?** The existing content.config.ts uses `glob({ pattern: '**/*.mdx', base: './src/content/blog' })` — a single collection. Splitting into sub-collections per locale (three separate `defineCollection` calls) would require changes to content.config.ts and all existing query call sites (`getCollection('blog')` → `getCollection('blog-zh')` etc). The frontmatter-locale approach requires only: (1) add `locale` field to schema, (2) filter in `getStaticPaths`. Less migration risk.

**Hreflang for blog posts:** When a post has zh + en translations (identified by same `slug` value), the blog post pages should emit hreflang cross-references. When only an EN version exists, no zh/fr hreflang annotations are needed (and no zh/fr route exists). SEO.astro already accepts `hreflangAlternates` as a prop — the blog post page just needs to compute and pass the right set.

**Language switcher for blog posts:** The path-preserving switcher works by substituting the locale prefix in the current path. For a post at `/blog/acwr-methodology`, switching to zh should go to `/zh/blog/acwr-methodology` if a translation exists, or fall back to `/zh/blog` (the listing) if it does not. This requires the switcher to know whether a translated route exists. For a static site, the simplest approach: build a lookup map of translated slugs at build time and inline it as a JSON data attribute on the `<html>` element, readable by the switcher JS.

---

## Locale Formatting: What Actually Matters on This Marketing Site

A marketing site has very few formatted values. This is the exhaustive list:

| Value | Format needed | Where |
|-------|--------------|-------|
| Blog post publication date | `Intl.DateTimeFormat(locale, { year: 'numeric', month: 'long', day: 'numeric' })` | BlogPostLayout header, blog listing cards |
| Reading time | Already an integer ("5 min read"). The minute label is a translation string, not a number to format. No Intl needed. | BlogPostLayout header |
| Stat counters (10,000+ athletes, etc.) | Already uses `toLocaleString()` in the counter JS — reads OS locale, correct as-is. No change. | StatsCounter component |
| App Store rating | Not displayed. N/A. | — |

**Verdict:** The only real formatting work is `Intl.DateTimeFormat` for blog post dates. Two call sites. Zero new dependencies.

---

## Translated URL Slugs: SEO Trade-off Analysis

**Current situation:** `/zh/features/recovery-scoring`, `/fr/features/cold-start` — English slugs under locale prefix.

**The case for translating slugs:**
- Localized slugs can carry keyword weight in the target language's search results
- They signal native-language content to users reading the URL
- hreflang still works correctly with differing slugs across locales — each page simply declares its alternate-language counterparts explicitly

**The case against (decisive for this project):**
- The feature page slugs (`recovery-scoring`, `workload-tracking`, `smart-templates`, `cold-start`, `coaching`) are short technical terms. Their Chinese equivalents ("恢复评分", "训练负荷追踪") are not terms users search for to find an app — they search for brand terms or problem descriptions. No slug-level SEO keyword benefit exists here.
- Google does not require localized slugs to rank localized content. hreflang, og:locale, and page-language content are the signals Google uses. This is confirmed by Google's own guidance that URL structure is a weak signal compared to on-page content.
- The existing path-preserving switcher uses string replacement: `currentPath.replace('/zh', '/fr')`. Translated slugs would break this. A slug-map lookup would need to be maintained for every page in every locale, embedded in the switcher JS.
- SEO.astro currently computes hreflang alternates by substituting the locale prefix into the current path. Translated slugs would require each page to explicitly pass all three locale URLs — removing the automatic derivation and adding per-page boilerplate to all 15 locale pages.

**Conclusion:** Keep English slugs. The combination of translated title+description (v4.0) + translated OG images (v4.1) + correct hreflang/og:locale (v4.0) delivers all the SEO and user signal that matters. Translated slugs are an optional cosmetic enhancement that creates real maintenance cost.

---

## Feature Prioritization Matrix

| Feature | User Value | Implementation Cost | Priority |
|---------|------------|---------------------|----------|
| Translated OG images | HIGH — visible on every social share of zh/fr pages | MEDIUM — satori pipeline, font subsetting | P1 |
| Locale date formatting | MEDIUM — polish, visible on blog posts | LOW — pure Intl utility | P1 (trivial, do alongside OG) |
| Blog i18n routing | HIGH — required before any blog content ships | MEDIUM — content structure + new page routes | P1 (prerequisite to blog posts) |
| Translated URL slugs | LOW — marginal SEO benefit at current scale | HIGH — rewrites switcher + hreflang logic | P3 / anti-feature |
| Runtime OG generation | LOW — static is sufficient | HIGH — requires SSR adapter | Anti-feature |
| English fallback for untranslated blog posts | LOW — breaks language promise | MEDIUM — new routing logic | Anti-feature |

---

## Sources

- [Satori README — font format requirements (TTF/OTF/WOFF, no WOFF2)](https://github.com/vercel/satori)
- [Astro + Satori static OG image generation pattern](https://knaap.dev/posts/dynamic-og-images-with-any-static-site-generator/)
- [Build-time Astro OG with prerender=true](https://dietcode.io/p/astro-og/)
- [Astro i18n routing documentation — fallback config](https://docs.astro.build/en/guides/internationalization/)
- [URL slug translation: nice-to-have, not must-have; Ahrefs example](https://simplelocalize.io/blog/posts/urls-in-website-localization/)
- [Weglot multilingual URL translation guide](https://www.weglot.com/blog/multilingual-url)
- [Multilingual blog strategy — hide untranslated over fallback](https://translatepress.com/multilingual-blogging/)
- [Intl.DateTimeFormat MDN docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat)
- [Handling dates/numbers/currencies in i18n](https://simplelocalize.io/blog/posts/handling-dates-times-numbers-localization/)
- [Noto CJK font releases — TTF variants available](https://github.com/notofonts/noto-cjk/releases)
- [og:locale best practices — OG protocol specification](https://ogp.me/)
- [Astro multilingual content collections pattern](https://phrase.com/blog/posts/astrojs-localization-multilingual-static-sites/)

---

*Feature research for: Tuwa Marketing Website v4.1 i18n follow-ups*
*Researched: 2026-05-25*
