---
phase: 15-matisse-svg-art-direction
plan: 02
subsystem: ui
tags: [matisse, svg, hero-integration, feature-pages, parallax, decoration]

# Dependency graph
requires:
  - phase: 15-matisse-svg-art-direction
    plan: 01
    provides: "MatisseFrieze, MatisseDecoration, MatisseShape components and CSS infrastructure"
provides:
  - "Hero.astro with MatisseFrieze background layer behind all content"
  - "FeaturePageLayout.astro with selected cluster MatisseDecoration approach"
  - "CoachingPageLayout.astro with matching decoration (deviation from plan)"
  - "Per-page unique shapeId assignment across all 5 feature pages"
affects: [hero-section, feature-pages, visual-identity]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "position: relative on parent + z-index: 1 on content for SVG background layering"
    - "Cluster-only feature hero decoration after product-owner checkpoint"

key-files:
  created: []
  modified:
    - src/components/Hero.astro
    - src/layouts/FeaturePageLayout.astro
    - src/layouts/CoachingPageLayout.astro
    - src/pages/features/coaching.astro
    - src/pages/features/cold-start.astro
    - src/pages/features/recovery-scoring.astro
    - src/pages/features/smart-templates.astro
    - src/pages/features/workload-tracking.astro

key-decisions:
  - "Applied MatisseDecoration to CoachingPageLayout alongside FeaturePageLayout since coaching.astro uses a separate layout"
  - "Rendered both cluster and divider approaches temporarily per D-09 for visual comparison"
  - "Product owner selected cluster; divider treatment removed"

patterns-established:
  - "shapeId prop pattern: layouts accept optional shapeId, feature pages pass unique blob ID"

requirements-completed: [ART-02, ART-04]

# Metrics
duration: 3min
completed: 2026-05-15
---

# Phase 15 Plan 02: Matisse Shape Integration into Pages Summary

**MatisseFrieze wired into Hero.astro as absolute-positioned background layer; MatisseDecoration added to both feature page layouts as the selected cluster treatment; each of 5 feature pages assigned a unique blob shape**

## Performance

- **Duration:** 3 min
- **Started:** 2026-05-15T12:41:16Z
- **Completed:** 2026-05-15T12:44:15Z
- **Tasks completed:** 3 of 3
- **Files modified:** 8

## Accomplishments
- Integrated MatisseFrieze into Hero.astro with proper z-index stacking so headline, device frame, and badge remain readable above the frieze
- Added MatisseDecoration to FeaturePageLayout.astro as the selected "cluster" treatment in the feature hero corner
- Extended both FeaturePageLayout and CoachingPageLayout with shapeId prop and decoration components
- Assigned unique shapes: coaching=blob-1, cold-start=blob-2, recovery-scoring=blob-3, smart-templates=blob-4, workload-tracking=blob-5

## Task Commits

Each task was committed atomically:

1. **Task 1: Integrate MatisseFrieze into Hero.astro** - `8a1192b` (feat)
2. **Task 2: Add MatisseDecoration to feature page layouts with per-page shapes** - `52a8c42` (feat)
3. **Task 3: Visual verification of Matisse art direction** - completed after product owner selected cluster

## Checkpoint: Task 3

Task 3 visual verification was completed on 2026-05-15T14:04:28Z using local dev server + headless Chrome screenshots.

Verified:

1. Hero frieze renders behind the headline/subtitle/device and keeps content readable.
2. Hero frieze contains 7 shapes with accent green plus visible terracotta/gold accents.
3. Feature pages render the selected cluster decoration in the hero corner, with the divider treatment removed.
4. Feature decorations use lighter 15-22% fill opacity.
5. Feature pages pass unique shape IDs per D-10.
6. Build, Astro check, and TypeScript checks pass.

Product-owner preference resolved:

- Selected **A: Cluster**.
- Removed the divider treatment from both feature layouts.

## Files Modified

- `src/components/Hero.astro` - Added MatisseFrieze import, position: relative on section, z-index: 1 on content div, MatisseFrieze component as first child
- `src/layouts/FeaturePageLayout.astro` - Added MatisseDecoration import, shapeId prop, selected cluster in hero section
- `src/layouts/CoachingPageLayout.astro` - Same selected cluster treatment as FeaturePageLayout (coaching uses separate layout)
- `src/pages/features/coaching.astro` - Added shapeId="blob-1"
- `src/pages/features/cold-start.astro` - Added shapeId="blob-2"
- `src/pages/features/recovery-scoring.astro` - Added shapeId="blob-3"
- `src/pages/features/smart-templates.astro` - Added shapeId="blob-4"
- `src/pages/features/workload-tracking.astro` - Added shapeId="blob-5"

## Decisions Made
- Applied MatisseDecoration to CoachingPageLayout in addition to FeaturePageLayout, since coaching.astro imports from a separate layout file
- Rendered both cluster and divider decoration approaches temporarily per D-09 so user could visually compare and choose
- Kept cluster and removed divider after product-owner selection

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] CoachingPageLayout requires same changes as FeaturePageLayout**
- **Found during:** Task 2
- **Issue:** Plan assumed all 5 feature pages use FeaturePageLayout, but coaching.astro imports CoachingPageLayout (a separate but structurally identical layout)
- **Fix:** Applied identical MatisseDecoration changes to CoachingPageLayout.astro
- **Files modified:** src/layouts/CoachingPageLayout.astro
- **Commit:** 52a8c42

## Issues Encountered
- Product feedback: the first implementation was too generic and did not specifically reference Henri Matisse's *The Swimming Pool*. Corrected by replacing round blob paths with original blue aquatic cut-paper forms, adding a pale pool-wall frieze band, removing warm accent colors, and updating feature decorations to use matching blue fragments.
- `npx astro check` initially failed because root `vite@6.4.2` conflicted with Astro 6.3.1's nested `vite@7.3.3` types. Resolved by aligning root Vite to `^7.3.3`.
- The global `.matisse-shape { fill: currentColor; }` rule flattened terracotta/gold fills back to accent green. Resolved by removing the fill override and relying on component-level `fill` attributes.
- Shape entrance opacity initially overrode low decorative alpha values. Resolved by using SVG `fill-opacity` for decorative alpha and reserving CSS `opacity` for fade-in.
- The hero frieze initially sat too low. Resolved by moving the band upward and tuning opacity/scale so it reads behind the subtitle and device frame.

## User Setup Required

None - no external service configuration required.

## Known Stubs

None - all components are fully wired with real data from Plan 01.

## Next Steps
- Phase 15 is complete.
- Next action: plan Phase 16 after deciding whether to use Lenis momentum scrolling or native scroll.

---
*Phase: 15-matisse-svg-art-direction*
*Completed: 2026-05-15*
