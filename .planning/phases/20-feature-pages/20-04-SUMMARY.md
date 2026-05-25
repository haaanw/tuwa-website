---
phase: 20-feature-pages
plan: "04"
subsystem: i18n/feature-pages
tags: [i18n, zh, fr, smart-templates, cold-start, translations]
dependency_graph:
  requires: [20-01, 20-02]
  provides: [zh-smart-templates, fr-smart-templates, zh-cold-start, fr-cold-start]
  affects: [src/i18n/utils.ts, src/pages/zh/features, src/pages/fr/features]
tech_stack:
  patterns: [per-namespace-translation, zh-font-override, locale-wrapper-page]
key_files:
  created:
    - src/i18n/locales/zh/smart-templates.ts
    - src/i18n/locales/fr/smart-templates.ts
    - src/pages/zh/features/smart-templates.astro
    - src/pages/fr/features/smart-templates.astro
    - src/i18n/locales/zh/cold-start.ts
    - src/i18n/locales/fr/cold-start.ts
    - src/pages/zh/features/cold-start.astro
    - src/pages/fr/features/cold-start.astro
  modified:
    - src/i18n/utils.ts
decisions:
  - "Used exact key structure from EN source files — WidenStrings type enforces correctness at build time"
  - "zh wrapper pages import Noto Sans SC via fontsource and override --font-sans CSS variable"
  - "fr wrapper pages omit fontsource — Latin script covered by General Sans"
  - "Wired zh/fr into utils.ts during each task to avoid stub pattern in translation lookups"
metrics:
  duration_minutes: 18
  tasks_completed: 2
  files_created: 8
  files_modified: 1
  completed_date: "2026-05-25"
---

# Phase 20 Plan 04: zh/fr Translations for smart-templates and cold-start Summary

**One-liner:** Full Chinese and French translations with wrapper pages for smart-templates (blob-4) and cold-start (blob-2) feature pages, utils.ts wired immediately.

## What Was Built

4 translation namespace files and 4 locale wrapper pages covering 2 feature deep-dive pages (smart-templates and cold-start) in Chinese (zh) and French (fr).

### Translation Files

| File | Keys Translated | Notes |
|------|----------------|-------|
| `src/i18n/locales/zh/smart-templates.ts` | meta, hero, howItWorks (5 subkeys), realProgramming (3 subkeys) | Natural Chinese — 模板, 训练负荷, RPE, 主观运动强度 |
| `src/i18n/locales/fr/smart-templates.ts` | meta, hero, howItWorks (5 subkeys), realProgramming (3 subkeys) | tu register — Modèle, charge d'entraînement, RPE |
| `src/i18n/locales/zh/cold-start.ts` | meta, hero, howItWorks (7 subkeys), honestySection (3 subkeys) | 冷启动, HRV基线, 主观运动强度 |
| `src/i18n/locales/fr/cold-start.ts` | meta, hero, howItWorks (7 subkeys), honestySection (3 subkeys) | tu register — VFC, références populationnelles |

### Wrapper Pages

| Page | Locale | Font | Screenshot |
|------|--------|------|------------|
| `src/pages/zh/features/smart-templates.astro` | zh | Noto Sans SC 400/700 | active-workout.png |
| `src/pages/fr/features/smart-templates.astro` | fr | General Sans (default) | active-workout.png |
| `src/pages/zh/features/cold-start.astro` | zh | Noto Sans SC 400/700 | none (coming soon) |
| `src/pages/fr/features/cold-start.astro` | fr | General Sans (default) | none (coming soon) |

### utils.ts Updates

Both `smartTemplatesTranslations` and `coldStartTranslations` records in `src/i18n/utils.ts` now reference the actual zh/fr files instead of falling back to EN stubs.

## Deviations from Plan

### Auto-fixed: Worktree missing wave 1 foundation

**Found during:** Pre-task setup
**Issue:** Worktree was branched before wave 1 (Plans 01-02) executed. No i18n locales directory existed in the worktree.
**Fix:** Fast-forward merged main (`c22757a`) into the worktree branch before executing tasks. This is expected behavior for wave 2 parallel executors that branch before wave 1 commits.
**Commit:** Fast-forward merge (no new commit object created).

### No other deviations — plan executed exactly as written.

## Build Verification

- Task 1 build: 14 pages (12 existing + 2 new zh/fr smart-templates)
- Task 2 build: 16 pages (14 + 2 new zh/fr cold-start)
- `npm run build` succeeded both times with no errors

## Known Stubs

None. All translation keys are fully translated. The cold-start `screenshotAlt` key correctly says "coming soon" in the target language (matching the EN page which also has no screenshot yet) — this is intentional, not a stub.

## Threat Flags

None. Static translation files only — no new network endpoints, auth paths, or trust boundaries introduced.

## Self-Check: PASSED

All 8 files created and exist on disk. Both commits recorded:
- `b0756df` — feat(20-04): zh/fr translations and wrapper pages for smart-templates
- `68afff2` — feat(20-04): zh/fr translations and wrapper pages for cold-start
