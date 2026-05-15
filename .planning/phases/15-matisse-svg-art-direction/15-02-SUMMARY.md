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
  - "FeaturePageLayout.astro with both cluster and divider MatisseDecoration approaches"
  - "CoachingPageLayout.astro with matching decoration (deviation from plan)"
  - "Per-page unique shapeId assignment across all 5 feature pages"
affects: [hero-section, feature-pages, visual-identity]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "position: relative on parent + z-index: 1 on content for SVG background layering"
    - "Dual decoration approach rendering for visual A/B comparison"

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
  - "Rendered both cluster and divider approaches simultaneously per D-09 for user visual comparison"

patterns-established:
  - "shapeId prop pattern: layouts accept optional shapeId, feature pages pass unique blob ID"

requirements-completed: [ART-02, ART-04]

# Metrics
duration: 3min
completed: 2026-05-15
---

# Phase 15 Plan 02: Matisse Shape Integration into Pages Summary

**MatisseFrieze wired into Hero.astro as absolute-positioned background layer; MatisseDecoration added to both feature page layouts with cluster + divider approaches rendered simultaneously for visual comparison; each of 5 feature pages assigned a unique blob shape**

## Performance

- **Duration:** 3 min
- **Started:** 2026-05-15T12:41:16Z
- **Completed:** 2026-05-15T12:44:15Z
- **Tasks completed:** 2 of 3 (Task 3 is a human-verify checkpoint)
- **Files modified:** 8

## Accomplishments
- Integrated MatisseFrieze into Hero.astro with proper z-index stacking so headline, device frame, and badge remain readable above the frieze
- Added MatisseDecoration to FeaturePageLayout.astro with both "cluster" (corner of hero section) and "divider" (between screenshot and content) approaches for visual comparison
- Extended both FeaturePageLayout and CoachingPageLayout with shapeId prop and decoration components
- Assigned unique shapes: coaching=blob-1, cold-start=blob-2, recovery-scoring=blob-3, smart-templates=blob-4, workload-tracking=blob-5

## Task Commits

Each task was committed atomically:

1. **Task 1: Integrate MatisseFrieze into Hero.astro** - `8a1192b` (feat)
2. **Task 2: Add MatisseDecoration to feature page layouts with per-page shapes** - `52a8c42` (feat)
3. **Task 3: Visual verification of Matisse art direction** - AWAITING HUMAN VERIFICATION

## Checkpoint: Task 3

Task 3 is a `checkpoint:human-verify` gate. The user needs to:

1. Run `npm run dev` and visit http://localhost:4321
2. Verify the hero frieze (organic shapes behind headline and device frame)
3. Verify feature page decorations at /features/coaching and other feature pages
4. Check both decoration approaches are visible (cluster in hero corner, divider between sections)
5. Decide which approach to keep: (A) Cluster, (B) Divider, or (C) Neither
6. Verify reduced motion behavior and DOM budget via Lighthouse

## Files Modified

- `src/components/Hero.astro` - Added MatisseFrieze import, position: relative on section, z-index: 1 on content div, MatisseFrieze component as first child
- `src/layouts/FeaturePageLayout.astro` - Added MatisseDecoration import, shapeId prop, cluster in hero section, divider between screenshot and slot
- `src/layouts/CoachingPageLayout.astro` - Same changes as FeaturePageLayout (coaching uses separate layout)
- `src/pages/features/coaching.astro` - Added shapeId="blob-1"
- `src/pages/features/cold-start.astro` - Added shapeId="blob-2"
- `src/pages/features/recovery-scoring.astro` - Added shapeId="blob-3"
- `src/pages/features/smart-templates.astro` - Added shapeId="blob-4"
- `src/pages/features/workload-tracking.astro` - Added shapeId="blob-5"

## Decisions Made
- Applied MatisseDecoration to CoachingPageLayout in addition to FeaturePageLayout, since coaching.astro imports from a separate layout file
- Rendered both cluster and divider decoration approaches simultaneously per D-09 so user can visually compare and choose

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] CoachingPageLayout requires same changes as FeaturePageLayout**
- **Found during:** Task 2
- **Issue:** Plan assumed all 5 feature pages use FeaturePageLayout, but coaching.astro imports CoachingPageLayout (a separate but structurally identical layout)
- **Fix:** Applied identical MatisseDecoration changes to CoachingPageLayout.astro
- **Files modified:** src/layouts/CoachingPageLayout.astro
- **Commit:** 52a8c42

## Issues Encountered
- None beyond the CoachingPageLayout deviation above.

## User Setup Required

None - no external service configuration required.

## Known Stubs

None - all components are fully wired with real data from Plan 01.

## Next Steps
- Awaiting user visual verification (Task 3 checkpoint)
- User will select preferred decoration approach (cluster vs divider)
- Selected approach will be kept; other removed in a follow-up plan or continuation

---
*Phase: 15-matisse-svg-art-direction*
*Completed: 2026-05-15 (Tasks 1-2; Task 3 awaiting verification)*
