---
phase: 05-animation-infrastructure
reviewed: 2026-05-11T00:00:00Z
depth: standard
files_reviewed: 4
files_reviewed_list:
  - src/styles/global.css
  - src/layouts/BaseLayout.astro
  - src/components/FeatureCTA.astro
  - src/components/LandingCTA.astro
findings:
  critical: 0
  warning: 1
  info: 2
  total: 3
status: issues_found
---

# Phase 5: Code Review Report

**Reviewed:** 2026-05-11
**Depth:** standard
**Files Reviewed:** 4
**Status:** issues_found

## Summary

The animation infrastructure is well-implemented. The scroll-triggered reveal system follows best practices: animations are JS-gated via a `.js-enabled` class on `<html>`, `prefers-reduced-motion: reduce` is respected (elements render at full opacity with no animation), and the IntersectionObserver correctly unobserves elements after they become visible (no redundant callbacks). The CTA components properly consume design tokens and the shared `APP_STORE_URL` constant.

Three minor issues found -- one warning about the inline script timing relative to `[data-animate]` elements, and two informational items.

## Warnings

### WR-01: IntersectionObserver script may miss elements below the fold on view-transition navigations

**File:** `src/layouts/BaseLayout.astro:50`
**Issue:** The `is:inline` script queries `[data-animate]` elements once at parse time (line 50). Because it is placed at the end of `<body>`, it runs after the DOM above it is parsed, so it works correctly on initial page load. However, if Astro View Transitions are ever enabled (or if content is injected after load), newly added `[data-animate]` elements will not be observed. This is not a bug today but becomes one the moment View Transitions or any client-side routing is added.
**Fix:** No change needed now for a fully static site without View Transitions. If View Transitions are added later, move the observer setup into an `astro:page-load` event listener:
```js
document.addEventListener('astro:page-load', () => {
  document.querySelectorAll('[data-animate]:not(.is-visible)').forEach((el) => {
    observer.observe(el);
  });
});
```

## Info

### IN-01: QR SVG color replacement regex may not match library output

**File:** `src/components/LandingCTA.astro:13`
**Issue:** The regex `.replace(/stroke="#000000"/g, 'stroke="currentColor"')` targets `stroke` attributes, but the `qrcode` npm package typically generates SVG paths using `fill` (controlled by the `color.dark` option), not `stroke`. If the library output does not contain `stroke="#000000"`, this replacement is a no-op and the QR code renders in hardcoded `#000000` rather than inheriting `currentColor` from the parent `color` style on line 69.
**Fix:** Verify the actual SVG output from `QRCode.toString`. If it uses `fill`, change the replacement to target `fill` instead:
```js
.replace(/fill="#000000"/g, 'fill="currentColor"');
```

### IN-02: CTA images use `loading="lazy"` despite being likely above-the-fold on short pages

**File:** `src/components/FeatureCTA.astro:52`, `src/components/LandingCTA.astro:64`
**Issue:** The App Store badge images in both CTA components use `loading="lazy"`. On feature pages and the landing page, the CTA section may be close to or within the initial viewport on shorter pages or large screens. Lazy-loading an already-visible image adds a slight delay before the badge renders. This is cosmetic, not a bug.
**Fix:** No change required -- the browser handles near-viewport lazy images well. If the CTA is ever moved higher on the page (e.g., into the hero), switch to `loading="eager"`.

---

_Reviewed: 2026-05-11_
_Reviewer: Claude (gsd-code-reviewer)_
_Depth: standard_
