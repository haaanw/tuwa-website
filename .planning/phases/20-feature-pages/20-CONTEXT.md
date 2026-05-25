# Phase 20: Feature Pages - Context

**Gathered:** 2026-05-25
**Status:** Ready for planning

<domain>
## Phase Boundary

All 5 feature deep-dive pages (recovery-scoring, workload-tracking, smart-templates, cold-start, coaching) are fully translated and visually intact in both Chinese and French. Locale wrapper pages exist at /zh/features/* and /fr/features/*.

</domain>

<decisions>
## Implementation Decisions

### Translation File Organization
- **D-01:** One translation namespace file per feature page per locale: `recovery-scoring.ts`, `workload-tracking.ts`, `smart-templates.ts`, `cold-start.ts`, `coaching.ts`. Matches the `home.ts` pattern from Phase 19. Coaching's unique sections (coach-athlete, team-features, invite-flow) stay isolated.

### Content Extraction Strategy
- **D-02:** Full extraction — ALL text (headings, paragraphs, alt text, aria labels) becomes translation keys via `useTranslations()`. No inline English left in translated pages. Consistent with Phase 19 pattern.
- **D-03:** Long body paragraphs (science explanations, step guides) are individual translation keys, not concatenated. Each `<p>` or `<h2>`/`<h3>` maps to its own key path.

### FeatureCTA Component
- **D-04:** Make FeatureCTA locale-aware. Add `locale` prop, use `useTranslations()` for headline ("Start training with confidence"), body text, and badge alt/aria text. CTA translation keys go in `common.ts` (shared across all feature pages, not duplicated per-page).

### Locale Page Structure
- **D-05:** Thin wrapper pages in `src/pages/zh/features/` and `src/pages/fr/features/`. Each imports the same layout (FeaturePageLayout or CoachingPageLayout), passes `locale` prop. Components read translations internally. Minimal duplication — same pattern as `zh/index.astro`.

### Content & Tone (carried from Phase 19)
- **D-06:** Claude drafts all zh and fr translations inline during execution. User reviews in UAT.
- **D-07:** Chinese translations feel native — natural Chinese sports/training terminology, not transliterated English. French uses "tu" (informal) for athlete-facing copy.
- **D-08:** Trust fluid layout for French text expansion. Only fix if UAT reveals actual breaks.

### Claude's Discretion
- Translation key naming within each feature namespace (follow nested object patterns from home.ts)
- Whether coaching.ts keys use flat or nested structure for named slot sections
- Alt text translations for screenshots and device frames
- Meta title/description translations for zh/fr feature pages

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Feature Pages (source content to translate)
- `src/pages/features/recovery-scoring.astro` — Recovery scoring deep-dive with sticky scroll showcase and science section
- `src/pages/features/workload-tracking.astro` — Workload tracking deep-dive
- `src/pages/features/smart-templates.astro` — Smart templates deep-dive
- `src/pages/features/cold-start.astro` — Cold start deep-dive
- `src/pages/features/coaching.astro` — Coaching deep-dive (12.7K, uses CoachingPageLayout with named slots)

### Layouts (need locale prop wiring)
- `src/layouts/FeaturePageLayout.astro` — Used by 4 feature pages; takes title, description, outcomeStatement, hookLine, screenshotAlt props
- `src/layouts/CoachingPageLayout.astro` — Used by coaching page; same props + named slots (coach-athlete, team-features, invite-flow)

### Shared Components
- `src/components/FeatureCTA.astro` — Hardcoded English CTA; needs locale-aware refactor (D-04)

### Translation Infrastructure
- `src/i18n/utils.ts` — `useTranslations()` utility with `WidenStrings<T>` type
- `src/i18n/locales/en/home.ts` — Reference for namespace file structure
- `src/i18n/locales/en/common.ts` — Shared keys (CTA keys will be added here)
- `src/i18n/locales/zh/common.ts` — Chinese common dictionary
- `src/i18n/locales/fr/common.ts` — French common dictionary

### Existing Locale Pages (pattern reference)
- `src/pages/zh/index.astro` — Thin wrapper pattern to follow
- `src/pages/fr/index.astro` — Thin wrapper pattern to follow
- `src/layouts/CJKLayout.astro` — zh pages use this for Noto Sans SC loading

### Requirements
- `.planning/REQUIREMENTS.md` — I18N-07 (5 feature pages translated), I18N-08 (French expansion doesn't break layouts)

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `useTranslations(locale)` from `src/i18n/utils.ts` — proven pattern from Phase 18/19
- `WidenStrings<T>` type utility — handles string literal widening for non-en locales
- `getRelativeLocaleUrl(locale, path)` from `astro:i18n` — for internal links in translated content
- `CJKLayout.astro` — wraps BaseLayout with `locale="zh"` and Noto Sans SC font

### Established Patterns
- Phase 19 pattern: namespace .ts file per page (home.ts), `useTranslations()` in component, `locale` prop on component interface
- FeaturePageLayout/CoachingPageLayout receive content via props (title, hookLine, etc.)
- Feature pages have inline `<script is:inline>` blocks (StickyScrollController, etc.) — these are locale-agnostic, no translation needed

### Integration Points
- FeaturePageLayout.astro and CoachingPageLayout.astro need `locale` prop added to Props interface and passed to BaseLayout
- FeatureCTA.astro needs `locale` prop and `useTranslations()` wiring
- 10 new wrapper pages needed: 5 in `src/pages/zh/features/`, 5 in `src/pages/fr/features/`
- 15 new translation files: 5 namespaces x 3 locales (en/zh/fr)
- `common.ts` in all 3 locales needs FeatureCTA keys added

</code_context>

<specifics>
## Specific Ideas

- Chinese copy should feel native to Chinese athletes — use natural sports terminology, not transliterated English
- French copy uses "tu" (informal) for athlete-facing text
- Feature-specific scientific terminology should be consistent across all 5 pages within each locale (e.g., same Chinese term for "HRV" everywhere)

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope.

</deferred>

---

*Phase: 20-feature-pages*
*Context gathered: 2026-05-25*
