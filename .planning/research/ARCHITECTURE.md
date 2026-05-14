# Architecture Research

**Domain:** Astro 6 marketing site — v3.0 Art Direction & Interaction Polish integration
**Researched:** 2026-05-14
**Confidence:** HIGH (direct codebase inspection + component-level analysis)

---

## Existing Architecture (What v3.0 Builds On)

### Current Component Tree

```
src/
├── components/
│   ├── BaseLayout.astro        — html shell, Font API, IntersectionObserver script
│   ├── Header.astro            — sticky nav, dropdown, mobile toggle
│   ├── Footer.astro            — static links
│   ├── Hero.astro              — h1(.hero-headline), subtitle(.hero-subtitle), DeviceFrame
│   ├── DeviceFrame.astro       — CSS iPhone 15 Pro frame, Dynamic Island, home indicator
│   ├── FeatureGrid.astro       — iPod click wheel (SVG, inline JS, 15KB)
│   ├── FeatureCTA.astro        — feature page CTA section
│   ├── LandingCTA.astro        — landing page CTA section (remove QR here)
│   ├── StatsCounter.astro      — animated stat counters
│   ├── ScreenshotBlock.astro   — thin wrapper around <Image>
│   ├── FaqAccordion.astro      — accordion
│   ├── MobileMenu.astro        — mobile drawer
│   ├── SEO.astro               — meta/OG tags
│   └── charts/                 — Chart.js Astro islands
├── layouts/
│   ├── BaseLayout.astro        — shared html shell
│   ├── BlogPostLayout.astro
│   ├── FeaturePageLayout.astro
│   ├── CoachingPageLayout.astro
│   └── LegalPageLayout.astro
├── pages/
│   ├── index.astro             — Hero, FeatureGrid, StatsCounter, LandingCTA
│   └── features/               — 5 feature deep-dive pages
└── styles/
    └── global.css              — Tailwind v4, CSS variables, all animation keyframes
```

### Key Architectural Facts

- **Animation system:** CSS `@keyframes` in `global.css` + a single IntersectionObserver script in `BaseLayout.astro`. Reveal targets use `data-animate` + `data-animate-delay`. No external animation library.
- **Styling model:** Tailwind v4 utility classes for layout/spacing; CSS custom properties for all design tokens; named CSS classes (`.device-frame`, `.hero-headline`, `.wheel-arc`, etc.) for complex components.
- **SVG strategy:** FeatureGrid uses inline SVG with `<path>` arcs computed from trigonometry. Interaction (click, keyboard) handled by `<script>` block inside the component.
- **Script isolation:** One global `<script is:inline>` in BaseLayout for IntersectionObserver. Component-specific scripts live inside the `.astro` file's `<script>` tag (module-scoped by Astro's bundler).
- **No JS framework:** All interactivity is vanilla JS. No React, Vue, or Solid islands.
- **Font:** General Sans via Astro Font API (`--font-general-sans` CSS variable). Self-hosted through Fontshare CDN, preloaded in `<head>`.

---

## v3.0 Feature Integration Map

### 1. Matisse SVG Cut-Out Art Direction

**What it is:** Organic cut-out shapes (leaf, seaweed, biomorph) assembled into a continuous horizontal frieze decorating the hero section and possibly section dividers. Inspired by Matisse's _Swimming Pool_ gouache cut-outs.

**Integration point:** `Hero.astro` is the primary host. The frieze sits as a decorative band — either above the hero text, below it, or spanning the full page width behind the section.

**New component: `MatisseFrieze.astro`**

Create as a standalone component in `src/components/`. Reasons for isolation:
- The SVG markup will be 100-200 lines (multiple organic path elements)
- Re-usable as a section divider on feature pages if desired
- Keeps `Hero.astro` readable
- Allows independent animation scoping

```
src/components/MatisseFrieze.astro   ← NEW
```

Interface:
```astro
---
interface Props {
  variant?: 'hero' | 'divider';      // hero: full-width band; divider: thin strip
  animate?: boolean;                  // false for reduced-motion static render
}
---
```

**SVG construction approach:**

All shapes should be inline SVG within the `.astro` file — not an external `.svg` file loaded via `<img>`. Reasons:
- Inline SVG inherits CSS custom properties (can tint shapes with `--color-accent`, `--color-brand-accent`)
- JS can animate individual `<path>` elements via `data-animate` if desired
- No extra HTTP request

Shape library: define 5-7 organic biomorph paths that can be tiled/mirrored horizontally. Use a single `viewBox` wide enough for the frieze (e.g., `0 0 1440 160`). Overflow hidden on the wrapper clips the frieze to page width.

**Color palette for shapes:** Use existing CSS variables — `--color-surface`, `--color-surface-el`, `--color-divider`, plus `--color-accent` at 15-20% opacity for one accent shape. This keeps the design within the established palette without new tokens.

**CSS in global.css (additions):**
```css
/* Matisse frieze */
.matisse-frieze {
  overflow: hidden;
  width: 100%;
  pointer-events: none;
  user-select: none;
}
.matisse-shape {
  transition: transform 800ms ease-out;
}
```

**Animation:** Parallax-style gentle float is achievable with CSS `@keyframes` + `animation-play-state`. For the hero, a slow drift (e.g., 20s sinusoidal translate) adds life without Motion library. If complexity escalates, this is the one place where adding `motion` (the standalone library, ~15KB) as an Astro island is justified.

**Integration into Hero.astro:**
```astro
import MatisseFrieze from './MatisseFrieze.astro';

<!-- Above or below the text block, full-width within the section -->
<MatisseFrieze variant="hero" animate={true} />
```

The `section-spaced` padding on the hero section already creates vertical space. The frieze sits at the visual edge of the section — adjust `margin-top` / `margin-bottom` tokens rather than touching `--space-section-*` tokens.

---

### 2. Typography Weight System

**What changes:** Titles become larger + lighter (weight 300 or 350, if General Sans supports it). Body copy becomes smaller + heavier (weight 500 or 600 instead of 400).

**Integration point:** `global.css` — the CSS custom property system is the correct place. All typography tokens live in `:root`. Changing the tokens cascades to every component automatically.

**Current token values:**
```css
--text-display:  48px;   /* hero h1 */
--text-heading:  28px;   /* section h2 */
--text-body:     16px;   /* paragraphs */
--text-label:    13px;   /* micro labels */
```

**No new tokens needed.** Add font-weight companion tokens:
```css
--weight-display:  300;  /* or 350 — verify General Sans variable font axes */
--weight-heading:  300;
--weight-body:     500;
--weight-label:    600;
```

**Then update usage sites:**

The challenge is that most components set `font-weight` inline via `style="font-weight: 600;"`. This was necessary in v2.0 to override Tailwind defaults, but now creates a maintenance problem — inline styles beat CSS class rules and token changes.

**Approach: Token-then-inline audit**

1. Add `--weight-*` tokens to `:root` in `global.css`
2. Update any existing named CSS classes that hardcode weight (e.g., `.nav-dropdown-title`, `.nav-dropdown-desc`, `.wheel-center-title`) to use the token
3. For components with inline `font-weight` style props: move those values to semantic CSS classes rather than doing a per-file find-replace

**Files to modify:**
- `src/styles/global.css` — add `--weight-*` tokens, update named classes
- `src/components/Hero.astro` — replace inline `font-weight: 600` on h1 with token reference
- `src/components/FeatureGrid.astro` — heading uses inline `font-weight: 600`
- `src/components/StatsCounter.astro` — check heading weight
- `src/layouts/FeaturePageLayout.astro` — feature page h1/h2 weights
- All other layouts with headings

**General Sans variable font check:** The Astro Font API loads General Sans from Fontshare. Fontshare's General Sans is a static font family (not a variable font) — it ships separate files for each weight: 200 (Extralight), 300 (Light), 400 (Regular), 500 (Medium), 600 (Semibold), 700 (Bold). Weight 300 is available. The font API will need `weights: ['300', '500', '600']` in the font config if it isn't already loading all weights. **Verify this in `astro.config.mjs` before implementing.**

---

### 3. iPhone Frame Realism

**What changes:** The existing `DeviceFrame.astro` already implements a CSS iPhone 15 Pro frame with Dynamic Island, side buttons (via `::before`/`::after` pseudo-elements), and home indicator. The issues flagged in PROJECT.md are:
1. Screenshot fit — possible misalignment or extra border around the image
2. Realism — bezels, notch accuracy, button placement

**Integration point:** `DeviceFrame.astro` + `.device-frame` class in `global.css`.

**Current structure (from component inspection):**

```
.device-frame (outer bezel)
  ├── Dynamic Island (absolute positioned, top: 20px)
  ├── Screen area (border-radius: 40px, aspect-ratio: 393/852)
  │   └── <Image> or placeholder
  └── Home indicator (100px wide bar)
```

Pseudo-elements:
- `::before` — volume buttons (left side, top: 100px)
- `::after` — power button (right side, top: 120px)

**Screenshot fit fix:** The `aspect-ratio: 393/852` matches the iPhone 15 Pro logical resolution. If screenshots were captured at 1x instead of 3x Retina, the image content may appear slightly off. The fix is in the `<Image>` tag: ensure `object-fit: cover` with `object-position: top` if screenshots start at the status bar. The component already sets `object-fit: cover` — check `object-position`.

**Realism improvements (surgical changes to DeviceFrame.astro):**

| Element | Current | Improved |
|---------|---------|---------|
| Frame gradient | `145deg, #2A2A2A, #1A1A1A, #111111` | Add subtle titanium sheen: `145deg, #3A3A3A, #1E1E1E 40%, #111 80%, #1E1E1E` |
| Border highlight | `1px solid rgba(255,255,255,0.06)` | Split into top highlight + side shadow: use `outline` + `box-shadow` combination |
| Dynamic Island size | `100px × 28px` | iPhone 15 Pro is 126pt × 37pt — scale to match component size |
| Screen corner radius | `border-radius: 40px` | Should be approximately 47px at 300px frame width (proportional to real 55pt corner radius at 393pt width) |
| Button texture | Flat `#2A2A2A` | Add subtle gradient to buttons for physical feel |
| Volume button gap | Single `box-shadow: 0 36px 0` offset | Real iPhone has 3 buttons: mute + 2 volume; represent with 3 pseudo-shadow layers |

**No new component needed.** All changes are surgical edits within `DeviceFrame.astro` and the `.device-frame` CSS block in `global.css`.

**Cascading effect:** DeviceFrame is used in:
- `Hero.astro` (hero device mockup)
- Feature pages via `FeaturePageLayout.astro` or `ScreenshotBlock.astro`

Any improvement propagates automatically to all usage sites.

---

### 4. Remove QR Code + Adjacent App Store Badge Section

**Integration point:** `LandingCTA.astro` — this is the component that likely contains the QR code section. The header, hero, and footer CTAs remain untouched.

**Approach:** Inspect `LandingCTA.astro` fully and remove the QR code + its sibling App Store badge. The landing page currently stacks: `Hero → FeatureGrid → StatsCounter → LandingCTA`. After removal, `LandingCTA` either becomes a simpler text CTA or is replaced with a different section.

**Risk:** LandingCTA may be the only place `APP_STORE_URL` is used aside from Hero. Confirm the badge in Hero stays — the landing page still needs a download path.

---

### 5. Interaction Polish

**What it is:** Smooth page transitions, scroll feel, navigation flow — referenced against contralabs.com.

**Integration point:** This is distributed across multiple components and the global CSS. There is no single file.

**Audit of current transitions:**
- Nav dropdown: `opacity + transform + visibility`, 200ms ease — already good
- CTA button: `scale(1.02)` on hover, 150ms — already good
- Blog card: `box-shadow` lift, 200ms — already good
- `[data-animate]` reveals: `fade-up` 400ms — already good
- Page load: no page transition (SPA-style transitions not implemented)
- Scroll: native browser scroll — no custom easing

**What "interaction polish" likely means for this site:**

1. **Scroll easing:** CSS `scroll-behavior: smooth` on `html` for anchor links. Already common but verify it's set.
2. **Nav transition on scroll:** Header already has scroll-shadow behavior. Check if it transitions smoothly (opacity/transform).
3. **Link hover states:** Feature page internal links, footer links — ensure consistent 100-150ms color transitions.
4. **Mobile menu animation:** `MobileMenu.astro` — verify the drawer slides in smoothly rather than appearing instantly.
5. **CTA ripple / press feel:** The `.btn-cta:active { transform: scale(0.98) }` is already implemented.

**New CSS additions (in global.css):**
```css
html {
  scroll-behavior: smooth;
}

/* View Transition API — progressive enhancement for page navigation */
@view-transition {
  navigation: auto;
}
```

The **View Transition API** (Chrome 111+, Safari 18+, Firefox 130+) provides page-to-page crossfade with zero JS. In Astro static sites, enabling it requires only the CSS `@view-transition { navigation: auto }` declaration — no adapter or framework changes. This is the key "contralabs.com-style" smooth navigation. Progressive enhancement: browsers without support fall back to instant navigation.

**Files to modify for interaction polish:**
- `src/styles/global.css` — `scroll-behavior`, `@view-transition`, any missing transition properties
- `src/components/Header.astro` — verify scroll-shadow transition timing
- `src/components/MobileMenu.astro` — verify drawer slide animation
- `src/components/Footer.astro` — consistent link hover transitions

---

## Component Boundary Summary

### New Components (v3.0)

| Component | File | Purpose | Used By |
|-----------|------|---------|---------|
| MatisseFrieze | `src/components/MatisseFrieze.astro` | SVG cut-out organic shape frieze | Hero.astro, optionally feature pages |

### Modified Components (v3.0)

| Component | File | What Changes | Risk |
|-----------|------|-------------|------|
| DeviceFrame | `src/components/DeviceFrame.astro` | Bezel realism, button count, screen radius, image fit | Low — self-contained, all usage sites benefit |
| Hero | `src/components/Hero.astro` | Import MatisseFrieze, typography weight token | Low |
| LandingCTA | `src/components/LandingCTA.astro` | Remove QR code + adjacent badge section | Low — subtractive |
| FeatureGrid | `src/components/FeatureGrid.astro` | Typography weight tokens on h2 | Low |
| StatsCounter | `src/components/StatsCounter.astro` | Typography weight token audit | Low |
| Header | `src/components/Header.astro` | Verify transition timing for polish | Low |
| MobileMenu | `src/components/MobileMenu.astro` | Verify slide animation | Low |
| Footer | `src/components/Footer.astro` | Link hover transition consistency | Low |

### Modified Styles (v3.0)

| File | What Changes | Risk |
|------|-------------|------|
| `src/styles/global.css` | `--weight-*` tokens, `@view-transition`, `scroll-behavior: smooth`, MatisseFrieze CSS, DeviceFrame improvements | Low — additive tokens, no token renames |

### Modified Layouts (v3.0)

| File | What Changes |
|------|-------------|
| `src/layouts/FeaturePageLayout.astro` | Typography weight token on h1/h2 |
| `src/layouts/CoachingPageLayout.astro` | Typography weight token on h1/h2 |
| `src/layouts/BlogPostLayout.astro` | Typography weight token on prose headings (if not governed by @tailwindcss/typography) |

---

## Data Flow (v3.0 additions)

### MatisseFrieze Render Flow

```
index.astro
  └── Hero.astro
        └── MatisseFrieze.astro
              ├── Props: variant, animate
              ├── Inline SVG: 5-7 <path> shapes in a wide viewBox
              ├── CSS class: .matisse-frieze, .matisse-shape
              └── data-animate on individual shapes (reuses BaseLayout observer)
```

No new data sources. No new JavaScript. The existing IntersectionObserver in BaseLayout will pick up any `data-animate` attributes on shape elements automatically.

### Typography Weight Flow

```
:root (global.css)
  └── --weight-display / --weight-heading / --weight-body / --weight-label
        ├── Named CSS classes (.nav-dropdown-title, .wheel-center-title, etc.)
        └── Component inline styles → migrate to CSS classes
```

### View Transition Flow

```
User clicks <a href="...">
  ├── Browser captures current page screenshot
  ├── CSS @view-transition { navigation: auto } triggers crossfade
  ├── New page loads
  └── Browser fades between old/new screenshots
```

Zero JS. Zero Astro configuration. Purely declarative CSS.

---

## Recommended Build Order

Dependencies determine order. Build from foundation to surface:

### Phase 1: Token & CSS Foundation (no component risk)
1. Add `--weight-*` tokens to `global.css`
2. Add `scroll-behavior: smooth` to `html` in `global.css`
3. Add `@view-transition { navigation: auto }` to `global.css`
4. Add `.matisse-frieze` and `.matisse-shape` CSS classes to `global.css`
5. Improve `.device-frame` CSS (bezel, button pseudo-elements) in `global.css`

**Why first:** Pure CSS additions. No component changes. Zero regression risk. Can verify in dev server immediately.

### Phase 2: DeviceFrame Realism (self-contained)
6. Update `DeviceFrame.astro` — adjust Dynamic Island dimensions, screen border-radius, add button count, fix image `object-position`

**Why second:** Self-contained component, no external dependencies. Changes propagate automatically to all pages. Can compare before/after in browser with a single component change.

### Phase 3: Remove QR Code (subtractive)
7. Edit `LandingCTA.astro` — remove QR code section and adjacent App Store badge

**Why third:** Purely subtractive. No new dependencies. Easy to verify: the section simply disappears.

### Phase 4: Typography Weight Rollout (distributed but low-risk)
8. Update `Hero.astro` heading to use `--weight-display` token
9. Update `FeatureGrid.astro` heading
10. Update `FeaturePageLayout.astro`, `CoachingPageLayout.astro` headings
11. Update named CSS classes in `global.css` to use `--weight-body` / `--weight-label`

**Why fourth:** Requires touching multiple files, but each change is a one-liner token substitution. Do visual check after each page type.

### Phase 5: MatisseFrieze Component (highest complexity)
12. Create `src/components/MatisseFrieze.astro` with inline SVG shapes
13. Import into `Hero.astro`
14. Tune shape colors, sizes, and animation timing in `global.css`

**Why last:** Requires the most creative iteration and visual judgment. CSS tokens (Phase 1) should already be in place so color references work immediately. The most likely phase to require multiple visual review cycles.

### Phase 6: Interaction Polish Audit
15. Review `Header.astro` scroll transition timing
16. Review `MobileMenu.astro` drawer animation
17. Review `Footer.astro` link hover states
18. Add any missing `transition` declarations across components

**Why last:** Polish is subjective and iterative. Do it after all structural changes are stable so you're not re-polishing elements that might still change.

---

## Anti-Patterns to Avoid

### Anti-Pattern 1: Putting Frieze SVG in an External File Loaded via `<img>`

**What people do:** Save the frieze as `public/matisse-frieze.svg` and reference it with `<img src="/matisse-frieze.svg">`.
**Why it's wrong:** External SVGs loaded via `<img>` cannot inherit CSS custom properties. Shape fills would need to be hardcoded hex values, making palette changes manual. Also, `<img>` SVG cannot be animated per-element with CSS or JS.
**Do this instead:** Inline SVG in `MatisseFrieze.astro`. Shapes reference `var(--color-surface-el)` etc. directly.

### Anti-Pattern 2: Adding Font Weights via New `@font-face` Declarations

**What people do:** Add manual `@font-face` rules for 300/500 weight variants to override the Astro Font API.
**Why it's wrong:** The Astro Font API owns the `@font-face` declarations and generates optimized preload hints. Duplicating declarations causes double-loading and breaks the API's hash-based cache invalidation.
**Do this instead:** Configure weight loading through the Font API in `astro.config.mjs` via the `weights` option on the font definition. Let the API handle all `@font-face` generation.

### Anti-Pattern 3: Scoping Animation in Component `<style>` Tags

**What people do:** Add `@keyframes matisse-float` inside a `<style>` block in `MatisseFrieze.astro`.
**Why it's wrong:** Astro scopes component `<style>` blocks with a generated hash attribute. `@keyframes` inside scoped styles are globally registered by the browser and the hash scope does not apply to the animation name — this causes naming collisions and confusing behavior across pages.
**Do this instead:** All `@keyframes` go in `global.css`, following the established pattern from `fade-up`, `hero-text-enter`, `wheel-arc-reveal`, etc.

### Anti-Pattern 4: Using Motion Library for the Frieze

**What people do:** Import `motion` from `motion/react` for parallax and shape animation because it's "more capable."
**Why it's wrong:** Motion requires a client-side JS island, adding ~15KB min+gzip and blocking initial paint if not deferred. The site's Lighthouse 98/99 scores are a product argument. CSS `@keyframes` with long durations (15-25s) achieve the same visual effect at zero cost.
**Do this instead:** CSS keyframe animations on `.matisse-shape` elements. If a single shape needs sequenced entrance, use `animation-delay` (same system as `data-animate-delay`).

### Anti-Pattern 5: Inline `font-weight` Overriding Token System

**What people do:** Patch typography on a per-component basis by changing inline `style="font-weight: 600"` to `style="font-weight: 300"`.
**Why it's wrong:** Bypasses the `--weight-*` token system. Future changes require hunting through all component files again.
**Do this instead:** Replace all inline `font-weight` on heading elements with a CSS class that references the token. One token change in `:root` updates everything.

---

## Scaling Considerations

This is a static site with no server-side state. "Scaling" means build performance and CSS maintainability.

| Concern | Current State | v3.0 Impact |
|---------|--------------|-------------|
| CSS bundle size | ~15KB global.css | +~2KB for frieze + weight tokens — negligible |
| JS bundle size | Inline scripts only, ~3KB | No new JS unless Motion added |
| Build time | Fast (static, ~20 files) | +1 component = no measurable impact |
| Lighthouse score | Mobile 98, Desktop 99 | View Transition API: neutral (CSS only). Inline SVG: neutral. Weight tokens: neutral. |
| Animation perf | All CSS, GPU-composited | Frieze float uses `transform` — GPU-composited, no layout thrash |

---

## Integration Points Summary

| Feature | Where It Integrates | New File? | Modified Files |
|---------|-------------------|-----------|---------------|
| Matisse Frieze | Hero.astro imports MatisseFrieze.astro | YES — MatisseFrieze.astro | Hero.astro, global.css |
| Typography weights | global.css `:root` tokens cascade everywhere | NO | global.css + 5-6 component/layout files (one-liner each) |
| DeviceFrame realism | DeviceFrame.astro + .device-frame CSS | NO | DeviceFrame.astro, global.css |
| Remove QR code | LandingCTA.astro (subtractive edit) | NO | LandingCTA.astro |
| Interaction polish | global.css + Header/MobileMenu/Footer | NO | global.css, Header.astro, MobileMenu.astro, Footer.astro |

---

## Sources

- Direct inspection of `src/styles/global.css`, `src/components/DeviceFrame.astro`, `src/components/Hero.astro`, `src/layouts/BaseLayout.astro`, `src/pages/index.astro` (2026-05-14)
- CSS View Transition API: https://developer.mozilla.org/en-US/docs/Web/API/View_Transition_API
- Astro Font API weights configuration: https://docs.astro.build/en/guides/fonts/
- Fontshare General Sans weight inventory: https://www.fontshare.com/fonts/general-sans
- Matisse cut-out SVG technique pattern: inline SVG with CSS variable fill, established in FeatureGrid.astro SVG implementation

---
*Architecture research for: Tuwa Website v3.0 Art Direction & Interaction Polish*
*Researched: 2026-05-14*
