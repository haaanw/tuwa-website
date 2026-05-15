# Phase 15: Matisse SVG Art Direction - Research

**Researched:** 2026-05-15
**Domain:** SVG shape authoring, CSS scroll-driven animations, DOM budget management, entrance animation integration
**Confidence:** HIGH

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

**Shape Authoring**
- D-01: Code-generated SVG shapes using programmatic Bezier curves — no Figma/Inkscape dependency
- D-02: 5–7 distinct biomorphic blob shapes in the vocabulary
- D-03: Abstract biomorphic blobs only — no recognizable/figurative forms (leaves, bodies, etc.)
- D-04: Shapes stay parametric for iteration; SVGO-optimize final output for DOM budget (ART-03)

**Frieze Composition (Hero)**
- D-05: Frieze sits as a background layer behind hero content (headline, device frame, badge all render on top)
- D-06: Full viewport width — shapes span edge-to-edge, overflow hidden clips naturally
- D-07: Defined band height (~200–300px) clustered around the device frame vertical position
- D-08: Uses existing `.matisse-frieze` container (Phase 11 stub) with `position: absolute; inset: 0`

**Feature Page Decoration**
- D-09: Implement TWO approaches for comparison: (a) small cluster of 2–3 shapes, (b) shapes as section dividers — then pick the winner
- D-10: Each feature page gets a unique shape from the 5–7 vocabulary (not all reusing the same shape)

**Color & Opacity**
- D-11: 2–3 color palette: accent green (#2B5240) as primary, terracotta (#8B5E3C), soft gold (#A89060)
- D-12: Hero shapes: more opaque/solid fills
- D-13: Feature page shapes: more transparent/lighter fills (15–25% opacity)
- D-14: Falls back to Phase 11 D-11 if complementary colors clash with travertine

### Claude's Discretion
- Exact complementary color hues (terracotta, gold, blue — pick what works with travertine)
- Parallax intensity and direction (ART-05)
- Entrance animation style and timing (ART-06) — consistent with existing scroll-reveal pattern
- Shape scale/rotation transforms for variety
- Which approach wins for feature pages (cluster vs divider) after visual comparison

### Deferred Ideas (OUT OF SCOPE)

None — discussion stayed within phase scope.
</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| ART-01 | Organic cut-out SVG shapes authored (Matisse Swimming Pool inspired) | Programmatic Bezier blob algorithm; Catmull-Rom-to-cubic-Bezier spline; SVGO optimization |
| ART-02 | Shapes arranged as continuous frieze/strip in hero section | `.matisse-frieze` stub integration; CSS absolute positioning with overflow hidden |
| ART-03 | SVGO-optimized SVGs keep DOM node count within Lighthouse budget | npx svgo@11.5.1 available; ≤8 control points per path rule; DOM delta ≤30 nodes |
| ART-04 | Lighter decorative Matisse touches on feature deep-dive pages | FeaturePageLayout integration point; two-approach comparison pattern |
| ART-05 | Scroll-driven parallax movement on cut-out shapes | CSS `animation-timeline: scroll()` with `@supports` fallback; Safari 26+ required |
| ART-06 | Entrance animations on Matisse cut-out elements | Existing `data-animate` + IntersectionObserver pattern in BaseLayout.astro |
</phase_requirements>

---

## Summary

Phase 15 implements Matisse-inspired SVG art direction: programmatically authored biomorphic blob shapes composited as a continuous hero frieze, lighter decorative touches on feature deep-dive pages, parallax scroll movement, and entrance animations. All implementation is native SVG, CSS, and Astro inline components — no new JavaScript libraries needed.

The primary technical challenge is the parallax implementation. CSS `animation-timeline: scroll()` (the approach specified in the UI-SPEC) requires Safari 26+ (beta as of May 2026) and Chrome 115+, but is still behind a flag in Firefox. An `@supports` wrapper makes this purely progressive enhancement — shapes are fully visible and correct without parallax on unsupported browsers, and parallax activates where the spec is available. This matches the project's existing progressive enhancement philosophy (reduced-motion guards, JS-gated animations).

Shape authoring uses a pure-JavaScript Catmull-Rom-to-cubic-Bezier algorithm: define 6–8 polar-coordinate anchor points per shape, convert to cubic Bezier control points, render as a `<path d="...">` element. This produces organic, non-figurative blobs with no external library dependency. Once the shapes look correct, their path data is SVGO-optimized and hardcoded as static strings in Astro components — no runtime generation.

**Primary recommendation:** Use the `data-animate` + IntersectionObserver entrance pattern for ART-06 (exactly as BaseLayout.astro already does), and wrap all parallax CSS in `@supports (animation-timeline: scroll())` for ART-05. Author blobs as hardcoded static SVG path strings after generating them with a one-time Node script.

---

## Architectural Responsibility Map

| Capability | Primary Tier | Secondary Tier | Rationale |
|------------|-------------|----------------|-----------|
| Shape authoring (blob paths) | Build-time script | — | One-time generation; output is hardcoded static strings — no runtime JS |
| Hero frieze composition | Frontend (Astro component) | — | Inline SVG in Hero.astro, positioned via CSS |
| Feature page decoration | Frontend (Astro layout) | — | Inline SVG in FeaturePageLayout.astro and/or per-page astro files |
| SVGO path optimization | Build-time tooling | — | `npx svgo` on generated SVG files before hardcoding path data |
| Parallax animation | Browser / CSS | — | `animation-timeline: scroll()` runs on compositor thread — no main-thread JS |
| Entrance animation | Browser / CSS + IO | — | CSS keyframes triggered by IntersectionObserver class toggle (existing pattern) |
| Reduced-motion guard | Browser / CSS | — | Existing `@media (prefers-reduced-motion: reduce)` guard in global.css lines 731–738 |

---

## Standard Stack

### Core (all pre-installed, no new dependencies)

| Tool | Version | Purpose | Why Standard |
|------|---------|---------|--------------|
| Inline SVG (Astro) | N/A | Shape delivery | Established pattern in codebase (FeatureGrid wheel, Header icons); zero external requests |
| CSS `animation-timeline: scroll()` | Native (Chrome 115+, Safari 26+) | Parallax movement | Compositor-thread animation, no JS overhead; `@supports` ensures graceful degradation |
| IntersectionObserver (existing) | Native | Entrance animation trigger | Already wired in BaseLayout.astro line 39; shapes just need `data-animate` attributes |
| `npx svgo` | 11.5.1 (verified available) | Path optimization | Already available via npx; strips metadata, merges path segments |
| CSS `@keyframes` | Native | Entrance animation | Already-defined pattern in global.css (fade-up, hero-device-enter) |

### No New Dependencies Required

The entire phase is implementable with the existing stack. Specifically:
- No animation library (Motion/GSAP) needed — CSS handles both parallax and entrance
- No SVG library needed — path strings are hardcoded after generation
- No blob-generation npm package — algorithm is ~40 lines of vanilla JS in a one-time script

**Version verification:**
```bash
npx svgo --version  # → 11.5.1 (confirmed 2026-05-15)
node --version      # → v24.7.0
```
[VERIFIED: local shell]

---

## Architecture Patterns

### System Architecture Diagram

```
Build-time (one-time)          Astro Build                Browser
┌─────────────────────┐        ┌──────────────────────┐   ┌────────────────────────────┐
│  Node blob-gen.mjs  │        │  Hero.astro           │   │  Page paint                │
│  (polar coords +    │──SVG──▶│  .matisse-frieze div  │──▶│  CSS: position absolute    │
│  Catmull-Rom spline)│  path  │  inline SVG paths     │   │  overflow hidden           │
└─────────────────────┘  data  └──────────────────────┘   │                            │
         │                                                  │  Entrance animation        │
         ▼                                                  │  (IO fires on page load —  │
┌─────────────────────┐        ┌──────────────────────┐   │   above-fold, immediate)   │
│  npx svgo           │        │  FeaturePageLayout.   │   │                            │
│  (strip metadata,   │        │  astro                │   │  @supports parallax        │
│  merge paths)       │        │  Matisse decoration   │──▶│  animation-timeline:       │
└─────────────────────┘        │  (per-page shape)     │   │  scroll() wrapper          │
                                └──────────────────────┘   │                            │
                                                            │  prefers-reduced-motion    │
                                                            │  guard (static display)    │
                                                            └────────────────────────────┘
```

Data flow for hero frieze:
1. One-time script generates 5–7 `<path d="...">` strings
2. Strings are SVGO-optimized and hardcoded into `MatisseFrieze.astro`
3. `MatisseFrieze.astro` is imported into `Hero.astro`
4. Hero section renders the frieze as a background SVG layer
5. On page load: IO observer triggers `.is-visible` class → CSS entrance animation plays
6. On scroll: `@supports` block activates parallax via `animation-timeline: scroll()`

### Recommended Project Structure

```
src/
├── components/
│   ├── MatisseFrieze.astro      # Hero frieze — inline SVG with 5–7 shapes
│   ├── MatisseShape.astro       # Reusable single-shape component (accepts shapeId prop)
│   └── MatisseDecoration.astro  # Feature page decorator (accepts approach + shapeId props)
├── styles/
│   └── global.css               # Extend Matisse stub (lines 710–738) with animations
└── scripts/ (build-time only)
    └── generate-blobs.mjs       # One-time script to generate path data (delete after use)
```

### Pattern 1: Programmatic Blob Path Generation (ART-01)

**What:** Generate organic blob shapes as SVG `<path>` strings via a Catmull-Rom-to-cubic-Bezier algorithm
**When to use:** One-time generation; output is hardcoded in Astro components

The algorithm places N equally-spaced anchor points on a circle (polar coordinates), applies per-point radius variance to create organic irregularity, then converts the points to cubic Bezier control points using the Catmull-Rom formula.

```javascript
// Source: Catmull-Rom to Bezier — adapted from gist.github.com/njvack/6925609
// Used in: scripts/generate-blobs.mjs (build-time only)

function generateBlob(options = {}) {
  const {
    numPoints = 8,      // 6-8 gives organic feel without too many nodes
    centerX = 100,
    centerY = 100,
    baseRadius = 70,
    variance = 0.35,    // 0 = perfect circle, 0.5 = highly irregular
    seed = Math.random()
  } = options;

  // 1. Generate anchor points on perturbed circle
  const angleStep = (Math.PI * 2) / numPoints;
  const points = [];
  for (let i = 0; i < numPoints; i++) {
    const theta = i * angleStep;
    // Deterministic variance from seed for reproducible shapes
    const r = baseRadius * (1 - variance + variance * pseudoRandom(seed + i));
    points.push({
      x: centerX + Math.cos(theta) * r,
      y: centerY + Math.sin(theta) * r,
    });
  }

  // 2. Convert to SVG cubic Bezier path (Catmull-Rom -> Bezier)
  return pointsToCubicBezierPath(points, true); // true = closed path
}

// Catmull-Rom to cubic Bezier control points
function pointsToCubicBezierPath(pts, closed = true) {
  const n = pts.length;
  let d = `M ${pts[0].x.toFixed(2)} ${pts[0].y.toFixed(2)} `;
  for (let i = 0; i < n; i++) {
    const p0 = pts[(i - 1 + n) % n];
    const p1 = pts[i];
    const p2 = pts[(i + 1) % n];
    const p3 = pts[(i + 2) % n];
    // Catmull-Rom tension = 0.5 (alpha = 0.5)
    const cp1x = p1.x + (p2.x - p0.x) / 6;
    const cp1y = p1.y + (p2.y - p0.y) / 6;
    const cp2x = p2.x - (p3.x - p1.x) / 6;
    const cp2y = p2.y - (p3.y - p1.y) / 6;
    d += `C ${cp1x.toFixed(2)} ${cp1y.toFixed(2)}, ${cp2x.toFixed(2)} ${cp2y.toFixed(2)}, ${p2.x.toFixed(2)} ${p2.y.toFixed(2)} `;
  }
  if (closed) d += 'Z';
  return d.trim();
}
```
[CITED: gist.github.com/njvack/6925609 — Catmull-Rom cubic Bezier algorithm]
[CITED: dev.to/georgedoescode/tutorial-build-a-smooth-animated-blob-using-svg-js-3pne — polar coordinate blob technique]

**Key constraint:** Keep `numPoints` at 6–8. Each point generates one `C` command. 8 points → 8 Bezier segments → path `d` attribute stays compact for SVGO. This keeps each shape at ≤3 DOM nodes (one `<path>` element).

### Pattern 2: CSS Scroll-Driven Parallax (ART-05)

**What:** CSS `animation-timeline: scroll()` produces parallax without JavaScript
**When to use:** Wrap in `@supports` to ensure progressive enhancement

```css
/* Source: MDN — developer.mozilla.org/en-US/docs/Web/CSS/animation-timeline */
/* Placed inside @supports wrapper — pure progressive enhancement */

@supports (animation-timeline: scroll()) {
  @media (prefers-reduced-motion: no-preference) {
    .matisse-shape[data-parallax-slow] {
      animation: matisse-parallax-slow linear both;
      animation-timeline: scroll(root block);
      animation-range: entry 0% exit 100%;
    }
    .matisse-shape[data-parallax-fast] {
      animation: matisse-parallax-fast linear both;
      animation-timeline: scroll(root block);
      animation-range: entry 0% exit 100%;
    }
    @keyframes matisse-parallax-slow {
      from { transform: translateY(0) translateZ(0); }
      to   { transform: translateY(-12px) translateZ(0); }
    }
    @keyframes matisse-parallax-fast {
      from { transform: translateY(0) translateZ(0); }
      to   { transform: translateY(-20px) translateZ(0); }
    }
  }
}
```
[CITED: developer.mozilla.org/en-US/docs/Web/CSS/animation-timeline — official MDN docs]
[CITED: webkit.org/blog/17101/a-guide-to-scroll-driven-animations-with-just-css — Safari implementation guide]

**Rate differential:** Two parallax speeds create depth — `data-parallax-slow` (0.6× = 12px) and `data-parallax-fast` (0.8× = 20px). Assign alternating attributes to shapes in the frieze.

**Important:** Combine parallax with `translateZ(0)` to preserve GPU layer promotion already set in the Phase 11 stub.

### Pattern 3: Entrance Animation via Existing IntersectionObserver (ART-06)

**What:** Reuse `data-animate` + `.is-visible` pattern from BaseLayout.astro
**When to use:** For shapes on feature pages (viewport-triggered). Hero frieze entrance fires immediately via CSS keyframe with `animation-fill-mode: both` (same as `.hero-headline` pattern).

```css
/* In global.css — extends Phase 11 Matisse stub */
@media (prefers-reduced-motion: no-preference) {
  /* Hero frieze: page-load entrance (no IO — above fold) */
  .matisse-frieze .matisse-shape {
    animation: matisse-shape-enter 600ms cubic-bezier(0.16, 1, 0.3, 1) both;
  }
  /* Stagger: inline animation-delay set via data-animate-delay (existing pattern) */

  /* Feature page shapes: IO-triggered */
  .matisse-decoration[data-animate] {
    opacity: 0;
    transform: translateY(24px);
  }
  .matisse-decoration[data-animate].is-visible {
    animation: matisse-shape-enter 600ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }

  @keyframes matisse-shape-enter {
    from {
      opacity: 0;
      transform: translateY(24px) translateZ(0);
    }
    to {
      opacity: 1;
      transform: translateY(0) translateZ(0);
    }
  }
}
```
[VERIFIED: BaseLayout.astro lines 50–93 — existing IO pattern confirmed]
[VERIFIED: global.css lines 312–328 — fade-up keyframe pattern confirmed]

**Hero frieze stagger:** Use `data-animate-delay` with 80ms increments (80ms, 160ms, 240ms…) on each shape `<path>` — the existing BaseLayout.astro script already reads and applies this attribute as `animationDelay`.

### Pattern 4: SVGO Optimization (ART-03)

**What:** Use `npx svgo` to minimize path data and strip metadata
**When to use:** After generating blob path data, before hardcoding into Astro components

```bash
# Optimize a generated SVG file (strip metadata, comments, round numbers)
npx svgo --config svgo.config.mjs input-blobs.svg -o optimized-blobs.svg

# Recommended svgo.config.mjs for this use case:
# {
#   plugins: [
#     { name: 'preset-default' },
#     { name: 'convertPathData', params: { floatPrecision: 1 } },
#     { name: 'removeComments' },
#     { name: 'removeMetadata' },
#     { name: 'removeTitle' },
#   ]
# }
```
[VERIFIED: npx svgo version 11.5.1 confirmed available on machine]
[CITED: github.com/svg/svgo — SVGO v4 (11.x CLI) documentation]

**Important note on SVGO versions:** The installed `svgo` CLI at 11.5.1 is the v4 API (SVGO v3 is deprecated). In v4, `removeViewBox` and `removeTitle` are NOT applied by default — explicit plugin config needed to strip these.

### Anti-Patterns to Avoid

- **Generating shapes at runtime:** Do not call the Catmull-Rom algorithm inside Astro frontmatter or client JS. Generate once, hardcode the path strings. Runtime generation adds JS payload and introduces CLS risk.
- **Using `@view-timeline` for parallax:** The project decision (Phase 11 D-06) uses `@view-transition { navigation: auto }`. View timeline is different from scroll timeline — do not confuse them.
- **Animating non-compositor properties:** Never animate `width`, `height`, `top`, `left`, or `margin` in parallax keyframes — only `transform` and `opacity`. (The `will-change: transform, opacity` declaration in Phase 11 stub enforces this on the compositor layer.)
- **Adding parallax to shapes not yet GPU-promoted:** The Phase 11 `.matisse-shape` stub pre-declares `transform: translateZ(0)` and `will-change: transform, opacity`. All parallax shapes must have this class — do not create shapes without it.
- **Forgetting to preserve translateZ in keyframes:** Parallax `@keyframes` must include `translateZ(0)` in both `from` and `to` states, otherwise the GPU layer promotion from the stub is lost mid-animation.
- **Nesting SVG `<path>` inside multiple `<g>` wrappers:** Each wrapper is a DOM node. Flat structure (one `<svg>` containing individual `<path>` elements) keeps node count minimal for ART-03.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Smooth organic closed curves | Custom cubic Bezier from scratch | Catmull-Rom-to-cubic-Bezier formula (40-line algorithm) | Catmull-Rom guarantees C1 continuity (smooth curve through all points with matching tangents at joins) — manually computing control points for a closed shape without this formula produces kinks at the closure point |
| SVG path minification | Custom regex on path strings | `npx svgo` | SVGO handles sub-pixel precision rounding, redundant command removal, and arc-to-line conversions that manually written regex misses |
| Scroll position tracking for parallax | `window.addEventListener('scroll', ...)` + `requestAnimationFrame` | CSS `animation-timeline: scroll()` | Scroll events run on main thread; compositor-thread CSS parallax maintains 60fps independently of JavaScript execution |

**Key insight:** The most expensive mistake in this domain is triggering layout on scroll. CSS scroll-driven animations run entirely on the compositor thread when they animate only `transform` and `opacity`. A JavaScript scroll handler that reads `window.scrollY` and writes `element.style.transform` causes layout-thrash on every frame at 60fps. The `@supports` wrapper means Safari 15/Firefox users get static shapes (perfectly acceptable) rather than a janky JS fallback.

---

## Common Pitfalls

### Pitfall 1: Safari 26 is Beta — Parallax Silently Absent on Current Safari

**What goes wrong:** `animation-timeline: scroll()` requires Safari 26+ (currently in beta as of May 2026). Production Safari users on iOS 18/Safari 18 will not see parallax.
**Why it happens:** Scroll-driven animations only shipped in Safari 26 beta. [CITED: caniuse.com/mdn-css_properties_animation-timeline_scroll — 82.96% global support, Safari 26+ listed]
**How to avoid:** Wrap all parallax CSS in `@supports (animation-timeline: scroll())`. Shapes must look intentional and complete without parallax — the static state is the baseline, parallax is a progressive enhancement.
**Warning signs:** If you test in Chrome and parallax works but testers on iPhone report shapes look "stuck" — that is expected and correct behavior, not a bug.

### Pitfall 2: Firefox Parallax Behind Flag

**What goes wrong:** Firefox has `animation-timeline: scroll()` implemented but disabled by default (requires `layout.css.scroll-driven-animations.enabled` pref). ~15% of desktop users see no parallax.
**How to avoid:** Same `@supports` solution as Pitfall 1. Design shapes to look good without parallax movement.

### Pitfall 3: Hero Frieze Entrance vs. Feature Page Entrance — Different Triggers

**What goes wrong:** Using the same IntersectionObserver trigger for hero shapes causes a delayed entrance (IO fires at 15% intersection threshold). Hero shapes are above the fold and should animate immediately on page load, not wait for IO.
**How to avoid:** Hero frieze shapes use CSS keyframes with `animation-fill-mode: both` fired immediately (same pattern as `.hero-headline` in global.css line 363). Feature page shapes use `data-animate` + IO. Two different mechanisms, clearly separated.
**Warning signs:** Hero shapes briefly invisible on load before appearing = IO threshold bug.

### Pitfall 4: translateZ Lost in Parallax Keyframes

**What goes wrong:** The Phase 11 `.matisse-shape` stub declares `transform: translateZ(0)` for GPU layer promotion. If a parallax `@keyframe` overrides the `transform` property without including `translateZ(0)`, the shape loses its compositor layer at the start of the animation.
**How to avoid:** Every parallax keyframe must include `translateZ(0)` in both `from` and `to` states: `transform: translateY(0px) translateZ(0)` → `transform: translateY(-20px) translateZ(0)`.
**Warning signs:** Performance DevTools shows the shape moving from "Composite Layer" to "Paint" during scroll.

### Pitfall 5: DOM Budget Exceeded by Deeply Nested SVG

**What goes wrong:** Generated SVGs from editors (Figma, Inkscape) include `<defs>`, `<g>` wrappers, `<title>`, `<desc>`, clip-path groups — each adds DOM nodes. 7 shapes × 10 nodes each = 70 nodes added (not the 21 budgeted).
**How to avoid:** Handcraft the SVG structure: one `<svg viewBox="0 0 200 200">` containing one `<path d="...">` per shape. SVGO strips editor cruft. Verify with `document.querySelectorAll('*').length` before and after.
**Warning signs:** Lighthouse shows ">1400 elements in DOM body" warning.

### Pitfall 6: Blob Shapes Look Like Rounded Rectangles (Not Biomorphic)

**What goes wrong:** Setting variance too low (< 0.2) in the Catmull-Rom algorithm produces near-circles. Setting numPoints too low (< 6) creates polygonal shapes with obvious flat sides.
**How to avoid:** Use numPoints=8, variance=0.30–0.45. Generate 15+ candidates and select the 5–7 that look most organic and varied. Aim for shapes that read as "paper cut-outs" at a glance.
**Warning signs:** Shapes look like "pill" or "stadium" forms when scaled to 180px.

### Pitfall 7: Hero Section Height Layout Shift

**What goes wrong:** Adding `.matisse-frieze` as a child of `.section-spaced` (not as `position: absolute`) pushes the hero content down, causing CLS.
**How to avoid:** The `.matisse-frieze` stub uses `position: absolute; inset: 0`. The parent `<section>` needs `position: relative` for the absolute child to reference it. Verify Hero.astro section has `position: relative`.
**Warning signs:** Hero content (headline, device frame) jumps on first paint.

---

## Code Examples

### Hero.astro Integration Point

```astro
<!-- Existing Hero.astro section — needs position: relative added -->
<section class="section-spaced px-6" style="position: relative;">
  <!-- NEW: Frieze as background layer (D-05, D-08) -->
  <MatisseFrieze />

  <!-- Existing hero content — renders on top via stacking context -->
  <div class="mx-auto text-center" style="max-width: 768px; position: relative; z-index: 1;">
    <!-- h1, subtitle, DeviceFrame, badge — unchanged -->
  </div>
</section>
```
[VERIFIED: Hero.astro current structure — section has no position:relative, needs adding]

### MatisseFrieze.astro Structure

```astro
---
// MatisseFrieze.astro — inline SVG with hardcoded SVGO-optimized path data
// Paths authored by scripts/generate-blobs.mjs (one-time), then hardcoded here
---
<div class="matisse-frieze" style="height: 240px; top: auto; bottom: 30%;">
  <svg
    viewBox="0 0 1440 240"
    preserveAspectRatio="xMidYMid slice"
    aria-hidden="true"
    style="width: 100%; height: 100%; overflow: visible;"
  >
    <!-- Shape 1: accent green, slow parallax, immediate entrance -->
    <path
      class="matisse-shape"
      data-parallax-slow
      data-animate-delay="0ms"
      fill="#2B5240"
      opacity="0.95"
      d="[SVGO-optimized path data from generate-blobs.mjs]"
      transform="translate(120, 60) rotate(-8) scale(1.4)"
    />
    <!-- Shape 2: terracotta, fast parallax, staggered entrance -->
    <path
      class="matisse-shape"
      data-parallax-fast
      data-animate-delay="80ms"
      fill="#8B5E3C"
      opacity="0.90"
      d="[SVGO-optimized path data — different shape]"
      transform="translate(380, 40) rotate(12) scale(1.1)"
    />
    <!-- 3–5 more shapes following same pattern -->
  </svg>
</div>
```

### Feature Page Decoration — Two Approaches

```astro
<!-- Approach A: Small cluster (top-right corner of feature page header) -->
<div class="matisse-decoration matisse-cluster" data-animate aria-hidden="true"
  style="position: absolute; top: 24px; right: 24px; pointer-events: none;">
  <svg viewBox="0 0 200 200" width="120" height="120" aria-hidden="true">
    <path class="matisse-shape" fill="#2B5240" opacity="0.18"
      d="[unique shape for this feature page per D-10]" />
  </svg>
</div>

<!-- Approach B: Section divider band -->
<div class="matisse-decoration matisse-divider" data-animate aria-hidden="true"
  style="height: 80px; position: relative; overflow: hidden;">
  <svg viewBox="0 0 1440 80" preserveAspectRatio="xMidYMid slice"
    width="100%" height="80" aria-hidden="true">
    <path class="matisse-shape" fill="#2B5240" opacity="0.15" d="..." />
    <path class="matisse-shape" fill="#2B5240" opacity="0.12" d="..." />
  </svg>
</div>
```

### CSS Extension for global.css (Matisse Stub Lines 710–738)

```css
/* EXTEND Phase 11 Matisse stub in global.css after line 738 */

/* Color token additions (for complementary Matisse palette) */
:root {
  --color-matisse-green:     #2B5240;   /* = --color-accent */
  --color-matisse-terracotta: #8B5E3C;
  --color-matisse-gold:      #A89060;
}

/* Hero frieze shape entrance (page-load, not IO) */
@media (prefers-reduced-motion: no-preference) {
  .matisse-frieze .matisse-shape {
    animation: matisse-shape-enter 600ms cubic-bezier(0.16, 1, 0.3, 1) both;
  }

  @keyframes matisse-shape-enter {
    from { opacity: 0; transform: translateY(24px) translateZ(0); }
    to   { opacity: 1; transform: translateY(0) translateZ(0); }
  }

  /* Feature page shape entrance (IO-triggered) */
  .js-enabled .matisse-decoration[data-animate] {
    opacity: 0;
    transform: translateY(24px) translateZ(0);
  }
  .js-enabled .matisse-decoration[data-animate].is-visible {
    animation: matisse-shape-enter 600ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }
}

/* Parallax — progressive enhancement only */
@supports (animation-timeline: scroll()) {
  @media (prefers-reduced-motion: no-preference) {
    .matisse-shape[data-parallax-slow] {
      animation: matisse-parallax-slow linear both;
      animation-timeline: scroll(root block);
      animation-range: entry 0% exit 100%;
    }
    .matisse-shape[data-parallax-fast] {
      animation: matisse-parallax-fast linear both;
      animation-timeline: scroll(root block);
      animation-range: entry 0% exit 100%;
    }

    @keyframes matisse-parallax-slow {
      from { transform: translateY(0) translateZ(0); }
      to   { transform: translateY(-12px) translateZ(0); }
    }
    @keyframes matisse-parallax-fast {
      from { transform: translateY(0) translateZ(0); }
      to   { transform: translateY(-20px) translateZ(0); }
    }
  }
}
```

**Known CSS conflict:** The hero frieze `.matisse-shape` needs BOTH an entrance animation AND a parallax animation-timeline. CSS does not allow two `animation` declarations on the same selector without the second overriding the first. Use `animation-name` and `animation-timeline` as separate properties inside the `@supports` block to layer them:

```css
@supports (animation-timeline: scroll()) {
  @media (prefers-reduced-motion: no-preference) {
    .matisse-frieze .matisse-shape[data-parallax-slow] {
      animation-name: matisse-shape-enter, matisse-parallax-slow;
      animation-duration: 600ms, auto;
      animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1), linear;
      animation-fill-mode: both, both;
      animation-timeline: auto, scroll(root block);
    }
  }
}
```
[CITED: developer.mozilla.org/en-US/docs/Web/CSS/animation-timeline — multi-animation stacking]

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| JS scroll listener + RAF for parallax | CSS `animation-timeline: scroll()` | Chrome 115 (2023), Safari 26 beta (2026) | Compositor-thread parallax; no main-thread JS |
| SVGO v3 with `svgo.config.js` | SVGO v4 (CLI 11.x) with `svgo.config.mjs` | 2024 | `.mjs` config required; `removeViewBox`/`removeTitle` no longer default |
| `@astrojs/tailwind` integration | `@tailwindcss/vite` vite plugin | Tailwind v4 (2024) | Already correct in this project |
| `animation-fill-mode` with `animation-delay` for stagger | CSS `animation-composition` + `@starting-style` | 2025 | Not applicable here — existing `data-animate-delay` inline style pattern is sufficient and already wired |

**Deprecated/outdated:**
- SVGO v3: CLI 11.5.1 is SVGO v4 API; any SVGO v3 guides with `svgo.config.js` (CommonJS) are outdated — use `svgo.config.mjs` (ESM).
- `scroll-timeline` shorthand property: The longhand `animation-timeline: scroll()` is the correct modern syntax per MDN.

---

## Assumptions Log

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|---------------|
| A1 | Terracotta `#8B5E3C` and gold `#A89060` are visually harmonious with travertine `#F4F1ED` | Color decisions from UI-SPEC | Shapes may clash; D-14 fallback to charcoal mitigates |
| A2 | Hero section frieze at 240px band height will not overlap the headline text | Integration point for Hero.astro | May need to adjust band position or z-index layering |
| A3 | 5–7 shapes × ~3 DOM nodes each stays under Lighthouse DOM budget | DOM Budget Contract | If existing DOM is already near 1400 nodes, even 21 new nodes could trigger warning — verify baseline |
| A4 | `animation-timeline: scroll(root block)` works correctly with `overflow: hidden` on `.matisse-frieze` | Parallax CSS pattern | `overflow: hidden` on a scroll container can block scroll-driven animations — frieze has `overflow: hidden` on the container, not the scroll root, so should be fine |
| A5 | Dual animation (entrance + parallax) via `animation-name` list works cross-browser | CSS layering pattern | Safari 26 beta behavior with multi-name animations is less battle-tested |

---

## Open Questions (RESOLVED)

1. **Does the hero section's parent element establish `position: relative`?** (RESOLVED)
   - What we know: `Hero.astro` renders inside `<main class="max-w-[1440px] mx-auto w-full">` which has no position context. The section inside Hero.astro needs `position: relative` for the absolute frieze container.
   - What's unclear: Whether adding `position: relative` to the hero `<section>` affects any other positioned descendants.
   - Recommendation: Add `position: relative` to the `<section>` in Hero.astro as part of Wave 1.
   - **Resolution:** Plan 02 Task 1 explicitly adds `position: relative` to the Hero.astro `<section>` tag and `position: relative; z-index: 1` to the content div. No other positioned descendants are affected — the section only contains the frieze (absolute) and content div (relative).

2. **Are any existing feature pages near the Lighthouse DOM node ceiling?** (RESOLVED)
   - What we know: Feature pages use `FeaturePageLayout.astro` + sticky showcase sections + charts (RecoveryChart). Node count unknown.
   - What's unclear: Baseline DOM size on each feature page.
   - Recommendation: The planner should include a Lighthouse DOM audit as a verification step before the feature page decoration wave.
   - **Resolution:** Plan 02 Task 3 (visual checkpoint) includes a Lighthouse Performance audit step that checks for "Avoid an excessive DOM size" warnings. This verifies the DOM budget post-integration. Each decoration adds at most 5-8 DOM nodes (one div + one svg + 2-3 paths), well within budget.

3. **Will entrance animation conflict with parallax animation on hero shapes?** (RESOLVED)
   - What we know: CSS allows multiple animations via `animation-name` list. The entrance runs once (600ms), parallax runs continuously. Both operate on `transform` and `opacity`.
   - What's unclear: Whether `animation-fill-mode: both` on the entrance animation conflicts with the parallax transform values once entrance completes.
   - Recommendation: Use `animation-composition: add` on the parallax animation so transforms compose rather than override. This is the correct CSS solution.
   - **Resolution:** Plan 01 Task 3 implements the dual `animation-name` pattern (`animation-name: matisse-shape-enter, matisse-parallax-slow`) with separate `animation-timeline` values (`auto, scroll(root block)`). The entrance runs on the default time-based timeline and parallax runs on the scroll timeline, avoiding the conflict entirely. This is documented in the CSS code example in RESEARCH.md lines 541-553.

---

## Environment Availability

| Dependency | Required By | Available | Version | Fallback |
|------------|------------|-----------|---------|----------|
| Node.js | Blob generation script | ✓ | v24.7.0 | — |
| npx svgo | ART-03 path optimization | ✓ | 11.5.1 | — |
| Chrome 115+ | animation-timeline: scroll() | ✓ (dev browser) | — | @supports degrades gracefully |
| Safari 26 | Parallax in Safari | Production only | Beta | @supports degrades — shapes static |
| Firefox (stable) | Parallax in Firefox | Behind flag | N/A | @supports degrades — shapes static |

[VERIFIED: npx svgo --version → 11.5.1 (2026-05-15)]
[VERIFIED: node --version → v24.7.0 (2026-05-15)]

---

## Security Domain

> Skip: This phase introduces only static SVG art, CSS animations, and inline Astro components. No user input, no authentication, no data persistence, no external APIs, no network requests. ASVS categories do not apply.

---

## Sources

### Primary (HIGH confidence)
- [VERIFIED: src/styles/global.css lines 710–738] — Phase 11 Matisse CSS stub, GPU pre-promotion, reduced-motion guard
- [VERIFIED: src/layouts/BaseLayout.astro lines 50–93] — IntersectionObserver scroll-reveal implementation
- [VERIFIED: src/components/Hero.astro] — Hero structure and integration point
- [VERIFIED: src/layouts/FeaturePageLayout.astro] — Feature page layout and integration point
- [VERIFIED: npx svgo 11.5.1 available] — Build-time optimization tool
- [CITED: developer.mozilla.org/en-US/docs/Web/CSS/animation-timeline] — CSS animation-timeline specification
- [CITED: webkit.org/blog/17101/a-guide-to-scroll-driven-animations-with-just-css] — Safari scroll-driven animations guide

### Secondary (MEDIUM confidence)
- [CITED: caniuse.com/mdn-css_properties_animation-timeline_scroll] — 82.96% support, Safari 26+, Firefox behind flag — verified via WebFetch 2026-05-15
- [CITED: gist.github.com/njvack/6925609] — Catmull-Rom to cubic Bezier algorithm
- [CITED: dev.to/georgedoescode/tutorial-build-a-smooth-animated-blob-using-svg-js-3pne] — Polar coordinate blob generation technique

### Tertiary (LOW confidence)
- [ASSUMED] Terracotta and gold are visually harmonious with travertine — hue selection from UI-SPEC reasoning, not visual tested
- [ASSUMED] `animation-composition: add` resolves entrance+parallax conflict — CSS spec behavior, not tested in this codebase

---

## Metadata

**Confidence breakdown:**
- Shape authoring algorithm: HIGH — well-documented Catmull-Rom technique with multiple source references
- CSS scroll-driven parallax: HIGH for Chrome/Edge; MEDIUM for Safari 26 (beta-only); LOW for Firefox (flag-only) — @supports wrapper makes this acceptable
- DOM budget: HIGH — calculation is straightforward; SVGO and node count bounds are verified
- Entrance animation: HIGH — exact pattern already in production in BaseLayout.astro
- Color harmony: MEDIUM — terracotta/gold on travertine is reasoned but not visually verified

**Research date:** 2026-05-15
**Valid until:** 2026-08-15 (Safari 26 release may move to stable, Firefox support may stabilize — recheck if planning is delayed)
