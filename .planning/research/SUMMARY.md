# Research Summary: Tuwa v4.1 i18n Follow-ups

**Project:** Tuwa Marketing Website — v4.1 Internationalization Follow-ups
**Domain:** Multilingual static marketing site (Astro 6, EN/zh/fr, Cloudflare Pages)
**Researched:** 2026-05-25
**Confidence:** HIGH

---

## Executive Summary

v4.1 builds on a working v4.0 i18n foundation: Astro i18n routing with `prefixDefaultLocale: false`, hreflang auto-derivation in `SEO.astro`, localized sitemap, path-preserving language switcher, Noto Sans SC isolated to zh pages, 33 static pages across three locales. Four follow-up features are scoped: translated OG images via satori, blog post i18n routing, locale date formatting, and (contested) translated URL slugs. The first three have clear implementation paths with only two new packages (`satori` + `@resvg/resvg-js`). Translated slugs are where the researchers disagree — resolve before locking phases.

Dominant risk theme: **silent failure**. Satori writes a PNG without error even when CJK renders as tofu; hreflang looks correct in code while pointing to 404s; sitemap lists translated pages with wrong locale URLs. v4.0 hit exactly this class of bug. Cross-cutting lesson: every phase needs a visual/tool-based verification gate as a hard sign-off criterion.

---

## Key Decision Required: Translated URL Slugs

The four researchers disagree. User must decide before execution.

**FEATURES.md — do NOT build.** Anti-feature at this scale. Feature slugs (`recovery-scoring`, etc.) are short technical terms whose zh/fr equivalents carry no keyword weight. Google's i18n signals are hreflang/og:locale/page content, not URL structure. Translated title+description (v4.0) + translated OG images (v4.1) deliver ~95% of benefit at ~5% of complexity. Path-substitution switcher and SEO.astro hreflang both break when slugs differ. Conclusion: defer; revisit only with Search Console data.

**STACK/ARCHITECTURE/PITFALLS — feasible, heavy ripple.** Implementable via `src/i18n/slugs.ts` slug map + dynamic `[slug].astro` routes, but requires a 4-system atomic update:
1. Language switcher (`Header.astro` line 78 + `MobileMenu.astro`) — reverse slug lookup, else hard 404 on switch
2. `SEO.astro` hreflang — explicit `hreflangAlternates` prop per translated page (escape hatch exists), else asymmetric hreflang discarded by search engines
3. `@astrojs/sitemap` — `serialize` callback to inject correct xhtml:link (API needs verifying in v3.7.2)
4. OG endpoint `getStaticPaths` — output paths reference slug names, so OG built after slugs final

| Factor | Keep English slugs | Translated slugs |
|--------|-------------------|------------------|
| SEO benefit | Minimal loss | Small keyword signal |
| Impl cost | None | HIGH (4 systems atomic) |
| Failure risk | None | Silent 404s + broken hreflang |
| Maintenance | None | Slug map per new page |

**Synthesis recommendation:** accept FEATURES.md — defer translated slugs for v4.1. If overridden, ARCHITECTURE.md build sequence + PITFALLS 4-6 are the spec; switcher/hreflang/sitemap fixes ship in the same phase as the first translated slug.

---

## Key Findings

### Stack
Two new packages only:
- `satori ^0.27.0` — build-time JSX→SVG for OG (chose over @vercel/og which forces React + edge runtime)
- `@resvg/resvg-js ^2.6.2` — SVG→PNG; MUST add to `vite.optimizeDeps.exclude` + `vite.ssr.external` (native NAPI binding)

Everything else (blog routing, formatting, slug infra) needs zero packages. Native `Intl` on Node 22 (Cloudflare Pages) handles all formatting — full ICU verified, no date-fns/dayjs.

**Critical font constraint:** satori does NOT support WOFF2. Need `GeneralSans-Variable.ttf` copied to `src/assets/fonts/` (WOFF2 in public/fonts/ unusable). CJK via `@fontsource/noto-sans-sc` `.woff` subset files (no TTF present); load via `loadAdditionalAsset` or explicit `fs.readFileSync` of the `.woff`.

### Features
- **Table stakes:** translated OG images (zh/fr currently serve English cards — visible gap); locale date formatting (trivial, fix before first post); blog i18n routing (establish before posts written)
- **Differentiator:** per-page localized OG (21 PNGs) vs per-locale template
- **Defer:** translated slugs (anti-feature); runtime OG (needs SSR); EN fallback for untranslated posts (breaks language promise, duplicate content)

### Architecture
New files: `src/i18n/format.ts`; `src/lib/og/fonts.ts` (module-level font cache — critical for build speed); `src/lib/og/template.ts` (single OG component); `src/pages/og/[locale]/[page].png.ts` (static endpoint, 21 PNGs).
Modified: `BlogPostLayout.astro` (+locale prop); `content.config.ts` (+locale, +canonicalKey/translationKey, optional slug); blog listing pages (locale filter).
Blog structure: single collection, `locale` in frontmatter (e.g. `post.en.mdx` / `post.zh.mdx`) — avoids changing all `getCollection('blog')` call sites. zh blog route imports `@fontsource/noto-sans-sc` directly (mirrors zh feature pattern; don't add a 3rd font approach).

### Critical Pitfalls (all silent failures)
1. **Satori CJK tofu** — WOFF2 unreadable, PNG saves with empty boxes. Read `.woff` explicitly. Gate: open zh PNG visually.
2. **CJK weight 700 → 400 fallback** — satori needs separate weight entries. Register 400 AND 700. Gate: compare bold vs regular stroke.
3. **Per-call font load = slow build** — module-level constants. Gate: `time astro build` < 60s.
4. **Translated slug breaks switcher** — 404 on switch; fix must ship with first translated slug.
5. **Translated slug breaks hreflang reciprocity** — explicit `hreflangAlternates`; verify with reciprocity checker.
6. **Blog post without locale field → zh/fr listings link to 404s** — add `locale` to schema + filter `getStaticPaths` before any post. Gate: `find dist/zh/blog -name index.html | wc -l` == zh post count; EN-only posts emit only hreflang en + x-default.

---

## Cross-Cutting Verification Lesson (from v4.0)
Every phase needs a visual/tool gate, not just code review:
- OG: open zh PNG (text not squares); compare weights; build < 60s
- Blog: dist zh/blog count == locale-filtered posts; EN-only posts emit only en + x-default hreflang
- Slugs (if built): switcher click from every translated page in all 3 locales = 0 404s; hreflang reciprocity = 0 errors; grep sitemap for each slug

---

## Implications for Roadmap

Suggested phases (translated slugs deferred per FEATURES.md). Phase numbers continue from v4.0 (ended at 22):

**Phase 23: Locale Formatting Utility** — `src/i18n/format.ts` + BlogPostLayout locale prop + replace inline `toLocaleDateString` in 3 listing pages. Zero deps, unblocks blog. Standard pattern.

**Phase 24: Blog Translation Infrastructure** — `content.config.ts` schema (+locale, +canonicalKey); new `zh/blog/[...slug].astro` + `fr/blog/[...slug].astro`; EN blog route filters `locale==='en'`; listing pages locale-filter. Avoids Pitfall 6. Standard pattern (Astro i18n recipes).

**Phase 25: Translated OG Images via Satori** — add satori + @resvg/resvg-js; `src/lib/og/fonts.ts` (module cache, .woff, both weights); `src/lib/og/template.ts`; `src/pages/og/[locale]/[page].png.ts` (21 PNGs); astro.config.mjs Vite externalize; copy GeneralSans TTF; update all locale ogImage props. Hard visual + build-time gates. Research flag: verify satori `loadAdditionalAsset` return shape on first impl.

**Phase 26 (OPTIONAL): Translated URL Slugs** — only if user opts in after the trade-off above. All 4 systems update atomically. Research flag: verify @astrojs/sitemap v3.7.2 `serialize`/`SitemapItem.links`; fallback post-build script.

### Research Flags
- Phase 25 (OG): satori `loadAdditionalAsset` font return shape
- Phase 26 (slugs, if adopted): @astrojs/sitemap serialize API
Standard (skip research): Phase 23 (Intl), Phase 24 (Astro i18n recipes)

---

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Stack | HIGH | WOFF2 limit in satori README; resvg externalize from community; Node 22 ICU verified |
| Features | HIGH | Categories justified; slug trade-off surfaced explicitly |
| Architecture | HIGH | Direct source inspection of live codebase at HEAD |
| Pitfalls | HIGH | satori issues #263/#590; Header.astro:78 + SEO.astro:29-34 traced; blog index inspected |

**Overall:** HIGH

### Gaps to Address
- @astrojs/sitemap `serialize`/`SitemapItem.links` in v3.7.2 (Phase 26 only) — fallback: post-build script
- satori `loadAdditionalAsset` return shape (Phase 25) — alternative: preload .woff subset in fonts array
- **Translated slug decision — the only gap blocking roadmap finalization**

### Ready for Requirements
Proceed to requirements pending user decision on translated URL slugs.
