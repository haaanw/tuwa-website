# Tuwa Marketing Website

## What This Is

Marketing website for Tuwa — a precision training load and recovery management app for serious athletes and coaches. The site lives at tuwa.app, built with Astro 6 + Tailwind v4 + MDX on Cloudflare Pages. 10 pages: landing, 5 feature deep-dives, blog listing, privacy, terms, support. Communicates scientific credibility without jargon walls, driving App Store downloads.

## Core Value

Convince serious athletes that Tuwa is the evidence-based workload management tool they've been missing — not another generic fitness tracker.

## Requirements

### Validated

- ✓ Astro 6 + Tailwind v4 foundation with design tokens — v1.0
- ✓ SEO component, Header, Footer, BaseLayout — v1.0
- ✓ Landing page with hero, feature overview, and App Store CTA — v1.0
- ✓ 5 feature deep-dive pages (recovery scoring, workload tracking, smart templates, cold-start, coaching) — v1.0
- ✓ Support, Privacy, Terms pages migrated from existing source — v1.0
- ✓ Blog infrastructure (MDX content collection, listing page, post layout, reading time) — v1.0
- ✓ SEO fundamentals (meta tags, OG images, semantic HTML, robots.txt, sitemap) — v1.0
- ✓ Lighthouse performance >= 95 — v1.0
- ✓ General Sans font via Astro Font API — v1.0

### Active

- [ ] Typography weight system — titles: large/light, body: smaller/heavier (General Sans recalibration)
- [ ] iPhone frame realism — realistic bezels, notch, buttons; fix screenshot fit (extra border/text misalignment)
- [ ] Remove QR code + adjacent App Store badge section (keep header, hero, footer CTAs)
- [ ] Matisse Swimming Pool art direction — organic cut-out shapes as continuous frieze (条带), hero-focused
- [ ] Interaction polish — smooth transitions, scroll feel, navigation flow (contralabs.com reference)

### Validated (v2.0)

- ✓ Screenshot presentation overhaul (3x Retina, CSS iPhone device frames) — Phase 6
- ✓ Animation polish (stagger, hero choreography, sticky scroll) — Phase 7
- ✓ UI/UX visual depth (spacing, micro-interactions, noise texture, bento grid) — Phase 8
- ✓ FeatureGrid click wheel (iPod-style arc layout) — Phase 8.1
- ✓ App Store download badge (official Apple SVG) — Phase 9
- ✓ Cloudflare Pages deployment (GitHub integration, auto-deploy) — Phase 9
- ✓ Responsive design (fluid, 5 breakpoints verified, 1440px cap) — Phase 9
- ✓ Lighthouse >= 95 (Mobile 98, Desktop 99 on live tuwa.app) — Phase 9
- ✓ Dead CSS cleanup + wheel arc stagger animation (ANIM-03, UIPX-05) — Phase 10

### Out of Scope

- User accounts or authentication on the website — app handles this
- App Store review / rating widgets — keep it clean
- Pricing page — subscription info lives in-app
- Analytics dashboard or admin panel
- Internationalization / multi-language — English only for v1
- E-commerce or merchandise
- Dark mode — Descoped (light mode only)

## Current Milestone: v3.0 Art Direction & Interaction Polish

**Goal:** Transform site visual identity with Matisse-inspired art direction, refined typography system, and premium interaction feel.

**Target features:**
- Typography weight system (titles: large/light, body: smaller/heavier)
- iPhone frame realism + screenshot fit fix
- Remove QR + adjacent App Store badge section
- Matisse Swimming Pool cut-out art direction (hero-focused frieze)
- Interaction polish (contralabs.com-inspired flow)

## Current State

**Shipped:** v2.0 Visual Overhaul & Polish (2026-05-14)
**Live at:** tuwa.app (Cloudflare Pages, auto-deploy from main)
**Lighthouse:** Mobile 98, Desktop 99

Site is a polished marketing presence with CSS device frames, choreographed animations, iPod click wheel feature overview, sticky scroll showcase, and animated stat counters. All 10 pages responsive across 5 breakpoints.

## Context

**Current state (v2.0 shipped 2026-05-14):**
- ~20,000 LOC across Astro/CSS/TS/JS (94 files changed since v1.0)
- 10 pages live at tuwa.app, all with unique OG images
- General Sans font via Astro Font API
- CSS iPhone 15 Pro device frames on all feature pages + hero
- iPod-style SVG click wheel for feature overview
- Choreographed animations: hero entrance, stagger delays, sticky scroll showcase
- Animated stat counters, noise texture, micro-interactions
- Blog ready for posts (MDX collection, empty state, reading time plugin)
- Cloudflare Pages auto-deploy from GitHub main branch
- Lighthouse Mobile 98, Desktop 99

**The app (Tuwa):**
- iOS native (SwiftUI + SwiftData + HealthKit), live on App Store
- Features: EWMA-based ACWR monitoring, recovery scoring, coach-athlete sync, prescribed workouts
- Subscription tiers: Free, Athlete Pro, Coach (via RevenueCat)
- Backend: Supabase (AWS)

**Copy tone:** Accessible-credible — plain language backed by science.

**Developer:** Hanwen Ma (hanwenma09@gmail.com)

## Constraints

- **Stack**: Astro 6 + Tailwind CSS v4 + MDX, deployed to Cloudflare Pages
- **Domain**: tuwa.app
- **Font**: General Sans (via Astro Font API, loaded from Fontshare CDN)
- **Performance**: Static site, no client-side JS frameworks beyond Astro islands
- **Design fidelity**: Website feels related to the app but not pixel-identical

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| General Sans over Alpino | Font switched in Phase 4 per design direction D-07 | ✓ Good — clean, modern feel |
| Astro Font API (CDN) over self-hosted | Astro 6 Font API handles preloading, hashing, fallbacks automatically | ✓ Good — zero FOUT |
| Inspired-but-looser design | Web needs larger imagery, scroll animations, broader color range than iOS | ✓ Good |
| Accessible-credible copy tone | Scientific credibility without jargon walls | ✓ Good |
| MDX for blog | Future posts with embedded components/charts without separate CMS | ✓ Good |
| No @astrojs/cloudflare adapter | Pure static output, adapter causes deployment failures with static mode | ✓ Good |
| Chart.js for data visualizations | Lightweight, familiar, works in Astro islands | ✓ Good |
| CSS device frames over baked-in PNG frames | Reusable, responsive, consistent aspect ratio | ✓ Good |
| CSS-only animations over motion library | Zero bundle cost, sufficient for all use cases | ✓ Good |
| iPod click wheel over bento grid | Distinctive, interactive, on-brand differentiation | ✓ Good |
| No Cloudflare adapter for static site | Pure static output avoids adapter deployment failures | ✓ Good |

## Evolution

This document evolves at phase transitions and milestone boundaries.

---
*Last updated: 2026-05-14 after v3.0 milestone started*
