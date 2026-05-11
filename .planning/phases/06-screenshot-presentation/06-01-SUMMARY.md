---
phase: "06"
plan: "01"
subsystem: "components/styling"
tags: [device-frame, screenshot, css, astro-image, responsive]
dependency_graph:
  requires: []
  provides: [DeviceFrame.astro, device-frame-css]
  affects: [src/components/DeviceFrame.astro, src/styles/global.css]
tech_stack:
  added: []
  patterns: [css-only-device-frame, astro-image-widths-srcset, responsive-fluid-width]
key_files:
  created:
    - src/components/DeviceFrame.astro
  modified:
    - src/styles/global.css
decisions:
  - "Device frame chrome uses hardcoded #1A1A1A (not a design token) — hardware color, per D-02"
  - "widths prop drives srcset on Image component, no format=webp (Astro 6 auto-generates WebP)"
  - "Side buttons use ::before/::after pseudo-elements on .device-frame class in global.css"
metrics:
  duration: "~2 minutes"
  completed: "2026-05-11T15:42:56Z"
  tasks_completed: 2
  files_created: 1
  files_modified: 1
---

# Phase 6 Plan 1: DeviceFrame Component Summary

CSS-only iPhone 15 Pro device frame component with dynamic island, side buttons via pseudo-elements, and srcset-optimized Image integration.

## Tasks Completed

| Task | Name | Commit | Files |
|------|------|--------|-------|
| 1 | Create DeviceFrame.astro component | 1c66439 | src/components/DeviceFrame.astro |
| 2 | Add device frame pseudo-element CSS to global.css | a7b4513 | src/styles/global.css |

## What Was Built

### DeviceFrame.astro

A new Astro component at `src/components/DeviceFrame.astro` that renders a CSS-only iPhone 15 Pro bezel:

- **Props:** `src?: ImageMetadata`, `alt: string`, `placeholderLabel?`, `loading?`, `fetchpriority?`, `widths?`, `class?`
- **Frame chrome:** Near-black `#1A1A1A` body with `border-radius: 44px`, inset metal reflection sheen, and premium depth shadow
- **Dynamic Island:** Absolute-positioned `#0D0D0D` pill (120x34px), `aria-hidden`
- **Screen area:** `border-radius: 36px`, `overflow: hidden` (prevents screenshot bleed), `aspect-ratio: 9 / 19.5`
- **Image branch:** Uses `widths={widths}` + `sizes` for responsive srcset — no fixed `width` or `format="webp"` (Astro 6 auto-generates WebP)
- **Placeholder branch:** Gradient `#E4E0DB → #CFCBC5`, "Coming soon" in label size (13px), uppercase, `--color-text-3`, `role="img"` + `aria-label`
- **Home indicator:** 120x5px white pill at bottom
- **Responsive width:** `max-w-[260px] sm:max-w-[300px] lg:max-w-[320px]` on outer wrapper

### global.css additions

Appended `.device-frame::before` and `.device-frame::after` pseudo-element rules:

- `::before` — volume buttons on left side (`left: -4px; top: 80px; width: 4px; height: 28px`), `box-shadow: 0 34px 0 #1A1A1A` creates second volume button
- `::after` — power button on right side (`right: -4px; top: 100px; width: 4px; height: 42px`), `border-right: 2px solid #2A2A2A` for depth suggestion

## Deviations from Plan

None — plan executed exactly as written.

## Known Stubs

None. DeviceFrame renders with real Image content or gradient placeholder — no hardcoded empty values.

## Threat Flags

None — no new network endpoints, auth paths, file access patterns, or schema changes introduced. Component is purely presentational build-time render.

## Verification

- `src/components/DeviceFrame.astro` exists (108 lines, > 50 minimum)
- All acceptance criteria verified:
  - `interface Props` with all specified props
  - `import { Image } from 'astro:assets'`
  - `widths={widths}` on Image (not `width={320}`)
  - `sizes="(min-width: 1024px) 320px..."` on Image
  - `class="device-frame"` on frame body
  - `background-color: #1A1A1A` on frame body
  - `border-radius: 44px` (outer), `border-radius: 36px` (inner screen)
  - `overflow: hidden` on screen area
  - `aspect-ratio: 9 / 19.5` on screen area
  - `aria-hidden="true"` on dynamic island
  - Dynamic island 120x34px
  - `role="img"` on placeholder
  - `linear-gradient` in placeholder background
  - `max-w-[260px] sm:max-w-[300px] lg:max-w-[320px]` on wrapper
  - No `format="webp"`, `quality={90}`, or `width={320}`
- `global.css` has `.device-frame::before` and `.device-frame::after` rules
- `npx astro build` completed successfully (10 pages, no errors)
- DeviceFrame not yet imported anywhere — Plan 02 handles the swap

## Self-Check: PASSED

- [x] src/components/DeviceFrame.astro exists
- [x] src/styles/global.css contains .device-frame::before and ::after
- [x] Commit 1c66439 exists (feat(06-01): create CSS-only iPhone 15 Pro DeviceFrame.astro)
- [x] Commit a7b4513 exists (feat(06-01): add device-frame pseudo-element CSS to global.css)
- [x] Build passes — `astro build` completed in 1.44s, 10 pages built
