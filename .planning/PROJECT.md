# Tuwa Marketing Website

## What This Is

Marketing website for Tuwa — a precision training load and recovery management app for serious athletes and coaches. The site lives at tuwa.app, built with Astro + Tailwind + MDX on Cloudflare Pages. It communicates scientific credibility without jargon walls, driving App Store downloads.

## Core Value

Convince serious athletes that Tuwa is the evidence-based workload management tool they've been missing — not another generic fitness tracker.

## Requirements

### Validated

- [x] Landing page with hero, feature overview, and App Store CTA — Validated in Phase 2: Landing Page
- [x] 5 feature deep-dive pages (recovery scoring, workload tracking, smart templates, cold-start onboarding, coaching) — Validated in Phase 3: Content Pages
- [x] Support page (migrated from existing HTML) — Validated in Phase 3: Content Pages
- [x] Privacy policy page (migrated from existing HTML/MD) — Validated in Phase 3: Content Pages
- [x] Terms of service page (migrated from existing HTML/MD) — Validated in Phase 3: Content Pages

### Active
- [ ] Blog infrastructure (MDX-ready, no initial posts required)
- [ ] Responsive design (mobile-first, works on all breakpoints)
- ~~Dark/light mode~~ — Descoped (light mode only)
- [ ] App Store download badge as primary CTA
- [ ] SEO fundamentals (meta tags, OG images, semantic HTML)
- [ ] Cloudflare Pages deployment configuration

### Out of Scope

- User accounts or authentication on the website — app handles this
- App Store review / rating widgets — keep it clean
- Pricing page — subscription info lives in-app
- Analytics dashboard or admin panel
- Internationalization / multi-language — English only for v1
- E-commerce or merchandise

## Context

**The app (Tuwa):**
- iOS native (SwiftUI + SwiftData + HealthKit), live on App Store
- Features: EWMA-based ACWR monitoring, recovery scoring (HRV/RHR/sleep/wellness), coach-athlete sync, prescribed workouts, autoregulation recommendations
- Subscription tiers: Free, Athlete Pro, Coach (via RevenueCat)
- Backend: Supabase (AWS)
- Competitors: Whoop, Garmin Connect, TrainingPeaks, Strava

**Design direction:**
- Inspired by the app's International Style Minimalism but looser for web
- Alpino font (from Fontshare — free commercial license) replacing DM Sans
- Warm travertine palette carried over but expanded for web CTAs/accents
- Open to: subtle scroll animations, full-bleed device mockups, broader color range
- App screenshots available for hero and feature pages

**Existing assets:**
- Legal pages (privacy, terms, support) exist as HTML in ~/Desktop/Tonus/docs/
- App Store metadata and description in ~/Desktop/Tonus/AppStoreMetadata.md
- Full design system spec in ~/Desktop/Tonus/DESIGN.md (color tokens, spacing, typography)
- Privacy policy markdown in ~/Desktop/Tonus/PRIVACY.md
- Terms markdown in ~/Desktop/Tonus/TERMS.md

**Copy tone:** Accessible-credible — plain language backed by science. Explain why it matters, cite methodology without jargon walls. Not clinical, not casual.

**Developer:** Hanwen Ma (hanwenma09@gmail.com)

## Constraints

- **Stack**: Astro + Tailwind CSS + MDX, deployed to Cloudflare Pages
- **Domain**: tuwa.app
- **Font**: Alpino (self-hosted from Fontshare files)
- **Performance**: Static site, no client-side JS frameworks needed beyond Astro islands
- **Design fidelity**: Website should feel related to the app but not pixel-identical — web-native flourishes are welcome

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Alpino over DM Sans for web | User preference — wants to switch app font to Alpino too, website goes first | — Pending |
| Inspired-but-looser design | Web needs larger imagery, scroll animations, broader color range than iOS constraints allow | — Pending |
| Accessible-credible copy tone | Scientific credibility without jargon walls — balances trust and approachability | — Pending |
| App Store link as primary CTA | App is live — direct download conversion, not waitlist | — Pending |
| MDX for blog | Future blog posts with embedded components/charts — MDX gives flexibility without separate CMS | — Pending |

## Evolution

This document evolves at phase transitions and milestone boundaries.

**After each phase transition** (via `/gsd-transition`):
1. Requirements invalidated? -> Move to Out of Scope with reason
2. Requirements validated? -> Move to Validated with phase reference
3. New requirements emerged? -> Add to Active
4. Decisions to log? -> Add to Key Decisions
5. "What This Is" still accurate? -> Update if drifted

**After each milestone** (via `/gsd-complete-milestone`):
1. Full review of all sections
2. Core Value check — still the right priority?
3. Audit Out of Scope — reasons still valid?
4. Update Context with current state

---
*Last updated: 2026-05-10 after initialization*
