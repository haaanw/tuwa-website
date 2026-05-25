# Phase 19: Home Page Localization - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-05-25
**Phase:** 19-home-page-localization
**Areas discussed:** Translation delivery, Content source, Layout adaptation, New components scope

---

## Translation Delivery Pattern

| Option | Description | Selected |
|--------|-------------|----------|
| useTranslations() inside | Same pattern as Phase 18. Each component calls useTranslations(locale) internally. | ✓ |
| Pass t object as prop | Parent page calls useTranslations(), passes t to children. | |
| Pass individual strings | Parent passes each translated string as a separate prop. | |

**User's choice:** useTranslations() inside (Recommended)
**Notes:** Consistent with Phase 18 pattern established in Footer/MobileMenu/Header.

---

## Content Source

| Option | Description | Selected |
|--------|-------------|----------|
| Claude drafts all | Claude writes natural zh and fr translations inline during execution. | ✓ |
| You provide translations | User supplies zh/fr text manually. | |
| Placeholder text for now | Use lorem-ipsum-style placeholder. | |

**User's choice:** Claude drafts all (Recommended)
**Notes:** None — straightforward choice for marketing copy.

---

## Layout Adaptation

| Option | Description | Selected |
|--------|-------------|----------|
| Fluid layout only | Trust existing responsive design. Fix only if UAT reveals actual breaks. | ✓ |
| Proactive font-size reduction | Slightly smaller font-size on fr for headlines. | |
| Per-locale line breaks | Manually control line breaks in French strings. | |

**User's choice:** Fluid layout only (Recommended)
**Notes:** None — fix reactively rather than preemptively.

---

## New Components Scope

| Option | Description | Selected |
|--------|-------------|----------|
| Yes, translate them too | These are now part of the landing page. Phase 19 should wire translations for all. | ✓ |
| No, English homepage only | Only translate the 4 original components. | |
| Check what's on the page first | Let Claude inspect which components are actually rendered. | |

**User's choice:** Yes, translate them too
**Notes:** Investigation revealed these components don't exist on disk (were in git untracked but lost). Decision recorded as conditional: translate if they exist when Phase 19 executes.

---

## Claude's Discretion

- Translation key naming within home namespace
- Whether to use separate home.ts or inline in common.ts
- Alt text translations
- Meta title/description translations

## Deferred Ideas

- New landing page components — translate when committed
- RTL language support — not in milestone scope
