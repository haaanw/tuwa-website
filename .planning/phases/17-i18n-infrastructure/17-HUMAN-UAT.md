---
status: complete
phase: 17-i18n-infrastructure
source: [17-VERIFICATION.md]
started: 2026-05-15
updated: 2026-05-25
resolved_by: gsd-progress browser UAT (Opus 4.7), preview server localhost:4321
---

## Tests

### 1. Chinese renders in Noto Sans SC (not system fallback)
expected: CJK glyphs render in Noto Sans SC on /zh/ pages
result: [passed-after-fix] — Found and fixed a real defect: CJKLayout/zh pages set the
unused CSS var `--font-sans` (and wrong font name 'General Sans Variable') instead of the
consumed `--font-general-sans`, so Noto Sans SC never entered the cascade — CJK fell back to
system-ui. Fixed across all zh pages (home via new CJKFonts component, 10 others via corrected
override + `html[lang="zh"]` selector to beat global.css). Verified live:
`document.fonts.check('16px "Noto Sans SC"', '科')` → true on home, feature, privacy, support,
blog; computed h1 stack now includes "Noto Sans SC".

### 2. English pages load identically (no new network requests)
expected: EN unprefixed URLs ship zero CJK CSS/fonts
result: [passed] — Fresh EN load requests only GeneralSans-Variable.woff2, 0 noto requests.
Noto base64 CSS lives in a separate bundle (700.*.css) linked ONLY by zh pages; no EN/FR page
links it. Isolation preserved after the fix.

### 3. French œ ligature (U+0153) renders
expected: General Sans displays œ correctly on /fr/
result: [passed] — `document.fonts.check('16px "General Sans"', 'œ')` → true. /fr/ h1
"Entraîne-toi plus intelligemment. Récupère avec précision." renders with correct accents.

## Summary

total: 3
passed: 3
issues: 0
pending: 0

## Gaps

None. One defect found and fixed during resolution (CJK font variable mismatch).
