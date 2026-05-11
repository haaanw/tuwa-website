---
phase: 03-content-pages
plan: "02"
subsystem: ui
tags: [astro, chart.js, tailwind, typography, faq, layouts]

# Dependency graph
requires:
  - phase: 03-content-pages-01
    provides: FeaturePageLayout, ScreenshotBlock, FeatureCTA, BaseLayout wrapping pattern

provides:
  - CoachingPageLayout with 3 named slots (coach-athlete, team-features, invite-flow)
  - LegalPageLayout with 680px prose container using @tailwindcss/typography
  - RecoveryChart Astro component (Chart.js bar chart, bundled script)
  - AcwrChart Astro component (Chart.js line chart, bundled script)
  - FaqAccordion component (8 items, native details/summary, zero JS)

affects:
  - 03-content-pages-03
  - 03-content-pages-04
  - coaching page
  - legal pages (privacy, terms, support)
  - support page (FAQ)

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Chart.js components use bundled <script> (not is:inline) so Vite can tree-shake and resolve npm imports"
    - "FaqAccordion uses native details/summary for zero-JS accordion with full keyboard accessibility"
    - "CoachingPageLayout uses alternating surface/bg color sections with named slots for coaching-specific content"
    - "LegalPageLayout applies prose prose-neutral max-w-none class for @tailwindcss/typography styling"

key-files:
  created:
    - src/layouts/CoachingPageLayout.astro
    - src/layouts/LegalPageLayout.astro
    - src/components/charts/RecoveryChart.astro
    - src/components/charts/AcwrChart.astro
    - src/components/FaqAccordion.astro
  modified: []

key-decisions:
  - "CoachingPageLayout wraps BaseLayout directly (not FeaturePageLayout) — adds 3 named slots for coaching-specific sections"
  - "LegalPageLayout uses --text-heading (28px) not --text-display (48px) — legal pages are not marketing hero pages"
  - "FaqAccordion uses CSS ::after pseudo-element for +/minus markers, removing browser-default disclosure triangle"

patterns-established:
  - "Named slots pattern: coaching layout uses slot name=coach-athlete, team-features, invite-flow for section-level customization"
  - "Chart.js bundled script: import Chart from chart.js/auto inside plain <script> (no is:inline), canvas id targeted with getElementById"

requirements-completed: [FEAT-07, LEGAL-01, LEGAL-02, LEGAL-03]

# Metrics
duration: 3min
completed: 2026-05-11
---

# Phase 03 Plan 02: Component Infrastructure (Layouts + Charts + FAQ) Summary

**CoachingPageLayout and LegalPageLayout + Chart.js bar/line chart components + zero-JS FAQ accordion completing all reusable infrastructure for Wave 2 content pages**

## Performance

- **Duration:** ~3 min
- **Started:** 2026-05-11T04:06:29Z
- **Completed:** 2026-05-11T04:08:53Z
- **Tasks:** 2
- **Files modified:** 5

## Accomplishments
- CoachingPageLayout: wraps BaseLayout with hero/screenshot + 3 named slots (coach-athlete, team-features, invite-flow) for coaching page structure
- LegalPageLayout: wraps BaseLayout with 680px prose container and @tailwindcss/typography for privacy/terms/support pages
- RecoveryChart: Chart.js bar chart showing HRV/RHR/Sleep/Wellness contribution with accessible aria-label
- AcwrChart: Chart.js dual-line chart showing 28-day acute vs chronic load trend illustrating ACWR concept
- FaqAccordion: 8 FAQ items using native details/summary with CSS-only +/minus markers and 44px touch targets

## Task Commits

Each task was committed atomically:

1. **Task 1: Create CoachingPageLayout and LegalPageLayout** - `d99f26a` (feat)
2. **Task 2: Create RecoveryChart, AcwrChart, and FaqAccordion** - `c863eeb` (feat)

**Plan metadata:** *(see final commit)*

## Files Created/Modified
- `src/layouts/CoachingPageLayout.astro` - Extended feature layout with 3 coaching-specific named slots
- `src/layouts/LegalPageLayout.astro` - Prose layout with 680px max-width for legal/support pages
- `src/components/charts/RecoveryChart.astro` - Chart.js bar chart for recovery score components
- `src/components/charts/AcwrChart.astro` - Chart.js line chart for acute vs chronic load (28-day)
- `src/components/FaqAccordion.astro` - 8-item FAQ accordion with native details/summary and zero JavaScript

## Decisions Made
- CoachingPageLayout wraps BaseLayout directly rather than FeaturePageLayout — the coaching page needs alternating surface/bg section backgrounds that FeaturePageLayout doesn't support
- LegalPageLayout uses `--text-heading` (28px) not `--text-display` (48px) — legal pages aren't marketing hero pages and 48px display would be visually oversized
- Chart components use bundled `<script>` (not `<script is:inline>`) so Vite resolves the `chart.js/auto` npm import; `is:inline` would fail to bundle npm dependencies
- FaqAccordion uses CSS `::after` pseudo-element for disclosure markers with explicit content removal via `list-style: none` and `::-webkit-details-marker: none` — eliminates cross-browser inconsistency in arrow styling

## Deviations from Plan

None — plan executed exactly as written.

## Issues Encountered

**Pre-existing type error in astro.config.mjs (out of scope):** `npx astro check` reports 1 pre-existing error in `astro.config.mjs` related to a Vite plugin type mismatch (`Plugin<any>[]` not assignable to `PluginOption`). This error was present before this plan began and is unrelated to any files created here. Confirmed by checking that the error count was 1 both before and after adding the 3 new component files (file count went from 17 to 20). Deferred per deviation rules — out-of-scope pre-existing issue.

## Known Stubs

None — components contain representative data and functional implementations. Chart data is intentionally illustrative (not real user data) as documented in the plan.

## User Setup Required

None — no external service configuration required.

## Next Phase Readiness
- All 5 infrastructure files are in place — Wave 2 plans (03-03 and 03-04) can now build the 8 content pages
- CoachingPageLayout ready for coaching.astro
- LegalPageLayout ready for privacy.astro, terms.astro, support.astro
- RecoveryChart ready to embed in recovery scoring feature page
- AcwrChart ready to embed in workload tracking feature page
- FaqAccordion ready to embed in support page
- Pre-existing astro.config.mjs type error should be investigated before go-live but does not block page builds

---
*Phase: 03-content-pages*
*Completed: 2026-05-11*

## Self-Check: PASSED

All 5 files confirmed present:
- FOUND: src/layouts/CoachingPageLayout.astro
- FOUND: src/layouts/LegalPageLayout.astro
- FOUND: src/components/charts/RecoveryChart.astro
- FOUND: src/components/charts/AcwrChart.astro
- FOUND: src/components/FaqAccordion.astro

Both commits confirmed:
- FOUND: d99f26a (Task 1 — layouts)
- FOUND: c863eeb (Task 2 — charts + FAQ)
