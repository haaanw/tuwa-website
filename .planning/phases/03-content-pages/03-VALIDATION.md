# Phase 3: Content Pages - Validation Map

**Created:** 2026-05-11
**Purpose:** Maps each phase requirement to its automated verification command.

---

## Requirement -> Verification Map

| Req ID | Description | Automated Command | Pass Criteria |
|--------|-------------|-------------------|---------------|
| FEAT-01 | Recovery Scoring page renders | `npm run build 2>&1 \| grep -c "features/recovery-scoring"` | Output >= 1 (route generated) |
| FEAT-02 | Workload Tracking page renders | `npm run build 2>&1 \| grep -c "features/workload-tracking"` | Output >= 1 (route generated) |
| FEAT-03 | Smart Templates page renders | `npm run build 2>&1 \| grep -c "features/smart-templates"` | Output >= 1 (route generated) |
| FEAT-04 | Cold-Start page renders | `npm run build 2>&1 \| grep -c "features/cold-start"` | Output >= 1 (route generated) |
| FEAT-05 | Coaching page renders | `npm run build 2>&1 \| grep -c "features/coaching"` | Output >= 1 (route generated) |
| FEAT-06 | Unique OG image per feature page | `ls public/og/*.png \| wc -l` | Output = 5 (one per feature page) |
| FEAT-06 | OG image props set uniquely | `grep -r 'ogImage="/og/' src/pages/features/ \| wc -l` | Output = 5 (each page has unique path) |
| FEAT-07 | 4 standard pages use FeaturePageLayout | `grep -rl "FeaturePageLayout" src/pages/features/ \| wc -l` | Output = 4 |
| FEAT-07 | Coaching page uses CoachingPageLayout | `grep -c "CoachingPageLayout" src/pages/features/coaching.astro` | Output = 1 |
| FEAT-08 | Copy tone | Manual review by user (D-06) | User approves during checkpoint |
| LEGAL-01 | Privacy page renders | `npm run build 2>&1 \| grep -c "/privacy"` | Output >= 1 |
| LEGAL-02 | Terms page renders | `npm run build 2>&1 \| grep -c "/terms"` | Output >= 1 |
| LEGAL-03 | Support page renders | `npm run build 2>&1 \| grep -c "/support"` | Output >= 1 |
| LEGAL-04 | Redirects configured | `cat public/_redirects \| wc -l` | Output = 3 (three redirect rules) |

## Type Safety

| Check | Command | Pass Criteria |
|-------|---------|---------------|
| Astro type check | `npx astro check` | Exit code 0, no errors |
| Build succeeds | `npm run build` | Exit code 0 |

## Composite Verification Command

Run all automated checks in sequence:

```bash
cd /Users/hanwen/Desktop/tuwa-website && \
npm run build && \
npx astro check && \
echo "--- OG images ---" && \
ls -la public/og/*.png 2>/dev/null | wc -l && \
echo "--- FeaturePageLayout usage ---" && \
grep -rl "FeaturePageLayout" src/pages/features/ | wc -l && \
echo "--- CoachingPageLayout usage ---" && \
grep -c "CoachingPageLayout" src/pages/features/coaching.astro && \
echo "--- Redirects ---" && \
cat public/_redirects | wc -l && \
echo "--- Unique ogImage props ---" && \
grep -r 'ogImage="/og/' src/pages/features/ | wc -l && \
echo "ALL CHECKS PASSED"
```

Expected output:
- Build: 0 errors
- Astro check: 0 errors
- OG images: 5
- FeaturePageLayout usage: 4
- CoachingPageLayout usage: 1
- Redirects: 3
- Unique ogImage props: 5
