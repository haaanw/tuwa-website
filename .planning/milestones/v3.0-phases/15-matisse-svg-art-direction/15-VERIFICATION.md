---
phase: 15-matisse-svg-art-direction
verified: 2026-05-16T05:46:36Z
status: passed
score: 6/6 requirements verified; human preference resolved
overrides_applied: 0
human_verification:
  - test: "Choose which feature-page decoration approach should remain"
    expected: "A: cluster, B: divider, or C: neither"
    result: "PASSED: product owner selected A: cluster; divider treatment removed"
    why_human: "Both approaches were intentionally rendered for visual comparison per D-09; final art-direction taste call belonged to the product owner"
---

# Phase 15: Matisse SVG Art Direction Verification Report

**Phase Goal:** Add a distinct art-direction layer specifically inspired by Henri Matisse's *The Swimming Pool*: a long blue cut-paper aquatic frieze, not generic biomorphic blobs.
**Verified:** 2026-05-16T05:46:36Z
**Status:** passed

## Correction Note

The first implementation read as generic muted Matisse-style blobs. The corrected implementation now uses:

- Original blue aquatic cut-paper forms instead of round blobs.
- A stronger horizontal pool-wall/tile 条带 running through the hero background, echoing the frieze quality of *The Swimming Pool*.
- A cool blue-only palette (`#1E5B9A`, `#2D78BA`, `#174A82`) instead of green/terracotta/gold.
- Feature-page fragments that feel like small pieces of the same pool frieze.

## Goal Achievement

| Truth | Status | Evidence |
|---|---|---|
| Hero renders a horizontal pool-like frieze behind headline and device frame | VERIFIED | `Hero.astro` renders `MatisseFrieze`; screenshot `screenshots/swimming-pool/home-borderless-strip.png` shows a borderless handmade 条带 crossing the iPhone midsection with content readable |
| Hero uses abstract human movement cut-paper shapes | VERIFIED | `.matisse-frieze .matisse-shape` count is 10; `MatisseShape.astro` paths use varied, flexible movement marks with rougher scissor-cut contours |
| Palette uses Swimming Pool blues | VERIFIED | Frieze fills: `#1E5B9A`, `#2D78BA`, `#174A82`; pale pool band uses `--color-matisse-tile` |
| Feature pages render lighter decorative fragments | VERIFIED | Feature decorations use `fill-opacity` values from `0.14` to `0.20`; product owner selected the lighter cluster treatment and the divider was removed |
| Each feature page receives a unique primary blob | VERIFIED | `coaching=blob-1`, `cold-start=blob-2`, `recovery-scoring=blob-3`, `smart-templates=blob-4`, `workload-tracking=blob-5` |
| Animations respect reduced motion and parallax is progressive enhancement | VERIFIED | Animation CSS is inside `prefers-reduced-motion: no-preference`; reduced-motion override disables shape animations; scroll parallax is inside `@supports (animation-timeline: scroll())` |

## Visual QA

| View | Artifact | Result |
|---|---|---|
| Desktop hero | `screenshots/swimming-pool/home-borderless-strip.png` | PASS: blue pool-frieze 条带 is visible edge-to-edge, lower through the iPhone body; strip has no border or internal grid |
| Mobile hero | `screenshots/swimming-pool/home-borderless-strip-mobile.png` | PASS: headline fits, device remains centered, and the lower strip remains visible without crowding the copy |
| Feature page selected treatment | `screenshots/swimming-pool/coaching-cluster-final.png` | PASS: selected cluster uses the same blue cut-paper fragment language; no divider appears after the screenshot |
| Mobile layout | Browser viewport 390x900 DOM check | PASS: `scrollWidth === clientWidth`; hero copy and frieze remain inside viewport |

## Automated Checks

| Command | Result |
|---|---|
| `npm run build` | PASS |
| `npx astro check` | PASS, with existing Astro/Zod deprecation hints only |
| `npx tsc --noEmit` | PASS |
| `npm ls vite --all` | PASS: single deduped `vite@7.3.3` shared by Astro and `@tailwindcss/vite` |
| `rg "approach=|matisse-divider" src` | PASS: no divider treatment remains in source |
| Browser DOM check on `/features/coaching/` | PASS: 1 `.matisse-cluster`, 0 `.matisse-divider`, `scrollWidth === clientWidth` |
| Browser DOM check on `/` | PASS: 10 `.matisse-frieze .matisse-shape`, 0 `.matisse-divider`, `scrollWidth === clientWidth` |
| Browser DOM check on `/` handmade strip | PASS: 1 `.matisse-pool-band`, 2 `.matisse-pool-edge`, 0 grid/seam/waterline paths, `scrollWidth === clientWidth` |
| Browser DOM check on `/` borderless strip | PASS: 1 `.matisse-pool-band`, 0 `.matisse-pool-edge`, 0 grid/seam/waterline paths, `scrollWidth === clientWidth` |

## Adjustments Made During Verification

- Preserved SVG placement transforms by wrapping transformed shapes in `<g>` and animating the child path.
- Switched shape transparency from `opacity` to `fill-opacity`, so entrance animations do not flatten decorative alpha values.
- Removed the global `fill: currentColor` override so terracotta and gold fills render correctly.
- Repositioned and tuned the hero frieze so it reads as a band behind the subtitle/device rather than a low row of marks.
- Added `width: 100%` to hero/feature text wrappers to keep narrow viewport layout inside the page width.
- Aligned root `vite` to `7.3.3` so Astro check and TypeScript use the same Vite type package as Astro 6.3.1.
- Reworked the art direction after product feedback to use *The Swimming Pool* as the specific source: blue aquatic frieze, pale tile band, swimmer/wave cut-outs, and blue feature fragments.
- Strengthened the hero composition after product feedback so the reference reads as an actual horizontal 条带 passing through the hero background, not scattered motifs.
- Removed the feature-page divider treatment after product owner selected the cluster approach.
- Replaced the remaining blob-like hero shapes with abstract dancer/swimmer silhouettes.
- Strengthened the horizontal tile strip with clearer band fill, top/bottom lines, seams, and a midline.
- Moved the hero frieze lower so the strip crosses around the iPhone body instead of the subtitle area.
- Loosened the figure vocabulary again after feedback: removed literal head/body cues and introduced jazz-like off-beat placement, sharper angles, and abrupt scale shifts.
- Replaced the rectangular strip and internal grid with an irregular filled band plus handmade top/bottom edge strokes.
- Added rougher figure contours and a faint stroke so the shapes feel more like cut paper than polished vector marks.
- Removed the top/bottom strip edge paths so the 条带 is borderless while keeping the irregular fill.

## Human Decision Resolved

The feature-page decoration checkpoint is resolved:

- **A: Cluster** selected — small top-right corner shape group, subtle and page-specific.
- **B: Divider** removed — no `approach="divider"` or `.matisse-divider` source usage remains.
