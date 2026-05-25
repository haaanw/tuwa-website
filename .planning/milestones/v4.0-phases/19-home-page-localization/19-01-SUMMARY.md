---
phase: 19-home-page-localization
plan: 01
subsystem: i18n
tags: [i18n, localization, home-page, translations]
dependency_graph:
  requires: []
  provides: [useHomeTranslations, home-namespace, translated-hero, translated-stats, translated-cta]
  affects: [Hero.astro, StatsCounter.astro, LandingCTA.astro, zh/index.astro, fr/index.astro]
tech_stack:
  added: []
  patterns: [per-namespace-translation, locale-prop-drilling, WidenStrings-type-utility]
key_files:
  created:
    - src/i18n/locales/en/home.ts
    - src/i18n/locales/zh/home.ts
    - src/i18n/locales/fr/home.ts
  modified:
    - src/i18n/utils.ts
    - src/components/Hero.astro
    - src/components/StatsCounter.astro
    - src/components/LandingCTA.astro
    - src/pages/zh/index.astro
    - src/pages/fr/index.astro
decisions:
  - Fixed WidenStrings type to handle readonly tuples from as-const arrays (mapped tuple type instead of inferred element type)
metrics:
  duration: 231s
  completed: 2026-05-25T06:04:06Z
  tasks: 2/2
  files: 9
---

# Phase 19 Plan 01: Home Page Translation Namespace and Component Wiring Summary

Per-namespace home.ts translation files for en/zh/fr with useHomeTranslations utility, wiring Hero, StatsCounter, and LandingCTA to render locale-specific content via prop drilling.

## Tasks Completed

| Task | Name | Commit | Key Files |
|------|------|--------|-----------|
| 1 | Create home.ts translation files and extend i18n utility | 6f658df | en/home.ts, zh/home.ts, fr/home.ts, utils.ts |
| 2 | Wire Hero, StatsCounter, LandingCTA and update page wrappers | 0b6ebf3 | Hero.astro, StatsCounter.astro, LandingCTA.astro, zh/index.astro, fr/index.astro |

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Fixed WidenStrings type for readonly tuples**
- **Found during:** Task 1
- **Issue:** The `WidenStrings` type utility used `T extends readonly (infer U)[]` which collapses readonly tuples (created by `as const`) into a single element type. This caused a type mismatch when assigning the `homeTranslations` record in utils.ts because the features array is a 5-element tuple with distinct literal types per position.
- **Fix:** Changed the array branch to use mapped tuple types `{ [K in keyof T]: WidenStrings<T[K]> }` which preserves tuple structure while widening string literals at each position.
- **Files modified:** src/i18n/locales/en/home.ts
- **Commit:** 6f658df

## Verification Results

- `npx tsc --noEmit`: Passes (only pre-existing astro:content virtual module warning)
- `npm run build`: Passes, 12 pages built successfully
- No hardcoded English text remains in Hero, StatsCounter, or LandingCTA components

## Self-Check: PASSED
