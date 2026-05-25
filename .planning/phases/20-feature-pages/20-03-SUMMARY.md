---
phase: 20-feature-pages
plan: "03"
subsystem: i18n
tags: [i18n, feature-pages, zh, fr, recovery-scoring, workload-tracking]
dependency_graph:
  requires: [20-01, 20-02]
  provides: [zh-recovery-scoring-page, fr-recovery-scoring-page, zh-workload-tracking-page, fr-workload-tracking-page]
  affects: [src/i18n/utils.ts]
tech_stack:
  added: []
  patterns: [zh-wrapper-with-noto-font, fr-wrapper-without-fontsource, namespace-translation-file]
key_files:
  created:
    - src/i18n/locales/zh/recovery-scoring.ts
    - src/i18n/locales/fr/recovery-scoring.ts
    - src/pages/zh/features/recovery-scoring.astro
    - src/pages/fr/features/recovery-scoring.astro
    - src/i18n/locales/zh/workload-tracking.ts
    - src/i18n/locales/fr/workload-tracking.ts
    - src/pages/zh/features/workload-tracking.astro
    - src/pages/fr/features/workload-tracking.astro
  modified:
    - src/i18n/utils.ts
decisions:
  - "zh wrapper pages use Noto Sans SC font override via <style is:global> (not CJKLayout — avoids double BaseLayout wrapping)"
  - "fr wrapper pages do not import fontsource; inherit General Sans from BaseLayout"
  - "utils.ts stubs for zh/fr recovery-scoring and workload-tracking replaced with real translation files"
metrics:
  duration: "~7 minutes"
  completed: "2026-05-25"
  tasks_completed: 2
  tasks_total: 2
  files_created: 8
  files_modified: 1
---

# Phase 20 Plan 03: zh/fr Translations for Recovery-Scoring and Workload-Tracking Summary

**One-liner:** Full Chinese and French translations with wrapper pages for recovery-scoring and workload-tracking feature pages, wired into utils.ts lookup functions.

## What Was Built

Created 4 namespace translation files and 4 wrapper pages for 2 of the 5 feature deep-dive pages, covering Chinese (zh) and French (fr) locales:

- `src/i18n/locales/zh/recovery-scoring.ts` — Chinese translation of all recovery scoring content using sport-specific terminology (心率变异性, 恢复评分, 准备状态, 主观运动强度)
- `src/i18n/locales/fr/recovery-scoring.ts` — French translation using "tu" register and established VFC/Score de récupération/niveau de forme terminology
- `src/pages/zh/features/recovery-scoring.astro` — zh wrapper page with Noto Sans SC font override, full sticky-scroll showcase and science section
- `src/pages/fr/features/recovery-scoring.astro` — fr wrapper page (no fontsource), same structure
- `src/i18n/locales/zh/workload-tracking.ts` — Chinese translation using 训练负荷, 急慢性训练负荷比 (ACWR), 主观运动强度 (RPE), 储备次数 (RIR)
- `src/i18n/locales/fr/workload-tracking.ts` — French translation using Charge d'entraînement, ACWR, RPE (Effort Perçu), RIR
- `src/pages/zh/features/workload-tracking.astro` — zh wrapper with Noto Sans SC
- `src/pages/fr/features/workload-tracking.astro` — fr wrapper without fontsource
- `src/i18n/utils.ts` — replaced zh/fr en-stubs for recovery-scoring and workload-tracking with real imported translation files

## Commits

| Task | Commit | Description |
|------|--------|-------------|
| Task 1: recovery-scoring zh/fr | 3fddd17 | feat(20-03): zh/fr translations and wrapper pages for recovery-scoring |
| Task 2: workload-tracking zh/fr | a1d13c4 | feat(20-03): zh/fr translations and wrapper pages for workload-tracking |

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] Worktree was missing prerequisite phase 19 and 20-01/20-02 work**
- **Found during:** Task 1 setup — worktree HEAD was at commit `3edd9dd` (pre-phase 17), missing all i18n infrastructure
- **Fix:** `git merge main --no-edit` fast-forwarded the worktree branch to `c22757a` (wave 1 complete), bringing in all prerequisite files (utils.ts with lookup functions, EN namespace files, FeaturePageLayout locale prop)
- **Files affected:** All source files from phases 17–20 wave 1
- **Impact:** None — fast-forward merge, no conflicts

**2. [Rule 2 - Improvement] Also wired zh/fr workload-tracking into utils.ts in Task 2**
- The plan noted TODO comments in utils.ts for Plan 03/04; since both features were being created in this plan, the zh/fr workload-tracking stubs were also replaced (not just recovery-scoring stubs)
- This is consistent with the plan scope (both features in plan 03)

## Verification Results

- `npm run build` succeeds with 16 pages (up from 14 before task 1, +2 more after task 2)
- `/zh/features/recovery-scoring` and `/zh/features/workload-tracking` pages built
- `/fr/features/recovery-scoring` and `/fr/features/workload-tracking` pages built
- All zh wrapper pages have `@fontsource/noto-sans-sc` imports and `--font-sans` CSS override
- All fr wrapper pages have no fontsource imports
- No `CJKLayout` in any zh feature wrapper page
- No hardcoded English text in slot content of any wrapper page
- All `t.*` key references map to existing translation keys

## Known Stubs

None. All translation keys are fully translated. No placeholder text detected in any created file.

## Threat Flags

None. Static translation content, no new trust boundaries or network endpoints introduced.

## Self-Check

- [x] `src/i18n/locales/zh/recovery-scoring.ts` exists and contains `export default recoveryScoring`
- [x] `src/i18n/locales/fr/recovery-scoring.ts` exists and contains `export default recoveryScoring`
- [x] `src/pages/zh/features/recovery-scoring.astro` contains `useRecoveryScoringTranslations('zh')`
- [x] `src/pages/fr/features/recovery-scoring.astro` contains `useRecoveryScoringTranslations('fr')`
- [x] `src/i18n/locales/zh/workload-tracking.ts` exists and contains `export default workloadTracking`
- [x] `src/i18n/locales/fr/workload-tracking.ts` exists and contains `export default workloadTracking`
- [x] `src/pages/zh/features/workload-tracking.astro` contains `useWorkloadTrackingTranslations('zh')`
- [x] `src/pages/fr/features/workload-tracking.astro` contains `useWorkloadTrackingTranslations('fr')`
- [x] Commits 3fddd17 and a1d13c4 exist in git log

## Self-Check: PASSED
