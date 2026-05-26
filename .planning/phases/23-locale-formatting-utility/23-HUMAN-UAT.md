---
status: partial
phase: 23-locale-formatting-utility
source: [23-VERIFICATION.md]
started: 2026-05-26T12:50:00Z
updated: 2026-05-26T12:50:00Z
---

## Current Test

[awaiting human testing]

## Tests

### 1. Visual verification on built /zh/blog/ page
expected: Every visible date on the zh blog index renders as `2026年5月25日`-style (Chinese long format), NOT `May 25, 2026`. Note: blog content collection is currently empty (only .gitkeep), so empty-state copy renders today — re-verify when the first blog post lands in Phase 24.
result: [pending]

### 2. Visual verification on built /fr/blog/ page
expected: Every visible date renders as `25 mai 2026`-style (French long, lowercase month), NOT `May 25, 2026`. Same content-empty caveat as above.
result: [pending]

### 3. Visual verification on /blog/ (en) page
expected: en dates still render as `May 25, 2026` (unchanged visual contract D-06).
result: [pending]

### 4. Counter locale verification on /fr/ route
expected: On the /fr/ homepage, the StatsCounter for the value 85000 renders with a French thousands separator (narrow no-break space: `85 000`), NOT a comma. en/zh both use comma format and look identical visually for this value.
result: [pending]

## Summary

total: 4
passed: 0
issues: 0
pending: 4
skipped: 0
blocked: 0

## Gaps
