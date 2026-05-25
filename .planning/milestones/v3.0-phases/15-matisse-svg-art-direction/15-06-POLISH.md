---
phase: 15-matisse-svg-art-direction
plan: 06
type: polish
status: complete
started: 2026-05-16T05:43:40Z
completed: 2026-05-16T05:46:36Z
tags: [matisse, hero, strip, no-border, visual-polish]
---

# Phase 15 Plan 06: Borderless Handmade Strip

## Trigger

Product-owner feedback: the dashed/hand-drawn line direction is nice, but the 条带 should not feel like it has a border.

## Scope

- Remove the top/bottom border paths from the hero strip.
- Keep the irregular filled band and rough abstract movement figures.
- Preserve the lower iPhone-mid placement and no-grid treatment.

## Verification

- `npm run build` passed.
- `npx astro check` passed with existing Astro/Zod deprecation hints only.
- `npx tsc --noEmit` passed.
- Desktop screenshot: `screenshots/swimming-pool/home-borderless-strip.png`.
- Mobile screenshot: `screenshots/swimming-pool/home-borderless-strip-mobile.png`.
- Browser DOM check on `/`: 10 frieze shapes, 1 irregular band path, 0 strip edge/border paths, 0 grid/seam paths, 0 dividers, `scrollWidth === clientWidth`.
