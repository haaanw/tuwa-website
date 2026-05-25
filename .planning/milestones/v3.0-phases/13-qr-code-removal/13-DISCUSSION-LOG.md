# Phase 13: QR Code Removal - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-05-15
**Phase:** 13-qr-code-removal
**Areas discussed:** Section fate, QR dependency, Layout reflow

---

## Section Fate

| Option | Description | Selected |
|--------|-------------|----------|
| Remove entire section | Delete LandingCTA.astro completely and its import from index.astro | |
| Keep headline, add text CTA | Remove badge+QR but keep headline/copy with a simple text link or button | |
| Keep headline only | Remove badge+QR, keep just the headline and copy as a closing statement | ✓ |

**User's choice:** Keep headline only
**Notes:** Section becomes a closing statement with no download action. Header, hero, and footer CTAs already cover downloads.

---

## QR Dependency

| Option | Description | Selected |
|--------|-------------|----------|
| Remove it (Recommended) | No other file uses it. Clean dependency = smaller install. | ✓ |
| Keep it | Leave in package.json for potential future use. | |

**User's choice:** Remove it
**Notes:** None

---

## Layout Reflow

| Option | Description | Selected |
|--------|-------------|----------|
| You decide | Claude adjusts spacing to look natural | ✓ |
| Tighten section | Reduce vertical padding since content is shorter | |
| Keep same padding | Maintain current section-spaced padding | |

**User's choice:** You decide
**Notes:** Claude has discretion on spacing adjustments.

---

## Claude's Discretion

- Spacing/padding adjustments for the shortened LandingCTA section

## Deferred Ideas

None
