# Feature Research

**Domain:** App marketing website visual polish — scroll animations, device mockups, screenshot presentation
**Project:** Tuwa v2.0 Visual Overhaul
**Researched:** 2026-05-11
**Confidence:** HIGH (competitor sites fetched live; animation/CSS patterns verified via MDN + caniuse)

---

## Context: What Was Already Built (v1.0)

Existing v1.0 features this research builds ON TOP OF:
- Landing page: hero, 5 feature deep-dives, blog, legal pages (10 pages total)
- Basic scroll animations via IntersectionObserver + CSS keyframes
- Framed PNG screenshots (currently blurry on Retina/desktop displays)
- General Sans font via Astro Font API
- Design tokens via CSS custom properties
- Dark mode descoped (light-mode only)

This document focuses ONLY on the v2.0 scope: visual polish, motion design, device mockup presentation, and screenshot quality.

---

## Competitor Research: Observed Patterns

### WHOOP (whoop.com)
**Positioning:** Premium health wearable, serious athletes
- Full-width hero imagery with product + lifestyle context
- App UI overlays on lifestyle photos (metrics displayed over real-world shots)
- Color theming with vibrant brand blue (#4a53ff) against white
- WebP format throughout with responsive srcset (640px to 3840px)
- "ScrollTracker" and "PageView" components suggesting scroll-based interactions
- Progressive content reveal as users scroll through sectioned blocks
- Premium through restraint: no flashy transitions, instead clean image composition

### Oura Ring (ouraring.com)
**Positioning:** Holistic health, medical-grade data, Team USA
- Alternating layouts: lifestyle photo + app UI mockup (side by side)
- Real-life context images paired with screenshot of specific data view
- Motion components with CSS `filter`, `opacity`, `transform` for scroll reveals
- Light serif + ultralight sans combination (AkkuratLL, Editorial New)
- Italic emphasis `_Made for you_` for hero headline rhythm
- Section carousel (6 states: "Starting your day," "Taking a walk," etc.) — sticky scroll
- Breathable spacing; generous whitespace as premium signal

### Strava (strava.com)
**Positioning:** Community, social motivation
- Layered image assets: device frame PNG + background + static-layer-front (parallax depth)
- "static-layer" and "static-layer-front" elements suggesting CSS parallax
- Two-column hero: copy left, device mockup right (standard but executed cleanly)
- SVG icons for feature cards
- Multi-layer composition for pseudo-3D depth without heavy JS

### TrainingPeaks (trainingpeaks.com)
**Positioning:** Professional coaching platform, 25 years of innovation
- Contextual lifestyle photography over app mockups (athletes in real training)
- Trust signals as copy pattern: "87% of WorldTour Cycling teams," "40+ National Teams"
- Brand blue (#3177FF) + brand pink (#FF5FA9) with gradient overlays
- Shadow presets (natural, deep, sharp) for component depth
- Dual hero CTA: athlete path vs coach path — immediate user segmentation
- Less visual polish, more authority through copy and social proof

### Apple Fitness+ (apple.com/apple-fitness-plus)
**Positioning:** Ecosystem integration, premium fitness
- Start-frame / end-frame image pairs → animated transitions between states
- Hardware layers composited behind software UI screenshots ("hero_hw" + "hero_sw")
- Shadow assets (hero_shadow) as separate layers for depth
- Device mockups NOT isolated — integrated into lifestyle shots
- Paired before/after UI states suggest CSS/JS animation between screenshots
- 4K hero visuals establishing premium baseline

### Eight Sleep (eightsleep.com)
**Positioning:** Recovery science, high-performance sleep
- "animateOnScroll" on headings and descriptions
- "ScrollSequenceStatic" — frame-by-frame content sequences tied to scroll position
- Noise texture overlay PNGs for warmth/depth (moire_1_vblw94.png)
- Hard evidence copy: "50+ clinical studies," advisory board credentials
- Celebrity/expert testimonials as primary trust mechanism
- Lifestyle product photography, not sterile mockups

### Arc Browser (arc.net)
**Positioning:** Premium indie app, design-forward
- Full-viewport video assets with gradient mask fade-to-transparent
- Squiggle SVG borders with CSS `@keyframes` translate for section dividers
- `backdrop-filter: blur(3.05px)` — frosted glass effect on overlaid elements
- Noise overlay texture (`noise-light.png`) for depth
- `transform: scale(1.05)` on hover, `scale(0.98)` on active — micro-interactions
- Fixed hero with centered icon + large headline + layered background (solid + blur image + noise)
- `will-change: transform` + `transition: 150ms ease` on all interactive elements

### Linear (linear.app)
**Positioning:** Premium productivity tool
- Grid dot cascade animations (3200ms, step-based) for ambient motion
- "upDown" keyframe waves (2800ms) for subtle life in background
- `text-wrap: balance` + `text-wrap: pretty` for headline refinement
- Typography color hierarchy: primary → secondary → tertiary → quaternary text
- Custom monospace for code/data elements

### Notion (notion.com)
**Positioning:** All-in-one productivity
- Bento-grid layout for feature cards (different sized cards in a masonry-style grid)
- Layered card components: front image + back image (flip/reveal effect)
- Carousel-based feature demonstrations with autoplay video
- Eyebrow labels + heading + CTA link hierarchy within cards
- Color-coded feature icons (#ff8a33, #ad6ded, #2a9d99) for visual differentiation

### Superhuman (superhuman.com)
**Positioning:** Premium email for power users
- Three custom variable fonts (Super Sans, Super Serif, Super Mono) — brand through typography
- `text-wrap: balance` throughout
- Glassmorphic email preview panes (translucent + blur)
- "Tonal flower" decorative element that moves on scroll
- CSS layer system: `@layer reset, theme, base, components, atoms`
- Premium NOT through animation — through typography restraint and purposeful whitespace

---

## Feature Landscape

### Table Stakes (Users Expect These)

Features users assume exist. Missing = product feels incomplete or untrustworthy in 2026.

| Feature | Why Expected | Complexity | Notes |
|---------|--------------|------------|-------|
| Crisp, Retina-ready screenshots | Every modern marketing site serves 2x/3x images. Blurry screenshots signal low quality. | LOW | Fix: export screenshots at 3x, use `srcset` with 2x descriptor, or use Astro `<Image>` with proper width. The current blurriness is a credibility issue. |
| Scroll-triggered entrance animations | Standard by 2026 for consumer app marketing sites. Static pages feel unfinished. WHOOP, Oura, Eight Sleep all use this. | LOW-MED | Extend existing IntersectionObserver with staggered delays, fade+translateY pattern. Already started — needs refinement and consistent application across all sections. |
| Hover micro-interactions on CTAs | Users expect buttons to respond visually. No hover state reads as broken. | LOW | `transform: scale(1.02)` on hover, `scale(0.97)` on active. `transition: 150ms ease`. Apply `will-change: transform` for GPU acceleration. |
| Consistent spacing rhythm | Fitness audience is mobile-native; compressed content feels cluttered. | LOW | Audit section padding. Competitors use 120-160px vertical section gaps on desktop, 64-80px on mobile. |
| Section-level visual hierarchy | Each section needs an eyebrow label, headline, and supporting copy — differentiated by size/weight/color. | LOW | Typography scale audit. Apply `text-wrap: balance` to all headings. |
| Responsive breakpoints tested and polished | Not just "works" — actually looks designed at each breakpoint. | MED | Test at 375px (iPhone SE), 390px (iPhone 15), 768px (iPad), 1280px (laptop), 1920px (desktop). |
| Readable screenshot context | Screenshots shown without explanation don't convert. Viewers need labels or callouts. | LOW-MED | Annotated screenshots with arrow/callout overlays, or caption text beneath each screenshot. |

### Differentiators (Competitive Advantage)

Features that set the site apart from generic template-looking marketing pages.

| Feature | Value Proposition | Complexity | Notes |
|---------|-------------------|------------|-------|
| iPhone device frame wrapping screenshots | Industry standard for iOS apps. Naked screenshots look like internal QA exports, not polished marketing. Every direct competitor (WHOOP, Oura, Strava) uses some form of device framing. | LOW-MED | Two approaches: (A) Pure CSS Tailwind mockup — no image dependency, scalable, crisp at all DPIs. (B) Pre-rendered PNG mockup frames from deviceshots.com or previewed.app. CSS approach preferred for crispness and zero image overhead. |
| Sticky scroll feature showcase | Oura's "Starting your day → Taking a walk → Winding down" carousel is the gold standard: one sticky panel, content updates as user scrolls. Extremely effective for showing multiple app states in a single viewport. | HIGH | Requires JS: sticky container + scroll listener + content swap. Adds ~50-100 lines of vanilla JS. High impact on feature deep-dive pages. Consider for landing page "How it works" section. |
| Layered parallax depth on hero | Strava uses static-layer + static-layer-front for parallax depth. Arc uses gradient masks on video. Creates 3D-like immersion without full video cost. | MED | CSS `transform: translateY()` on multiple background layers at different scroll speeds via IntersectionObserver or scroll event. Keep to 2 layers max for perf. |
| Bento grid feature card layout | Notion, Linear, and high-end product sites use bento grids. Better than standard 3-column card grids: allows for varied card sizes and visual rhythm. | MED | CSS Grid with named areas. Large card for primary feature + 2-3 smaller cards. Works without JS. |
| Noise/grain texture overlay | Arc, Eight Sleep, and Linear all use subtle noise texture over backgrounds. Removes the "flat design" sterility. Warms the design and creates perceived depth. | LOW | 150x150px noise PNG at 3-5% opacity as `::before` pseudo-element on hero/section backgrounds. Zero performance impact (tiny PNG, CSS pointer-events: none). |
| Glass morphism on key UI elements | Frosted glass cards over screenshots or gradient backgrounds. Arc uses `backdrop-filter: blur(3px)`. Eight Sleep uses semi-transparent product imagery. | LOW-MED | `backdrop-filter: blur(8px)` + `background: rgba(255,255,255,0.7)` + `border: 1px solid rgba(255,255,255,0.3)`. Supported in all modern browsers. Use sparingly — 1-2 elements, not site-wide. |
| Animated stat counters / number reveals | Eight Sleep uses "50+ clinical studies," WHOOP uses "91 more minutes weekly activity." Animating these numbers on scroll increases perceived significance. | LOW-MED | CountUp.js (3KB) or vanilla JS `requestAnimationFrame`. Trigger on IntersectionObserver. Apply to ACWR/training load methodology stats. |
| CSS scroll-driven animations (native) | Chrome 115+ supports `animation-timeline: scroll()` for pure CSS scroll effects. ~85% browser support as of 2026. No JS required. | LOW-MED | Use for progress indicators, fade-ins, and parallax background movement. Provide `@supports` fallback for Firefox (which requires flag). Excellent for read progress bar on blog posts. |
| Screenshot carousel on feature pages | Show multiple app states for a feature without overwhelming the layout. Oura does this with a 6-state carousel. | MED | Native CSS scroll-snap (`scroll-snap-type: x mandatory`) + optional prev/next buttons. No JS library needed. Swipeable on mobile automatically. |
| `text-wrap: balance` on all headings | Eliminates awkward single-word orphans in headlines. Free, zero-cost refinement. Linear and Superhuman both use this. | LOW | One line of CSS: `h1, h2, h3 { text-wrap: balance; }`. Add to global.css. |
| Gradient brand accents | Pure flat color backgrounds read as templates. Subtle gradients (15-degree angle, primary color to slightly shifted hue) suggest depth. | LOW | Replace solid `bg-brand` with `background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-dark) 100%)`. |
| `will-change: transform` on animated elements | GPU compositing hint. Prevents scroll jank on IntersectionObserver animations. | LOW | Add `will-change: transform` to any element that will animate. Remove after animation completes (to avoid memory overhead). |

### Anti-Features (Commonly Requested, Often Problematic)

| Feature | Why Requested | Why Problematic | Alternative |
|---------|---------------|-----------------|-------------|
| Video autoplay hero | Peloton, Nike, and big-budget fitness brands do it. Creates cinematic opening. | LCP killer. A 5MB video loop destroys Core Web Vitals (Lighthouse < 95 target). Mobile users on cellular get bandwidth-throttled. Apple Fitness+ uses it but has CDN infrastructure we don't. | Animated CSS hero (gradient pulse, floating mockup with subtle motion, noise texture) achieves motion without video. Reserve video for background on blog hero if ever — use `<video muted playsinline preload="none">` with a loading threshold check. |
| Full GSAP ScrollTrigger integration | Seen on Nike, Awwwards-winning sites. Maximum scroll control, complex timeline orchestration. | 48KB min bundle (GSAP core + ScrollTrigger). Violates the "no client-side JS frameworks" performance constraint. Overkill for "polish" goal. | CSS scroll-driven animations + vanilla IntersectionObserver handles 95% of use cases. If a specific sequence genuinely requires timeline control, use `motion` (Motion One, 18KB) in an Astro island. |
| Three.js / WebGL hero | Dramatic, memorable. Some premium fitness brands use particle effects. | 250KB+ bundle. Crashes on low-end iPhones. Zero relevance to training load management — would look incongruous. | CSS-animated gradient + noise texture achieves depth without hardware-accelerated 3D. |
| Lottie animation files | Vector animation, small file size relative to video. Used by some fintech/health apps. | Still requires lottie-web (44KB) or @lottiefiles/lottie-player. Requires designer to produce Lottie-format files. For a solo developer, this is a design production bottleneck. | CSS keyframe animations for icon motion. Existing IntersectionObserver for scroll effects. |
| Framer Motion in Astro | Rich animation API, used by many React marketing sites. | Pulls in full React + ReactDOM (~130KB) just for animations. Explicitly against the "no client-side JS frameworks" constraint. | `motion` (Motion One — the standalone lib, not Framer Motion) is framework-free, 18KB, works in Astro islands without React. |
| Particle.js / tsParticles background | Trendy in fitness apps. Ambient motion. | CPU intensive on scroll + on mobile. Perceived as gimmicky by the serious athlete audience Tuwa targets. | Subtle grid dot cascade animation (pure CSS, like Linear uses) provides ambient motion without particle overhead. |
| AOS (Animate On Scroll) library | Easy drop-in scroll animation library, popular. | 6KB JS + 20KB CSS. Adds a dependency with its own update cadence. The IntersectionObserver approach already in place does the same thing with zero dependencies. | Extend existing IntersectionObserver setup with `data-animate` attribute variants: `fade-up`, `fade-in`, `slide-right`. |
| Infinite scroll on blog listing | Reduces pagination friction. | Breaks native browser history, makes footer inaccessible, hurts SEO (crawlers may not reach content below fold). | Standard pagination (page 1, 2, 3). Or "load more" button as compromise — explicit user action, no SEO impact. |
| Dark mode toggle on website | App is dark-first; visitors might expect website to match. | Explicitly descoped in PROJECT.md. Adds CSS complexity, doubles visual QA surface, and can produce flash of unstyled content on first load. | Light mode only. The design already uses a clean light aesthetic. Revisit in v3 if user demand is demonstrated. |

---

## Feature Dependencies

```
Crisp Retina screenshots (fix blurriness)
    └──required by──> iPhone device frame mockup (if frame is CSS, inner content must be sharp)
    └──required by──> Sticky scroll feature showcase (shown screenshots must be crisp)
    └──required by──> Screenshot carousel (same requirement)

iPhone device frame (CSS approach)
    └──requires──> Retina-quality screenshots for inner content
    └──enhances──> Sticky scroll showcase (frame provides context)
    └──note: must be built before feature page visual pass

Scroll entrance animations (refined)
    └──requires──> Layout is stable (do not animate during layout changes)
    └──requires──> prefers-reduced-motion @media query check
    └──enhances──> Stat counter animations (share IntersectionObserver infrastructure)

Bento grid layout
    └──requires──> Content exists for each card (screenshots, copy)
    └──requires──> Retina screenshots (cards show app UI)
    └──conflicts with──> Standard 3-column card grid (replace, not add)

Sticky scroll showcase
    └──requires──> Multiple screenshot states per feature (3-6 app states)
    └──requires──> Stable positioning context (position:sticky, height:100vh container)
    └──note: HIGH complexity — build last, validate content + mockup first

Noise texture overlay
    └──requires──> Base background colors established
    └──enhances──> Glass morphism (glass over noisy background looks better)
    └──complexity: LOW — add as final polish step

CSS scroll-driven animations
    └──requires──> `animation-timeline: scroll()` @supports check (Firefox fallback)
    └──note: additive to existing IntersectionObserver, not a replacement

`text-wrap: balance`
    └──no dependencies — pure CSS addition
    └──add as part of typography pass, before any screenshot work

Glass morphism
    └──requires──> Meaningful background behind the glass element (gradient or image)
    └──note: Ineffective on flat white backgrounds
```

---

## MVP Definition (v2.0 Visual Overhaul)

### Phase A: Foundation (do first — unblocks everything else)

- [x] Fix blurry screenshots — export at 3x, use proper srcset — WHY FIRST: everything else depends on sharp images
- [x] `text-wrap: balance` on all headings — WHY: free polish, zero risk
- [x] Consistent spacing rhythm audit — WHY: visible quality signal, low effort
- [x] Hover micro-interactions on CTAs — WHY: table stakes, low effort

### Phase B: Device Mockup + Screenshots

- [ ] CSS iPhone device frame wrapping hero screenshot — WHY: industry standard for iOS apps; naked screenshot looks unfinished
- [ ] Screenshot carousel on at least 2 feature deep-dive pages — WHY: shows multiple app states in limited space
- [ ] Annotated screenshot callouts — WHY: converts "I see the UI" to "I understand the value"

### Phase C: Animation Polish

- [ ] Refined scroll entrance animations — stagger, ease, consistent timing — WHY: existing animations need polish, not removal
- [ ] Animated stat counters (ACWR/recovery methodology callouts) — WHY: makes science claims land harder
- [ ] CSS-only read progress bar on blog posts — WHY: low effort `animation-timeline: scroll()` showcase

### Phase D: Advanced Polish (do last)

- [ ] Noise texture overlay on hero/key sections — WHY: warmth, depth; zero performance cost
- [ ] Gradient brand accents replacing flat color backgrounds — WHY: removes template feel
- [ ] Bento grid for feature overview section — WHY: higher visual variety than 3-column cards
- [ ] Glass morphism on 1-2 key callout elements — WHY: premium signal; use sparingly

### Defer to v3.0

- [ ] Sticky scroll feature showcase — HIGH complexity, HIGH impact. Build when content (multiple screenshot states per feature) is ready.
- [ ] Parallax depth layers on hero — needs design time; risk of feeling overdone
- [ ] Full responsive design audit on real devices — after all content changes land

---

## Feature Prioritization Matrix

| Feature | User Value | Implementation Cost | Priority |
|---------|------------|---------------------|----------|
| Fix blurry screenshots (srcset/3x) | HIGH | LOW | P1 |
| `text-wrap: balance` on headings | MEDIUM | LOW | P1 |
| Hover micro-interactions on CTAs | MEDIUM | LOW | P1 |
| Spacing rhythm audit | MEDIUM | LOW | P1 |
| CSS iPhone device frame | HIGH | LOW | P1 |
| Refined scroll entrance animations | HIGH | LOW-MED | P1 |
| Gradient brand accents | MEDIUM | LOW | P2 |
| Noise texture overlay | MEDIUM | LOW | P2 |
| Screenshot carousel (CSS scroll-snap) | HIGH | MED | P2 |
| Animated stat counters | MEDIUM | LOW-MED | P2 |
| Bento grid feature cards | HIGH | MED | P2 |
| Glass morphism (selective) | MEDIUM | LOW-MED | P2 |
| CSS scroll-driven read progress bar | LOW | LOW | P2 |
| Sticky scroll showcase | HIGH | HIGH | P3 |
| Parallax depth hero layers | MEDIUM | MED | P3 |
| Full responsive device audit | MEDIUM | MED | P3 |

---

## Competitor Visual Pattern Matrix

| Pattern | WHOOP | Oura | Strava | Apple Fitness+ | Arc | Linear | Tuwa v2 Target |
|---------|-------|------|--------|----------------|-----|--------|----------------|
| Device frame on screenshots | Yes (lifestyle overlay) | Yes (side-by-side) | Yes (layered) | Yes (hardware composited) | N/A (app) | N/A (app) | Yes — CSS frame |
| Sticky scroll feature carousel | No | Yes (6 states) | No | No | No | No | P3 target |
| Noise texture overlay | No | No | No | No | Yes | No | Yes |
| Scroll entrance animations | Yes | Yes | Yes (parallax layers) | Yes (frame pairs) | Yes | Yes (grid dots) | Yes (refine existing) |
| Glass morphism | No | No | No | No | Yes | No | Selective |
| Bento grid | No | No | No | No | No | No | Yes (differentiator) |
| Animated stat counters | Yes | No | No | No | No | No | Yes |
| Gradient backgrounds | No (flat) | Yes (subtle) | No | Yes | Yes | Yes | Yes |
| CSS `text-wrap: balance` | Unknown | Unknown | Unknown | Yes | Yes | Yes | Yes |
| Video autoplay hero | No | No | No | Yes (CDN-backed) | Yes | No | No (anti-feature) |

---

## Screenshot Quality: Technical Root Cause (Fix Plan)

The current blurriness is a DPR (Device Pixel Ratio) mismatch issue.

**Root cause:** Screenshots exported at 1x logical CSS pixels display blurry on Retina screens (DPR 2-3) because the browser upscales the image to fill physical pixels.

**Fix options (in order of preference):**

1. **srcset with density descriptors** — `<img srcset="shot-2x.png 2x, shot-3x.png 3x" src="shot-1x.png">` — Browser picks the right version. Astro `<Image>` component handles this automatically if you provide a high-res source.

2. **Astro `<Image>` with width prop** — Provide the @3x source, set `width` to the 1x CSS display width. Astro generates WebP + AVIF with correct srcset. Simplest approach if source screenshots are already at 3x.

3. **Generated device mockup with embedded screenshot** — If switching to a CSS device frame, the inner `<img>` follows option 1 or 2 above. The frame itself is CSS, so it's resolution-independent.

**iOS screenshot sizes (for reference):**
- iPhone 15 Pro: 1179 × 2556 px (@3x) — display as 393 × 852 CSS px
- iPhone 15: 1170 × 2532 px (@3x) — display as 390 × 844 CSS px
- Export from Xcode Simulator at these native sizes (already @3x), display at 1/3 the pixel width in CSS

---

## CSS Device Frame: Recommended Implementation

Use Flowbite's Tailwind CSS device mockup component as a starting point, customized for crispness.

**Why CSS over PNG frame:**
- Resolution-independent (sharp at any DPR)
- No external image dependency
- Tailwind utility classes = consistent with existing stack
- Inner content is a real `<img>` tag with srcset support

**Flowbite approach (verified pattern):**
```html
<!-- Tailwind CSS iPhone mockup — from Flowbite -->
<div class="relative mx-auto border-gray-800 dark:border-gray-800 bg-gray-800 border-[14px] rounded-[2.5rem] h-[600px] w-[300px] shadow-xl">
  <div class="h-[32px] w-[3px] bg-gray-800 dark:bg-gray-800 absolute -start-[17px] top-[72px] rounded-s-lg"></div>
  <div class="h-[46px] w-[3px] bg-gray-800 dark:bg-gray-800 absolute -start-[17px] top-[124px] rounded-s-lg"></div>
  <div class="h-[46px] w-[3px] bg-gray-800 dark:bg-gray-800 absolute -start-[17px] top-[178px] rounded-s-lg"></div>
  <div class="h-[64px] w-[3px] bg-gray-800 dark:bg-gray-800 absolute -end-[17px] top-[142px] rounded-e-lg"></div>
  <div class="rounded-[2rem] overflow-hidden w-[272px] h-[572px] bg-white dark:bg-gray-800">
    <img src="..." class="dark:hidden w-[272px] h-[572px]" alt="app screenshot" />
  </div>
</div>
```

**Adaptations needed for Tuwa:**
- Replace `border-gray-800` with a titanium/space gray CSS variable matching Tuwa brand
- Add `srcset` to the inner `<img>` for Retina sharpness
- Wrap in an Astro component `<IPhoneMockup>` for reuse across pages

---

## Sources

- WHOOP.com live analysis, fetched 2026-05-11
- Oura Ring (ouraring.com) live analysis, fetched 2026-05-11
- Strava.com live analysis, fetched 2026-05-11
- TrainingPeaks.com live analysis, fetched 2026-05-11
- Apple Fitness+ (apple.com/apple-fitness-plus) live analysis, fetched 2026-05-11
- Eight Sleep (eightsleep.com) live analysis, fetched 2026-05-11
- Arc Browser (arc.net) live analysis, fetched 2026-05-11 — strongest design inspiration
- Linear (linear.app) live analysis, fetched 2026-05-11 — ambient animation patterns
- Notion (notion.com) live analysis, fetched 2026-05-11 — bento grid patterns
- Superhuman (superhuman.com) live analysis, fetched 2026-05-11 — typography restraint
- [Flowbite Tailwind CSS Device Mockups](https://flowbite.com/docs/components/device-mockups/) — CSS iPhone frame implementation
- [MDN: CSS scroll-driven animations](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Scroll-driven_animations) — browser support ~85% (2026)
- [caniuse: animation-timeline scroll()](https://caniuse.com/mdn-css_properties_animation-timeline_scroll) — Chrome 115+, Safari 17.2+, Firefox (behind flag)
- [Device Shots](https://deviceshots.com/) — pre-rendered mockup generator alternative
- [Previewed.app](https://previewed.app/) — iOS mockup generator
- [displaypixels.io: DPR explained](https://displaypixels.io/learn/device-pixel-ratio-explained.html) — DPR root cause for blurry screenshots
- [Mastering CSS Scroll Timeline 2026](https://dev.to/softheartengineer/mastering-css-scroll-timeline-a-complete-guide-to-animation-on-scroll-in-2025-3g7p)

---

*Feature research for: Tuwa v2.0 visual overhaul*
*Researched: 2026-05-11*
*Previous v1.0 feature research preserved in git history*
