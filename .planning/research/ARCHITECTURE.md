# Architecture Patterns: v4.1 Internationalization Follow-ups

**Project:** Tuwa Marketing Website
**Researched:** 2026-05-25
**Confidence:** HIGH (based on direct source inspection of the live codebase)

---

## Existing Architecture Baseline (v4.0 — What Is Already Shipped)

Understanding what is already in place is the prerequisite for every v4.1 decision.

### Routing

- Astro i18n routing: `prefixDefaultLocale: false`. EN lives at `/`, ZH at `/zh/`, FR at `/fr/`.
- 33 static pages. Page file structure is duplicated: canonical pages under `src/pages/`, plus `src/pages/zh/` and `src/pages/fr/` mirror trees. Each locale variant is a standalone `.astro` file that imports the correct `use*Translations(locale)` function and passes `locale` prop down.
- **No slug translation exists today.** All three locales share identical URL path segments (`/features/recovery-scoring`, `/zh/features/recovery-scoring`, `/fr/features/recovery-scoring`). The path segment is the same English string in every locale.

### Translation System

- Per-page TypeScript namespace files in `src/i18n/locales/{en,zh,fr}/*.ts`.
- `src/i18n/utils.ts` imports all namespace files and exports typed `use*Translations(locale)` getter functions (one per namespace: `useTranslations`, `useHomeTranslations`, `useRecoveryScoringTranslations`, etc.).
- Type safety: EN file is the canonical type source; ZH/FR files must satisfy `Record<Locale, typeof EN>`.
- `Locale = 'en' | 'zh' | 'fr'` is exported from `utils.ts`.

### Layout Hierarchy

```
BaseLayout (locale prop, emits <html lang=...>, loads GeneralSans, wires SEO + Header + Footer)
  └─ CJKLayout (wraps BaseLayout, injects locale="zh", slots in CJKFonts via <slot name="head">)
  └─ FeaturePageLayout (wraps BaseLayout, takes locale prop, renders Hero section + DeviceFrame + slot + FeatureCTA)
  └─ CoachingPageLayout (wraps BaseLayout, similar to FeaturePageLayout but two-column layout for coaching page)
  └─ LegalPageLayout (wraps BaseLayout, full-width prose layout for privacy/terms/support)
  └─ BlogPostLayout (wraps BaseLayout, article layout, passes hreflangAlternates=[] to suppress hreflangs on posts)
```

CJKLayout is only used by `src/pages/zh/index.astro`. The feature pages under `zh/` do NOT use CJKLayout — they import `@fontsource/noto-sans-sc` directly at the top of the page file and inject a `<style is:global>` block that overrides `--font-general-sans` for `html[lang="zh"]`. This is a pattern inconsistency: zh home uses CJKLayout, zh features use manual imports.

### OG Images

**Current state:** Static PNG files hand-crafted and placed in `public/og/`. Five feature pages (`recovery-scoring.png`, `workload-tracking.png`, `smart-templates.png`, `cold-start.png`, `coaching.png`) plus `og-default.png` at root. **Satori is NOT installed** — no `satori` or `@vercel/og` dependency in `package.json`.

All locale variants of a feature page point to the **same English OG image**:
- `src/pages/features/recovery-scoring.astro` → `ogImage="/og/recovery-scoring.png"`
- `src/pages/zh/features/recovery-scoring.astro` → `ogImage="/og/recovery-scoring.png"` (same)
- `src/pages/fr/features/recovery-scoring.astro` → `ogImage="/og/recovery-scoring.png"` (same)

ZH/FR home and coaching pages pass no `ogImage` prop, so they fall through to the `og-default.png` fallback in `SEO.astro`.

### SEO Component (SEO.astro)

Receives: `title`, `description`, `ogImage`, `canonical`, `type`, `locale`, `hreflangAlternates`.

**Key behaviour for v4.1 planning:**

1. `hreflang` derivation today: strips locale prefix from `Astro.url.pathname` to get `pathWithoutLocale`, then constructs EN=`siteOrigin + pathWithoutLocale`, ZH=`siteOrigin + /zh + pathWithoutLocale`, FR=`siteOrigin + /fr + pathWithoutLocale`. This is purely string arithmetic — it assumes path segments are identical across locales. When translated slugs differ, this arithmetic will produce wrong hreflang hrefs.

2. `hreflangAlternates` can be overridden by passing the prop directly. BlogPostLayout passes `[]` to suppress hreflangs on posts.

3. `og:image` is emitted as-is from the `ogImage` prop.

### Sitemap

`@astrojs/sitemap` with `i18n` config block. The integration auto-discovers pages from Astro's static route output and annotates each URL with `<xhtml:link>` elements for all locales. It infers the locale-to-URL mapping by appending the locale prefix to the canonical URL. This again assumes path segments are identical across locales.

### Language Switcher (Header.astro)

Strips the locale prefix from `Astro.url.pathname` to derive `pathWithoutLocale`, then calls `getRelativeLocaleUrl(code, pathWithoutLocale)` for each locale link. This works correctly today because all locale variants share the same path segment after the prefix.

With translated slugs, stripping the prefix and using the EN path segment will produce a URL that may not exist in ZH or FR (because those locales will have a translated segment). The switcher needs a slug-translation lookup table.

### Blog

`src/content/blog/` exists but contains only a `.gitkeep`. The blog collection schema in `content.config.ts` uses `glob({ pattern: '**/*.mdx', base: './src/content/blog' })` — a flat loader with no locale awareness. `[...slug].astro` routes on `post.id` (the file path relative to the base). ZH/FR blog listing pages (`src/pages/zh/blog/index.astro`) link to `/zh/blog/${post.id}` — but no `zh/blog/[...slug].astro` route exists yet.

### Locale Date Formatting

`blog/index.astro` hardcodes `toLocaleDateString('en-US', ...)`. `src/pages/zh/blog/index.astro` hardcodes `toLocaleDateString('zh-CN', ...)`. There is no shared Intl formatting utility — formatting is inline per page. `BlogPostLayout.astro` hardcodes `toLocaleDateString('en-US', ...)` with no locale prop.

---

## Feature 1: Translated OG Images (Satori)

### What it is

Per-locale PNG OG preview cards generated at build time via satori. Each locale variant of each page gets its own branded OG image with localized text (title + tagline in ZH or FR). Covers the home page, 5 feature pages (15 images total: 5 pages × 3 locales), and eventually blog posts.

### Current gap

All locale variants point to the same English PNG in `public/og/`. Satori is not installed. There is no Astro endpoint or build script generating images dynamically.

### Integration point: where OG generation lives

The standard Astro pattern for build-time OG images is an **Astro API endpoint** at `src/pages/og/[...path].png.ts` (or `.ts` with `ContentType: 'image/png'`). The endpoint uses `getStaticPaths()` to enumerate all page × locale combinations, calls satori with the page's title/description and font bytes, and returns a PNG buffer. Astro builds this into static PNG files in `dist/og/`.

Because this is a static site (no adapter), the endpoint must export `getStaticPaths` — dynamic server-side generation at request time is not available.

**Recommended endpoint shape:**
```
src/pages/og/[locale]/[page].png.ts
```
- `locale` params: `en`, `zh`, `fr`
- `page` params: `index`, `recovery-scoring`, `workload-tracking`, `smart-templates`, `cold-start`, `coaching`, plus blog post slugs
- Output path: `dist/og/en/index.png`, `dist/og/zh/index.png`, etc.

This produces predictable, locale-specific paths. After adding satori images, the per-page wrappers update `ogImage` from `/og/recovery-scoring.png` to `/og/{locale}/recovery-scoring.png`.

**Alternative (simpler but less flexible):** Keep flat `public/og/` structure, name files `recovery-scoring-zh.png` etc. and hard-code paths. This avoids the endpoint pattern but requires manual regeneration if card design changes. Reject this — satori endpoint is the right investment.

### Font loading inside satori

Satori does not use CSS font stacks — it requires font file bytes to be explicitly loaded as `ArrayBuffer` and passed to the `fonts` option.

**For EN and FR (Latin glyphs):** Load `GeneralSans-Variable.woff2` from `public/fonts/`. At build time this is readable via `fs.readFileSync` or `Astro.glob`. Note: satori supports OTF/TTF but has partial woff2 support. Prefer providing a TTF fallback if the woff2 fails to parse. The safest approach is to convert GeneralSans to TTF for the OG endpoint only (keep woff2 on the actual site).

**For ZH (CJK glyphs):** Satori requires a CJK font with full glyph coverage. `@fontsource/noto-sans-sc` is already installed. The fontsource package ships TTF files under `node_modules/@fontsource/noto-sans-sc/files/`. Load `noto-sans-sc-chinese-simplified-400-normal.woff2` (or the TTF variant) at build time. **Critical concern:** Full Noto Sans SC CJK coverage is 5–15 MB. Satori will only subset glyphs actually used in the rendered string, so build-time memory is bounded by the card text, not the full font. This is acceptable.

**For FR:** Latin only, same font as EN. No additional font needed.

### New vs Modified

| File | Status | Notes |
|------|--------|-------|
| `src/pages/og/[locale]/[page].png.ts` | NEW | Satori endpoint, enumerates all page × locale combinations |
| `src/lib/og/template.tsx` (or `.ts`) | NEW | JSX-in-JS template function for the card layout, accepts `{ title, locale, pageName }` |
| `src/lib/og/fonts.ts` | NEW | Font buffer loader, cached as module-level const to avoid re-reading per path |
| `src/pages/zh/features/recovery-scoring.astro` (×5 feature pages) | MODIFIED | `ogImage` prop updated from `/og/recovery-scoring.png` to `/og/zh/recovery-scoring.png` |
| `src/pages/fr/features/recovery-scoring.astro` (×5 feature pages) | MODIFIED | Same, `/og/fr/recovery-scoring.png` |
| `src/pages/features/recovery-scoring.astro` (×5 EN feature pages) | MODIFIED | `/og/en/recovery-scoring.png` (or keep legacy path for EN) |
| `src/pages/zh/index.astro`, `src/pages/fr/index.astro` | MODIFIED | Add `ogImage` prop pointing to locale-specific home card |
| `package.json` | MODIFIED | Add `satori` dependency |

### Dependency note

OG generation is independent of slug translation. It can ship before or after slug work. However, if slug translation changes the page param names, the OG endpoint's `getStaticPaths` will need to know both the canonical EN page name (for the card content source) and the locale-specific slug (for the output path). Build OG images after slug scheme is decided.

---

## Feature 2: Translated URL Slugs

### What it is

Localized path segments under `/zh/` and `/fr/`. Instead of `/zh/features/recovery-scoring`, the Chinese URL becomes something like `/zh/功能/恢复评分` or a romanized equivalent like `/zh/features/recovery-monitoring`. For French, `/fr/fonctionnalites/score-de-recuperation`.

### The slug-translation ripple effect (end-to-end trace)

This is the most architecturally complex feature because a slug decision propagates through four systems that currently share the assumption that path segments are identical across locales.

**Step 1: Page file structure and `getStaticPaths`**

Today: `src/pages/zh/features/recovery-scoring.astro` — filename directly becomes the URL segment.

With translated slugs, you cannot use the filename approach because Astro derives the URL from the file path. Two options:

**Option A: Rename the locale wrapper files to use translated filenames.**
`src/pages/zh/features/recovery-scoring.astro` → `src/pages/zh/features/恢复评分.astro` (or `recovery-monitoring.astro` if using transliterated slugs).
- Pros: zero config, Astro resolves URL automatically.
- Cons: Chinese characters in filenames cause cross-platform issues (macOS/Linux OK, Windows sometimes not, some CI environments have problems). Transliterated slugs avoid this but defeat the purpose of localized URLs for CJK.

**Option B: Use a dynamic route `src/pages/zh/features/[slug].astro` with `getStaticPaths`.**
The `getStaticPaths` function returns a map of translated slug → EN content source.

```typescript
// src/pages/zh/features/[slug].astro
export function getStaticPaths() {
  return [
    { params: { slug: 'recovery-monitoring' }, props: { pageKey: 'recovery-scoring' } },
    { params: { slug: 'workload-tracking' }, props: { pageKey: 'workload-tracking' } },
    // ...
  ];
}
```

The page body selects translation namespace and component based on `pageKey`. This centralizes slug translation in one place per locale.

**Recommended: Option B** — dynamic routes with a slug mapping table. Avoids filename encoding issues, keeps the mapping explicit and type-safe, and makes it easy to iterate slug choices without renaming files.

**The slug mapping table lives in `src/i18n/slugs.ts`** (NEW file):

```typescript
export const SLUG_MAP: Record<Locale, Record<string, string>> = {
  en: {
    'recovery-scoring': 'recovery-scoring',
    'workload-tracking': 'workload-tracking',
    'smart-templates': 'smart-templates',
    'cold-start': 'cold-start',
    'coaching': 'coaching',
  },
  zh: {
    'recovery-scoring': 'recovery-monitoring',   // example
    // ...
  },
  fr: {
    'recovery-scoring': 'score-de-recuperation', // example
    // ...
  },
};

// Reverse lookup: translated slug → canonical EN key
export const REVERSE_SLUG_MAP: Record<Locale, Record<string, string>> = { ... };
```

**Step 2: Language switcher (Header.astro) — the critical breakage point**

Current logic in `Header.astro`:
```javascript
const pathWithoutLocale = knownLocales.includes(pathSegments[1])
  ? '/' + pathSegments.slice(2).join('/')
  : rawPath;
// Then: getRelativeLocaleUrl(code, pathWithoutLocale)
```

With translated slugs, this extracts the ZH slug (e.g., `/recovery-monitoring`) and passes it to `getRelativeLocaleUrl('fr', '/recovery-monitoring')`, producing `/fr/features/recovery-monitoring` — which does not exist in FR.

**Required fix:** The switcher needs to resolve the canonical EN page key from the current URL's slug, then look up the target locale's slug.

```typescript
// NEW helper in src/i18n/slugs.ts
export function getLocalizedUrl(fromLocale: Locale, fromPath: string, toLocale: Locale): string {
  // 1. Strip locale prefix to get path-without-locale
  // 2. Extract feature segment (e.g., 'recovery-monitoring' from '/features/recovery-monitoring')
  // 3. Reverse-lookup canonical key from REVERSE_SLUG_MAP[fromLocale]
  // 4. Forward-lookup toLocale slug from SLUG_MAP[toLocale]
  // 5. Reconstruct full localized path
}
```

Header.astro replaces `getRelativeLocaleUrl(code, pathWithoutLocale)` with `getLocalizedUrl(locale, rawPath, code)`.

**Same fix required in MobileMenu.astro** — it uses an identical pattern.

**Step 3: SEO.astro hreflang derivation**

Current derivation in `SEO.astro`:
```javascript
const pathWithoutLocale = currentPath.replace(/^\/(zh|fr)(\/|$)/, '/');
const siteLocales = [
  { hreflang: 'en', href: `${siteOrigin}${pathWithoutLocale}` },
  { hreflang: 'zh', href: `${siteOrigin}/zh${pathWithoutLocale}` },
  { hreflang: 'fr', href: `${siteOrigin}/fr${pathWithoutLocale}` },
];
```

With translated slugs, `/fr/features/score-de-recuperation` → strips prefix → `/features/score-de-recuperation` → constructs ZH href as `/zh/features/score-de-recuperation` — wrong. The ZH href should be `/zh/features/recovery-monitoring`.

**Required fix:** SEO.astro needs access to the slug mapping. Two design options:

**Option A:** Each locale page passes `hreflangAlternates` explicitly as a prop (fully computed in the page file, not derived in SEO.astro). This pushes slug awareness into the page files but removes all arithmetic from SEO.astro.

**Option B:** SEO.astro receives a `canonicalPageKey` prop (the EN slug, e.g., `'recovery-scoring'`) and derives hreflangs using `SLUG_MAP`. SEO.astro imports `SLUG_MAP` directly.

**Recommended: Option A (explicit hreflangAlternates)** for feature pages with translated slugs. Option B requires SEO.astro to know the page-level context, which couples it tightly to the routing scheme. Passing explicit alternates via props is already the escape hatch (it exists in the current Props interface). A shared `buildHreflangAlternates(canonicalKey, locale)` helper in `src/i18n/slugs.ts` makes this ergonomic.

**Step 4: Sitemap generation (@astrojs/sitemap)**

The `@astrojs/sitemap` integration auto-discovers routes from Astro's static output. With dynamic `[slug].astro` routes and translated slugs, the integration will discover the translated URLs naturally — it reads from the built `dist/` output. The `i18n` config in `astro.config.mjs` maps `zh` → `zh-CN` and `fr` → `fr`.

The integration generates `<xhtml:link>` annotations for alternate locales. Its algorithm matches pages by URL structure. With translated slugs, the integration may not correctly match `/features/recovery-scoring` (EN) with `/zh/features/recovery-monitoring` (ZH) and `/fr/features/score-de-recuperation` (FR) as the same logical page, because it cannot know the canonical equivalence.

**This is the key known risk:** `@astrojs/sitemap` relies on URL-pattern matching to group locale variants. If the path segments differ, it may emit each URL as an independent entry without cross-locale `xhtml:link` annotations, or it may emit incorrect groupings.

**Mitigation options:**

1. Use the `sitemap` integration's `customPages` or `serialize` filter hook to manually inject `xhtml:link` annotations for the translated slug pages. This requires iterating the slug map and constructing entries.

2. Pass a pre-computed `sitemap` configuration entry. `@astrojs/sitemap` accepts a `serialize` callback that receives each `SitemapItem` and can add `links` (the xhtml:link array). This is the recommended approach: in `astro.config.mjs`, add a `serialize` function that, for any URL matching a translated feature path, injects the correct cross-locale alternates.

3. Fall back to a manually maintained `sitemap.xml` for the translated slug pages only, supplementing the auto-generated sitemap. Reject — maintenance burden.

**The slug map must be importable from `astro.config.mjs`** for the sitemap serialize callback to use it. This means `src/i18n/slugs.ts` must export a pure CommonJS-compatible (or ESM) object with no Astro-specific imports.

### New vs Modified

| File | Status | Notes |
|------|--------|-------|
| `src/i18n/slugs.ts` | NEW | `SLUG_MAP`, `REVERSE_SLUG_MAP`, `buildHreflangAlternates()`, `getLocalizedUrl()` |
| `src/pages/zh/features/[slug].astro` | NEW | Dynamic route replacing the 5 individual ZH feature files |
| `src/pages/fr/features/[slug].astro` | NEW | Dynamic route replacing the 5 individual FR feature files |
| `src/pages/zh/features/recovery-scoring.astro` (×5) | DELETED | Replaced by dynamic route |
| `src/pages/fr/features/recovery-scoring.astro` (×5) | DELETED | Replaced by dynamic route |
| `src/components/Header.astro` | MODIFIED | Switcher links use `getLocalizedUrl()` instead of `getRelativeLocaleUrl(code, pathWithoutLocale)` |
| `src/components/MobileMenu.astro` | MODIFIED | Same switcher link fix |
| `src/components/SEO.astro` | MODIFIED | Feature pages pass explicit `hreflangAlternates`; auto-derivation logic needs slug-awareness for fallback |
| `astro.config.mjs` | MODIFIED | Add `serialize` callback to sitemap config to inject correct xhtml:link for translated slug pages |

**Important:** EN feature pages do NOT need dynamic routes — the EN slug is the canonical slug and the current static file structure is correct. Only ZH and FR get dynamic `[slug].astro` routes.

---

## Feature 3: Blog Post Translations

### What it is

Per-locale MDX blog posts with i18n routing. A post exists in EN, optionally in ZH, optionally in FR. The blog listing page per locale shows only posts available in that locale. Post URLs follow the slug conventions of the locale.

### Current gap

- `src/content/blog/` is empty (only `.gitkeep`).
- No `zh/blog/[...slug].astro` or `fr/blog/[...slug].astro` route exists.
- `BlogPostLayout.astro` has no `locale` prop — it hardcodes `'en-US'` for date formatting.
- `content.config.ts` has a single `blog` collection with no locale field.

### Content collection design decision

Two patterns exist for multilingual content collections:

**Pattern A: Single collection, locale in frontmatter.**
```
src/content/blog/
  my-post.en.mdx       (or my-post.mdx)
  my-post.zh.mdx
  my-post.fr.mdx
```
The `glob` loader picks up all files. Each post's `id` includes the locale suffix. The schema adds a required `locale` field. `getStaticPaths` filters by locale.

**Pattern B: Separate collections per locale.**
```
src/content/blog/
  en/my-post.mdx
  zh/my-post.zh.mdx
  fr/my-post.fr.mdx
```
Define `blogEn`, `blogZh`, `blogFr` collections in `content.config.ts`. Or use subdirectory-based glob patterns within a single collection.

**Recommended: Pattern A with locale in filename and frontmatter.** One collection, `locale` as a required frontmatter field. The `id` naturally encodes locale (e.g., `my-post.en.mdx` → id = `my-post.en`). This keeps `content.config.ts` simple and allows `getCollection('blog', { filter: data.locale === 'zh' })` queries.

**Schema update to `content.config.ts`:**

```typescript
const blog = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    description: z.string(),
    locale: z.enum(['en', 'zh', 'fr']).default('en'),
    slug: z.string().optional(),  // explicit translated slug; falls back to filename slug
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    coverImage: z.string().optional(),
    canonicalKey: z.string().optional(), // links zh/fr posts back to the EN canonical
  }),
});
```

### Routing for blog posts

**EN posts:** `src/pages/blog/[...slug].astro` already exists. Update its `getStaticPaths` to filter `data.locale === 'en'` (or absent locale field for backward compatibility).

**ZH posts:** NEW `src/pages/zh/blog/[...slug].astro`. `getStaticPaths` filters `data.locale === 'zh'`, maps `post.data.slug ?? post.id` to the `slug` param.

**FR posts:** NEW `src/pages/fr/blog/[...slug].astro`. Same pattern.

**Cross-locale hreflang for posts:** Posts may not exist in all locales. `BlogPostLayout.astro` passes `hreflangAlternates={[]}` to SEO today (suppresses hreflangs). Once ZH/FR variants exist, posts should emit hreflangs only for the locales where a translation exists. `getStaticPaths` in each locale's blog slug route can look up peer posts via `canonicalKey` and pass explicit `hreflangAlternates` as a prop.

### Blog listing pages

`src/pages/zh/blog/index.astro` already exists and links to `/zh/blog/${post.id}`. This will need updating to filter by `locale === 'zh'` once posts have a locale field. Currently it shows all posts regardless of locale, which is a bug waiting to happen once EN posts are added — a ZH reader would see EN post titles in the ZH listing.

### BlogPostLayout locale prop

`BlogPostLayout.astro` needs a `locale` prop to:
1. Pass to `BaseLayout` so `<html lang>` is correct.
2. Pass to `SEO.astro` so `og:locale` is correct.
3. Format `date` correctly (currently hardcodes `en-US`).
4. Load CJK fonts if `locale === 'zh'`.

The CJK font loading for ZH blog posts is the tricky part. `BlogPostLayout` does not currently use `CJKLayout`. Options:
- Add a conditional `{locale === 'zh' && <CJKFonts slot="head" />}` inside `BlogPostLayout`. But `BlogPostLayout` wraps `BaseLayout`, not `CJKLayout`, so the `slot="head"` pattern needs wiring through.
- Alternatively, the ZH blog slug route (`src/pages/zh/blog/[...slug].astro`) could import CJK fonts directly (same pattern as zh feature pages).

Recommended: mirror the zh feature page pattern — ZH blog slug page imports `@fontsource/noto-sans-sc` directly. This is consistent with the existing approach and avoids modifying `BlogPostLayout` to thread through font concerns.

### New vs Modified

| File | Status | Notes |
|------|--------|-------|
| `src/content.config.ts` | MODIFIED | Add `locale`, `canonicalKey`, `slug` fields to blog schema |
| `src/content/blog/*.mdx` | NEW | Actual post content files (as many as authored) |
| `src/pages/zh/blog/[...slug].astro` | NEW | ZH post route |
| `src/pages/fr/blog/[...slug].astro` | NEW | FR post route |
| `src/pages/blog/[...slug].astro` | MODIFIED | Filter to `locale === 'en'`; pass `locale` prop to BlogPostLayout |
| `src/pages/zh/blog/index.astro` | MODIFIED | Filter to `locale === 'zh'` |
| `src/pages/fr/blog/index.astro` | MODIFIED | Filter to `locale === 'fr'` |
| `src/layouts/BlogPostLayout.astro` | MODIFIED | Add `locale` prop; thread through to BaseLayout + SEO; fix date formatting |

---

## Feature 4: Locale Date/Number Formatting

### What it is

A shared `src/i18n/format.ts` utility that centralises `Intl.DateTimeFormat` and `Intl.NumberFormat` calls. Pages and layouts call `formatDate(date, locale)` instead of inline `toLocaleDateString(...)`.

### Current gaps

- `blog/index.astro` hardcodes `toLocaleDateString('en-US', ...)`.
- `src/pages/zh/blog/index.astro` hardcodes `toLocaleDateString('zh-CN', ...)`.
- `BlogPostLayout.astro` hardcodes `toLocaleDateString('en-US', ...)`.
- `BaseLayout.astro` has a counter animation that calls `toLocaleString()` with no locale argument — uses browser default, not page locale. This is a minor inconsistency for stat counters on ZH/FR pages.

### Design

```typescript
// src/i18n/format.ts  (NEW)

import type { Locale } from './utils';

const BCP47: Record<Locale, string> = {
  en: 'en-US',
  zh: 'zh-CN',
  fr: 'fr-FR',
};

export function formatDate(
  date: Date,
  locale: Locale,
  options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' }
): string {
  return new Intl.DateTimeFormat(BCP47[locale], options).format(date);
}

export function formatNumber(
  value: number,
  locale: Locale,
  options?: Intl.NumberFormatOptions
): string {
  return new Intl.NumberFormat(BCP47[locale], options).format(value);
}
```

`formatDate` and `formatNumber` are called at **build time** inside Astro component frontmatter — they run in Node, not the browser. `Intl` is fully available in Node 22.

### Propagation

The counter animation in `BaseLayout.astro` calls `target.toLocaleString()` client-side (in the browser) — this is fine and intentional (uses the browser's locale). The `Intl` formatting utility is for **server-rendered** date/number strings in templates, not runtime JS.

### New vs Modified

| File | Status | Notes |
|------|--------|-------|
| `src/i18n/format.ts` | NEW | `formatDate()`, `formatNumber()`, `BCP47` locale map |
| `src/pages/blog/index.astro` | MODIFIED | Replace inline `toLocaleDateString` with `formatDate(post.data.date, 'en')` |
| `src/pages/zh/blog/index.astro` | MODIFIED | Replace with `formatDate(post.data.date, 'zh')` |
| `src/pages/fr/blog/index.astro` | MODIFIED | Replace with `formatDate(post.data.date, 'fr')` |
| `src/layouts/BlogPostLayout.astro` | MODIFIED | Replace inline date format with `formatDate(date, locale)` |

---

## Cross-Feature Data Flow: Slug Translation End-to-End

This traces how a translated slug propagates consistently through all systems:

```
1. SLUG_MAP defined in src/i18n/slugs.ts
   └─ canonical EN key: 'recovery-scoring'
   └─ zh slug: 'recovery-monitoring' (example)
   └─ fr slug: 'score-de-recuperation' (example)

2. Routing
   src/pages/zh/features/[slug].astro
     getStaticPaths() reads SLUG_MAP['zh'] → { params: { slug: 'recovery-monitoring' }, props: { pageKey: 'recovery-scoring' } }
     → Astro builds /zh/features/recovery-monitoring

3. Language Switcher (Header.astro + MobileMenu.astro)
   User is on /zh/features/recovery-monitoring
   → getLocalizedUrl('zh', '/zh/features/recovery-monitoring', 'fr')
     → strips prefix → path = '/features/recovery-monitoring'
     → extracts slug = 'recovery-monitoring'
     → REVERSE_SLUG_MAP['zh']['recovery-monitoring'] = 'recovery-scoring' (canonical)
     → SLUG_MAP['fr']['recovery-scoring'] = 'score-de-recuperation'
     → returns '/fr/features/score-de-recuperation'
   Switcher links render correctly for all locale transitions.

4. SEO.astro hreflang
   Feature page passes explicit hreflangAlternates:
     buildHreflangAlternates('recovery-scoring') →
       [
         { hreflang: 'en', href: 'https://tuwa.app/features/recovery-scoring' },
         { hreflang: 'zh', href: 'https://tuwa.app/zh/features/recovery-monitoring' },
         { hreflang: 'fr', href: 'https://tuwa.app/fr/features/score-de-recuperation' },
       ]
   SEO.astro emits these verbatim (the prop override path, not the auto-derivation).
   x-default points to EN canonical.

5. Sitemap
   astro.config.mjs serialize callback:
     receives SitemapItem { url: 'https://tuwa.app/zh/features/recovery-monitoring' }
     → matches SLUG_MAP pattern
     → injects links: [
         { lang: 'en', url: 'https://tuwa.app/features/recovery-scoring' },
         { lang: 'zh-CN', url: 'https://tuwa.app/zh/features/recovery-monitoring' },
         { lang: 'fr', url: 'https://tuwa.app/fr/features/score-de-recuperation' },
       ]
   Sitemap entries are correct and consistent with hreflang.

6. OG Image endpoint
   src/pages/og/[locale]/[page].png.ts
   getStaticPaths() iterates SLUG_MAP to produce paths:
     { params: { locale: 'zh', page: 'recovery-monitoring' } }
   Content sourced from useRecoveryScoringTranslations('zh').
   Output: dist/og/zh/recovery-monitoring.png
   Feature page references: ogImage="/og/zh/recovery-monitoring.png"
```

All four systems use `SLUG_MAP` as the single source of truth. Any slug rename is a one-file change.

---

## Component Boundaries Summary

| Component | v4.0 State | v4.1 Changes |
|-----------|------------|--------------|
| `SEO.astro` | Auto-derives hreflangs from URL arithmetic | MODIFIED: feature pages pass explicit alternates via `hreflangAlternates` prop; auto-derivation kept as fallback for simple pages |
| `Header.astro` | `getRelativeLocaleUrl(code, pathWithoutLocale)` for switcher links | MODIFIED: use `getLocalizedUrl()` from slugs.ts |
| `MobileMenu.astro` | Same switcher pattern as Header | MODIFIED: same fix |
| `BlogPostLayout.astro` | No locale prop, hardcoded `en-US` dates | MODIFIED: add `locale` prop, use `formatDate()` |
| `CJKLayout.astro` | Wraps BaseLayout for zh home only | UNCHANGED (zh blog posts handle CJK fonts in the page file, not via this layout) |
| `BaseLayout.astro` | Accepts `locale` prop | UNCHANGED for v4.1 |
| `FeaturePageLayout.astro` | Accepts `ogImage` and `locale` props | UNCHANGED — ogImage value changes at call sites, not in layout |

---

## New Files Summary

| File | Purpose |
|------|---------|
| `src/i18n/slugs.ts` | `SLUG_MAP`, `REVERSE_SLUG_MAP`, `buildHreflangAlternates()`, `getLocalizedUrl()` — single source of truth for translated slugs |
| `src/i18n/format.ts` | `formatDate()`, `formatNumber()` using `Intl` API |
| `src/pages/zh/features/[slug].astro` | Dynamic ZH feature route, replaces 5 static files |
| `src/pages/fr/features/[slug].astro` | Dynamic FR feature route, replaces 5 static files |
| `src/pages/zh/blog/[...slug].astro` | ZH blog post route |
| `src/pages/fr/blog/[...slug].astro` | FR blog post route |
| `src/pages/og/[locale]/[page].png.ts` | Satori OG image endpoint |
| `src/lib/og/template.ts` | OG card layout function (returns satori-compatible JSX/VDOM) |
| `src/lib/og/fonts.ts` | Font buffer loader for satori (GeneralSans TTF + Noto Sans SC) |

---

## Dependency-Ordered Build Sequence

The four features have inter-dependencies. Build order matters.

### Phase A: Locale Formatting Utility (no dependencies)

Build `src/i18n/format.ts` first. It depends only on the `Locale` type from `utils.ts` (already exists). Updating blog listing pages and `BlogPostLayout` to use it can happen immediately. This is the smallest change and de-risks the blog infrastructure before adding posts.

**Deliverables:** `format.ts` (new) + `BlogPostLayout.astro` locale prop + blog listing page fixes.

### Phase B: Slug Translation Infrastructure (depends on: nothing external, but must precede OG + sitemap)

Build `src/i18n/slugs.ts` (SLUG_MAP + helpers). This is pure data + pure functions, no Astro dependencies. Test the `getLocalizedUrl` and `buildHreflangAlternates` helpers in isolation.

Then wire the slug map:
1. Create `src/pages/zh/features/[slug].astro` and `src/pages/fr/features/[slug].astro`. Delete the 5 individual static files per locale.
2. Update `Header.astro` and `MobileMenu.astro` to use `getLocalizedUrl`.
3. Update feature page wrappers to pass `hreflangAlternates` explicitly via `buildHreflangAlternates`.
4. Update `astro.config.mjs` sitemap serialize callback.

Build and verify: `npx astro build` should produce the translated-slug paths. Verify sitemap.xml contains correct xhtml:link entries. Verify language switcher produces correct URLs.

**Deliverables:** `slugs.ts` + dynamic feature routes + Header/MobileMenu fix + sitemap serialize callback.

### Phase C: Blog Post Translation (depends on: Phase A for date formatting; Phase B for slug infrastructure understanding)

Add locale + canonicalKey to `content.config.ts`. Create `src/pages/zh/blog/[...slug].astro` and `src/pages/fr/blog/[...slug].astro`. Update listing pages to filter by locale. Wire locale prop through `BlogPostLayout`. Add actual MDX post files.

Blog post slugs may also be translated. If they are, extend `SLUG_MAP` to include a `blog` namespace, or handle blog slugs via the `slug` frontmatter field in MDX (simpler — the explicit `slug` in frontmatter overrides `post.id`). The switcher for blog posts needs cross-locale lookup via `canonicalKey` in frontmatter.

**Deliverables:** Content schema update + ZH/FR blog routes + listing page fixes + first translated post(s).

### Phase D: Translated OG Images via Satori (depends on: Phase B slug decisions)

Install satori. Implement font loader. Build the OG card template. Create the endpoint. Update all feature page `ogImage` props to reference locale-specific paths.

Satori must be built after slug translation is finalised because the OG endpoint's `getStaticPaths` references the translated slug names for its output file paths.

**Deliverables:** `satori` in package.json + `src/lib/og/` + OG endpoint + updated `ogImage` props across all locale wrappers.

---

## Known Risks and Open Questions

### Risk 1: @astrojs/sitemap serialize callback API

The serialize callback in `@astrojs/sitemap` v3 accepts `(item: SitemapItem) => SitemapItem | false`. The `SitemapItem` type includes a `links` field for alternate locale URLs. This needs verification against the current v3.7.2 docs — the API surface has changed between v2 and v3. If `links` injection via serialize is not supported, the fallback is to post-process the generated `sitemap.xml` file in the build script (analogous to the existing `cp dist/zh/404/index.html dist/zh/404.html` post-build step in `package.json`).

### Risk 2: Satori + woff2

Satori's woff2 parsing support is partial. GeneralSans is distributed as woff2. A TTF version of GeneralSans is needed for the OG endpoint. Check if Fontshare provides TTF downloads, or convert using `woff2` CLI tool. This is a one-time setup cost, not a recurring risk.

### Risk 3: Satori + Noto Sans SC file size at build time

Full Noto Sans SC TTF is ~15 MB. Satori subsets dynamically based on the rendered string, so the memory hit is proportional to the card text, not the full font. This is acceptable for a static build. If build times become unacceptable, pre-subset the font to a curated character set covering the 300–400 most common Hanzi used on the site.

### Risk 4: Translated slug SEO equity

Changing URLs from `/zh/features/recovery-scoring` to `/zh/features/recovery-monitoring` is a URL change. Old URLs under `/zh/` have no inbound links (the site is new and /zh/ was only shipped in v4.0), so no redirect is needed. Implement translated slugs before the ZH/FR pages accumulate any backlinks — this window is now.

### Risk 5: Blog routing for cross-locale post discovery

The `canonicalKey` approach for linking EN ↔ ZH ↔ FR post variants requires author discipline. A ZH post without a `canonicalKey` will have no hreflang cross-reference. This is acceptable — single-locale posts are valid; hreflang is simply omitted for them.

---

## Sources

- Direct source inspection: `src/components/SEO.astro`, `src/components/Header.astro`, `src/i18n/utils.ts`, `astro.config.mjs`, `src/content.config.ts`, `src/layouts/*.astro`, `src/pages/zh/features/recovery-scoring.astro`, `src/pages/fr/features/recovery-scoring.astro`, `src/pages/zh/blog/index.astro`, `package.json` — all inspected 2026-05-25 on HEAD of main branch.
- Astro i18n routing docs: `prefixDefaultLocale: false` confirmed in live `astro.config.mjs`.
- @astrojs/sitemap v3.7.2 in `package.json` — serialize callback API needs verification (flagged as Risk 1 above).
- Satori not yet installed — OG generation is greenfield work in this codebase.
