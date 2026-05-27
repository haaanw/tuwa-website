# Roadmap: Tuwa Marketing Website

## Milestones

- ✅ **v1.0 MVP** -- Phases 1-4 (shipped 2026-05-11)
- ✅ **v2.0 Visual Overhaul & Polish** -- Phases 5-10 (shipped 2026-05-14)
- ✅ **v3.0 Art Direction & Interaction Polish** -- Phases 11-16 (shipped 2026-05-16)
- ✅ **v4.0 Multi-Language Support** -- Phases 17-22 (shipped 2026-05-25)
- 🔄 **v4.1 Internationalization Follow-ups** -- Phases 23-25 (in progress)

## Phases

<details>
<summary>✅ v1.0 MVP (Phases 1-4) -- SHIPPED 2026-05-11</summary>

- [x] Phase 1: Foundation (3/3 plans) -- completed 2026-05-10
- [x] Phase 2: Landing Page (2/2 plans) -- completed 2026-05-10
- [x] Phase 3: Content Pages (4/4 plans) -- completed 2026-05-11
- [x] Phase 4: Blog + Polish (3/3 plans) -- completed 2026-05-11

</details>

<details>
<summary>✅ v2.0 Visual Overhaul & Polish (Phases 5-10) -- SHIPPED 2026-05-14</summary>

- [x] Phase 5: Animation Infrastructure (1/1 plan) -- completed 2026-05-11
- [x] Phase 6: Screenshot Presentation (2/2 plans) -- completed 2026-05-11
- [x] Phase 7: Animation Polish (2/2 plans) -- completed 2026-05-12
- [x] Phase 8: UI/UX Visual Depth (4/4 plans) -- completed 2026-05-13
- [x] Phase 8.1: FeatureGrid Click Wheel (1/1 plan) -- completed 2026-05-14
- [x] Phase 9: Deployment & Responsive (2/2 plans) -- completed 2026-05-14
- [x] Phase 10: v2.0 Cleanup (1/1 plan) -- completed 2026-05-14

</details>

<details>
<summary>✅ v3.0 Art Direction & Interaction Polish (Phases 11-16) -- SHIPPED 2026-05-16</summary>

- [x] Phase 11: CSS Foundation & Token System (1/1 plan) -- completed 2026-05-15
- [x] Phase 12: Device Frame Realism (1/1 plan) -- completed 2026-05-15
- [x] Phase 13: QR Code Removal (1/1 plan) -- completed 2026-05-15
- [x] Phase 14: Typography Weight Rollout (2/2 plans) -- completed 2026-05-15
- [x] Phase 15: Matisse SVG Art Direction (2/2 plans) -- completed 2026-05-15
- [x] Phase 16: Interaction Polish (2/2 plans) -- completed 2026-05-16

</details>

<details>
<summary>✅ v4.0 Multi-Language Support (Phases 17-22) -- SHIPPED 2026-05-25</summary>

**Goal:** Chinese (zh) and French (fr) translations across all 10 pages with i18n routing,
a language switcher, and full SEO compliance (hreflang, localized sitemap, per-locale 404s).

- [x] Phase 17: i18n Infrastructure (3/3 plans) -- completed 2026-05-17
- [x] Phase 18: Component Extraction (2/2 plans) -- completed 2026-05-25
- [x] Phase 19: Home Page Localization (2/2 plans) -- completed 2026-05-25
- [x] Phase 20: Feature Pages (5/5 plans) -- completed 2026-05-25
- [x] Phase 21: Legal, Support & Blog (2/2 plans) -- completed 2026-05-25
- [x] Phase 22: SEO Verification & Polish (2/2 plans) -- completed 2026-05-25

Full phase details: `.planning/milestones/v4.0-ROADMAP.md`

</details>

### v4.1 Internationalization Follow-ups (Phases 23-25) -- IN PROGRESS

**Goal:** Complete the deferred i18n surface on top of the v4.0 trilingual foundation:
locale-aware date formatting, blog post translation routing, and per-locale OG images.

- [x] **Phase 23: Locale Formatting Utility** - Shared Intl date/number formatting; remove hardcoded locale strings (I18N-21) (completed 2026-05-26)
- [ ] **Phase 24: Blog Translation Infrastructure** - Locale field in schema, zh/fr blog routes, locale-filtered listings + hreflang (I18N-18/19/20)
- [ ] **Phase 25: Translated OG Images via Satori** - Per-locale OG PNGs with correct CJK/French glyphs (I18N-15/16/17)

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 23. Locale Formatting Utility | 1/1 | Complete    | 2026-05-27 |
| 24. Blog Translation Infrastructure | 0/TBD | Not started | - |
| 25. Translated OG Images via Satori | 0/TBD | Not started | - |

## Phase Details

### Phase 23: Locale Formatting Utility
**Goal**: Dates across the site are formatted correctly for each visitor's locale with no hardcoded locale strings
**Depends on**: Phase 22 (v4.0 complete)
**Requirements**: I18N-21
**Success Criteria** (what must be TRUE):
  1. A zh blog listing card displays a date in Chinese format (e.g. "2026年5月25日"), not "May 25, 2026"
  2. A fr blog listing card displays a date in French format (e.g. "25 mai 2026"), not "May 25, 2026"
  3. `grep -r "toLocaleDateString" src/` returns zero hits outside `src/i18n/format.ts` — no inline locale strings remain
  4. `npx tsc --noEmit` passes with zero errors after the utility is integrated
**Plans**: 1 plan
- [x] 23-01-PLAN.md — Create src/i18n/format.ts and migrate 4 date + 3 number call sites onto it

### Phase 24: Blog Translation Infrastructure
**Goal**: zh and fr blog routes exist and serve only their locale's posts; the blog schema enforces locale; hreflang on blog pages reflects only present locales
**Depends on**: Phase 23 (locale formatting utility)
**Requirements**: I18N-18, I18N-19, I18N-20
**Success Criteria** (what must be TRUE):
  1. `content.config.ts` has a `locale` field with a Zod enum (`z.enum(['en','zh','fr'])`) and a build error is triggered if a post omits it
  2. After `astro build`, `find dist/zh/blog -name "index.html" | wc -l` equals the count of zh-locale posts (not all posts)
  3. Visiting `/zh/blog/` in a browser shows zero English-authored posts; the page is empty (or shows a "no posts yet" state) if no zh posts exist — it does NOT show English fallbacks
  4. An English-only test post's built HTML contains exactly one `hreflang` tag (`hreflang="en"`) and one `hreflang="x-default"`, and no `hreflang="zh"` or `hreflang="fr"` tags
  5. `npx tsc --noEmit` passes after schema and route changes
**Plans**: TBD
**UI hint**: yes

### Phase 25: Translated OG Images via Satori
**Goal**: Every zh and fr page serves a locale-specific OG image with correctly rendered localized text — no English text on translated pages, no tofu/empty boxes for CJK
**Depends on**: Phase 24 (blog infrastructure; blog OG endpoint needs locale-filtered slug list)
**Requirements**: I18N-15, I18N-16, I18N-17
**Success Criteria** (what must be TRUE):
  1. After `astro build`, `find dist/og -name "*.png" | wc -l` equals 21 (7 pages × 3 locales) — all OG PNGs are generated
  2. Open `dist/og/zh/home.png` (or equivalent) in a PNG viewer and confirm Chinese characters are legible text, not empty boxes (tofu) — this is the hard CJK render gate
  3. Open `dist/og/zh/home.png` and compare a bold heading against body copy — visually distinct stroke weights confirm both weight=400 and weight=700 Noto Sans SC are registered in satori
  4. `time astro build` completes in under 60 seconds — module-level font cache is in effect
  5. `grep -r "ogImage" src/pages/zh src/pages/fr` shows every zh and fr page referencing an `/og/zh/` or `/og/fr/` path, not `/og/en/` — no translated page falls back to the English OG card
**Plans**: TBD
**UI hint**: yes
