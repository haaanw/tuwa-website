# Phase 13: QR Code Removal - Context

**Gathered:** 2026-05-15
**Status:** Ready for planning

<domain>
## Phase Boundary

Remove the QR code and adjacent App Store badge from the LandingCTA section on the landing page. Keep the closing headline and supporting copy as a statement block. Remove the `qrcode` npm dependency. Verify zero layout shift and that header, hero, and footer CTAs remain functional.

</domain>

<decisions>
## Implementation Decisions

### Section Content
- **D-01:** Keep the closing headline ("Built for athletes who take training seriously.") and supporting copy paragraph
- **D-02:** Remove the entire badge+QR flex container (App Store badge link + QR code block)
- **D-03:** Remove the `QRCode` import and `qrSvg` generation code from the component frontmatter
- **D-04:** Remove the `APP_STORE_URL` import from LandingCTA.astro (no longer used after badge removal)

### Dependency Cleanup
- **D-05:** Remove `qrcode` npm package from package.json — no other file uses it

### Remaining CTAs (must stay functional)
- **D-06:** Header CTA button — untouched (different component)
- **D-07:** Hero App Store badge in Hero.astro — untouched
- **D-08:** Footer App Store badge in Footer.astro — untouched

### Claude's Discretion
- Spacing/padding adjustments for the now-shorter LandingCTA section — tune visually so the closing statement feels balanced without the badge+QR block below it

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Primary Target
- `src/components/LandingCTA.astro` — Component to modify (remove QR+badge block, keep headline+copy)
- `src/pages/index.astro` line 6, 15 — Imports and uses LandingCTA

### CTAs That Must Remain
- `src/components/Hero.astro` lines 54-66 — Hero App Store badge (CTA-03)
- `src/components/Footer.astro` lines 17-25 — Footer App Store badge (CTA-03)
- `src/config.ts` — APP_STORE_URL constant (still used by Hero, Footer, FeatureCTA)

### Requirements
- `.planning/REQUIREMENTS.md` — CTA-01, CTA-02, CTA-03

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `APP_STORE_URL` in `src/config.ts` — still needed by Hero, Footer, FeatureCTA (do not remove)
- `data-animate` attribute on LandingCTA section — keep for scroll-reveal consistency

### Established Patterns
- `section-spaced` class for section vertical padding — keep on the section element
- `data-animate` scroll-reveal pattern — keep on the section

### Integration Points
- `src/pages/index.astro` — imports LandingCTA (component stays, just simplified)
- `package.json` — remove `qrcode` dependency

</code_context>

<specifics>
## Specific Ideas

- Section becomes a clean closing statement — headline + one paragraph, no action button. Downloads handled by header, hero, and footer.

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 13-qr-code-removal*
*Context gathered: 2026-05-15*
