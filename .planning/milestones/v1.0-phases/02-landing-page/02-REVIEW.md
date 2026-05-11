---
phase: 02-landing-page
reviewed: 2026-05-10T00:00:00Z
depth: standard
files_reviewed: 5
files_reviewed_list:
  - src/components/Hero.astro
  - src/components/FeatureGrid.astro
  - src/components/LandingCTA.astro
  - src/pages/index.astro
  - src/config.ts
findings:
  critical: 0
  warning: 3
  info: 2
  total: 5
status: issues_found
---

# Phase 02: Code Review Report

**Reviewed:** 2026-05-10
**Depth:** standard
**Files Reviewed:** 5
**Status:** issues_found

## Summary

The landing page implementation is clean and well-structured. Components follow Astro conventions, use design tokens consistently via CSS custom properties, and the page composition in `index.astro` is straightforward. No critical security issues or bugs were found.

Three warnings relate to: (1) inline event handlers in `FeatureGrid.astro` that break under Content Security Policy and fail for keyboard users, (2) hardcoded QR code colors in `LandingCTA.astro` that will render invisible in dark mode, and (3) a mismatched `rel` attribute on a same-tab link. Two informational items note duplicated card styling and a minor accessibility gap.

## Warnings

### WR-01: Inline event handlers break CSP and keyboard accessibility

**File:** `src/components/FeatureGrid.astro:43-44` (repeated on lines 71-72, 100-101, 129-130, 158-159)
**Issue:** Each feature card uses `onmouseover` and `onmouseout` inline JavaScript to change background color. This has two problems: (a) inline event handlers are blocked by any `Content-Security-Policy` that disallows `unsafe-inline` for scripts, which is a security best practice for production sites; (b) the hover effect is mouse-only -- keyboard users who Tab to the link get no visual feedback beyond the browser default focus ring.
**Fix:** Replace inline handlers with CSS `:hover` and `:focus-visible` styling. Since the background color uses CSS custom properties, use a Tailwind arbitrary variant or a small CSS class:

```css
/* In global.css or a <style> block in FeatureGrid.astro */
.feature-card {
  background-color: var(--color-surface);
}
.feature-card:hover,
.feature-card:focus-visible {
  background-color: var(--color-surface-el);
}
```

Then remove the `onmouseover`/`onmouseout` attributes and add `class="feature-card"` to each `<a>` tag.

### WR-02: QR code colors hardcoded -- invisible in dark mode

**File:** `src/components/LandingCTA.astro:9-12`
**Issue:** The QR code dark color is hardcoded to `#1C1915` (near-black). In dark mode, the page background will be dark, making the QR code invisible or near-invisible. The light color `#00000000` (transparent) is correct for adapting to any background, but the dark (foreground) color needs to match the current theme's text color.
**Fix:** Generate two QR code SVGs at build time (one for light mode, one for dark mode) and toggle visibility with CSS, or use `currentColor` in the SVG after generation by post-processing the SVG string:

```typescript
// Replace hardcoded fill color with currentColor so it inherits from CSS
const qrSvg = (await QRCode.toString(APP_STORE_URL, {
  type: 'svg',
  width: 120,
  margin: 0,
  color: {
    dark: '#000000',
    light: '#00000000'
  }
})).replace(/fill="#000000"/g, 'fill="currentColor"');
```

Then set `color: var(--color-text-1)` on the QR container div so `currentColor` resolves to the correct theme color.

### WR-03: Unnecessary `rel` attribute without `target="_blank"`

**File:** `src/components/LandingCTA.astro:55`
**Issue:** The App Store link has `rel="noopener noreferrer"` but no `target="_blank"`. The `rel="noopener noreferrer"` attribute only has security meaning when the link opens in a new tab/window (`target="_blank"`). Without it, the attribute is inert and misleading -- it suggests the developer intended a new-tab link but forgot the target, or added the rel unnecessarily.
**Fix:** Either add `target="_blank"` if the link should open in a new tab (common for external App Store links), or remove the `rel` attribute:

```html
<!-- Option A: open in new tab (recommended for external links) -->
<a href={APP_STORE_URL} target="_blank" rel="noopener noreferrer" ...>

<!-- Option B: same-tab navigation, remove rel -->
<a href={APP_STORE_URL} aria-label="Download Tuwa on the App Store">
```

## Info

### IN-01: Duplicated card styles across 5 feature cards

**File:** `src/components/FeatureGrid.astro:33-42` (repeated 5 times)
**Issue:** Each of the 5 feature cards repeats the same 9-line inline `style` block verbatim. This makes the component harder to maintain -- any style change must be applied in 5 places.
**Fix:** Extract the shared card styles into a CSS class (e.g., `.feature-card` as suggested in WR-01) or refactor into a data-driven loop:

```astro
---
const features = [
  { href: '/features/recovery-scoring', category: 'RECOVERY', title: 'Recovery Scoring', ... },
  // ...
];
---
{features.map(f => (
  <li>
    <a href={f.href} class="feature-card">...</a>
  </li>
))}
```

### IN-02: Feature card links point to pages that do not yet exist

**File:** `src/components/FeatureGrid.astro:31,59,89,117,145`
**Issue:** The five feature card links (`/features/recovery-scoring`, `/features/workload-tracking`, etc.) point to pages that are not yet built (noted in comment on line 2 as "Phase 3"). Clicking these links will produce a 404 in production until Phase 3 is complete.
**Fix:** This is acknowledged in the code comments and is intentional for the phased rollout. No immediate fix needed, but consider adding a visual indicator that these are coming soon, or using `aria-disabled="true"` with an `onclick="return false"` (or simply using a `<div>` instead of `<a>`) until the target pages exist.

---

_Reviewed: 2026-05-10_
_Reviewer: Claude (gsd-code-reviewer)_
_Depth: standard_
