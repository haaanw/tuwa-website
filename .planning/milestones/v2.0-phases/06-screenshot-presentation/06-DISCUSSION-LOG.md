# Phase 6: Screenshot Presentation - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-05-11
**Phase:** 06-screenshot-presentation
**Areas discussed:** Device frame style, Screenshot sourcing, Hero mockup approach, Responsive sizing

---

## Device Frame Style

| Option | Description | Selected |
|--------|-------------|----------|
| Minimal CSS frame | Dark rounded rect border + subtle notch/dynamic island cutout. Pure CSS, lightweight. | |
| Detailed bezel | Thicker frame with side buttons, speaker grille, camera cutout. More realistic. | ✓ |
| Screenshot-only polish | No bezel. Crisp screenshot with shadow + rounded corners. | |

**User's choice:** Detailed bezel
**Notes:** User wants it to read clearly as "iPhone" at a glance.

### Follow-up: Implementation approach

| Option | Description | Selected |
|--------|-------------|----------|
| Pure CSS (Recommended) | CSS border, border-radius, pseudo-elements for dynamic island + side buttons. | ✓ |
| SVG overlay | Pre-drawn iPhone SVG wrapping screenshot. | |
| You decide | Claude picks. | |

**User's choice:** Pure CSS

---

## Screenshot Sourcing

### Missing screenshots

| Option | Description | Selected |
|--------|-------------|----------|
| Placeholder with frame | Show device frame with styled placeholder inside. | ✓ |
| Skip frameless pages | Only apply frames to pages with screenshots. | |
| Export new screenshots first | User exports before phase starts. | |

**User's choice:** Placeholder with frame

### Re-export question

| Option | Description | Selected |
|--------|-------------|----------|
| Use existing as-is | 1206px is already ~3x. Good enough. | ✓ |
| Re-export before phase | User re-exports at exactly 3x. Blocks execution. | |
| Re-export during phase | Checkpoint task for pause/export/resume. | |

**User's choice:** Use existing as-is

---

## Hero Mockup Approach

| Option | Description | Selected |
|--------|-------------|----------|
| Same DeviceFrame component | Hero uses exact same CSS frame as feature pages. | |
| Enhanced hero frame | Extra polish — perspective, reflection, floating shadow. | |
| Screenhance pre-rendered image | Photorealistic mockup PNG for hero. | |

**User's choice:** Other — "You decide." Plus extensive art direction input about Matisse-inspired aesthetic, data/science + art blend, reference contralabs.com.

---

## Responsive Sizing

| Option | Description | Selected |
|--------|-------------|----------|
| Fixed width per context | Hero: 320px mobile, 380px desktop. Features: 280px/320px. | |
| Fluid with max-width | Frames scale fluidly up to a max. | |
| You decide | Claude picks. | ✓ |

**User's choice:** You decide

---

## Claude's Discretion

- Hero frame treatment (same vs enhanced)
- Responsive sizing strategy
- Frame detail level (home indicator bar, etc.)

## Deferred Ideas

- Matisse illustration system — belongs in Phase 8 (UI/UX Visual Depth)
- Coaching + cold-start real screenshots — separate export task
