---
phase: 16-interaction-polish
plan: 02
subsystem: interaction-scroll-magnetic
tags: [lenis, momentum-scroll, magnetic-cta, accessibility, interaction-design]
dependency_graph:
  requires: [16-01]
  provides: [lenis-momentum-scroll, magnetic-cta-effect]
  affects: [all-pages-via-BaseLayout]
tech_stack:
  added: [lenis@1.3.23]
  patterns: [module-script-esm, touch-detection-pointer-coarse, reduced-motion-guard]
key_files:
  created: []
  modified: [src/layouts/BaseLayout.astro, package.json]
decisions:
  - "D-02: Direct lenis package, not astro-lenis wrapper"
  - "D-03: Touch devices get native scroll via pointer:coarse detection"
  - "D-04: 14px max magnetic shift (middle of 10-16px range)"
  - "D-06: Magnetic effect disabled on touch and reduced-motion"
metrics:
  duration: 90s
  completed: "2026-05-16T08:41:48Z"
  tasks_completed: 2
  tasks_total: 2
  files_modified: 2
---

# Phase 16 Plan 02: Lenis Momentum Scroll + Magnetic CTA Summary

Lenis momentum scroll with anchor offset and magnetic CTA hover pull, both guarded by touch/reduced-motion detection in BaseLayout module scripts.

## Task Results

| Task | Name | Commit | Status |
|------|------|--------|--------|
| 1 | Install Lenis and integrate momentum scroll | 691e2c3 | Done |
| 2 | Add magnetic CTA effect script | 8e16131 | Done |

## What Was Built

### Lenis Momentum Scroll (Task 1)
- Installed `lenis@1.3.23` as project dependency
- Added ESM module `<script>` in BaseLayout.astro (after existing inline IO script)
- Lenis configured with `autoRaf: true`, `lerp: 0.1` for smooth desktop momentum
- Anchor navigation offset set to 64px to clear sticky header
- Disabled on touch devices (`pointer: coarse`) and `prefers-reduced-motion: reduce`
- Exposed `window.__lenis` for programmatic scroll access

### Magnetic CTA Effect (Task 2)
- Added second module `<script>` targeting all `.btn-cta` elements
- 150px activation radius, 14px maximum shift toward cursor
- Transform includes `scale(1.02)` to match CSS hover state
- Per-button `mousemove` listener for efficient sparse-button handling
- `mouseleave` clears inline transform; CSS transition (300ms ease-interactive from Plan 01) handles smooth return
- Document-level `mouseleave` fallback for fast viewport exits
- Disabled on touch devices and reduced-motion

## Decisions Made

1. **Direct lenis package (D-02):** Used `lenis` directly, not `astro-lenis` wrapper -- simpler, fewer dependencies, full control
2. **Touch detection via pointer:coarse (D-03):** Reliable media query, no UA sniffing needed
3. **14px magnetic strength (D-04):** Middle of recommended 10-16px range -- noticeable but not jarring
4. **No scroll-behavior: smooth in CSS:** Lenis handles anchor scrolling; CSS smooth-scroll would conflict (Pitfall 4)

## Deviations from Plan

None -- plan executed exactly as written.

## Known Stubs

None.

## Self-Check: PASSED
