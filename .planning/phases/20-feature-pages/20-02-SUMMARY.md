---
phase: 20-feature-pages
plan: "02"
subsystem: i18n
tags: [i18n, translations, typescript, feature-pages]
dependency_graph:
  requires: [phase-19-home-localization]
  provides: [en-namespace-files-feature-pages, feature-translation-lookup-api]
  affects: [plans-20-03-through-20-05]
tech_stack:
  added: []
  patterns: [per-namespace-translation-file, widen-strings-type, use-xxx-translations-hook]
key_files:
  created:
    - src/i18n/locales/en/recovery-scoring.ts
    - src/i18n/locales/en/workload-tracking.ts
    - src/i18n/locales/en/smart-templates.ts
    - src/i18n/locales/en/cold-start.ts
    - src/i18n/locales/en/coaching.ts
  modified:
    - src/i18n/utils.ts
decisions:
  - "Used EN fallback for zh/fr record entries to keep TypeScript passing until Plans 03-05 create zh/fr files"
  - "Commented out zh/fr imports with TODO markers rather than adding them with broken paths"
metrics:
  duration: "5m"
  completed: "2026-05-25"
  tasks_completed: 2
  files_created: 5
  files_modified: 1
---

# Phase 20 Plan 02: EN Namespace Files + Utils Extensions Summary

**One-liner:** 5 English translation namespace files created for all feature pages, with per-namespace TypeScript types and lookup functions added to utils.ts.

## Tasks Completed

| Task | Name | Commit | Files |
|------|------|--------|-------|
| 1 | Create 5 EN namespace translation files | 7966f34 | src/i18n/locales/en/{recovery-scoring,workload-tracking,smart-templates,cold-start,coaching}.ts |
| 2 | Extend utils.ts with 5 feature translation lookup functions | 347ac2c | src/i18n/utils.ts |

## What Was Built

### Task 1: EN Namespace Files

Five TypeScript translation files created following the exact pattern from `src/i18n/locales/en/home.ts`:

- **recovery-scoring.ts** — `meta`, `hero`, `howItWorks` (3 subsections: overview p1/p2, threeZones), `deviceCompatibility`, `personalBaseline`, `scienceSection` (3 paragraphs)
- **workload-tracking.ts** — `meta`, `hero`, `howItWorks` (5 subsections: acuteChronic p2/p3, repsInReserve, personalRecords), `scienceSection` (3 paragraphs)
- **smart-templates.ts** — `meta`, `hero`, `howItWorks` (5 subsections: prescriptionToExecution p2/p3, autoregulation, connect), `realProgramming` (3 paragraphs)
- **cold-start.ts** — `meta`, `hero`, `howItWorks` (6 subsections: day1, days3to5, day7 p5/p6), `honestySection` (3 paragraphs)
- **coaching.ts** — `meta`, `hero`, `howItWorks` (5 paragraphs), `coachAthlete` (athleteHeading/P1-P3, coachHeading/P1-P3), `teamFeatures` (4 paragraphs), `inviteFlow` (heading, intro, 3 methods, howConnectionLabel, steps 1-4)

Each file uses:
- `WidenStrings<T>` type at the top (verbatim from home.ts)
- `const xxx = { ... } as const`
- `export default xxx`
- `export type Xxx = WidenStrings<typeof xxx>`

### Task 2: utils.ts Extensions

Added to `src/i18n/utils.ts`:
- 5 EN imports (active)
- 10 zh/fr import lines (commented with TODO markers for Plans 03-05)
- 5 type imports (`RecoveryScoring`, `WorkloadTracking`, `SmartTemplates`, `ColdStart`, `Coaching`)
- 5 record declarations using EN fallback for zh/fr until translations exist
- 5 exported lookup functions: `useRecoveryScoringTranslations`, `useWorkloadTrackingTranslations`, `useSmartTemplatesTranslations`, `useColdStartTranslations`, `useCoachingTranslations`

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] zh/fr record entries use EN fallback instead of broken imports**
- **Found during:** Task 2
- **Issue:** The plan offered two options: (A) add all imports and accept TypeScript errors, or (B) comment out zh/fr imports. Option A would have added new TypeScript errors; option B requires a second touch of utils.ts.
- **Fix:** Chose option B (commented zh/fr imports) but added EN fallback values for the zh/fr record entries so TypeScript compiles cleanly. This means utils.ts only needs one touch — Plans 03-05 just need to uncomment the imports and replace the fallback values.
- **Files modified:** src/i18n/utils.ts
- **Commit:** 347ac2c

**2. [Rule 3 - Blocking] Worktree was behind main by Phase 17-19 commits**
- **Found during:** Pre-task setup
- **Issue:** Worktree branch was at commit 3edd9dd (pre-Phase-17) and lacked the i18n directory structure (utils.ts, locales/en/home.ts, locales/zh/, locales/fr/) created in Phases 17-19.
- **Fix:** Merged main into worktree branch via `git merge main --no-edit` (fast-forward, no conflicts).
- **Files affected:** All Phase 17-19 artifacts (not task files)

## TypeScript Status

`npx tsc --noEmit` produces 1 error in `src/content.config.ts` (pre-existing, unrelated to this plan — the `astro:content` module ambient type is missing in the worktree TypeScript config). All 5 new EN namespace files and utils.ts additions compile without errors.

## Known Stubs

None. All translation keys map to actual English text extracted from the source .astro pages. No placeholder values.

## Threat Flags

None. Static TypeScript files in version control; no new network surface.

## Self-Check: PASSED

- [x] src/i18n/locales/en/recovery-scoring.ts exists with `export default recoveryScoring` and `export type RecoveryScoring`
- [x] src/i18n/locales/en/workload-tracking.ts exists with `export default workloadTracking` and `export type WorkloadTracking`
- [x] src/i18n/locales/en/smart-templates.ts exists with `export default smartTemplates` and `export type SmartTemplates`
- [x] src/i18n/locales/en/cold-start.ts exists with `export default coldStart` and `export type ColdStart`
- [x] src/i18n/locales/en/coaching.ts exists with `export default coaching` and `export type Coaching`
- [x] utils.ts grep count for 5 function names returns 5
- [x] Commits 7966f34 and 347ac2c exist in git log
- [x] coaching.ts contains `coachAthlete`, `teamFeatures`, `inviteFlow` sections
- [x] No TypeScript errors introduced by this plan's files
