# Feature Research

**Domain:** Art-direction, typography, device-frame realism, and interaction polish on an existing Astro 6 + Tailwind v4 marketing site
**Researched:** 2026-05-14
**Confidence:** HIGH (stack patterns verified via docs/Context7), MEDIUM (Matisse implementation patterns — no exact precedent found; derived from organic shape SVG/clip-path ecosystem)

---

## Milestone Scope

This research covers ONLY new features for v3.0. The following already exist and are out of scope:

- CSS iPhone device frames (DeviceFrame.astro, `.device-frame` CSS class)
- Choreographed animations (hero entrance, stagger delays, sticky scroll, wheel arc reveal)
- General Sans font loaded via Astro Font API
- Noise texture overlay, micro-interactions, iPod click wheel
- Animated stat counters, App Store badges
- All 10 pages, responsive across 5 breakpoints

---

## Feature Landscape

### Table Stakes (Users Expect These)

These are the baseline for a premium marketing site in 2026. Missing any of these makes the site feel unfinished or cheap.

| Feature | Why Expected | Complexity | Notes |
|---------|--------------|------------|-------|
| Typography weight contrast: large/light headings + smaller/heavier body | Standard premium editorial pattern since 2022 (Apple, Linear, Vercel). Skipping a weight level — e.g. Light (300) headings + Semibold (600) body — reads as intentional. Same weight across sizes reads as amateur. | LOW | General Sans supports 300–700. Only CSS changes in `global.css`: recalibrate `--text-display`, `--text-heading`, `--text-body` weights. No new dependencies. |
| Realistic device frame depth: proper shadow layering, screen inset | Marketing sites with device mockups that look flat reduce product credibility. A multi-layer `box-shadow` (natural penumbra, not crisp-edged) is now baseline for any app marketing site. | LOW | Existing `DeviceFrame.astro` has a basic 3-step shadow. Needs: (1) layered `box-shadow` with 4–5 steps doubling blur/halving opacity, (2) screen-inset shadow to embed screen in bezel, (3) action button visually distinct from volume buttons. All pure CSS. |
| Screenshot fit correctness: no extra border, no text misalignment | Device mockup images that show UI out of alignment with frame corners instantly break the illusion. | LOW | Fix `object-fit` vs export dimensions. Verify screenshots exported at exactly 1179x2556px (3x Retina iPhone 15 Pro). Likely a one-line CSS fix or screenshot re-export. |
| Smooth anchor navigation within a page | `scroll-behavior: smooth` on `html` is table stakes. Jarring jumps on in-page links feel unpolished. | LOW | Add `html { scroll-behavior: smooth; }` if not present. |
| Remove deprecated QR code section | QR codes for App Store links are a 2021-era pattern. Contemporary marketing sites drive downloads via direct badge links. | LOW | Delete section from the relevant Astro page. No dependencies. |

### Differentiators (Competitive Advantage)

These set the site apart from generic app marketing templates.

| Feature | Value Proposition | Complexity | Notes |
|---------|-------------------|------------|-------|
| Matisse Swimming Pool art direction — organic cut-out shapes as decorative frieze in hero | Elevates the site from "another fitness app" to a product with genuine aesthetic identity. Matisse's 1952 Swimming Pool is a continuous horizontal strip of blue gouache cut-out swimmers and sea-forms on white paper ringing the dining room walls. On web: a full-width SVG band of simplified organic forms crossing the hero from edge to edge. High memorability, strong differentiation from the chart/metric aesthetic of Garmin/WHOOP/TrainingPeaks. | MEDIUM | Implementation: `<svg>` element with `<path>` Bezier forms, `aria-hidden`, as a decorative background layer. Color: accent green (`#2B5240`) on travertine (`#F4F1ED`). 8–12 abstract swimmer/fish forms. `preserveAspectRatio="xMidYMid slice"`. Placed as full-width band at bottom of hero section. No animation required — static cut-outs are the reference. |
| Page-to-page smooth transitions via Astro ViewTransitions | The contralabs.com reference is about overall flow smoothness — navigation feel is what separates polished from amateur. Astro's built-in `<ViewTransitions />` provides cross-fade between pages, eliminating the harsh white flash. Supported: Chrome 111+, Edge 111+, Safari 18+ (85%+ market share). Automatic fallback in Firefox. | LOW | Add `<ViewTransitions />` to `BaseLayout.astro` `<head>`. Apply `transition:name="nav"` to header so it persists. Apply `transition:animate="fade"` to `<main>`. 3–5 markup lines total. |
| Typography scale recalibration: fluid `clamp()` sizing + intentional weight inversion | Light weight for large headings reads as confidence and restraint — contrast between visual mass (large size) and stroke weight (thin) creates premium editorial tension. Heavy body (Semibold 600) on small copy ensures readability. Existing site uses 600 weight on both headings and body — no hierarchy contrast. | LOW | Recalibrate `global.css` tokens: display/heading weight → 300, body → 500–600. Verify General Sans 300 is in Fontshare CDN load config. Extend `clamp()` sizing pattern from hero h1 to h2/h3. |
| Scroll-driven parallax depth on Matisse shapes | The frieze can subtly shift at a different rate than the page content as the user scrolls, reinforcing the "art anchored to the wall" metaphor — shapes feel spatial, not flat. | MEDIUM | CSS `animation-timeline: scroll()` on the SVG decorative layer. 5–10% offset from page scroll. Must be gated behind `prefers-reduced-motion: no-preference`. Test on real iOS device before merging — iOS scroll inertia can amplify motion. Implement AFTER static shapes are confirmed working. |

### Anti-Features (Commonly Requested, Often Problematic)

| Feature | Why Requested | Why Problematic | Alternative |
|---------|---------------|-----------------|-------------|
| Animated SVG shape morphing (continuously shifting blob) | Feels alive and modern | At 60fps, autonomous morphing drains battery on mobile. Defeats the Matisse reference — the artwork is static cut-outs on a wall, not animated forms. Lighthouse performance would drop. | Static SVG paths with optional scroll-offset. Motion only on explicit scroll, never autonomous looping. |
| Heavy parallax (3+ layers at different rates) | Creates strong depth illusion in isolation | Multiple competing scroll rates induce motion sickness on iOS (which has its own scroll inertia). Site is at Lighthouse 98 mobile — multi-layer parallax can tank this. | Single-layer subtle offset (one SVG layer at 5–10% scroll rate). Test on real device. |
| GSAP ScrollTrigger | Powerful, well-documented | 48KB minimum bundle. Phase 7 decision was CSS-only animations — correct for a static marketing site. CSS `animation-timeline` / `view-timeline` now covers all GSAP use cases from 2023. | CSS scroll-driven animations. Zero bundle cost. Compositor-thread. |
| Dark mode toggle | Users expect dark mode | Descoped in Phase 6 (D-06). Would require design token duplication across 10 pages. Travertine warm-white is core brand identity. App is light-mode-first. | Light mode only. `prefers-color-scheme: dark` respected with same palette. |
| Custom cursor / cursor trail | High-end agency aesthetic | Overrides platform conventions. Irrelevant on touch devices (10 of 10 Tuwa users are on iPhone). Adds JS overhead. Mismatched to "serious athletes and coaches" audience. | Micro-interaction polish: hover states, button scale transforms, underline reveals on nav links. |
| iPhone 17 device frame upgrade | Latest model signals currency | Existing iPhone 15 Pro frames are built and working. Cosmetic upgrade requires updating all DeviceFrame instances. iPhone 15 Pro is current enough for 2026. | Improve realism of existing frame (shadow depth, screen inset) — far higher ROI than model upgrade. |

---

## Feature Dependencies

```
Typography weight system
    └──requires──> Verify General Sans 300 weight loads (Astro Font API config)
    └──requires──> Update font-weight tokens in global.css
    └──enhances──> Matisse art direction (thin headline creates visual breathing room for decorative shapes)

Matisse SVG cut-out shapes
    └──requires──> Finalized hero layout (shapes positioned relative to hero structure)
    └──no-conflict-with──> DeviceFrame (shapes behind device, or in strip above/below — never overlapping frame)
    └──optionally-enhanced-by──> Scroll-driven parallax offset

iPhone frame realism improvements
    └──requires──> DeviceFrame.astro CSS-only changes (no component API changes)
    └──no-dependency-on──> Matisse shapes or typography

Astro ViewTransitions
    └──requires──> BaseLayout.astro head: add <ViewTransitions />
    └──CRITICAL-GOTCHA──> Existing hero animations use DOMContentLoaded — must migrate to
                           document.addEventListener('astro:page-load', ...) for animations
                           to replay on subsequent page navigations
    └──requires-verification──> nav persistence via transition:name="nav"

QR code section removal
    └──no-dependencies──> standalone deletion
    └──must-verify──> which file the section lives in (likely index.astro)

Scroll-driven parallax on Matisse shapes
    └──requires──> Matisse SVG shapes working correctly first
    └──requires──> prefers-reduced-motion gate
    └──requires──> real-device iOS test before merge
```

### Dependency Notes

- **ViewTransitions requires DOMContentLoaded → astro:page-load migration:** This is the most likely pitfall in the entire milestone. Astro's ViewTransitions replaces full page loads with client-side navigation — any animation setup that runs once on `DOMContentLoaded` will not re-run when the user navigates to a new page. The existing IntersectionObserver in `[data-animate]` and hero entrance animations must listen to `astro:page-load` event instead. This is a 2–4 line change per script block but easy to miss.

- **Matisse shapes require hero layout stability:** The SVG frieze must be authored knowing the final hero dimensions. Do typography recalibration first (changes hero text size/weight), then place the shapes.

- **Font weight 300 must be explicitly loaded:** Fontshare/Astro Font API will not load weights not declared in the font config. If 300 is not listed, the browser silently substitutes 400. Verify before authoring any type designs at weight 300.

---

## MVP Definition

### Launch With (v3.0 milestone targets)

- [ ] Typography weight recalibration — titles Light (300), body Heavier (500–600). Highest impact, lowest risk. Do first.
- [ ] Screenshot fit fix — verify `object-fit` and screenshot export dimensions. Do alongside typography.
- [ ] Remove QR code + adjacent App Store badge section — deletion only.
- [ ] iPhone frame realism — layered shadow, screen-inset, action button visual distinction.
- [ ] Matisse cut-out SVG frieze in hero — static SVG, `aria-hidden`, full-width decorative band.
- [ ] Astro ViewTransitions — page navigation cross-fade + DOMContentLoaded → astro:page-load migration.

### Add After Validation (v3.x)

- [ ] Scroll-driven parallax offset on Matisse shapes — add only after static shapes confirmed on real devices. Test iOS scroll feel before merging.
- [ ] `clamp()` fluid sizing extension to h2/h3 on feature pages — follow-up pass after hero typography confirmed.

### Future Consideration (v4+)

- [ ] Matisse-inspired organic SVG section dividers on feature deep-dive pages — if hero treatment is well-received.
- [ ] Astro `transition:name` morphing for device frame element across pages — shared-element transition from hero to feature page. High complexity, high payoff, needs design exploration first.

---

## Feature Prioritization Matrix

| Feature | User Value | Implementation Cost | Priority |
|---------|------------|---------------------|----------|
| Typography weight recalibration | HIGH — visible across all 10 pages, raises perceived quality ceiling instantly | LOW — CSS token changes + font config check | P1 |
| Screenshot fit fix | HIGH — broken fit actively undermines device frame illusion | LOW — 1–2 line fix likely | P1 |
| Remove QR code section | MEDIUM — cleaner conversion flow | LOW — deletion only | P1 |
| iPhone frame realism | MEDIUM — builds product credibility subconsciously | LOW — pure CSS | P1 |
| Matisse SVG cut-out frieze | HIGH — primary differentiator for site identity | MEDIUM — SVG path design + responsive positioning | P1 |
| Astro ViewTransitions | MEDIUM — navigation smoothness (contralabs reference) | LOW — 3–5 markup lines + script migration | P1 |
| Scroll-driven parallax on shapes | LOW-MEDIUM — adds depth; motion sickness risk on mobile | MEDIUM — CSS scroll timeline + real-device test | P2 |
| h2/h3 fluid clamp sizing across feature pages | LOW — refinement | LOW | P2 |

---

## Implementation Notes by Feature

### Typography Weight System

General Sans (Fontshare) supports: 300 (Light), 400 (Regular), 500 (Medium), 600 (SemiBold), 700 (Bold). The Astro Font API config must explicitly list all weights to load — verify `astro.config.mjs` experimental fonts config. If only 400 and 600 are listed, weight 300 will silently fall back to 400.

Recommended weight assignments:
```css
/* Display / Hero headline — was 600 */
.hero-headline { font-weight: 300; }

/* Section headings h2 — was 600 */
h2, .section-heading { font-weight: 300; }

/* Sub-headings h3 */
h3 { font-weight: 400; }

/* Body text — increase from implied 400 */
body { font-weight: 500; }

/* Labels, nav, CTAs — keep bold for legibility at small sizes */
.nav-link, .btn-cta, .nav-dropdown-title { font-weight: 600; }
```

Skip-a-weight rule: heading (300) and body (500–600) are separated by 200–300 numeric units — minimum for contrast to read as intentional rather than accidental.

### Matisse SVG Frieze

Reference: The Swimming Pool (1952) — continuous horizontal band of ultramarine blue cut-out swimmers, divers, fish on white paper. Forms are reduced to essence: no detail, only silhouette and gesture.

Web translation:
- `<svg viewBox="0 0 1440 120" preserveAspectRatio="xMidYMid slice" aria-hidden="true">`
- 8–12 `<path>` elements with Bezier curves; forms loosely referencing swimmers/water/sea-life
- Fill color: `var(--color-accent)` (`#2B5240`) — already in palette, provides high contrast on `#F4F1ED`
- Positioned as `position: absolute; width: 100%; bottom: 0;` within hero section container
- Hero section needs `position: relative; overflow: hidden` to clip shapes at edges
- Shapes authored at full resolution in Figma or Inkscape, then path data copied to SVG
- No JavaScript, no animation on MVP

### Device Frame Realism

Current `box-shadow` is functional but reads as flat. Layered shadow pattern (doubling blur, halving opacity):
```css
box-shadow:
  0 2px 4px rgba(0,0,0,0.18),    /* contact */
  0 8px 16px rgba(0,0,0,0.14),   /* near shadow */
  0 20px 40px rgba(0,0,0,0.10),  /* diffuse */
  0 40px 80px rgba(0,0,0,0.07),  /* ambient */
  inset 0 1px 0 rgba(255,255,255,0.12),  /* rim light */
  inset 0 -1px 0 rgba(0,0,0,0.4);       /* bottom bevel */
```

Screen inset (makes screen look embedded, not flush with bezel):
```css
/* On the screen inner div */
box-shadow: inset 0 2px 6px rgba(0,0,0,0.35), inset 0 0 1px rgba(0,0,0,0.2);
```

Action button (iPhone 15 Pro left side, above volume buttons): currently the `::before` pseudo-element uses `box-shadow: 0 36px 0 #2A2A2A` to draw two volume buttons. Add a third, visually distinct element for the action button at a different vertical position and slightly shorter width.

### Astro ViewTransitions — Critical Setup

```astro
---
import { ViewTransitions } from 'astro:transitions';
---
<head>
  <ViewTransitions />
</head>
```

Apply to header element: `<header transition:name="site-header" transition:animate="none">` — prevents header from cross-fading (it should persist).

Apply to main content: `<main transition:animate="fade">` — content cross-fades.

**Script migration (most important step):**
```javascript
// Replace:
document.addEventListener('DOMContentLoaded', setupAnimations);

// With:
document.addEventListener('astro:page-load', setupAnimations);
```

This ensures IntersectionObserver for `[data-animate]` elements, the stat counter observer, and the wheel animation all re-initialize correctly on each page navigation.

---

## Competitor Feature Analysis

| Feature | TrainingPeaks / Garmin | WHOOP | Tuwa v2.0 (current) | Tuwa v3.0 (target) |
|---------|------------------------|-------|----------------------|---------------------|
| Typography hierarchy | Uniform weight | Conventional bold/regular | Uniform 600 weight | Light headings (300) / heavier body (500–600) |
| Device mockups | PNG images (static) | High-quality PNGs | CSS frames (responsive) | CSS frames + realistic shadow depth |
| Page transitions | Full reload | Full reload | Full reload | ViewTransitions cross-fade |
| Decorative art direction | None | Abstract gradients | Noise texture overlay | Matisse cut-out organic shapes |
| Scroll animations | None | Minimal | Intersection Observer reveals | Reveals + optional scroll-driven parallax |

---

## Sources

- [Astro ViewTransitions official docs](https://docs.astro.build/en/guides/view-transitions/)
- [Astro ViewTransitions: 2 lines of code — BetterLink](https://eastondev.com/blog/en/posts/dev/20251202-astro-view-transitions-guide/)
- [Animating Multi-Page Navigations with Astro — Codrops](https://tympanus.net/codrops/2023/10/03/animating-multi-page-navigations-with-browser-view-transitions-and-astro/)
- [CSS Scroll-Driven Animations — MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Scroll-driven_animations)
- [Mastering CSS Scroll Timeline 2026 — DEV Community](https://dev.to/softheartengineer/mastering-css-scroll-timeline-a-complete-guide-to-animation-on-scroll-in-2025-3g7p)
- [Anatomy of a CSS Phone Mockup — Conor Luddy](https://www.conor.fyi/writing/anatomy-of-a-css-phone-mockup)
- [CSS clip-path shapes complete guide 2026 — UDT](https://ultimatedesigntools.com/blog/css-clip-path-shapes-guide/)
- [Organic Shape Animations with SVG clipPath — Codrops](https://tympanus.net/codrops/2017/06/28/organic-shape-animations-with-svg-clippath/)
- [Font Weight in Typography: Hierarchy & Contrast — Fontfabric](https://www.fontfabric.com/blog/typography-knowledge-weight-typography/)
- [Optimal Typography for Web Design 2025 — Elegant Themes](https://www.elegantthemes.com/blog/design/optimal-typography-for-web-design)
- [MoMA Henri Matisse: The Swimming Pool — interactive](https://www.moma.org/interactives/exhibitions/2014/matisse/the-swimming-pool.html)
- [Henri Matisse: The Cut-Outs — MoMA](https://www.moma.org/calendar/exhibitions/1429)
- [Web Design Trends 2026: Organic Shapes — Design Deluxe](https://designdeluxe.in/web-design-trends-2026-with-organic-shapes/)
- [Shadows in Web Design for Better UX 2025 — Innovate Media](https://innovatemedia.ca/how-shadows-shape-user-experience-in-modern-web-design/)
- [Mastering Smooth Page Transitions View Transitions API 2026 — DEV Community](https://dev.to/krish_kakadiya_5f0eaf6342/mastering-smooth-page-transitions-with-the-view-transitions-api-in-2026-31of)
- [Devices.css — CSS device mockup reference](https://devicescss.xyz/)

---

*Feature research for: Tuwa marketing site v3.0 — Art Direction & Interaction Polish*
*Researched: 2026-05-14*
