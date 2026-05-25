---
phase: 18-component-extraction
audited: 2026-05-25
threats_total: 3
threats_closed: 3
threats_open: 0
status: secured
---

# Phase 18: Security Threat Verification

## Threat Register

| Threat ID | Category | Component | Disposition | Status | Evidence |
|-----------|----------|-----------|-------------|--------|----------|
| T-18-01 | Spoofing | Language switcher links | accept | CLOSED | Build-time static hrefs to same-origin locale paths; no user-supplied input in URL construction |
| T-18-02 | Tampering | Locale URL generation | accept | CLOSED | `getRelativeLocaleUrl()` only accepts known locale codes from hardcoded array; no runtime user input enters URL construction |
| T-18-03 | Information Disclosure | Translation strings | accept | CLOSED | All strings are public marketing copy — no secrets in locale files |

## Trust Boundaries

No new trust boundaries introduced. All changes are static HTML generation at build time with no user input, no authentication, no external API calls.

## Accepted Risks

All three threats accepted with documented rationale — static site with build-time URL generation from hardcoded locale values. No user input flows into URL construction or template rendering.

## Audit Trail

### Security Audit 2026-05-25

| Metric | Count |
|--------|-------|
| Threats found | 3 |
| Closed | 3 |
| Open | 0 |

All threats pre-accepted in PLAN.md threat models. No implementation gaps found — locale switching uses `getRelativeLocaleUrl()` with a hardcoded allowlist of known locales.
