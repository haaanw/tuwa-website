---
phase: 11-css-foundation-token-system
plan: 01
subsystem: css-foundation
tags: [fonts, variable-font, design-tokens, view-transitions, css, matisse]
one_liner: "Self-hosted General Sans variable WOFF2 (200-700 axis), four weight design tokens, native CSS view-transition crossfade, and Matisse CSS class scaffolding"

dependency_graph:
  requires: []
  provides:
    - GeneralSans-Variable.woff2 self-hosted in public/fonts/
    - --weight-display/heading/body/label tokens in :root
    - "@view-transition { navigation: auto } MPA crossfade"
    - .matisse-frieze and .matisse-shape CSS stub classes
  affects:
    - Phase 14 (typography rollout uses --weight-* tokens)
    - Phase 15 (Matisse SVG populates .matisse-frieze / .matisse-shape)
    - Phase 16 (view transitions are interaction polish foundation)

tech_stack:
  added: []
  patterns:
    - Self-hosted variable WOFF2 via @font-face with font-weight range syntax
    - CSS @view-transition MPA crossfade (no JS, no ClientRouter)
    - CSS class stubs with prefers-reduced-motion guard

key_files:
  created:
    - public/fonts/GeneralSans-Variable.woff2
    - .planning/phases/11-css-foundation-token-system/11-01-SUMMARY.md
  modified:
    - src/styles/global.css
    - astro.config.mjs
    - src/layouts/BaseLayout.astro

decisions:
  - "Self-host WOFF2 from Fontshare CDN rather than use Astro Font API — unifont provider hardcodes hasVariableWeights:false, expanding weights to 6 discrete static files instead of one variable file"
  - "Use @view-transition { navigation: auto } (native CSS) — NOT ClientRouter or ViewTransitions component which would break IntersectionObserver scroll-reveal animations"
  - "font-weight: 200 700 (space-separated range) declares variable font axis — not two discrete weights"
  - "crossorigin attribute required on preload link even for same-origin fonts — prevents double-fetch"

metrics:
  duration_minutes: 8
  completed_date: "2026-05-15"
  tasks_completed: 2
  tasks_total: 2
  files_created: 1
  files_modified: 3
---

# Phase 11 Plan 01: CSS Foundation & Token System Summary

Self-hosted General Sans variable WOFF2 (200-700 axis), four weight design tokens, native CSS view-transition crossfade, and Matisse CSS class scaffolding — zero visual change, zero new npm dependencies.

## Tasks Completed

| Task | Name | Commit | Files |
|------|------|--------|-------|
| 1 | Self-host variable font + remove Astro Font API config + weight tokens | bc084a4 | public/fonts/GeneralSans-Variable.woff2, astro.config.mjs, src/styles/global.css, src/layouts/BaseLayout.astro |
| 2 | View transitions + Matisse CSS scaffolding | fd3f345 | src/styles/global.css |

## Verification Results

All 11 plan verification criteria passed:

1. `npx astro build` completes without errors — PASS
2. `public/fonts/GeneralSans-Variable.woff2` exists (38KB) — PASS (TYPO-01)
3. `font-weight: 200 700` range declared in @font-face — PASS (TYPO-01)
4. `--weight-display: 200` token in :root — PASS (TYPO-02)
5. `@view-transition` rule present at stylesheet top level — PASS (IXPN-01)
6. No `ClientRouter` or `ViewTransitions` imports anywhere — PASS (IXPN-02)
7. `.matisse-frieze` class defined — PASS
8. `.matisse-shape` class defined — PASS
9. `prefers-reduced-motion: reduce` guard on .matisse-shape — PASS
10. `fontProviders` removed from astro.config.mjs — PASS
11. Manual preload link `rel="preload"` for GeneralSans-Variable.woff2 in BaseLayout.astro — PASS

## Deviations from Plan

None — plan executed exactly as written.

## Known Stubs

| Stub | File | Line | Reason |
|------|------|------|--------|
| .matisse-frieze (empty container) | src/styles/global.css | 660 | Intentional — Phase 15 adds SVG paths and scroll-driven animations |
| .matisse-shape (no SVG path content) | src/styles/global.css | 670 | Intentional — Phase 15 populates with Matisse cut-out shapes |
| --weight-* tokens (defined but not applied) | src/styles/global.css | 80-83 | Intentional — Phase 14 typography rollout applies tokens to elements |

These stubs do not prevent this plan's goal (CSS infrastructure layer). Each has a designated future phase.

## Threat Flags

None — no new network endpoints, auth paths, file access patterns, or schema changes introduced. Font file is one-time downloaded and committed to repo, served from own origin (T-11-01 accepted per threat model).

## Self-Check: PASSED

- `public/fonts/GeneralSans-Variable.woff2` — FOUND
- `bc084a4` commit — FOUND
- `fd3f345` commit — FOUND
- `src/styles/global.css` @font-face — FOUND (line 8)
- `src/styles/global.css` --weight-display — FOUND (line 80)
- `src/styles/global.css` @view-transition — FOUND (line 135)
- `src/styles/global.css` .matisse-frieze — FOUND (line 660)
- `src/layouts/BaseLayout.astro` preload link — FOUND (line 22)
- `astro.config.mjs` fontProviders removed — CONFIRMED
