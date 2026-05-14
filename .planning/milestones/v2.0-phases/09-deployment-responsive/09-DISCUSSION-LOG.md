# Phase 9: Deployment & Responsive - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-05-14
**Phase:** 9-deployment-responsive
**Areas discussed:** App Store badge, Responsive strategy, Deployment setup, Lighthouse tradeoffs

---

## App Store Badge

| Option | Description | Selected |
|--------|-------------|----------|
| Hero + all CTAs | Replace placeholder everywhere — Hero, LandingCTA, FeatureCTA, Footer | ✓ |
| Hero only | Official badge in hero, simpler custom button in CTAs | |
| Hero + Footer | Badge in hero and footer, CTAs keep current style | |

**User's choice:** Hero + all CTAs
**Notes:** Consistent download action across site

| Option | Description | Selected |
|--------|-------------|----------|
| SVG | Crisp at all sizes, tiny file, easy to style | ✓ |
| PNG | Simpler but larger, less flexible | |
| You decide | Claude picks best format | |

**User's choice:** SVG
**Notes:** None

---

## Responsive Strategy

| Option | Description | Selected |
|--------|-------------|----------|
| Fluid + test only | Keep current breakpoints, use fluid/clamp(), add breakpoints only if something breaks | ✓ |
| Add all target breakpoints | Explicitly add media queries for 375, 390, 1280, 1440px | |
| You decide | Claude fixes whatever breaks | |

**User's choice:** Fluid + test only
**Notes:** None

| Option | Description | Selected |
|--------|-------------|----------|
| Cap at 1440px | Content stops stretching, centered on wider screens | ✓ |
| Cap at 1280px | Tighter max-width | |
| No cap | Full viewport width | |
| You decide | Claude picks | |

**User's choice:** Cap at 1440px
**Notes:** Standard for marketing sites

---

## Deployment Setup

| Option | Description | Selected |
|--------|-------------|----------|
| GitHub integration | Connect repo in Cloudflare dashboard, auto-deploy on push | ✓ |
| Wrangler CLI | Deploy via wrangler pages deploy in CI | |
| You decide | Claude picks simplest | |

**User's choice:** GitHub integration
**Notes:** None

| Option | Description | Selected |
|--------|-------------|----------|
| Already on Cloudflare | Domain managed by Cloudflare, add custom domain in Pages | ✓ |
| Needs DNS migration | Update nameservers or add CNAME | |
| Not sure | Need to check | |

**User's choice:** Already on Cloudflare
**Notes:** None

---

## Lighthouse Tradeoffs

| Option | Description | Selected |
|--------|-------------|----------|
| Noise texture | body::after overlay is purely decorative, remove/reduce if hurts perf | ✓ |
| Animation complexity | Simplify stagger timings, reduce animated elements | |
| Chart.js islands | Lazy-load or remove if bundle size issue | |
| You decide | Claude prioritizes based on audit data | |

**User's choice:** Noise texture first
**Notes:** None

| Option | Description | Selected |
|--------|-------------|----------|
| Both | Run locally during dev + verify on live deployment | ✓ |
| Post-deploy only | Only on live Cloudflare | |
| You decide | Claude determines | |

**User's choice:** Both
**Notes:** Catch regressions early, then verify on CDN

---

## Claude's Discretion

- Image optimization specifics
- Order of responsive fixes
- Specific Lighthouse remediation beyond noise texture

## Deferred Ideas

None
