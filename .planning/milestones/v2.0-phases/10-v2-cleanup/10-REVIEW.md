---
phase: 10-v2-cleanup
reviewed: 2026-05-14T12:00:00Z
depth: standard
files_reviewed: 2
files_reviewed_list:
  - src/components/FeatureGrid.astro
  - src/styles/global.css
findings:
  critical: 0
  warning: 2
  info: 3
  total: 5
status: issues_found
---

# Phase 10: Code Review Report

**Reviewed:** 2026-05-14T12:00:00Z
**Depth:** standard
**Files Reviewed:** 2
**Status:** issues_found

## Summary

Reviewed the FeatureGrid click-wheel component and global stylesheet. No critical security or crash-level issues found. The inline script in FeatureGrid uses hardcoded data (not user input) for SVG innerHTML, so there is no XSS vector. Two warnings relate to duplicate CSS rules causing reduced-motion bypass and a potential stacking context issue. Three info items flag code quality improvements.

## Warnings

### WR-01: Duplicate `.nav-link` rules cause reduced-motion transition leak

**File:** `src/styles/global.css:116-127` and `src/styles/global.css:218-229`
**Issue:** `.nav-link` is declared twice. The first block (line 123) sets `transition: color 150ms ease` unconditionally. The second block (line 225-228) wraps its transition in `@media (prefers-reduced-motion: no-preference)`. Because the first declaration is NOT behind a media query, users who prefer reduced motion still get the transition from line 123. The second block's intent to be motion-safe is defeated by the first block.
**Fix:** Remove the duplicate declarations in lines 116-127 and keep only the Phase 8 block (lines 218-229), which correctly gates the transition behind `prefers-reduced-motion`:
```css
/* Remove lines 116-127 entirely. The Phase 8 block at 218-229 is the canonical version. */
/* If the additional properties (background, border, cursor, font) are needed, merge them
   into the Phase 8 block outside the media query: */
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

### WR-02: Noise overlay `z-index: 0` may interfere with stacking contexts

**File:** `src/styles/global.css:89`
**Issue:** The `body::after` noise texture uses `position: fixed; z-index: 0`. Because `body` has no explicit `z-index`, this pseudo-element creates a new stacking context at z-index 0. Any statically positioned content without an explicit z-index could render behind the noise overlay in certain browser/layout combinations (particularly with `position: relative` children). While `pointer-events: none` prevents interaction issues, the visual layering may be fragile.
**Fix:** Use `z-index: -1` to ensure the noise texture always sits behind all page content, regardless of stacking context:
```css
body::after {
  /* ... existing properties ... */
  z-index: -1;
}
```

## Info

### IN-01: Large inline script block in FeatureGrid (230 lines)

**File:** `src/components/FeatureGrid.astro:127-357`
**Issue:** The `is:inline` script contains ~230 lines of wheel rotation logic, animation, keyboard handling, and DOM manipulation. This is a significant amount of logic embedded directly in the component template, making it harder to test and maintain.
**Fix:** Consider extracting the wheel logic into a standalone `.js` file (e.g., `src/scripts/feature-wheel.js`) and importing it. Astro's `is:inline` directive prevents tree-shaking and bundling optimizations.

### IN-02: Hardcoded feature data duplicated between HTML and script

**File:** `src/components/FeatureGrid.astro:112-119` and `src/components/FeatureGrid.astro:148-179`
**Issue:** Feature metadata (title, description, href, icon SVG) is defined both in the initial HTML markup (lines 112-119 for the default center content) and in the JavaScript `features` array (lines 148-179). If a feature title or URL changes, both locations must be updated in sync.
**Fix:** Use `data-*` attributes on the HTML elements to drive the JS, or generate the initial center content from the same data source. Alternatively, add a code comment noting the duplication and linking the two locations.

### IN-03: Magic number `5` used for segment count

**File:** `src/components/FeatureGrid.astro:295`
**Issue:** The modular arithmetic `((activeIndex + dir) % 5 + 5) % 5` hardcodes the segment count as `5`. The `features` array length and `SEGMENT_ANGLE = 72` (360/5) also encode this implicitly. If segments are added or removed, three separate values must change.
**Fix:** Derive the count from the features array:
```javascript
var SEGMENT_COUNT = features.length;
var SEGMENT_ANGLE = 360 / SEGMENT_COUNT;
// ...
var newIdx = ((activeIndex + dir) % SEGMENT_COUNT + SEGMENT_COUNT) % SEGMENT_COUNT;
```

---

_Reviewed: 2026-05-14T12:00:00Z_
_Reviewer: Claude (gsd-code-reviewer)_
_Depth: standard_
