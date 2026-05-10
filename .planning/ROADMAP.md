# Roadmap: Tuwa Marketing Website

## Overview

Four phases deliver a fully deployed, conversion-optimized marketing site for the Tuwa iOS app. The foundation establishes the Astro scaffold, design system, and base layout. The landing page validates design direction and serves as the primary download conversion surface. Content pages (5 feature deep-dives and 3 legal/support pages) complete the site's full scope. Blog infrastructure and performance polish bring the site to production quality with Lighthouse >= 95 and crawlable SEO fundamentals.

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [x] **Phase 1: Foundation** - Astro scaffold, design system, base layout, and Cloudflare Pages deployment (completed 2026-05-10)
- [ ] **Phase 2: Landing Page** - Hero, feature grid, animations, and App Store CTAs
- [ ] **Phase 3: Content Pages** - Feature deep-dives (5 pages) and legal/support pages (3 pages)
- [ ] **Phase 4: Blog + Polish** - Blog infrastructure, performance audit, and SEO completeness

## Phase Details

### Phase 1: Foundation
**Goal**: A deployed, functional Astro site with design system and base layout ready for content pages
**Depends on**: Nothing (first phase)
**Requirements**: FOUND-01, FOUND-02, FOUND-03, FOUND-05, FOUND-06, FOUND-07
**Success Criteria** (what must be TRUE):
  1. Site builds with Astro 6 + Tailwind v4 and deploys to Cloudflare Pages at tuwa.app with no errors
  2. Alpino font loads on first visit with no flash of unstyled text and no Cumulative Layout Shift
  3. Responsive navigation header works on mobile (hamburger menu) and desktop, with footer visible on every page
  4. Pages built on the base layout have correct title, description, OG tags, and canonical URL in their HTML source
**Plans:** 3/3 plans complete

Plans:
- [x] 01-01-PLAN.md — Install deps, configure Astro + Tailwind + Fonts API, create design token system
- [x] 01-02-PLAN.md — Create SEO, Header, MobileMenu, and Footer components
- [x] 01-03-PLAN.md — Create BaseLayout, wire index page, visual verification checkpoint

**UI hint**: yes

### Phase 2: Landing Page
**Goal**: Visitors can understand what Tuwa is, see the app, and tap or scan to download it from the App Store
**Depends on**: Phase 1
**Requirements**: LAND-01, LAND-02, LAND-03, LAND-04, LAND-05
**Success Criteria** (what must be TRUE):
  1. Hero section shows an outcome-led headline, an app screenshot in a device mockup, and a working App Store download badge
  2. Feature overview grid shows 5 cards that each link to the corresponding feature deep-dive page
  3. Sections fade in on scroll using CSS + IntersectionObserver (no JS framework)
  4. Desktop visitors see a QR code or "Available on iPhone" message as an alternative to the App Store badge
  5. Page renders correctly at mobile, tablet, and desktop breakpoints
**Plans**: 2 plans

Plans:
- [x] 02-01-PLAN.md -- Setup assets, config, scroll CSS, and Hero component
- [ ] 02-02-PLAN.md -- FeatureGrid, LandingCTA, wire index.astro, visual checkpoint
**UI hint**: yes

### Phase 3: Content Pages
**Goal**: Athletes and coaches can read science-backed explanations of every Tuwa feature, and all legal/support pages are live and accessible
**Depends on**: Phase 2
**Requirements**: FEAT-01, FEAT-02, FEAT-03, FEAT-04, FEAT-05, FEAT-06, FEAT-07, FEAT-08, LEGAL-01, LEGAL-02, LEGAL-03, LEGAL-04
**Success Criteria** (what must be TRUE):
  1. All 5 feature pages (recovery scoring, workload tracking, smart templates, cold-start onboarding, coaching) are live with accessible-credible copy and a contextual App Store CTA
  2. Each feature page has its own unique OG meta tags and app screenshot
  3. Privacy Policy, Terms of Service, and Support pages are live and match the migrated content from existing source files
  4. Old GitHub Pages URLs redirect to the correct new routes without 404 errors
  5. All feature pages share the same reusable layout component (hero, explanation, screenshot, CTA)
**Plans**: TBD
**UI hint**: yes

### Phase 4: Blog + Polish
**Goal**: The site is crawlable, scores >= 95 on Lighthouse, and blog infrastructure is ready for future posts
**Depends on**: Phase 3
**Requirements**: BLOG-01, BLOG-02, BLOG-03, BLOG-04, PERF-01, PERF-02, PERF-03, PERF-04, PERF-05
**Success Criteria** (what must be TRUE):
  1. Blog listing page and individual post layout exist and render correctly with zero initial posts
  2. Landing page Lighthouse performance score is >= 95 on mobile and desktop
  3. XML sitemap is generated at build time and accessible at /sitemap.xml
  4. robots.txt allows crawling and is accessible at /robots.txt
  5. All pages use semantic HTML with proper heading hierarchy, landmarks, and alt text on images
**Plans**: TBD

## Progress

**Execution Order:**
Phases execute in numeric order: 1 → 2 → 3 → 4

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Foundation | 3/3 | Complete   | 2026-05-10 |
| 2. Landing Page | 0/TBD | Not started | - |
| 3. Content Pages | 0/TBD | Not started | - |
| 4. Blog + Polish | 0/TBD | Not started | - |
