# Phase 16: Interaction Polish - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-05-16
**Phase:** 16-interaction-polish
**Areas discussed:** Scroll feel, Magnetic CTA, Hover audit scope, Timing philosophy

---

## Scroll Feel

| Option | Description | Selected |
|--------|-------------|----------|
| Yes, use Lenis | Premium smooth scroll feel. Direct integration in BaseLayout.astro. Disable on touch devices. | ✓ |
| Native scroll only | Trust the browser. macOS/iOS already have momentum. Zero JS. | |
| Lenis desktop only | Lenis on non-touch devices, native elsewhere. | |

**User's choice:** Yes, use Lenis
**Notes:** STATE.md had flagged this as pending decision. User confirmed Lenis for premium feel.

---

## Magnetic CTA

| Option | Description | Selected |
|--------|-------------|----------|
| Subtle (4-8px) | Barely noticeable shift, ~100px radius | |
| Medium (10-16px) | Clearly visible pull, ~150px radius | ✓ |
| Strong (20-30px) | Dramatic elastic pull like creative award sites | |

**User's choice:** Medium (10-16px)
**Notes:** None

### Which buttons get magnetic effect?

| Option | Description | Selected |
|--------|-------------|----------|
| Primary CTAs only | Hero download, LandingCTA, FeatureCTA only | |
| All .btn-cta elements | Every element using .btn-cta class | ✓ |
| Hero + page CTAs | Hero + bottom-of-page CTA sections | |

**User's choice:** All .btn-cta elements
**Notes:** None

---

## Hover Audit Scope

| Option | Description | Selected |
|--------|-------------|----------|
| Complete audit | Every clickable element site-wide gets smooth hover transition | ✓ |
| Key gaps only | Focus on footer links, FAQ accordion, FeatureGrid cards | |
| You decide | Claude identifies and fixes most impactful gaps | |

**User's choice:** Complete audit
**Notes:** None

---

## Timing Philosophy

| Option | Description | Selected |
|--------|-------------|----------|
| Standardize durations | Define 2-3 duration tokens, migrate existing | |
| Standardize easing only | Keep varied durations, pick one consistent easing curve | ✓ |
| Leave as-is | Current variety is fine | |

**User's choice:** Standardize easing only
**Notes:** None

### Easing curve selection

| Option | Description | Selected |
|--------|-------------|----------|
| ease-out | Fast start, gentle deceleration. Most common in codebase. | |
| cubic-bezier(0.25, 0.1, 0.25, 1) | Snappier ease-out variant. More initial speed. | ✓ |
| cubic-bezier(0.33, 1, 0.68, 1) | More pronounced deceleration, "settling" feel. | |

**User's choice:** cubic-bezier(0.25, 0.1, 0.25, 1)
**Notes:** None

---

## Claude's Discretion

- Lenis config params (lerp, wrapper)
- Magnetic effect implementation approach
- Duration values for new hover transitions
- Link hover technique (text-decoration vs pseudo-element)
- Lenis + anchor link handling

## Deferred Ideas

None
