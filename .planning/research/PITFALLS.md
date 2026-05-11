# Pitfalls Research

**Domain:** Athletic/fitness app marketing website — visual polish, animations, device frames, screenshot overhaul
**Project:** Tuwa — precision training load and recovery management
**Researched:** 2026-05-11
**Confidence:** HIGH (v1.0 copy/SEO pitfalls) | HIGH (v2.0 animation/performance pitfalls)

---

## v2.0 Visual Polish Pitfalls (NEW — This Milestone)

Critical mistakes when adding scroll animations, device mockups, and visual richness to an already-passing Lighthouse 95+ static Astro site.

---

### Pitfall A1: Animating Layout-Affecting Properties — CLS at Scroll Trigger

**What goes wrong:**
Scroll-reveal animations that animate `width`, `height`, `top`, `left`, `margin`, or `padding` cause Cumulative Layout Shift at the moment of trigger. The element reserves its collapsed space, then pushes surrounding content when it expands. CLS goes from 0 to 0.2+ on pages with multiple animated sections.

**Why it happens:**
Developers pick the visually obvious transition (e.g., `height: 0 → auto`, `margin-top: 40px → 0`) without knowing that the browser must recalculate layout for every frame — and the shift is counted as CLS even when triggered by scroll, not page load, in Google's Visual Stability Index (VSI) introduced in March 2026.

**How to avoid:**
- Animate ONLY `transform` (translate, scale) and `opacity`. These run on the GPU compositor without triggering layout or paint.
- For "slide in from below": use `transform: translateY(40px) → translateY(0)` combined with `opacity: 0 → 1`. Never `margin-top` or `top`.
- For "expand" effects: use `transform: scaleY(0) → scaleY(1)` with `transform-origin: top`, not `height: 0 → auto`.
- Add `will-change: transform, opacity` sparingly — only on elements with complex animations — to promote them to compositor layers in advance.

**Warning signs:**
- Lighthouse CLS score rises above 0.1 after adding animations
- Chrome DevTools Performance panel shows layout recalculations (purple bars) during scroll
- `will-change` added to more than ~5 elements on a single page (GPU memory pressure)

**Phase to address:** Animation implementation phase. Enforce as a PR review rule: no animation of layout properties.

---

### Pitfall A2: Missing `prefers-reduced-motion` — Accessibility and Lighthouse Penalization

**What goes wrong:**
Scroll animations ship without a `prefers-reduced-motion` media query guard. Users who have the OS accessibility setting enabled (roughly 70+ million users globally with vestibular disorders) experience flying elements, parallax, and fade-ins. Lighthouse Accessibility audit penalizes this as a WCAG 2.3.3 violation. Score drops from 95+ to below 90.

**Why it happens:**
Developers write animations in `global.css` or an inline `<script>` IntersectionObserver and forget the override. The feature works perfectly in default OS settings.

**How to avoid:**
```css
/* Global: define animations */
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(32px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* Guard: disable for reduced-motion users */
@media (prefers-reduced-motion: reduce) {
  [data-animate],
  [data-animate].is-visible {
    animation: none !important;
    transition: none !important;
    opacity: 1 !important;
    transform: none !important;
  }
}
```
For JavaScript-driven animations (IntersectionObserver, Motion library): check `window.matchMedia('(prefers-reduced-motion: reduce)').matches` before registering observers.

**Warning signs:**
- Lighthouse Accessibility score drop after adding animations
- No `@media (prefers-reduced-motion)` block in `global.css`
- IntersectionObserver script has no early-exit for reduced-motion preference

**Phase to address:** Animation implementation. This is a one-time guard; add it to the global CSS file before writing a single animation rule.

---

### Pitfall A3: FOUC — Elements Invisible Before JavaScript Loads

**What goes wrong:**
The scroll-reveal pattern sets initial state as `opacity: 0` in CSS so elements are hidden before animating in. If JavaScript (the IntersectionObserver) fails to load, is blocked, or executes late, the page renders with large sections of invisible content. On slow connections, the user sees blank space for several seconds.

**Why it happens:**
CSS-first reveal patterns set `opacity: 0` at the element level. The JS adds a class (e.g., `.is-visible`) that sets `opacity: 1` via a transition. If the JS never fires, elements stay invisible. This is the opposite of FOUC — a Flash of *Invisible* Content (FOIC).

**How to avoid:**
- Set the hidden state only via a JavaScript-added class. Default CSS state: visible.
```html
<section data-animate>...</section>
```
```css
/* Only hidden when JS runs and adds this class */
[data-animate].will-animate {
  opacity: 0;
  transform: translateY(32px);
}
[data-animate].is-visible {
  opacity: 1;
  transform: translateY(0);
  transition: opacity 0.5s ease, transform 0.5s ease;
}
```
```js
// JS adds .will-animate first, then observes
document.querySelectorAll('[data-animate]').forEach(el => {
  el.classList.add('will-animate');
  observer.observe(el);
});
```
- This guarantees that if JS fails, the page is fully readable.

**Warning signs:**
- `opacity: 0` in a CSS rule without a corresponding `.is-visible` override that the browser can apply without JS
- Page renders with large blank areas when viewed with JS disabled (test: Chrome DevTools → JS disabled)
- Lighthouse Best Practices flags elements not visible at initial load

**Phase to address:** Animation implementation phase. Test with JavaScript disabled in DevTools before shipping.

---

### Pitfall A4: Hero LCP Image Acquires `loading="lazy"` After Animation Refactor

**What goes wrong:**
During the device frame / screenshot overhaul, the hero image gets wrapped in a new component or `<div>` and Astro's `<Image>` component defaults or is reconfigured to `loading="lazy"`. LCP jumps from ~1.2s to 2.8s+. Lighthouse Performance drops from 95 to 72.

**Why it happens:**
Astro's `<Image>` component applies `loading="lazy"` by default. When developers refactor the hero to use `<Image>` or wrap an existing `<img>` in a new component, they don't set `loading="eager"` and `fetchpriority="high"` explicitly. Per 2025 Web Almanac data, only 17% of sites use `fetchpriority="high"` on their LCP image — this is a near-universal miss.

**How to avoid:**
```astro
<!-- Hero / LCP image: always explicit -->
<Image
  src={heroScreenshot}
  alt="Tuwa app showing recovery score dashboard"
  loading="eager"
  fetchpriority="high"
  widths={[375, 750, 1125]}
  sizes="(max-width: 375px) 375px, (max-width: 750px) 750px, 1125px"
/>
```
Also add a `<link rel="preload">` in `<head>` for the LCP image if it's served as a background-image via CSS:
```html
<link rel="preload" as="image" href="/images/hero-screenshot.webp" fetchpriority="high" />
```

**Warning signs:**
- Lighthouse reports "Largest Contentful Paint image was lazily loaded"
- LCP element changes from text to image after adding device frames (text LCP is typically faster to load than image LCP)
- Astro `<Image>` component on hero without explicit `loading="eager"`

**Phase to address:** Screenshot / device frame phase. Run Lighthouse after every hero section refactor.

---

### Pitfall A5: App Screenshots Blurry on Retina / High-DPI Displays

**What goes wrong:**
Screenshots exported at 1x (375×812px for iPhone) are displayed at their natural CSS size. On a 2x Retina screen, the browser scales up 1 CSS pixel to 2 device pixels, rendering the screenshot at half resolution — visibly blurry on MacBooks, iPhones, and most modern monitors.

**Why it happens:**
iPhone simulators and screen recording tools often default to non-Retina export. Developers test on the same laptop they're building on, where the screenshot may look correct in the editor but blurry in the browser (or vice versa depending on zoom level).

**How to avoid:**
- Export screenshots at 3x from Xcode Simulator (iPhone 15 Pro simulator uses 3x DPR). For a 390×844pt screen, the 3x export is 1170×2532px.
- Use Astro's `<Image>` or `<Picture>` with `densities={[1, 2, 3]}` or `widths` covering the 2x and 3x sizes:
```astro
<Image
  src={screenshot}
  alt="Tuwa recovery score"
  widths={[390, 780, 1170]}
  sizes="(max-width: 390px) 390px, (max-width: 780px) 780px, 1170px"
/>
```
- Astro's Sharp service generates WebP/AVIF from the source. If the source is 1x, generating WebP doesn't fix the underlying resolution deficit — the source must be high-resolution.
- For the device frame SVG: use an SVG or pure-CSS frame so the frame itself is infinitely sharp; only the screenshot content inside needs to be 2x/3x.

**Warning signs:**
- Screenshots look fine on a 1080p monitor but blurry on a MacBook Retina display
- Browser DevTools → Network shows image dimensions of ~375×812 for a 390px wide display slot
- No `densities` or `widths` prop on `<Image>` for screenshot assets

**Phase to address:** Screenshot overhaul phase, before any device frame work. Source resolution must be established first.

---

### Pitfall A6: Device Frame Breaks at Non-iPhone Viewport Widths

**What goes wrong:**
A CSS or SVG iPhone frame built at a fixed pixel width (e.g., `width: 320px`) looks correct on the exact breakpoint it was designed for, then either overflows its container on narrow mobile viewports or looks tiny and disconnected on wide desktop viewports. The bezel-to-screen proportions also distort if the frame uses pixel dimensions while the inner content uses percentage widths.

**Why it happens:**
Phone mockup components are often copied from examples that assume a fixed context. When placed into a fluid grid column or a hero section that changes width, the rigid px values do not scale. The aspect ratio of the device (approximately 9:19.5 for iPhone 15 Pro) is lost when width and height are specified independently.

**How to avoid:**
- Use `aspect-ratio: 9/19.5` (or equivalent for the device) on the outer frame container.
- Size the frame with `max-width` + `width: 100%` so it never overflows its column:
```css
.device-frame {
  width: 100%;
  max-width: 320px;
  aspect-ratio: 9 / 19.5;
  position: relative;
}
```
- Use the frame SVG as a `position: absolute` overlay covering 100%/100% of the container, with the screenshot `img` also `position: absolute; inset: [bezel-inset]`.
- Set `overflow: hidden` and `border-radius` on the screen area to clip the screenshot to the device screen shape — do not rely on the screenshot itself being pre-cropped.
- DaisyUI's `mockup-phone` component had a known responsive bug (aspect-ratio missing) that was fixed in PR #4108 — if using a library component, verify it's using `aspect-ratio` not hard-coded heights.

**Warning signs:**
- Frame loses proportions when the browser window is resized
- `height` specified in px without a corresponding `aspect-ratio`
- Screenshot content is clipped or overflows the "screen" area on smaller breakpoints

**Phase to address:** Device frame / screenshot overhaul phase. Test at 320px, 390px, 768px, 1280px, and 1440px viewport widths.

---

### Pitfall A7: `will-change` Overuse Degrades Performance on Low-End Devices

**What goes wrong:**
Developers add `will-change: transform` to every animated element as a blanket optimization. On a mid-range Android phone (which is the actual device profile of a significant portion of the audience), this creates too many GPU compositor layers, exhausting GPU memory. The browser must then fall back to software rendering, which is slower than not using `will-change` at all. INP (Interaction to Next Paint) degrades noticeably.

**Why it happens:**
`will-change` is presented as a "make animation fast" magic flag in most tutorials. The downside — that it consumes GPU memory per promoted layer — is rarely mentioned.

**How to avoid:**
- Apply `will-change` only on elements that are actively animating, not globally.
- Prefer applying it dynamically: add via JS before the animation starts, remove after it ends:
```js
el.style.willChange = 'transform, opacity';
el.addEventListener('animationend', () => { el.style.willChange = 'auto'; }, { once: true });
```
- Cap promoted layers at roughly 5–8 per page. Chrome DevTools Layers panel shows all promoted layers.
- For scroll-reveal animations that trigger once and stay visible, `will-change` is unnecessary — the animation is so brief that the overhead of promotion exceeds the benefit.

**Warning signs:**
- Chrome DevTools Layers panel shows 20+ compositor layers on a single page
- Performance degrades on simulated mid-tier mobile (DevTools → CPU throttle 4x)
- `will-change: transform` in a global CSS rule applied to all `[data-animate]` elements

**Phase to address:** Animation implementation. Add a Layers panel check to the pre-ship QA checklist.

---

### Pitfall A8: Cloudflare Pages Node.js Version Mismatch Breaks Build

**What goes wrong:**
Cloudflare Pages defaults to an older Node.js runtime (previously v12, now v18 on older project configurations). Astro 6 requires Node.js v22.12.0+. The build succeeds locally and fails silently or with a cryptic error on Cloudflare. More subtly: the build may succeed with Node 18 but behave differently from local because Astro 6 now runs prerendered pages in the Cloudflare `workerd` runtime by default, not Node.js.

**Why it happens:**
Cloudflare Pages does not automatically upgrade the Node version for existing projects. New projects also need an explicit `NODE_VERSION` override because the dashboard default lags behind current LTS.

**How to avoid:**
- Add `.nvmrc` to the project root with `22` (or the specific version).
- Set `NODE_VERSION=22` as a Cloudflare Pages environment variable in the dashboard under Settings → Environment Variables → Build variables.
- For a pure static site (no SSR), this is the only runtime concern — the `@astrojs/cloudflare` adapter is not needed and should NOT be installed (using it with `output: "static"` causes deployment failures).
- If `astro-compress` is a dependency: remove it. It is documented to cause Cloudflare Pages build failures after image optimization.

**Warning signs:**
- Local build succeeds; Cloudflare build fails with Node version or `require()` / ESM errors
- Build error mentions `node:fs` or `Astro.locals.runtime`
- `astro.config.mjs` is actually `astro.config.cjs` — CommonJS config files are not supported in Astro 6

**Phase to address:** Cloudflare Pages deployment phase. Add `.nvmrc` as part of the initial deployment setup, not after a build failure.

---

### Pitfall A9: Stale CDN Cache After Cloudflare Deployment

**What goes wrong:**
A new deployment pushes updated CSS (with animation classes) or new screenshots. Cloudflare CDN serves the old assets from its edge cache to visitors. The developer sees the updates immediately (their browser requested after the deploy); users report seeing the old version for hours or up to a week.

**Why it happens:**
Cloudflare Pages static assets are cached with a TTL of one week at edge nodes. New deployments update the origin, but edge nodes across data centers may not evict the old cache immediately. Astro's content-hashed asset filenames (`/assets/index.Xk3jv9.css`) normally prevent this — but only for hashed assets. Files without content hashes (images in `public/`, the root `index.html`) are affected.

**How to avoid:**
- Astro automatically content-hashes JS and CSS bundles in `dist/assets/` — these are safe.
- For images in `public/` (screenshots, OG images, device frame SVGs): after a significant update, manually trigger a Cloudflare cache purge: Dashboard → Caching → Configuration → Purge Everything.
- Alternatively, version image filenames explicitly when updating them (`screenshot-hero-v2.webp`) to force cache busting without a full purge.
- Do not add custom Cloudflare Cache Rules that override the default CDN behavior for `*.pages.dev` — it complicates debugging.

**Warning signs:**
- Updated screenshots not appearing after deployment on a non-local device
- Cache-Control headers on `public/` images show `max-age=31536000` without a content hash in the filename
- Site previously had a custom Cloudflare zone cache rule configured

**Phase to address:** Cloudflare Pages deployment phase and any subsequent screenshot update.

---

### Pitfall A10: Motion Library Added as Full React Island — Unnecessary Hydration

**What goes wrong:**
To get Motion (formerly Framer Motion) animations on the hero, the developer wraps the hero section in a React component with `client:load`. This ships the React runtime + Motion library (~60KB gzipped) to every page visitor and blocks LCP by delaying hydration. The hero content is invisible until React hydrates.

**Why it happens:**
Motion's documentation examples use React hooks. Developers familiar with React reach for the React variant without knowing that Motion has a standalone non-React API that works in vanilla JS and Astro without any framework runtime.

**How to avoid:**
- Use the standalone `motion` package (not `framer-motion`), which works with vanilla DOM elements:
```js
import { animate } from 'motion';
animate('.hero-mockup', { opacity: [0, 1], y: [40, 0] }, { duration: 0.6 });
```
- Put this in an Astro `<script>` tag (not a client island) — Astro bundles and defers `<script>` automatically.
- Reserve Astro islands for genuinely interactive components that require framework state (not just entrance animations).
- If CSS + IntersectionObserver can achieve the same effect, prefer that — zero KB added.

**Warning signs:**
- `client:load` on any component whose sole purpose is an entrance animation
- `framer-motion` in `package.json` (React runtime required)
- Hero content not visible in the page source (confirms it's inside a hydrated island)

**Phase to address:** Animation implementation phase. Establish the pattern before writing any animation code.

---

### Pitfall A11: Responsive Layout Regression from CSS Specificity Conflicts

**What goes wrong:**
Adding new utility classes for animations (e.g., `opacity-0 translate-y-8 transition-all`) to existing components conflicts with existing Tailwind responsive overrides. The element that was `hidden md:block` in v1.0 now has `opacity-0` applied from the animation layer and stays invisible on mobile even after the IntersectionObserver fires. Responsive behavior that was verified in v1.0 breaks silently.

**Why it happens:**
Tailwind v4 generates classes on demand. When animation utility classes are added to elements that already had responsive visibility classes (`hidden`, `invisible`, `sr-only`), specificity conflicts arise depending on the order Tailwind generates the CSS. In v4, the `@layer utilities` order matters more than in v3.

**How to avoid:**
- Do not combine visibility utilities with animation state classes on the same element. Use a wrapper:
```html
<div class="hidden md:block"> <!-- existing responsive wrapper -->
  <div data-animate> <!-- animation target -->
    ...
  </div>
</div>
```
- After adding animation classes to any existing component, test all breakpoints (320px, 390px, 768px, 1024px, 1440px) in browser DevTools.
- Run a full Lighthouse audit on mobile (simulated) after the animation pass — not just desktop.

**Warning signs:**
- Elements that were visible in v1.0 are now invisible on specific breakpoints after adding animation classes
- `opacity-0` used as a permanent Tailwind class rather than as an initial animation state added by JS
- No breakpoint regression test after adding new classes to existing components

**Phase to address:** Animation implementation and responsive refinement phase. Run cross-breakpoint checks before each PR merge.

---

## v1.0 Pitfalls (Preserved — Still Relevant)

The following pitfalls were identified during v1.0 research and remain relevant during v2.0 work.

---

### Pitfall 1: Feature-First Hero Copy

**What goes wrong:** The hero headline lists what the app does instead of what the athlete gains. Visitors see a capability inventory, not a reason to download.

**How to avoid:** Lead with transformation. "Know when to push. Know when to recover." Reserve technical terminology (ACWR, EWMA) for feature deep-dive pages.

**Phase to address:** Landing page copy — v1.0 phase.

---

### Pitfall 2: Credibility Overcorrection — Jargon Walls

**What goes wrong:** Front-loading sports science terminology to differentiate from generic trackers creates a page that reads like a research abstract.

**How to avoid:** Hierarchy: plain-language outcome → mechanism → methodology (link-out). Keep acronyms behind progressive disclosure.

**Phase to address:** All copy phases.

---

### Pitfall 3: Misaligned Audience Signal

**What goes wrong:** Hedged "for athletes of all levels" phrasing loses differentiation against mass-market competitors. Serious athletes self-select out.

**How to avoid:** Name the audience directly. "Built for athletes who train with a purpose — not just a step goal."

**Phase to address:** Landing page hero.

---

### Pitfall 4: App Store Badge as the Only CTA

**What goes wrong:** Desktop visitors have no path — the App Store link opens the App Store app or a web preview with no context.

**How to avoid:** Add QR code or "send to phone" option for desktop. Feature pages end with contextual CTAs.

**Phase to address:** Landing page layout.

---

### Pitfall 5: Promise-to-Onboarding Divergence

**What goes wrong:** Copy implies recovery scores are available immediately. The ACWR baseline requires days of data.

**How to avoid:** Reference baseline period honestly. "Tuwa learns your baseline in your first week."

**Phase to address:** Feature page copy, screenshot selection.

---

### Pitfall 6: Font Causing LCP and CLS Problems

**What goes wrong:** General Sans (or any web font) loaded without preloading hints causes FOUT or CLS.

**How to avoid:** Astro Font API handles this when using CDN delivery. If switching to self-hosted: add `<link rel="preload" as="font" crossorigin>` for woff2 files.

**Phase to address:** Base layout (v1.0 addressed via Astro Font API).

---

### Pitfall 7: Dark Mode Color Contrast Failures

**What goes wrong:** Warm palette passes contrast in light mode but fails WCAG AA in dark mode (descoped, light-only in v2.0 per PROJECT.md).

**How to avoid:** Not applicable — dark mode is out of scope per PROJECT.md.

---

### Pitfall 8: Client-Side Islands Hiding Content from Crawlers

**What goes wrong:** Interactive components with `client:load` wrap indexable copy, making it invisible to search engine crawlers.

**How to avoid:** All indexable content stays in the Astro template layer. Islands only for decorative/interactive elements.

**Phase to address:** All component implementation. Enforce via view-source check.

---

### Pitfall 9: OG / Social Preview Tags Incorrect Per Page

**What goes wrong:** All pages share one `og:image`. Relative URLs break social preview crawlers.

**How to avoid:** Per-page `ogImage` prop; absolute URLs using `Astro.site`.

**Phase to address:** Base component setup — addressed in v1.0.

---

### Pitfall 10: 301 vs 302 Redirect Mistakes

**What goes wrong:** Permanent 301 redirects cached by browsers for genuinely temporary routes.

**How to avoid:** Use Cloudflare `_redirects` file. Reserve 301 for permanent internal moves.

**Phase to address:** Deployment configuration.

---

## Technical Debt Patterns

| Shortcut | Immediate Benefit | Long-term Cost | When Acceptable |
|----------|-------------------|----------------|-----------------|
| Animate `margin` / `height` instead of `transform` | Easier to reason about visually | CLS penalty, layout jank on low-end devices | Never — always use transform |
| Apply `will-change` globally to all animated elements | One-line "optimization" | GPU memory exhaustion on mobile, slower INP | Never — apply per-element only during animation |
| Source screenshots at 1x resolution | Screenshots ready faster | Blurry on Retina; can't be fixed post-hoc without re-export | Never — export at 3x from the start |
| Wrap hero in React island for Motion animations | Easy access to Motion hooks | Ships React runtime + blocks LCP until hydrated | Never — use standalone Motion or CSS instead |
| Skip `prefers-reduced-motion` guard | Faster to ship | Lighthouse Accessibility penalty; genuine user harm | Never — one-time addition; no maintenance cost |
| Hard-code device frame in px instead of aspect-ratio | Simpler implementation | Breaks at every non-designed breakpoint | Only in controlled fixed-width contexts (never in marketing hero) |
| `astro-compress` package for image compression | Automated compression | Known to break Cloudflare Pages builds | Never — use Astro's built-in Sharp service instead |

---

## Integration Gotchas

| Integration | Common Mistake | Correct Approach |
|-------------|----------------|------------------|
| Cloudflare Pages | Using `@astrojs/cloudflare` adapter with `output: "static"` | No adapter needed for pure static; skip the adapter entirely |
| Cloudflare Pages | Default Node.js runtime is too old for Astro 6 | Set `NODE_VERSION=22` in dashboard + add `.nvmrc` with `22` |
| Cloudflare Pages | Stale CDN cache after image updates | Manually purge cache after updating non-hashed `public/` assets; or version filenames |
| Astro `<Image>` | Defaults to `loading="lazy"` including on hero/LCP images | Always set `loading="eager" fetchpriority="high"` on the above-the-fold hero image |
| Astro `<Image>` | Source image at 1x resolution passed to Sharp | Sharp optimizes format but cannot add resolution that isn't there; source must be 2x/3x |
| Motion library | Importing `framer-motion` (React) vs `motion` (standalone) | Use standalone `motion` package in Astro `<script>` tags, not React islands |
| Tailwind v4 | Using `@layer components` to register custom animation utilities | Use `@utility` in v4 — `@layer components` behavior changed from v3 |

---

## Performance Traps

| Trap | Symptoms | Prevention | When It Breaks |
|------|----------|------------|----------------|
| Too many compositor layers via `will-change` | High GPU memory, jank on mobile, INP > 200ms | Limit to ~5–8 actively animating elements per page; remove after animation | Any page with 10+ animated elements |
| LCP image lazy-loaded | LCP > 2.5s, Lighthouse Performance < 90 | `loading="eager" fetchpriority="high"` on hero image | Any page where a screenshot is the LCP element |
| Motion library in React island | LCP blocked by hydration; 60KB+ added to bundle | Use standalone `motion` in `<script>` tag | Pages with complex hero animations |
| Animating layout properties | CLS > 0.1, layout jank | Only animate `transform` + `opacity` | Any scroll-triggered animation that touches layout |
| 1x screenshots at Retina size | Blurry images on MacBook/iPhone | Export at 3x; use `widths` prop in `<Image>` | Any display with DPR > 1 (all modern devices) |
| Device frame in fixed px | Frame overflows or disappears at breakpoints | `width: 100%; max-width: Xpx; aspect-ratio: 9/19.5` | Viewports narrower or wider than the designed size |

---

## "Looks Done But Isn't" Checklist

- [ ] **LCP image:** Has `loading="eager"` and `fetchpriority="high"` — verify in Lighthouse "Opportunities" section
- [ ] **All animations:** `@media (prefers-reduced-motion: reduce)` guard exists in `global.css` — verify by toggling OS setting
- [ ] **Animation initial state:** Hidden state only applied via JS class (`.will-animate`), not directly in CSS — verify with JS disabled
- [ ] **Device frame:** Proportions maintained at 320px, 390px, 768px, 1280px — verify by resizing browser
- [ ] **Screenshots:** Source files are 3x resolution (1170px+ wide for an iPhone 15 screen) — verify in Finder or Astro build output
- [ ] **Cloudflare build:** `NODE_VERSION=22` set in dashboard environment variables — verify in Pages project settings
- [ ] **No `@astrojs/cloudflare` adapter** in `package.json` or `astro.config.mjs` for this static site — verify
- [ ] **Lighthouse mobile score:** Run on mobile simulation (not just desktop) after all visual changes — verify >= 95
- [ ] **will-change usage:** Fewer than 8 promoted compositor layers per page — verify via Chrome DevTools Layers panel
- [ ] **Motion library:** Using standalone `motion` package (not `framer-motion`) in `<script>` tags, not React islands — verify in `package.json`

---

## Recovery Strategies

| Pitfall | Recovery Cost | Recovery Steps |
|---------|---------------|----------------|
| CLS from wrong animation property | MEDIUM | Audit all `@keyframes` and `transition` rules; replace layout properties with `transform` equivalents; re-run Lighthouse |
| Missing `prefers-reduced-motion` | LOW | Add one `@media` block to `global.css`; test with OS setting |
| FOIC (invisible content with JS off) | MEDIUM | Refactor animation classes to be JS-applied only; test with JS disabled |
| LCP regression from lazy hero | LOW | Add `loading="eager" fetchpriority="high"` to the `<Image>` component; redeploy |
| Blurry screenshots | HIGH | Re-export at 3x from Xcode Simulator; replace all image assets; redeploy |
| Device frame responsive breakage | MEDIUM | Replace `height: px` with `aspect-ratio`; use `max-width` + `width: 100%`; test all breakpoints |
| Cloudflare build Node version failure | LOW | Add `.nvmrc` + dashboard `NODE_VERSION=22`; trigger rebuild |
| Stale CDN cache | LOW | Cloudflare dashboard → Caching → Purge Everything |
| React island for animation | HIGH | Rewrite as standalone `motion` in `<script>` tag; remove React island and React dependency |

---

## Pitfall-to-Phase Mapping

| Pitfall | Prevention Phase | Verification |
|---------|------------------|--------------|
| A1: CLS from layout-animating properties | Animation implementation | Lighthouse CLS = 0 after animations added |
| A2: Missing prefers-reduced-motion | Animation implementation (first step) | Toggle OS reduced-motion; verify no movement |
| A3: FOIC — invisible content without JS | Animation implementation | Lighthouse with JS disabled; all content visible |
| A4: LCP image gets lazy-loaded | Screenshot/device frame phase | Lighthouse "LCP image was lazily loaded" warning absent |
| A5: Blurry screenshots on Retina | Screenshot overhaul (asset prep) | View on a Retina display; crisp at 100% zoom |
| A6: Device frame breaks at breakpoints | Device frame implementation | Responsive test at 320px / 390px / 768px / 1280px |
| A7: will-change overuse | Animation implementation | Chrome DevTools Layers panel < 8 promoted layers |
| A8: Cloudflare Node version mismatch | Deployment setup phase | First successful Cloudflare Pages build |
| A9: Stale CDN cache | Deployment + any image update | View updated assets from incognito / fresh device |
| A10: Motion as React island | Animation implementation (before writing any animation) | No `client:load` on animation-only components |
| A11: Responsive regression from new classes | Animation + responsive refinement phase | Full breakpoint test after every PR |

---

## Sources

- [Web Animation Performance Tier List — Motion.dev](https://motion.dev/magazine/web-animation-performance-tier-list) — compositor properties, will-change guidance
- [How to create high-performance CSS animations — web.dev](https://web.dev/animations-guide/) — transform/opacity vs layout properties
- [Optimize Cumulative Layout Shift — web.dev](https://web.dev/articles/optimize-cls) — CLS prevention, scroll animation CLS
- [Core Web Vitals 2026 update — RoastWeb](https://roastweb.com/blog/core-web-vitals-explained-2026) — Visual Stability Index (VSI) in March 2026 update
- [prefers-reduced-motion — MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@media/prefers-reduced-motion) — media query spec and implementation
- [Design accessible animation — Pope Tech, 2025](https://blog.pope.tech/2025/12/08/design-accessible-animation-and-movement/) — WCAG 2.3.3, 70M affected users stat
- [Use fetchpriority=high for LCP hero image — Addy Osmani](https://addyosmani.com/blog/fetch-priority/) — fetchpriority impact data
- [Lazy Loading Best Practices For LCP Images 2026 — WebGaro](https://webgaro.com/blog/lazy-loading-best-practices-for-lcp-images/) — 2025 Web Almanac stats on lazy LCP
- [Astro Images documentation](https://docs.astro.build/en/guides/images/) — Image/Picture component defaults, Sharp service
- [Astro Image Optimization Guide — EastonDev, 2025](https://eastondev.com/blog/en/posts/dev/20251203-astro-image-optimization-guide/) — densities, widths, WebP/AVIF
- [DaisyUI mockup-phone aspect-ratio fix PR #4108](https://github.com/saadeghi/daisyui/pull/4108) — device frame responsive bug
- [Anatomy of a CSS Phone Mockup — Conor Luddy](https://www.conor.fyi/writing/anatomy-of-a-css-phone-mockup) — overflow clip, aspect-ratio approach
- [Deploy Astro on Cloudflare Pages — official docs](https://developers.cloudflare.com/pages/framework-guides/deploy-an-astro-site/) — static vs SSR adapter guidance
- [How to Deploy Astro on Cloudflare Pages Without Getting Screwed — Grant Kennedy](https://www.gmkennedy.com/blog/deploy-astro-cloudflare-pages/) — Pages vs Workers confusion, Node version
- [Astro Build Failing? 7 Common Causes — EastonDev, 2025](https://eastondev.com/blog/en/posts/dev/20251203-astro-build-failures-guide/) — astro-compress Cloudflare failure
- [Cloudflare Pages Build Image docs](https://developers.cloudflare.com/pages/configuration/build-image/) — NODE_VERSION variable
- [Motion animation library with Astro — Netlify Developers](https://developers.netlify.com/guides/motion-animation-library-with-astro/) — standalone vs React Motion
- [FOUC prevention for GSAP — Webflow](https://help.webflow.com/hc/en-us/articles/46490560780051-FOUC-prevention-for-Interactions-with-GSAP) — FOUC/FOIC pattern analysis
- [Tailwind v4 unused styles discussion — GitHub](https://github.com/tailwindlabs/tailwindcss/discussions/16634) — @layer vs @utility in v4

---
*Pitfalls research for: Tuwa marketing website — v2.0 visual polish milestone*
*Researched: 2026-05-11*
