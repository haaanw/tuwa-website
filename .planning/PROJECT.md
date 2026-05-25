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

(None — v4.0 shipped. Define next milestone with `/gsd:new-milestone`.)

### Validated (v3.0)

- ✓ Typography weight system — titles light, body heavier (CSS custom property tokens) — Phase 14
- ✓ iPhone frame realism — layered shadow, proportional Dynamic Island, side buttons, screenshot fit — Phase 12
- ✓ QR code removal (CLS 0 maintained) — Phase 13
- ✓ Matisse Swimming Pool art direction — organic SVG cut-out frieze — Phase 15
- ✓ Interaction polish — standardized easing, Lenis momentum scroll, 64px anchor offset, reduced-motion/touch guards, native view-transition crossfade — Phase 16

### Validated (v4.0)

- ✓ i18n routing — EN unprefixed, /zh/ and /fr/ prefixes, type-safe `use*Translations()` — Phase 17
- ✓ Noto Sans SC CJK font isolated to /zh/ pages (zero CJK CSS on EN/FR) — Phase 17
- ✓ Language switcher (desktop + mobile), path-preserving, locale-aware nav — Phase 18
- ✓ zh + fr translations across all 10 pages (home, 5 features, privacy, terms, support, blog) — Phases 19-21
- ✓ SEO i18n — hreflang + x-default, per-locale og:locale, localized sitemap, per-locale 404s — Phase 22

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
- ~~Internationalization / multi-language~~ — Moved to Active (v4.0)
- E-commerce or merchandise
- Dark mode — Descoped (light mode only)

## Next Milestone

**TBD** — run `/gsd:new-milestone`. Deferred candidates (v4.1+): translated OG images
(CJK in satori), blog post translations, URL slug translation, additional languages (ja/es/de).

## Current State

**Shipped:** v4.0 Multi-Language Support (2026-05-25)
**Live at:** tuwa.app (Cloudflare Pages, auto-deploy from main)
**Lighthouse (v2.0 baseline):** Mobile 98, Desktop 99 · **CLS:** 0 (measured v4.0)

Trilingual marketing site (English / 中文 / Français) across all 10 pages. Astro i18n routing
with EN unprefixed for SEO equity; Noto Sans SC for Chinese, isolated to /zh/ pages so EN/FR
load zero CJK CSS. Path-preserving language switcher (desktop + mobile). Full SEO i18n:
hreflang + x-default, per-locale og:locale, localized sitemap (90 hreflang annotations),
per-locale 404 pages. Build produces 33 static pages.

Retains the v3.0 polish: CSS device frames, Matisse SVG frieze, Lenis momentum scroll, native
view-transition crossfades, light typographic weight system, iPod click-wheel feature overview.

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
*Last updated: 2026-05-25 after v4.0 Multi-Language Support milestone complete*
