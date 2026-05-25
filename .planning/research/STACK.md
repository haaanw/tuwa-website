# Technology Stack: v4.1 Internationalization Follow-ups

**Project:** Tuwa Marketing Website — i18n Follow-ups
**Researched:** 2026-05-25
**Scope:** Stack decisions for four new features: translated OG images, translated URL slugs, blog post translations, locale date/number formatting. Existing v4.0 stack is validated — this document covers only additions and changes.

---

## Feature 1: Translated OG Images (satori)

### Current state

The site has static PNG files in `public/og/` per page, referenced directly in `<meta og:image>` tags. There is no satori dependency yet. The v4.0 OG images are English-only; zh and fr pages share the same English image.

### Decision: satori + @resvg/resvg-js via Astro static endpoints

**Why satori** — it is the only battle-tested build-time SVG-from-JSX library with explicit CJK rendering support via `loadAdditionalAsset`. @vercel/og wraps satori but adds React as a hard dependency and is designed for edge runtime (server), not static generation. Use satori directly.

**Why @resvg/resvg-js** — satori outputs SVG; @resvg/resvg-js converts SVG to PNG using a Rust binding (same engine @vercel/og uses internally). It is the de facto pairing in the Astro community. sharp can also rasterize SVG but is heavier and adds image-processing capabilities the OG pipeline does not need.

**Endpoint pattern** — Astro static endpoints (`src/pages/og/[locale]/[slug].png.ts`) with `getStaticPaths()` generate one PNG per locale per page at build time. The file is written to `dist/og/zh/recovery-scoring.png` etc. and referenced in the `<SEO>` component.

### New packages

| Package | Version | Purpose | Install as |
|---------|---------|---------|-----------|
| `satori` | `^0.27.0` | JSX to SVG at build time | dependency |
| `@resvg/resvg-js` | `^2.6.2` | SVG to PNG (Rust binding) | dependency |

**Do not add** `@vercel/og` — it wraps satori+resvg but forces React and targets edge/server runtime. Use the primitives directly.

**Do not add** `react` or `@types/react` — satori 0.26+ ships a built-in minimal JSX runtime. Enable it per-file with `/** @jsxImportSource satori */` or configure tsconfig.

### Critical: satori CJK font loading

**The core constraint:** satori supports TTF, OTF, and WOFF. WOFF2 is explicitly not supported (confirmed in satori README, current as of 0.27.0). General Sans is only available as WOFF2 in `public/fonts/`. Noto Sans SC from @fontsource ships both WOFF and WOFF2 in `node_modules/@fontsource/noto-sans-sc/files/`.

**CJK rendering approach: `loadAdditionalAsset` callback, not upfront font loading**

Loading all 102 WOFF subset files for Noto Sans SC weight 400 (4.7 MB total) upfront on every OG render would be slow and wasteful. Satori has a `loadAdditionalAsset(code, segment)` callback designed for exactly this: it fires when a glyph is missing from the registered fonts, receives the detected language code and the text segment, and returns either image data (for emoji) or a Buffer of font data for the needed script.

The fontsource subset naming convention is `noto-sans-sc-{rangeIndex}-{weight}-normal.woff`. There are 102 subset files covering the full CJK range. The `loadAdditionalAsset` approach loads only the subset files that contain the actual glyphs being rendered — typically 2-5 files for a short OG title — rather than all 102 upfront.

**Font loading implementation pattern:**

```typescript
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import satori from 'satori';

// General Sans TTF for EN and FR text
// Source: /Users/hanwen/Desktop/Tonus/WorkloadApp/Resources/GeneralSans-Variable.ttf
// Copy this file to: src/assets/fonts/GeneralSans-Variable.ttf
// (satori needs TTF/OTF/WOFF — the WOFF2 in public/fonts/ is unsupported)
const generalSansData = await readFile(
  join(process.cwd(), 'src/assets/fonts/GeneralSans-Variable.ttf')
);

const svg = await satori(element, {
  width: 1200,
  height: 630,
  fonts: [
    {
      name: 'General Sans',
      data: generalSansData,
      weight: 400,
      style: 'normal',
    },
  ],
  loadAdditionalAsset: async (code: string, _segment: string) => {
    if (code === 'zh') {
      // Load one or more Noto Sans SC WOFF subsets from node_modules
      // Satori calls this per-segment with language code 'zh' for CJK
      // Return the first subset that covers the needed glyphs, or concat multiple
      const fontData = await readFile(
        join(process.cwd(), 'node_modules/@fontsource/noto-sans-sc/files/noto-sans-sc-100-400-normal.woff')
      );
      return { name: 'Noto Sans SC', data: fontData, weight: 400, style: 'normal' };
    }
    return undefined;
  },
});
```

**Important:** The `loadAdditionalAsset` callback must return a font descriptor object `{ name, data, weight, style }` — not just the buffer. If `code === 'emoji'` it should return a base64 SVG string. For French accented characters (é, à, ê etc.), they are in the Latin script range and General Sans covers them fully — no additional font needed for French.

**Font file to copy:** General Sans Variable TTF exists at `/Users/hanwen/Desktop/Tonus/WorkloadApp/Resources/GeneralSans-Variable.ttf`. Copy it to `src/assets/fonts/GeneralSans-Variable.ttf` as part of the OG setup phase. Do not use the WOFF2 from `public/fonts/` — satori will fail silently or throw.

**Confidence: MEDIUM-HIGH** — The WOFF/WOFF2 limitation is confirmed from official satori docs. The `loadAdditionalAsset` callback is documented. The exact return shape for font objects (vs. the emoji string return) requires verification against the satori 0.27 source on first implementation. If `loadAdditionalAsset` callback does not trigger for `code === 'zh'`, the fallback is to pre-load a single representative WOFF subset file that covers the specific CJK characters used in OG card titles.

### Vite config changes required

```javascript
// astro.config.mjs additions
export default defineConfig({
  vite: {
    optimizeDeps: {
      exclude: ['@resvg/resvg-js'],
    },
    ssr: {
      external: ['@resvg/resvg-js'],
    },
  },
});
```

`@resvg/resvg-js` is a native Node.js binding (Rust/NAPI). Vite cannot bundle it; externalizing it prevents "Unsupported OpenType signature" and NAPI errors during the build.

### Endpoint structure

```
src/pages/og/
  [locale]/[slug].png.ts   -- per-locale per-page OG endpoint
```

Or use a flat structure with locale in the slug:

```
src/pages/og/[slug].png.ts   -- single endpoint, locale from Astro.currentLocale
```

Prefer the `[locale]/[slug]` structure — it produces predictable URLs (`/og/zh/recovery-scoring.png`) and makes locale isolation explicit.

### Build-time vs. runtime

Since this is a fully static site (`output: 'static'`), the endpoints run at build time via `getStaticPaths()`. The PNG files are written to `dist/` and served as static assets. No edge function or SSR involved. This is correct and consistent with the no-adapter constraint.

---

## Feature 2: Translated URL Slugs

### Decision: Manual slug-to-slug mapping object (no new package)

**Astro 6 built-in i18n does not support translated slugs** — its routing maps locale prefixes to folder structure, but slug translation (e.g., `/zh/恢复评分` for `/recovery-scoring`) is not a built-in feature. The docs confirm this is a manual implementation pattern.

**Paraglide-Astro** explicitly states SSG is not yet supported. It requires `output: 'server'`. Do not use it.

**astro-i18n (Alexandre-Fernandez)** is a community package that adds translated routes to Astro. It works with static output but has not been audited for Astro 6 compatibility. Given the small number of pages (10 static pages) and the existing hand-rolled i18n system, the complexity/maintenance cost does not justify the dependency.

**Recommended pattern — static slug map:**

```typescript
// src/i18n/slugs.ts
export const slugMap: Record<string, Record<string, string>> = {
  'recovery-scoring': { en: 'recovery-scoring', zh: '恢复评分', fr: 'score-de-recuperation' },
  'workload-tracking': { en: 'workload-tracking', zh: '训练量追踪', fr: 'suivi-de-charge' },
  // ...
};

export function getLocalizedSlug(canonicalSlug: string, locale: string): string {
  return slugMap[canonicalSlug]?.[locale] ?? canonicalSlug;
}

export function getCanonicalSlug(localizedSlug: string, locale: string): string {
  for (const [canonical, locales] of Object.entries(slugMap)) {
    if (locales[locale] === localizedSlug) return canonical;
  }
  return localizedSlug;
}
```

Pages under `src/pages/zh/features/` and `src/pages/fr/features/` become dynamic routes `[slug].astro` using `getStaticPaths()` that map localized slugs to content. The language switcher uses `getLocalizedSlug()` to build cross-locale links.

**hreflang implication** — when slugs differ per locale, the hreflang alternates must use the full per-locale URL (not a prefix-swap). The existing SEO component must be extended to accept `alternates: { locale, url }[]` rather than computing them from a single canonical path. This is the most impactful downstream change for the hreflang system.

**Confidence: HIGH** — This is confirmed Astro documentation guidance. The slug map pattern is the standard community approach.

**No new package required.** Zero new dependencies.

---

## Feature 3: Blog Post Translations

### Decision: Content collection per-locale subdirectories (no new package)

The existing blog content collection uses `src/content/blog/` with an empty `.gitkeep`. The v4.0 research validated the standard Astro pattern for multilingual content collections.

**Recommended structure:**

```
src/content/blog/
  en/
    my-first-post.mdx
  zh/
    我的第一篇文章.mdx      (localized filename = localized slug)
  fr/
    mon-premier-article.mdx
```

**Route file:**

```
src/pages/blog/[...slug].astro          -- existing EN route, reads from en/ subdir
src/pages/zh/blog/[...slug].astro       -- new zh route
src/pages/fr/blog/[...slug].astro       -- new fr route
```

The `getStaticPaths()` in each route filters `getCollection('blog')` by the locale prefix in the entry ID (`entry.id.startsWith('zh/')`).

**content.config.ts change** — The current glob loader pattern (`'**/*.mdx'`) will pick up all locale subdirs automatically. No schema change needed. The `id` field will become `zh/my-post` etc., which the slug extraction handles.

**Frontmatter** — Blog posts need a `locale` field in frontmatter for explicit locale metadata (useful for the blog listing page's language filter). Add it as optional to the Zod schema:

```typescript
locale: z.enum(['en', 'zh', 'fr']).optional(),
```

**Translation strategy** — Each post is an independent MDX file; there is no enforced 1:1 correspondence between locale variants. A zh post can exist without a corresponding en or fr post. The blog listing page already handles empty state gracefully.

**hreflang for blog posts** — When all 3 locale variants of a post exist, the SEO component should emit hreflang alternates. When only 1 or 2 locale variants exist, emit only those. This requires the `[...slug].astro` endpoint to look up sibling posts by a shared `translationKey` frontmatter field.

Add to Zod schema:

```typescript
translationKey: z.string().optional(), // shared across locale variants of the same post
```

**No new package required.** Zero new dependencies.

**Confidence: HIGH** — This is Astro's official recommended pattern from the i18n recipes docs.

---

## Feature 4: Locale Date/Number Formatting

### Decision: Native `Intl.DateTimeFormat` / `Intl.NumberFormat` — no polyfill, no library

**Node.js 22 (which Cloudflare Pages v3 build system uses as of May 2025) ships with full ICU by default.** Verified locally: `new Intl.DateTimeFormat('zh-CN', {...}).format(date)` returns `2026年5月25日` and `'fr-FR'` returns `25 mai 2026`. No `full-icu` npm module needed.

Since this is a **static site**, all formatting runs at **build time on the Astro build server** (Node.js 22 on Cloudflare Pages CI, or the developer's local Node.js 22+ machine). The user's browser locale is irrelevant — the formatted string is baked into the HTML. This is correct behavior: the page at `/zh/blog/my-post` should always show Chinese date format regardless of visitor browser locale.

**Pattern:**

```typescript
// src/i18n/format.ts
export function formatDate(date: Date, locale: string): string {
  const localeMap: Record<string, string> = {
    en: 'en-US',
    zh: 'zh-CN',
    fr: 'fr-FR',
  };
  return new Intl.DateTimeFormat(localeMap[locale] ?? 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
}

export function formatNumber(n: number, locale: string): string {
  const localeMap: Record<string, string> = { en: 'en-US', zh: 'zh-CN', fr: 'fr-FR' };
  return new Intl.NumberFormat(localeMap[locale] ?? 'en-US').format(n);
}
```

Call in `.astro` component frontmatter:

```typescript
const displayDate = formatDate(post.data.date, Astro.currentLocale ?? 'en');
```

**Do not add** `date-fns`, `dayjs`, or `@formatjs/intl` — they add bundle weight and an extra dependency for something the platform provides natively and that runs only at build time.

**Confidence: HIGH** — Verified locally. Node.js 22 full ICU confirmed. Cloudflare Pages build system confirmed on Node.js 22.

---

## Summary: New Dependencies

| Package | Version | Feature | Type |
|---------|---------|---------|------|
| `satori` | `^0.27.0` | Translated OG images | dependency |
| `@resvg/resvg-js` | `^2.6.2` | SVG to PNG for OG images | dependency |

All other v4.1 features require zero new packages.

## Summary: Config Changes

| Change | File | Reason |
|--------|------|--------|
| Add `vite.optimizeDeps.exclude: ['@resvg/resvg-js']` | `astro.config.mjs` | NAPI native binding — Vite cannot bundle it |
| Add `vite.ssr.external: ['@resvg/resvg-js']` | `astro.config.mjs` | Same reason |
| Copy `GeneralSans-Variable.ttf` to `src/assets/fonts/` | Manual step | satori cannot use WOFF2; TTF is required |

## What NOT to Add

| Package | Why Not |
|---------|---------|
| `@vercel/og` | Wraps satori but forces React and targets edge/server runtime, not static SSG |
| `react` / `@types/react` | satori 0.26+ has built-in JSX runtime; React not needed |
| `paraglide-astro` | SSG explicitly not supported; requires `output: 'server'` |
| `astro-i18n` (Alexandre-Fernandez) | Unverified Astro 6 compatibility; 10 static pages don't justify the dependency |
| `date-fns` / `dayjs` | Native `Intl` is available and runs at build time; no browser bundle needed |
| `full-icu` | Node.js 22 already ships with full ICU by default |

## Sources

- [satori README — font formats, loadAdditionalAsset](https://github.com/vercel/satori/blob/main/README.md)
- [satori releases — 0.27.0 current as of 2026-04-30](https://github.com/vercel/satori/releases)
- [@resvg/resvg-js npm — 2.6.2 current](https://www.npmjs.com/package/@resvg/resvg-js)
- [otterlord.dev — Astro satori OG implementation with resvg-js externalize](https://blog.otterlord.dev/posts/dynamic-opengraph/)
- [okaryo.log — Load local fonts in Astro for satori (Vite plugin pattern)](https://blog.okaryo.studio/en/20250115-load-local-fonts-in-astro/)
- [dev.to/mitsuashi — Japanese CJK fonts at build time with satori (readFile from node_modules/fontsource)](https://dev.to/mitsuashi/how-i-built-19-per-topic-og-images-with-japanese-fonts-at-build-time-nextjs-satori-1ako)
- [Astro i18n recipes — locale+slug blog content collections](https://docs.astro.build/en/recipes/i18n/)
- [Astro i18n routing docs — no built-in translated slug support](https://docs.astro.build/en/guides/internationalization/)
- [Cloudflare Pages build image — Node.js 22.16.0 default on v3 build system](https://developers.cloudflare.com/pages/configuration/build-image/)
- [Paraglide-Astro — SSG not yet supported](https://inlang.com/m/iljlwzfs/paraglide-astro-i18n)
