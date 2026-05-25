# Phase 15: Matisse SVG Art Direction - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-05-15
**Phase:** 15-matisse-svg-art-direction
**Areas discussed:** Shape authoring, Frieze composition, Feature page decoration, Color & opacity

---

## Shape Authoring

### How should the Matisse SVG shapes be created?

| Option | Description | Selected |
|--------|-------------|----------|
| Code-generated | Programmatically generate organic blob paths using Bezier curves. No design tool dependency. | ✓ |
| Hand-drawn in Figma/Inkscape | Manually trace shapes, export as SVG, SVGO-optimize. More artistic control. | |
| You decide | Claude picks the approach. | |

**User's choice:** Code-generated (Recommended)
**Notes:** Solves STATE.md "design prerequisite" blocker — no need to wait for manual design work.

### How many distinct shape types?

| Option | Description | Selected |
|--------|-------------|----------|
| 5-7 shapes | Enough variety to avoid repetition. Good balance vs DOM budget. | ✓ |
| 8-12 shapes | Richer vocabulary but heavier DOM. | |
| 3-4 shapes | Minimal set, relies on transforms for variety. | |

**User's choice:** 5-7 shapes

### What style of shapes?

| Option | Description | Selected |
|--------|-------------|----------|
| Abstract biomorphic blobs | Smooth, amorphous forms. No identifiable subject. | ✓ |
| Recognizable organic forms | Leaf-like, body-like, wave-like shapes. | |
| Mix of both | Mostly abstract with 1-2 recognizable forms. | |

**User's choice:** Abstract biomorphic blobs

---

## Frieze Composition

### Where should the frieze sit in the hero section?

| Option | Description | Selected |
|--------|-------------|----------|
| Behind hero content | Full-width band layered behind headline + device frame. Subtle background. | ✓ |
| Horizontal band below headline | Frieze sits between headline and device frame as separator. | |
| Edge overflow | Shapes spill from left/right edges, partially cropped. | |

**User's choice:** Behind hero content

### Frieze width?

| Option | Description | Selected |
|--------|-------------|----------|
| Full viewport width | Shapes span edge-to-edge. More dramatic. | ✓ |
| Content-width only | Stay within 768px column. | |
| You decide | | |

**User's choice:** Full viewport width (Recommended)

### Band height?

| Option | Description | Selected |
|--------|-------------|----------|
| Defined band (~200-300px) | Clustered in horizontal strip around device frame. Predictable layout. | ✓ |
| Full hero scatter | Shapes scattered across entire hero height. | |
| You decide | | |

**User's choice:** Defined band (~200-300px)

---

## Feature Page Decoration

### How should Matisse shapes appear on feature pages?

| Option | Description | Selected |
|--------|-------------|----------|
| Single accent shape per page | One blob per page, corner/edge decoration. | |
| Small cluster (2-3 shapes) | Mini composition per page, ties to hero. | ✓ (try) |
| Shared section divider | 1-2 shapes as section dividers between content blocks. | ✓ (try) |
| You decide | | |

**User's choice:** Try both approaches (cluster + divider), compare visually, then decide
**Notes:** User wants to see both implemented before committing.

### Same shapes or unique per page?

| Option | Description | Selected |
|--------|-------------|----------|
| Same shapes, different placement | Reuse shapes, vary position/rotation/scale. | |
| Unique shape per page | Each feature page gets a distinct shape. | ✓ |
| You decide | | |

**User's choice:** Unique shape per page

---

## Color & Opacity

### Fill treatment?

| Option | Description | Selected |
|--------|-------------|----------|
| Semi-transparent (10-20% opacity) | Subtle washes on travertine. | |
| Solid but muted | Full opacity in lighter tint. | |
| Mix — hero solid, features transparent | Hero opaque for impact, feature pages lighter. | ✓ |
| You decide | | |

**User's choice:** Mix — hero solid, features transparent

### Color range?

| Option | Description | Selected |
|--------|-------------|----------|
| Single color (accent green) | All shapes in --color-accent at varying opacities. | |
| 2-3 color palette | Accent green + 1-2 complementary tones. | ✓ |
| You decide | | |

**User's choice:** 2-3 color palette

---

## Claude's Discretion

- Exact complementary color hues
- Parallax intensity and direction
- Entrance animation style and timing
- Shape scale/rotation transforms
- Feature page approach winner (cluster vs divider)

## Deferred Ideas

None — discussion stayed within phase scope
