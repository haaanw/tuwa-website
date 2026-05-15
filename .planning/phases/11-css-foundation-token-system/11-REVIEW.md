---
phase: 11-css-foundation-token-system
reviewed: 2026-05-15T00:00:00Z
depth: standard
files_reviewed: 3
files_reviewed_list:
  - src/styles/global.css
  - astro.config.mjs
  - src/layouts/BaseLayout.astro
findings:
  critical: 0
  warning: 3
  info: 3
  total: 6
status: issues_found
---

# Phase 11: Code Review Report

**Reviewed:** 2026-05-15
**Depth:** standard
**Files Reviewed:** 3
**Status:** issues_found

## Summary

Three files reviewed: the CSS design token foundation (`global.css`), the Astro configuration (`astro.config.mjs`), and the base layout shell (`BaseLayout.astro`). The overall implementation is solid — token architecture is well-structured, Tailwind v4 integration is correct, font preloading follows the recommended ordering, and the motion-preference gating pattern is applied consistently throughout.

Three warnings require attention before shipping. The most user-visible is the `@view-transition` reduced-motion gap, where custom crossfade animations fire for users who have explicitly opted out of motion. The `NaN` counter display bug in `BaseLayout.astro` is a silent correctness issue that would surface when `data-counter-target` is absent. The duplicated `.nav-link` ruleset creates a specificity conflict that silently undermines the reduced-motion transition guard.

Three info-level items cover `will-change` over-promotion, a hardcoded color in the device frame, and the misleading comment on `@view-transition`.

`astro.config.mjs` is clean with no issues.

## Warnings

### WR-01: View transition animations not guarded for `prefers-reduced-motion`

**File:** `src/styles/global.css:140-154`
**Issue:** The comment at line 134 states "browser suppresses transitions automatically for prefers-reduced-motion," but this is only true for the browser's built-in default crossfade. Because lines 140–154 define custom `::view-transition-old(root)` and `::view-transition-new(root)` animations with explicit `crossfade-out`/`crossfade-in` keyframes, the browser default is replaced entirely. These custom animations are **not** wrapped in `@media (prefers-reduced-motion: no-preference)`, so they fire for users who have requested reduced motion — directly contradicting the project's stated reduced-motion discipline (D-03, D-10).

**Fix:** Wrap the custom `::view-transition` rules and their keyframes in a `no-preference` media query, and provide a static fallback that instantly swaps content for reduced-motion users:

```css
/* Default for reduced-motion: instant swap, no animation */
::view-transition-old(root),
::view-transition-new(root) {
  animation: none;
}

/* Animated crossfade only when motion is acceptable */
@media (prefers-reduced-motion: no-preference) {
  ::view-transition-old(root) {
    animation: 200ms ease-out both crossfade-out;
  }
  ::view-transition-new(root) {
    animation: 200ms ease-out both crossfade-in;
  }

  @keyframes crossfade-out {
    from { opacity: 1; }
    to   { opacity: 0; }
  }
  @keyframes crossfade-in {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
}
```

---

### WR-02: Duplicated `.nav-link` ruleset creates a conflicting unconditional transition

**File:** `src/styles/global.css:164-175` and `267-277`
**Issue:** `.nav-link` is declared in two separate blocks. The first (lines 164–175) sets `transition: color 150ms ease` unconditionally. The second (lines 267–277) sets the same properties again and wraps the transition in `@media (prefers-reduced-motion: no-preference)` — which is the correct pattern. Because the first block's unconditional `transition` declaration has equal specificity and appears earlier in the cascade, it is overridden by the second block's guarded declaration for no-preference users, but the intent of the guard is undermined: users with `prefers-reduced-motion: reduce` still receive the transition from block one. Additionally the duplication itself will cause confusion during future edits.

**Fix:** Remove the first `.nav-link` block entirely and consolidate into a single block following the motion-preference pattern already used elsewhere:

```css
.nav-link {
  color: var(--color-text-1);
  text-decoration: none;
  background: none;
  border: none;
  cursor: pointer;
  font: inherit;
}
.nav-link:hover {
  color: var(--color-accent);
}
@media (prefers-reduced-motion: no-preference) {
  .nav-link {
    transition: color 100ms ease-out;
  }
}
```

Remove lines 164–175 (the first declaration), keeping only the consolidated block at lines 267–277 (expanded with the missing properties above).

---

### WR-03: `parseInt` on a possibly-null attribute produces visible `NaN` text

**File:** `src/layouts/BaseLayout.astro:43` and `59`
**Issue:** `parseInt(counter.getAttribute('data-counter-target'), 10)` returns `NaN` when the attribute is absent or has a non-numeric value. Both the reduced-motion pre-set path (line 43) and the IntersectionObserver count-up path (line 59) call this without a guard. If `NaN` reaches `toLocaleString()`, browsers return the string `"NaN"`, which is then written to `counter.textContent` and displayed to the user.

**Fix:** Add a guard after the `parseInt` call in both code paths:

```js
// Reduced-motion path (around line 43)
var target = parseInt(counter.getAttribute('data-counter-target'), 10);
if (isNaN(target)) return; // skip malformed counters
var suffix = counter.getAttribute('data-counter-suffix') || '';
counter.textContent = target.toLocaleString() + suffix;

// IntersectionObserver path (around line 59)
var target = parseInt(counter.getAttribute('data-counter-target'), 10);
if (isNaN(target)) return;
```

---

## Info

### IN-01: Blanket `will-change` on `.matisse-shape` may over-promote compositor layers

**File:** `src/styles/global.css:675-676`
**Issue:** `will-change: transform, opacity` is applied unconditionally to all `.matisse-shape` elements, which pre-promotes each element to its own GPU compositor layer. If there are many shapes (as expected for a Matisse-style frieze), this can increase GPU memory consumption on low-end devices without yet providing a benefit — Phase 15 animations haven't been added yet. `will-change` is most effective applied immediately before an animation begins (e.g., toggled via JS) and removed after it ends.

**Fix:** Consider deferring `will-change` to Phase 15 when the actual scroll-driven animations are implemented, or scope it more narrowly. At minimum, document the decision in a comment:

```css
.matisse-shape {
  fill: currentColor;
  transform: translateZ(0); /* GPU layer pre-promotion for Phase 15 parallax */
  /* will-change added in Phase 15 when animation-timeline: scroll() is wired */
}
```

---

### IN-02: Hardcoded color literal in device frame pseudo-elements

**File:** `src/styles/global.css:403` and `405` and `412`
**Issue:** `.device-frame::before` and `::after` use the hardcoded hex value `#2A2A2A` for the iPhone side button color. This is the only hardcoded color in the file that bypasses the design token system. While the value is intentional (device hardware color, not a brand color), it's undocumented and would be invisible to any future theming pass.

**Fix:** Either introduce a local custom property or add a comment documenting the intentional bypass:

```css
.device-frame::before {
  /* #2A2A2A — iPhone titanium button color, intentionally not a brand token */
  background: #2A2A2A;
  box-shadow: 0 36px 0 #2A2A2A;
  ...
}
```

---

### IN-03: Comment on `@view-transition` is technically inaccurate

**File:** `src/styles/global.css:134`
**Issue:** The comment reads "browser suppresses transitions automatically for prefers-reduced-motion." This statement is true only for the browser's built-in default transition, not for custom `::view-transition-*` animations. Since custom animations are defined immediately below (lines 140–154), the comment is misleading and could cause a future contributor to skip adding the reduced-motion guard (as appears to have happened here). This is directly related to WR-01.

**Fix:** Once WR-01 is resolved, update the comment to accurately reflect the implemented behavior:

```css
/* MPA browser-native crossfade. Custom animations below override the default. */
/* Reduced-motion users receive an instant swap via the ::view-transition reset above. */
```

---

_Reviewed: 2026-05-15_
_Reviewer: Claude (gsd-code-reviewer)_
_Depth: standard_
