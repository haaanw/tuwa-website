# Phase 17: i18n Infrastructure - Context

**Gathered:** 2026-05-17
**Status:** Ready for planning

<domain>
## Phase Boundary

The site has working locale routing (/zh/, /fr/), a type-safe translation utility with per-page TS dictionaries, and CJK font loading — without any visible content changes to existing English pages.

</domain>

<decisions>
## Implementation Decisions

### Translation File Organization
- **D-01:** Single `common.ts` file per locale for shared strings (nav, footer, CTAs). Page-specific files import/override as needed.
- **D-02:** Missing translation keys fall back to English text — graceful degradation, page stays usable with incomplete translations.
- **D-03:** Nested object structure for translation keys (e.g. `hero: { title: '...', subtitle: '...' }`). Full TypeScript type safety with IDE autocomplete.

### CJK Font Loading
- **D-04:** Noto Sans SC weights: Regular 400 + Bold 700 only. Matches General Sans usage pattern, keeps payload minimal.
- **D-05:** Load via `@fontsource/noto-sans-sc` with automatic unicode-range subsetting (~120 slices). Already decided as only new npm dependency.
- **D-06:** CJK font CSS loads only on /zh/ pages — conditional import in locale-aware layout. Zero performance regression on English and French pages.

### Routing & Page Structure
- **D-07:** Locale folders with thin wrapper pages: `src/pages/zh/index.astro`, `src/pages/fr/features/recovery-scoring.astro` etc. Each imports same layout/component, passes locale-specific translations. English pages stay at current paths untouched.
- **D-08:** Locale flows via `Astro.currentLocale` (built-in with i18n routing config). BaseLayout passes to Header/Footer for nav link generation. Components receive translated content as props — stay locale-agnostic.
- **D-09:** English pages get minimal touch — only BaseLayout changes (dynamic `lang` attr). No refactoring existing pages to use `t()` in this phase.

### French Typography
- **D-10:** Verify General Sans contains oe ligature (U+0153) during Phase 17 execution. Quick font check — if glyph missing, decide fallback before French content enters in Phase 19.

### Claude's Discretion
- Translation utility `t()` function implementation details (lookup mechanism, type inference approach)
- Astro i18n config specifics (locale codes, routing strategy details)
- Directory naming conventions for translation files (e.g. `src/i18n/`, `src/translations/`)

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Astro i18n
- `astro.config.mjs` — Current config, needs i18n block added
- Astro i18n routing docs (fetch via context7) — Built-in i18n routing API

### Existing Layout & Components
- `src/layouts/BaseLayout.astro` — Hardcodes `lang="en"`, needs dynamic locale
- `src/components/Header.astro` — Nav links need locale-aware paths
- `src/components/Footer.astro` — Footer links need locale-aware paths
- `src/components/SEO.astro` — Will need hreflang in Phase 22, but check current structure

### Project Decisions
- `.planning/REQUIREMENTS.md` — I18N-01, I18N-02, I18N-03 are this phase's requirements
- `.planning/STATE.md` §Accumulated Context — Locked decisions from roadmap planning

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `BaseLayout.astro` — Entry point for locale-aware `<html lang>` attr and conditional CJK font loading
- `SEO.astro` — 30-line custom component, easy to extend with locale-aware meta
- `Header.astro` / `Footer.astro` — Nav link generation points for locale-aware routing
- `FeaturePageLayout.astro`, `CoachingPageLayout.astro`, `LegalPageLayout.astro` — Layout variants that will receive locale prop

### Established Patterns
- Components receive content via props (inline in .astro files currently)
- General Sans loaded via `<link rel="preload">` in BaseLayout head
- CSS custom properties for design tokens in `global.css` (26KB)
- IntersectionObserver animation system with `data-animate` attributes

### Integration Points
- `astro.config.mjs` — i18n config block insertion point
- `src/pages/` — New `zh/` and `fr/` directories with thin wrapper pages
- `src/styles/global.css` — Potential CJK-specific typography adjustments
- Package.json — `@fontsource/noto-sans-sc` dependency addition

</code_context>

<specifics>
## Specific Ideas

No specific requirements — open to standard approaches for Astro i18n infrastructure.

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope.

</deferred>

---

*Phase: 17-i18n-infrastructure*
*Context gathered: 2026-05-17*
