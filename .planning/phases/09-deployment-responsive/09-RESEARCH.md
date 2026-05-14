# Phase 9: Deployment & Responsive — Research

**Researched:** 2026-05-14
**Domain:** Cloudflare Pages deployment, Apple App Store badge, responsive CSS, Lighthouse performance
**Confidence:** HIGH

---

## Summary

Phase 9 is the final shipping phase for tuwa.app v2.0. It has four discrete work streams that are largely independent and can be planned in parallel: (1) Cloudflare Pages deployment wiring, (2) official Apple App Store badge replacement, (3) responsive layout fixes at five target widths, and (4) Lighthouse >= 95 verification. None require new dependencies; all work is configuration, asset replacement, and CSS. The codebase is already well-structured for all four tasks — the App Store URL is centralised in `src/config.ts`, badge references in LandingCTA and FeatureCTA already use `/badges/app-store-badge.svg`, the Footer uses a text CTA (not the badge), Hero does not yet render a badge, and the wheel container's breakpoints at 479/767px already exist in `global.css`. The only open unknowns are (a) whether the live Cloudflare Pages build image defaults to Node 22 automatically (it does — V3 is now default) and (b) which specific responsive overflow issues exist after the Phase 08.1 click-wheel addition. The Hero does not currently include a badge CTA at all — only a device mockup — so D-01 (add badge to Hero) will require a new HTML block, not just a src swap.

**Primary recommendation:** Execute in wave order: deploy first (establishes the live URL for Lighthouse), then badge replacement (asset swap + one new Hero block), then responsive audit at all five widths, then Lighthouse run on the live deployment. This order matches real-world risk: deployment issues discovered early cannot be hidden by a passing local Lighthouse score.

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

**App Store Badge**
- D-01: Replace placeholder SVG with official Apple "Download on the App Store" SVG badge
- D-02: Badge appears in all download locations — Hero, LandingCTA, FeatureCTA, and Footer
- D-03: SVG format for crisp scaling and small file size
- D-04: English-only (consistent with project out-of-scope: no i18n)

**Responsive Strategy**
- D-05: Keep current breakpoints (479/767/768px). Do NOT add explicit breakpoints for 375/390/1280/1440px — rely on fluid design
- D-06: Use fluid sizing (clamp(), percentages, etc.) for scaling between breakpoints. Only add new breakpoints if testing reveals actual layout breaks
- D-07: Max-width container cap at 1440px — content centered on wider screens
- D-08: Test at all 5 success criteria widths: 375px, 390px, 768px, 1280px, 1440px

**Deployment Setup**
- D-09: Cloudflare Pages via GitHub integration (connect repo in dashboard, auto-deploy on push to main)
- D-10: Build command: `npm run build`, output directory: `dist/`, NODE_VERSION=22
- D-11: tuwa.app DNS already on Cloudflare — add custom domain in Pages settings
- D-12: No `@astrojs/cloudflare` adapter needed — pure static output (carried from Phase 1)

**Lighthouse Performance**
- D-13: If Lighthouse drops below 95, first sacrifice is noise texture (body::after overlay) — purely decorative
- D-14: Run Lighthouse both locally during development AND on live Cloudflare deployment
- D-15: Performance budget: Lighthouse >= 95 on both mobile and desktop profiles

### Claude's Discretion
- Image optimization specifics (format selection, compression levels)
- Order of responsive fixes (which pages/components to fix first)
- Specific Lighthouse audit items to address beyond noise texture

### Deferred Ideas (OUT OF SCOPE)
None — discussion stayed within phase scope.
</user_constraints>

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| DEPL-01 | Configure Cloudflare Pages deployment (build command, output dir, NODE_VERSION=22) | V3 build image defaults to Node 22; no adapter needed for static output; dashboard setup steps documented below |
| DEPL-02 | Replace placeholder App Store badge SVG with official Apple asset | Official SVG at `developer.apple.com/assets/elements/badges/download-on-the-app-store.svg`; Hero currently has no badge block — new HTML block required |
| DEPL-03 | Responsive design testing and fixes across all breakpoints (mobile, tablet, desktop) | Existing breakpoints at 479/767/768px cover all 5 test widths; wheel container at 280/360/480px; overflow risks catalogued below |
| DEPL-04 | Maintain Lighthouse Performance >= 95 on both mobile and desktop after all changes | Hero device image already uses `loading="eager" fetchpriority="high"`; noise texture is identified first cut if needed |
</phase_requirements>

---

## Architectural Responsibility Map

| Capability | Primary Tier | Secondary Tier | Rationale |
|------------|-------------|----------------|-----------|
| Deployment config | Static / CDN | — | Cloudflare Pages reads `dist/` output; build config lives in dashboard settings + `package.json` scripts |
| App Store badge asset | Static / CDN | — | SVG placed in `public/badges/`, served as a static file; no build-time processing needed |
| Badge rendering | Frontend (Astro component) | — | Four components render badges; `src/config.ts` already centralises the App Store URL |
| Responsive CSS | Frontend (Astro/CSS) | — | All layout fixes live in `global.css` and scoped component styles |
| Lighthouse audit | External tooling | — | `lighthouse` CLI or Chrome DevTools runs against the live URL or local preview |
| DNS / custom domain | CDN (Cloudflare dashboard) | — | tuwa.app already on Cloudflare DNS; CNAME auto-created when domain is added to Pages project |

---

## Standard Stack

### Core (no new dependencies needed)

| Tool | Version | Purpose | Why Standard |
|------|---------|---------|--------------|
| Cloudflare Pages | Managed | Static hosting + CDN | Project constraint; already decided in Phase 1 |
| Astro `npm run build` | 6.3.1 [VERIFIED: package.json] | Generates `dist/` output | Existing project setup |
| `lighthouse` CLI | 12.x (latest) | Local Lighthouse audits | Google's reference implementation; `npx lighthouse` requires no install |
| Chrome DevTools | Built-in | Quick Lighthouse runs | Fastest iteration loop during responsive fix passes |

### Supporting

| Tool | Version | Purpose | When to Use |
|------|---------|---------|-------------|
| `astro preview` | bundled | Serve production build locally | Run before Lighthouse audit to test minified output |
| Browser DevTools responsive mode | N/A | Test breakpoints without a real device | Set exact widths: 375, 390, 768, 1280, 1440 |
| PageSpeed Insights | online | Validate Lighthouse score on live URL | After deployment — gives real Lighthouse in CrUX context |

**No new npm installs required for this phase.** Lighthouse can be run via:
```bash
npx lighthouse https://tuwa.app --preset=desktop --output=html --output-path=./lighthouse-desktop.html
npx lighthouse https://tuwa.app --output=html --output-path=./lighthouse-mobile.html
```

---

## Architecture Patterns

### System Architecture Diagram

```
GitHub push to main
        |
        v
Cloudflare Pages build (V3 image, Node 22)
        |
    npm run build
        |
        v
    dist/  (static files)
        |
    Cloudflare CDN edge
        |
    tuwa.app (custom domain, CNAME -> *.pages.dev)
        |
        v
Browser requests
  |-- GET /                -> index.astro output
  |-- GET /badges/app-store-badge.svg  -> public/ passthrough
  |-- GET /fonts/*         -> Astro Fonts API output
  `-- GET /sitemap-index.xml -> @astrojs/sitemap output
```

### Recommended File Changes
```
public/
└── badges/
    └── app-store-badge.svg   <- REPLACE with official Apple SVG (same filename, same path)

src/components/
├── Hero.astro                <- ADD badge block below device mockup
├── LandingCTA.astro          <- img src already /badges/app-store-badge.svg, no change needed
├── FeatureCTA.astro          <- img src already /badges/app-store-badge.svg, no change needed
└── Footer.astro              <- REPLACE text "Get the App" btn with badge img

src/styles/
└── global.css                <- Targeted responsive fixes (overflow, clamp, max-width 1440)
```

### Pattern 1: Official Apple Badge Drop-In

The official Apple "Download on the App Store" SVG is served at a stable Apple CDN URL.
It can be downloaded once at plan time and committed to `public/badges/` under the existing filename `app-store-badge.svg`. No path changes needed in LandingCTA or FeatureCTA.

**Official asset URL (confirmed accessible):**
`https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg`

**Key dimensions of the official SVG:**
- viewBox: `0 0 119.66407 40` (Apple's native proportions)
- The placeholder SVG was `148 × 44`; the official SVG is `119.66 × 40` — components must update `width`/`height` attributes to match

[VERIFIED: WebFetch of https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg]

**Badge guidelines (Apple):**
- Minimum screen height: 40px — the official SVG is exactly 40px tall, no resizing needed
- Use the black badge; do not modify colours or proportions
- "App Store" must never be translated

[CITED: https://developer.apple.com/app-store/marketing/guidelines/]

**Hero badge block pattern (new, does not exist yet):**
```astro
<!-- Add after device mockup, mirroring LandingCTA pattern -->
<div class="flex justify-center" style="margin-top: var(--space-xl);">
  <a
    href={APP_STORE_URL}
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Download Tuwa on the App Store"
  >
    <img
      src="/badges/app-store-badge.svg"
      alt="Download on the App Store"
      height="40"
      width="120"
      loading="eager"
    />
  </a>
</div>
```
Note: `loading="eager"` because the badge is above the fold in the hero.

**Footer badge pattern (replaces "Get the App" text button):**
The Footer currently renders `class="btn-cta"` styled text link. Decision D-02 requires the badge here too. Replace the anchor's inner content with the `<img>` tag, matching the pattern in LandingCTA. The `btn-cta` class should be removed from this anchor (badge img should not have the green button background).

### Pattern 2: Cloudflare Pages Setup

**Step-by-step (dashboard):**
1. Go to Workers & Pages > Create application > Pages tab
2. Connect GitHub, select `tuwa-website` repo
3. Set: Build command = `npm run build`, Output directory = `dist`
4. Add environment variable: `NODE_VERSION` = `22` (in Build environment variables)
5. Save and Deploy

**Why NODE_VERSION is still needed even though V3 defaults to Node 22:**
The V3 build image ships Node 22.16.0 by default as of the Cloudflare Pages V3 announcement. However, the `package.json` `engines` field specifies `>=22.12.0` — explicitly setting NODE_VERSION=22 in the dashboard is belt-and-suspenders and matches decision D-10. It is a low-cost safety measure.

[CITED: https://developers.cloudflare.com/changelog/post/2025-05-30-pages-build-image-v3/]
[CITED: https://developers.cloudflare.com/pages/configuration/build-image/]

**Custom domain (tuwa.app already on Cloudflare):**
- Go to Pages project > Custom domains > Set up a domain
- Enter `tuwa.app` — Cloudflare auto-creates a CNAME record because the zone is in the same account
- Do NOT manually create a CNAME record first — this causes 522 errors
- Propagation is typically instant for same-account Cloudflare zones

[CITED: https://developers.cloudflare.com/pages/configuration/custom-domains/]

**The `@astrojs/cloudflare` adapter must NOT be used** — static output (`output: 'static'` default in Astro) requires no adapter. Using the adapter with static output causes deployment failures.
[VERIFIED: project decision log — [Init] entry in STATE.md]

**`_redirects` file already exists** in `public/`:
```
/privacy.html    /privacy    301
/terms.html      /terms      301
/support.html    /support    301
```
This file is copied to `dist/` by Astro and processed by Cloudflare Pages edge workers. No changes needed.

### Pattern 3: Responsive Fix Strategy

**Existing breakpoints in `global.css`:**
```css
/* Section spacing */
@media (min-width: 768px) { .section-spaced { ... } }

/* Sticky showcase */
@media (min-width: 768px) { .device-sticky-wrapper { position: sticky; } }
@media (max-width: 767px)  { .sticky-showcase { grid-template-columns: 1fr; } }

/* Click wheel */
@media (min-width: 480px) and (max-width: 767px) { .wheel-container { width: 360px; height: 360px; } }
@media (max-width: 479px) { .wheel-container { width: 280px; height: 280px; } }
```

**Target widths and which breakpoints apply:**
| Width | Active Breakpoints | Key Components to Verify |
|-------|--------------------|--------------------------|
| 375px | max-width: 479px, max-width: 767px | wheel=280px, sticky single-col, all text |
| 390px | max-width: 479px, max-width: 767px | wheel=280px, badge new in Hero |
| 768px | min-width: 768px exactly | layout switch point — test both 767 and 768 |
| 1280px | min-width: 768px | No dedicated breakpoint — test for overflow |
| 1440px | min-width: 768px | max-width 1440 cap per D-07 — verify content centering |

**Max-width 1440 container pattern (D-07):**
The main layout already uses `max-w-6xl` (1152px Tailwind default) for most sections. The `max-width: 1440px` cap should be applied to the outermost page wrapper if any section stretches to full viewport width without a cap. Check `BaseLayout.astro` for an outer wrapper.

**Known overflow risks to audit:**
1. **Wheel container horizontal overflow at 375px:** `wheel-container` at 280px should fit, but on a 375px viewport with `px-6` (24px each side) the available content width is 327px — 280px fits. Verify no margin/padding pushes it.
2. **Hero headline `font-size: 48px` (--text-display):** At 375px, 48px display text may overflow or wrap awkwardly if `max-width: 768px` on the container prevents it from being narrower. Consider `clamp(32px, 8vw, 48px)`.
3. **Sticky showcase at 375px:** `grid-template-columns: 1fr` is already set for max-767px, but the step content padding may overflow.
4. **Footer at 375px:** `grid-cols-2 md:grid-cols-4` — two columns at 375px; the brand column is `col-span-2` so it takes full width. Should be fine but verify the badge wraps correctly.
5. **LandingCTA badge + QR flex row:** At 375px this is `flex-col` (correct), at 768px+ it switches to `flex-row` with the QR block visible. No overflow expected but verify.

**Fluid sizing pattern for hero headline (Claude's discretion — recommended):**
```css
/* In global.css, replacing fixed --text-display on hero-headline */
.hero-headline {
  font-size: clamp(32px, 7vw, 48px);
}
```
This avoids overflow at 375px without adding a new breakpoint (consistent with D-05/D-06).

### Pattern 4: Lighthouse >= 95 Strategy

**Current LCP candidate:** The hero device mockup image (`dashboard.png`) — already configured with `loading="eager"` and `fetchpriority="high"` in `Hero.astro`. This is optimal.

**Astro `<Image>` component** auto-generates WebP/AVIF variants and correct `srcset` via Sharp. No changes needed to existing `DeviceFrame.astro` pattern.

**Performance killers to check (in priority order):**

| Issue | How to Detect | Fix |
|-------|--------------|-----|
| LCP image lazy-loaded | Lighthouse "Largest Contentful Paint element" audit | Already set to eager — verify hero badge img also uses `loading="eager"` |
| Render-blocking resources | Lighthouse "Eliminate render-blocking resources" | No external CSS or sync scripts — fonts use `font-display: swap` |
| Unused JavaScript | Lighthouse "Remove unused JavaScript" | Only two Astro islands; all other JS is `is:inline` — minimal JS bundle |
| Layout Shift (CLS) | Lighthouse "Avoid large layout shifts" | Provide explicit `width`/`height` on all `<img>` tags including the new badge |
| Noise texture paint cost | Chrome DevTools Rendering > Paint flashing | `body::after` with `fixed` position and SVG data URL — low CPU cost at opacity 0.025; remove per D-13 if needed |
| Total page weight | Lighthouse "Opportunities" section | App screenshots via Astro `<Image>` auto-compress to WebP — verify in Network panel |

**Local Lighthouse workflow:**
```bash
# 1. Build production output
npm run build

# 2. Start preview server (serves from dist/ on port 4321)
npm run preview

# 3. Run Lighthouse mobile (default throttling = mobile)
npx lighthouse http://localhost:4321 --output=html --output-path=./lh-mobile.html

# 4. Run Lighthouse desktop
npx lighthouse http://localhost:4321 --preset=desktop --output=html --output-path=./lh-desktop.html
```

**Live deployment Lighthouse:**
```bash
npx lighthouse https://tuwa.app --preset=desktop --output=html --output-path=./lh-live-desktop.html
```

**Target scores:** Performance >= 95 (both mobile and desktop), Accessibility >= 90, Best Practices >= 95, SEO >= 95.

### Anti-Patterns to Avoid

- **Adding `@astrojs/cloudflare` adapter:** Static output does not need it. It causes build failures with `output: 'static'` (the Astro default). This project has no SSR.
- **Hotlinking the Apple badge from developer.apple.com CDN:** Download it once and commit to `public/badges/`. Hotlinking creates an external dependency and may violate Apple's ToS.
- **Setting `loading="lazy"` on the hero badge:** The badge is above the fold; lazy loading delays it and can affect CLS.
- **Manually creating a CNAME record before adding the domain in Pages dashboard:** This causes 522 errors. The dashboard flow auto-creates the record.
- **Using `@astrojs/tailwind`:** Deprecated for Tailwind v4. This project already uses `@tailwindcss/vite` — no change needed.
- **Adding new media queries for 375/390/1280/1440:** Decision D-05 locks breakpoints at 479/767/768px. Use `clamp()` or `%` sizing to handle intermediate widths fluently.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| App Store badge artwork | Custom SVG recreation | Official SVG from developer.apple.com | Apple provides the exact asset; custom recreations violate marketing guidelines |
| Image compression | Manual Sharp scripts | Astro `<Image>` component | Already configured in DeviceFrame and all screenshot components |
| Lighthouse audits | Custom metrics collection | `npx lighthouse` CLI or Chrome DevTools | Google's reference implementation; no install needed |
| DNS record creation | Manual CNAME in Cloudflare DNS panel | Cloudflare Pages "Add custom domain" flow | Dashboard auto-creates correct CNAME; manual CNAME causes 522 errors |

---

## Common Pitfalls

### Pitfall 1: Hero badge causes LCP regression
**What goes wrong:** Adding `<img loading="lazy">` for the badge in the hero while the device frame image already claims LCP — if the badge ends up being the LCP element (e.g., at small viewports), lazy-loading it tanks the score.
**Why it happens:** At 375px the hero device frame may be below viewport fold with a badge visible first.
**How to avoid:** Use `loading="eager"` on the hero badge. For all other page CTA badges (LandingCTA, FeatureCTA, Footer) `loading="lazy"` is correct since they are below the fold.
**Warning signs:** Lighthouse reports "LCP image was lazily loaded."

### Pitfall 2: Badge `width`/`height` mismatch causes CLS
**What goes wrong:** The placeholder SVG was 148×44. The official Apple SVG is 119.66×40. If components do not update `width`/`height` HTML attributes, the browser allocates the old dimensions before the SVG loads, then snaps to new dimensions — Cumulative Layout Shift.
**Why it happens:** LandingCTA and FeatureCTA hardcode `height="44" width="148"` on the `<img>` tag.
**How to avoid:** Update both components to `height="40" width="120"` (round the 119.66 to 120 for HTML integer attributes).
**Warning signs:** Lighthouse reports high CLS score.

### Pitfall 3: Cloudflare Pages uses V2 build image (Node 18) if project is old
**What goes wrong:** An existing Pages project created before the V3 rollout stays on V2 (Node 18.17.1). Astro 6 requires Node >= 22. Build fails with version mismatch.
**Why it happens:** V3 is the default for new projects only. Existing projects needed manual migration.
**How to avoid:** The project is NEW (first-time setup in this phase). V3 will be used by default. Set `NODE_VERSION=22` as belt-and-suspenders anyway per D-10.
**Warning signs:** Build logs show `node: v18.x.x` or `Error: Node.js version X.X.X is not supported`.

### Pitfall 4: Wheel container overflows at 375px due to outer padding
**What goes wrong:** The `wheel-container` is 280px at max-479px, but the parent `.section-spaced` uses `px-6` (24px padding each side). On a 375px viewport, content width = 327px. 280px fits, but if a margin or `max-width` constraint on the section pushes total width wider than the viewport, horizontal scroll appears.
**Why it happens:** `overflow-x: auto` is not explicitly set; Tailwind's `overflow` defaults do not clip.
**How to avoid:** Verify `overflow-x: hidden` on `<body>` or the section wrapper; confirm wheel renders within bounds at 375px in DevTools responsive mode.
**Warning signs:** DevTools shows red overflow overlay or horizontal scrollbar at 375px.

### Pitfall 5: Footer badge breaks the footer layout at mobile widths
**What goes wrong:** Footer's brand column is `col-span-2` at mobile. Replacing the text "Get the App" button with a 120×40 badge image inside a `btn-cta` styled anchor (which has green background + padding) makes the badge look wrong — it would be a green-background box containing a black badge.
**Why it happens:** The existing anchor has `class="btn-cta"` which sets `background-color: var(--color-accent)`.
**How to avoid:** Remove `btn-cta` from the Footer badge anchor. The badge SVG provides its own visual chrome (black background, white text). Just use a plain `<a>` with `inline-block` display.
**Warning signs:** Footer download link shows a green rectangle containing a black badge.

### Pitfall 6: Noise texture body::after Lighthouse interaction
**What goes wrong:** The noise texture is a `fixed` position `::after` on `body` using an inline SVG data URL. On mobile Lighthouse (simulated throttling), this pseudo-element triggers a large paint area on every scroll event (because it's `fixed` and full-screen).
**Why it happens:** Paint profiler will show continuous repaints for fixed elements during scroll on mobile.
**How to avoid:** If Lighthouse mobile score < 95, remove the `body::after` rule first per D-13. The site passes without it.
**Warning signs:** Lighthouse reports "Avoid non-composited animations" or Chrome Rendering panel shows green paint flashes on scroll.

---

## Environment Availability

| Dependency | Required By | Available | Version | Fallback |
|------------|------------|-----------|---------|----------|
| Node.js | Build | ✓ | v24.7.0 [VERIFIED: `node --version`] | — |
| npm | Build | ✓ | 11.5.1 [VERIFIED: `npm --version`] | — |
| Astro CLI | Build/Dev | ✓ | 6.3.1 [VERIFIED: package.json] | — |
| `lighthouse` CLI | DEPL-04 | ✗ | — | Use `npx lighthouse` (no install) or Chrome DevTools Lighthouse tab |
| Browser (Chrome/Edge) | Responsive testing + Lighthouse | ✓ | [ASSUMED: macOS dev machine] | — |
| Cloudflare Pages account | DEPL-01 | ✓ | N/A | — (required, no fallback) |
| GitHub repo | DEPL-01 | ✓ | N/A | — |

**Missing dependencies with no fallback:** None that block execution.

**Missing dependencies with fallback:**
- `lighthouse` CLI: not installed globally, but `npx lighthouse <url>` works without install. Fallback: Chrome DevTools > Lighthouse tab for interactive audits.

---

## Code Examples

### Correct badge img tag (after official SVG download)
```astro
<!-- Source: LandingCTA.astro / FeatureCTA.astro update -->
<img
  src="/badges/app-store-badge.svg"
  alt="Download on the App Store"
  height="40"
  width="120"
  loading="lazy"
/>
```
Note: Use `loading="eager"` in Hero only.

### Fluid hero headline (Claude's discretion)
```css
/* src/styles/global.css — replaces fixed var(--text-display) on .hero-headline */
.hero-headline {
  font-size: clamp(32px, 7vw, 48px);
}
```

### Max-width 1440 wrapper (D-07)
```css
/* Ensure no full-bleed section exceeds 1440px without centering */
.page-wrapper {
  max-width: 1440px;
  margin: 0 auto;
}
```
Alternatively, add `max-w-[1440px] mx-auto` to the outermost `<main>` in BaseLayout.astro.

### Lighthouse CLI commands
```bash
# Local (after npm run build && npm run preview)
npx lighthouse http://localhost:4321 \
  --output=html \
  --output-path=./lh-mobile.html \
  --chrome-flags="--headless"

npx lighthouse http://localhost:4321 \
  --preset=desktop \
  --output=html \
  --output-path=./lh-desktop.html \
  --chrome-flags="--headless"

# Live site
npx lighthouse https://tuwa.app --preset=desktop
```

---

## Codebase State Snapshot (relevant to this phase)

The following is verified from reading the actual files, not assumed:

| File | Relevant State |
|------|---------------|
| `public/badges/app-store-badge.svg` | Placeholder custom SVG, 148×44, black rect with handwritten Apple logo path — replace with official |
| `src/components/LandingCTA.astro` | Badge img at `/badges/app-store-badge.svg`, height="44" width="148" — needs dimension update |
| `src/components/FeatureCTA.astro` | Badge img at `/badges/app-store-badge.svg`, height="44" width="148" — needs dimension update |
| `src/components/Footer.astro` | Text "Get the App" btn-cta anchor — NO badge img yet; needs badge replacement |
| `src/components/Hero.astro` | NO badge at all — only device mockup; needs new badge block added |
| `astro.config.mjs` | site="https://tuwa.app", no cloudflare adapter, sitemap + mdx configured |
| `package.json` | engines: node>=22.12.0, scripts: build="astro build", no test script |
| `global.css` | Breakpoints at 479/767/768px; body::after noise texture; wheel 280/360/480px |
| `public/_redirects` | 3 legacy HTML redirects already in place |

[VERIFIED: all files read directly in this research session]

---

## Runtime State Inventory

This is not a rename/refactor phase. No runtime state migration needed.

---

## Validation Architecture

No test framework configured in this project [VERIFIED: package.json has no test script, no jest/vitest/playwright config found].

| Req ID | Behavior | Test Type | Verification Method |
|--------|----------|-----------|---------------------|
| DEPL-01 | Site deploys on push to main | smoke | Manual: push commit, observe Cloudflare Pages build log |
| DEPL-01 | Site accessible at tuwa.app | smoke | Manual: curl https://tuwa.app returns 200 |
| DEPL-02 | Official Apple badge renders in all 4 locations | visual | Manual: load each page, inspect badge src and visual appearance |
| DEPL-03 | No overflow at 375, 390, 768, 1280, 1440px | visual | DevTools responsive mode at each width — look for scrollbar |
| DEPL-04 | Lighthouse Performance >= 95 mobile + desktop | automated | `npx lighthouse` CLI against live URL |

**Wave 0 gaps:** None — this phase has no automated test suite. All verification is manual or via CLI.

---

## Assumptions Log

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|---------------|
| A1 | Cloudflare Pages V3 build image is used for all new projects as of May 2026 | Deployment Setup | If V2 is assigned, build fails on Node 22 — mitigated by explicitly setting NODE_VERSION=22 per D-10 |
| A2 | tuwa.app zone is in the same Cloudflare account as the Pages project will be created | Deployment Setup | If in a different account, auto-CNAME creation won't work; would need manual DNS |
| A3 | Developer machine has Chrome/Chromium available for `npx lighthouse` | Environment Availability | Without a browser, lighthouse CLI won't run; fallback is PageSpeed Insights online |

---

## Open Questions

1. **Does tuwa.app currently resolve to anything?**
   - What we know: DNS is on Cloudflare; the site hasn't been deployed to Pages yet
   - What's unclear: Is there an existing A/CNAME record for the apex domain pointing elsewhere?
   - Recommendation: Check Cloudflare DNS panel before adding Pages custom domain. If an A record exists, it may conflict with the Pages CNAME at apex. Cloudflare handles apex CNAME flattening automatically, but existing A records should be removed first.

2. **Which Pages project subdomain will be assigned?**
   - What we know: Cloudflare assigns a subdomain like `tuwa-website.pages.dev`
   - What's unclear: The exact subdomain is chosen at project creation time
   - Recommendation: Not blocking; note the assigned subdomain for the Lighthouse live-URL test.

3. **Are there any Lighthouse performance issues introduced by the Phase 08 visual changes?**
   - What we know: Noise texture is a known candidate (D-13); hero device image uses eager loading
   - What's unclear: Whether the Phase 08 animated counters (StatsCounter) or the Phase 08.1 wheel JS create TBT (Total Blocking Time) issues
   - Recommendation: Run Lighthouse first before any fixes to establish a baseline — fix only what fails.

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Cloudflare Pages V2 build (Node 18 default) | V3 build image (Node 22 default) | May 2025 changelog | New projects get Node 22 automatically; NODE_VERSION env var still recommended as explicit override |
| `@astrojs/tailwind` integration | `@tailwindcss/vite` plugin | Tailwind v4 release (early 2025) | This project already uses the correct approach |
| Lighthouse install required | `npx lighthouse` works without install | npm npx era | No global install needed |

---

## Sources

### Primary (HIGH confidence)
- `public/badges/app-store-badge.svg` — read directly; confirmed placeholder
- `src/components/Hero.astro`, `LandingCTA.astro`, `FeatureCTA.astro`, `Footer.astro` — read directly; confirmed badge state
- `src/styles/global.css` — read directly; confirmed breakpoints and noise texture
- `package.json` — read directly; confirmed Node engine requirement and script names
- `astro.config.mjs` — read directly; confirmed no cloudflare adapter, site URL set
- WebFetch: https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg — confirmed valid SVG, dimensions 119.66×40
- WebFetch: https://developers.cloudflare.com/pages/configuration/build-image/ — confirmed V3 default Node 22.16.0
- WebFetch: https://developers.cloudflare.com/pages/configuration/custom-domains/ — confirmed auto-CNAME for same-account zones

### Secondary (MEDIUM confidence)
- WebSearch: Cloudflare Pages V3 changelog confirming Node 22 as new default (2025-05-30)
- WebFetch: https://developers.cloudflare.com/pages/framework-guides/deploy-an-astro-site/ — build command and output dir

### Tertiary (LOW confidence)
- WebSearch: Noise texture `body::after` Lighthouse impact — no direct measurement data found; classified as potential issue based on paint behavior of `fixed` pseudo-elements

---

## Metadata

**Confidence breakdown:**
- Deployment setup: HIGH — official Cloudflare Pages docs verified, V3 build image confirmed
- App Store badge: HIGH — official Apple CDN URL verified, dimensions confirmed
- Responsive audit: MEDIUM — breakpoints confirmed from code, but actual overflow issues require testing to discover
- Lighthouse performance: MEDIUM — hero image already correctly configured; specific score unknown until run

**Research date:** 2026-05-14
**Valid until:** 2026-06-14 (Cloudflare Pages configuration docs are stable; Apple badge URL is long-lived)
