---
phase: 10-v2-cleanup
plan: 01
subsystem: css-animation
tags: [css-cleanup, animation, requirements-tracking]
dependency_graph:
  requires: []
  provides: [wheel-arc-stagger-animation, dead-css-removal]
  affects: [src/styles/global.css, src/components/FeatureGrid.astro, .planning/REQUIREMENTS.md]
tech_stack:
  added: []
  patterns: [wheel-arc-reveal-keyframe, stagger-data-animate-delay, transform-box-fill-box]
key_files:
  created: []
  modified:
    - src/styles/global.css
    - src/components/FeatureGrid.astro
    - .planning/REQUIREMENTS.md
decisions:
  - "transform-box: fill-box anchors SVG arc scale transforms within each path's bounding box, not the SVG viewport center"
  - "80ms stagger interval chosen for 5 arcs (total cascade 320ms) — perceptible but quick"
metrics:
  duration: 2 minutes
  completed: 2026-05-14
  tasks: 2
  files: 3
---

# Phase 10 Plan 01: Dead CSS Cleanup and Wheel Arc Stagger Animation Summary

Removed 25 lines of orphaned .feature-card CSS from global.css and added stagger cascade animation to click wheel arc segments via existing AnimationController infrastructure (no new JS).

## Tasks Completed

| Task | Name | Commit | Files |
|------|------|--------|-------|
| 1 | Remove dead .feature-card CSS and add wheel-arc-reveal keyframe | 1b3dd35 | src/styles/global.css |
| 2 | Add stagger data-animate to wheel arcs + update REQUIREMENTS.md | 19b635e | src/components/FeatureGrid.astro, .planning/REQUIREMENTS.md |

## Decisions Made

1. **transform-box: fill-box for SVG arc scaling** -- Anchors the scale(0.92) -> scale(1) transform within each arc path's own bounding box rather than the SVG viewport center, ensuring each arc scales from its own center point.
2. **80ms stagger interval** -- 5 arcs cascade at 0/80/160/240/320ms, completing total reveal in ~670ms (320ms delay + 350ms animation). Perceptible cascade without feeling sluggish.

## Changes Made

### Task 1: CSS Cleanup + Keyframe Addition
- Deleted the entire `.feature-card` CSS block (lines 218-242) -- confirmed zero references in any `.astro` file via grep audit
- Preserved `--shadow-card` and `--shadow-card-hover` tokens in `:root` (still used by `.blog-listing-item`)
- Preserved adjacent `.nav-link` block (line 244+) -- no collateral damage
- Added `wheel-arc-reveal` keyframe block with `.js-enabled` gate and `prefers-reduced-motion: no-preference` wrapper
- Ran orphan CSS audit: only `.feature-card` was dead; all other custom classes have live references

### Task 2: FeatureGrid Arc Attributes + Requirements
- Removed `data-animate` and `data-animate-delay="0ms"` from the wheel-container div
- Added `data-animate` and staggered `data-animate-delay` to each of the 5 `<path class="wheel-arc">` elements
- Updated REQUIREMENTS.md: ANIM-03 marked Complete, UIPX-05 marked Superseded (click wheel)
- Added superseded annotation to UIPX-05 checkbox line

## Deviations from Plan

None -- plan executed exactly as written.

## Verification Results

- `grep "feature-card" src/styles/global.css` -- 0 matches (PASS)
- `grep -c "wheel-arc-reveal" src/styles/global.css` -- 2 matches (PASS)
- `grep -c "transform-box: fill-box" src/styles/global.css` -- 2 matches (PASS: 1 in wheel-arc + 1 in existing wheel-segment-content)
- `grep -c "\.nav-link" src/styles/global.css` -- 5 matches (PASS: nav-link block preserved)
- `--shadow-card` and `--shadow-card-hover` tokens present in `:root` (PASS)
- `data-animate` count in FeatureGrid.astro: 5 (one per arc, PASS)
- Container div (`id="feature-wheel"`) has no `data-animate` (PASS)
- ANIM-03 traceability: Complete (PASS)
- UIPX-05 traceability: Superseded (click wheel) (PASS)
- `npm run build` exits 0 (PASS)
