# Requirements: Tuwa Marketing Website

**Defined:** 2026-05-10
**Core Value:** Convince serious athletes that Tuwa is the evidence-based workload management tool they've been missing

## v1 Requirements

Requirements for initial release. Each maps to roadmap phases.

### Foundation

- [x] **FOUND-01**: Site builds with Astro 6 + Tailwind v4 and deploys to Cloudflare Pages at tuwa.app
- [x] **FOUND-02**: Alpino font self-hosted with preload hints, no FOUT or CLS regression
- [x] **FOUND-03**: Design token system (colors, spacing, typography) in Tailwind config matching app palette with web-appropriate extensions
- [ ] ~~**FOUND-04**: Dark/light mode~~ — **Descoped** (D-06: light mode only, no dark mode needed)
- [x] **FOUND-05**: Base layout with SEO meta component (title, description, OG tags, canonical URL)
- [x] **FOUND-06**: Responsive navigation header with mobile menu
- [x] **FOUND-07**: Footer with nav links, legal links, and App Store badge

### Landing Page

- [x] **LAND-01**: Hero section with outcome-led headline, app screenshot in device mockup, and App Store download badge
- [ ] **LAND-02**: Feature overview grid with 5 cards linking to deep-dive pages
- [x] **LAND-03**: Scroll-triggered fade-in animations on sections (CSS + IntersectionObserver, no JS framework)
- [ ] **LAND-04**: Final CTA section with App Store badge and reinforcing copy
- [x] **LAND-05**: Desktop-aware App Store CTA (QR code or "Available on iPhone" messaging for non-mobile visitors)

### Feature Deep-Dives

- [ ] **FEAT-01**: Recovery Scoring page — HRV + RHR + sleep + wellness synthesized into single readiness score with plain-language explanations
- [ ] **FEAT-02**: Workload Tracking page — EWMA-based ACWR monitoring, session spike detection, personal record tracking
- [ ] **FEAT-03**: Smart Templates page — prescribed workouts with named exercise groups, target sets, weight/rep goals
- [ ] **FEAT-04**: Cold-Start Onboarding page — how Tuwa bootstraps from zero data, manages baseline expectations honestly
- [ ] **FEAT-05**: Coaching page — coach-athlete sync, real-time recovery visibility, prescribed workouts, invite via code/email/NFC
- [x] **FEAT-06**: Each feature page has unique OG meta tags and screenshot
- [x] **FEAT-07**: Consistent feature page layout component (hero, explanation, screenshot, CTA)
- [ ] **FEAT-08**: Copy tone is accessible-credible — plain language backed by science, no jargon walls

### Legal & Support

- [x] **LEGAL-01**: Privacy Policy page migrated from existing markdown (reference Bevel style for layout quality)
- [x] **LEGAL-02**: Terms of Service page migrated from existing markdown
- [x] **LEGAL-03**: Support page with FAQ and contact info
- [ ] **LEGAL-04**: URL redirects from old GitHub Pages URLs if applicable

### Blog Infrastructure

- [ ] **BLOG-01**: MDX content collection with Zod schema (title, date, description, tags, draft flag)
- [ ] **BLOG-02**: Blog listing page with post cards
- [ ] **BLOG-03**: Individual blog post layout with reading time, date, back navigation
- [ ] **BLOG-04**: No initial posts required — infrastructure only

### Performance & SEO

- [ ] **PERF-01**: Lighthouse performance score >= 95 on landing page
- [ ] **PERF-02**: Semantic HTML throughout (proper heading hierarchy, landmarks, alt text)
- [ ] **PERF-03**: XML sitemap generated at build time
- [ ] **PERF-04**: robots.txt configured for crawling
- [ ] **PERF-05**: Proper canonical URLs on all pages

## v2 Requirements

Deferred to future release. Tracked but not in current roadmap.

### Social Proof

- **SOCIAL-01**: Testimonial section with real user quotes
- **SOCIAL-02**: Outcome statistics callouts (requires validated data from app usage)

### Enhanced SEO

- **SEO-01**: Dynamic OG images generated per page at build time (satori)
- **SEO-02**: Structured data / JSON-LD (SoftwareApplication schema)

### Content

- **CONTENT-01**: Initial blog posts for launch
- **CONTENT-02**: Comparison pages (Tuwa vs Whoop, etc.)

## Out of Scope

| Feature | Reason |
|---------|--------|
| Pricing page | Subscriptions managed in-app via Apple, not on web |
| User accounts / auth on website | App handles authentication |
| Analytics dashboard | Not relevant to marketing site |
| Internationalization | English only for v1 |
| E-commerce / merch | Not part of core product |
| Server-side rendering | Static site sufficient, no adapter needed |
| GSAP or heavy animation library | Native CSS + IntersectionObserver sufficient for subtle animations |
| `@astrojs/cloudflare` adapter | Causes deployment failures with static output |

## Traceability

Updated during roadmap creation.

| Requirement | Phase | Status |
|-------------|-------|--------|
| FOUND-01 | Phase 1 | Complete |
| FOUND-02 | Phase 1 | Complete |
| FOUND-03 | Phase 1 | Complete |
| FOUND-04 | — | Descoped |
| FOUND-05 | Phase 1 | Complete |
| FOUND-06 | Phase 1 | Complete |
| FOUND-07 | Phase 1 | Complete |
| LAND-01 | Phase 2 | Complete |
| LAND-02 | Phase 2 | Pending |
| LAND-03 | Phase 2 | Complete |
| LAND-04 | Phase 2 | Pending |
| LAND-05 | Phase 2 | Complete |
| FEAT-01 | Phase 3 | Pending |
| FEAT-02 | Phase 3 | Pending |
| FEAT-03 | Phase 3 | Pending |
| FEAT-04 | Phase 3 | Pending |
| FEAT-05 | Phase 3 | Pending |
| FEAT-06 | Phase 3 | Complete |
| FEAT-07 | Phase 3 | Complete |
| FEAT-08 | Phase 3 | Pending |
| LEGAL-01 | Phase 3 | Complete |
| LEGAL-02 | Phase 3 | Complete |
| LEGAL-03 | Phase 3 | Complete |
| LEGAL-04 | Phase 3 | Pending |
| BLOG-01 | Phase 4 | Pending |
| BLOG-02 | Phase 4 | Pending |
| BLOG-03 | Phase 4 | Pending |
| BLOG-04 | Phase 4 | Pending |
| PERF-01 | Phase 4 | Pending |
| PERF-02 | Phase 4 | Pending |
| PERF-03 | Phase 4 | Pending |
| PERF-04 | Phase 4 | Pending |
| PERF-05 | Phase 4 | Pending |

**Coverage:**
- v1 requirements: 25 total
- Mapped to phases: 25
- Unmapped: 0

---
*Requirements defined: 2026-05-10*
*Last updated: 2026-05-10 after roadmap creation*
