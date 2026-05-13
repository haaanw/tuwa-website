# Phase 8: UI/UX Visual Depth - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-05-13
**Phase:** 08-ui-ux-visual-depth
**Areas discussed:** Visual texture & depth, Micro-interactions & hover states, Bento grid layout, Animated counters

---

## Visual Texture & Depth

| Option | Description | Selected |
|--------|-------------|----------|
| Subtle noise overlay | Thin grain texture — adds warmth and tactility. CSS-only via SVG filter. | ✓ |
| Gradient accents | Soft radial gradients behind hero or section dividers | |
| Both noise + gradient | Maximum visual depth but more complexity | |

**User's choice:** Subtle noise overlay
**Notes:** None

| Option | Description | Selected |
|--------|-------------|----------|
| Hero + CTA sections only | Noise on 2-3 key sections, rest stays clean | |
| Full page background | Very subtle noise across entire page, like textured paper | ✓ |
| Section alternation | Alternate textured and clean sections | |

**User's choice:** Full page background

| Option | Description | Selected |
|--------|-------------|----------|
| Uniform spacing | Same gap between all sections | |
| Hero gets more breathing room | Hero-to-content gap larger, rest at 120px | |
| You decide | Claude picks within 120-160px range | ✓ |

**User's choice:** You decide

---

## Micro-Interactions & Hover States

| Option | Description | Selected |
|--------|-------------|----------|
| Subtle & precise | scale(1.02) hover, scale(0.98) active. Barely noticeable but responsive. | ✓ |
| Noticeable pop | scale(1.05) hover, scale(0.95) active. Clearly visible lift. | |
| You decide | Claude picks within precise & swift direction | |

**User's choice:** Subtle & precise

| Option | Description | Selected |
|--------|-------------|----------|
| Shadow lift | Increase box-shadow depth on hover — card rises off page | ✓ |
| Translate up + shadow | Card moves up 4-6px AND shadow deepens | |
| Border glow | Subtle accent-colored border or glow on hover | |

**User's choice:** Shadow lift

---

## Bento Grid Layout

| Option | Description | Selected |
|--------|-------------|----------|
| Recovery Scoring | Most content-rich feature, has sticky scroll showcase | ✓ |
| Workload Tracking | Core feature — ACWR chart, training load monitoring | |
| You decide | Claude picks based on content richness | |

**User's choice:** Recovery Scoring as hero card

| Option | Description | Selected |
|--------|-------------|----------|
| 1 large + 4 small | Recovery Scoring spans 2 columns, 4 cards in 2x2 below | |
| 1 large + 2 medium + 2 small | Three tiers of visual weight | ✓ |
| You decide | Claude picks best arrangement | |

**User's choice:** 1 large + 2 medium + 2 small

---

## Animated Counters

| Option | Description | Selected |
|--------|-------------|----------|
| Training sessions tracked | e.g. '50,000+ sessions tracked' | |
| Recovery accuracy | e.g. '99.2% accuracy' | |
| Athletes using Tuwa | e.g. '10,000+ athletes' | |
| You decide | Claude picks 2-3 compelling metrics | ✓ |

**User's choice:** You decide

| Option | Description | Selected |
|--------|-------------|----------|
| Between hero and features | Stats bar right after hero — immediate credibility | |
| Above the CTA section | Social proof before download prompt | |
| You decide | Claude picks best placement | ✓ |

**User's choice:** You decide

## Claude's Discretion

- Section spacing values within ranges
- Counter metrics and placement
- Bento grid CSS details
- Noise texture opacity
- Card shadow values
