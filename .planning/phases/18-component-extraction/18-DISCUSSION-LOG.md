# Phase 18: Component Extraction - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-05-25
**Phase:** 18-component-extraction
**Areas discussed:** Language switcher design, Nav text translation, Bare link cleanup scope

---

## Language Switcher Design

### Placement

| Option | Description | Selected |
|--------|-------------|----------|
| Header right side | Next to CTA button, always visible | |
| Header dropdown menu only | Inside a dropdown, saves header space | ✓ |
| Footer only | Language selector in footer | |

**User's choice:** Header dropdown menu only
**Notes:** Dropdown trigger visible in header, options appear on click.

### Display Format

| Option | Description | Selected |
|--------|-------------|----------|
| Native text only | English · 中文 · Français — no flags | ✓ |
| Country flags + text | 🇺🇸 English · 🇨🇳 中文 · 🇫🇷 Français | |
| Short codes | EN · ZH · FR | |

**User's choice:** Native text only

### Trigger Appearance

| Option | Description | Selected |
|--------|-------------|----------|
| Globe icon + code (Recommended) | 🌐 EN ▾ — globe with language code | ✓ |
| Text only | "English ▾" — full name with chevron | |
| Globe icon only | 🌐 — icon only, no text | |

**User's choice:** Globe icon + code

---

## Nav Text Translation

### Translate Now vs Later

| Option | Description | Selected |
|--------|-------------|----------|
| Translate nav labels now | All nav items get translation keys in this phase | ✓ |
| Keep English nav, translate in Phase 19 | Phase 18 only does switcher + locale-aware links | |
| Translate header only, footer later | Header translated, footer stays English | |

**User's choice:** Translate nav labels now

### CTA and Descriptions

| Option | Description | Selected |
|--------|-------------|----------|
| Translate CTA + descriptions | "Get the App" and dropdown descriptions translated | ✓ |
| CTA stays English | Keep English CTA to match App Store badge | |
| You decide | Claude picks based on scope | |

**User's choice:** Translate CTA + descriptions

---

## Bare Link Cleanup Scope

| Option | Description | Selected |
|--------|-------------|----------|
| Convert all to getRelativeLocaleUrl now (Recommended) | All links locale-aware, some may 404 until content phases | ✓ |
| Only fix links that have locale pages | Fix what works now, leave rest as bare English | |
| Convert + add fallback redirects | Locale-aware + redirect stubs for missing pages | |

**User's choice:** Convert all now. Accepted 404 tradeoff for correct routing.

---

## Claude's Discretion

- Dropdown animation and close behavior (follow Features dropdown pattern)
- Globe icon implementation (SVG vs emoji)
- Translation key naming conventions

## Deferred Ideas

None.
