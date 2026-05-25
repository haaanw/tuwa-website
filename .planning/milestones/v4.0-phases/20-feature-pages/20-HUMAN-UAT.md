---
status: complete
phase: 20-feature-pages
source: [20-VERIFICATION.md]
started: 2026-05-25T15:55:00Z
updated: 2026-05-25
resolved_by: gsd-progress browser UAT (Opus 4.7), preview server localhost:4321
---

## Tests

### 1. Chinese pages visual confirmation
expected: all 5 /zh/features/* fully in Chinese, no English fragments
result: [passed-after-fix] — recovery-scoring h1 "精准掌握今日该练多狠", section headings
工作原理/兼容你已有的任意设备/专属于你的个人基准线/背后的科学原理, body in Chinese. CJK now
renders in Noto Sans SC (was system fallback before the font-variable fix — see 17-HUMAN-UAT).

### 2. French pages visual confirmation
expected: all 5 /fr/features/* fully in French, accents correct
result: [passed] — French content with correct accented characters; no English fragments
beyond proper nouns.

### 3. French text expansion layout integrity (I18N-08)
expected: French text does not overflow device frames, stat counters, CTA
result: [passed] — 0 horizontal overflow on fr feature pages at 320/768/1440 after the header
nav-gap fix. Device frames, stats, CTA accommodate longer French text.

### 4. Blog build error resolution
expected: npm run build succeeds, produces zh/fr feature pages
result: [passed] — `npm run build` exits 0, 33 pages built including dist/zh/features/* and
dist/fr/features/*. Blog-collection-empty warnings are non-fatal (blog content deferred).

## Summary

total: 4
passed: 4
issues: 0
pending: 0

## Gaps

None.
