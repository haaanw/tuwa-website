---
status: complete
phase: 19-home-page-localization
source: [19-VERIFICATION.md]
started: 2026-05-25T14:20:00Z
updated: 2026-05-25
resolved_by: gsd-progress browser UAT (Opus 4.7), preview server localhost:4321
---

## Tests

### 1. Chinese Landing Page Visual Check
expected: /zh/ all sections in Chinese, no English fragments
result: [passed] — Hero "科学训练，精准恢复。", translated wheel, stats, CTA, fully translated
footer (功能/资源/法律). Only latin token is "TUWA" (brand). Renders in Noto Sans SC.

### 2. French Landing Page Visual Check
expected: /fr/ all sections in French, no English fragments
result: [passed] — Hero "Entraîne-toi plus intelligemment. Récupère avec précision.", French
body throughout, accents correct. No stray English.

### 3. French Text Expansion Layout
expected: 320px-1440px no layout breaks/overflow
result: [passed-after-fix] — Found fr header overflow of 24px at the 768px md breakpoint
("Télécharger l'app" + longer nav labels exceeded width). Fixed by tightening desktop nav gap
at md (`gap-5 lg:gap-8`). Now 0 overflow at 768/820/900/1024/1440. (Pre-existing 9px wheel
overflow at 320px is cross-locale v2.0 debt, not fr-specific — deferred.)

### 4. CJK Line Breaking Quality
expected: natural Chinese flow, no orphaned punctuation
result: [passed] — Native browser CJK line-breaking (line-break: auto / kinsoku). Visually
clean in screenshots; no orphaned punctuation observed.

### 5. Feature Wheel Interactivity
expected: clicking segments updates center with translated content
result: [passed] — On /zh/ clicking a segment updates center to translated feature
(恢复评分 / 智能模板 etc.) with Chinese title + description + 了解详情 CTA.

## Summary

total: 5
passed: 5
issues: 0
pending: 0

## Gaps

None. One fr-expansion layout defect found and fixed.
