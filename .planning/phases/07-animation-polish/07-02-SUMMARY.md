---
phase: 07-animation-polish
plan: 02
subsystem: animation
tags: [animation, sticky-scroll, intersection-observer, device-frame, step-indicators]
dependency_graph:
  requires: [07-01]
  provides: [ANIM-05]
  affects: [src/pages/features/recovery-scoring.astro, src/styles/global.css]
tech_stack:
  added: []
  patterns: [CSS Grid two-column sticky layout, page-scoped IntersectionObserver IIFE, step dot indicator pattern]
key_files:
  created: []
  modified:
    - src/styles/global.css
    - src/pages/features/recovery-scoring.astro
decisions:
  - "Sticky showcase CSS placed in global.css (not scoped <style>) so .sticky-showcase, .device-sticky-wrapper, .step-dot are available globally for future pages"
  - "StickyScrollController uses threshold: 0.5 vs global AnimationController threshold: 0.15 — higher threshold ensures step activates at visual midpoint, not entry edge"
  - "No unobserve() in StickyScrollController — continuous bi-directional scroll observation required for step indicator accuracy as user scrolls back up"
  - "data-animate removed from both sections — prevents conflict between global AnimationController (0.15 threshold) and StickyScrollController (0.5 threshold)"
  - "ES5 var/function in StickyScrollController — matches AnimationController convention from 05-PATTERNS.md, consistent with project pattern"
  - "aria-hidden on dot container — dots are purely decorative progress indicators, not semantic navigation"
metrics:
  duration: "~2 minutes"
  completed_date: "2026-05-12T14:19:11Z"
  tasks_completed: 2
  tasks_total: 3
  files_modified: 2
---

# Phase 07 Plan 02: Sticky Scroll Showcase (ANIM-05) Summary

**One-liner:** Oura-style two-column sticky scroll showcase on Recovery Scoring page — device frame pinned left while 3 text steps scroll right, with step-dot indicators toggled by a page-scoped IntersectionObserver at threshold 0.5.

## Tasks Completed

| Task | Name | Commit | Files |
|------|------|--------|-------|
| 1 | Add sticky scroll CSS to global.css | 0589cd6 | src/styles/global.css |
| 2 | Restructure recovery-scoring.astro into sticky scroll showcase | 4bbd34e | src/pages/features/recovery-scoring.astro |

## Task 3 — Checkpoint (Human Verify: APPROVED)

Task 3 was a `checkpoint:human-verify` gate. User approved the sticky scroll showcase layout, step indicators, mobile collapse, and science section on 2026-05-12.

## What Was Built

### Task 1: Sticky Scroll CSS (global.css)

- `.step-dot` — 6px circle, `--color-text-3` (#AFABA5) inactive, 200ms ease-out transition
- `.step-dot.is-active` — `--color-accent` (#2B5240) active state
- `.sticky-showcase` — two-column CSS Grid (1fr 1fr), `--space-3xl` (64px) gap, max-width 1152px centered, `align-items: start`
- `@media (min-width: 768px)` — `.device-sticky-wrapper { position: sticky; top: var(--space-lg) }`
- `@media (max-width: 767px)` — `.sticky-showcase { grid-template-columns: 1fr }`, `.device-sticky-wrapper { position: static }`
- Existing hero entrance keyframes and fade-up animation blocks left untouched

### Task 2: Recovery Scoring Page Restructure (recovery-scoring.astro)

- Added `import DeviceFrame from '../../components/DeviceFrame.astro'`
- Section 1 replaced with sticky-showcase two-column grid inside a padded `<section>`
- Left column: `sticky-device-col` > `device-sticky-wrapper` > `DeviceFrame` + step dots (`aria-hidden="true"`)
- Step dots: 3 divs, first has `is-active` as initial state
- Right column: `scroll-steps-col` with 3 `.scroll-step` divs
  - Step 1 (`data-step="1"`, `is-active`): "How it works" h2 + 2 paragraphs + "Three zones" h3 + paragraph
  - Step 2 (`data-step="2"`): "Data from any device" h3 + paragraph
  - Step 3 (`data-step="3"`): "A baseline that's yours" h3 + paragraph
- Section 2 (science + RecoveryChart) preserved in full, `data-animate` removed
- `<script is:inline>` StickyScrollController IIFE added after `</FeaturePageLayout>`
  - ES5 `var`/`function`, threshold 0.5, no `unobserve()`, dot toggle via `classList.toggle`

## Decisions Made

| Decision | Rationale |
|----------|-----------|
| CSS in global.css not scoped `<style>` | Makes sticky-showcase available for future pages without duplication |
| threshold: 0.5 for StickyScrollController | Step should activate at visual midpoint — 0.15 would fire too early when step is barely visible |
| No unobserve() | Bi-directional scroll (forward and back) requires continuous observation |
| Removed data-animate from both sections | Prevents double-observer conflict: AnimationController (0.15) vs StickyScrollController (0.5) |
| ES5 var/function | Project convention from 05-PATTERNS.md — matches AnimationController in BaseLayout.astro |

## Deviations from Plan

None — plan executed exactly as written.

## Known Stubs

None — sticky scroll showcase fully wired. Single `recovery.png` used for all 3 steps (by design — dot indicators carry step progression; multi-image crossfade deferred to future plan per plan spec).

## Threat Flags

None — no new trust boundaries introduced. Second `is:inline` script follows established pattern from Header.astro and contains no secrets.

## Self-Check

- [x] `global.css` contains `.step-dot` with `width: 6px` — verified via grep
- [x] `global.css` contains `.step-dot.is-active` with `background: var(--color-accent)` — verified via grep
- [x] `global.css` contains `.sticky-showcase` with `grid-template-columns: 1fr 1fr` — verified via grep
- [x] `global.css` contains `@media (min-width: 768px)` with `.device-sticky-wrapper` sticky — verified via grep
- [x] `global.css` contains `@media (max-width: 767px)` single column — verified via grep
- [x] `recovery-scoring.astro` contains `import DeviceFrame from` — verified via grep
- [x] `recovery-scoring.astro` contains `class="sticky-showcase"` — verified via grep
- [x] `recovery-scoring.astro` contains `class="device-sticky-wrapper"` — verified via grep
- [x] `recovery-scoring.astro` contains `class="scroll-steps-col"` — verified via grep
- [x] `recovery-scoring.astro` contains exactly 3 `.scroll-step` divs with data-step 1-2-3 — verified via grep
- [x] `recovery-scoring.astro` contains exactly 3 `.step-dot` divs (first has is-active) — verified via grep
- [x] `recovery-scoring.astro` has `aria-hidden="true"` on dot container — verified via grep
- [x] `recovery-scoring.astro` has NO `data-animate` anywhere — verified via grep (0 matches)
- [x] `recovery-scoring.astro` StickyScrollController uses `threshold: 0.5` — verified via grep
- [x] `recovery-scoring.astro` StickyScrollController has NO `unobserve` — verified via grep (0 matches)
- [x] `recovery-scoring.astro` StickyScrollController uses ES5 `var` — verified via grep (4 matches)
- [x] `npm run build` exits 0 — confirmed after both Task 1 and Task 2
- [x] Commits exist: 0589cd6 (Task 1), 4bbd34e (Task 2)

## Self-Check: PASSED
