---
phase: 02-landing-page
fixed_at: 2026-05-10T00:00:00Z
review_path: .planning/phases/02-landing-page/02-REVIEW.md
iteration: 1
findings_in_scope: 3
fixed: 3
skipped: 0
status: all_fixed
---

# Phase 02: Code Review Fix Report

**Fixed at:** 2026-05-10
**Source review:** .planning/phases/02-landing-page/02-REVIEW.md
**Iteration:** 1

**Summary:**
- Findings in scope: 3
- Fixed: 3
- Skipped: 0

## Fixed Issues

### WR-01: Inline event handlers break CSP and keyboard accessibility

**Files modified:** `src/components/FeatureGrid.astro`
**Commit:** 18e0fa7
**Applied fix:** Removed all `onmouseover`/`onmouseout` inline JavaScript handlers from the 5 feature card `<a>` tags. Added a `<style>` block defining `.feature-card` with the shared card styles (background, border, radius, padding, flex layout) plus `:hover` and `:focus-visible` pseudo-classes for the background color transition. Each card link now uses `class="feature-card block transition-colors duration-150"` instead of inline style blocks and event handlers. This fixes CSP compliance and adds keyboard focus feedback.

### WR-02: QR code colors hardcoded -- invisible in dark mode

**Files modified:** `src/components/LandingCTA.astro`
**Commit:** 5b746d1
**Applied fix:** Changed QR code generation to use `#000000` as the dark color and then post-process the SVG string with `.replace(/fill="#000000"/g, 'fill="currentColor"')`. Added `style="color: var(--color-text-1);"` to the QR container div so `currentColor` resolves to the theme's text color. The QR code now adapts to both light and dark mode automatically.

### WR-03: Unnecessary `rel` attribute without `target="_blank"`

**Files modified:** `src/components/LandingCTA.astro`
**Commit:** c6b1ea4
**Applied fix:** Added `target="_blank"` to the App Store link so it opens in a new tab, which is the expected behavior for external links. The existing `rel="noopener noreferrer"` now serves its intended security purpose.

## Skipped Issues

None -- all findings were fixed.

---

_Fixed: 2026-05-10_
_Fixer: Claude (gsd-code-fixer)_
_Iteration: 1_
