---
phase: 20-feature-pages
plan: "05"
subsystem: i18n-coaching
tags: [i18n, coaching, zh, fr, translation, named-slots]
dependency_graph:
  requires: [20-01, 20-02]
  provides: [zh-coaching-page, fr-coaching-page]
  affects: [src/i18n/utils.ts, src/pages/zh/features/coaching.astro, src/pages/fr/features/coaching.astro]
tech_stack:
  added: []
  patterns: [namespace-translation-file, locale-wrapper-page, CJK-font-override-inline]
key_files:
  created:
    - src/i18n/locales/zh/coaching.ts
    - src/i18n/locales/fr/coaching.ts
    - src/pages/zh/features/coaching.astro
    - src/pages/fr/features/coaching.astro
  modified:
    - src/i18n/utils.ts
decisions:
  - "Apply font override inline in zh/coaching.astro (not CJKLayout) to preserve CoachingPageLayout locale prop threading"
  - "Wire zhCoaching/frCoaching into utils.ts coachingTranslations in this plan (not deferred) since translation files are created here"
  - "Merge main into worktree to get wave 1 prerequisites (utils.ts, en translation files) before executing"
metrics:
  duration: "~7 minutes"
  completed: "2026-05-25T07:46:51Z"
  tasks: 2
  files_created: 4
  files_modified: 1
---

# Phase 20 Plan 05: Coaching Page zh/fr Translation Summary

**One-liner:** Chinese and French coaching page translations with 34 strings each, CoachingPageLayout with all 3 named slots wired, utils.ts updated to serve real locale data.

## Tasks Completed

| Task | Name | Commit | Files |
|------|------|--------|-------|
| 1 | Create zh/fr coaching namespace files | 32f10df | src/i18n/locales/zh/coaching.ts, src/i18n/locales/fr/coaching.ts, src/i18n/utils.ts |
| 2 | Create zh/fr coaching wrapper pages with named slots | ce9c4f7 | src/pages/zh/features/coaching.astro, src/pages/fr/features/coaching.astro |

## What Was Built

### Translation Files (Task 1)

**src/i18n/locales/zh/coaching.ts** — 34 Chinese strings across 6 sections:
- `meta`: title "教练功能 — Tuwa", description
- `hero`: outcomeStatement, hookLine, screenshotAlt
- `howItWorks`: heading + p1–p5 (5 paragraphs in native Chinese)
- `coachAthlete`: athleteHeading "运动员视角", athleteP1–P3, coachHeading "教练视角", coachP1–P3
- `teamFeatures`: heading "团队工作流" + p1–p4
- `inviteFlow`: heading "秒速建立连接", intro, codeMethod, emailMethod, nfcMethod, howConnectionLabel "连接方式", step1–step4

**src/i18n/locales/fr/coaching.ts** — 34 French strings with "tu" register throughout:
- Same structure, full French text with proper accented characters
- "tu" register used consistently (connecte-toi, vois, prescris, etc.)

**src/i18n/utils.ts** — Wired zhCoaching/frCoaching imports and updated coachingTranslations record to use real locale files instead of English fallbacks.

### Wrapper Pages (Task 2)

**src/pages/zh/features/coaching.astro:**
- Imports Noto Sans SC (400, 700) and applies `--font-sans` override via `<style is:global>`
- Uses `CoachingPageLayout` (not CJKLayout) with `locale="zh"`
- All 3 named slots: `slot="coach-athlete"`, `slot="team-features"`, `slot="invite-flow"`
- Default slot: howItWorks section (5 paragraphs)
- No hardcoded English text anywhere

**src/pages/fr/features/coaching.astro:**
- No font imports (General Sans works for French)
- Uses `CoachingPageLayout` with `locale="fr"`
- All 3 named slots present
- No hardcoded English text anywhere

## Verification Results

- `npx tsc --noEmit`: Only pre-existing `astro:content` type error in content.config.ts — coaching files have 0 errors
- `npm run build`: SUCCESS — 14 pages built including `/zh/features/coaching` and `/fr/features/coaching`
- Named slot count: 3 in zh page, 3 in fr page (verified with grep)
- Key count: 34 string values in both zh and fr files (matching en/coaching.ts exactly)
- No English text fragments in either wrapper page (HTML comments excluded)

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] Merged main into worktree to get wave 1 prerequisites**
- **Found during:** Task 1 setup
- **Issue:** Worktree branched at `3edd9dd` (pre-phase-20 research commit) had no i18n directory, no en/coaching.ts, no utils.ts
- **Fix:** `git merge main --no-edit` brought in all wave 1 work (Plans 01, 02) including utils.ts and all en locale files
- **Impact:** Worktree now tracks main's wave 1 commits; no conflicts
- **Commit:** merge commit (before 32f10df)

**2. [Rule 2 - Missing critical functionality] Updated utils.ts to wire real zh/fr coaching translations**
- **Found during:** Task 1
- **Issue:** utils.ts had `zh: enCoaching` and `fr: enCoaching` TODO placeholders; creating zh/fr files without wiring them would mean pages silently served English
- **Fix:** Added zhCoaching/frCoaching imports and updated coachingTranslations record
- **Files modified:** src/i18n/utils.ts (included in Task 1 commit)

## Known Stubs

None. All 34 translation strings have real content in both zh and fr. The `screenshot` prop is not passed (same as the English coaching.astro — screenshot is optional and not yet available for this feature), resulting in the DeviceFrame showing "Coming soon" placeholder. This is consistent with the English source page behavior, not a translation stub.

## Threat Flags

None. Static translation content — no new trust boundaries, no new network endpoints, no auth paths.

## Self-Check: PASSED

- src/i18n/locales/zh/coaching.ts: EXISTS
- src/i18n/locales/fr/coaching.ts: EXISTS
- src/pages/zh/features/coaching.astro: EXISTS
- src/pages/fr/features/coaching.astro: EXISTS
- Task 1 commit 32f10df: EXISTS (git log confirmed)
- Task 2 commit ce9c4f7: EXISTS (git log confirmed)
- Build: PASSED (14 pages, 0 errors)
