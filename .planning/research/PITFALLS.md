# Pitfalls Research

**Domain:** Athletic/fitness app marketing website — Matisse art direction, typography system, iPhone frame realism, interaction polish
**Project:** Tuwa — precision training load and recovery management
**Researched:** 2026-05-14
**Confidence:** HIGH (v3.0 art direction/typography pitfalls) | HIGH (preserved v2.0 animation/performance pitfalls)

---

## v3.0 Art Direction & Interaction Polish Pitfalls (This Milestone)

Critical mistakes when adding Matisse-style SVG art, a typography weight system, refined CSS device frames, QR removal, and interaction polish to an existing Lighthouse 98/99 Astro 6 site.

---

### Pitfall B1: Inline SVG Art Bloats DOM — Lighthouse "Excessive DOM Size" Warning

**What goes wrong:**
Each Matisse cut-out shape added as inline `<svg>` contributes its full path node count to the DOM. A frieze of 8–12 organic shapes, each with 50–100 path nodes from a Figma or Illustrator export, can push the page DOM from ~200 nodes to 1,000–1,400 nodes. Lighthouse warns at 800 and errors at 1,400 nodes. Style recalculation time increases roughly linearly with DOM size. On a site currently at Lighthouse 98/99, this can pull Performance to 85–90 even though the shapes are visually lightweight.

**Why it happens:**
Designers export shapes from Figma or Illustrator with full precision: redundant groups, transformation matrices, auto-generated clipPaths, and coordinate precision at 6+ decimal places. Developers inline the raw export without passing it through an optimizer. A shape that looks like 3 curves in Figma can be 200+ DOM nodes as exported SVG.

**How to avoid:**
- Run every SVG through SVGO before inlining. Target: < 30 nodes per shape after optimization. Use `svgo --multipass` with `floatPrecision: 1` for simple organic blobs.
- For a continuous frieze pattern (条带), consider one combined SVG element for the full frieze rather than 8+ separate inline SVGs. A single `<svg>` with all paths is one DOM element with many path children — far cheaper than multiple SVG root elements.
- Set a self-imposed budget: the frieze SVG must have fewer than 400 total DOM nodes. Check with Chrome DevTools → Elements → count children.
- For shapes that are purely decorative (aria-hidden, no animation): use them as CSS `background-image: url("data:image/svg+xml,...")` or as `<img src="shape.svg">`. This keeps them out of the DOM entirely while preserving vector sharpness. Trade-off: no CSS color customization via `currentColor`.
- The 4KB inline threshold: inline SVGs under 4KB after SVGO optimization; serve larger ones as external files with `<img>` + `fetchpriority="low" loading="lazy"`.

**Warning signs:**
- Lighthouse "Avoid an excessive DOM size" audit fires with DOM node count > 800
- Chrome DevTools → Performance → Style/Layout bars grow after adding shapes
- The raw SVG export from Figma is > 10KB for what should be a simple blob shape
- `<clipPath>` elements in the exported SVG (common Figma export artifact — remove them unless needed)

**Phase to address:** Matisse art direction phase, before any SVG is placed in any page. Establish the SVGO pipeline first, then place shapes.

---

### Pitfall B2: SVG `clip-path` Shared IDs Break Rendering on Safari — Shapes Disappear on Pages 2+

**What goes wrong:**
When the same SVG shape component is used multiple times on a page (or across pages with view transitions), and the `<clipPath id="clip-1">` inside that SVG has the same `id` attribute, Safari renders only the first instance correctly. All subsequent instances display with no clip applied or disappear entirely. This is a long-standing WebKit bug with no Safari version fix as of 2026.

**Why it happens:**
SVG `id` attributes must be unique in the DOM. When a component (e.g., a Matisse leaf shape) is reused in a grid or frieze, each instance inlines the same SVG with the same `id="clip-1"`. Browsers resolve the first `id` match; Safari strictly fails on subsequent matches for `<clipPath>` references.

**How to avoid:**
- Avoid `<clipPath>` in decorative art SVGs entirely. For organic Matisse shapes, the path data itself defines the silhouette — `<clipPath>` is only needed when masking other content inside the SVG. Pure colored fill shapes don't need it.
- If `<clipPath>` is unavoidable: generate unique IDs at build time in Astro using `crypto.randomUUID()` in the component frontmatter and pass it as a prop.
- Use CSS `clip-path: path("...")` on the HTML element instead of SVG `<clipPath>` — this keeps the clipping in CSS and avoids the SVG ID collision issue.
- After implementing, test specifically in Safari with 2+ instances of the same shape on one page.

**Warning signs:**
- Shape renders correctly in Chrome/Firefox but missing or unclipped in Safari
- SVG contains `<clipPath id="...">` with a static string ID
- The component is used more than once on any single page

**Phase to address:** Matisse art direction phase. Test in Safari immediately after placing the first repeated shape instance.

---

### Pitfall B3: Decorative SVG Shapes Become LCP Candidates — Hero Performance Regresses

**What goes wrong:**
If the Matisse frieze or hero art shapes are placed above the fold and are large enough (covering > 40% of the viewport), Chrome's LCP algorithm may designate an SVG `<image>` element within the SVG, or a nearby large colored element, as the LCP candidate — displacing the device frame screenshot. The new LCP candidate loads slower (SVG is not preloaded like the screenshot) and Lighthouse Performance drops from 98 to 85–90.

**Why it happens:**
LCP candidates include: images, background images revealed by CSS, text blocks, and `<image>` elements within `<svg>`. A large decorative shape that loads before the screenshot may claim LCP. Since the SVG art shapes are not `<img>` tags with `fetchpriority="high"`, they are not treated as high-priority by the browser.

**How to avoid:**
- Keep hero art shapes below the hero device frame in the DOM (rendered after the LCP image in source order).
- Use `aria-hidden="true"` on purely decorative SVGs — this does not affect LCP candidacy but communicates intent.
- Avoid `<image>` elements (SVG image references) inside the Matisse shapes — use `<path>` fills only.
- After adding hero art, run Lighthouse and confirm the LCP element is still the app screenshot inside the device frame, not the art.
- If art shapes must appear above the fold and are large: add the device frame screenshot image as `<link rel="preload" fetchpriority="high">` in `<head>` to ensure it wins the LCP race regardless.

**Warning signs:**
- Lighthouse "Largest Contentful Paint" element changes from the device frame image to a shape or colored block
- LCP time increases by more than 200ms after adding hero art
- Hero SVG art placed in DOM before the `<DeviceFrame>` component

**Phase to address:** Matisse art direction phase. Run Lighthouse after placing hero art and confirm LCP element identity before continuing.

---

### Pitfall B4: Typography Weight System Requires New Font Weights Not Currently Loaded

**What goes wrong:**
The Astro Font API in `astro.config.mjs` currently loads only `weights: ["400", "600"]` for General Sans. The v3.0 typography system needs `300` (light for large titles) and potentially `700` (heavier body emphasis). Using `font-weight: 300` in CSS when only 400 and 600 are loaded causes the browser to fake the weight via algorithmic thinning or fall back to the nearest available weight (400). The result: light titles look identical to regular body text — the whole point of the weight contrast is lost.

**Why it happens:**
Astro Font API's default is weight 400 only. The project explicitly specified `["400", "600"]` to minimize font download size. Adding a new weight to the design system without updating the font config is easy to miss — CSS applies silently, the browser substitutes without error, and the visual difference is subtle enough to miss in casual testing.

**How to avoid:**
- In `astro.config.mjs`, update `weights: ["300", "400", "600"]` (and `"700"` if needed for the weight system).
- Verify: after build, check the Network tab in DevTools — you should see a new WOFF2 file being loaded for weight 300. If not, the weight is being synthesized.
- Check whether General Sans has a weight-300 variant on Fontshare: the font provides Regular (400), Medium (500), Semi-Bold (600), Bold (700), and Light (300). All weights should be available via the Fontshare provider.
- There is a known Astro Font API issue (#14819) where specifying variable fonts also loads non-variable versions. Verify the Network tab only loads the expected number of font files after updating weights.

**Warning signs:**
- `font-weight: 300` applied in CSS but body text and "light" titles look the same weight visually
- DevTools → Network → no additional WOFF2 file loaded for the new weight
- Build output font directory does not contain a separate file for weight 300
- Lighthouse LCP increases slightly after font config change (new weight file adds a download)

**Phase to address:** Typography system phase, first step. Update font config before writing any `font-weight: 300` CSS rules, or you will be testing against synthesized weights.

---

### Pitfall B5: Typography Weight System Creates Inconsistency Across 10 Pages — Scattered Inline Styles

**What goes wrong:**
The current codebase has `font-weight: 600` hardcoded as inline styles in 40+ locations across 10 pages and 12 components. The v3.0 system wants: titles = large/light (300 or 400), body = smaller/heavier (600). Changing the weight system by updating inline styles page-by-page creates half-finished states where some pages use the new system and others use the old. The site ships in a visually inconsistent state.

**Why it happens:**
The existing pattern uses inline `style="font-weight: 600"` rather than semantic CSS classes. Each instance was set independently. There is no single token or class to update. A developer updating 7 of 10 pages and merging thinks the task is done — the other 3 pages regress silently.

**How to avoid:**
- Establish the weight system in `global.css` as semantic utility classes or CSS custom properties FIRST, before touching any page:
```css
/* Typography weight system — v3.0 */
:root {
  --font-weight-display: 300;   /* large hero titles */
  --font-weight-heading: 300;   /* section headings */
  --font-weight-body:    600;   /* body paragraphs, subheadings */
  --font-weight-label:   600;   /* micro labels */
  --font-weight-ui:      600;   /* nav, buttons, UI elements */
}
```
- Then replace inline `font-weight: 600` with `font-weight: var(--font-weight-heading)` across components.
- Run a project-wide grep for `font-weight:` after the phase to verify no hardcoded values remain outside of `global.css`.
- Treat typography as a single atomic change, not a page-by-page migration. All 10 pages and 12 components in one PR.

**Warning signs:**
- `grep -rn "font-weight" src/` returns > 5 unique hardcoded values
- Feature pages and landing page visually differ in heading weight after the update
- No `--font-weight-*` CSS variables in `global.css`

**Phase to address:** Typography system phase. One PR that changes the token definitions and sweeps all usages atomically.

---

### Pitfall B6: Light Font Weight Fails Accessibility Contrast at Small Sizes

**What goes wrong:**
`font-weight: 300` at `font-size: 16px` on the warm travertine background (`#F4F1ED`) with text color `#1C1915` may pass WCAG AA contrast ratio (7:1 for this color pair) by numbers, but fails visually for users with low vision or on low-brightness displays. The v3.0 system applies light weight to large display headings (48px+) — this is the safe use case. If light weight accidentally bleeds into smaller type through CSS inheritance, readability collapses.

**Why it happens:**
CSS `font-weight` is inherited. If a section wrapper gets `font-weight: 300` applied at the section level for its heading, child `<p>` and `<span>` elements inherit that weight unless they override it. The override is only reliable if every child element has an explicit weight.

**How to avoid:**
- Never apply `font-weight: 300` to a container element. Apply it only to the specific `<h1>`, `<h2>`, or display heading element.
- Set an explicit `font-weight: var(--font-weight-body)` on `<p>`, `<li>`, and `<span>` in `global.css` to cut the inheritance chain:
```css
body {
  font-weight: var(--font-weight-body); /* 600 */
}
h1, h2, h3 {
  font-weight: var(--font-weight-heading); /* 300 */
}
```
- Test light-weight text at minimum size (13px label text) — if it's illegible at arm's length on a laptop, it will fail on mobile.
- The safe rule: `font-weight: 300` only for text >= 28px. Below 28px, stay at 400 minimum.

**Warning signs:**
- Small body text (`--text-label`, 13px) appears lighter/thinner than expected after heading weight changes
- Browser DevTools computed styles show `font-weight: 300` on paragraph elements
- On a phone screen at normal brightness, light-weight heading looks indistinguishable from body text

**Phase to address:** Typography system phase. Add an explicit `body { font-weight: var(--font-weight-body) }` reset as the first rule change, before touching any heading weights.

---

### Pitfall B7: QR Code Removal Causes Layout Reflow — CLS on LandingCTA Section

**What goes wrong:**
`LandingCTA.astro` currently renders a flex row: `[App Store badge] [QR code block]` on desktop (md+). Removing the QR block collapses the flex layout. If the App Store badge then shifts position as the sibling disappears, browsers tracking CLS on interaction detect a layout shift. More critically: if the section height changes significantly (QR block is 120px tall), the content below it jumps up — potentially shifting content that was in the viewport, causing measured CLS.

**Why it happens:**
CLS is measured from any layout shift that occurs during the page's lifecycle, not just initial load. If the QR block is conditionally rendered (e.g., via JS based on screen width), the late removal causes shift. Even in static HTML, removing an element that was 120px tall from a flex container can shift the surrounding elements depending on the flex/grid layout.

**How to avoid:**
- Remove the QR code entirely from the component — both the `import QRCode from 'qrcode'` and the `<div>` — rather than hiding it with CSS. A truly removed element has no layout footprint and cannot cause shift.
- The `qrcode` npm package runs at build time (SSG) — removing the import also eliminates a build dependency that's now unnecessary.
- After removal, verify the section still looks intentional at desktop widths. A lone App Store badge centered in a wide section may look isolated — consider adjusting `max-width` or padding to keep the visual weight balanced.
- Reserve the flexbox `justify-center` to the badge element alone after sibling removal.

**Warning signs:**
- Section height changes by > 60px when QR is removed
- App Store badge shifts horizontally on desktop after sibling removal
- Lighthouse CLS score increases after the removal (check with PageSpeed Insights on the live site, not just Lighthouse locally)

**Phase to address:** QR removal phase, before touching any other element. Verify Lighthouse CLS stays at 0 after the change.

---

### Pitfall B8: CSS Device Frame Realism Additions Break the Existing Responsive Sizing System

**What goes wrong:**
The current `DeviceFrame.astro` uses a stable `max-width: 260–320px` + `aspect-ratio: 393/852` system. Adding realism features (volume buttons via `::before`/`::after`, power button, antenna lines, side rail gradient) requires `position: absolute` children with pixel-based offsets. These offsets are calibrated for one frame size (e.g., 320px wide). When the frame scales down to 260px on mobile, the pixel-offset buttons land in the wrong positions. The frame looks broken on small viewports.

**Why it happens:**
CSS pseudo-element buttons are defined with pixel `top`, `left`, and `width/height` values. These don't scale with the parent `width: 100%` approach. Developers test at the desktop frame size (320px) and ship without testing mobile (260px).

**How to avoid:**
- Use percentage-based or `em`-based offsets for any decoration that must scale with the frame. Example:
```css
/* Volume button: scale with frame width */
.device-frame::before {
  left: -2.5%;      /* scales with parent width */
  top: 30%;         /* scales with parent height via aspect-ratio */
  width: 2%;
  height: 8%;
}
```
- Or: contain all realism decorations inside the SVG frame itself (make the frame an SVG with buttons drawn as paths, overlaid on the screenshot). SVG scales perfectly at any size.
- Test the frame at every breakpoint: 260px (narrow mobile), 300px (sm), 320px (lg) — all three sizes defined in the current `max-width` cascade.
- If adding side rail shimmer gradients: use `border-image` or a gradient directly on `border` — these scale automatically with the element.

**Warning signs:**
- Device buttons look correct at 1280px+ viewport but misaligned at 390px mobile
- `::before` or `::after` uses `top: 100px; left: -3px` with absolute px values
- Screenshot appears to "float" inside the frame at small sizes (frame padding not scaling)

**Phase to address:** iPhone frame realism phase. After each visual addition, resize the browser to 375px and verify.

---

### Pitfall B9: Smooth Scroll + CSS Transitions Conflict with Existing IntersectionObserver Animation System

**What goes wrong:**
Adding `scroll-behavior: smooth` globally or implementing anchor-based smooth navigation interferes with the existing IntersectionObserver scroll-reveal system. When smooth scrolling to an anchor, elements enter the viewport gradually while the scroll is in motion. The IntersectionObserver fires its callbacks immediately on intersection — this means elements start their `fade-up` animation while the page is still scrolling, creating a collision: the animation completes before the element settles at its final scroll position, then the element snaps. The effect is visual jank rather than a smooth reveal.

**Why it happens:**
The existing IntersectionObserver uses `threshold: 0.15` — it fires when 15% of an element is visible. During smooth scroll, this threshold is crossed while the element is still moving upward with the scroll momentum. The animation keyframe plays against a moving target.

**How to avoid:**
- Do not add `scroll-behavior: smooth` to `html` or `body` globally. It can also break programmatic `window.scrollTo()` in Safari (documented Safari 15.4 bug where `scroll-behavior: smooth` in CSS blocks JS scroll operations).
- For smooth navigation, handle it in JavaScript with `scrollIntoView({ behavior: 'smooth' })` on specific links rather than the global CSS property.
- If using Astro View Transitions for page navigation: the IntersectionObserver will fire immediately on page transition because elements enter the DOM already "in view." Add a small delay (one `requestAnimationFrame` tick) before setting up the observer after a page transition.
- Test: click an anchor link while the current page has `[data-animate]` elements. Verify animations play smoothly without the scroll fighting the keyframe.

**Warning signs:**
- Elements animate in then visually jump when smooth scroll reaches its final position
- `scroll-behavior: smooth` on `html` or `body` in `global.css`
- Safari: anchor links stop working or `scrollTo()` in JS stops animating

**Phase to address:** Interaction polish phase. Add smooth navigation last, after verifying the scroll-reveal system is stable.

---

### Pitfall B10: Astro View Transitions Cause IntersectionObserver to Fire Immediately on Every Navigation

**What goes wrong:**
If Astro View Transitions (`<ViewTransitions />`) is added for page-to-page navigation polish, all `[data-animate]` elements on the destination page enter the DOM "already in view." The IntersectionObserver's `threshold: 0.15` is immediately satisfied for every element — all animations fire simultaneously on page load rather than triggering as the user scrolls. The scroll-reveal effect is completely broken.

**Why it happens:**
This is a documented interaction between Astro View Transitions and IntersectionObserver: when a new page's content replaces the DOM, the IO fires all pending observations against the new layout immediately. There is no "scroll to reveal" for the destination page — everything is visible from the top.

**How to avoid:**
- Do not use Astro's `<ViewTransitions />` component if scroll-reveal animations are a core part of the UX (they are, in this project). The two systems are fundamentally incompatible without significant workaround code.
- For interaction polish, prefer CSS `transition` on navigation UI elements (nav links, hover states, dropdown) and page-entrance animations on the hero — these do not conflict with IntersectionObserver.
- If View Transitions are still desired: remove IntersectionObserver-based scroll reveal and implement a time-staggered entrance animation instead (delay classes on each section), so there is no scroll dependency.
- The W3C CSSWG has an open issue (#8269) on how View Transitions should interact with IntersectionObserver — it is unresolved as of 2026.

**Warning signs:**
- After adding `<ViewTransitions />`, all sections fade in simultaneously on page load instead of revealing on scroll
- `astro:after-swap` event needed to re-run IntersectionObserver setup script after each navigation
- The `is:inline` script in `BaseLayout.astro` only runs once at initial page load, not after view transition swaps

**Phase to address:** Interaction polish phase. Decide on View Transitions vs. IntersectionObserver scroll-reveal before writing any polish code — they are mutually exclusive in the current architecture.

---

### Pitfall B11: Matisse Color Palette Conflicts with Existing Travertine Design Tokens

**What goes wrong:**
Matisse's Swimming Pool palette uses vivid ultramarine blue, leaf green, coral, and black. The existing Tuwa design system uses a constrained travertine palette: `#F4F1ED` background, `#2B5240` accent green, warm browns. Injecting raw Matisse colors as SVG `fill` attributes creates a palette collision — the art looks pasted in from a different design system rather than integrated. The site loses its cohesive scientific/athletic visual identity and looks like a Canva template.

**Why it happens:**
Designers and developers copy Matisse color values directly without adapting them to the existing token system. The "inspired by" intent becomes literal reproduction.

**How to avoid:**
- Derive the Matisse palette from the existing tokens rather than importing it independently. Map:
  - Matisse blue → a desaturated or tonal version of `--color-accent` (`#2B5240`) shifted toward blue
  - Matisse coral → a warm version of `--color-brand-accent` (`#7A6E5C`)
  - Matisse leaf green → the existing `--color-accent` directly
  - Matisse black → `--color-text-1` (`#1C1915`)
- Add new CSS variables for art palette colors derived from the existing system:
```css
--color-art-teal: #3D6B5A;    /* accent-adjacent, Swimming Pool teal */
--color-art-sand: #C4B99A;    /* warm sand, Matisse paper tone */
--color-art-slate: #1C1915;   /* same as text-1 */
```
- Avoid vivid saturated fills for the shapes. Matisse's shapes work in context of his original bold palette — on a warm travertine background, muted equivalents feel more intentional.

**Warning signs:**
- SVG shapes use hex values not present in `global.css` `:root` variables
- The hero section looks like two separate design systems placed next to each other
- Art shapes compete with the green CTA button for visual dominance

**Phase to address:** Art direction planning (before creating any SVG files). Establish the art sub-palette as CSS variables alongside existing tokens.

---

### Pitfall B12: SVG Animation on Organic Shapes Triggers Paint, Not Composite — Kills Lighthouse INP

**What goes wrong:**
If Matisse shapes have CSS animations (e.g., a slow float, gentle rotation, or scale pulse to make the art feel alive), animating SVG properties like `fill`, `stroke`, or `d` (path morphing) forces the browser to repaint the SVG on every frame. On mobile, this causes INP (Interaction to Next Paint) to spike above 200ms because the main thread is busy with paint tasks. Lighthouse flags INP > 200ms as "needs improvement."

**Why it happens:**
The "GPU-safe" animation properties (`transform` and `opacity`) are well-known for HTML elements. Developers often forget that the same rule applies to SVG: animating `transform` on an SVG element is compositor-safe, but animating `fill`, `stroke-width`, or path data forces layout recalculation and paint.

**How to avoid:**
- If any Matisse shape has animation: animate ONLY `transform` (translate, rotate, scale) and `opacity`. These are compositor-accelerated for SVG elements in modern browsers.
- For the "gentle float" effect: `transform: translateY(0px)` → `translateY(-8px)` → `translateY(0px)` in a looping `@keyframes`. This runs on the compositor.
- Do NOT animate `fill` (triggers repaint), `stroke` (triggers repaint), `rx`/`ry` (triggers layout), or `d` attribute (path morphing — extremely expensive, requires GSAP MorphSVG for GPU-safe morphing).
- Decorative shapes do not need to be animated at all. Consider static shapes for the frieze and reserve animation for the hero device frame entrance only.

**Warning signs:**
- Chrome DevTools Performance panel shows "Paint" (green bars) occurring every animation frame
- INP > 200ms reported in Chrome UX Report after adding shape animations
- `@keyframes` targeting `fill:`, `stroke:`, or `width:/height:` on SVG elements

**Phase to address:** Matisse art direction phase. Establish "no fill/stroke animation" as a rule before any motion is added to shapes.

---

## v2.0 Pitfalls (Preserved — Still Relevant)

The following pitfalls were identified during v2.0 research and remain relevant for v3.0 work.

---

### Pitfall A1: Animating Layout-Affecting Properties — CLS at Scroll Trigger

**What goes wrong:**
Scroll-reveal animations that animate `width`, `height`, `top`, `left`, `margin`, or `padding` cause Cumulative Layout Shift at the moment of trigger.

**How to avoid:**
Animate ONLY `transform` (translate, scale) and `opacity`. Never animate layout properties. For slide-in: `transform: translateY(40px) → translateY(0)` + `opacity: 0 → 1`.

**Phase to address:** Any animation modification in v3.0. Existing system already follows this rule — do not regress it.

---

### Pitfall A2: Missing `prefers-reduced-motion` Guard

**What goes wrong:**
Any new animation added in v3.0 (art shape float, typography entrance, scroll polish) that does not have a `@media (prefers-reduced-motion: reduce)` guard violates WCAG 2.3.3 and drops Lighthouse Accessibility score.

**How to avoid:**
Every new `@keyframes` or `transition` added in v3.0 must be inside `@media (prefers-reduced-motion: no-preference)`. The existing system already does this — maintain the pattern.

**Phase to address:** Every phase that adds motion.

---

### Pitfall A3: FOUC — Elements Invisible Before JavaScript Loads

**What goes wrong:**
The existing animation system gates opacity-0 initial state on `.js-enabled` class (correct pattern). Any new animated element added in v3.0 must follow the same pattern. Adding `opacity: 0` directly in CSS on a new art element without the `.js-enabled` gate makes it invisible when JS is blocked.

**How to avoid:**
Follow the existing pattern: initial hidden state only via `.js-enabled [data-animate] { opacity: 0 }`. New elements should use `data-animate` if they need scroll-reveal, not custom CSS opacity.

**Phase to address:** Art direction and interaction polish phases.

---

### Pitfall A4: Hero LCP Image Gets `loading="lazy"` After Hero Refactor

**What goes wrong:**
If the hero section is restructured to accommodate Matisse art shapes, there is a risk the `<DeviceFrame>` component's `loading="eager" fetchpriority="high"` attributes are dropped or wrapped in a new parent that introduces lazy loading defaults.

**How to avoid:**
After any hero restructure: verify in Lighthouse that the LCP element is still the device frame screenshot and LCP time has not increased. Check `<Image>` component has explicit `loading="eager"` and `fetchpriority="high"`.

**Phase to address:** Art direction phase that touches the hero section.

---

### Pitfall A5: App Screenshots Blurry on Retina Displays

**Still relevant:** If new screenshots are added for the iPhone frame realism work, they must be exported at 3x from Xcode Simulator. The existing dashboard.png should already be 3x — verify before the frame realism phase.

---

### Pitfall A6: Device Frame Breaks at Non-iPhone Viewport Widths

**Still relevant (and extended in B8 above):** Existing frame uses stable responsive sizing. v3.0 realism additions must not introduce fixed-pixel offsets. See Pitfall B8.

---

## Technical Debt Patterns

| Shortcut | Immediate Benefit | Long-term Cost | When Acceptable |
|----------|-------------------|----------------|-----------------|
| Inline raw Figma SVG export without SVGO | Faster design-to-code | 500+ DOM nodes per shape; Lighthouse "Excessive DOM size" warning | Never — SVGO pipeline takes 5 minutes to set up |
| Static SVG `clipPath` IDs | Simpler component code | Safari renders only the first instance; subsequent uses broken | Never — use unique IDs or avoid clipPath in decorative shapes |
| Font weight hardcoded as inline styles | Matches existing pattern | 40+ files need updating when weight system changes; inconsistency guaranteed | Never — use CSS variables for any design token |
| `scroll-behavior: smooth` on `html`/`body` | One-line smooth scroll | Breaks `window.scrollTo()` in Safari; conflicts with IntersectionObserver timing | Never — use JS `scrollIntoView({ behavior: 'smooth' })` on specific elements only |
| Astro `<ViewTransitions />` with IntersectionObserver scroll-reveal | App-like page transitions | All scroll reveals fire simultaneously on every navigation — effect destroyed | Never with the current animation architecture |
| Animating SVG `fill` or `stroke` | Visual richness | Repaint every frame; INP > 200ms on mobile; Lighthouse degradation | Never — animate `transform` and `opacity` only |
| Applying font-weight: 300 to section containers | Simpler CSS targeting | Light weight inherited by all child text; body copy becomes illegible | Never — apply only to specific heading elements |
| Vivid Matisse colors without design token mapping | Fast visual implementation | Palette collision; site looks visually incoherent | Never — derive art colors from existing token system |

---

## Integration Gotchas

| Integration | Common Mistake | Correct Approach |
|-------------|----------------|------------------|
| Astro Font API | Loading only `["400", "600"]` then writing `font-weight: 300` in CSS | Update `weights: ["300", "400", "600"]` in `astro.config.mjs` before any CSS weight changes |
| Astro Font API | Assuming Fontshare CDN provides all weights automatically | Verify in Network tab that a separate WOFF2 file loads for each declared weight after build |
| SVGO | Running without `multipass: true` | Use `--multipass` flag; single pass leaves 30–40% additional optimization on the table |
| SVG decorative shapes | Inlining SVG as component for color flexibility | Use CSS `background-image: url(data:image/svg+xml,...)` for static-color shapes; avoids DOM nodes entirely |
| Cloudflare Pages | Non-hashed `public/` SVG art files cached after update | Version filenames (`shape-leaf-v2.svg`) or purge Cloudflare cache after any art asset update |
| `qrcode` npm package | Removing the import but leaving the `import QRCode from 'qrcode'` statement | Remove import, build step, and the entire QR block element — the package runs at build time and errors if imported without use |

---

## Performance Traps

| Trap | Symptoms | Prevention | When It Breaks |
|------|----------|------------|----------------|
| Inline SVG art with raw Figma export | DOM nodes > 800; Lighthouse "Excessive DOM size" | SVGO every shape; 4KB inline threshold; frieze as single SVG | Any page with 3+ unoptimized shapes |
| SVG `fill` animation | Paint every frame; INP > 200ms on mobile | Animate `transform` + `opacity` only | Any device with paint-budget-limited GPU (all mobile) |
| `scroll-behavior: smooth` globally | IntersectionObserver jank; Safari scroll breaks | JS-based smooth scroll on specific elements only | Safari 15.4+ and any page with `[data-animate]` elements |
| `<ViewTransitions />` with IO scroll-reveal | All reveals fire on every navigation | Choose one: View Transitions OR scroll-reveal, not both | First navigation after `<ViewTransitions />` added |
| font-weight: 300 without font weight loaded | Browser synthesizes thin weight; design intent lost | Update Astro Font API weights config first | Every page using `font-weight: 300` |
| Pixel-offset device frame decorations | Frame misaligned at non-designed breakpoint | Percentage-based or em-based offsets; test at 260px | Viewports narrower than 320px (260px is the current min) |

---

## "Looks Done But Isn't" Checklist

### v3.0 Additions

- [ ] **SVGO pipeline:** Every Matisse SVG shape has been processed through SVGO `--multipass` — verify with Lighthouse DOM node count audit
- [ ] **SVG clipPath IDs:** No SVG shape component uses a static string `id` for `<clipPath>` — verify by grepping `src/` for `id="clip` inside SVG assets
- [ ] **Font weights loaded:** `astro.config.mjs` includes `"300"` (and any other new weights) in the `weights` array — verify via Network tab showing separate WOFF2 for weight 300
- [ ] **Weight inheritance cut:** `global.css` has `body { font-weight: var(--font-weight-body) }` to prevent light heading weight from inheriting down — verify in DevTools computed styles on paragraph elements
- [ ] **QR removal complete:** `LandingCTA.astro` has no `import QRCode` and no QR `<div>` block — verify via component search and Lighthouse CLS = 0
- [ ] **LCP element unchanged:** After hero art addition, Lighthouse still shows the device frame screenshot as LCP, not an art shape — verify in Lighthouse "LCP element" detail
- [ ] **Art palette derived from tokens:** All new SVG fill colors are CSS variables in `global.css` `:root` — verify no raw hex in SVG files not present in global.css
- [ ] **Safari shape rendering:** All SVG shapes render correctly in Safari with 2+ instances on one page — verify in Safari 18+
- [ ] **Frame realism at 260px:** Device frame with new realism elements looks correct at 260px (narrowest mobile) — verify by DevTools device simulation
- [ ] **Smooth scroll Safari:** Any smooth scroll implementation tested in Safari — anchor links work and do not freeze scroll — verify manually
- [ ] **No View Transitions conflict:** If `<ViewTransitions />` is NOT added (recommended), confirm the decision is documented — verify `BaseLayout.astro` has no `ViewTransitions` import

### Preserved from v2.0

- [ ] **LCP image:** Has `loading="eager"` and `fetchpriority="high"` — verify unchanged after any hero restructure
- [ ] **All animations:** `@media (prefers-reduced-motion: reduce)` guard exists for every `@keyframes` — verify by grepping global.css
- [ ] **Animation initial state:** Hidden state only applied via `.js-enabled [data-animate]`, not bare CSS opacity
- [ ] **Lighthouse mobile score:** >= 95 after all v3.0 changes — run on mobile simulation, not just desktop

---

## Recovery Strategies

| Pitfall | Recovery Cost | Recovery Steps |
|---------|---------------|----------------|
| SVG DOM bloat (B1) | LOW | Run SVGO on shapes; consider CSS background-image for static-color shapes; redeploy |
| Safari clipPath ID collision (B2) | MEDIUM | Unique IDs in component frontmatter via crypto.randomUUID(); or remove clipPath and use path fill only |
| LCP element displaced by art (B3) | LOW | Move art shapes after DeviceFrame in DOM; add preload for screenshot image; redeploy |
| Font weight not loaded (B4) | LOW | Update astro.config.mjs weights array; rebuild; verify WOFF2 in Network tab |
| Typography inconsistency (B5) | MEDIUM | Establish CSS variables in global.css; grep and replace all inline font-weight values atomically |
| Light weight inherited by body text (B6) | LOW | Add body { font-weight: var(--font-weight-body) } to global.css; verify inheritance cut |
| QR removal causes CLS (B7) | LOW | Fully remove component from DOM (not hide with CSS); verify CLS = 0 in Lighthouse |
| Frame realism breaks on mobile (B8) | MEDIUM | Replace px offsets with percentages; test at 260px; consider SVG-based frame decorations |
| Smooth scroll + IO conflict (B9) | MEDIUM | Remove global scroll-behavior; implement JS scrollIntoView on specific links; retest |
| View Transitions breaks IO reveals (B10) | HIGH | Remove ViewTransitions; revert to standard navigation; or rewrite all animations as timed entrance instead of scroll-reveal |
| Palette collision (B11) | MEDIUM | Define art sub-palette as CSS variables derived from existing tokens; update all SVG fills |
| SVG fill animation kills INP (B12) | LOW | Replace fill/stroke animation with transform/opacity animation; verify with DevTools Performance panel |

---

## Pitfall-to-Phase Mapping

| Pitfall | Prevention Phase | Verification |
|---------|------------------|--------------|
| B1: SVG DOM bloat from Matisse shapes | Matisse art direction (first step: SVGO pipeline) | Lighthouse "Avoid excessive DOM size" absent; < 800 DOM nodes |
| B2: Safari clipPath ID collision | Matisse art direction (during component build) | Safari renders all instances of any reused shape component |
| B3: Art shapes displace LCP candidate | Matisse art direction (after hero art placement) | Lighthouse LCP element = device frame screenshot |
| B4: Font weights missing for new system | Typography system (first step: font config) | Network tab shows WOFF2 for weight 300 |
| B5: Typography inconsistency across 10 pages | Typography system (atomic sweep) | grep for inline font-weight: returns only variable references |
| B6: Light weight inherits to body text | Typography system (global.css reset) | DevTools computed styles on p tags show font-weight: 600 |
| B7: QR removal causes CLS | QR removal phase | Lighthouse CLS = 0; section height and badge position stable |
| B8: Frame realism breaks at narrow viewports | iPhone frame realism phase | Frame looks correct at 260px, 300px, 320px |
| B9: Smooth scroll conflicts with IO | Interaction polish phase (last step) | Anchor links work in Safari; reveal animations play smoothly |
| B10: View Transitions destroys scroll-reveal | Interaction polish phase (decision point) | Either no ViewTransitions added, or IO reveals removed and replaced |
| B11: Art palette clashes with design tokens | Art direction planning (before SVG creation) | No raw hex in SVG fills; all colors traceable to global.css variables |
| B12: SVG fill animation kills INP | Art direction phase (if any animation added) | Chrome DevTools Performance: no Paint bars on animation frames |

---

## Sources

**v3.0 Research Sources:**

- [SVG Optimization for Web Performance: The Complete 2026 Guide — vectosolve.com](https://vectosolve.com/blog/svg-optimization-web-performance-2025) — SVGO best practices, DOM node budget
- [SVGs and child nodes count towards "Avoid an excessive DOM size" — Lighthouse GitHub Issue #6807](https://github.com/GoogleChrome/lighthouse/issues/6807) — confirmed DOM node counting behavior
- [Too Many SVGs Clogging Up Your Markup? Try `use` — CSS-Tricks](https://css-tricks.com/too-many-svgs-clogging-up-your-markup-try-use/) — SVG sprite pattern
- [Inline SVG vs SVG File: Which Boosts Web Performance More — codestudy.net](https://www.codestudy.net/blog/inline-svg-vs-svg-file-performance/) — inline vs img src trade-offs
- [Proven Fixes for CSS Clip-Path SVG Polygon Issues in Safari 2025 — devbytoni.com](https://devbytoni.com/proven-fixes-for-css-clip-path-svg-polygon-issues-in-safari-unlock-flawless-rendering-in-2025/) — Safari clipPath bug confirmed
- [CSS clip-path only works on first element in Safari — emilbjorklund/svg-weirdness GitHub](https://github.com/emilbjorklund/svg-weirdness/issues/27) — ID collision root cause
- [Astro Font API issue #14819 — non-variable fonts loaded alongside variable](https://github.com/withastro/astro/issues/14819) — font loading verification required
- [Experimental Fonts API — Astro Docs](https://docs.astro.build/en/reference/experimental-flags/fonts/) — weights array, only weight 400 by default
- [Light Typography Techniques for Web Readability — Silphium Design](https://silphiumdesign.com/light-typography-techniques-for-web-readability/) — font-weight 300 accessibility guidance
- [Font characteristics contrast — WCAG 3 WAI](https://www.w3.org/WAI/GL/WCAG3/2020/methods/font-characteristics-contrast/) — light weight legibility thresholds
- [Optimize Cumulative Layout Shift — web.dev](https://web.dev/articles/optimize-cls) — CLS from element removal, interaction-triggered shifts
- [Safari JS scroll no longer works with scroll-behavior — Apple Developer Forums](https://developer.apple.com/forums/thread/703294) — scroll-behavior: smooth CSS breaks JS scroll in Safari 15.4
- [How to interact with Intersection Observer during View Transitions — W3C CSSWG Issue #8269](https://github.com/w3c/csswg-drafts/issues/8269) — unresolved compatibility issue
- [Custom View Transitions inconsistent — Astro GitHub Issue #9650](https://github.com/withastro/astro/issues/9650) — IO fires immediately after navigation
- [The Complete SVG Animation Encyclopedia 2025 — svgai.org](https://www.svgai.org/blog/research/svg-animation-encyclopedia-complete-guide) — compositor-safe vs paint-triggering SVG animation properties
- [Issues with SVG clip-path animations in Safari — GSAP Community](https://gsap.com/community/forums/topic/30617-issues-with-svg-clip-path-animations-in-safari/) — confirmed 2026 Safari rendering issues
- [Preload Hero Image to Improve LCP — foxscribbler.com](https://foxscribbler.com/preload-hero-image/) — LCP candidate displacement risk
- [SVGO — official GitHub](https://github.com/svg/svgo) — v4 optimization configuration

**Preserved v2.0 Sources:**

- [How to create high-performance CSS animations — web.dev](https://web.dev/animations-guide/)
- [prefers-reduced-motion — MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@media/prefers-reduced-motion)
- [Anatomy of a CSS Phone Mockup — Conor Luddy](https://www.conor.fyi/writing/anatomy-of-a-css-phone-mockup)
- [Deploy Astro on Cloudflare Pages — official docs](https://developers.cloudflare.com/pages/framework-guides/deploy-an-astro-site/)

---
*Pitfalls research for: Tuwa marketing website — v3.0 art direction & interaction polish milestone*
*Researched: 2026-05-14*
