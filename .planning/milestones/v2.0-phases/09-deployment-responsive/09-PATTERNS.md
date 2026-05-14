# Phase 9: Deployment & Responsive - Pattern Map

**Mapped:** 2026-05-14
**Files analyzed:** 6 files to modify + 1 asset to replace
**Analogs found:** 6 / 6 (all modifications to existing files — no new files required)

---

## File Classification

| New/Modified File | Role | Data Flow | Closest Analog | Match Quality |
|-------------------|------|-----------|----------------|---------------|
| `public/badges/app-store-badge.svg` | static asset | file-I/O | `public/_redirects` (static public asset) | role-match |
| `src/components/Hero.astro` | component | request-response | `src/components/LandingCTA.astro` (badge block) | exact |
| `src/components/LandingCTA.astro` | component | request-response | `src/components/FeatureCTA.astro` (badge img tag) | exact |
| `src/components/FeatureCTA.astro` | component | request-response | `src/components/LandingCTA.astro` (badge img tag) | exact |
| `src/components/Footer.astro` | component | request-response | `src/components/LandingCTA.astro` (badge anchor pattern) | role-match |
| `src/styles/global.css` | config/style | transform | existing responsive blocks within same file | exact (self-referential) |
| `src/layouts/BaseLayout.astro` | layout | request-response | existing `<main>` wrapper in same file | exact (self-referential) |

---

## Pattern Assignments

### `public/badges/app-store-badge.svg` (static asset — replace)

**Action:** Replace placeholder with official Apple SVG downloaded from:
`https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg`

**Key dimension change — CRITICAL:**
- Old placeholder: `width="148" height="44"` / `viewBox="0 0 148 44"`
- Official Apple SVG: `viewBox="0 0 119.66407 40"` (119.66 wide × 40 tall)
- HTML attribute convention: round to integers → `width="120" height="40"`
- All four badge `<img>` tags in components must be updated to match

**Current placeholder** (`public/badges/app-store-badge.svg`, lines 1-13):
```xml
<svg xmlns="http://www.w3.org/2000/svg" width="148" height="44" viewBox="0 0 148 44" ...>
  <rect width="148" height="44" rx="8" .../>
  ...hand-drawn approximation...
</svg>
```

**No path changes needed** — all four components already reference `/badges/app-store-badge.svg`.

---

### `src/components/Hero.astro` (component — add badge block)

**Analog:** `src/components/LandingCTA.astro` lines 53-67 (App Store badge anchor pattern)

**Current state** (`Hero.astro` lines 1-55): No badge block exists. Only has `<h1>`, subtitle `<p>`, and `DeviceFrame` inside a centered `max-width: 768px` div.

**Import pattern to add** (copy from `LandingCTA.astro` line 2):
```astro
---
import dashboardScreenshot from '../assets/screenshots/dashboard.png';
import DeviceFrame from './DeviceFrame.astro';
import { APP_STORE_URL } from '../config';   // ADD THIS LINE
---
```

**Badge block to add after the `.hero-device` div** (modelled on `LandingCTA.astro` lines 49-67, with Hero-specific adjustments):
```astro
<!-- App Store badge — below device mockup, above the fold so loading="eager" -->
<div class="flex justify-center" style="margin-top: var(--space-xl);">
  <a
    href={APP_STORE_URL}
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Download Tuwa on the App Store"
    class="inline-block"
  >
    <img
      src="/badges/app-store-badge.svg"
      alt="Download on the App Store"
      height="40"
      width="120"
      loading="eager"
    />
  </a>
</div>
```

**Key differences from LandingCTA:**
- `loading="eager"` (not `lazy`) — badge is above the fold in the hero
- No `btn-cta` class on the anchor — the official Apple SVG provides its own visual chrome
- No `flex-col sm:flex-row` wrapper needed — Hero shows badge only (no QR block)

**Animation note:** The hero entrance animations in `global.css` target `.hero-headline`, `.hero-subtitle`, and `.hero-device` by class name. The new badge div has no animation class, so it renders statically unless a `.hero-badge` animation is added (at Claude's discretion, delay ~500ms to sequence after device).

---

### `src/components/LandingCTA.astro` (component — update badge dimensions)

**Analog:** `src/components/FeatureCTA.astro` (identical badge img tag pattern)

**Current badge img** (`LandingCTA.astro` lines 60-66):
```astro
<img
  src="/badges/app-store-badge.svg"
  alt="Download on the App Store"
  height="44"
  width="148"
  loading="lazy"
/>
```

**Target state** (only `height` and `width` change):
```astro
<img
  src="/badges/app-store-badge.svg"
  alt="Download on the App Store"
  height="40"
  width="120"
  loading="lazy"
/>
```

**Anchor wrapper** (`LandingCTA.astro` lines 53-59) — no changes needed:
```astro
<a
  href={APP_STORE_URL}
  target="_blank"
  rel="noopener noreferrer"
  aria-label="Download Tuwa on the App Store"
  class="btn-cta inline-block"
>
```

**Note on `btn-cta` class:** LandingCTA and FeatureCTA intentionally keep `btn-cta` on the badge anchor. The green button background wraps the badge, which is an existing design choice. Only the Footer anchor should have `btn-cta` removed (see Footer section below). Do not change this class here.

---

### `src/components/FeatureCTA.astro` (component — update badge dimensions)

**Analog:** `src/components/LandingCTA.astro` (identical badge img tag — mutual analogs)

**Current badge img** (`FeatureCTA.astro` lines 49-54):
```astro
<img
  src="/badges/app-store-badge.svg"
  alt="Download on the App Store"
  height="44"
  width="148"
  loading="lazy"
/>
```

**Target state** (same as LandingCTA — only dimensions change):
```astro
<img
  src="/badges/app-store-badge.svg"
  alt="Download on the App Store"
  height="40"
  width="120"
  loading="lazy"
/>
```

---

### `src/components/Footer.astro` (component — replace text CTA with badge)

**Analog:** `src/components/LandingCTA.astro` lines 53-67 (badge anchor pattern)

**Current text CTA** (`Footer.astro` lines 17-24 — the "Get the App" button):
```astro
<a
  href="https://apps.apple.com/app/tuwa"
  rel="noopener noreferrer"
  aria-label="Download Tuwa on the App Store"
  class="btn-cta inline-flex items-center gap-2"
  style="background-color: var(--color-accent); color: var(--color-accent-fg); border-radius: var(--radius-md); padding: var(--space-sm) var(--space-md); font-weight: 600; text-decoration: none;"
>
  Get the App
</a>
```

**Target state** — replace entire anchor with badge version:
```astro
<a
  href={APP_STORE_URL}
  target="_blank"
  rel="noopener noreferrer"
  aria-label="Download Tuwa on the App Store"
  class="inline-block"
>
  <img
    src="/badges/app-store-badge.svg"
    alt="Download on the App Store"
    height="40"
    width="120"
    loading="lazy"
  />
</a>
```

**Import to add** at top of Footer.astro frontmatter:
```astro
---
import { APP_STORE_URL } from '../config';
const year = new Date().getFullYear();
---
```

**Critical differences from current Footer anchor:**
- Remove `btn-cta` class — the green button background would visually clash with the black Apple badge SVG
- Remove inline `style` attribute — badge provides its own visual chrome
- Remove hardcoded `href="https://apps.apple.com/app/tuwa"` — use `APP_STORE_URL` from config
- Add `target="_blank"` (matches LandingCTA and FeatureCTA convention)
- `loading="lazy"` is correct here — Footer is below the fold

---

### `src/styles/global.css` (config/style — responsive fixes)

**Analog:** Existing responsive blocks within same file (self-referential)

**Existing breakpoint pattern to follow** (`global.css` lines 100-105 — `.section-spaced` responsive):
```css
/* Mobile-first: set mobile value on the class, override at min-width: 768px */
.some-class {
  property: mobile-value;
}
@media (min-width: 768px) {
  .some-class {
    property: desktop-value;
  }
}
```

**Existing max-width breakpoints for small mobile** (`global.css` lines 427-438):
```css
@media (min-width: 480px) and (max-width: 767px) {
  .wheel-container { width: 360px; height: 360px; }
}
@media (max-width: 479px) {
  .wheel-container { width: 280px; height: 280px; }
}
```

**Fluid sizing pattern to add — hero headline** (Claude's discretion, D-06):
```css
/* Prevents 48px display text from overflowing at 375px without adding a new breakpoint */
/* Add after the existing hero animation block (~line 341) */
.hero-headline {
  font-size: clamp(32px, 7vw, 48px);
}
```
Note: The `animation` property already targets `.hero-headline` in the `@media (prefers-reduced-motion: no-preference)` block at lines 308-313. The `font-size` override must be outside the media query so it applies in all motion-preference states.

**Max-width 1440 container cap pattern** (D-07):
The existing `<main>` in `BaseLayout.astro` (line 32) has no `max-width`. Add via Tailwind class on `<main>` in BaseLayout (see BaseLayout section below), OR add CSS:
```css
/* Option A: CSS in global.css — add near the body base styles */
main {
  max-width: 1440px;
  margin-left: auto;
  margin-right: auto;
}
```

**Overflow guard — add to body** (addresses Pitfall 4 from RESEARCH.md):
```css
/* Prevents horizontal scroll from any component that slightly exceeds viewport width */
/* Add to the body rule block (lines 72-80) */
body {
  /* existing properties... */
  overflow-x: hidden;
}
```

**Pattern: existing animation guard** (lines 205-215, `@media (prefers-reduced-motion: no-preference)`):
All animation CSS uses this wrapper — any new CSS animations or transitions should follow this pattern:
```css
@media (prefers-reduced-motion: no-preference) {
  .new-element {
    transition: property 150ms ease;
  }
}
```

---

### `src/layouts/BaseLayout.astro` (layout — max-width cap on `<main>`)

**Analog:** Existing `<main>` element in same file (self-referential)

**Current `<main>`** (`BaseLayout.astro` line 32):
```astro
<main>
  <slot />
</main>
```

**Target state** — add Tailwind max-width + centering classes (D-07, consistent with `max-w-6xl mx-auto` pattern used in section containers):
```astro
<main class="max-w-[1440px] mx-auto w-full">
  <slot />
</main>
```

**Pattern reference** — all section containers use this centering convention (`LandingCTA.astro` line 21):
```astro
<div class="section-spaced mx-auto max-w-6xl px-6">
```

---

## Shared Patterns

### Config import — `APP_STORE_URL`
**Source:** `src/config.ts` line 4
**Apply to:** Hero.astro (new import), Footer.astro (new import)
**LandingCTA and FeatureCTA already import it — no change needed**
```typescript
export const APP_STORE_URL = 'https://apps.apple.com/app/tuwa';
```
Usage in component frontmatter:
```astro
---
import { APP_STORE_URL } from '../config';
---
```

### Badge img tag — official dimensions
**Source:** Research-verified Apple SVG dimensions (RESEARCH.md Pattern 1)
**Apply to:** All four badge locations — Hero (new), LandingCTA (update), FeatureCTA (update), Footer (new)
```astro
<img
  src="/badges/app-store-badge.svg"
  alt="Download on the App Store"
  height="40"
  width="120"
  loading="lazy"   <!-- "eager" in Hero only -->
/>
```

### Badge anchor — plain link (no btn-cta)
**Source:** LandingCTA pattern adapted for badge-only use (RESEARCH.md Pitfall 5)
**Apply to:** Hero.astro and Footer.astro (components that currently do NOT have btn-cta on badge, or where btn-cta must be removed)
```astro
<a
  href={APP_STORE_URL}
  target="_blank"
  rel="noopener noreferrer"
  aria-label="Download Tuwa on the App Store"
  class="inline-block"
>
```

### Mobile-first responsive pattern
**Source:** `src/styles/global.css` lines 96-105
**Apply to:** Any new responsive CSS rules in global.css for this phase
```css
/* Mobile default (no query) */
.element { property: mobile-value; }

/* Desktop override */
@media (min-width: 768px) {
  .element { property: desktop-value; }
}

/* Small mobile only (must not be overused — D-05 locks breakpoints) */
@media (max-width: 479px) {
  .element { property: small-mobile-value; }
}
```

### Reduced-motion guard
**Source:** `src/styles/global.css` lines 205-215
**Apply to:** Any new transition/animation CSS added in this phase
```css
@media (prefers-reduced-motion: no-preference) {
  .element {
    transition: property 150ms ease;
  }
}
```

---

## No Analog Found

No files in this phase lack a close codebase analog. All changes are modifications to existing files following established patterns.

---

## Deployment Notes (not code patterns — for planner reference)

These are configuration steps, not code changes. No file analogs apply:

| Action | Where | Notes |
|--------|-------|-------|
| Create Cloudflare Pages project | CF dashboard | Build cmd: `npm run build`, output: `dist` |
| Set `NODE_VERSION=22` env var | CF Pages build env | Belt-and-suspenders per D-10; V3 defaults to Node 22 anyway |
| Add custom domain `tuwa.app` | CF Pages > Custom domains | Do NOT create CNAME manually first — dashboard auto-creates it for same-account zones |
| Verify `_redirects` file | `public/_redirects` | Already correct — no changes needed (lines 1-3) |
| Verify no `@astrojs/cloudflare` adapter | `astro.config.mjs` | Already absent — no changes needed |

---

## Metadata

**Analog search scope:** `src/components/`, `src/styles/`, `src/layouts/`, `public/`
**Files read:** 10 (Hero.astro, LandingCTA.astro, FeatureCTA.astro, Footer.astro, global.css, BaseLayout.astro, config.ts, astro.config.mjs, public/badges/app-store-badge.svg, public/_redirects)
**Pattern extraction date:** 2026-05-14
