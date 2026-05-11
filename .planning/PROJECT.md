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

- [ ] Competitor/inspiration research (fitness apps + broader category marketing sites)
- [ ] Whole-site UI/UX refinement pass (spacing, layout, typography, color, experience)
- [~] Animation polish (scroll reveals, transitions, entrance effects) — Phase 5 complete: animation infrastructure consolidated, Phase 7 pending for polish
- [ ] Screenshot presentation overhaul (fix blurry desktop, iPhone device frames, possibly generated)
- [ ] App Store download badge (replace placeholder SVG with official Apple asset)
- [ ] Cloudflare Pages deployment (connect GitHub repo, configure build)
- [ ] Responsive design refinement (test all breakpoints on real devices)

### Out of Scope

- User accounts or authentication on the website — app handles this
- App Store review / rating widgets — keep it clean
- Pricing page — subscription info lives in-app
- Analytics dashboard or admin panel
- Internationalization / multi-language — English only for v1
- E-commerce or merchandise
- Dark mode — Descoped (light mode only)

## Current Milestone: v2.0 Visual Overhaul & Polish

**Goal:** Elevate the site from functional MVP to polished, professional marketing presence informed by competitor research.

**Target features:**
- Competitor/inspiration website research (fitness + broader category)
- Whole-site UI/UX refinement pass
- Animation polish (scroll reveals, transitions, entrance effects)
- Screenshot presentation overhaul (HD, device frames, possibly generated)
- App Store badge (official Apple asset)
- Cloudflare Pages deployment
- Responsive design refinement

## Context

**Current state (v1.0 shipped 2026-05-11):**
- 2,399 LOC across Astro/CSS/TS/JS
- 10 pages built, all with unique OG images
- General Sans font (switched from Alpino during Phase 4)
- Blog ready for posts (MDX collection, empty state, reading time plugin)
- Cloudflare 301 redirects configured for old GitHub Pages URLs

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

## Evolution

This document evolves at phase transitions and milestone boundaries.

---
*Last updated: 2026-05-11 after Phase 5 (Animation Infrastructure) complete*
