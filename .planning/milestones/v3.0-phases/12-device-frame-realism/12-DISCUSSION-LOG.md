# Phase 12: Device Frame Realism - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-05-15
**Phase:** 12-device-frame-realism
**Areas discussed:** Shadow depth & layering, Dynamic Island proportions, Side button fidelity, Screenshot fit & alignment

---

## Shadow Depth & Layering

| Option | Description | Selected |
|--------|-------------|----------|
| Soft natural falloff | 4-5 layers graduating tight/dark → wide/faint, mimics desk under diffuse light | ✓ |
| Dramatic elevated drop | Fewer layers, stronger contrast, floating look | |
| You decide | Claude picks what looks best | |

**User's choice:** Soft natural falloff
**Notes:** Premium, realistic feel preferred over dramatic/eye-catching

### Inset Screen Shadow

| Option | Description | Selected |
|--------|-------------|----------|
| Yes, subtle inset | Thin dark inset shadow around screen edges — display looks embedded | ✓ |
| No inset shadow | Screen sits flush with bezel | |

**User's choice:** Yes, subtle inset
**Notes:** None

---

## Dynamic Island Proportions

| Option | Description | Selected |
|--------|-------------|----------|
| Proportional pill only | Scale to match real iPhone 15 Pro ratio (~32% screen width, ~2.7:1 aspect) | ✓ |
| Pill + camera dot | Same proportional pill with subtle camera sensor circle on left | |
| You decide | Claude picks based on appearance at 260-320px | |

**User's choice:** Proportional pill only
**Notes:** Clean pill, no camera dot detail

---

## Side Button Fidelity

### Button Count

| Option | Description | Selected |
|--------|-------------|----------|
| All 4 buttons | Action + vol up + vol down (left) + power (right), matches real iPhone 15 Pro | ✓ |
| Keep current 2-button setup | Volume cluster + power as-is | |
| You decide | Claude picks based on CSS feasibility | |

**User's choice:** All 4 buttons

### Scaling Behavior

| Option | Description | Selected |
|--------|-------------|----------|
| Yes, scale proportionally | Relative units/calc() for all 3 breakpoints | ✓ |
| Fixed sizes, just reposition | Keep 3px width, adjust positions per breakpoint | |

**User's choice:** Yes, scale proportionally
**Notes:** None

---

## Screenshot Fit & Alignment

### Issue Type

| Option | Description | Selected |
|--------|-------------|----------|
| Extra border/gap around screenshot | Screenshot doesn't fill to bezel edge | ✓ |
| Text/content gets cut off | Screenshots cropped, clips UI elements | |
| Both issues | Gaps and cropping inconsistently | |
| Not sure, just match DFRM-05 | No specific issue noticed yet | |

**User's choice:** Extra border/gap around screenshot

### Aspect Ratio Approach

| Option | Description | Selected |
|--------|-------------|----------|
| Match iPhone 15 Pro exactly | 393:852 aspect ratio, fix padding/border-radius mismatch | ✓ |
| Slightly zoomed crop | scale(1.02) to guarantee no gap | |
| You decide | Claude diagnoses and picks minimal fix | |

**User's choice:** Match iPhone 15 Pro exactly
**Notes:** Fix root cause (padding/border-radius mismatch), don't use zoom hack

---

## Claude's Discretion

- Exact shadow opacity values and blur radii
- Inset shadow intensity
- Whether to migrate inline styles to global.css
- Button color treatment

## Deferred Ideas

None
