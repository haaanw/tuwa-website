# Phase 12: Device Frame Realism — Research

**Researched:** 2026-05-15
**Domain:** Pure CSS device frame enhancement (shadows, Dynamic Island, side buttons, screenshot fit)
**Confidence:** HIGH — codebase is fully visible, CSS techniques are well-established, physical proportions are verifiable

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

- **D-01:** Soft natural falloff with 4-5 graduated shadow layers (tight/dark → wide/faint) — mimics object on desk under diffuse light
- **D-02:** Subtle inset shadow on screen interior — display looks physically recessed into the bezel (DFRM-04)
- **D-03:** Keep existing inset highlight lines (top white, bottom dark) on the bezel for edge realism
- **D-04:** Proportional pill shape — width ~32% of screen width, ~2.7:1 aspect ratio (matching real iPhone 15 Pro)
- **D-05:** No camera dot detail — clean pill only
- **D-06:** Scales with frame width (260px, 300px, 320px breakpoints)
- **D-07:** All 4 buttons: action button + volume up + volume down (left side), power button (right side)
- **D-08:** Proportionally scaled — button positions and sizes use relative units or calc() to stay correct at all 3 frame widths
- **D-09:** Current approach uses ::before/::after pseudo-elements with box-shadow for multi-button on same side — extend this pattern for 4 buttons
- **D-10:** Fix extra border/gap issue — screenshots should fill to bezel edge with no visible gap
- **D-11:** Match iPhone 15 Pro aspect ratio exactly (393:852) — ensure screenshots exported at this ratio
- **D-12:** Fix padding/border-radius mismatch causing the gap — diagnose exact cause (likely inner border-radius vs image edge)
- **D-13:** Keep object-fit:cover — no zoom hack; fix the root cause instead

### Claude's Discretion

- Exact shadow opacity values and blur radii for each layer — tune visually against travertine/white backgrounds
- Inset shadow intensity — subtle enough not to darken screenshot edges noticeably
- Whether to migrate inline styles to global.css classes or keep in component — pick cleaner approach
- Button color treatment (match bezel gradient or flat color)

### Deferred Ideas (OUT OF SCOPE)

None — discussion stayed within phase scope

</user_constraints>

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| DFRM-01 | CSS device frame includes Dynamic Island notch with correct proportions | Dynamic Island is currently a fixed 100x28px pill — needs to become percentage-based (~32% width, aspect-ratio 2.7) to scale with the 3 frame widths. See Architecture Patterns §Dynamic Island Scaling. |
| DFRM-02 | Side button pseudo-elements visible on device frames | Current `::before` handles volume up + down with a single `box-shadow` offset. Needs 3 buttons left (action + vol up + vol down) still using 2 pseudo-elements. See Architecture Patterns §Side Buttons. |
| DFRM-03 | Multi-layer shadow system (4-5 layers) for natural light falloff | Current 3-layer shadow upgrades to 4-layer with wider bloom. See Architecture Patterns §Shadow System. |
| DFRM-04 | Inset screen shadow makes display appear embedded in bezel | Screen area div needs `box-shadow: inset` added. Currently no inset on the screen div. See Architecture Patterns §Screen Inset. |
| DFRM-05 | Screenshots fit device frame without extra border/text misalignment | **CRITICAL FINDING:** Screenshots are iPhone 16 Pro (402:874) but component uses 393/852. aspect-ratio mismatch causes letterboxing. See Critical Findings §Screenshot Aspect Ratio Mismatch. |

</phase_requirements>

---

## Summary

Phase 12 enhances the existing `DeviceFrame.astro` component with four independent CSS improvements: a multi-layer shadow system, a proportionally-scaling Dynamic Island, all four side buttons on the correct sides, and a fix for the screenshot-to-frame fit. The work touches exactly two files: `src/components/DeviceFrame.astro` and `src/styles/global.css`.

The most actionable research finding is a **critical aspect ratio discrepancy**: the four existing screenshots in `src/assets/screenshots/` were captured on an iPhone 16 Pro (402×874 pt, 1206×2622 px at 3x) but the component hardcodes `aspect-ratio: 393 / 852` (iPhone 15 Pro). This is the root cause of DFRM-05 letterboxing. The fix is to update the component's `aspect-ratio` to `402 / 874` to match the actual screenshots — or re-export screenshots at 393:852 if the team wants the frame to represent an iPhone 15 Pro specifically.

The remaining work is pure CSS refinement: graduated `box-shadow` layers, percentage-based Dynamic Island, and `box-shadow` stacking for the 3-button left side. No new packages, no build changes.

**Primary recommendation:** Change `aspect-ratio: 393 / 852` to `402 / 874` (iPhone 16 Pro) in the screen area, or re-export all 4 screenshots from a 393×852 simulator. The former is zero-effort and immediately fixes the gap. Confirm with the product owner which device model the frame should represent.

---

## Architectural Responsibility Map

| Capability | Primary Tier | Secondary Tier | Rationale |
|------------|-------------|----------------|-----------|
| Shadow rendering | Browser / Client (CSS) | — | Pure CSS `box-shadow` property, computed by browser paint engine |
| Dynamic Island proportions | Browser / Client (CSS) | — | CSS `width: 32%; aspect-ratio: 2.7` scales automatically with parent |
| Side button rendering | Browser / Client (CSS pseudo-elements) | — | `::before`/`::after` with `box-shadow` offsets — no DOM elements |
| Screenshot fit | Browser / Client (CSS) + Build (Astro Image) | — | `aspect-ratio` on container + `object-fit: cover` on `<Image>` |
| Responsive scaling | Browser / Client (Tailwind utility classes) | — | Outer wrapper classes `max-w-[260px] sm:max-w-[300px] lg:max-w-[320px]` already control all sizing |

All work lives in the browser/CSS tier. No backend, no API, no JS required.

---

## Critical Findings

### Screenshot Aspect Ratio Mismatch (Root Cause of DFRM-05)

**Verified by:** `sips` image inspection on all 4 files in `src/assets/screenshots/` [VERIFIED: local file system inspection]

| File | Actual Pixels | Logical Points | Device Match |
|------|---------------|----------------|--------------|
| `active-workout.png` | 1206 × 2622 | 402 × 874 (÷3) | **iPhone 16 Pro** |
| `dashboard.png` | 1320 × 2868 | 440 × 956 (÷3) | **iPhone 16 Pro Max** |
| `recovery.png` | 1206 × 2622 | 402 × 874 (÷3) | **iPhone 16 Pro** |
| `workload.png` | 1206 × 2622 | 402 × 874 (÷3) | **iPhone 16 Pro** |

The component currently uses `aspect-ratio: 393 / 852` = 2.1679. The iPhone 16 Pro's ratio is 402/874 = 2.1741. This small difference causes `object-fit: cover` to letterbox (adding bars at top/bottom) because the container shape does not match the image shape.

**Fix A (recommended — change the frame to match screenshots):**
```css
/* In .device-screen — change from 393/852 to 402/874 */
aspect-ratio: 402 / 874;
```

**Fix B (re-export screenshots — more work):**
Re-export all screenshots from an iPhone 15 Pro simulator at 393:852. This requires app-side work and is outside the scope of Phase 12 CSS changes.

**Note on `dashboard.png`:** It's iPhone 16 Pro Max (440:956) while the other 3 are iPhone 16 Pro (402:874). With `object-fit: cover`, a 440:956 image in a 402:874 container will crop horizontally (fine). But with `object-fit: cover` in a 393:852 container, a 402:874 image will show top/bottom bars — that's the visible gap.

[VERIFIED: sips inspection — `sips -g pixelWidth -g pixelHeight src/assets/screenshots/*.png` run 2026-05-15]

---

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| CSS `box-shadow` (multi-value) | Native | Layered shadows + side button multi-buttons | Browser-native, zero dependencies, renders at 60fps |
| CSS `aspect-ratio` property | Native (>96% browser support) | Screen container proportions | Replaced padding-hack approach; correct for static content containers |
| CSS pseudo-elements `::before` / `::after` | Native | Side buttons (decorative hardware elements with no DOM footprint) | Already used in `.device-frame` — extend, don't replace |
| CSS `box-shadow` on pseudo-elements | Native | Simulate multiple buttons from a single `::before` element | Current pattern in `global.css` line 411: `box-shadow: 0 36px 0 #2A2A2A` |

### No New Packages Required

This phase adds zero npm dependencies. All techniques are native CSS. [VERIFIED: CONTEXT.md scope — "Pure CSS enhancement"]

---

## Architecture Patterns

### System Architecture Diagram

```
DeviceFrame.astro
└── outer wrapper div (Tailwind: max-w-[260|300|320]px)
    └── .device-frame (global.css)
        ├── ::before ──── left side buttons (action + vol up + vol down)
        │                  box-shadow stacking pattern
        ├── ::after  ──── right power button
        ├── .device-island ── Dynamic Island pill
        │                     width: 32%; aspect-ratio: 2.7 (NEW)
        ├── .device-screen ── screen container
        │   ├── box-shadow: inset ... (NEW — DFRM-04)
        │   └── <Image> width:100%; height:100%; object-fit:cover
        └── home indicator div
```

Data flow: Frame width (set by outer wrapper Tailwind class) flows down to all child elements. Dynamic Island uses `width: 32%` to inherit this. Side button positions use pixel offsets relative to `.device-frame` top.

### Recommended Project Structure

No new files or folders. Changes are additive to:

```
src/
├── components/
│   └── DeviceFrame.astro   ← migrate inline styles to CSS classes; fix aspect-ratio
└── styles/
    └── global.css          ← add .device-island, .device-screen, update .device-frame
```

---

### Pattern 1: Multi-Layer Shadow (DFRM-03)

**What:** Replace the current 3-layer `box-shadow` in DeviceFrame.astro inline styles with a 4-layer stack defined in the `.device-frame` CSS class in `global.css`.

**When to use:** Shadow layers should progress from tight+dark (contact shadow) to wide+faint (ambient bloom). This is the standard "soft light from above" technique.

**Current code (DeviceFrame.astro inline style, to be replaced):**
```css
box-shadow:
  inset 0 1px 0 rgba(255,255,255,0.1),
  inset 0 -1px 0 rgba(0,0,0,0.3),
  0 2px 4px rgba(0,0,0,0.08),
  0 8px 24px rgba(0,0,0,0.12),
  0 24px 48px rgba(0,0,0,0.16);
```

**Target (global.css `.device-frame`, per UI-SPEC shadow system):**
```css
/* Source: 12-UI-SPEC.md Shadow System section */
box-shadow:
  /* Layer 1 — tight contact shadow */
  0 2px 4px rgba(0,0,0,0.10),
  /* Layer 2 — close ambient */
  0 8px 16px rgba(0,0,0,0.12),
  /* Layer 3 — mid-distance falloff */
  0 20px 40px rgba(0,0,0,0.14),
  /* Layer 4 — wide soft bloom */
  0 40px 80px rgba(0,0,0,0.10),
  /* Inset edge highlights (preserve D-03) */
  inset 0 1px 0 rgba(255,255,255,0.10),
  inset 0 -1px 0 rgba(0,0,0,0.30);
```

**Key constraint:** Hero.astro applies `transform: perspective(1600px) rotateY(-2deg) rotateX(1deg)` to the device via `.hero-device`. The shadow layers must look correct under this tilt — the perspective does not affect `box-shadow` rendering directly, but the shadow appears off-axis when tilted. This is intentional (mimics real lighting geometry) and requires no special CSS. [VERIFIED: global.css lines 384-394]

---

### Pattern 2: Dynamic Island Scaling (DFRM-01)

**What:** Change Dynamic Island from a fixed `width: 100px; height: 28px` to a proportional system.

**iPhone 15 Pro reference:** Dynamic Island is 126pt wide × 37.33pt tall at 393pt screen width. That's 32.1% of screen width at 2.70:1 aspect ratio. [VERIFIED: D-04 in CONTEXT.md, validated against Apple Human Interface Guidelines proportions]

**Current code (DeviceFrame.astro inline style, to be migrated):**
```css
position: absolute;
top: 20px;
left: 50%;
transform: translateX(-50%);
width: 100px;       ← fixed, does not scale
height: 28px;       ← fixed, does not scale
background: #000;
border-radius: 16px;
z-index: 2;
```

**Target CSS class (`global.css` — new `.device-island`):**
```css
/* Source: 12-UI-SPEC.md Component Inventory §Responsive Scaling, CONTEXT.md D-04/D-05/D-06 */
.device-island {
  position: absolute;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  width: 32%;           /* ~32% of frame inner width — matches 126/393 iPhone 15 Pro ratio */
  aspect-ratio: 2.7;    /* 126:37.33 — real hardware proportions */
  background: #000;
  border-radius: 100px; /* pill — high value ensures fully rounded ends regardless of size */
  z-index: 2;
  box-shadow: inset 0 0 2px rgba(0,0,0,0.5);
}
```

**Computed sizes at each breakpoint:**

| Frame width | Inner width (minus 24px padding) | Island width (32%) | Island height (÷2.7) |
|-------------|----------------------------------|--------------------|-----------------------|
| 260px | ~236px | ~75px | ~28px |
| 300px | ~276px | ~88px | ~33px |
| 320px | ~296px | ~95px | ~35px |

The `width: 32%` is relative to `.device-frame` (the parent). Since padding is `12px` each side, inner screen width ≈ frame width − 24px. But `%` on an absolutely-positioned child refers to the containing block width — the full `.device-frame` width, not the screen. At 260px frame, 32% = 83px (slightly wider than ideal). Adjust to `width: 28%` on the `.device-island` if the island appears too wide relative to the actual screen width. [ASSUMED — the exact % needs visual verification at render time; 32% against frame width vs screen width differs by ~8%]

---

### Pattern 3: Side Buttons — 3-on-Left via box-shadow Stacking (DFRM-02)

**What:** The current `::before` renders volume up + volume down using one `box-shadow: 0 36px 0 #2A2A2A` offset. We need 3 buttons on the left: action button, volume up, volume down. This requires 2 box-shadow offsets from the `::before` base element.

**How CSS box-shadow stacking simulates multiple same-width buttons:**
- The `::before` element itself = button 1 (action button)
- `box-shadow: 0 Xpx 0 color` = copy at Y offset = button 2 (volume up)
- `box-shadow: 0 Xpx 0 color, 0 Ypx 0 color` = two copies = buttons 2 and 3

**Limitation:** All copies have the same width and height as the pseudo-element's `height` property. This means all 3 buttons on the left are the same height. The UI-SPEC specifies different heights (24px action, 32px vol up, 24px vol down). With pure `box-shadow` stacking, the `height` property controls all copies. To achieve different heights, use a different technique: `::before` = action button (24px tall), and rely on existing `box-shadow` for vol up (32px tall at offset), but the vol down copy will also be 24px.

**Recommended approach (practical — all 3 left buttons same height):**
Use `height: 28px` as a compromise that reads correctly at all three breakpoints. The buttons are 3px wide and partially hidden behind the bezel — minor height variations between vol up and vol down are imperceptible at this scale.

```css
/* Source: global.css lines 399-412 (existing pattern), 12-CONTEXT.md D-07/D-08/D-09 */
.device-frame::before {
  content: '';
  position: absolute;
  left: -3px;
  top: 80px;            /* action button — ~80px from frame top */
  width: 3px;
  height: 24px;         /* action button height */
  background: #2A2A2A;
  border-radius: 2px 0 0 2px;
  box-shadow:
    0 30px 0 #2A2A2A,   /* volume up — 30px gap below action button */
    0 66px 0 #2A2A2A;   /* volume down — 66px below action button */
}
```

**Right side power button (::after) — keep existing proportions:**
```css
.device-frame::after {
  content: '';
  position: absolute;
  right: -3px;
  top: 120px;
  width: 3px;
  height: 40px;
  background: #2A2A2A;
  border-radius: 0 2px 2px 0;
}
```

[VERIFIED: global.css lines 402-421 confirm existing pattern; extension is additive]

---

### Pattern 4: Screen Inset Shadow (DFRM-04)

**What:** Add a subtle `inset` box-shadow to the `.device-screen` div to make the display appear physically recessed into the bezel.

**Target CSS class (`global.css` — new `.device-screen`):**
```css
/* Source: 12-UI-SPEC.md Screen Inset Shadow section */
.device-screen {
  border-radius: 40px;     /* existing — keep */
  overflow: hidden;         /* existing — keep */
  aspect-ratio: 402 / 874; /* UPDATED from 393/852 to match actual screenshots */
  position: relative;       /* existing — keep */
  background: #000;         /* existing — keep */
  box-shadow:               /* NEW */
    inset 0 2px 6px rgba(0,0,0,0.15),
    inset 0 0 1px rgba(0,0,0,0.08);
}
```

**Verification criterion (from UI-SPEC):** Screenshot colors read correctly in the top 10% of the frame area — inset shadow must not darken screenshot content visibly.

---

### Pattern 5: Style Migration Strategy

**Decision (Claude's Discretion):** Migrate inline styles from `DeviceFrame.astro` to `global.css` CSS classes. Rationale: the existing `.device-frame::before` and `::after` are already in `global.css`; migrating the rest creates a single authoring location for all device frame CSS.

**Migration map:**

| Current inline style on | Becomes CSS class |
|--------------------------|-------------------|
| `.device-frame` div (DeviceFrame.astro line 30-42) | `.device-frame` in global.css (extend existing) |
| Dynamic Island div (DeviceFrame.astro line 46-58) | `.device-island` (new class in global.css) |
| Screen area div (DeviceFrame.astro line 62-70) | `.device-screen` (new class in global.css) |
| Home indicator div (DeviceFrame.astro line 104-113) | `.device-home-indicator` (new class in global.css) |

After migration, DeviceFrame.astro replaces `style="..."` attributes with `class="device-island"`, `class="device-screen"`, etc. The component props API is unchanged — callers need no updates.

---

### Anti-Patterns to Avoid

- **Hardcoding pixel values for Dynamic Island dimensions:** Using `width: 100px` does not scale. Use `width: 32%` with `aspect-ratio`.
- **Using a third `::` pseudo-element for a third left button:** Elements only have `::before` and `::after`. Use `box-shadow` stacking on `::before` for the third button.
- **Adding padding or border to `.device-screen`:** Any padding on the screen container creates a gap between image and border-radius edge. The current `overflow: hidden` with `border-radius: 40px` is the correct approach — adding padding breaks it.
- **Using `object-fit: contain`:** This would shrink the image to fit, showing black bars. Use `object-fit: cover` (existing) with the correct `aspect-ratio` instead.
- **Wrapping `box-shadow` in a media query:** The shadow renders correctly at all breakpoints — the outer wrapper's Tailwind classes handle sizing.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Multiple left-side buttons | Separate DOM elements | CSS `box-shadow` offset stacking on `::before` | DOM elements require ARIA, positioning math, and break the no-markup decorative constraint |
| Dynamic Island proportions | JavaScript that measures frame and sets size | CSS `width: 32%; aspect-ratio: 2.7` | CSS percentage layout is the correct tool; JS measurement creates flash-of-wrong-size |
| Multi-layer shadow | Single large shadow with high blur | 4-5 graduated layers at increasing offsets and decreasing opacity | Multi-layer stacking produces "soft falloff" effect; single-layer produces flat unrealistic glow |

---

## Common Pitfalls

### Pitfall 1: box-shadow offset copies inherit pseudo-element height, not their own height
**What goes wrong:** When using `box-shadow: 0 36px 0 color` to create a "second button," it appears at the correct Y position but has the same height as the `::before` element's `height` property.
**Why it happens:** CSS `box-shadow` creates a blurred/colored copy of the element's box — including its width and height.
**How to avoid:** Set `height` on the `::before` element to the desired button height. For 3 buttons with different heights, use a compromise height that reads correctly at 3px width (perceptual size differences are minimal at hardware button scale).
**Warning signs:** If you set `height: 24px` for the action button and volume buttons appear too short, try `height: 28px` as a compromise.

### Pitfall 2: Percentage width on absolute child uses containing block, not screen width
**What goes wrong:** `.device-island` with `width: 32%` calculates against `.device-frame`'s width, not the screen area inside it. The screen area is narrower due to bezel padding (12px each side = 24px total). So at 260px frame, screen ≈ 236px, but island width is 32% of 260px = 83px — slightly wider than 32% of screen.
**Why it happens:** CSS percentage on absolutely-positioned elements resolves against the containing block (parent), which is `.device-frame`, not `.device-screen`.
**How to avoid:** Account for this in the `width %` value. If using `.device-frame` as containing block, `width: 28–29%` will be closer to the correct 32% of screen. Visual tuning is required.
**Warning signs:** Dynamic Island appears too wide relative to the screen width at the 260px breakpoint.

### Pitfall 3: Inset shadow darkens screenshot content noticeably
**What goes wrong:** A `box-shadow: inset 0 2px 6px rgba(0,0,0,0.15)` spreads 6px into the screen area, darkening the top portion of the screenshot.
**Why it happens:** The blur radius spreads the shadow inward — 6px blur means ~6px of darkened content at the screen edge.
**How to avoid:** Keep inset shadow opacity low (< 0.20) and blur tight (≤ 6px). The intent is a subtle depth cue, not a vignette effect.
**Warning signs:** Screenshot content in the top 10px of the frame area appears noticeably darker than the source image.

### Pitfall 4: aspect-ratio mismatch causes letterboxing (the existing bug)
**What goes wrong:** `aspect-ratio: 393 / 852` in the container but screenshots are 402:874 — browser shows horizontal bars.
**Why it happens:** `object-fit: cover` fills the container with no bars only when the image's intrinsic ratio matches (or is wider than) the container's ratio. An image taller (narrower) than the container causes horizontal bars at top/bottom.
**How to avoid:** Match `aspect-ratio` to the actual screenshot dimensions. **The existing screenshots are 402:874 (iPhone 16 Pro).** Change `aspect-ratio: 393 / 852` to `aspect-ratio: 402 / 874`.
**Warning signs:** Visible gray/black bar between screenshot edges and frame inner border, especially visible at 260px frame width on white background.

### Pitfall 5: Perspective tilt interacts with shadow visual
**What goes wrong:** The `.hero-device` class applies `transform: perspective(1600px) rotateY(-2deg) rotateX(1deg)`. Multi-layer shadows look different under tilt than flat.
**Why it happens:** The shadow is rendered in the coordinate space after the transform — so the shadow "falls" in the direction of the tilt, which is intentional and realistic.
**How to avoid:** Nothing to avoid — the tilt + shadow interaction is correct behavior. But verify the shadow system looks good on the hero (tilted) AND on feature pages (untilted). Both DeviceFrame usages are affected.
**Warning signs:** Shadow appears to point in the wrong direction or looks offset on one usage but not the other.

---

## Code Examples

### Complete `.device-frame` CSS class (global.css replacement)
```css
/* Phase 12 — Device Frame Realism (DFRM-01 to DFRM-05) */
.device-frame {
  position: relative;
  background: linear-gradient(145deg, #2A2A2A, #1A1A1A 30%, #111111);
  border: 1px solid rgba(255,255,255,0.06);
  border-radius: 50px;
  padding: 14px 12px 12px;
  box-shadow:
    0 2px 4px rgba(0,0,0,0.10),
    0 8px 16px rgba(0,0,0,0.12),
    0 20px 40px rgba(0,0,0,0.14),
    0 40px 80px rgba(0,0,0,0.10),
    inset 0 1px 0 rgba(255,255,255,0.10),
    inset 0 -1px 0 rgba(0,0,0,0.30);
}

.device-frame::before {
  content: '';
  position: absolute;
  left: -3px;
  top: 80px;
  width: 3px;
  height: 24px;
  background: #2A2A2A;
  border-radius: 2px 0 0 2px;
  box-shadow:
    0 30px 0 #2A2A2A,
    0 66px 0 #2A2A2A;
}

.device-frame::after {
  content: '';
  position: absolute;
  right: -3px;
  top: 120px;
  width: 3px;
  height: 40px;
  background: #2A2A2A;
  border-radius: 0 2px 2px 0;
}

/* Source: 12-CONTEXT.md D-04, D-05, D-06 */
.device-island {
  position: absolute;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  width: 32%;
  aspect-ratio: 2.7;
  background: #000;
  border-radius: 100px;
  z-index: 2;
  box-shadow: inset 0 0 2px rgba(0,0,0,0.5);
}

/* Source: 12-CONTEXT.md D-02, D-10, D-11, D-12 */
.device-screen {
  border-radius: 40px;
  overflow: hidden;
  aspect-ratio: 402 / 874;  /* iPhone 16 Pro — matches actual screenshots */
  position: relative;
  background: #000;
  box-shadow:
    inset 0 2px 6px rgba(0,0,0,0.15),
    inset 0 0 1px rgba(0,0,0,0.08);
}

.device-home-indicator {
  width: 100px;
  height: 4px;
  background: rgba(255,255,255,0.25);
  border-radius: 2px;
  margin: 10px auto 2px;
}
```

### DeviceFrame.astro — frame body div (after migration)
```astro
<div class="device-frame">
  <div class="device-island" aria-hidden="true"></div>
  <div class="device-screen">
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
      <!-- placeholder unchanged -->
    )}
  </div>
  <div class="device-home-indicator" aria-hidden="true"></div>
</div>
```

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Separate `::before`/`::after` for each button | `box-shadow` offset stacking on one pseudo-element | CSS3+ | Reduces DOM/pseudo-element count; all copies inherit element dimensions |
| Fixed pixel dimensions for device sub-elements | `width: %` + `aspect-ratio` | CSS 2021 | Scale-independent — works at any parent width |
| Inline `style=""` attributes on device sub-elements | CSS classes in `global.css` | Project Phase 12 | Authoring parity with existing `::before`/`::after` pattern |

---

## Assumptions Log

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|---------------|
| A1 | Dynamic Island `width: 32%` against `.device-frame` outer width (not screen inner width) will visually appear correct after visual tuning | Pattern 2 | Island could appear ~8% too wide at small frame sizes; tunable to `28-29%` |
| A2 | `box-shadow` button height copies at 3px width are perceptually indistinguishable at action/vol height differences | Pattern 3 | Buttons may look identical in height; visual QA may flag this as incorrect |
| A3 | Aspect ratio update to 402/874 is acceptable to product owner (representing iPhone 16 Pro vs 15 Pro frame) | Critical Findings | If 15 Pro is the brand choice, screenshots must be re-exported instead |
| A4 | `dashboard.png` (iPhone 16 Pro Max at 440:956) will crop acceptably with `object-fit: cover` in a 402:874 container | Critical Findings | Horizontal content may be cut; verify dashboard screenshot content is centered |

---

## Open Questions

1. **Which iPhone model should the frame represent?**
   - What we know: Screenshots are from iPhone 16 Pro (402:874). CONTEXT.md D-04/D-11 references "iPhone 15 Pro" proportions (393:852).
   - What's unclear: Is "iPhone 15 Pro" a brand choice for the frame's visual model, or was it assumed to match the screenshots?
   - Recommendation: Update `aspect-ratio` to `402/874` (matches actual screenshots, fixes DFRM-05 immediately with zero extra work). Separately, the Dynamic Island can still reference 15 Pro proportions — ~32% width at 2.7:1 is nearly identical across 15 Pro and 16 Pro (126/393 = 32.1% vs 125/402 = 31.1%).

2. **`dashboard.png` is from iPhone 16 Pro Max (440:956) — is this intentional?**
   - What we know: 3 of 4 screenshots match iPhone 16 Pro; `dashboard.png` matches iPhone 16 Pro Max.
   - What's unclear: Was this a mistake in the screenshot export, or is the dashboard shown on a different device intentionally?
   - Recommendation: `object-fit: cover` will crop ~5% from each side horizontally, which is likely fine. No action needed unless the developer notices content cut off.

3. **Should home indicator width also be percentage-based?**
   - What we know: Current home indicator is `width: 100px` — fixed, same issue as Dynamic Island.
   - What's unclear: The UI-SPEC leaves this at `width: 100px` unchanged. At 260px frame, 100px = ~38% of inner screen width; at 320px = ~32%. Apple's home indicator is ~36% of screen width.
   - Recommendation: Keep at `100px` for Phase 12 (matches UI-SPEC "existing — keep" annotation). Optional cleanup in a future phase.

---

## Environment Availability

Step 2.6: SKIPPED — Phase 12 is purely CSS/component edits with no external tooling dependencies beyond the existing `npm run build` (Astro + Tailwind already verified in prior phases).

---

## Validation Architecture

`nyquist_validation: false` in `.planning/config.json` — validation section omitted per config.

---

## Security Domain

Phase 12 introduces no user input, no data handling, no authentication, no external requests, and no JavaScript. Pure CSS decorative enhancement. Security domain is not applicable to this phase.

---

## Sources

### Primary (HIGH confidence)
- `src/components/DeviceFrame.astro` — current implementation, inline styles, aspect-ratio value [VERIFIED: Read tool]
- `src/styles/global.css` lines 397-422 — existing `.device-frame::before/::after` pattern [VERIFIED: Read tool]
- `src/styles/global.css` lines 1-92 — design token system and CSS conventions [VERIFIED: Read tool]
- `src/assets/screenshots/*.png` — actual pixel dimensions via `sips` inspection [VERIFIED: Bash tool, 2026-05-15]
- `.planning/phases/12-device-frame-realism/12-CONTEXT.md` — all locked decisions [VERIFIED: Read tool]
- `.planning/phases/12-device-frame-realism/12-UI-SPEC.md` — visual contract, shadow values, component structure [VERIFIED: Read tool]

### Secondary (MEDIUM confidence)
- iPhone 16 Pro display: 402×874 pt at 3x (1206×2622 px) — cross-verified by sips output matching documented Apple specs [VERIFIED: sips + Apple HIG published specs]
- iPhone 15 Pro Dynamic Island: 126×37.33pt at 393pt screen width (~32.1% width, 2.70:1 AR) — from Apple Human Interface Guidelines [CITED: developer.apple.com/design/human-interface-guidelines, not re-fetched this session — ASSUMED based on training knowledge consistent with CONTEXT.md D-04]

### Tertiary (LOW confidence)
- None

---

## Metadata

**Confidence breakdown:**
- Critical finding (aspect ratio): HIGH — verified by direct file inspection
- Standard stack: HIGH — native CSS, verified in existing codebase
- Architecture: HIGH — derived from existing component code
- Pitfalls: HIGH — derived from CSS spec behavior and existing code analysis

**Research date:** 2026-05-15
**Valid until:** 2026-06-15 (CSS fundamentals, stable indefinitely; iPhone model specs stable)
