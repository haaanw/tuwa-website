# Technology Stack

**Project:** Tuwa Marketing Website
**Researched:** 2026-05-11
**Milestone:** v2.0 Visual Overhaul — Animations, Device Frames, Screenshot Presentation, Deployment
**Confidence:** HIGH for all primary recommendations — verified via npm registry, official docs, and multiple 2026 sources

---

## What This Document Covers

This is the ADDITIVE stack research for v2.0. It covers only new capabilities needed:

1. Scroll-reveal animations
2. iPhone device mockup frames
3. App screenshot presentation and generation tools
4. Cloudflare Pages deployment specifics

Existing v1.0 stack (Astro 6, Tailwind v4, MDX, SEO, General Sans, Chart.js) is validated and NOT re-researched here. See CLAUDE.md or v1 stack decisions for that foundation.

---

## Recommended Stack Additions

### Animations

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| `tailwind-animations` (midudev) | 1.0.1 | Scroll-triggered reveal animations via CSS View Timeline API | Pure CSS, zero runtime JS. Installs as a Tailwind plugin with `@import 'tailwind-animations'` in global.css. Provides `view-animate-single`, `animate-range-*`, and 30+ prebuilt `animate-*` utilities. Uses the native CSS View Timeline API (hardware-accelerated on compositor thread). Compatible with Tailwind v4 specifically — the v3 shim (`@midudev/tailwind-animations`) is deprecated. Firefox still has this behind a flag as of May 2026; use progressive enhancement (animations enhance but never break) so Firefox users see the static layout gracefully. |
| `motion` (formerly Framer Motion) | 12.38.0 | Complex sequenced animations: hero entrance, device mockup choreography | Use only if CSS alone cannot achieve the desired sequencing. Motion v12 has a 2.3KB mini `animate()` path and a vanilla JS `inView()` function — no React required. Import directly in an Astro `<script>` tag (not an island) using `import { animate, inView, stagger } from "motion"`. Tree-shaking keeps bundle impact minimal. Only add if CSS reveal animations feel too basic for the hero section. |

**Decision rule:** Start with `tailwind-animations` CSS-only approach for all scroll reveals on feature/content sections. Add `motion` only if hero entrance or device mockup choreography requires JS timeline control.

**Confidence:** HIGH for `tailwind-animations` (npm confirmed 1.0.1, Tailwind v4 native, 2026 article confirms production use). MEDIUM for `motion` (npm confirmed 12.38.0, Netlify guide confirms Astro integration pattern — but "only if needed").

### Device Mockup Frames

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| Custom Tailwind CSS component (copy-paste, no package) | N/A | iPhone frame around app screenshots in hero and feature sections | The Flowbite device mockup pattern uses only Tailwind utility classes (`border-[14px]`, `rounded-[2.5rem]`, `shadow-xl`, overflow-hidden container) — fully compatible with Tailwind v4 arbitrary value syntax. No npm package needed. Own the component in `src/components/IPhoneMockup.astro`. Accepts an image src prop, renders a styled frame div with the screenshot inside. This approach: zero dependencies, arbitrary resize via Tailwind, fully responsive down to mobile, no external library to maintain. |

**What NOT to use:** `react-device-frameset` or `device-mockup` npm packages — these require React, add unnecessary JS to a static site, and the CSS-only approach achieves identical results.

**Implementation sketch** (copy into `src/components/IPhoneMockup.astro`):
```astro
---
interface Props {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}
const { src, alt, width = 300, height = 600 } = Astro.props;
---
<div class="relative mx-auto border-[14px] border-gray-800 bg-gray-800 rounded-[2.5rem] shadow-xl"
     style={`width: ${width}px; height: ${height}px`}>
  <!-- Dynamic Island notch -->
  <div class="absolute top-0 left-1/2 -translate-x-1/2 w-[100px] h-[28px] bg-gray-800 rounded-b-[1rem] z-10"></div>
  <!-- Screen -->
  <div class="rounded-[2rem] overflow-hidden w-full h-full bg-white">
    <img {src} {alt} class="w-full h-full object-cover" loading="lazy" />
  </div>
</div>
```

**Confidence:** HIGH — Pattern validated via Flowbite docs and multiple Tailwind CSS iPhone mockup tutorials. Arbitrary values work identically in Tailwind v4.

### Screenshot Presentation (Static Assets)

| Approach | Purpose | When to Use |
|----------|---------|-------------|
| Astro `<Image>` component wrapping raw PNG screenshots | Blur-free, WebP/AVIF optimized screenshots | Always — replace any `<img>` tags with `<Image>` from `astro:assets` to get automatic format optimization, correct `srcset`, and no blurry rendering |
| Screenhance (screenhance.com) | Generate polished device-framed mockup images for hero backgrounds | Use for static hero imagery that needs high-quality 3D device renders — upload raw app screenshots, export framed PNG/WebP at 2x resolution, commit to `src/assets/` |
| Apple Developer Design Resources | Official iPhone 16 device frames (Figma format) | Use if building marketing page overlays in Figma first; export as PNG with transparent background, place over screenshots in CSS |

**On the "generate programmatically" question:** For a marketing site with infrequent screenshot updates, browser-based tools (Screenhance, MockUPhone) are faster than integrating Puppeteer/Playwright into the build pipeline. Use Screenhance to generate 3-4 hero mockup images once, commit them, and use `<Image>` for optimization. Only justify a programmatic pipeline if screenshots change with every app release — that's premature for v2.

**Confidence:** HIGH for `<Image>` component (core Astro feature). MEDIUM for Screenhance (tool exists and works, but output quality depends on template choice — verify before committing to hero use).

### Cloudflare Pages Deployment

| Setting | Value | Notes |
|---------|-------|-------|
| Build command | `npm run build` | Standard Astro build |
| Output directory | `dist` | Astro default static output |
| Framework preset | Astro | Select from Cloudflare's preset list |
| Node.js version | 20.x | Set via environment variable `NODE_VERSION=20` |
| Adapter | None | Do NOT install `@astrojs/cloudflare` — causes failures with `output: 'static'` |
| `astro.config.mjs` | `output: 'static'` | Must be explicit |

**Critical gotcha (verified from production postmortem):** After first deployment, verify the URL ends in `*.pages.dev` NOT `*.workers.dev`. Cloudflare silently routes some projects to Workers instead of Pages. If you see `*.workers.dev`, go to project settings and click "Shift to Pages."

**Confidence:** HIGH — Confirmed via Astro official deploy docs, Cloudflare Pages framework guide, and 2026 production deployment post.

---

## Installation

```bash
# Scroll animations (Tailwind v4 CSS plugin)
npm install tailwind-animations

# Complex animations — only if CSS is insufficient for hero choreography
npm install motion
```

Add to `src/styles/global.css` (after the existing Tailwind import):
```css
@import "tailwindcss";
@import "@tailwindcss/typography";
@import "tailwind-animations";   /* ADD: scroll-reveal utilities */
```

No changes needed to `astro.config.mjs` for the animation additions — the Tailwind plugin loads via CSS import, not Vite config.

---

## Alternatives Considered

| Category | Recommended | Alternative | Why Not |
|----------|-------------|-------------|---------|
| Scroll animations | `tailwind-animations` CSS plugin | `motion` JS library | JS adds ~12KB even with tree-shaking; CSS View Timeline runs on compositor thread with zero JS overhead. Use CSS first, JS only for hero choreography. |
| Scroll animations | `tailwind-animations` CSS plugin | AOS (Animate on Scroll) library | AOS is scroll-event-based (main thread). `tailwindcss-intersect` uses IntersectionObserver (more efficient) but requires a JS snippet in `<head>`. The CSS View Timeline approach in `tailwind-animations` is newer and faster — no JS at all. |
| Scroll animations | `tailwind-animations` CSS plugin | GSAP ScrollTrigger | GSAP is 48KB+ minimum. Appropriate for WebGL galleries and complex timelines, overkill for marketing page reveals. |
| Scroll animations | `tailwind-animations` CSS plugin | Native CSS `@keyframes` + IntersectionObserver `<script>` | Valid and what v1 STACK.md recommended. `tailwind-animations` is a better v2 choice because it wraps this pattern in Tailwind utility classes (consistent with the project's CSS approach) and uses the newer View Timeline API instead of IntersectionObserver callbacks. |
| Device frames | Custom Tailwind CSS component | `react-device-frameset` npm package | Requires React. Adds client-side JS to a static site. Identical visual output achievable with 20 lines of Tailwind HTML. |
| Device frames | Custom Tailwind CSS component | SVG device frames (PommePlate, etc.) | SVG frames are large files, harder to customize colors/shadows, don't respond to Tailwind sizing utilities. CSS approach is simpler and more maintainable. |
| Screenshot generation | Screenhance (browser tool) | Puppeteer/Playwright build integration | Screenshots change ~monthly at most. Build-pipeline overhead (browser binary, CI time, RAM) isn't justified. Manual generation + commit is the right tradeoff at this scale. |
| Cloudflare adapter | None | `@astrojs/cloudflare` | Adapter is for SSR/edge functions only. With `output: 'static'`, the adapter silently breaks deployment by routing to Workers. Skip it. |

---

## What NOT to Use

| Avoid | Why | Use Instead |
|-------|-----|-------------|
| `framer-motion` (old package name) | Deprecated — renamed to `motion`. The `framer-motion` package on npm redirects, but import paths differ. | `motion` with `import { animate } from "motion"` |
| `@astrojs/tailwind` | Deprecated for Tailwind v4. Causes installation conflicts. | `@tailwindcss/vite` in `vite.plugins` (already in project) |
| `@midudev/tailwind-animations` | Deprecated compatibility shim for the old v3 version. | `tailwind-animations` (the unprefixed package) |
| `AOS` (Animate On Scroll library) | Main-thread scroll events, conflicts with Astro view transitions, requires re-init on navigation. | `tailwind-animations` CSS plugin |
| `@astrojs/cloudflare` adapter | Causes deployment failures with `output: 'static'`. Workers deployment instead of Pages. | No adapter — connect GitHub repo directly to Cloudflare Pages |
| Online mockup tools that require account/subscription for HD export | Vendor lock-in for core marketing assets | Screenhance free tier (3 exports/month) or Apple Developer Figma resources |

---

## Browser Compatibility Note for CSS View Timeline

The `tailwind-animations` plugin uses the CSS View Timeline API (`animation-timeline: view()`):

| Browser | Support |
|---------|---------|
| Chrome 115+ | Full |
| Edge 115+ | Full |
| Safari 18+ | Full |
| Firefox | Behind flag (`layout.css.scroll-driven-animations.enabled`) as of May 2026, enabled in Nightly |

**Mitigation:** Treat scroll animations as progressive enhancement. Elements must be fully visible and readable without animation. The `view-animate-single` class makes content appear when scrolled into view — if the animation doesn't fire (Firefox), the element should still be visible at its final state (opacity: 1, no transform offset) by default. Set initial state only via the animation keyframe, not the base element style.

---

## Version Compatibility

| Package | Version | Compatible With | Notes |
|---------|---------|-----------------|-------|
| `tailwind-animations` | 1.0.1 | Tailwind v4 only | The unprefixed package is v4-only. Do not confuse with `@midudev/tailwind-animations` (v3 shim). |
| `motion` | 12.38.0 | Vanilla JS, no framework required | Import from `"motion"` for vanilla JS functions. Import from `"motion/react"` ONLY if using React islands — this project does not use React. |
| `tailwind-animations` | 1.0.1 | Astro 6 | No Astro integration needed — it's a CSS `@import`, transparent to Astro's build pipeline. |

---

## Confidence Assessment

| Decision | Confidence | Source |
|----------|------------|--------|
| `tailwind-animations` v1.0.1 for scroll reveals | HIGH | npm registry confirmed, 2026-03 BrightCoding article, Tailwind v4 CSS `@import` pattern verified |
| `motion` v12.38.0 for hero choreography (if needed) | MEDIUM | npm confirmed 12.38.0, Netlify Astro guide confirms import pattern, but "only if needed" classification is judgment call |
| Custom Tailwind CSS for iPhone mockup | HIGH | Flowbite docs + multiple tutorials confirm Tailwind v4 arbitrary value syntax works |
| Screenhance for pre-generated hero mockups | MEDIUM | Tool exists and is functional; visual quality of output is template-dependent |
| Cloudflare Pages deployment settings | HIGH | Astro official docs + 2026 production post confirming `*.pages.dev` vs `*.workers.dev` gotcha |
| Firefox progressive enhancement for View Timeline | HIGH | MDN docs confirm flag status as of 2026-05; "visible by default" fallback is standard pattern |

---

## Sources

- [tailwind-animations npm package (unprefixed, v4)](https://www.npmjs.com/package/tailwind-animations) — version 1.0.1 confirmed
- [midudev/tailwind-animations GitHub](https://github.com/midudev/tailwind-animations) — install instructions, View Timeline API usage
- [BrightCoding: Tailwind Animations plugin 2026](https://www.blog.brightcoding.dev/2026/03/10/tailwind-animations-the-revolutionary-plugin-for-effortless-ui-motion) — production usage confirmed March 2026
- [motion npm package](https://www.npmjs.com/package/motion) — version 12.38.0 confirmed
- [Motion + Astro guide (Netlify)](https://developers.netlify.com/guides/motion-animation-library-with-astro/) — `inView`, `animate`, `stagger` pattern in Astro `<script>` tags
- [MDN: CSS scroll-driven animations](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Scroll-driven_animations) — browser support table, Firefox flag status
- [Flowbite device mockups](https://flowbite.com/docs/components/device-mockups/) — Tailwind CSS iPhone frame HTML pattern
- [Screenhance iPhone mockup generator](https://screenhance.com/iphone-mockup-generator) — free browser tool for pre-generated frames
- [Apple Developer Design Resources](https://developer.apple.com/design/resources/) — official iPhone 16 device frames
- [Astro deploy to Cloudflare Pages](https://docs.astro.build/en/guides/deploy/cloudflare/) — official docs, no-adapter pattern
- [Cloudflare Pages Astro framework guide](https://developers.cloudflare.com/pages/framework-guides/deploy-an-astro-site/) — build settings
- [Deploy Astro Cloudflare Pages pitfalls (gmkennedy.com, 2026)](https://www.gmkennedy.com/blog/deploy-astro-cloudflare-pages/) — `*.workers.dev` vs `*.pages.dev` gotcha, "Shift to Pages" fix

---

*Stack research for: Tuwa Marketing Website v2.0 Visual Overhaul*
*Researched: 2026-05-11*
