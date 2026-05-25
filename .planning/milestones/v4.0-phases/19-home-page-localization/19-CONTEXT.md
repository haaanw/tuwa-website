# Phase 19: Home Page Localization - Context

**Gathered:** 2026-05-25
**Status:** Ready for planning

<domain>
## Phase Boundary

The landing page is fully readable and natural in Chinese and French, proving the translation pattern works end-to-end. All 4 landing page components (Hero, FeatureGrid, StatsCounter, LandingCTA) display translated content with no English fragments on /zh/ and /fr/.

</domain>

<decisions>
## Implementation Decisions

### Translation Delivery Pattern
- **D-01:** Each component calls `useTranslations(locale)` internally — same pattern established in Phase 18 (Footer, MobileMenu, Header). Components receive `locale` as a prop and are self-contained.
- **D-02:** Page-specific translation keys go in a new `home.ts` namespace within each locale folder (e.g., `src/i18n/locales/zh/home.ts`). Shared keys (nav, footer, meta) stay in `common.ts`.

### Content Source
- **D-03:** Claude drafts all zh and fr translations inline during execution. Marketing copy tone: scientific credibility without jargon, inspirational but grounded. User reviews in UAT.
- **D-04:** Chinese translations should feel native — not transliterated English. Use natural Chinese phrasing for sports/training concepts. French should use tu (informal) for athlete-facing copy.

### Layout Adaptation
- **D-05:** Trust fluid layout for French text expansion. Existing max-width containers, flex, and grid should absorb ~30% expansion. Only fix if UAT reveals actual breaks — no preemptive font-size reduction or manual line breaks.
- **D-06:** CJK line breaking handled by browser defaults + `word-break: normal` (already set). No special CSS needed.

### Component Scope
- **D-07:** Phase 19 translates the 4 components currently rendered on zh/fr pages: Hero, FeatureGrid, StatsCounter, LandingCTA. New uncommitted components (AudienceLanes, OutcomeCards, TrainingDecision, TuwaMethod) were planned but don't exist on disk — if they are added to the landing page before Phase 19 executes, include them. Otherwise translate only what's rendered.
- **D-08:** The zh/fr page wrappers already exist (`src/pages/zh/index.astro`, `src/pages/fr/index.astro`) with correct layout imports. They just need to pass `locale` prop to components.

### Claude's Discretion
- Translation key naming within the `home` namespace (follow existing nested object patterns)
- Whether to create a shared `home.ts` or inline keys in `common.ts` (choose based on key count)
- Alt text translations for images (dashboard screenshot)
- Meta title/description translations for zh/fr pages (t.meta.title already referenced)

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Translation Infrastructure
- `src/i18n/utils.ts` — `useTranslations()` utility with `WidenStrings<T>` type
- `src/i18n/locales/en/common.ts` — English dictionary structure (type source)
- `src/i18n/locales/zh/common.ts` — Chinese dictionary (structural reference)
- `src/i18n/locales/fr/common.ts` — French dictionary (structural reference)

### Landing Page Components (to be translated)
- `src/components/Hero.astro` — Headline, subtitle, CTA button, device frame alt text
- `src/components/FeatureGrid.astro` — Feature cards with titles and descriptions
- `src/components/StatsCounter.astro` — Stat labels and numbers
- `src/components/LandingCTA.astro` — Final CTA section text and button

### Page Wrappers (already exist)
- `src/pages/zh/index.astro` — Chinese homepage wrapper (uses CJKLayout)
- `src/pages/fr/index.astro` — French homepage wrapper (uses BaseLayout)
- `src/pages/index.astro` — English homepage (reference for content)

### Layout Infrastructure
- `src/layouts/BaseLayout.astro` — Standard layout, passes locale
- `src/layouts/CJKLayout.astro` — Chinese-specific layout with Noto Sans SC

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `useTranslations(locale)` from `src/i18n/utils.ts` — proven pattern from Phase 18
- `WidenStrings<T>` type utility — handles string literal widening for non-en locales
- `getRelativeLocaleUrl(locale, path)` from `astro:i18n` — for any internal links

### Established Patterns
- Phase 18 pattern: import useTranslations, add `locale` to Props interface, call `const t = useTranslations(locale as 'en' | 'zh' | 'fr')`, replace hardcoded text with `{t.key}`
- Translation fallback: missing keys return English text (graceful degradation)
- TypeScript enforces structural completeness across locale files

### Integration Points
- zh/fr page wrappers already import components but don't pass `locale` prop yet
- Components need `locale?: string` added to their Props interface
- `common.ts` already has `meta.title` and `meta.description` referenced by page wrappers

</code_context>

<specifics>
## Specific Ideas

- Chinese copy should feel native to Chinese athletes — use natural sports terminology, not transliterated English
- French copy uses "tu" (informal) for athlete-facing text
- Hero headline should convey the same energy as "Train smarter. Recover with precision." without being a literal translation

</specifics>

<deferred>
## Deferred Ideas

- New landing page components (AudienceLanes, OutcomeCards, TrainingDecision, TuwaMethod) — translate when they're committed and rendered on locale pages
- RTL language support — not in current milestone scope

</deferred>

---

*Phase: 19-home-page-localization*
*Context gathered: 2026-05-25*
