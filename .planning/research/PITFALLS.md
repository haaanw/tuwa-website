# Pitfalls Research

**Domain:** i18n follow-up features on a static Astro 6 trilingual site (Tuwa v4.1)
**Researched:** 2026-05-25
**Confidence:** HIGH (verified against this codebase's actual implementation, satori docs, SEO authority sources)

> **Scope note:** This file replaces the v4.0 pre-implementation research with v4.1-specific pitfalls:
> satori CJK OG images, translated URL slugs, blog post translations, locale date/number formatting.
> The v4.0 pitfalls (font loading, text expansion, hreflang fundamentals) have been resolved.
> These are the NEW failure modes introduced by the four v4.1 features on top of the working v4.0 foundation.

---

## Critical Pitfalls

### Pitfall 1: Satori Loads WOFF2, All CJK Glyphs Render as Tofu

**What goes wrong:**
Every Chinese character in the generated OG image appears as an empty rectangle (tofu). The PNG file saves without error — the failure is entirely silent until you visually inspect the image.

**Why it happens:**
`@fontsource/noto-sans-sc` ships both WOFF and WOFF2 variants. The CSS `@font-face` declarations in the package reference WOFF2. Satori's renderer **does not support WOFF2** (brotli-compressed format) — only TTF, OTF, or WOFF. Code that reads the font path from the CSS, or that guesses the extension, will silently load an unreadable buffer. Satori generates the image without erroring, but every CJK codepoint is absent.

Confirmed by inspecting this project's `node_modules/@fontsource/noto-sans-sc/files/`: no TTF files exist. Only `*.woff` (valid for satori) and `*.woff2` (invalid for satori). The named subset file is `noto-sans-sc-chinese-simplified-400-normal.woff` at 1.5MB per weight.

**How to avoid:**
Read fonts with `fs.readFileSync` (or `await fs.readFile`) pointing explicitly at the `.woff` file extension, never `.woff2`. Use the `chinese-simplified` named subset file, not a numbered unicode-range chunk:

```ts
const SC_400 = readFileSync(
  'node_modules/@fontsource/noto-sans-sc/files/noto-sans-sc-chinese-simplified-400-normal.woff'
);
```

**Warning signs:**
- OG image endpoint builds without error but PNG shows squares for all Chinese characters.
- The font buffer you loaded is between 30KB and 43KB — you loaded a unicode-range chunk (covers ~3,000 glyphs) instead of the full `chinese-simplified` subset (~28,000 glyphs).
- The font buffer starts with bytes `wOF2` — you loaded WOFF2 instead of WOFF.

**Verification step (direct application of the v4.0 lesson):**
Open the generated zh OG PNG in a browser tab or Preview.app before phase sign-off. Do not rely on code review alone. Add this to the phase success criteria: "zh OG image visually shows Chinese text, not squares."

**Phase to address:** OG Images phase (first phase of v4.1). Visual confirmation is a hard gate before the phase is marked complete.

---

### Pitfall 2: CJK Font Weight 700 Silently Falls Back to Weight 400 in OG Images

**What goes wrong:**
OG image headings in Chinese appear at regular weight even when the CSS template specifies `font-weight: 700`. Latin text in the same element renders bold; Chinese characters alongside it render thin. The image looks slightly off, not broken — easy to miss without side-by-side comparison.

**Why it happens:**
Satori resolves bold rendering by looking for a registered font entry with both a matching `name` AND a matching `weight`. When only weight 400 is registered for Noto Sans SC, any element with `font-weight: 700` containing CJK codepoints silently drops to weight 400 — satori does not synthesize bold. This is a known satori limitation (GitHub issue #263: "Font weight not resolving correctly"). The substitution is per-codepoint, not per-weight, so mixed Latin + CJK strings produce visually inconsistent weight within the same line.

**How to avoid:**
Register two separate font entries in the satori `fonts` array:

```ts
fonts: [
  { name: 'Noto Sans SC', data: SC_400, weight: 400, style: 'normal' },
  { name: 'Noto Sans SC', data: SC_700, weight: 700, style: 'normal' },
]
```

Both `SC_400` and `SC_700` must point to WOFF files (not WOFF2) of their respective weights.

**Warning signs:**
- zh OG image headline looks the same weight as body text.
- You registered only one CJK font entry in the fonts array.
- A design with `fontWeight: 700` in the JSX template renders uniformly thin in zh.

**Verification step:**
Render a zh OG image with deliberate bold + regular mix (e.g., a bold title and a regular subtitle). Compare stroke thickness between the two segments visually. If they look identical, weight 700 was not registered.

**Phase to address:** OG Images phase. Dual-weight loading belongs in the initial implementation, not a follow-up.

---

### Pitfall 3: Loading the Full chinese-simplified WOFF Per Image Makes Builds Unacceptably Slow

**What goes wrong:**
Build time for OG images balloons. With 10 pages × 3 locales = 30 OG images, loading `1.5MB × 2 weights = 3MB` of font buffer on each satori call means 90MB of file I/O plus 30 `opentype.parse()` invocations. On a cold build this can add 2–5 minutes just for OG generation.

**Why it happens:**
The naive implementation reads font files inside the route handler or inside a `getStaticPaths` loop — once per image. Satori internally calls `opentype.parse()` on each font buffer it receives; this is CPU-bound and the most expensive part of satori's setup. When the font object changes reference on every call, satori cannot reuse its parsed cache.

**How to avoid:**
Load and parse font buffers exactly once at module scope (outside any function), export as constants, and import them in every OG endpoint:

```ts
// src/lib/og-fonts.ts — evaluated once at build startup
import { readFileSync } from 'node:fs';

export const SC_400 = readFileSync(
  'node_modules/@fontsource/noto-sans-sc/files/noto-sans-sc-chinese-simplified-400-normal.woff'
);
export const SC_700 = readFileSync(
  'node_modules/@fontsource/noto-sans-sc/files/noto-sans-sc-chinese-simplified-700-normal.woff'
);
```

Import `SC_400`/`SC_700` in the OG endpoint and pass them directly. Satori's README and issue #590 both document this pattern as providing a ~2× speedup.

**Warning signs:**
- `astro build` takes more than 90 seconds on a 10-page site.
- Font loading code appears inside a `for` loop, inside `getStaticPaths`, or as `await fs.readFile()` called within the response handler.

**Verification step:**
`time astro build` before and after extracting font loading to module scope. Expect total build time under 60 seconds for 30 OG images.

**Phase to address:** OG Images phase. Module-level font caching is part of the initial implementation, not a later optimization.

---

### Pitfall 4: Translated Slugs Break the Language Switcher's Path-Preservation Logic

**What goes wrong:**
On a blog post at `/blog/training-load-explained`, clicking the zh language switcher navigates to `/zh/blog/training-load-explained` — a 404. The actual Chinese URL is `/zh/blog/训练负荷解析` (the translated slug). The user hits a hard 404 instead of the translated post.

**Why it happens:**
The current language switcher in `Header.astro` (line 78) computes alternate locale URLs as:

```ts
href={getRelativeLocaleUrl(code, pathWithoutLocale)}
```

`pathWithoutLocale` strips the locale prefix from `Astro.url.pathname` and keeps the bare path segment — it is always the EN slug. This works perfectly when all locales share identical path segments (the current state for all 10 pages). The moment translated slugs exist, the EN slug is not a valid path in zh or fr.

**How to avoid:**
Add a `translations` field to each blog post's MDX frontmatter:

```yaml
---
translations:
  zh: /zh/blog/训练负荷解析
  fr: /fr/blog/comprendre-la-charge-d-entrainement
---
```

Pass this map as a prop through the layout down to `<Header>`. Header checks: if the map contains the target locale, use that URL; otherwise fall back to `getRelativeLocaleUrl`. The Header already accepts a `locale` prop — extend it with an optional `localizedPaths` prop.

The language switcher fix is a **hard prerequisite** that must ship in the same phase as the first translated slug, not after.

**Warning signs:**
- Language switcher click on a translated-slug blog post returns 404.
- `getRelativeLocaleUrl('zh', '/blog/some-english-slug')` returns a URL with no corresponding built static page.
- The `pathWithoutLocale` computation in Header (current: strips locale prefix, keeps bare path) produces an EN slug on a zh page.

**Verification step:**
After adding any translated slug: manually click the language switcher from that post in all 3 locales. Expect zero 404s. Automate: compare every `href` in the language switcher dropdown against the static paths list from `getStaticPaths`.

**Phase to address:** Translated Slugs phase. Switcher fix ships in the same phase, before any translated slug exists in the collection.

---

### Pitfall 5: Translated Slugs Break hreflang Reciprocity and Invalidate SEO Annotations

**What goes wrong:**
After adding `/zh/blog/训练负荷解析`, the English page still auto-emits:
```html
<link rel="alternate" hreflang="zh" href="/zh/blog/training-load-explained" />
```
because `SEO.astro` derives zh URLs by string-substitution of the current path (lines 29–34 of SEO.astro). The zh page emits a correct self-referencing annotation. The relationship is **asymmetric**: EN points to a 404 for zh, zh points back to EN correctly. Search engines discard both annotations when reciprocity fails. The pages compete as duplicates.

**Why it happens:**
`SEO.astro`'s auto-derivation assumes all locale paths differ only by prefix. This is correct for the 10 existing pages. It fails for any page where the slug itself is translated. The auto-derivation has no access to the translations map from post frontmatter.

**How to avoid:**
For blog posts with translated slugs, pass explicit `hreflangAlternates` prop to `<SEO>`:

```ts
<SEO
  hreflangAlternates={[
    { hreflang: 'en', href: 'https://tuwa.app/blog/training-load-explained' },
    { hreflang: 'zh', href: 'https://tuwa.app/zh/blog/训练负荷解析' },
    { hreflang: 'fr', href: 'https://tuwa.app/fr/blog/...' },
  ]}
/>
```

`SEO.astro` already accepts `hreflangAlternates` as an override prop (line 34: `hreflangAlternatesProp ?? siteLocales`). Use it for every page that has a translated slug.

**Warning signs:**
- hreflang checker (Sitechecker, Klartext Tools) shows "missing return tag" errors after adding translated slugs.
- The auto-generated zh hreflang URL for an EN blog post page contains the EN slug.
- Google Search Console > International Targeting shows "Alternate page with proper canonical tag" for zh/fr blog variants.

**Verification step:**
After the translated slugs phase, run a free hreflang checker (e.g., https://klartext-tools.com/en/web-utilities/hreflang-checker/) against each translated-slug page. Expect zero reciprocity errors. This must be run against the live or locally-served site, not via code review.

**Phase to address:** Translated Slugs phase. Explicit hreflang overrides ship in the same phase as slug translation — never as a deferred cleanup.

---

### Pitfall 6: @astrojs/sitemap Generates Wrong hreflang Alternates for Translated-Slug Blog Posts

**What goes wrong:**
The built sitemap correctly lists `/blog/training-load-explained` but its zh hreflang annotation points to `/zh/blog/training-load-explained` (a 404) instead of `/zh/blog/训练负荷解析`. Google's Search Console flags these as errors. The zh/fr blog post variants are suppressed from indexing.

**Why it happens:**
`@astrojs/sitemap` with the `i18n` config option auto-generates hreflang by translating the locale prefix segment. It has no access to per-post frontmatter slug translations. When the zh page was built at `/zh/blog/训练负荷解析` (a different path), the sitemap generator does not know to link those two pages as alternates — it only sees the EN URL and substitutes the prefix.

**How to avoid:**
For blog posts with translated slugs, disable auto-hreflang for those entries and inject correct annotations manually via the sitemap `serialize` option. Alternatively, build a separate `/sitemap-blog.xml` Astro endpoint that reads all posts' `translations` frontmatter and emits correct `<xhtml:link>` entries. Given the blog starts empty and will grow slowly, the serialize callback is the pragmatic choice.

**Warning signs:**
- Sitemap file contains `<xhtml:link rel="alternate" hreflang="zh" href="/zh/blog/training-load-explained"/>` when the actual zh URL has a different slug.
- Google Search Console shows "Submitted URL not found (404)" under the International Targeting report.

**Verification step:**
After build, `grep` the generated sitemap-0.xml for each translated slug. Every translated zh/fr slug must appear as both a primary `<loc>` and as a `<xhtml:link>` alternate in the corresponding EN entry. Automate: parse the XML and cross-reference against the `translations` frontmatter data.

**Phase to address:** Translated Slugs phase. Sitemap fix ships in the same phase.

---

### Pitfall 7: Blog Posts Without a zh/fr Translation Emit Invalid hreflang, Creating 404 Alternates or Duplicate Content

**What goes wrong:**
An English-only blog post exists. The SEO component auto-emits `<link rel="alternate" hreflang="zh" href="/zh/blog/some-post" />`. That URL either 404s (no zh page built) or the zh/fr blog index at `/zh/blog/` links to it via `href={/zh/blog/${post.id}}` — serving EN content at a zh path (duplicate content).

**Why it happens:**
The zh/fr blog index pages (`src/pages/zh/blog/index.astro` and `src/pages/fr/blog/index.astro`) currently build links as `/zh/blog/${post.id}` for ALL posts regardless of locale. There is no locale-filtered blog routing. When the collection is empty this is harmless. The moment any EN-only post is added, the zh listing links to 404s. There is also no `[...slug].astro` under `/zh/blog/` or `/fr/blog/` — locale-specific blog post routing doesn't exist yet.

**How to avoid:**
Before adding any post:
1. Add `locale: z.enum(['en', 'zh', 'fr']).default('en')` to the blog collection schema in `content.config.ts`.
2. Create `src/pages/zh/blog/[...slug].astro` and `src/pages/fr/blog/[...slug].astro` with `getStaticPaths` filtered to `data.locale === 'zh'` (and `fr` respectively).
3. Update zh/fr blog index listings to only iterate posts with the matching locale.
4. For EN-only posts, do not emit zh/fr hreflang — only emit `hreflang="en"` and `hreflang="x-default"`.

**Warning signs:**
- `src/pages/zh/blog/` contains only `index.astro` — no `[...slug].astro` exists.
- The zh blog listing links to paths that have no built static file under `dist/zh/blog/`.
- An EN post's page source shows hreflang pointing to zh/fr URLs that don't exist in `dist/`.

**Verification step:**
After build: `find dist/zh/blog -name "index.html" | wc -l` must equal the count of posts with `locale: zh` in the collection (currently zero, and the count must stay consistent as posts are added). Any discrepancy indicates a missing page or a dangling hreflang. Run the same check for fr.

**Phase to address:** Blog Translation phase. The schema change (locale field) and filtered routing must be established before any post is created, even an EN-only one.

---

## Technical Debt Patterns

| Shortcut | Immediate Benefit | Long-term Cost | When Acceptable |
|----------|-------------------|----------------|-----------------|
| Register only weight 400 for CJK in satori | Simpler setup, saves 1.5MB buffer load | All zh headings in OG images render at regular weight permanently; visual inconsistency | Never — dual-weight is a 5-line addition |
| Auto-derive hreflang from path for all pages | Zero per-page config | Breaks silently when translated slugs are introduced; requires retroactive audit of all affected pages | Acceptable for the 10 existing feature/legal pages (paths match); never acceptable for blog posts |
| Keep EN slug as the zh blog route path | Avoids building a slug translation system | Language switcher 404s; hreflang reciprocity breaks; zh SEO value unrealized | Never once translated slugs are intended |
| Skip locale field on blog schema | Simpler schema | First EN-only post causes zh/fr routes to 404 or show duplicate content; hard to retrofit | Never — add before any post is created |
| Load fonts inside each satori call | Simpler code structure | Build time scales linearly with image count; unacceptable at 30+ images | Never — module-level caching is the correct pattern and takes the same number of lines |

---

## Integration Gotchas

| Integration | Common Mistake | Correct Approach |
|-------------|----------------|------------------|
| satori + Fontsource Noto Sans SC | Load the `.woff2` file (referenced in the package CSS) | Use `fs.readFileSync` on the `.woff` file: `noto-sans-sc-chinese-simplified-{weight}-normal.woff` |
| satori + bold headings in zh OG | Register only weight 400 | Register both weight 400 and 700 as separate `fonts` array entries |
| @astrojs/sitemap + translated blog slugs | Let sitemap auto-generate hreflang alternates for blog posts | Use sitemap `serialize` callback or a separate sitemap endpoint to inject correct cross-locale URLs |
| SEO component + translated blog slugs | Let auto-derivation compute zh/fr hreflang from the EN path | Pass explicit `hreflangAlternates` prop for any page whose path differs across locales |
| Language switcher + translated blog slugs | Use `getRelativeLocaleUrl(code, pathWithoutLocale)` for all pages | Add `localizedPaths` prop to Header; consult translations frontmatter map before falling back to path-substitution |
| `Intl.DateTimeFormat` in static Astro pages | No `timeZone` argument — uses build server system timezone | Pass `timeZone: 'UTC'` when rendering any date that includes a time component; date-only formatting (as used in the blog listing) is safe without it |

---

## Performance Traps

| Trap | Symptoms | Prevention | When It Breaks |
|------|----------|------------|----------------|
| Font loaded inside each satori call | Build time > 90 seconds for 30 OG images | Extract font buffers to module-level constants | First use — 10+ images makes this noticeable |
| Loading all 1818 numbered WOFF unicode-range chunks | OOM or extremely slow build | Use only the 2 `chinese-simplified` named subset WOFF files (one per weight, 1.5MB each) | Immediately on first attempt |
| Generating OG images on every build with no caching | Slow CI as blog grows | Add a cache key (hash of post content + OG template); skip regeneration on cache hit | > 50 blog posts |

---

## UX Pitfalls

| Pitfall | User Impact | Better Approach |
|---------|-------------|-----------------|
| Language switcher 404s on translated-slug blog posts | User switching locale from a blog post hits a dead page; likely abandons the site | Implement slug translation map lookup in Header before shipping any translated slug |
| zh blog listing links to paths without zh translations | zh-browsing user clicks a post and sees English content or a 404 | Filter blog listing by `locale` field; only show posts with a matching translation |
| OG images with tofu shared on WeChat | Link preview for the zh page shows blank squares where Chinese text should be; damages first impression | Visual UAT of generated OG images is a mandatory phase gate |
| Date formatted without explicit locale context | Users in different timezones may see a post dated one day off | Use `timeZone: 'UTC'` for any date with a time component; the existing `toLocaleDateString('zh-CN', {...})` in zh/blog/index.astro is correct for date-only display |

---

## "Looks Done But Isn't" Checklist

- [ ] **Satori CJK font format:** Code loads a `.woff` file — but open the generated PNG and confirm Chinese characters are visible, not squares. Code review is insufficient; a human must look at the image.
- [ ] **Satori font weight:** zh OG image was generated — but compare the title stroke weight to the body text. If identical, only weight 400 was registered.
- [ ] **Language switcher with translated slugs:** Switcher renders — but click it from a translated-slug post in all 3 locales. Expect zero 404s.
- [ ] **hreflang reciprocity for translated slugs:** All pages emit hreflang — but verify with a reciprocity checker tool. Code review cannot catch asymmetric annotations across two separate files.
- [ ] **Sitemap hreflang for blog posts:** Sitemap file contains entries — but grep the XML for each translated zh/fr slug and confirm it appears as the `<xhtml:link>` alternate, not the EN slug.
- [ ] **Blog locale filtering:** zh/fr blog listings show posts — but verify every linked post URL resolves to a built static page, not a 404. `find dist/zh/blog -name "index.html"` count must match locale-filtered post count.
- [ ] **CJK font in browser (the v4.0 carry-forward):** The CJK font wiring fix from v4.0 is confirmed working — but re-verify after any BaseLayout or global CSS change: `document.querySelector('p').computedStyleMap().get('font-family')` on a zh page must show 'Noto Sans SC'.

---

## Recovery Strategies

| Pitfall | Recovery Cost | Recovery Steps |
|---------|---------------|----------------|
| Satori tofu (WOFF2 loaded instead of WOFF) | LOW | Swap file path to `.woff` variant; rebuild; visually confirm |
| Font weight 400 only in satori | LOW | Add second font entry for weight 700; rebuild OG images |
| Language switcher 404s on translated slugs | MEDIUM | Add translations frontmatter field and Header lookup; audit all existing translated-slug posts |
| hreflang reciprocity broken by translated slugs | MEDIUM | Pass explicit `hreflangAlternates` to SEO component for all affected pages; run reciprocity checker; resubmit sitemap |
| Blog posts ship without locale field and create 404s at zh/fr paths | MEDIUM | Add locale field to schema; update `getStaticPaths` filter; add canonical to any duplicate zh/fr pages that built; resubmit sitemap |
| Sitemap lists incorrect zh/fr alternate URLs for blog posts | LOW | Fix sitemap serialize callback; rebuild; resubmit via Search Console; Googlebot re-crawl takes ~2 weeks |

---

## Pitfall-to-Phase Mapping

| Pitfall | Prevention Phase | Verification |
|---------|------------------|--------------|
| Satori CJK tofu (WOFF2 vs WOFF) | OG Images phase | Visual UAT: open at least one zh PNG, confirm Chinese text is visible |
| Satori font weight 400-only | OG Images phase | Visual UAT: bold title in zh OG must be visually heavier than body text |
| Font loaded per-call (build performance) | OG Images phase | `time astro build` < 60s total |
| Translated slugs break language switcher | Translated Slugs phase — implement switcher fix first, in the same phase as the first slug | Manual: click switcher from every translated-slug post in all 3 locales — zero 404s |
| Translated slugs break hreflang reciprocity | Translated Slugs phase — explicit hreflang override in same PR as slug translation | hreflang checker tool against live/local site: zero "missing return tag" errors |
| Sitemap hreflang wrong for translated-slug posts | Translated Slugs phase | Post-build: grep sitemap XML for each translated slug; confirm correct alternates |
| Blog posts without translations cause 404/duplicate zh routes | Blog Translation phase — schema change before any post is created | `find dist/zh/blog -name "index.html" | wc -l` equals count of posts with locale:zh |
| EN-only posts emit invalid zh/fr hreflang | Blog Translation phase | Verify EN-only posts emit only `hreflang="en"` and `hreflang="x-default"`, not zh/fr pointing to 404s |
| Timezone mismatch in date formatting | Blog Translation phase | Compare build-output date strings for posts with known dates; verify 'UTC' is passed when a time component is rendered |

---

## Sources

- [vercel/satori README — font format support, WOFF2 not supported, font weight config](https://github.com/vercel/satori/blob/main/README.md)
- [satori issue #263 — font weight not resolving correctly for CJK](https://github.com/vercel/satori/issues/263)
- [satori issue #590 — 2× speedup with module-level global font variable](https://github.com/vercel/satori/issues/590)
- [How I Built 19 Per-Topic OG Images with Japanese Fonts at Build Time (Next.js + Satori)](https://dev.to/mitsuashi/how-i-built-19-per-topic-og-images-with-japanese-fonts-at-build-time-nextjs-satori-1ako)
- [Why Multilingual Hreflang Mistakes Destroy Rankings — Hashmeta](https://hashmeta.com/blog/why-multilingual-hreflang-mistakes-destroy-rankings-the-hidden-seo-crisis/)
- [Missing Reciprocal Hreflang — Sitebulb documentation](https://sitebulb.com/hints/international/missing-reciprocal-hreflang-no-return-tag/)
- [Astro i18n Routing — Official Docs](https://docs.astro.build/en/guides/internationalization/)
- [@astrojs/sitemap integration docs](https://docs.astro.build/en/guides/integrations-guide/sitemap/)
- [Fontsource Noto Sans SC — file inspection in this project's node_modules confirms WOFF/WOFF2 files, no TTF, 1.4–1.5MB chinese-simplified subset size]
- Tuwa v4.0 RETROSPECTIVE.md — CJK font defect root cause: wrong CSS var target, silent PingFang fallback, visual UAT deferred 6 phases
- Tuwa Header.astro line 78 — language switcher uses `getRelativeLocaleUrl(code, pathWithoutLocale)` — path-substitution assumption confirmed by code inspection
- Tuwa SEO.astro lines 29–34 — hreflang auto-derivation by path prefix substitution confirmed by code inspection

---
*Pitfalls research for: Astro 6 static i18n follow-up features (satori CJK OG images, translated slugs, blog translations, locale formatting)*
*Researched: 2026-05-25*
