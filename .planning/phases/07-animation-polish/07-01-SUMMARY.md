---
phase: 07-animation-polish
plan: 01
subsystem: animation
tags: [animation, stagger, hero, css-keyframes, intersection-observer]
dependency_graph:
  requires: []
  provides: [ANIM-03, ANIM-04]
  affects: [src/layouts/BaseLayout.astro, src/components/FeatureGrid.astro, src/styles/global.css, src/components/Hero.astro]
tech_stack:
  added: []
  patterns: [CSS keyframes with fill-mode:both, data-attribute-driven stagger via JS, prefers-reduced-motion guard]
key_files:
  created: []
  modified:
    - src/layouts/BaseLayout.astro
    - src/components/FeatureGrid.astro
    - src/styles/global.css
    - src/components/Hero.astro
decisions:
  - "Hero perspective tilt moved from inline style into keyframe both/from/to states — avoids transform conflict with animation"
  - "fill-mode: both chosen over forwards to prevent FOUC before 350ms device delay fires"
  - "Hero uses CSS-only animation (no .js-enabled gate) so it works without JS and does not wait for scroll"
  - "data-animate-delay read via JS getAttribute and applied as el.style.animationDelay — CSS attr() with type hints not cross-browser as of May 2026"
metrics:
  duration: "~4 minutes"
  completed_date: "2026-05-12T13:59:51Z"
  tasks_completed: 2
  tasks_total: 3
  files_modified: 4
---

# Phase 07 Plan 01: Stagger + Hero Entrance Animation Summary

**One-liner:** CSS keyframe hero choreography (headline→subtitle→device at 0/150/350ms) with JS-driven 100ms stagger cascade on FeatureGrid cards via data-animate-delay attributes.

## Tasks Completed

| Task | Name | Commit | Files |
|------|------|--------|-------|
| 1 | ANIM-03: Extend AnimationController + FeatureGrid stagger markup | 74b5d21 | BaseLayout.astro, FeatureGrid.astro |
| 2 | ANIM-04: Hero entrance keyframes + animation classes | 2a0d8ea | global.css, Hero.astro |

## Task 3 — Checkpoint (Human Verify: APPROVED)

Task 3 was a `checkpoint:human-verify` gate. User visually confirmed stagger and hero entrance animations are correct and approved.

## What Was Built

### ANIM-03: FeatureGrid Stagger (Task 1)

- `AnimationController` in `BaseLayout.astro` extended to read `data-animate-delay` attribute and set `el.style.animationDelay` before observing — uses ES5 `var`/`function` per project convention
- `data-animate` removed from `<section>` in `FeatureGrid.astro` (was animating the whole section as one unit)
- Per-card `data-animate` + `data-animate-delay` added to all 5 `<li>` elements: 0ms, 100ms, 200ms, 300ms, 400ms
- Card 5 preserves `md:col-start-2` class alongside new animate attributes

### ANIM-04: Hero Entrance Choreography (Task 2)

- New `@keyframes hero-device-enter` in `global.css` with compound transform: `perspective(1600px) rotateY(-2deg) rotateX(1deg) translateY(20px) scale(0.96)` → `translateY(0) scale(1)` — perspective tilt persists in both `from` and `to` states
- `.hero-headline`: `fade-up 400ms ease-out 0ms both`
- `.hero-subtitle`: `fade-up 400ms ease-out 150ms both`
- `.hero-device`: `hero-device-enter 500ms ease-out 350ms both`
- `fill-mode: both` prevents FOUC — elements start at `from` state before animation delay fires
- Inline `transform: perspective(...)` removed from device wrapper div — conflict resolved by absorbing tilt into keyframe
- `class="hero-headline"`, `class="hero-subtitle mx-auto"`, `class="hero-device relative mx-auto"` added to Hero.astro elements
- No `.js-enabled` gate — hero animates via CSS regardless of JS state
- Entire block wrapped in `@media (prefers-reduced-motion: no-preference)`

## Decisions Made

| Decision | Rationale |
|----------|-----------|
| Inline transform removed from device wrapper | CSS animation and inline transform conflict — browser composites inline transform on top of keyframe, breaking perspective during animation |
| `fill-mode: both` not `forwards` | Device has 350ms delay; without `both`, device flashes at full opacity then jumps to `from` state at 350ms — `both` holds `from` until animation starts |
| No `.js-enabled` gate on hero | Hero should animate on load for all users; JS-gate is for scroll-reveal elements only |
| `el.style.animationDelay` set before `observe()` | Delay must be applied before IntersectionObserver fires or the first card would animate without delay |

## Deviations from Plan

None — plan executed exactly as written.

## Known Stubs

None — all animation wiring is fully implemented.

## Threat Flags

None — no new trust boundaries. CSS keyframes and a DOM attribute read introduce no security surface.

## Self-Check

- [x] `BaseLayout.astro` contains `el.getAttribute('data-animate-delay')` — verified via grep
- [x] `FeatureGrid.astro` contains exactly 5 `data-animate-delay` attributes — verified via grep count
- [x] `global.css` contains `@keyframes hero-device-enter` — verified via grep
- [x] `Hero.astro` contains `hero-headline`, `hero-subtitle`, `hero-device` classes — verified via grep
- [x] `Hero.astro` has NO inline `transform: perspective(...)` — verified via grep (no match)
- [x] `Hero.astro` has NO `data-animate` attributes — verified via grep (no match)
- [x] `npm run build` exits 0 — confirmed both after Task 1 and Task 2
- [x] Commits exist: 74b5d21 (Task 1), 2a0d8ea (Task 2)

## Self-Check: PASSED
