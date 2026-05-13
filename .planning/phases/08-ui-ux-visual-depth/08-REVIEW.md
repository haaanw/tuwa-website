---
phase: 08-ui-ux-visual-depth
reviewed: 2026-05-13T00:00:00Z
depth: standard
files_reviewed: 11
files_reviewed_list:
  - src/components/FeatureCTA.astro
  - src/components/FeatureGrid.astro
  - src/components/Footer.astro
  - src/components/Header.astro
  - src/components/Hero.astro
  - src/components/LandingCTA.astro
  - src/components/StatsCounter.astro
  - src/layouts/BaseLayout.astro
  - src/pages/blog/index.astro
  - src/pages/index.astro
  - src/styles/global.css
findings:
  critical: 0
  warning: 5
  info: 6
  total: 11
status: issues_found
---

# Phase 8: Code Review Report

**Reviewed:** 2026-05-13T00:00:00Z
**Depth:** standard
**Files Reviewed:** 11
**Status:** issues_found

## Summary

Phase 8 introduced scroll-reveal animations, bento grid layout, counter animations, noise texture overlay, hero entrance animations, shadow tokens, and the `StatsCounter` and `LandingCTA` components. The implementation is solid overall — reduced-motion handling is thorough, design tokens are applied consistently, and the animation architecture (JS-gated, IntersectionObserver-based) follows the CLAUDE.md recommendation to stay native. No security vulnerabilities or data-loss risks were found.

Five warnings were identified. The most consequential are: a missing `target="_blank"` attribute on the Footer CTA link (different behavior from other App Store links on the same page), an unhandled async rejection in `LandingCTA.astro` from the `QRCode.toString()` call, a logic inversion bug in the dropdown `aria-expanded` state, and a noise texture overlay that sits at `z-index: 0` which will paint over any positioned content lacking its own stacking context. Two additional warnings cover the `color-mix()` fallback gap in the Header and the counter animation starting from `0` instead of the static value shown to non-JS users.

Six info items cover dead CSS (unused `--color-surface-2` reference), inconsistent App Store URL usage, magic hardcoded pixel values, and minor accessibility gaps.

---

## Warnings

### WR-01: Dropdown `aria-expanded` logic is inverted

**File:** `src/components/Header.astro:127`
**Issue:** `classList.toggle('hidden')` returns `true` when the class was **added** (menu is now closed) and `false` when it was removed (menu is now open). The code then sets `aria-expanded` to `!open`, which inverts the semantics: `aria-expanded="true"` is set when the menu is hidden, and `aria-expanded="false"` when it is visible. Screen reader users will be told the menu is expanded when it is not.

**Fix:**
```js
btn.addEventListener('click', function() {
  var isOpen = menu.classList.toggle('hidden');
  // toggle returns true when 'hidden' was added (menu closed), false when removed (menu open)
  btn.setAttribute('aria-expanded', String(!isOpen));
  chevron.style.transform = isOpen ? '' : 'rotate(180deg)';
});
```

---

### WR-02: Unhandled async rejection in `LandingCTA.astro`

**File:** `src/components/LandingCTA.astro:5-13`
**Issue:** `QRCode.toString()` is awaited without a try/catch. If the `qrcode` package throws (e.g., invalid URL, missing dependency at build time), the entire page build will fail with an unhandled promise rejection rather than a graceful degradation. For a build-time asset, this is a hard crash.

**Fix:**
```astro
---
import { APP_STORE_URL } from '../config';
import QRCode from 'qrcode';

let qrSvg = '';
try {
  qrSvg = (await QRCode.toString(APP_STORE_URL, {
    type: 'svg',
    width: 120,
    margin: 0,
    color: { dark: '#000000', light: '#00000000' }
  })).replace(/stroke="#000000"/g, 'stroke="currentColor"');
} catch (e) {
  // QR code is decorative — fail silently, badge link still works
  console.warn('[LandingCTA] QR code generation failed:', e);
}
---
```
Then guard the QR block: `{qrSvg && <div set:html={qrSvg} ... />}`

---

### WR-03: Footer App Store link missing `target="_blank"`

**File:** `src/components/Footer.astro:15-24`
**Issue:** The "Get the App" link in the Footer navigates to `https://apps.apple.com/app/tuwa` in the same tab (no `target="_blank"`), while the equivalent links in `FeatureCTA.astro` (line 41), `LandingCTA.astro` (line 53), and `Header.astro` (line 78) all use `target="_blank" rel="noopener noreferrer"`. Inconsistent behaviour: clicking the footer CTA navigates away from the marketing site rather than opening the App Store.

**Fix:**
```html
<a
  href="https://apps.apple.com/app/tuwa"
  target="_blank"
  rel="noopener noreferrer"
  aria-label="Download Tuwa on the App Store"
  class="btn-cta inline-flex items-center gap-2"
  ...
>
```

---

### WR-04: Noise texture overlay `z-index: 0` will obscure positioned content

**File:** `src/styles/global.css:85-95`
**Issue:** The `body::after` noise texture uses `position: fixed; z-index: 0`. Any child element using `position: relative` or `position: absolute` without an explicit `z-index` will sit in the default stacking context at `z-index: auto`, which is painted **below** `z-index: 0`. This means the noise overlay can paint over interactive elements (buttons, links, inputs) that lack their own stacking context, blocking pointer events. `pointer-events: none` prevents click blocking, but the overlay will still visually obscure those elements at 2.5% opacity.

The real risk is elements that establish a new stacking context via `transform`, `opacity < 1`, or `filter` — these stack independently, but sibling elements without a stacking context will be covered.

**Fix:** Use a negative `z-index` to ensure the overlay always sits behind all content:
```css
body::after {
  z-index: -1;
  /* pointer-events: none is still needed */
}
```
Note: with `z-index: -1` on a `::after` of `body`, it will sit above the `body` background but below all body children — the intended behavior.

---

### WR-05: Counter animation starts from `0` regardless of SSR-rendered value

**File:** `src/layouts/BaseLayout.astro:66-76`
**Issue:** The counter animation always animates from `0` to the target value. However, `StatsCounter.astro` renders the final formatted values as static HTML (e.g., `1,200+`) for SSR and non-JS users. When JS runs and the counter animates in, it immediately overwrites the SSR content with `"0+"` before counting up. This creates a visible flash where the correctly-rendered number disappears and is replaced by zero before counting begins. It also defeats the SSR pre-render for users on slow connections who see the correct value momentarily, then watch it reset.

**Fix:** Initialize the animation from the current displayed value, or hide the counter until JS is ready to animate it:
```js
counterEls.forEach(function(counter) {
  var target = parseInt(counter.getAttribute('data-counter-target'), 10);
  var suffix = counter.getAttribute('data-counter-suffix') || '';
  var duration = 400;
  var start = null;
  // Start from current displayed value to avoid flash
  var startValue = parseInt((counter.textContent || '0').replace(/[^0-9]/g, ''), 10) || 0;
  function step(timestamp) {
    if (!start) start = timestamp;
    var progress = Math.min((timestamp - start) / duration, 1);
    var current = Math.floor(startValue + progress * (target - startValue));
    counter.textContent = current.toLocaleString() + suffix;
    if (progress < 1) {
      requestAnimationFrame(step);
    } else {
      counter.textContent = target.toLocaleString() + suffix;
    }
  }
  requestAnimationFrame(step);
});
```

---

## Info

### IN-01: Undefined CSS variable `--color-surface-2` referenced in Header inline styles

**File:** `src/components/Header.astro:57-61`
**Issue:** The dropdown `onmouseover` handlers reference `var(--color-surface-2)` in inline style strings (e.g., `this.style.backgroundColor='var(--color-surface-2)'`). `--color-surface-2` is not declared in `global.css`; the token is `--color-surface-el`. The hover background will silently fall back to `transparent`, producing no visual hover state in the dropdown.

**Fix:** Replace `--color-surface-2` with `--color-surface-el` in all five dropdown link hover handlers:
```html
onmouseover="this.style.color='var(--color-accent)';this.style.backgroundColor='var(--color-surface-el)'"
onmouseout="this.style.color='var(--color-text-2)';this.style.backgroundColor='transparent'"
```

---

### IN-02: App Store URL is hardcoded in Footer, diverging from centralized `config`

**File:** `src/components/Footer.astro:17`
**Issue:** The footer hardcodes `https://apps.apple.com/app/tuwa` directly, while `FeatureCTA.astro`, `LandingCTA.astro`, and `Header.astro` all import `APP_STORE_URL` from `../config`. If the App Store URL changes, the footer will point to the wrong link.

**Fix:**
```astro
---
import { APP_STORE_URL } from '../config';
const year = new Date().getFullYear();
---
```
Then replace the hardcoded href with `{APP_STORE_URL}`.

---

### IN-03: Hardcoded pixel values for device frame buttons in `global.css`

**File:** `src/styles/global.css:264-284`
**Issue:** The device frame button positions (`left: -3px`, `top: 100px`, `height: 28px`, etc.) and the dark color `#2A2A2A` are magic numbers with no token or comment connecting them to the device dimensions. If the device frame size changes, these values will need manual recalculation.

**Fix:** Add inline comments explaining what these numbers correspond to (e.g., `/* ~33% down the 304px frame height */`). Alternatively, define CSS variables at the `.device-frame` scope:
```css
.device-frame {
  --_frame-height: 304px;
  --_button-color: #2A2A2A;
}
```

---

### IN-04: `StatsCounter` metrics are hardcoded with no data provenance comment

**File:** `src/components/StatsCounter.astro:22-43`
**Issue:** The metrics `1,200+`, `85,000+`, and `94%` are hardcoded with no comment indicating their source or when they were last verified. For a site claiming scientific credibility, stale social proof numbers are a brand risk.

**Fix:** Add a comment noting the source and date:
```astro
---
// Metrics last verified: 2026-05-13
// Sources: App Store Connect (athletes, sessions), internal HRV model validation report
---
```

---

### IN-05: `blog/index.astro` uses `post.id` as URL segment rather than `post.slug`

**File:** `src/pages/blog/index.astro:39`
**Issue:** The blog listing links use `/blog/${post.id}` as the URL path. In Astro content collections, `post.id` is the raw file path including subdirectory (e.g., `my-post.md`). While this works for a flat collection directory, it is fragile: if blog posts are ever organized into subdirectories, the URLs will include the directory prefix and break. Astro's `getStaticPaths` pattern uses `post.slug` (Astro 5) or `post.id` with explicit routing (Astro 6). Confirm the routing in the `[...slug].astro` or `[id].astro` file matches this convention to avoid 404s.

**Fix:** Verify that `src/pages/blog/[...id].astro` (or equivalent) uses the same `post.id` segment. If using Astro 6 content layer, this is correct; just ensure consistency across listing and detail pages.

---

### IN-06: `bento-hero-card` `transition` rule is missing `background-color` transition

**File:** `src/styles/global.css:153-158`
**Issue:** `.bento-hero-card` overrides the base `.feature-card` shadow transition but does not add `background-color` to the transition. The base `.feature-card` rule (line 139) transitions only `box-shadow`, so the background color change on hover (from `--color-surface` to `--color-surface-el`) is abrupt for all cards. This is a minor visual polish gap rather than a bug.

**Fix:** Add `background-color` to the feature card transition:
```css
@media (prefers-reduced-motion: no-preference) {
  .feature-card {
    transition: box-shadow 200ms ease-out, background-color 200ms ease-out;
  }
}
```

---

_Reviewed: 2026-05-13T00:00:00Z_
_Reviewer: Claude (gsd-code-reviewer)_
_Depth: standard_
