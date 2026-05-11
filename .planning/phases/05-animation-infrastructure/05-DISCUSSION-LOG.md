# Phase 5: Animation Infrastructure - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-05-11
**Phase:** 05-animation-infrastructure
**Areas discussed:** Controller placement, No-JS fallback, Reduced-motion scope

---

## Controller Placement

| Option | Description | Selected |
|--------|-------------|----------|
| BaseLayout script tag | Add single `<script is:inline>` in BaseLayout.astro. Every page gets it automatically. Remove duplicates from FeatureCTA and LandingCTA. Simplest fix, matches existing pattern. | ✓ |
| AnimationController.astro component | Create src/components/AnimationController.astro with the script inside. Import in BaseLayout. More modular, one extra file. | |
| You decide | Claude picks whichever approach fits best. | |

**User's choice:** BaseLayout script tag (Recommended)
**Notes:** None — straightforward selection.

---

## No-JS Fallback

| Option | Description | Selected |
|--------|-------------|----------|
| JS-applied class | CSS only hides elements when `.js-enabled` class is on `<html>`. AnimationController adds this class first. No JS = no class = elements fully visible. | ✓ |
| noscript style override | Keep current CSS (opacity:0 default). Add `<noscript><style>` block overriding data-animate to opacity:1. | |
| You decide | Claude picks the approach. | |

**User's choice:** JS-applied class (Recommended)
**Notes:** None — straightforward selection.

---

## Reduced-Motion Scope

| Option | Description | Selected |
|--------|-------------|----------|
| Instant reveal, zero animation | Elements start visible. No animation, no transition, no fade. Meets 'zero motion' success criteria literally. | ✓ |
| Subtle opacity crossfade | Keep 200ms opacity transition for reduced-motion users. Gentle fade-in, no movement. Doesn't meet strict 'zero motion' reading. | |
| You decide | Claude picks based on accessibility best practices. | |

**User's choice:** Instant reveal, zero animation (Recommended)
**Notes:** None — strictest accessibility interpretation chosen.

---

## Claude's Discretion

- Observer threshold value (currently 0.15)
- Whether to use rootMargin for earlier/later trigger points
- Script placement within BaseLayout (before or after footer)

## Deferred Ideas

None — discussion stayed within phase scope.
