---
phase: 15-matisse-svg-art-direction
plan: 01
subsystem: ui
tags: [svg, css-animations, scroll-driven-animations, matisse, biomorphic-shapes, astro-components]

# Dependency graph
requires:
  - phase: 11-css-foundation-token-system
    provides: ".matisse-frieze and .matisse-shape CSS stubs with GPU pre-promotion and reduced-motion guard"
provides:
  - "7 SVGO-optimized biomorphic blob SVG path strings"
  - "MatisseShape.astro reusable single-shape component"
  - "MatisseFrieze.astro hero background frieze with 7 shapes"
  - "MatisseDecoration.astro feature page decorator (cluster + divider)"
  - "Matisse color tokens (green, terracotta, gold) in global.css"
  - "CSS entrance animation keyframes for hero and feature page shapes"
  - "CSS scroll-driven parallax via @supports(animation-timeline: scroll())"
affects: [15-02-PLAN, hero-integration, feature-page-decoration]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Catmull-Rom-to-cubic-Bezier blob generation algorithm"
    - "Dual CSS animation-name pattern for entrance + parallax stacking"
    - "Progressive enhancement parallax via @supports(animation-timeline: scroll())"

key-files:
  created:
    - scripts/generate-blobs.mjs
    - scripts/blobs-raw.svg
    - scripts/blobs-optimized.svg
    - scripts/svgo.config.mjs
    - src/components/MatisseShape.astro
    - src/components/MatisseFrieze.astro
    - src/components/MatisseDecoration.astro
  modified:
    - src/styles/global.css

key-decisions:
  - "Hardcoded SVGO-optimized path data in MatisseShape.astro rather than reading from files at build time"
  - "Used dual animation-name CSS pattern to stack entrance + parallax without conflict"
  - "Feature page shapes use accent green only at 15-25% opacity per D-13"

patterns-established:
  - "MatisseShape component: shapeId-based path lookup with transform/parallax/delay props"
  - "Matisse color tokens: --color-matisse-green, --color-matisse-terracotta, --color-matisse-gold"
  - "Parallax CSS wrapped in @supports(animation-timeline: scroll()) for progressive enhancement"

requirements-completed: [ART-01, ART-03, ART-05, ART-06]

# Metrics
duration: 4min
completed: 2026-05-15
---

# Phase 15 Plan 01: Matisse SVG Shape Vocabulary Summary

**7 biomorphic blob shapes generated via Catmull-Rom algorithm, SVGO-optimized, and composed into MatisseShape/MatisseFrieze/MatisseDecoration Astro components with CSS entrance animations and scroll-driven parallax**

## Performance

- **Duration:** 4 min
- **Started:** 2026-05-15T12:33:58Z
- **Completed:** 2026-05-15T12:37:37Z
- **Tasks:** 3
- **Files modified:** 8

## Accomplishments
- Generated 7 distinct biomorphic blob SVG paths using Catmull-Rom-to-Bezier algorithm, SVGO-optimized to ~1.4KB total
- Created MatisseShape (single path), MatisseFrieze (hero strip with 7 shapes), and MatisseDecoration (cluster/divider for feature pages) Astro components
- Extended global.css with Matisse color tokens, entrance animation keyframes, parallax CSS in @supports, and reduced-motion guards

## Task Commits

Each task was committed atomically:

1. **Task 1: Generate blob shapes and create MatisseShape component** - `8246e65` (feat)
2. **Task 2: Create MatisseFrieze and MatisseDecoration components** - `9d9580a` (feat)
3. **Task 3: Extend global.css with Matisse color tokens, animations, and parallax** - `f2916aa` (feat)

## Files Created/Modified
- `scripts/generate-blobs.mjs` - One-time Catmull-Rom blob generation script (7 shapes, seeded pseudo-random)
- `scripts/svgo.config.mjs` - SVGO optimization config (floatPrecision: 1)
- `scripts/blobs-raw.svg` - Raw generated SVG with 7 blob paths
- `scripts/blobs-optimized.svg` - SVGO-optimized output (50.5% reduction)
- `src/components/MatisseShape.astro` - Single SVG path component with shapeId lookup, parallax data attributes
- `src/components/MatisseFrieze.astro` - Hero frieze: 7 shapes at varied transforms/opacities with staggered entrance
- `src/components/MatisseDecoration.astro` - Feature page decorator: cluster (absolute-positioned corner) or divider (full-width band)
- `src/styles/global.css` - Added 3 Matisse color tokens, entrance keyframes, parallax CSS, reduced-motion overrides

## Decisions Made
- Hardcoded SVGO-optimized path data directly in MatisseShape.astro (no runtime generation, no file reads at build time)
- Used dual `animation-name` CSS pattern with separate `animation-timeline` values to stack entrance + parallax without conflict
- Feature page shapes restricted to accent green #2B5240 only at 15-25% opacity per D-13

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered
- SVGO CLI invocation required a config file (scripts/svgo.config.mjs) instead of inline JSON config due to npm argument parsing. Resolved by creating the config file.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness
- All shape vocabulary and CSS infrastructure ready for Plan 02 integration into Hero.astro and feature pages
- MatisseFrieze can be imported directly into Hero.astro with `position: relative` on the parent section
- MatisseDecoration can be placed in FeaturePageLayout.astro with `data-animate` for IO-triggered entrance

---
*Phase: 15-matisse-svg-art-direction*
*Completed: 2026-05-15*
