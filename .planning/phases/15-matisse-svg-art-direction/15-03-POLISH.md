---
phase: 15-matisse-svg-art-direction
plan: 03
type: polish
status: complete
started: 2026-05-15T15:09:04Z
completed: 2026-05-15T15:18:49Z
tags: [matisse, hero, frieze, movement, visual-polish]
---

# Phase 15 Plan 03: Movement Frieze Polish

## Trigger

Product-owner feedback after cluster selection:

- Current shapes do not feel polished enough.
- Shapes should read more like abstract human figures resembling dance and movement.
- The horizontal 条带 effect is not obvious enough.
- The whole frieze should move downward, roughly around the middle of the iPhone.

## Scope

- Replace generic aquatic/blob paths with abstract dancer/swimmer-human silhouettes.
- Strengthen the pool-wall band with clearer full-width horizontal presence.
- Recompose and reposition the hero frieze lower behind the iPhone.
- Keep the existing static Astro/CSS architecture, reduced-motion guards, parallax, and cluster-only feature-page treatment.

## Verification

- `npm run build` passed.
- `npx astro check` passed with existing Astro/Zod deprecation hints only.
- `npx tsc --noEmit` passed.
- Source still has no divider treatment.
- Desktop screenshot: `screenshots/swimming-pool/home-movement-polish.png`.
- Mobile screenshot: `screenshots/swimming-pool/home-movement-polish-mobile.png`.
- Visual check confirms the stronger tile strip sits around the iPhone midsection and the shapes now read as abstract movement figures.
