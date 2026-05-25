---
phase: 15-matisse-svg-art-direction
plan: 04
type: polish
status: complete
started: 2026-05-15T15:22:25Z
completed: 2026-05-16T05:07:27Z
tags: [matisse, hero, abstraction, movement, visual-polish]
---

# Phase 15 Plan 04: More Abstract Movement Figures

## Trigger

Product-owner feedback: the human figures should be more abstract and spontaneous, more 跳脱 / 天马行空, with a jazz-like sense of improvisation.

## Scope

- Replace literal head-and-limb silhouettes with looser, single-piece cut-paper movement marks.
- Add syncopated composition: uneven spacing, stronger rotations, abrupt scale shifts, and off-beat figure placement.
- Preserve the stronger horizontal 条带 and lower iPhone-mid placement from Plan 03.
- Keep cluster-only feature-page decoration and existing no-JS/static SVG architecture.

## Verification

- `npm run build` passed.
- `npx astro check` passed with existing Astro/Zod deprecation hints only.
- `npx tsc --noEmit` passed.
- `git diff --check` passed.
- Desktop screenshot: `screenshots/swimming-pool/home-jazz-spontaneous.png`.
- Mobile screenshot: `screenshots/swimming-pool/home-jazz-spontaneous-mobile.png`.
- Browser DOM check on `/`: 10 frieze shapes, 0 dividers, `scrollWidth === clientWidth`.
