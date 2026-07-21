# Phase 7: Animation Polish - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-05-12
**Phase:** 07-animation-polish
**Areas discussed:** Stagger timing, Hero choreography, Sticky scroll showcase, Animation feel

---

## Stagger Timing

| Option | Description | Selected |
|--------|-------------|----------|
| Quick cascade | Each card enters 80-120ms after previous, total ~400-500ms. Premium but fast. | ✓ |
| Slow wave | Each card enters 200-300ms after previous, total ~1-1.5s. More dramatic. | |
| Pairs then solo | Top row staggers as group, bottom row follows. Respects grid structure. | |

**User's choice:** Quick cascade
**Notes:** None

| Option | Description | Selected |
|--------|-------------|----------|
| FeatureGrid only | Stagger on landing page card grid only. Other elements keep fade-up-together. | ✓ |
| All repeated groups | Also stagger feature page bullet lists, benefit sections site-wide. | |
| Cards + feature sections | FeatureGrid cards + feature deep-dive page sections stagger sequentially. | |

**User's choice:** FeatureGrid only
**Notes:** None

---

## Hero Choreography

| Option | Description | Selected |
|--------|-------------|----------|
| Text first, then device | Headline → subtitle → device mockup with scale-up. Builds anticipation. | ✓ |
| Device first, then text | Device slides in first → text appears around it. Product-forward. | |
| Simultaneous with offset | Everything together but text slightly ahead (100-200ms). Coordinated feel. | |

**User's choice:** Text first, then device
**Notes:** None

| Option | Description | Selected |
|--------|-------------|----------|
| Immediate on load | Hero animates as soon as page renders. No scroll needed. | ✓ |
| Scroll-triggered | Same IntersectionObserver as other sections. Consistent but may flash. | |

**User's choice:** Immediate on load
**Notes:** None

---

## Sticky Scroll Showcase

| Option | Description | Selected |
|--------|-------------|----------|
| Recovery Scoring | Most content-rich page, recovery zones make natural scroll steps. Has RecoveryChart. | ✓ |
| Workload Tracking | Load monitoring with clear before/after data stories. ACWR zones as scroll steps. | |
| You decide | Claude picks whichever page benefits most. | |

**User's choice:** Recovery Scoring
**Notes:** None

| Option | Description | Selected |
|--------|-------------|----------|
| Sticky device + swapping text | DeviceFrame pinned, text scrolls through 3-4 steps. Screenshot swaps per step. Oura-style. | ✓ |
| Sticky text + swapping visuals | Headline pinned, visual area scrolls through screenshots/illustrations. | |
| Full-width scroll sections | No split layout — full-width sections snap/transition on scroll. More immersive. | |

**User's choice:** Sticky device + swapping text
**Notes:** None

| Option | Description | Selected |
|--------|-------------|----------|
| 3 steps | Combine subsections into 3 clean steps. Claude picks grouping. | ✓ |
| 4 steps | One step per existing subsection. More content, longer scroll. | |
| You decide | Claude groups into whatever number works best. | |

**User's choice:** 3 steps
**Notes:** None

---

## Animation Feel

| Option | Description | Selected |
|--------|-------------|----------|
| Precise & swift | Fast (300-500ms), subtle movements, ease-out. Matches data-precision brand. | ✓ |
| Smooth & cinematic | Longer (600-900ms), bigger movements, custom cubic-bezier. Magazine-like. | |
| Playful & bouncy | Spring easing with overshoot. Energetic but risks feeling less serious. | |

**User's choice:** Precise & swift
**Notes:** None

| Option | Description | Selected |
|--------|-------------|----------|
| Keep as-is | Current fade-up (400ms ease-out, 20px translate) stays. Hero/stagger get new animations. | ✓ |
| Tweak timing | Adjust to match new motion personality. | |
| You decide | Claude adjusts if new motion personality calls for it. | |

**User's choice:** Keep as-is
**Notes:** None

---

## Claude's Discretion

- Exact stagger delay interval (80-120ms range)
- Hero animation durations and easing curves
- Recovery-scoring subsection grouping into 3 steps
- Sticky scroll implementation approach (IntersectionObserver vs scroll-driven)
- Screenshot swap animation in sticky scroll
- Responsive behavior of sticky scroll on mobile

## Deferred Ideas

None — discussion stayed within phase scope.
