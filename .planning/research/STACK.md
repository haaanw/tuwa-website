# Stack Research

**Domain:** Marketing site art direction and interaction polish additions (v3.0 milestone)
**Researched:** 2026-05-14
**Confidence:** HIGH for CSS-native approaches, MEDIUM for Lenis, HIGH for font/animation libraries

> This document covers ONLY additions or changes needed for the v3.0 milestone.
> The existing Astro 6 + Tailwind v4 + MDX + Cloudflare Pages stack is validated and unchanged.

---

## Current Stack (validated, do not change)

| Package | Version | Role |
|---------|---------|------|
| astro | ^6.3.1 | SSG + Font API |
| tailwindcss | ^4.3.0 | Utility CSS |
| @tailwindcss/vite | ^4.3.0 | Tailwind v4 integration |
| @tailwindcss/typography | ^0.5.19 | Prose styles |
| @astrojs/mdx | ^5.0.4 | Blog MDX |
| @astrojs/sitemap | ^3.7.2 | Sitemap |
| chart.js | ^4.5.1 | Data charts |
| vite | ^6.4.2 | Build tool |
| qrcode | ^1.5.4 | (remove in v3.0 — QR section deleted) |

---

## Recommended Stack Additions

### 1. Typography Weight System — No New Package Needed

**What needs to change:** The Astro Font API in `astro.config.mjs` currently loads only `weights: ["400", "600"]`. General Sans is a variable font (single weight axis, Extra Light through Bold). The typography weight system (large/light titles, smaller/heavier body) requires weight 200 or 300 for display text.

**Change required — `astro.config.mjs`:**

```js
fonts: [
  {
    provider: fontProviders.fontshare(),
    name: "General Sans",
    cssVariable: "--font-general-sans",
    weights: ["200 700"],  // variable font range — one file, full axis
    styles: ["normal"],
    display: "swap",
    fallbacks: ["system-ui", "sans-serif"],
    optimizedFallbacks: true,
  }
]
```

Using a range string `"200 700"` instead of an array of discrete values causes Astro's Font API to download a single variable font file covering the full axis. An array like `["200", "300", "400", "600", "700"]` would download five separate static files. The range syntax is the correct approach for variable fonts.

**CSS token additions in `global.css`:**

```css
/* v3.0 typography weight tokens */
--font-weight-display: 250;   /* hero title — ultra-light, large */
--font-weight-heading: 300;   /* section headings */
--font-weight-body: 500;      /* body copy — slightly heavier than 400 */
--font-weight-label: 600;     /* caps labels, nav */
--font-weight-strong: 700;    /* CTAs, callouts */
```

The contrast between 250 (display) and 500 (body) is the typographic signature for this milestone. General Sans's variable axis supports arbitrary values between 200-700; no discrete weight steps needed.

**Confidence:** HIGH — General Sans variable font confirmed (1 weight axis, ExtraLight-Bold range). Astro Font API variable font range syntax confirmed in docs.

---

### 2. Matisse Cut-Out Art Direction — No New Package Needed

**Implementation approach:** Hand-authored inline SVG shapes in Astro components. No library required.

The Matisse "Swimming Pool" aesthetic uses:
- Flat biomorphic silhouettes (leaf, kidney, crescent, teardrop shapes)
- Bold flat fills — one color per shape, no gradients, no strokes
- Overlapping transparent/opaque layering
- Horizontal frieze arrangement (shapes flow across the viewport edge)

**Technical approach — inline SVG in `.astro` files:**

Each cut-out shape is a `<path>` or `<ellipse>` element in an inline `<svg>` positioned absolutely behind hero content. The SVG viewBox maps to the viewport width; shapes are authored with bezier curves in Figma or by hand.

```astro
<!-- MatisseFrieze.astro — example structure -->
<svg
  aria-hidden="true"
  viewBox="0 0 1440 320"
  preserveAspectRatio="xMidYMid slice"
  class="absolute inset-0 w-full h-full pointer-events-none"
>
  <path d="M0,160 C80,100 160,200 240,160 ..." fill="#2B5240" opacity="0.12" />
  <ellipse cx="800" cy="200" rx="120" ry="80" fill="#7A6E5C" opacity="0.10" />
  <!-- additional shapes -->
</svg>
```

**Animation of shapes (CSS only):** CSS `@keyframes` with `animation-timing-function: ease-in-out` and long durations (8-15s) for ambient drift. Use `will-change: transform` on animated shapes. Keep to `transform` only (translate, rotate, scale) — never animate the `d` attribute or `fill` in CSS without a library.

**Frieze/scroll parallax (CSS scroll-driven):** The horizontal frieze layer can shift at a different rate than page scroll using CSS scroll-driven animations:

```css
.frieze-layer {
  animation: frieze-drift linear;
  animation-timeline: scroll(root);
  animation-range: 0% 50%;
}
@keyframes frieze-drift {
  from { transform: translateX(0); }
  to   { transform: translateX(-60px); }
}
```

This runs on the compositor thread (GPU), zero JS, zero layout recalculation.

**Browser support for CSS scroll-driven:** Chrome 115+, Edge 115+, Safari 18+. Firefox: behind flag (`layout.css.scroll-driven-animations.enabled`). Progressive enhancement — shapes are visible and static on Firefox; parallax drift only in Chromium/Safari. Interop 2026 has cross-browser scroll-driven animations as a focus area, so Firefox default support is coming.

**Confidence:** HIGH — CSS clip-path, inline SVG, scroll-driven animations all confirmed. Firefox gap acknowledged and acceptable as progressive enhancement.

---

### 3. iPhone Frame Realism — No New Package Needed

**Current state:** `DeviceFrame.astro` uses inline CSS with reasonable values but has identified issues: extra border/text misalignment, and screenshot fit problems.

**Fix approach — CSS only:**

The existing component structure is correct (device-frame div + Dynamic Island pill + screen area + home indicator). Specific improvements:

- **Dynamic Island sizing:** Scale the pill proportionally to the frame width using a percentage. Current `width: 100px` is fixed; should be approximately `width: 34%` to remain proportional at all device frame sizes.
- **Bezel edge refinement:** Add physical side buttons as decorative `div` elements (`position: absolute`) on left/right edges — volume up, volume down, power/lock button. Each is 2-4px wide, ~20px tall, `pointer-events: none`, matching the titanium bezel color.
- **Screenshot fit:** The `aspect-ratio: 393/852` on the screen div matches the iPhone 15 Pro logical resolution exactly. If screenshots appear misaligned, verify: (a) screenshots exported at 393×852 logical pixels (not 1179×2556 without scaling consideration), and (b) switch from `object-fit: cover` to `object-fit: contain` with `background: #000` to avoid unexpected cropping.
- **Titanium edge effect:** Replace `border: 1px solid rgba(255,255,255,0.06)` with a two-tone gradient border using a wrapper element and `background: linear-gradient(...)` with `background-clip: border-box` technique, giving the impression of the polished titanium band.
- **Screen reflection:** A subtle `::after` pseudo-element with a white-to-transparent diagonal gradient at ~3% opacity inside the screen area simulates display glare.

No new packages. All fixes are CSS and HTML structure within the existing `DeviceFrame.astro` component.

**Confidence:** HIGH — CSS-only approach confirmed sufficient, no library gaps identified.

---

### 4. Interaction Polish — One Optional Package

The "contralabs.com-inspired flow" describes:
1. Smooth native scroll feel (momentum/inertia)
2. Smooth page transitions between routes
3. Refined micro-interactions (hover, focus, active states)

#### 4a. Page Transitions — Native CSS, Zero JS

**Use the `@view-transition` CSS at-rule** added to `global.css`. This is the zero-JS approach Astro now recommends over `<ClientRouter>`.

```css
/* In global.css — enables cross-document view transitions */
@view-transition {
  navigation: auto;
}
```

Pair with `view-transition-name` on the elements you want to animate between pages:

```css
.page-hero {
  view-transition-name: page-hero;
}
header {
  view-transition-name: site-header;
}
```

The default fade transition applies automatically. Named transitions morph matching elements between pages.

**Browser support:** Chrome 126+, Edge 126+, Safari 18.2+. Firefox: not yet supported (falls back to instant navigation — acceptable). No JS injected, no `<ClientRouter>` import needed.

**Do NOT add `<ClientRouter>` or the `astro:transitions` module.** The zero-JS native approach is strictly better for a static MPA at tuwa.app's traffic patterns. ClientRouter converts the MPA to a SPA, adding JS overhead and complexity. Astro's own docs state: "As browser APIs and web standards evolve, using Astro's `<ClientRouter />` will increasingly become unnecessary."

#### 4b. Smooth Scroll Feel — Lenis (Conditional, Recommended)

**Package:** `lenis` v1.3.23
**Install:** `npm install lenis`
**Bundle size:** ~3KB gzipped (confirmed, vanilla JS, framework-agnostic)

Lenis provides inertia-based smooth scrolling that gives the page the premium feel of high-end creative sites. It intercepts native scroll and replays it with a lerp (linear interpolation) easing curve. This is the mechanism behind the "contralabs feel."

**Use it if:** The product owner confirms the smooth momentum scroll feel is a design goal. If native iOS-style momentum scroll on desktop is the target, Lenis is the correct tool.

**Do NOT use `astro-lenis`** (the wrapper package): 61 weekly downloads, thin abstraction, maintenance risk. Use `lenis` directly in an Astro `<script>` tag in `BaseLayout.astro`:

```astro
<script>
  import Lenis from 'lenis';
  const lenis = new Lenis({
    duration: 1.2,
    easing: (t: number) => 1 - Math.pow(1 - t, 4),
  });
  function raf(time: number) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);
</script>
```

**Known conflict:** Lenis conflicts with Astro's `<ClientRouter>` (navigation breaks — GitHub issue #12725). Since v3.0 uses native `@view-transition` (no ClientRouter), this conflict does not apply.

**Skip if:** Smooth scroll is not confirmed as a design goal. Native scroll with `scroll-behavior: smooth` on the `:root` gives mild anchor-link smoothing at zero cost for a simpler approach.

**Confidence:** MEDIUM-HIGH — Lenis v1.3.23 confirmed, vanilla JS usage confirmed, ClientRouter conflict confirmed (mitigated). Exact KB gzip not measurable from public sources but consistently described as "ultra-lightweight ~3KB."

#### 4c. Micro-interactions — CSS Only

Hover lift effects, focus ring polish, and active state refinements are all achievable in CSS. Add a global easing override to `global.css`:

```css
/* Consistent easing across all interactive elements — v3.0 */
a, button, [role="button"] {
  transition-timing-function: cubic-bezier(0.25, 0.46, 0.45, 0.94);
}
```

No library needed.

---

## What NOT to Add

| Avoid | Why | Use Instead |
|-------|-----|-------------|
| `<ClientRouter>` from `astro:transitions` | Converts MPA to SPA, adds JS overhead, conflicts with Lenis, unnecessary since browser-native transitions now have 75%+ support | Native `@view-transition` CSS at-rule |
| `astro-lenis` wrapper | 61 weekly downloads, thin wrapper, maintenance risk | `lenis` direct import in Astro `<script>` |
| GSAP / MorphSVG | GSAP core is 48KB+; MorphSVG is a paid plugin — extreme overkill for ambient shape drift | CSS `@keyframes` on `transform` for static cut-outs |
| `anime.js` for cut-out shapes | 10KB for what CSS can do at 0KB | CSS `@keyframes` + `animation-timeline: scroll()` |
| `flubber` path interpolation | 19KB, only needed if morphing between topologically different SVG paths | Only relevant if shapes transform into each other on user interaction — not the frieze use case |
| Discrete font weight array `["200","300","400","600","700"]` | Downloads 5 static font files | Variable font range `"200 700"` — one file |
| `qrcode` npm package | Being removed (QR section deleted in v3.0) | Remove from `package.json` entirely |

---

## Installation

One new package is conditionally added:

```bash
# Add only if smooth momentum scroll is a confirmed design goal
npm install lenis
```

All other v3.0 features are delivered through:
- **Configuration change:** `astro.config.mjs` font weight range `"200 700"`
- **CSS additions:** `global.css` — font-weight tokens, `@view-transition`, scroll-driven animations, easing defaults
- **New Astro components:** `MatisseFrieze.astro` (inline SVG cut-out shapes)
- **Component edits:** `DeviceFrame.astro` — proportional Dynamic Island, side buttons, screenshot fit fix
- **Page edits:** Remove QR code + adjacent App Store badge section

Zero new build-time dependencies needed for the art direction features.

---

## Alternatives Considered

| Recommended | Alternative | When Alternative Makes Sense |
|-------------|-------------|-------------------------------|
| Native `@view-transition` CSS | `<ClientRouter>` (Astro) | Only if you need `transition:persist` for persistent state (audio players, video) — not applicable here |
| CSS scroll-driven animations | anime.js Scroll Observer | When Firefox support is non-negotiable and you need guaranteed cross-browser parity today |
| Hand-authored inline SVG | AI generators (Haikei, fffuel.co) | For rapid prototyping / shape ideation — use as design reference, not production output |
| `lenis` direct | `astro-lenis` wrapper | Never — the wrapper adds no value |
| Variable font range `"200 700"` | Static font files per weight | Only if variable font files are unavailable from the provider — General Sans has variable files |

---

## Version Compatibility

| Package | Compatible With | Notes |
|---------|-----------------|-------|
| lenis@1.3.23 | Astro 6.x, Vite 6.x, native `@view-transition` | Vanilla JS. Conflicts with `<ClientRouter>` — do not use both. |
| `@view-transition` CSS at-rule | Chrome 126+, Edge 126+, Safari 18.2+ | Firefox falls back to instant navigation gracefully. Interop 2026 focus area. |
| CSS scroll-driven animations | Chrome 115+, Edge 115+, Safari 18+ | Firefox behind flag. Progressive enhancement — shapes visible and static on Firefox. |
| General Sans variable font | Astro `fontProviders.fontshare()` | Weight range `"200 700"` confirmed supported by Fontshare (2 variable font files available). |

---

## Sources

- [pimpmytype.com — General Sans](https://pimpmytype.com/font/general-sans/) — variable font confirmed, 1 weight axis (ExtraLight-Bold) — HIGH confidence
- [Astro Font Provider API docs](https://docs.astro.build/en/reference/font-provider-reference/) — variable font `variableAxis` and weight range configuration — HIGH confidence
- [Astro zero-JS view transitions blog](https://astro.build/blog/future-of-astro-zero-js-view-transitions/) — `@view-transition { navigation: auto; }` canonical reference, Chrome 126/Edge 126 — HIGH confidence
- [Astro view transitions docs](https://docs.astro.build/en/guides/view-transitions/) — ClientRouter vs native guidance — HIGH confidence
- [MDN CSS scroll-driven animations](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Scroll-driven_animations) — browser support, `animation-timeline: scroll()` — HIGH confidence
- [Interop 2026 — WebKit](https://webkit.org/blog/17818/announcing-interop-2026/) — scroll-driven animations and view transitions cross-browser focus — MEDIUM confidence
- [Lenis GitHub — darkroomengineering/lenis](https://github.com/darkroomengineering/lenis) — version 1.3.23, vanilla JS, npm install name — HIGH confidence
- [Astro + Lenis ClientRouter conflict issue #12725](https://github.com/withastro/astro/issues/12725) — confirmed conflict, mitigated by native transitions — HIGH confidence
- [animejs v4 npm](https://www.npmjs.com/package/animejs) — version 4.2.2, 10KB gzipped, tree-shakeable, SVG morphTo — HIGH confidence
- [MDN CSS clip-path](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/clip-path) — hardware-accelerated, SVG path values supported — HIGH confidence
- [Dev.to: CSS scroll-driven animations 2026](https://dev.to/nickbenksim/creating-complex-scroll-driven-animations-with-pure-css-in-2026-17l) — scroll-driven parallax patterns — MEDIUM confidence
- [DevToolbox: view transitions guide 2026](https://devtoolbox.dedyn.io/blog/css-view-transitions-complete-guide) — browser support matrix current as of 2026 — MEDIUM confidence

---

*Stack research for: Tuwa marketing website — v3.0 Art Direction & Interaction Polish*
*Researched: 2026-05-14*
