# Phase 1: Foundation - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-05-10
**Phase:** 1-Foundation
**Areas discussed:** Color palette & tokens, Navigation & footer, Dark mode behavior, Page routes & structure

---

## Color Palette & Tokens

| Option | Description | Selected |
|--------|-------------|----------|
| Same tokens, extended | Use exact same hex values from DESIGN.md, add web-specific tokens | |
| Same family, web-tuned | Keep travertine vibe but adjust values for web rendering, add web tokens freely | ✓ |
| You decide | Claude picks | |

**User's choice:** Same family, web-tuned
**Notes:** Web text tends to need different contrast than iOS. Free to adjust values while keeping the warm travertine identity.

### CTA Color

| Option | Description | Selected |
|--------|-------------|----------|
| Warmer/bolder accent | More saturated travertine for CTAs — still in-family | |
| Contrasting accent | Distinct web accent color (e.g., muted teal or warm rust) that complements travertine | ✓ |
| You decide | Claude picks | |

**User's choice:** Contrasting accent
**Notes:** Web needs a CTA color that pops against travertine, not just a warmer version of it.

### Web Style Looseness

| Option | Description | Selected |
|--------|-------------|----------|
| Subtle softness | Small border-radius (4-8px), subtle shadows, clean/minimal | ✓ |
| Modern web standard | Standard rounded corners (8-12px), proper card shadows, generous whitespace | |
| You decide | Claude picks | |

**User's choice:** Subtle softness
**Notes:** Still recognizably related to the app's aesthetic, just not as strict.

---

## Navigation & Footer

### Header Nav Links

| Option | Description | Selected |
|--------|-------------|----------|
| Minimal: Features + Blog | Two links + CTA | |
| Standard: Features, Blog, Support | Three links + CTA | |
| Full: Features, Coaching, Blog, Support | Four links + CTA, coaching surfaced separately | ✓ |

**User's choice:** Full — Features, Coaching, Blog, Support
**Notes:** Coaches are a distinct audience worth surfacing in nav.

### Header CTA

| Option | Description | Selected |
|--------|-------------|----------|
| Small CTA button | Compact "Download" or "Get the App" button, always visible | ✓ |
| No header CTA | Keep header clean, CTA in hero and footer only | |

**User's choice:** Small CTA button in header

### Footer Layout

| Option | Description | Selected |
|--------|-------------|----------|
| Simple: links + legal + badge | One row, compact | |
| Columned: Product, Resources, Legal | Multi-column with App Store badge prominent | ✓ |
| You decide | Claude picks | |

**User's choice:** Columned footer

---

## Dark Mode Behavior

| Option | Description | Selected |
|--------|-------------|----------|
| System preference | Respect OS setting, toggle overrides | |
| Dark by default | Dark mode first, toggle to switch | |
| Other: Light only | No dark mode at all | ✓ |

**User's choice:** Abandon dark mode entirely — light mode only
**Notes:** User explicitly chose to drop dark mode. No toggle, no system preference detection needed. Simplifies FOUND-04 requirement significantly.

---

## Page Routes & Structure

### URL Structure

| Option | Description | Selected |
|--------|-------------|----------|
| /features/[slug] | Nested under /features/ | |
| /[slug] (flat) | Top-level URLs | |
| You decide | Claude picks based on SEO best practices | ✓ |

**User's choice:** You decide — Claude's discretion

### Header Position

| Option | Description | Selected |
|--------|-------------|----------|
| Sticky header | Fixed at top on scroll | |
| Scrolling header | Scrolls away with content | |
| You decide | Claude picks based on marketing site conventions | ✓ |

**User's choice:** You decide — Claude's discretion

---

## Claude's Discretion

- URL structure for feature pages (D-07)
- Sticky vs scrolling header (D-08)

## Deferred Ideas

None — discussion stayed within phase scope
