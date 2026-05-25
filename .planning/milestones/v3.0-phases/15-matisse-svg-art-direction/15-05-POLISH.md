---
phase: 15-matisse-svg-art-direction
plan: 05
type: polish
status: complete
started: 2026-05-16T05:25:19Z
completed: 2026-05-16T05:31:25Z
tags: [matisse, hero, rough-edges, hand-drawn, strip, movement]
---

# Phase 15 Plan 05: Rougher Figures and Handmade Strip

## Trigger

Product-owner feedback:

- Human figures should be more varied and flexible.
- Strip should not use an internal grid.
- Strip border should feel less strict and more hand-drawn.
- Human figures should also have rougher, less polished edges.

## Scope

- Replace strict rectangular strip + grid lines with an irregular filled band and uneven top/bottom strokes.
- Remove internal grid/seams from the hero strip.
- Roughen and diversify the abstract movement marks so they feel like flexible paper cutouts rather than smooth vector forms.
- Preserve the lower iPhone-mid placement and cluster-only feature treatment.

## Verification

- `npm run build` passed.
- `npx astro check` passed with existing Astro/Zod deprecation hints only.
- `npx tsc --noEmit` passed.
- `git diff --check` passed.
- Desktop screenshot: `screenshots/swimming-pool/home-handmade-strip.png`.
- Mobile screenshot: `screenshots/swimming-pool/home-handmade-strip-mobile.png`.
- Browser DOM check on `/`: 10 frieze shapes, 1 irregular band path, 2 handmade edge paths, 0 grid/seam paths, 0 dividers, `scrollWidth === clientWidth`.
