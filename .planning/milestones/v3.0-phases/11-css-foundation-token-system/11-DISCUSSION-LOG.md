# Phase 11: CSS Foundation & Token System - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-05-14
**Phase:** 11-css-foundation-token-system
**Areas discussed:** Weight token values, View transition feel, Matisse CSS scaffolding, Hardcoded weight migration

---

## Weight Token Values

### Display weight

| Option | Description | Selected |
|--------|-------------|----------|
| 200 (Ultralight) | Maximum contrast, editorial feel. Thin but legible at 48px+ | ✓ |
| 300 (Light) | Strong contrast, comfortable. Matches TYPO-03 "300 or below" | |
| 250 | Split the difference | |

**User's choice:** 200 (Ultralight)
**Notes:** None

### Heading weight

| Option | Description | Selected |
|--------|-------------|----------|
| 300 (Light) | Creates gradient 200→300→body. TYPO-03 compliant | ✓ |
| 200 (same as display) | Differentiated by size only | |
| 250 | Subtle step between display and body | |

**User's choice:** 300 (Light)
**Notes:** None

### Body weight

| Option | Description | Selected |
|--------|-------------|----------|
| 500 (Medium) | Clear contrast against 200/300. TYPO-04 compliant | ✓ |
| 600 (Semi-bold) | Matches current hardcoded values | |
| 450 | Subtler separation | |

**User's choice:** 500 (Medium)
**Notes:** None

### Label weight

| Option | Description | Selected |
|--------|-------------|----------|
| 600 (Semi-bold) | Small text needs weight. Full gradient: 200→300→500→600 | ✓ |
| 500 (same as body) | Differentiated by size and letter-spacing only | |
| 700 (Bold) | Maximum punch for tiny text | |

**User's choice:** 600 (Semi-bold)
**Notes:** None

---

## View Transition Feel

### Crossfade duration

| Option | Description | Selected |
|--------|-------------|----------|
| 200ms (Quick) | Fast, snappy. contralabs.com reference | ✓ |
| 350ms (Smooth) | More cinematic, adds perceived latency | |
| 150ms (Instant-ish) | Barely perceptible | |

**User's choice:** 200ms (Quick)
**Notes:** None

### Transition scope

| Option | Description | Selected |
|--------|-------------|----------|
| Global crossfade only | One @view-transition rule. Simple, consistent | ✓ |
| Global + hero morph | Named transition on hero device frame. More complex | |

**User's choice:** Global crossfade only
**Notes:** None

---

## Matisse CSS Scaffolding

### Shape color

| Option | Description | Selected |
|--------|-------------|----------|
| Accent green only | --color-accent on travertine. Monochromatic | |
| Multi-color palette | 3-4 Matisse-inspired colors | |
| You decide | Claude picks in Phase 15 | |

**User's choice:** Custom — try accent green first, charcoal as backup
**Notes:** User wants accent green (#2B5240) as primary attempt, charcoal as fallback if green doesn't pop

### Scaffolding depth

| Option | Description | Selected |
|--------|-------------|----------|
| Minimal: classes + motion guard | .matisse-frieze, .matisse-shape + reduced-motion guard | ✓ |
| Detailed: classes + tokens + keyframes | Also pre-define tokens and @keyframes | |

**User's choice:** Minimal: classes + motion guard
**Notes:** None

---

## Hardcoded Weight Migration

| Option | Description | Selected |
|--------|-------------|----------|
| Define tokens only, don't swap yet | Phase 11 adds tokens, Phase 14 does replacement | ✓ |
| Define + swap in global.css only | Replace 6 values in global.css, leave components | |
| Full swap everything now | Replace all font-weight values sitewide | |

**User's choice:** Define tokens only, don't swap yet
**Notes:** None

---

## Claude's Discretion

- View-transition easing function
- Matisse class property stubs

## Deferred Ideas

None
