# Phase 20: Feature Pages - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-05-25
**Phase:** 20-feature-pages
**Areas discussed:** Translation file organization, Inline content extraction, FeatureCTA translation, Locale page structure

---

## Translation File Organization

| Option | Description | Selected |
|--------|-------------|----------|
| One file per page | recovery-scoring.ts, workload-tracking.ts, etc. per locale. Matches home.ts pattern. Coaching isolated. | ✓ |
| Single features.ts | All 5 pages' keys in one file per locale. Simpler count but coaching bloats it. | |
| You decide | Claude picks based on content volume. | |

**User's choice:** One file per page (Recommended)
**Notes:** None

---

## Inline Content Extraction

| Option | Description | Selected |
|--------|-------------|----------|
| Full extraction to t() keys | ALL text becomes translation keys. Wrapper pages are thin. Consistent with Phase 19. | ✓ |
| Layout props only, body in wrappers | Only title/hookLine via t(). Long paragraphs written directly in wrapper .astro files. | |
| You decide | Claude picks based on maintainability. | |

**User's choice:** Full extraction to t() keys (Recommended)
**Notes:** None

---

## FeatureCTA Translation

| Option | Description | Selected |
|--------|-------------|----------|
| Make locale-aware | Add locale prop, useTranslations() for headline/body/badge. CTA keys in common.ts. | ✓ |
| Keep English everywhere | CTA stays English on zh/fr pages. Simpler but inconsistent. | |
| You decide | Claude picks the approach. | |

**User's choice:** Make locale-aware (Recommended)
**Notes:** None

---

## Locale Page Structure

| Option | Description | Selected |
|--------|-------------|----------|
| Thin wrappers + locale prop | zh/features/recovery-scoring.astro imports same layout, passes locale. Minimal duplication. | ✓ |
| Full page copies with translated HTML | Each wrapper contains full page content. No t() keys but 3x maintenance burden. | |
| You decide | Claude picks based on patterns. | |

**User's choice:** Thin wrappers + locale prop (Recommended)
**Notes:** None

---

## Claude's Discretion

- Translation key naming within feature namespaces
- Coaching.ts key structure (flat vs nested for named slots)
- Alt text and meta description translations
- Screenshot/device frame alt text

## Deferred Ideas

None — discussion stayed within phase scope.
