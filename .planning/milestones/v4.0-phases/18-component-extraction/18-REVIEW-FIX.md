---
phase: 18-component-extraction
fixed: 2025-05-25
findings_fixed: 3
findings_skipped: 0
---

# Phase 18: Code Review Fix Report

| Finding | Status | Commit |
|---------|--------|--------|
| WR-01 | Fixed | 28354ae |
| WR-02 | Fixed | 28354ae |
| WR-03 | Fixed | 108771d |

## Details

**WR-01:** Replaced the overly broad regex `/^\/[a-z]{2}(\/|$)/` with an explicit allowlist check against known locales (`['en', 'zh', 'fr']`). This prevents false matches on two-letter path segments that are not locales (e.g., `/uk/pricing`).

**WR-02:** Imported `APP_STORE_URL` from `../config` in Header.astro and replaced the hardcoded `https://apps.apple.com/app/tuwa` string in the CTA button href. Committed together with WR-01 since both modify Header.astro.

**WR-03:** Imported `APP_STORE_URL` from `../config` in MobileMenu.astro and replaced the hardcoded App Store URL in the mobile CTA link href.
