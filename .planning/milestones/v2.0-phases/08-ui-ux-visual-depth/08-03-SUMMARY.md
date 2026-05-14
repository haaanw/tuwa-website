---
phase: 08-ui-ux-visual-depth
plan: "03"
subsystem: ui
tags: [astro, animation, counter, intersection-observer, tailwind, blog]

# Dependency graph
requires:
  - phase: 08-01
    provides: global.css with .blog-listing-item shadow-lift class and design tokens

provides:
  - StatsCounter.astro component with three social-proof metrics (1,200+ athletes, 85,000+ sessions, 94% accuracy)
  - AnimationController extended with rAF count-up animation and prefers-reduced-motion guard
  - StatsCounter inserted between FeatureGrid and LandingCTA on landing page
  - Blog listing cards with shadow hover lift via .blog-listing-item class

affects: [08-deployment, 09-deployment]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Counter animation via requestAnimationFrame in existing AnimationController IIFE"
    - "data-counter-target / data-counter-suffix attributes drive JS counter animation"
    - "prefers-reduced-motion checked once at AnimationController init, reused across all counter renders"

key-files:
  created:
    - src/components/StatsCounter.astro
  modified:
    - src/layouts/BaseLayout.astro
    - src/pages/index.astro
    - src/pages/blog/index.astro

key-decisions:
  - "Counter animation fires inside isIntersecting block before observer.unobserve — fires exactly once on scroll-into-view"
  - "reducedMotion variable pre-computed at script init, not re-queried per counter — single matchMedia call"
  - "toLocaleString() for comma formatting (1200 -> 1,200) without manual formatting logic"
  - "Blog card border-top removed from li — shadow from .blog-listing-item serves as visual separator"
  - "duration = 400ms — midpoint of D-12 authorized range (300-500ms)"

patterns-established:
  - "Counter pattern: data-counter-target + data-counter-suffix on span, parent has data-animate, JS reads children inside isIntersecting"

requirements-completed:
  - UIPX-03
  - UIPX-06

# Metrics
duration: 10min
completed: 2026-05-13
---

# Phase 08 Plan 03: StatsCounter + Blog Hover Lift Summary

**rAF count-up counter strip (1,200+ athletes / 85,000+ sessions / 94% accuracy) inserted between features and CTA, with scroll-triggered animation and reduced-motion fallback; blog listing cards get shadow hover lift**

## Performance

- **Duration:** ~10 min
- **Started:** 2026-05-13T19:15:00Z
- **Completed:** 2026-05-13T19:17:00Z
- **Tasks:** 2
- **Files modified:** 4

## Accomplishments
- Created StatsCounter.astro with three social-proof metrics using design tokens and tabular-nums typography
- Extended BaseLayout AnimationController with requestAnimationFrame count-up loop (400ms) that fires on IntersectionObserver scroll-into-view
- prefers-reduced-motion guard pre-sets all counter final values at init (no animation, instant display)
- StatsCounter placed between FeatureGrid and LandingCTA on index.astro (D-11 conversion-critical position)
- Blog listing cards upgraded from inline display:block/text-decoration styles to .blog-listing-item class for shadow hover lift (UIPX-03)

## Task Commits

Each task was committed atomically:

1. **Task 1: Create StatsCounter.astro and extend AnimationController** - `58226e7` (feat)
2. **Task 2: Insert StatsCounter in index.astro and add blog listing hover lift** - `95f2f82` (feat)

**Plan metadata:** (docs commit follows)

## Files Created/Modified
- `src/components/StatsCounter.astro` - Three-metric counter strip, data-animate section, data-counter-target spans
- `src/layouts/BaseLayout.astro` - AnimationController extended with rAF counter logic and prefers-reduced-motion guard
- `src/pages/index.astro` - StatsCounter imported and inserted between FeatureGrid and LandingCTA
- `src/pages/blog/index.astro` - Blog listing anchor changed from inline styles to .blog-listing-item class with padding

## Decisions Made
- Counter animation fires inside the `isIntersecting` block before `observer.unobserve` — ensures it triggers exactly once per scroll-into-view event
- `reducedMotion` computed once at IIFE init rather than per-counter — avoids repeated matchMedia queries
- Blog card `border-top` removed from `<li>` — the shadow from `.blog-listing-item` (from Plan 01 global.css) acts as visual separator between cards, making the border redundant

## Deviations from Plan

None — plan executed exactly as written.

## Issues Encountered

None. The blog collection "does not exist or is empty" warning during build is pre-existing (no blog posts authored yet) and unrelated to this plan.

## Known Stubs

None — counter values are hardcoded social-proof placeholder metrics per D-10, which explicitly grants Claude's Discretion for metric selection. These are intentional placeholder values, not wired data stubs.

## Threat Flags

None — counter JS is read-only DOM manipulation with no user input or new network endpoints.

## User Setup Required

None — no external service configuration required.

## Next Phase Readiness
- Phase 08 complete — all three plans (01: global CSS + micro-interactions + bento grid, 02: spacing + section polish, 03: counter + blog hover) are done
- Ready for Phase 09 deployment to Cloudflare Pages

---
*Phase: 08-ui-ux-visual-depth*
*Completed: 2026-05-13*
