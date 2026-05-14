# Roadmap: Tuwa Marketing Website

## Milestones

- ✅ **v1.0 MVP** — Phases 1-4 (shipped 2026-05-11)
- 🔄 **v2.0 Visual Overhaul & Polish** — Phases 5-9 (current)

## Phases

<details>
<summary>✅ v1.0 MVP (Phases 1-4) — SHIPPED 2026-05-11</summary>

- [x] Phase 1: Foundation (3/3 plans) — completed 2026-05-10
- [x] Phase 2: Landing Page (2/2 plans) — completed 2026-05-10
- [x] Phase 3: Content Pages (4/4 plans) — completed 2026-05-11
- [x] Phase 4: Blog + Polish (3/3 plans) — completed 2026-05-11

</details>

### v2.0 Visual Overhaul & Polish

- [ ] **Phase 5: Animation Infrastructure** — Fix the duplicated IntersectionObserver bug and establish a single reliable animation system with accessibility guards
- [x] **Phase 6: Screenshot Presentation** — Re-export all screenshots at 3x and build the CSS iPhone device frame component that all visual work depends on (completed 2026-05-11)
- [x] **Phase 7: Animation Polish** — Layer stagger timing, hero entrance choreography, and animated counters on the now-stable animation system (completed 2026-05-12)
- [x] **Phase 8: UI/UX Visual Depth** — Apply spacing/typography consistency, hover micro-interactions, noise texture, glass morphism, and bento grid layout (completed 2026-05-13)
- [ ] **Phase 9: Deployment & Responsive** — Configure Cloudflare Pages, replace App Store badge, test all breakpoints, verify Lighthouse >= 95

## Phase Details

### Phase 5: Animation Infrastructure
**Goal**: The site has a single, reliable animation system that works correctly on every page and respects user accessibility preferences
**Depends on**: Nothing (prerequisite for all animation work)
**Requirements**: ANIM-01, ANIM-02
**Success Criteria** (what must be TRUE):
  1. Pages that include both FeatureCTA and LandingCTA trigger each animated element exactly once — no double-fire, no race condition
  2. A user with `prefers-reduced-motion: reduce` set in their OS sees zero motion on the site
  3. Users with JavaScript disabled still see all page content (no invisible elements from animation CSS classes applied in base styles)
  4. The AnimationController is injected once by BaseLayout and does not appear as duplicate script tags in page source
**Plans:** 1 plan
Plans:
- [x] 05-01-PLAN.md — CSS animation refactor + AnimationController consolidation

### Phase 6: Screenshot Presentation
**Goal**: Every app screenshot on the site is crisp, Retina-ready, and displayed inside a professional CSS iPhone device frame
**Depends on**: Phase 5
**Requirements**: SHOT-01, SHOT-02, SHOT-03, SHOT-04, SHOT-05
**Success Criteria** (what must be TRUE):
  1. Screenshots on all 5 feature pages appear sharp on a Retina display — no visible blur or pixellation at 2x DPR
  2. All feature page screenshots render inside a CSS iPhone bezel (no naked screenshot exports visible)
  3. The hero section displays a polished mockup image (Screenhance-generated or equivalent) inside a device frame
  4. The Astro Image component is used throughout with correct `widths` prop — browser DevTools shows WebP/AVIF variants in network requests
  5. The hero device frame has `loading="eager" fetchpriority="high"` — Lighthouse LCP element is not lazy-loaded
**Plans:** 2/2 plans complete
Plans:
- [x] 06-01-PLAN.md — Build CSS-only DeviceFrame.astro component + side button CSS
- [x] 06-02-PLAN.md — Swap ScreenshotBlock to DeviceFrame across layouts + Hero perspective tilt
**UI hint**: yes

### Phase 7: Animation Polish
**Goal**: Scroll-reveal animations are choreographed and staggered across the site, giving the landing page and feature pages a premium, sequenced feel
**Depends on**: Phase 5, Phase 6
**Requirements**: ANIM-03, ANIM-04, ANIM-05
**Success Criteria** (what must be TRUE):
  1. Feature card grids and feature lists on the landing page animate in with visible stagger delay between cards (each card enters slightly after the previous)
  2. The hero section has a sequenced entrance: device mockup and headline/subtext animate in as a coordinated sequence, not simultaneously
  3. At least one feature deep-dive page has a sticky scroll showcase where content updates as the user scrolls through the section
  4. No animation uses margin, height, or top/left properties — DevTools Performance tab shows zero CLS from animation
**Plans:** 2/2 plans complete
Plans:
- [x] 07-01-PLAN.md — Stagger delays on FeatureGrid cards + hero entrance choreography
- [x] 07-02-PLAN.md — Sticky scroll showcase on Recovery Scoring page
**UI hint**: yes

### Phase 8: UI/UX Visual Depth
**Goal**: The site matches the visual quality of premium fitness brand marketing sites — consistent spacing, depth through texture and gradients, and responsive micro-interactions on every interactive element
**Depends on**: Phase 7
**Requirements**: UIPX-01, UIPX-02, UIPX-03, UIPX-04, UIPX-05, UIPX-06
**Success Criteria** (what must be TRUE):
  1. Section spacing is consistent across all pages — desktop gaps are 120-160px, mobile gaps are 64-80px, with no outlier sections
  2. Every button and CTA shows a scale micro-interaction on hover (scale up) and active (scale down) — verified on both desktop hover and mobile tap
  3. Feature cards and blog listing cards lift visibly on hover
  4. The hero and at least one key section have a noise texture or gradient accent that distinguishes the site from a default Tailwind template
  5. The feature overview section uses a bento grid layout (not a uniform 3-column card grid)
  6. At least two key metrics are displayed as animated counters that count up when scrolled into view
**Plans:** 4 plans
Plans:
- [x] 08-01-PLAN.md — CSS foundation (tokens, noise texture, bento grid, hover classes) + FeatureGrid bento restructure
- [x] 08-02-PLAN.md — Spacing + micro-interaction classes on Hero, LandingCTA, FeatureCTA, Header, Footer
- [x] 08-03-PLAN.md — StatsCounter animated counters + blog listing hover lift
- [x] 08-04-PLAN.md — Gap closure: apply .section-spaced to feature pages and blog listing
**UI hint**: yes

### Phase 08.1: FeatureGrid Click Wheel (INSERTED)

**Goal:** The feature overview section on the landing page uses an iPod-style circular click wheel instead of a bento grid, with drag-to-rotate, click-to-select, keyboard navigation, and momentum physics
**Requirements**: D-01 through D-10 (from 08.1-CONTEXT.md)
**Depends on:** Phase 8
**Plans:** 1/1 plans complete

Plans:
- [x] 08.1-01-PLAN.md — SVG click wheel structure + CSS + WheelController interaction script + visual verification

### Phase 9: Deployment & Responsive
**Goal**: The site is live on tuwa.app via Cloudflare Pages, passes Lighthouse >= 95 on mobile and desktop, and renders correctly across all target breakpoints
**Depends on**: Phase 8
**Requirements**: DEPL-01, DEPL-02, DEPL-03, DEPL-04
**Success Criteria** (what must be TRUE):
  1. Pushing to the main branch automatically triggers a Cloudflare Pages build and the site is accessible at tuwa.app within minutes
  2. The App Store badge in the hero and CTAs is the official Apple asset — no placeholder SVG
  3. The site renders correctly at 375px, 390px, 768px, 1280px, and 1440px viewport widths — no overflow, no broken layouts
  4. Lighthouse Performance score is >= 95 on both mobile and desktop after all v2.0 visual changes are applied
**Plans:** 2 plans
Plans:
- [ ] 09-01-PLAN.md — Official Apple badge replacement + responsive CSS fixes (fluid headline, 1440px cap, overflow guard)
- [ ] 09-02-PLAN.md — Cloudflare Pages deployment + Lighthouse verification + responsive visual check

## Progress

| Phase | Milestone | Plans Complete | Status | Completed |
|-------|-----------|----------------|--------|-----------|
| 1. Foundation | v1.0 | 3/3 | Complete | 2026-05-10 |
| 2. Landing Page | v1.0 | 2/2 | Complete | 2026-05-10 |
| 3. Content Pages | v1.0 | 4/4 | Complete | 2026-05-11 |
| 4. Blog + Polish | v1.0 | 3/3 | Complete | 2026-05-11 |
| 5. Animation Infrastructure | v2.0 | 0/1 | Not started | - |
| 6. Screenshot Presentation | v2.0 | 2/2 | Complete   | 2026-05-11 |
| 7. Animation Polish | v2.0 | 2/2 | Complete   | 2026-05-12 |
| 8. UI/UX Visual Depth | v2.0 | 3/4 | Gap closure | - |
| 8.1 FeatureGrid Click Wheel | v2.0 | 0/1 | Planned | - |
| 9. Deployment & Responsive | v2.0 | 0/2 | Planned | - |
