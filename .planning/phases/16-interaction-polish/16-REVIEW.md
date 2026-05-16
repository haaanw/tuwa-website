---
phase: 16-interaction-polish
reviewed: 2026-05-16T12:00:00Z
depth: standard
files_reviewed: 2
files_reviewed_list:
  - src/styles/global.css
  - src/layouts/BaseLayout.astro
findings:
  critical: 0
  warning: 2
  info: 2
  total: 4
status: issues_found
---

# Phase 16: Code Review Report

**Reviewed:** 2026-05-16
**Depth:** standard
**Files Reviewed:** 2
**Status:** issues_found

## Summary

Reviewed the Phase 16 interaction polish additions: easing token (`--ease-interactive`), hover transitions for FAQ/wheel/inline-links/footer, Lenis momentum scroll integration, and magnetic CTA effect. The implementation is well-structured with consistent `prefers-reduced-motion` guards throughout and correct touch-device exclusions. Two warnings relate to a CSS/JS transform conflict on the magnetic CTA and an `(window as any)` type escape. Two info items note minor code quality points.

## Warnings

### WR-01: Magnetic CTA inline transform overrides CSS :active press feedback

**File:** `src/layouts/BaseLayout.astro:143`
**Issue:** The magnetic script sets `btn.style.transform` as an inline style during `mousemove`. Inline styles have higher specificity than any CSS rule, so when a user clicks the CTA while the magnetic effect is active, the `:active` pseudo-class transform (`scale(0.98)` at `src/styles/global.css:277`) will never visually apply. The press-down feedback is lost, making the button feel unresponsive on click.
**Fix:** In the `mousemove` handler, listen for `mousedown`/`mouseup` to temporarily apply the active scale. Alternatively, clear the inline transform on `mousedown` and let CSS `:active` take over:
```js
btn.addEventListener('mousedown', () => {
  btn.style.transform = '';
});
```
Or combine both transforms in the `mousedown` handler:
```js
btn.addEventListener('mousedown', () => {
  btn.style.transform = `translate(${tx}px, ${ty}px) scale(0.98)`;
});
btn.addEventListener('mouseup', () => {
  // Restore magnetic position or clear
  btn.style.transform = '';
});
```

### WR-02: Lenis `anchors` option with object may silently break on version upgrade

**File:** `src/layouts/BaseLayout.astro:106-110`
**Issue:** The `anchors: { offset: 64 }` option passes an object that gets forwarded to `scrollTo()` as options. This works correctly in Lenis 1.3.x (verified in source), but the `anchors` parameter is typed as `boolean | object` without a formal interface. If a future Lenis update changes the `scrollTo` options shape, this will silently produce incorrect scroll offsets with no error. The magic number `64` also duplicates the header height assumption without a shared constant.
**Fix:** Add a comment documenting the Lenis version dependency and consider extracting the header height:
```ts
// Lenis 1.3.x: anchors accepts { offset } passed to scrollTo()
// Header height must match src/components/Header.astro sticky height
const HEADER_HEIGHT = 64;

const lenis = new Lenis({
  autoRaf: true,
  lerp: 0.1,
  anchors: { offset: HEADER_HEIGHT },
});
```

## Info

### IN-01: Type escape via `(window as any).__lenis`

**File:** `src/layouts/BaseLayout.astro:114`
**Issue:** `(window as any).__lenis = lenis` bypasses TypeScript type checking. This is a minor concern in an inline script, but if other scripts need to access Lenis programmatically, the untyped global could lead to runtime errors.
**Fix:** Declare the global type augmentation at the top of the script or in a `global.d.ts`:
```ts
declare global {
  interface Window {
    __lenis?: import('lenis').default;
  }
}
window.__lenis = lenis;
```

### IN-02: Duplicate `.nav-link` rule blocks

**File:** `src/styles/global.css:183-190` and `src/styles/global.css:282-284`
**Issue:** `.nav-link` is declared twice. The first block (lines 183-190) sets multiple properties including `text-decoration: none`. The second block (line 282-284) redeclares `text-decoration: none` redundantly. While not a bug (CSS cascade handles it), it adds confusion about which block is authoritative.
**Fix:** Consolidate the `.nav-link` rules into a single block, or add a comment to the second block indicating it is the Phase 8 extension.

---

_Reviewed: 2026-05-16_
_Reviewer: Claude (gsd-code-reviewer)_
_Depth: standard_
