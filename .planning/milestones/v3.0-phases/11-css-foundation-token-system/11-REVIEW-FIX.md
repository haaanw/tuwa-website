---
phase: 11-css-foundation-token-system
fixed_at: 2026-05-15T00:00:00Z
review_path: .planning/phases/11-css-foundation-token-system/11-REVIEW.md
iteration: 1
findings_in_scope: 3
fixed: 3
skipped: 0
status: all_fixed
---

# Phase 11: Code Review Fix Report

**Fixed at:** 2026-05-15
**Source review:** .planning/phases/11-css-foundation-token-system/11-REVIEW.md
**Iteration:** 1

**Summary:**
- Findings in scope: 3
- Fixed: 3
- Skipped: 0

## Fixed Issues

### WR-01: View transition animations not guarded for `prefers-reduced-motion`

**Files modified:** `src/styles/global.css`
**Commit:** 9133b7f
**Applied fix:** Added an unconditional `::view-transition-old(root), ::view-transition-new(root) { animation: none; }` reset immediately after `@view-transition`, then wrapped the custom `crossfade-out`/`crossfade-in` keyframe animations inside `@media (prefers-reduced-motion: no-preference)`. Also updated the misleading comment (IN-03) to accurately describe that custom animations override the browser default and reduced-motion users receive an instant swap.

---

### WR-02: Duplicated `.nav-link` ruleset creates a conflicting unconditional transition

**Files modified:** `src/styles/global.css`
**Commit:** d0a942f
**Applied fix:** Removed the unconditional `transition: color 150ms ease` declaration from the first `.nav-link` block (and its duplicate `:hover` rule). The first block now contains only structural base properties (`color`, `text-decoration`, `background`, `border`, `cursor`, `font`). The second block (Phase 8, lines 272-283) retains the correctly guarded `transition: color 100ms ease-out` inside `@media (prefers-reduced-motion: no-preference)`, and the single `.nav-link:hover` color rule.

---

### WR-03: `parseInt` on a possibly-null attribute produces visible `NaN` text

**Files modified:** `src/layouts/BaseLayout.astro`
**Commit:** 84c4a0c
**Applied fix:** Added `if (isNaN(target)) return;` guard after the `parseInt` call in both code paths: the reduced-motion pre-set path (line 44) and the IntersectionObserver count-up path (line 61). Malformed or missing `data-counter-target` attributes now silently skip the counter element rather than writing `"NaN"` to `textContent`.

---

_Fixed: 2026-05-15_
_Fixer: Claude (gsd-code-fixer)_
_Iteration: 1_
