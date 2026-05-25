---
phase: 20-feature-pages
plan: "01"
subsystem: i18n
tags: [i18n, locale, translations, FeatureCTA, layouts]
dependency_graph:
  requires: [phase-19-home-page-localization]
  provides: [locale-aware-feature-cta, locale-threaded-layouts]
  affects: [src/components/FeatureCTA.astro, src/layouts/FeaturePageLayout.astro, src/layouts/CoachingPageLayout.astro]
tech_stack:
  added: []
  patterns: [useTranslations, locale-prop-threading, per-namespace-translation]
key_files:
  created: []
  modified:
    - src/i18n/locales/en/common.ts
    - src/i18n/locales/zh/common.ts
    - src/i18n/locales/fr/common.ts
    - src/components/FeatureCTA.astro
    - src/layouts/FeaturePageLayout.astro
    - src/layouts/CoachingPageLayout.astro
decisions:
  - "featureCTA keys added to common.ts (shared across all feature pages) per D-04 pattern"
  - "locale defaults to 'en' in all components — existing English pages work unchanged"
  - "French uses 'tu' register consistent with fr/home.ts pattern"
metrics:
  duration: "2 minutes"
  completed: "2026-05-25"
  tasks_completed: 2
  tasks_total: 2
  files_modified: 6
---

# Phase 20 Plan 01: Locale prop threading for feature page layouts and FeatureCTA

**One-liner:** Locale prop chain wired from feature page wrappers through FeaturePageLayout/CoachingPageLayout into FeatureCTA using useTranslations with featureCTA keys in all 3 common.ts locales.

## What Was Built

Added `featureCTA` translation keys to all 3 locale `common.ts` files (en, zh, fr) and wired a `locale` prop through both feature page layouts (`FeaturePageLayout.astro`, `CoachingPageLayout.astro`) and the `FeatureCTA` component. The CTA component now reads all user-visible strings (headline, body, badge alt text, aria-label) from `useTranslations()` instead of hardcoded English strings.

## Tasks Completed

| Task | Name | Commit | Files |
|------|------|--------|-------|
| 1 | Add featureCTA keys to all 3 locales | a4c104b | en/common.ts, zh/common.ts, fr/common.ts |
| 2 | Wire locale prop into layouts and FeatureCTA | 4e89478 | FeaturePageLayout.astro, CoachingPageLayout.astro, FeatureCTA.astro |

## Verification

- `npm run build` succeeds: 12 pages built in 3.24s
- All 3 common.ts files contain `featureCTA` object with 4 keys
- FeatureCTA.astro uses `useTranslations` — no hardcoded English strings remain
- Both layouts thread `locale` prop to `BaseLayout` and `FeatureCTA`
- English defaults (`locale = 'en'`) preserve existing feature page behavior

## Deviations from Plan

None — plan executed exactly as written.

## Known Stubs

None. All featureCTA translation values are complete for all 3 locales.

## Threat Flags

None. Translation files are static TypeScript constants compiled at build time. No new trust boundaries introduced.

## Self-Check: PASSED

- [x] src/i18n/locales/en/common.ts — contains featureCTA keys
- [x] src/i18n/locales/zh/common.ts — contains featureCTA keys (Chinese)
- [x] src/i18n/locales/fr/common.ts — contains featureCTA keys (French, tu register)
- [x] src/components/FeatureCTA.astro — uses useTranslations, no hardcoded strings
- [x] src/layouts/FeaturePageLayout.astro — locale prop threaded to BaseLayout + FeatureCTA
- [x] src/layouts/CoachingPageLayout.astro — locale prop threaded to BaseLayout + FeatureCTA
- [x] commit a4c104b — exists
- [x] commit 4e89478 — exists
- [x] Build: 12 pages built successfully
