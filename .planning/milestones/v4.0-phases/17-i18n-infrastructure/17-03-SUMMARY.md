---
phase: 17-i18n-infrastructure
plan: 03
subsystem: ui
tags: [i18n, fonts, cjk, noto-sans-sc, astro, css-isolation]

requires:
  - phase: 17-i18n-infrastructure (plans 01, 02)
    provides: "i18n routing, CJK font installation, BaseLayout locale prop"
provides:
  - "CJKLayout.astro - dedicated layout for zh pages with CJK font imports"
  - "CJK font CSS isolation - ~235KB only loads on /zh/ pages"
affects: [17-i18n-infrastructure]

tech-stack:
  added: []
  patterns: ["CJK font isolation via dedicated layout component instead of conditional imports"]

key-files:
  created: [src/layouts/CJKLayout.astro]
  modified: [src/layouts/BaseLayout.astro, src/pages/zh/index.astro]

key-decisions:
  - "Used is:global style tag in CJKLayout for --font-sans override instead of slot injection"
  - "Static @fontsource imports in CJKLayout frontmatter for Vite tree-shaking"

patterns-established:
  - "CJK layout pattern: locale-specific layouts wrap BaseLayout with font imports"

requirements-completed: [I18N-01, I18N-02, I18N-03]

duration: 2min
completed: 2026-05-24
---

# Phase 17 Plan 03: CJK Font CSS Isolation Summary

**Isolated ~235KB Noto Sans SC CSS to /zh/ pages via dedicated CJKLayout.astro, eliminating CJK font loading on English and French pages**

## Performance

- **Duration:** 2 min
- **Started:** 2026-05-24T11:32:32Z
- **Completed:** 2026-05-24T11:34:48Z
- **Tasks:** 2
- **Files modified:** 3

## Accomplishments
- Created CJKLayout.astro that wraps BaseLayout with CJK font imports and --font-sans override
- Removed conditional CJK font loading from BaseLayout.astro (eliminated `await import()` pattern that caused Vite to bundle CJK CSS unconditionally)
- Updated zh/index.astro to use CJKLayout instead of BaseLayout
- Verified: EN and FR pages have zero CJK font CSS references; ZH page has dedicated CSS bundle with Noto Sans SC

## Task Commits

Each task was committed atomically:

1. **Task 1: Create CJKLayout and remove font imports from BaseLayout** - `6fe7d7b` (feat)
2. **Task 2: Update zh pages to use CJKLayout** - `48f27b5` (feat)

## Files Created/Modified
- `src/layouts/CJKLayout.astro` - New layout that imports @fontsource/noto-sans-sc and sets --font-sans CSS variable, wraps BaseLayout with locale="zh"
- `src/layouts/BaseLayout.astro` - Removed isCJK conditional, await import() calls, and conditional style block (lines 17-22 and 30-34)
- `src/pages/zh/index.astro` - Changed from BaseLayout to CJKLayout import, removed locale="zh" prop

## Decisions Made
- Used `<style is:global>` in CJKLayout for the --font-sans override rather than slot injection or layout duplication -- Astro scopes this CSS to pages using CJKLayout
- Static `import '@fontsource/noto-sans-sc/400.css'` in frontmatter instead of dynamic `await import()` -- Vite can properly tree-shake static imports per-component

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered
None

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- CJK font isolation complete
- Any future zh pages should use CJKLayout instead of BaseLayout
- Pattern is extensible: additional CJK locales (ja, ko) could follow the same layout pattern

## Self-Check: PASSED

All files exist, all commits verified.

---
*Phase: 17-i18n-infrastructure*
*Completed: 2026-05-24*
