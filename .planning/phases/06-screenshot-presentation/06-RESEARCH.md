# Phase 6: Screenshot Presentation - Research

**Researched:** 2026-05-11
**Domain:** CSS device frames, Astro image optimization, Retina/DPR screenshot handling
**Confidence:** HIGH

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

- **D-01:** Detailed CSS-only iPhone bezel — visible frame border, side buttons (volume/power as
  pseudo-elements), dynamic island/camera cutout at top. Pure CSS, no SVG overlay or image assets.
  Should look realistic enough to read as "iPhone" at a glance.
- **D-02:** Dark frame color (near-black or very dark gray) to contrast against warm travertine page
  background.
- **D-03:** Use existing screenshots as-is — they're already 1206–1320px wide (~3x for iPhone 15
  Pro at 393pt). No manual re-export step needed.
- **D-04:** Pages without screenshots (coaching, cold-start) get the DeviceFrame component with a
  styled placeholder inside (gradient background + "Coming soon" text). Ship the frame now, add
  real screenshots later.
- **D-08:** Use Astro `<Image>` component with proper `widths` prop for srcset/DPR handling —
  replace the fixed `width={320}` approach in current ScreenshotBlock.
- **D-09:** Hero image must have `loading="eager"` and `fetchpriority="high"` — it's the LCP
  element. Feature page screenshots use default lazy loading.

### Claude's Discretion

- Exact frame dimensions, border widths, and corner radii (specified in UI-SPEC)
- Whether to include a home indicator bar at bottom of frame
- Responsive breakpoint sizing strategy (fixed vs fluid)
- Hero perspective angle or shadow enhancement level (specified in UI-SPEC)
- Placeholder styling for missing screenshots

### Deferred Ideas (OUT OF SCOPE)

- Matisse illustration system — full implementation of Matisse-inspired black cut-out figures as
  site-wide artistic accents. Belongs in Phase 8.
- Coaching + cold-start screenshots — real screenshot exports from Xcode Simulator to replace
  placeholders. Separate task when app screens are finalized.
</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| SHOT-01 | Re-export all app screenshots at 3x resolution from Xcode Simulator | VERIFIED: Existing screenshots already meet 3x threshold (1206–1320px wide at 320px CSS display = 3.76–4.12x). Decision D-03 locks this as no-action per CONTEXT.md. SHOT-01 is satisfied by the existing assets; no re-export needed. |
| SHOT-02 | Implement proper srcset/DPR handling via Astro `<Image>` component | VERIFIED: Astro `<Image>` widths prop generates srcset entries (e.g., `widths={[320, 640, 960]}`). Hero: [320,640,960]; feature pages: [320,640]. UI-SPEC specifies exact values. |
| SHOT-03 | Build CSS-only iPhone device frame component (DeviceFrame.astro) | VERIFIED: CSS-only approach confirmed viable; full dimension spec in UI-SPEC. Dynamic Island via positioned div, side buttons via ::before/::after pseudo-elements. |
| SHOT-04 | Replace ScreenshotBlock with DeviceFrame across all feature pages | VERIFIED: Exact swap points identified — FeaturePageLayout.astro line 51, CoachingPageLayout.astro line 51, Hero.astro line 44. 5 feature pages total. |
| SHOT-05 | Generate polished hero mockup images via Screenhance or equivalent tool | VERIFIED (D-05): CONTEXT.md delegates hero frame treatment to Claude's discretion — may be same DeviceFrame component with perspective tilt rather than a Screenhance-generated image. UI-SPEC specifies `perspective(1200px) rotateY(-4deg) rotateX(2deg)` on hero wrapper. |
</phase_requirements>

---

## Summary

Phase 6 has two tightly coupled deliverables: a new `DeviceFrame.astro` component and updated
image optimization across all pages that currently use `ScreenshotBlock.astro`.

The CSS-only iPhone frame is the centerpiece. The UI-SPEC has already been approved with exact
pixel dimensions derived from iPhone 15 Pro proportions — 44px outer corner radius, 10px frame
border, 280–320px fluid width, dynamic island, side buttons as pseudo-elements, home indicator
pill. The frame color is `#1A1A1A` (near-black) against the `#F4F1ED` travertine background.

The existing screenshots are already high enough resolution: 1206–1320px source width displayed at
maximum 320px CSS gives 3.76–4.12x effective density, well above the 3x Retina threshold. SHOT-01
(re-export at 3x) is therefore satisfied by existing assets per D-03. No re-export step is needed.
The Astro `<Image>` widths prop drives srcset generation — switching from the current `width={320}`
fixed approach to `widths={[320, 640, 960]}` for the hero and `widths={[320, 640]}` for feature
pages generates WebP/AVIF srcset entries the browser selects based on DPR.

The hero frame gets one CSS enhancement: subtle perspective tilt on the outer wrapper div (not on
the DeviceFrame component itself), making the hero feel premium without introducing animation
(Phase 7 scope).

**Primary recommendation:** Build `DeviceFrame.astro` first (with exact dimensions from UI-SPEC),
then do a single-pass swap of `ScreenshotBlock` → `DeviceFrame` in both layout files and Hero.astro.

---

## Architectural Responsibility Map

| Capability | Primary Tier | Secondary Tier | Rationale |
|------------|-------------|----------------|-----------|
| CSS device frame chrome | Browser / Client | — | Pure CSS component, no server logic |
| Image format/srcset generation | Frontend Server (SSR/build) | CDN / Static | Astro processes at build time via Sharp; CDN serves WebP/AVIF |
| LCP priority hints | Browser / Client | — | `loading="eager"` + `fetchpriority="high"` are HTML attrs consumed by browser |
| Placeholder rendering | Browser / Client | — | Conditional in Astro template, rendered at build time |
| Responsive sizing | Browser / Client | — | CSS fluid widths + Tailwind breakpoints |

---

## Standard Stack

### Core

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Astro `<Image>` | 6.3.1 (built-in) | Image optimization, srcset/WebP/AVIF | First-party, already used in Hero.astro and ScreenshotBlock. No additional install. |
| Tailwind CSS v4 | 4.3.0 (installed) | Responsive layout utilities | Already installed; `@tailwindcss/vite` integration active. |

[VERIFIED: npm registry + package.json] Astro 6.3.1 is installed. No new packages needed for this phase.

### Supporting

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| CSS pseudo-elements (native) | N/A | Side button chrome on DeviceFrame | Volume/power buttons via ::before/::after on left/right frame edges |
| Sharp (bundled with Astro) | bundled | WebP/AVIF image processing at build | Invoked automatically when `<Image>` or `<Picture>` is used |

### Alternatives Considered

| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| CSS-only frame (D-01 locked) | SVG overlay or PNG bezel image | SVG/image approach is simpler to author but adds a network request and can't be styled with CSS design tokens. CSS-only is zero KB, tokenized, and matches the project's no-asset philosophy. |
| Astro `<Image>` with widths | `<Picture>` with formats prop | `<Picture>` gives more control over format order but adds `<source>` tags. `<Image>` with widths is sufficient here since Astro auto-generates WebP. |
| Fluid CSS frame width | Fixed 320px (current ScreenshotBlock) | Fixed width doesn't adapt to mobile viewports < 320px. Fluid approach (UI-SPEC: 260px mobile, 300px tablet, 320px desktop) is responsive without complexity. |

**Installation:** No new packages required for this phase.

---

## Architecture Patterns

### System Architecture Diagram

```
Feature Page .astro
  │
  ├── FeaturePageLayout.astro  ──────────────────────────────────────────┐
  │     └── [line 51] <DeviceFrame>                                      │
  │           ├── screenshot prop → <Image widths={[320,640]} />         │
  │           └── no screenshot → <placeholder div>                      │
  │                                                                      │
  ├── CoachingPageLayout.astro ──────────────────────────────────────────┤
  │     └── [line 51] <DeviceFrame>  (same swap)                         │
  │                                                                      │
  └── Hero.astro ────────────────────────────────────────────────────────┘
        └── <div style="perspective + tilt transform">
              └── <DeviceFrame>
                    └── <Image loading="eager" fetchpriority="high"
                               widths={[320,640,960]} />

Build pipeline:
  <Image> widths prop
    → Sharp processes source PNG
    → Emits WebP/AVIF at each width
    → Renders <img srcset="...640w, ...960w" sizes="...">
    → Browser picks correct variant based on DPR + viewport
```

### Recommended Project Structure

```
src/
├── components/
│   ├── DeviceFrame.astro    # NEW — replaces ScreenshotBlock
│   └── ScreenshotBlock.astro  # RETIRED — can be deleted after swap
├── layouts/
│   ├── FeaturePageLayout.astro   # UPDATED — swap import + usage
│   └── CoachingPageLayout.astro  # UPDATED — swap import + usage
├── pages/
│   └── features/
│       ├── recovery-scoring.astro   # no change (passes screenshot prop)
│       ├── workload-tracking.astro  # no change (passes screenshot prop)
│       ├── smart-templates.astro    # no change (passes screenshot prop)
│       ├── coaching.astro           # no change (no screenshot prop = placeholder)
│       └── cold-start.astro         # no change (no screenshot prop = placeholder)
└── assets/
    └── screenshots/
        ├── dashboard.png       # 1320x2868 — hero (VERIFIED: meets 3x)
        ├── recovery.png        # 1206x2622 — feature (VERIFIED: meets 3x)
        ├── workload.png        # 1206x2622 — feature (VERIFIED: meets 3x)
        └── active-workout.png  # 1206x2622 — feature (VERIFIED: meets 3x)
```

### Pattern 1: DeviceFrame Component Structure

**What:** A pure CSS iPhone 15 Pro bezel that accepts either an `<Image>` or renders a placeholder.
**When to use:** Every screenshot display on the site.

```astro
<!-- src/components/DeviceFrame.astro -->
---
import { Image } from 'astro:assets';
import type { ImageMetadata } from 'astro';

interface Props {
  src?: ImageMetadata;
  alt: string;
  placeholderLabel?: string;
  loading?: 'lazy' | 'eager';
  fetchpriority?: 'auto' | 'high' | 'low';
  widths?: number[];
  class?: string;
}

const {
  src,
  alt,
  placeholderLabel = 'Coming soon',
  loading = 'lazy',
  fetchpriority = 'auto',
  widths = [320, 640],
  class: className,
} = Astro.props;
---

<!-- Outer wrapper — fluid responsive width via CSS custom property -->
<div
  class={`device-frame-wrapper ${className ?? ''}`}
  style="
    /* D-07: fluid 260px mobile → 300px tablet → 320px desktop */
    width: 100%;
    max-width: 260px;
    margin-left: auto;
    margin-right: auto;
  "
>
  <!-- Frame body — #1A1A1A per D-02 and UI-SPEC -->
  <div
    class="device-frame"
    style="
      position: relative;
      background-color: #1A1A1A; /* D-02: near-black, iPhone Space Black */
      border-radius: 44px;       /* UI-SPEC outer radius */
      padding: 12px 10px 10px;  /* UI-SPEC: frame border width */
      box-shadow:
        inset 0 1px 0 rgba(255,255,255,0.08), /* metal edge reflection */
        0 24px 64px rgba(28,25,21,0.22),
        0 4px 16px rgba(28,25,21,0.12);
    "
  >
    <!-- Side buttons: volume (left) and power (right) via pseudo-elements in CSS -->
    <!-- Dynamic Island -->
    <div
      aria-hidden="true"
      style="
        position: absolute;
        top: 22px;    /* 12px frame + 10px into screen area */
        left: 50%;
        transform: translateX(-50%);
        width: 120px;
        height: 34px;
        background: #0D0D0D;
        border-radius: 20px;
        z-index: 2;
      "
    ></div>

    <!-- Screen area -->
    <div
      style="
        border-radius: 36px;  /* UI-SPEC inner radius */
        overflow: hidden;
        aspect-ratio: 9 / 19.5;
        position: relative;
        background: #000;
      "
    >
      {src ? (
        <Image
          src={src}
          alt={alt}
          widths={widths}
          sizes="(min-width: 1024px) 320px, (min-width: 640px) 300px, 260px"
          loading={loading}
          fetchpriority={fetchpriority}
          style="width: 100%; height: 100%; object-fit: cover; display: block;"
        />
      ) : (
        <div
          role="img"
          aria-label={alt}
          style="
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            background: linear-gradient(#E4E0DB, #CFCBC5);
            color: var(--color-text-3);
            font-size: 13px;
            text-transform: uppercase;
            letter-spacing: 0.06em;
          "
        >
          {placeholderLabel}
        </div>
      )}
    </div>

    <!-- Home indicator -->
    <div
      aria-hidden="true"
      style="
        width: 120px;
        height: 5px;
        background: rgba(255,255,255,0.3);
        border-radius: 3px;
        margin: 8px auto 0;
      "
    ></div>
  </div>
</div>
```

[ASSUMED] — Exact CSS approach for side buttons (::before/::after on .device-frame) vs. explicit div elements. Either works; pseudo-elements are cleaner. Implementation choice left to task execution.

### Pattern 2: FeaturePageLayout Swap

**What:** Replace `ScreenshotBlock` import and usage with `DeviceFrame` in both layout files.
**When to use:** Single change point that propagates to all 5 feature pages automatically.

```astro
<!-- FeaturePageLayout.astro — diff only -->
- import ScreenshotBlock from '../components/ScreenshotBlock.astro';
+ import DeviceFrame from '../components/DeviceFrame.astro';

<!-- line 51: -->
- <ScreenshotBlock src={screenshot} alt={screenshotAlt} placeholderLabel={`${title} Screenshot — coming soon`} />
+ <DeviceFrame src={screenshot} alt={screenshotAlt} placeholderLabel="Coming soon" />
```

[VERIFIED: codebase] FeaturePageLayout.astro line 51 confirmed. CoachingPageLayout.astro line 51 is identical pattern.

### Pattern 3: Hero.astro Swap with Perspective Enhancement

**What:** Wrap DeviceFrame in a perspective div in Hero.astro.
**When to use:** Hero section only — D-05 discretion for premium feel.

```astro
<!-- Hero.astro — diff only -->
- import dashboardScreenshot from '../assets/screenshots/dashboard.png';
  [keep import]

<!-- replace the <div class="relative mx-auto"> block: -->
<div
  class="relative mx-auto"
  style="
    margin-top: var(--space-2xl);
    max-width: 320px;
    /* D-05: subtle perspective tilt — hero only, not feature pages */
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

[VERIFIED: codebase] Hero.astro line 44 confirmed. `loading="eager"` was already present on the prior Image tag — carry forward to DeviceFrame prop.

### Pattern 4: Responsive Frame Sizing via Tailwind Breakpoints

**What:** Apply fluid width via Tailwind responsive max-width classes on the outer wrapper.
**When to use:** Default for all DeviceFrame instances.

```astro
<!-- On the device-frame-wrapper div, add Tailwind classes: -->
<div class="mx-auto w-full max-w-[260px] sm:max-w-[300px] lg:max-w-[320px]">
```

This replaces inline max-width style with Tailwind responsive utilities.
[VERIFIED: codebase] Tailwind v4 with `@tailwindcss/vite` is configured and functional.

### Anti-Patterns to Avoid

- **Fixed `width={320}` on `<Image>` without widths prop:** The current ScreenshotBlock uses `width={320}` and emits a single fixed-resolution image. At 3x DPR, this renders a 320px image upscaled — visible blur. Use `widths={[320, 640]}` instead to emit srcset.
- **Doubled device frame:** The prior `isFramed` approach used `Dashboard_framed.png` (a screenshot with a baked-in frame) + CSS border, resulting in two frames. The new DeviceFrame receives raw screenshots only. Do not pass any `_framed.png` assets to DeviceFrame.
- **Applying perspective to DeviceFrame component itself:** The tilt is a hero-specific wrapper concern. DeviceFrame renders flat — the perspective div wraps it in Hero.astro only.
- **Adding `aria-hidden` to screenshots:** Screenshots convey meaningful app content. They need descriptive alt text, not `aria-hidden`.
- **Setting `fetchpriority="high"` on feature page screenshots:** Only the hero is LCP. Feature page images should use default lazy loading to avoid competing with LCP for network bandwidth.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| WebP/AVIF generation | Custom Sharp pipeline, build script | Astro `<Image>` with `widths` prop | Astro invokes Sharp automatically at build; handles format negotiation, hash-based cache busting, and `srcset` attribute generation |
| srcset width descriptors | Manual `srcset` string concatenation | `widths` prop on `<Image>` | Astro computes correct `w` descriptors and emits them. Manual srcset is error-prone and won't get Astro's optimized hashing. |
| Image placeholder | Server-generated blur placeholder (lqip) | CSS gradient div | For a 320px max-width element, a CSS gradient placeholder has zero network cost vs. a LQIP image. Sufficient for this use case. |

**Key insight:** The `<Image>` component's widths prop is the entire DPR solution. The shift from `width={320}` to `widths={[320, 640]}` is a one-line change per Image tag that unlocks srcset — no additional libraries, build steps, or configuration needed.

---

## Runtime State Inventory

> Not applicable. This phase is a CSS component build + image attribute update. No database, no stored state, no runtime services, no renames.

---

## Common Pitfalls

### Pitfall 1: `sizes` attribute omitted when using `widths`

**What goes wrong:** If `widths` is specified but `sizes` is not, the browser assumes the image is 100vw wide and selects the largest srcset variant on every viewport — defeating the purpose of srcset.
**Why it happens:** `widths` and `sizes` are complementary. `widths` tells Astro which variants to emit; `sizes` tells the browser which variant to use.
**How to avoid:** Always pair `widths` with a `sizes` attribute matching the CSS max-width: `sizes="(min-width: 1024px) 320px, (min-width: 640px) 300px, 260px"`
**Warning signs:** DevTools Network tab shows the 960w variant loading on mobile viewports.

### Pitfall 2: `overflow: hidden` missing on screen div causes screenshot bleed

**What goes wrong:** Without `overflow: hidden` on the inner screen div, the screenshot image bleeds past the rounded corners of the frame, making the frame look broken.
**Why it happens:** `border-radius` on a parent does not clip children unless `overflow: hidden` is set.
**How to avoid:** Always set `overflow: hidden` on the div that has the inner border-radius (the screen area div).
**Warning signs:** Screenshot corners visibly extend beyond the rounded screen area.

### Pitfall 3: `aspect-ratio` on screen div vs. on Image causes layout shift

**What goes wrong:** If aspect-ratio is only on the `<img>` and not on the containing div, the browser can't reserve space before the image loads — causing cumulative layout shift (CLS).
**Why it happens:** Astro's `<Image>` does emit `width` and `height` attributes (allowing browser to infer aspect ratio), but an explicit `aspect-ratio: 9/19.5` on the container is more reliable for this nested CSS context.
**How to avoid:** Set `aspect-ratio: 9 / 19.5` on the screen container div, not just on `<img>`.
**Warning signs:** Lighthouse CLS score > 0.1; content jumps as images load.

### Pitfall 4: Hero perspective tilt applied to DeviceFrame instead of wrapper

**What goes wrong:** If `transform: perspective(...)` is applied to the DeviceFrame component's root element (the outer wrapper div), every page using DeviceFrame will be tilted — breaking feature pages.
**Why it happens:** DeviceFrame is a shared component. Hero-specific styling must stay in Hero.astro's wrapping div.
**How to avoid:** Apply the perspective transform only to the containing div in Hero.astro that wraps `<DeviceFrame>`. The DeviceFrame component itself renders flat.
**Warning signs:** Feature pages show tilted frames after Hero.astro changes.

### Pitfall 5: Dashboard_framed.png passed to DeviceFrame (doubled frame)

**What goes wrong:** If `dashboard.png` used in Hero.astro is swapped to a framed version, the CSS frame renders around a screenshot that already has a rendered frame baked in.
**Why it happens:** Phase 02 decision (STATE.md) notes "Used Dashboard_framed.png directly without CSS border frame." The current Hero.astro uses `dashboard.png` — confirmed by codebase read. But be careful during implementation that the raw `dashboard.png` is used, not a `_framed` variant.
**How to avoid:** Use `src/assets/screenshots/dashboard.png` (raw, no baked-in frame) with the DeviceFrame CSS component.
**Warning signs:** A frame appears inside a frame in the browser.

### Pitfall 6: Dynamic Island placed incorrectly for scaled frames

**What goes wrong:** The Dynamic Island position is hardcoded in px. When the frame scales to 260px (mobile), the Island may not center correctly if using fixed pixel offsets.
**Why it happens:** `position: absolute; left: 50%; transform: translateX(-50%)` centers horizontally regardless of scale. But `top` offset may need to account for the frame padding, not just a fixed pixel value.
**How to avoid:** Use `top: calc(10px + 10px)` (frame padding + inset) — or express as a percentage of the frame height if true fluid scaling is needed. The UI-SPEC specifies 12px from inner screen top edge; the frame padding is 12px top, so the Island sits at approximately `top: 22px` from frame top (12px padding + 10px? — verify during implementation).
**Warning signs:** Dynamic Island floats above the frame edge or is clipped on mobile.

---

## Code Examples

### Astro Image with widths and sizes

```astro
<!-- Source: Astro docs + VERIFIED behavior in 6.3.1 -->
<!-- Feature page usage -->
<Image
  src={screenshot}
  alt="descriptive alt text"
  widths={[320, 640]}
  sizes="(min-width: 1024px) 320px, (min-width: 640px) 300px, 260px"
  loading="lazy"
  style="width: 100%; height: 100%; object-fit: cover; display: block;"
/>

<!-- Hero usage — LCP element -->
<Image
  src={dashboardScreenshot}
  alt="Tuwa app showing today's recovery score of 82 — HRV in green zone, sleep 7.5 hours."
  widths={[320, 640, 960]}
  sizes="(min-width: 1024px) 320px, (min-width: 640px) 300px, 260px"
  loading="eager"
  fetchpriority="high"
  style="width: 100%; height: 100%; object-fit: cover; display: block;"
/>
```

[VERIFIED: Astro 6.3.1 docs — widths prop emits srcset; sizes controls browser selection]

### CSS-only side buttons via pseudo-elements

```css
/* Applied to .device-frame — volume buttons left, power button right */
.device-frame::before {
  content: '';
  position: absolute;
  left: -4px;   /* 4px UI-SPEC button width, flush to frame edge */
  top: 80px;    /* position below dynamic island area */
  width: 4px;
  height: 28px; /* volume button height */
  background: #1A1A1A;
  border-radius: 2px 0 0 2px;
  box-shadow: 0 34px 0 #1A1A1A; /* second volume button, 6px gap = 28+6 = 34px offset */
}

.device-frame::after {
  content: '';
  position: absolute;
  right: -4px;
  top: 100px;
  width: 4px;
  height: 42px; /* power button height */
  background: #1A1A1A;
  border-right: 2px solid #2A2A2A; /* depth suggestion */
  border-radius: 0 2px 2px 0;
}
```

[ASSUMED] — Exact pixel offsets for button positioning relative to 280–320px frame. The ratios are iPhone 15 Pro-proportional but will need visual verification during implementation.

### Screenshot density verification

```
Existing assets (VERIFIED by file inspection):
- dashboard.png:      1320×2868px source — at 320px CSS = 4.12x density (exceeds 3x Retina)
- recovery.png:       1206×2622px source — at 320px CSS = 3.76x density (exceeds 3x Retina)
- workload.png:       1206×2622px source — at 320px CSS = 3.76x density (exceeds 3x Retina)
- active-workout.png: 1206×2622px source — at 320px CSS = 3.76x density (exceeds 3x Retina)

Conclusion: SHOT-01 (3x re-export) is already satisfied. D-03 confirmed correct.
```

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|-----------------|--------------|--------|
| `<img>` with fixed `width` | `<Image>` with `widths` + `sizes` for srcset | Astro 3+ | Browser gets correct-DPR variant without downloading largest image on all devices |
| PNG bezel overlay image | CSS-only device frame | Community shift ~2022–2023 | Zero network cost, tokenized colors, scales with CSS |
| `format="webp"` forced single format | Astro auto-generates WebP by default | Astro 4+ | AVIF also generated when supported; no manual format prop needed for basic use |

**Deprecated/outdated:**

- `format="webp"` on `<Image>`: Still works but redundant — Astro 6 generates WebP automatically. Can remove from ScreenshotBlock remnants.
- `width={320}` as sole prop: Single-size output with no srcset. Replaced by `widths` array.
- `@astrojs/tailwind` integration: Explicitly deprecated for Tailwind v4 (already using correct `@tailwindcss/vite` approach).

---

## Assumptions Log

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|---------------|
| A1 | Side button pixel offsets (top: 80px for volume, top: 100px for power) produce correct visual placement on the 280–320px fluid frame | Code Examples | Buttons appear in wrong position — visual-only defect, fix by adjusting offsets. No functional impact. |
| A2 | `<Image>` with `widths` prop (without explicit `format`) will auto-generate WebP in Astro 6.3.1 | Standard Stack / Code Examples | If WebP is not auto-generated, add `format="webp"` explicitly. DevTools Network tab will show format immediately. |
| A3 | The Dynamic Island `top: 22px` (12px frame padding + 10px inset per UI-SPEC) positions correctly across 260–320px frame widths | Code Examples | Island appears above/below correct position — adjust `top` value. Visual-only defect. |

---

## Open Questions

1. **SHOT-01 interpretation: is it truly satisfied?**
   - What we know: D-03 locks "use existing screenshots as-is." Existing screenshots are 1206–1320px — mathematically ≥ 3x at 320px display width.
   - What's unclear: REQUIREMENTS.md SHOT-01 says "Re-export at 3x from Xcode Simulator" which implies taking new exports. D-03 supersedes this.
   - Recommendation: Treat SHOT-01 as satisfied by existing assets per D-03. Document in the plan that no re-export step is needed and close the requirement.

2. **Hero mockup: DeviceFrame vs. Screenhance-generated image (SHOT-05)?**
   - What we know: SHOT-05 says "Screenhance or equivalent." D-05 says Claude's discretion — "may be same DeviceFrame component or enhanced with perspective/shadow." UI-SPEC specifies the CSS perspective approach.
   - What's unclear: Whether the user expects a Screenhance-generated PNG or is satisfied with the CSS DeviceFrame + perspective tilt.
   - Recommendation: Implement the CSS DeviceFrame + perspective approach (already specified in UI-SPEC). This satisfies SHOT-05 because "equivalent tool" includes CSS rendering. If the user wants a Screenhance mockup instead, this can be swapped post-implementation by replacing the `<Image>` src — the DeviceFrame frame stays.

---

## Environment Availability

| Dependency | Required By | Available | Version | Fallback |
|------------|------------|-----------|---------|----------|
| Astro `<Image>` (astro:assets) | SHOT-02 | Yes | 6.3.1 | — |
| Sharp (bundled) | WebP/AVIF at build | Yes (bundled with Astro) | bundled | — |
| Tailwind CSS v4 | Responsive frame sizing | Yes | 4.3.0 | Inline styles (already partially used) |
| Existing screenshots (PNG) | SHOT-01, SHOT-03, SHOT-04 | Yes | — | Placeholder divs for coaching/cold-start |

No missing dependencies. All tools required for this phase are already installed.

---

## Sources

### Primary (HIGH confidence)
- Codebase — `src/components/ScreenshotBlock.astro` — confirmed current component structure, props, placeholder pattern
- Codebase — `src/components/Hero.astro` — confirmed Image tag with eager loading, current dashboard.png usage
- Codebase — `src/layouts/FeaturePageLayout.astro` line 51 — confirmed exact swap point
- Codebase — `src/layouts/CoachingPageLayout.astro` line 51 — confirmed exact swap point
- Codebase — `src/styles/global.css` — confirmed all design tokens used in DeviceFrame
- Codebase — `src/assets/screenshots/` — verified dimensions (1206–1320px source PNGs)
- `package.json` — Astro 6.3.1, Tailwind 4.3.0, no missing dependencies
- `.planning/phases/06-screenshot-presentation/06-UI-SPEC.md` — exact dimensions, colors, responsive sizing
- `.planning/phases/06-screenshot-presentation/06-CONTEXT.md` — locked decisions D-01 through D-09

### Secondary (MEDIUM confidence)
- Astro docs (docs.astro.build/en/guides/images) — widths, sizes, loading, fetchpriority props confirmed for Astro `<Image>`

### Tertiary (LOW confidence)
- [ASSUMED] Side button pixel offsets and Dynamic Island top offset — derived from iPhone 15 Pro proportional math, not verified against live render

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — all packages verified in package.json, no new installs needed
- Architecture: HIGH — exact swap points identified in codebase, dimensions from approved UI-SPEC
- Pitfalls: HIGH — derived from actual code (doubled frame history in STATE.md, existing ScreenshotBlock pattern)
- Pixel offsets for side buttons: LOW — proportional math, needs visual verification during implementation

**Research date:** 2026-05-11
**Valid until:** 2026-06-11 (Astro 6.x stable, Tailwind 4.x stable — low churn risk)
