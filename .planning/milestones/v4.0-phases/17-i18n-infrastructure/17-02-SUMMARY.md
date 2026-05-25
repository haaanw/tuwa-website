---
phase: 17-i18n-infrastructure
plan: "02"
subsystem: i18n-routing
tags: [i18n, locale, routing, cjk-font, astro]
dependency_graph:
  requires: [17-01]
  provides: [locale-routing, cjk-font-loading, locale-aware-navigation]
  affects: [BaseLayout, Header, Footer, MobileMenu]
tech_stack:
  added: ["@fontsource/noto-sans-sc"]
  patterns: [getRelativeLocaleUrl, conditional-css-import, locale-prop-threading]
key_files:
  created:
    - src/pages/zh/index.astro
    - src/pages/fr/index.astro
  modified:
    - src/layouts/BaseLayout.astro
    - src/components/Header.astro
    - src/components/Footer.astro
    - src/components/MobileMenu.astro
    - package.json
    - package-lock.json
decisions:
  - "Used await import() for conditional CJK font loading (Vite CSS import at build time)"
  - "Noto Sans SC loaded only for zh locale via isCJK flag in BaseLayout frontmatter"
  - "All internal hrefs wrapped with getRelativeLocaleUrl; external URLs unchanged"
metrics:
  duration: "~2 minutes"
  completed: "2026-05-17"
  tasks_completed: 3
  tasks_total: 3
---

# Phase 17 Plan 02: Locale Routing and CJK Font Loading Summary

Wire locale-awareness into layout/nav components, create /zh/ and /fr/ route pages, conditional Noto Sans SC loading for Chinese locale.

## What Was Built

1. **BaseLayout locale support**: Added `locale` prop (defaults to `'en'`), dynamic `<html lang={locale}>`, conditional CJK font loading via `await import('@fontsource/noto-sans-sc/...')`, and CJK font-family override style block.

2. **Locale-aware navigation**: Header, Footer, and MobileMenu now accept a `locale` prop and use `getRelativeLocaleUrl(locale, path)` for all internal links. External URLs (App Store) remain unwrapped.

3. **Locale wrapper pages**: Thin `/zh/index.astro` and `/fr/index.astro` pages that set locale and pull translated meta title/description from the i18n utility.

4. **Build verification**: 12 pages built successfully. CJK font references appear ONLY in zh page output. English and French pages have zero CJK font impact.

## Verification Results

- `/zh/` page: `lang="zh"`, Noto Sans SC referenced in HTML
- `/fr/` page: `lang="fr"`, no CJK font references
- `/` (English): `lang="en"`, no CJK font references
- Build: 12 pages, no errors
- Backward compatibility: English pages pass no locale prop, defaults work correctly

## D-10 OE Ligature Check

**Status: Untested (automated)** - fonttools requires brotli module to decode woff2 files. Manual browser verification needed: render "oeuvre" on /fr/ page and confirm General Sans displays the oe ligature (U+0153) correctly. Requires human visual verification post-execution.

## Deviations from Plan

### Pre-existing Issues (Not Fixed)

**astro check type errors in translation files** - Plan 01 created zh/fr translation files that use `satisfies` but astro check reports literal type mismatches (e.g., Type '"功能"' is not assignable to type '"Features"'). These are pre-existing from Wave 1 and do not affect the build. Out of scope for this plan.

## Checkpoint: Visual Verification

Task 3 (human-verify checkpoint) was auto-approved per execution instructions. **Requires human visual verification post-execution:**
- Visit /zh/ and confirm Noto Sans SC loads in DevTools Network tab
- Visit /fr/ and confirm no CJK font requests
- Verify English pages are visually identical to before
- Verify nav links on locale pages use locale-prefixed URLs

## Self-Check: PASSED

- [x] src/pages/zh/index.astro exists
- [x] src/pages/fr/index.astro exists
- [x] dist/zh/index.html generated with lang="zh"
- [x] dist/fr/index.html generated with lang="fr"
- [x] Commit 28bbc05 exists (Task 1)
- [x] Commit f9e11ef exists (Task 2)
