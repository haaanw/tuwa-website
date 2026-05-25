# Phase 22: SEO Verification & Polish - Context

**Gathered:** 2026-05-25
**Status:** Ready for planning

<domain>
## Phase Boundary

Every page has hreflang tags for all 3 locale variants + x-default. Sitemap includes all locale URLs with hreflang annotations. Locale-specific 404 pages exist. Localized OG metadata is already working (wrapper pages pass translated title/description to SEO.astro).

</domain>

<decisions>
## Implementation Decisions

### Claude's Discretion
User selected "All clear — you decide" for all gray areas. Claude has full flexibility on:

- **hreflang injection point** — SEO.astro vs BaseLayout vs dedicated component. Recommend SEO.astro since it already owns all `<head>` meta tags. Auto-generate from Astro's i18n config (locales: en/zh/fr) + current page path.
- **hreflang for pages without all locale variants** — Blog posts only exist in EN. hreflang should only reference locales that have a corresponding page. Blog listing pages (index) exist in all 3 locales.
- **404 page design** — Create a minimal, helpful 404 page. EN version at `src/pages/404.astro`, zh/fr wrapper pages at `src/pages/zh/404.astro` and `src/pages/fr/404.astro`. Show translated "Page not found" message + link back to home. Follow existing LegalPageLayout or BaseLayout pattern.
- **404 locale detection** — Astro file-based routing handles this: `/zh/nonexistent` hits `src/pages/zh/404.astro` if it exists. Cloudflare Pages may need `_routes.json` or rely on Astro's built-in 404 handling.
- **Sitemap i18n** — Use @astrojs/sitemap's built-in `i18n` config option to auto-generate hreflang annotations in sitemap.xml. Configure `i18n.locales` and `i18n.defaultLocale` in the sitemap integration config to match Astro's i18n config.
- **OG metadata verification** — OG metadata already works via prop passing. Phase 22 verifies it's correct, no new implementation needed. May add locale-specific og:locale meta tag.
- **Lighthouse verification** — Run Lighthouse on locale variants to confirm no CJK font regressions. No code changes expected — just verification.

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### SEO Infrastructure
- `src/components/SEO.astro` — Current OG/meta tag component, needs hreflang additions
- `src/layouts/BaseLayout.astro` — `<html lang={locale}>` already set, passes locale to Header/Footer
- `astro.config.mjs` — i18n config (locales, defaultLocale, prefixDefaultLocale: false), sitemap integration

### Page Inventory (all locale variants)
- `src/pages/` — EN pages (unprefixed)
- `src/pages/zh/` — Chinese wrapper pages
- `src/pages/fr/` — French wrapper pages

### Requirements
- `.planning/REQUIREMENTS.md` — I18N-11 (hreflang), I18N-12 (localized OG), I18N-13 (sitemap), I18N-14 (locale 404s)

### Prior Phase Patterns
- `src/pages/zh/features/recovery-scoring.astro` — Thin wrapper pattern with Noto Sans SC imports
- `src/pages/zh/privacy.astro` — Legal wrapper pattern with disclaimerText

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `SEO.astro` — Already handles og:title, og:description, og:image, twitter cards. Natural place to add hreflang.
- `BaseLayout.astro` — Already accepts `locale` prop, sets `lang` attribute. Could alternatively host hreflang.
- `@astrojs/sitemap` — Already integrated, just needs i18n config added.

### Established Patterns
- Wrapper pages pass locale-aware title/description to layouts → OG metadata already localized
- File-based routing: `/zh/` prefix pages in `src/pages/zh/`
- EN pages unprefixed (`prefixDefaultLocale: false`)

### Integration Points
- SEO.astro needs hreflang `<link>` tags added (accepts new props or derives from Astro.url)
- astro.config.mjs sitemap integration needs i18n config object
- 3 new 404 pages needed: `404.astro`, `zh/404.astro`, `fr/404.astro`
- 404 translation namespace needed: `src/i18n/locales/{en,zh,fr}/404.ts`

</code_context>

<specifics>
## Specific Ideas

No specific requirements — open to standard approaches.

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope.

</deferred>

---

*Phase: 22-seo-verification-polish*
*Context gathered: 2026-05-25*
