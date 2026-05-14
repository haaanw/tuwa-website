# Phase 10: v2.0 Cleanup - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-05-14
**Phase:** 10-v2-cleanup
**Areas discussed:** Dead CSS removal scope, ANIM-03 / UIPX-05 closure, Build verification

---

## Dead CSS Removal Scope

| Option | Description | Selected |
|--------|-------------|----------|
| Targeted only | Remove .feature-card rules (6 lines) and any other bento-related CSS. Leave everything else. | |
| Light audit | Remove .feature-card + scan global.css for other obviously unused selectors (quick grep check). | ✓ |
| You decide | Claude picks the right scope based on codebase state. | |

**User's choice:** Light audit
**Notes:** None

---

## ANIM-03 / UIPX-05 Closure

| Option | Description | Selected |
|--------|-------------|----------|
| Mark superseded | Update REQUIREMENTS.md to mark both as 'superseded by Phase 8.1'. No re-implementation. | |
| Re-implement stagger on wheel | Add per-segment stagger animation to the click wheel arcs. | |
| Mark + add stagger | Mark UIPX-05 superseded, but re-add stagger animation to wheel segments for ANIM-03. | ✓ |

**User's choice:** Mark UIPX-05 as superseded, re-implement ANIM-03 stagger on wheel segments.

### Follow-up: Stagger approach

| Option | Description | Selected |
|--------|-------------|----------|
| Arc reveal cascade | Each wheel arc fades/scales in with 80ms delay between segments. | |
| Spin-in entrance | Wheel rotates from hidden state, segments appearing as rotation brings them into view. | |
| You decide | Claude picks best approach that works with existing AnimationController. | ✓ |

**User's choice:** Claude's discretion
**Notes:** Must work with existing AnimationController pattern.

---

## Build Verification

| Option | Description | Selected |
|--------|-------------|----------|
| Build only | Clean build with no errors is sufficient. | |
| Build + Lighthouse | Run Lighthouse after to confirm scores didn't regress. | |
| Build + visual check | Build + visually verify the wheel and landing page still look correct. | |

**User's choice:** All three — build, Lighthouse, and visual check.
**Notes:** User typed "build, lighthouse, and visual check" as free text response.

---

## Claude's Discretion

- Stagger animation approach for wheel segments
- Exact delay values between segments
- Whether to use `data-animate-delay` on individual arcs or a different mechanism

## Deferred Ideas

None — discussion stayed within phase scope.
