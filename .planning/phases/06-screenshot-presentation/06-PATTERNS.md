# Phase 6: Screenshot Presentation - Pattern Map

**Mapped:** 2026-05-11
**Files analyzed:** 5 (1 new, 4 modified)
**Analogs found:** 5 / 5

---

## File Classification

| New/Modified File | Role | Data Flow | Closest Analog | Match Quality |
|-------------------|------|-----------|----------------|---------------|
| `src/components/DeviceFrame.astro` | component | request-response (build-time render) | `src/components/ScreenshotBlock.astro` | role-match (same image + placeholder pattern, upgrading chrome) |
| `src/layouts/FeaturePageLayout.astro` | layout | request-response | `src/layouts/CoachingPageLayout.astro` | exact (identical structure at swap point) |
| `src/layouts/CoachingPageLayout.astro` | layout | request-response | `src/layouts/FeaturePageLayout.astro` | exact (identical structure at swap point) |
| `src/components/Hero.astro` | component | request-response | `src/components/ScreenshotBlock.astro` | role-match (same eager Image usage, wrapping upgrade needed) |
| `src/styles/global.css` | config | — | `src/styles/global.css` (self — add CSS rules) | exact (adding `.device-frame` CSS block to existing file) |

---

## Pattern Assignments

### `src/components/DeviceFrame.astro` (component, build-time render) — NEW

**Analog:** `src/components/ScreenshotBlock.astro`

**Imports pattern** (lines 1-2 of ScreenshotBlock.astro):
```astro
---
import { Image } from 'astro:assets';
```

**Props interface pattern** (lines 3-9 of ScreenshotBlock.astro):
```astro
interface Props {
  src?: ImageMetadata;
  alt: string;
  placeholderLabel?: string;
  isFramed?: boolean;
}
```
DeviceFrame replaces `isFramed` with `loading`, `fetchpriority`, `widths`, and `class` props. Keep `src?: ImageMetadata` optional — that is the established convention for placeholder support.

**Core conditional pattern** (lines 14-44 of ScreenshotBlock.astro):
```astro
{src ? (
  <Image
    src={src}
    alt={alt}
    width={320}
    quality={90}
    format="webp"
    style="..."
  />
) : (
  <div
    role="img"
    aria-label={alt}
    style="
      background-color: var(--color-surface);
      border-radius: var(--radius-lg);
      aspect-ratio: 9/19.5;
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--color-text-3);
      font-size: var(--text-label);
      text-align: center;
      padding: var(--space-md);
    "
  >
    {placeholderLabel}
  </div>
)}
```
DeviceFrame copies this exact `{src ? <Image> : <placeholder>}` branch. Changes:
- Replace `width={320} format="webp"` with `widths={[320, 640]} sizes="..."` (D-08)
- Replace `background-color: var(--color-surface)` placeholder with gradient `#E4E0DB → #CFCBC5` and label color `var(--color-text-3)` (D-04)
- Wrap both branches in the CSS iPhone frame chrome

**Design token usage** (from `src/styles/global.css` lines 1-61):
```css
/* Use these existing tokens inside DeviceFrame inline styles: */
--color-text-3:   #AFABA5;  /* placeholder label color */
--color-surface:  #EDEAE6;  /* fallback surface if gradient not used */
--color-surface-el: #E4E0DB; /* gradient start for placeholder */
--color-divider:  #CFCBC5;  /* gradient end for placeholder */
--text-label:     13px;     /* placeholder font size */
--tracking-label: 0.06em;   /* placeholder letter spacing */
```
Frame chrome color is `#1A1A1A` (D-02) — not a design token, it is a hardware color. Do not tokenize it.

**Responsive width pattern** (from `src/components/FeatureGrid.astro` line 43):
```astro
<ul class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
```
DeviceFrame uses the same Tailwind breakpoint prefix pattern for fluid width:
```astro
<div class="mx-auto w-full max-w-[260px] sm:max-w-[300px] lg:max-w-[320px]">
```
This follows the project convention of Tailwind responsive utilities with arbitrary value brackets.

**aspect-ratio pattern** (line 31 of ScreenshotBlock.astro):
```astro
aspect-ratio: 9/19.5;
```
Carry forward identically onto the inner screen div in DeviceFrame. Add `overflow: hidden` on the same div (pitfall #2 from RESEARCH.md).

---

### `src/layouts/FeaturePageLayout.astro` (layout, request-response) — MODIFIED

**Analog:** `src/layouts/CoachingPageLayout.astro` (identical swap point structure)

**Current import to replace** (lines 3-4 of FeaturePageLayout.astro):
```astro
import ScreenshotBlock from '../components/ScreenshotBlock.astro';
```

**New import:**
```astro
import DeviceFrame from '../components/DeviceFrame.astro';
```

**Current usage at swap point** (line 51 of FeaturePageLayout.astro):
```astro
<ScreenshotBlock src={screenshot} alt={screenshotAlt} placeholderLabel={`${title} Screenshot — coming soon`} />
```

**New usage:**
```astro
<DeviceFrame src={screenshot} alt={screenshotAlt} placeholderLabel="Coming soon" />
```
Props flow from existing `screenshot?: ImageMetadata` and `screenshotAlt: string` layout props (lines 11-12). No new props on the layout itself — all new props live in DeviceFrame.

**Section wrapper context** (lines 49-52 of FeaturePageLayout.astro):
```astro
<!-- Screenshot -->
<section data-animate style="padding-bottom: var(--space-3xl);">
  <ScreenshotBlock ... />
</section>
```
Preserve `data-animate` and `padding-bottom: var(--space-3xl)` — these are not changing. Only the inner component swaps.

---

### `src/layouts/CoachingPageLayout.astro` (layout, request-response) — MODIFIED

**Analog:** `src/layouts/FeaturePageLayout.astro` (identical at swap point)

Identical swap pattern to FeaturePageLayout. Lines 3, 51 change in the same way.

**Current usage at swap point** (line 51 of CoachingPageLayout.astro):
```astro
<ScreenshotBlock src={screenshot} alt={screenshotAlt} placeholderLabel={`${title} Screenshot — coming soon`} />
```

**New usage:**
```astro
<DeviceFrame src={screenshot} alt={screenshotAlt} placeholderLabel="Coming soon" />
```
coaching.astro and cold-start.astro pass no `screenshot` prop — `src` will be `undefined`, triggering the placeholder branch in DeviceFrame (D-04).

---

### `src/components/Hero.astro` (component, request-response) — MODIFIED

**Analog:** `src/components/ScreenshotBlock.astro` (Image import), `src/layouts/FeaturePageLayout.astro` (component swap pattern)

**Current import block** (lines 1-4 of Hero.astro):
```astro
---
import { Image } from 'astro:assets';
import dashboardScreenshot from '../assets/screenshots/dashboard.png';
---
```
Keep both imports. Add `DeviceFrame` import:
```astro
import DeviceFrame from './DeviceFrame.astro';
```

**Current device mockup block** (lines 40-53 of Hero.astro):
```astro
<div
  class="relative mx-auto"
  style="margin-top: var(--space-2xl); max-width: 320px;"
>
  <Image
    src={dashboardScreenshot}
    alt="Tuwa app showing today's recovery score of 82 — HRV in green zone, sleep 7.5 hours."
    width={320}
    quality={90}
    format="webp"
    loading="eager"
    class="rounded-[44px]"
  />
</div>
```

**Replace with** (D-05 perspective tilt on wrapper, D-09 eager/fetchpriority on DeviceFrame):
```astro
<div
  class="relative mx-auto"
  style="
    margin-top: var(--space-2xl);
    max-width: 320px;
    transform: perspective(1200px) rotateY(-4deg) rotateX(2deg);
  "
>
  <DeviceFrame
    src={dashboardScreenshot}
    alt="Tuwa app showing today's recovery score of 82 — HRV in green zone, sleep 7.5 hours."
    loading="eager"
    fetchpriority="high"
    widths={[320, 640, 960]}
  />
</div>
```
The `perspective()` transform stays on the outer `<div>` — never on DeviceFrame itself (pitfall #4 from RESEARCH.md). The `dashboardScreenshot` import stays — no framed variant (pitfall #5).

**Spacing token pattern** (lines 41 of Hero.astro — `var(--space-2xl)`):
All margin/padding values in Hero.astro use `var(--space-*)` tokens. Continue this pattern for any spacing added around the DeviceFrame wrapper.

---

### `src/styles/global.css` (config) — MODIFIED

**Analog:** `src/styles/global.css` itself (adding CSS block after existing rules)

**Existing CSS structure to append after** (end of file, after line 104):
```css
/* Scroll-triggered reveal animations -- JS-gated (D-02) + strict reduced-motion (D-03) */
@media (prefers-reduced-motion: no-preference) { ... }
@media (prefers-reduced-motion: reduce) { ... }
```

**Add device frame pseudo-element CSS** (new block at end of file):
```css
/* CSS-only iPhone 15 Pro device frame — DeviceFrame.astro */
/* Side buttons via pseudo-elements: volume (left) via ::before, power (right) via ::after */
.device-frame {
  position: relative;
}
.device-frame::before {
  content: '';
  position: absolute;
  left: -4px;
  top: 80px;
  width: 4px;
  height: 28px;
  background: #1A1A1A;
  border-radius: 2px 0 0 2px;
  box-shadow: 0 34px 0 #1A1A1A; /* second volume button */
}
.device-frame::after {
  content: '';
  position: absolute;
  right: -4px;
  top: 100px;
  width: 4px;
  height: 42px;
  background: #1A1A1A;
  border-right: 2px solid #2A2A2A;
  border-radius: 0 2px 2px 0;
}
```
Note: pixel offsets (top: 80px / 100px) are proportional approximations (RESEARCH.md Assumption A1) — verify visually during implementation and adjust. The `.device-frame` class is applied to the frame body div inside DeviceFrame.astro.

---

## Shared Patterns

### Image component usage
**Source:** `src/components/ScreenshotBlock.astro` lines 14-24, `src/components/Hero.astro` lines 44-52
**Apply to:** DeviceFrame.astro `<Image>` usage

Current pattern uses `width={320} format="webp"` — fixed size, single format. Replace with:
```astro
<Image
  src={src}
  alt={alt}
  widths={widths}
  sizes="(min-width: 1024px) 320px, (min-width: 640px) 300px, 260px"
  loading={loading}
  fetchpriority={fetchpriority}
  style="width: 100%; height: 100%; object-fit: cover; display: block;"
/>
```
Drop `format="webp"` — Astro 6 generates WebP automatically. Drop `quality={90}` unless a specific quality override is needed. The `widths` prop drives srcset; `sizes` tells the browser which variant to pick.

### Design token consumption
**Source:** `src/styles/global.css` `:root` block (lines 10-61)
**Apply to:** DeviceFrame.astro inline styles

Always use CSS custom properties for colors and spacing where a design token exists. Use bare hex (`#1A1A1A`) only for hardware chrome colors that have no token equivalent. Examples from ScreenshotBlock.astro:
```astro
style="
  background-color: var(--color-surface);
  color: var(--color-text-3);
  font-size: var(--text-label);
  padding: var(--space-md);
"
```

### Placeholder pattern
**Source:** `src/components/ScreenshotBlock.astro` lines 26-44
**Apply to:** DeviceFrame.astro placeholder branch

Established placeholder uses `role="img"` + `aria-label` on the container div (no `<img>` tag). DeviceFrame copies this exactly. Upgrade the background from `var(--color-surface)` solid to `linear-gradient(#E4E0DB, #CFCBC5)` per D-04.

### data-animate section wrapping
**Source:** `src/layouts/FeaturePageLayout.astro` lines 49-52, `src/layouts/CoachingPageLayout.astro` lines 49-52
**Apply to:** Both layout files (preserve unchanged)

```astro
<section data-animate style="padding-bottom: var(--space-3xl);">
  <!-- component goes here -->
</section>
```
The `data-animate` attribute is consumed by the IntersectionObserver script (global.css lines 85-103). Do not remove it from the section wrapper during the component swap.

### Responsive Tailwind utilities
**Source:** `src/components/FeatureGrid.astro` line 43
**Apply to:** DeviceFrame.astro outer wrapper div

Use `sm:` and `lg:` breakpoint prefixes with arbitrary bracket values for responsive max-width:
```astro
class="mx-auto w-full max-w-[260px] sm:max-w-[300px] lg:max-w-[320px]"
```

---

## No Analog Found

All files in this phase have close analogs. No files require fallback to RESEARCH.md patterns alone.

| File | Note |
|------|------|
| `src/styles/global.css` addition | CSS pseudo-element block for `.device-frame::before/::after` is a new pattern with no existing analog in this codebase. Use RESEARCH.md Code Examples section ("CSS-only side buttons via pseudo-elements") as the reference, then verify pixel offsets visually. |

---

## Metadata

**Analog search scope:** `src/components/`, `src/layouts/`, `src/styles/`
**Files scanned:** 10 components, 2 layouts, 1 stylesheet, 1 UI-SPEC
**Pattern extraction date:** 2026-05-11
