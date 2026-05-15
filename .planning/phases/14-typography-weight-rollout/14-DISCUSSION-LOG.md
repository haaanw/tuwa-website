# Phase 14: Typography Weight Rollout - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-05-15
**Phase:** 14-typography-weight-rollout
**Areas discussed:** Element-to-token mapping, StatsCounter numbers, Inline style strategy, Nav/footer label treatment

---

## Element-to-Token Mapping

| Option | Description | Selected |
|--------|-------------|----------|
| Looks right | Proceed with mapping — headings light, body medium, labels/buttons stay semi-bold | ✓ |
| Headings too light | 300 might be too thin — maybe keep headings at 400-500 and only hero goes ultralight | |
| FAQ answers stay 400 | Don't bump FAQ answer weight from 400→500 — lighter answer text is intentional | |

**User's choice:** Looks right
**Notes:** Proposed mapping: display→200, headings→300, body→500, labels→600, FAQ answers bumped 400→500

---

## StatsCounter Numbers

| Option | Description | Selected |
|--------|-------------|----------|
| Ultralight display (200) | Match hero headline weight — big numbers go thin/editorial. Magazine-feel contrast. | ✓ |
| Keep bold (700) | Stats are data emphasis. Bold numbers feel authoritative. Add 700 as --weight-bold token. | |
| Use heading weight (300) | Middle ground — lighter than current but not ultralight. | |

**User's choice:** Ultralight display (200)
**Notes:** Biggest visual change on the page — stat numbers shift from bold to editorial ultralight

---

## Inline Style Strategy

| Option | Description | Selected |
|--------|-------------|----------|
| Replace inline values only | Change font-weight: 600 → var(--weight-heading) etc. directly in inline style. Minimal diff. | |
| Migrate to CSS classes | Extract to utility classes in global.css. Cleaner long-term but larger diff. | |
| You decide | Claude picks whichever approach is cleaner per-element. | ✓ |

**User's choice:** You decide
**Notes:** Claude's discretion — mix inline replacement and class extraction based on what's cleaner per-element

---

## Nav/Footer Label Treatment

| Option | Description | Selected |
|--------|-------------|----------|
| Labels (keep 600) | Navigational labels/category headers — sturdy and scannable | |
| Headings (drop to 300) | Treat like section headings for editorial consistency | |
| Body weight (500) | Middle ground — not display headings but more than micro-labels | ✓ |

**User's choice:** Body weight (500)
**Notes:** Footer section headers and nav links get body weight — separates them from true labels (buttons, captions) without going as light as content headings

---

## Claude's Discretion

- Inline vs class migration strategy per-element (D-09)
- Consolidation of repeated inline style patterns
- Edge-case element handling

## Deferred Ideas

None — discussion stayed within phase scope
