---
phase: 12-device-frame-realism
plan: 01
subsystem: css-components
tags: [device-frame, css, shadows, dynamic-island, realism]
dependency_graph:
  requires: []
  provides: [device-frame-css-classes, device-frame-migration]
  affects: [Hero.astro, FeaturePageLayout.astro, CoachingPageLayout.astro]
tech_stack:
  added: []
  patterns: [css-box-shadow-stacking, css-aspect-ratio, inline-to-class-migration]
key_files:
  created: []
  modified:
    - src/styles/global.css
    - src/components/DeviceFrame.astro
decisions:
  - "Device frame shadows defined directly on .device-frame, not as :root tokens -- one-off values, not reused"
  - "Dynamic Island uses width: 32% + aspect-ratio: 2.7 for proportional scaling at all 3 breakpoints"
  - "aspect-ratio corrected from 393/852 to 402/874 to match actual iPhone 16 Pro screenshot dimensions"
metrics:
  duration: ~4min
  completed_date: "2026-05-15"
  tasks_completed: 2
  tasks_total: 3
  files_modified: 2
---

# Phase 12 Plan 01: Device Frame CSS Realism Summary

**One-liner:** 4-layer graduated shadow, proportional Dynamic Island (32% width), 3 left-side buttons via box-shadow stacking, corrected 402/874 aspect ratio, and screen inset shadow -- all migrated from inline styles to CSS classes.

## Tasks Completed

| Task | Name | Commit | Files |
|------|------|--------|-------|
| 1 | Add device frame CSS classes to global.css | fd477c3 | src/styles/global.css |
| 2 | Migrate DeviceFrame.astro inline styles to CSS classes | b7517df | src/components/DeviceFrame.astro |

## Task 3 -- Pending Human Verification

Task 3 is a `checkpoint:human-verify` gate. Visual verification of device frame realism is required before the plan can be marked complete. See checkpoint details below.

## What Was Built

**Task 1 -- global.css changes:**
- Replaced the old 3-line `.device-frame` block (just `position: relative`) with a full bezel definition including background gradient, border, border-radius 50px, padding, and 6-value box-shadow (4 external graduated layers + 2 inset edge highlights)
- Updated `.device-frame::before` to render 3 left-side buttons: action button at `top: 80px` (height 24px), volume up at `+30px` offset, volume down at `+66px` offset -- all from a single pseudo-element via box-shadow stacking
- Added `.device-island`: proportional Dynamic Island pill using `width: 32%` and `aspect-ratio: 2.7` so it scales automatically at 260/300/320px frame widths
- Added `.device-screen`: corrects `aspect-ratio` from `393 / 852` (iPhone 15 Pro) to `402 / 874` (iPhone 16 Pro, matching actual screenshots) plus inset shadow for screen depth effect
- Added `.device-home-indicator`: home pill with `width: 100px`, `height: 4px`, semi-transparent white

**Task 2 -- DeviceFrame.astro migration:**
- Removed `style="..."` from frame body div (all visual properties now in `.device-frame`)
- Replaced Dynamic Island `<div style="...">` with `<div class="device-island" aria-hidden="true">`
- Replaced screen area `<div style="...">` with `<div class="device-screen">`
- Replaced home indicator `<div style="...">` with `<div class="device-home-indicator" aria-hidden="true">`
- Updated HTML comment from "CSS-only iPhone 15 Pro Space Black bezel" to "CSS device frame (Phase 12)"
- Props interface unchanged -- zero caller impact on Hero.astro, FeaturePageLayout.astro, CoachingPageLayout.astro

## Deviations from Plan

None -- plan executed exactly as written.

## Known Stubs

None. All device frame CSS classes are fully implemented. No placeholder values.

## Threat Flags

None. All changes are purely decorative CSS on existing static content. No new network endpoints, auth paths, or data handling introduced.

## Self-Check

### Files Exist

- [x] src/styles/global.css -- modified (contains .device-island, .device-screen, .device-home-indicator)
- [x] src/components/DeviceFrame.astro -- modified (uses CSS classes, 2 inline styles remain)

### Commits Exist

- [x] fd477c3 -- Task 1 (global.css)
- [x] b7517df -- Task 2 (DeviceFrame.astro)

### Build

- [x] `npx astro build` completes without errors after both tasks

## Self-Check: PASSED
