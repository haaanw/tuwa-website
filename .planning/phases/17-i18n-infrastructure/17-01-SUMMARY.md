---
phase: 17-i18n-infrastructure
plan: 01
subsystem: i18n
tags: [i18n, astro, typescript, translations]
dependency_graph:
  requires: []
  provides: [i18n-routing, translation-utility, locale-files]
  affects: [astro.config.mjs]
tech_stack:
  added: ["@fontsource/noto-sans-sc"]
  patterns: [type-safe-translations, locale-fallback, static-imports]
key_files:
  created:
    - src/i18n/utils.ts
    - src/i18n/locales/en/common.ts
    - src/i18n/locales/zh/common.ts
    - src/i18n/locales/fr/common.ts
  modified:
    - astro.config.mjs
    - package.json
decisions:
  - "Used {year} placeholder string in copyright instead of function for type compatibility"
  - "Static imports (not dynamic await import()) for build-time resolution"
metrics:
  duration: "81s"
  completed: "2026-05-17T02:09:08Z"
  tasks_completed: 2
  tasks_total: 2
---

# Phase 17 Plan 01: i18n Foundation Infrastructure Summary

Type-safe i18n routing with Astro built-in config, useTranslations utility returning typed nested objects, and en/zh/fr common translation files with compile-time shape validation.

## What Was Built

1. **Astro i18n routing configuration** - Added `i18n` block to astro.config.mjs with en/zh/fr locales, English unprefixed (preserving SEO equity), no fallback config (static site incompatible).

2. **Translation utility** (`src/i18n/utils.ts`) - Exports `useTranslations(locale)` function that returns typed `CommonTranslations` object. Falls back to English when locale is undefined. Uses static imports for all locale files.

3. **English baseline** (`src/i18n/locales/en/common.ts`) - Source of truth type via `as const` assertion. Exports `Common` type that zh/fr files must satisfy.

4. **Chinese translations** (`src/i18n/locales/zh/common.ts`) - Full nav/footer/meta translations typed against English shape.

5. **French translations** (`src/i18n/locales/fr/common.ts`) - Full nav/footer/meta translations with proper diacritics, typed against English shape.

6. **CJK font** - `@fontsource/noto-sans-sc` installed for Chinese character rendering.

## Commits

| Task | Commit | Description |
|------|--------|-------------|
| 1 | 63e95d6 | Add Astro i18n routing config and install @fontsource/noto-sans-sc |
| 2 | d812cf6 | Create type-safe translation utility and locale files |

## Deviations from Plan

None - plan executed exactly as written.

## Self-Check: PASSED
