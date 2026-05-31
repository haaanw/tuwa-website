# Tuwa UI Polish Plan — round 2

## Implemented (codex + workflow synthesis) — DEPLOYED ✅

Codex critique (read-only) and the 5-agent workflow audit converged; shipped the high-impact union:
- **Heading scale** — added `--text-subheading` (20px) + `--text-lede` (21px) tokens; topic h1 → `--weight-display`; feature-page h1 → `--weight-display`; all feature-page h3 bumped from body size → subheading (14 files).
- **Topic pages → magazine layout** — `TopicPageLayout` now a 2-col grid: section heading as a sticky left-rail kicker (accent top rule), reading column right; first paragraph styled as a lede.
- **/compare → real comparison table** — added `TopicComparison` type; authored 7-row table (Dimension / Generic tracker / Tuwa, Tuwa column tinted) in en/zh/fr, replacing prose bullets.
- **Bullets → signal cards**; **related links → hover card grid w/ arrow**; **references → compact 2-col hanging-indent citations**.
- **StatsCounter tiles** — editorial top rule + 32×2 accent mark (no heavy cards).
- **App Store badge** — dropped `.btn-cta` (was distorting the SVG); new `.app-store-badge` affordance (LandingCTA + FeatureCTA).
- **Charts** — wrapped in light figure panels with a real `<h3>` title; General Sans font, softer gridlines, dark tooltips.
- **Quick wins** — `.btn-cta` resting shadow; skip-link hover + shadow; chevron easing → brand curve; dropdown icon breathing room.

Build: `npm run build` ✓ 48 pages. Visually verified via headless browser (compare table, magazine grid, stats tiles, references). Commit + push → Cloudflare deploy.

Deferred (lower impact): footer column rebalance, DeviceFrame placeholder gradient, hero micro-spacing, `.prose-*` utility extraction, header backdrop opacity.

---



Synthesis of 5 reviewer reports (Topic/Hub pages, Homepage, Shared Chrome, Feature Pages & Charts, Cross-Site Consistency). All findings below were spot-verified against the actual source — file paths, line numbers, token names, and current values are real. The dominant theme across reviewers: the site has a strong foundation (palette, typography tokens, Matisse system, animations) but the long-form content surfaces (topic pages, charts, stats, footer) read as "shipped early" because heading hierarchy collapses to body size, links and buttons lack consistent treatment, and inline styles have drifted between page types.

A cross-cutting root cause shows up in 3 separate reports: **h3 is styled `font-size: var(--text-body)` (16px) + `weight-heading` (300), making subheadings visually identical to body text**, and **h1 uses `--weight-heading` (300) instead of the lighter `--weight-display` (200) the token system reserves for headlines**. Fixing the typographic scale once, in `global.css`, resolves findings from the Topic, Feature, and Consistency reviewers simultaneously — which is why it ranks first.

---

## Top elevations (ranked by visual impact / effort)

1. **Fix the broken heading scale (h3 == body, h1 too heavy).** Raw now: h3 collapses to 16px/300 (TopicPageLayout.astro:79, feature pages), so subheadings read as bold body text; h1 uses `--weight-heading` (300) instead of `--weight-display` (200). Fix: add a `--text-subheading: 18px` token to `global.css` (it does not exist yet — sits between `--text-body` 16px and `--text-heading` 28px); set h3 to `font-size: var(--text-subheading); font-weight: var(--weight-heading); margin-top: var(--space-lg)`; change every page h1 to `font-weight: var(--weight-display)` (TopicPageLayout.astro:32, FeaturePageLayout.astro:29). This single change restores hierarchy across topic + feature pages. Effort: **S**.

2. **Turn the `/compare` prose-bullet "comparison" into a real table.** Raw now: 7 generic-tracker-vs-Tuwa items render as `<li>` disc bullets (compare.ts + TopicPageLayout.astro:88-94) — content-dense, unscannable, and the single most important decision page on the site reads as a list of sentences. Fix: build `TopicComparisonTable.astro` (3-col grid: Aspect / Generic Tracker / Tuwa; `thead` on `--color-surface` with `--weight-label`; `tbody` cells with `border-bottom: 1px solid var(--color-divider)`, `padding: var(--space-md)`; single column on mobile). Render conditionally when a section carries comparison pairs. Effort: **M**.

3. **Give StatsCounter tiles a real container + icon + accent.** Raw now: three bare `<div>`s with h3+p, no container, no icon, no shadow, h3 uses `--weight-body` (500) (StatsCounter.astro:39-63) — reads as a bulleted list pretending to be design, and sits between two flat surface sections. Fix: wrap each tile in `--color-surface-el` bg, `1px solid --color-divider`, `--radius-md`, ~20px padding, `border-left: 2px solid var(--color-accent)`, `--shadow-card`; add a 24px SVG icon (lock / microscope / lightning); set h3 to `--weight-heading` (300) at 18px. Effort: **M**.

4. **Restyle topic-page "related links" as cards.** Raw now: plain underlined `<ul>` (TopicPageLayout.astro:115-124) — flat, undifferentiated from body, no hover. Fix: `grid-cols-1 md:grid-cols-3` of cards (`--color-surface`, `1px solid --color-divider`, `--radius-md`, `--space-md` padding, `min-height: 80px`), link as block, text-decoration none, color `--color-text-1`, small arrow glyph right-aligned; hover → `--color-surface-el` + `--shadow-card-hover`, transitioned with `--ease-interactive`. Effort: **M**.

5. **Add resting depth to `.btn-cta`.** Raw now: no box-shadow at rest (global.css:255-264) — the primary CTA reads flat against the travertine bg; shadow only appears on hover. Fix: add `box-shadow: 0 2px 6px rgba(43,82,64,0.12);` to the base `.btn-cta` rule so the hover shadow (line 267) becomes a natural lift, not a pop-in. High visual payoff on the most-clicked element. Effort: **S**.

6. **Unstyle the App Store badge link in LandingCTA (and rebalance footer columns).** Raw now: the badge `<a>` carries `class="btn-cta inline-block"` (LandingCTA.astro:51), so the SVG badge inherits button padding/bg/border-radius and a `scale(1.02)` hover that distorts it — semantically and visually wrong. Fix: drop `btn-cta`, keep `inline-block`; the badge SVG is its own affordance. Pair with rebalancing the Footer Resources column (7 links vs 5/2 elsewhere, Footer.astro:54-66) into a ~4/6/4/2 distribution. Effort: **S** (badge) + **M** (footer).

7. **Replace flat chart styling with the brand palette.** Raw now: RecoveryChart/AcwrChart render generic Chart.js — 1px cool-grey gridlines, 12-13px labels, default legend padding — clashing with the warm editorial palette. Fix: gridlines 1.5px at `--color-text-3` ~0.4 opacity; axis labels 14px / legend 15px in "General Sans"; move chart titles OUT of Chart.js into real `<h3>` elements above the canvas (`title: { display: false }`); widen wrapper to 700px; add `--space-lg` below the title. Effort: **M**.

8. **Establish a lede + custom-bullet rhythm on topic sections.** Raw now: every paragraph is identical 16px `--color-text-2`; bullets are cramped disc markers at 8px spacing in secondary text (TopicPageLayout.astro:83-94) — long pages read as undifferentiated grey text. Fix: style first `<p>` of each section as a lede (clamp 18-24px, `--color-text-1`, `--leading-heading`, no top margin); convert bullets to `list-style: none` with an accent `::before` `•`, `margin-top: var(--space-md)`, color `--color-text-1`, `padding-left: var(--space-md)`. Effort: **S**.

---

## By area

### 1. Topic Page Layout & Keyword Hub Pages
**Reviewer summary:** The 5 new hub pages (/methodology, /training-load, /readiness-score, /for-coaches, /compare) render correctly but are text-heavy and under-designed. `TopicPageLayout` has a solid foundation (alternating section backgrounds, Matisse hero decoration) but the content sections lack polish: plain disc bullets, a prose "comparison," undifferentiated related-links and references, and no pull-quotes or visual anchors. Magazine-quality writing, black-and-white layout.

| Severity | Title | File | Fix | Effort |
|---|---|---|---|---|
| HIGH | Comparison table should be tabular, not prose bullets | compare.ts + TopicPageLayout.astro:88-94 | New `TopicComparisonTable.astro` (3-col grid Aspect/Generic/Tuwa, surface `thead`, divider row borders, single-col mobile); conditional render for comparison sections | M |
| HIGH | Related-links block needs card styling | TopicPageLayout.astro:115-124 | Replace `<ul>` with `grid md:grid-cols-3` of surface cards w/ border, radius-md, arrow glyph, hover → surface-el + shadow-card-hover | M |
| HIGH | References list lacks distinction / readability | TopicPageLayout.astro:129-155 | Hanging indent (`padding-left: var(--space-lg)`), citation text in `--text-label`/`--color-text-2`, `margin-bottom: var(--space-md)` per item, DOI link in accent + `--weight-label`, optional light surface row bg | S |
| MEDIUM | Bullet lists cramped + low-contrast | TopicPageLayout.astro:88-94 | `list-style: none` + accent `::before` `•`, `margin-top: var(--space-md)`, color → `--color-text-1`, `padding-left: var(--space-md)` | S |
| MEDIUM | Lead paragraph needs weight/size distinction | TopicPageLayout.astro:83-87 | Style `p:first-of-type` per section as lede: `clamp(18px,2vw,24px)`, `--color-text-1`, `--leading-heading`, `margin-top: 0` | S |
| MEDIUM | Hero feels empty below heading | TopicPageLayout.astro:27-54 | Add anchor between hook line and Matisse strip: a 60px accent underline, or a small inline Matisse blob, or a centered key-stat card (surface, radius-md, divider border) | S |
| MEDIUM | Subheadings lack typographic distinction | TopicPageLayout.astro:78-82 | Covered by the global h3/`--text-subheading` fix; add warm `--color-brand-accent` or accent treatment + `margin-bottom: var(--space-md)` | S |
| MEDIUM | Section transitions lack pause/anchor | TopicPageLayout.astro:56-97 | Add 1-2 pull-quote callouts per page (surface bg, `border-left: 3px var(--color-accent)`, `--space-lg` padding, italic `--text-heading`) and an occasional margin Matisse blob (~60px, opacity 0.4) | M |
| LOW | Tight h2→h3 spacing vs h3→body | TopicPageLayout.astro:66-77 | Group h2+h3; tighten h2→h3 to `--space-sm`, open h3→body to `--space-md`/`--space-lg` (folds into global h3 margin fix) | S |

### 2. Homepage Visual Polish
**Reviewer summary:** Strong foundations (Matisse decorations, click wheel, device realism) but 4 under-finished spots: StatsCounter tiles read as raw text, LandingCTA wraps an image in button styling, hero spacing could tighten, and two consecutive flat-surface sections (Stats + LandingCTA) create monotony with no brand decoration.

| Severity | Title | File | Fix | Effort |
|---|---|---|---|---|
| HIGH | StatsCounter tiles read as raw text | StatsCounter.astro:39-63 | Tile container (surface-el bg, divider border, radius-md, ~20px pad, `border-left: 2px var(--color-accent)`, shadow-card), 24px icon, h3 → `--weight-heading` 18px | M |
| HIGH | LandingCTA wraps badge image in `.btn-cta` | LandingCTA.astro:51 | Change `class="btn-cta inline-block"` → `class="inline-block"`; let the badge SVG be its own affordance | S |
| MEDIUM | StatsCounter section needs brand decoration | StatsCounter.astro:13-20 | Add low-opacity Matisse shape (abs-positioned, z-index -1) or a 2-3px `--color-brand-accent` left border to break two-flat-surface monotony | M |
| MEDIUM | Hero spacing/rhythm slightly loose | Hero.astro:17-85 | Subtitle margin-top `--space-lg`→`--space-md`; device gap → ~40px; badge margin-top `--space-xl`→`--space-lg`; optional headline tracking -0.02→-0.03em | S |
| MEDIUM | Wheel center lacks depth on reveal | FeatureGrid.astro:131-141 | Center bg `--color-surface-el`→`--color-surface`, add `--shadow-card`, gap `--space-xs`→`--space-sm`, 1px divider between desc and CTA | S |
| LOW | Badge loses affordance after un-buttoning | LandingCTA.astro:45-61 | Add light hover (`filter: brightness(0.95); transform: scale(1.02)`) or an inline-flex container — affordance without reusing `.btn-cta` | S |

### 3. Shared Chrome (Header, Footer, Mobile Menu, Nav, Buttons, Skip-link)
**Reviewer summary:** Fundamentally sound but 7 refinement issues create a slightly raw feel: flat resting CTA, unbalanced 7-item footer Resources column, cramped dropdown icons, unfinished skip-link, oversized mobile nav links, floating footer badge, and a chevron using generic `ease` instead of the brand curve. All taste/refinement, no functional bugs.

| Severity | Title | File | Fix | Effort |
|---|---|---|---|---|
| HIGH | CTA lacks resting depth | global.css:255-264 | Add `box-shadow: 0 2px 6px rgba(43,82,64,0.12)` to base `.btn-cta` | S |
| HIGH | Footer Resources column unbalanced (7 vs 5/2) | Footer.astro:54-66 | Redistribute to ~4/6/4/2 (e.g. move Compare to Features, split Blog/Support into a "Learn"/"Community" column) | M |
| HIGH | Dropdown item icons cramped | global.css:221-237 | gap `--space-sm`→`--space-md`, increase item padding, icon box 18→20px | S |
| MEDIUM | Skip-link unfinished affordance | global.css:318-334 | Add `:hover { background-color: var(--color-accent-hover) }`; full `--radius-md` instead of bottom-only radius | S |
| MEDIUM | Mobile nav links oversized vs desktop | MobileMenu.astro:17-27 | Font-size `--text-heading` (28px!) → `--text-body` (16px); padding to `--space-md var(--space-md)`, keep `min-height: 44px` | S |
| MEDIUM | Footer App Store badge floats / no hierarchy | Footer.astro:24-38 | Wrap in container: `color-mix(... surface-el 50% ...)` bg, `--space-md` pad, `--radius-md`, margin-top → `--space-xl` | S |
| MEDIUM | Chevron uses generic `ease` | global.css:191-193 | `transition: transform 250ms ease` → `... var(--ease-interactive)` to match site curve | S |
| LOW | Header backdrop blur near-invisible | Header.astro:29-36 | `surface 95%`→`85%` in color-mix so the 8px blur reads (re-check text contrast ≥4.5:1) | S |

### 4. Feature Pages & Data Visualization
**Reviewer summary:** Strong foundation (Matisse, lenis animations, device-frame realism) undercut by generic Chart.js styling clashing with the warm palette, flat "Coming soon" device placeholders, abrupt section transitions, wrong hero weight (300 vs display 200), and a CTA section with no accent. Reads "shipped early" rather than magazine-quality.

| Severity | Title | File | Fix | Effort |
|---|---|---|---|---|
| HIGH | Charts use generic Chart.js styling | charts/RecoveryChart.astro & AcwrChart.astro | Gridlines 1.5px `--color-text-3`@0.4; axis 14px / legend 15px in General Sans; widen to 700px; subtle surface wash; `--space-lg` below title | M |
| HIGH | Device-frame "Coming soon" placeholder flat | DeviceFrame.astro:44-62 | `linear-gradient(135deg, var(--color-surface), var(--color-bg))` + faint Matisse dot overlay (~0.06), label in `--weight-label` uppercase, `--color-text-2`@0.7 | M |
| HIGH | Hero h1 wrong weight (300 vs 200) | FeaturePageLayout.astro:29 | `--weight-heading` → `--weight-display` | S |
| MEDIUM | Feature CTA lacks separation/accent | FeatureCTA.astro:20-32 | Small Matisse shape above h2; accent on first words or weight 400; half-width accent top border | M |
| MEDIUM | Section transitions abrupt | FeaturePageLayout.astro:24,54 | Tighten hero `padding-bottom` to `--space-lg`, add screenshot `padding-top: --space-2xl`, inset 1px divider @0.5 opacity; mobile values reduced | S |
| MEDIUM | Chart titles lack hierarchy | charts/*.astro (Chart.js title) | Render title as real `<h3>` above canvas, set `title: { display: false }` | M |
| MEDIUM | ACWR legend generic | AcwrChart.astro:77-84 | Legend 14px, padding `{top:20,bottom:8}`, subtle box bg/border, right-align | S |
| MEDIUM | Science section borders fragile | features/recovery-scoring.astro:89, workload-tracking.astro:71 | Borders 1px→2px + breathing room, or replace with 4px left accent @16% | S |
| LOW | Gridline color cool on warm palette | charts/*.astro | Shift toward `#D4CCC4` / mix divider+surface 60/40 @0.5 opacity | S |
| LOW | Step-indicator dots lack context | features/recovery-scoring.astro:33-37 | Add uppercase "Scroll to explore" label, gap `--space-sm`→`--space-md`, optional containing border | S |

### 5. Cross-Site Design-System Consistency
**Reviewer summary:** Strong foundations, but consistency drift undermines polish across page types: h3 equals body size everywhere, link underlines appear only on topic pages, identical inline-style blocks are copy-pasted across layouts (maintenance debt), and footer links use weak `.nav-link` hover. Mostly easy wins that unify the system.

| Severity | Title | File | Fix | Effort |
|---|---|---|---|---|
| HIGH | h3 == body paragraph size | TopicPageLayout.astro, features/workload-tracking.astro | Add `--text-subheading: 18px` token; global `h3` rule using it; remove inline `font-size: var(--text-body)` | S |
| HIGH | Link styling inconsistent (underlines only on topic) | TopicPageLayout.astro, Footer.astro, global.css | Define `.content-link` (underline, 3px offset, accent, hover opacity 0.75); apply at TopicPageLayout:118,147 + feature body links | M |
| HIGH | h3 top-margin drift (8px topic vs 32px feature) | TopicPageLayout.astro:79, feature pages | Standardize h3 `margin-top: var(--space-lg)` (24px) sitewide | M |
| MEDIUM | h1 uses heading (300) not display (200) | TopicPageLayout.astro:32, FeaturePageLayout.astro:29 | `--weight-heading` → `--weight-display` on both h1s | S |
| MEDIUM | Inline styles proliferate (no utilities) | TopicPageLayout.astro, feature pages | Extract `.prose-p` / `.prose-h3` / `.prose-li` utilities in global.css; replace repeated inline blocks | M |
| MEDIUM | Footer link hover too weak | Footer.astro, global.css:371-374 | `.footer-link` variant: transparent→accent underline-color + accent color on hover | S |
| MEDIUM | Section-alternation pattern undocumented | TopicPageLayout.astro, feature pages | Document the odd/even rule in global.css; extract `.section-alt` utility | S |
| LOW | Prose list styling implicit | TopicPageLayout.astro, privacy.astro, LegalPageLayout.astro | `.content-list` + `.content-list li` rules; standardize `.prose li` spacing for legal | S |

---

## Quick wins (S, ship today)

These are small, isolated, low-risk edits with outsized polish payoff. Several collapse multiple reviewers' findings into one change.

- **`.btn-cta` resting shadow** — add `box-shadow: 0 2px 6px rgba(43,82,64,0.12)` (global.css:255-264).
- **LandingCTA badge** — drop `btn-cta` from the badge link (LandingCTA.astro:51).
- **Heading scale** — add `--text-subheading: 18px`; global `h3` → subheading size + `--weight-heading` + `margin-top: var(--space-lg)`; both page `h1`s → `--weight-display` (resolves three reviewers' HIGH/MEDIUM h1/h3 findings at once).
- **Chevron easing** — `ease` → `var(--ease-interactive)` (global.css:192).
- **Mobile nav link size** — `--text-heading` → `--text-body` (MobileMenu.astro:18-24).
- **Skip-link** — add hover bg + full `--radius-md` (global.css:318-334).
- **Dropdown icon breathing room** — gap → `--space-md`, icon box 18→20px (global.css:221-237).
- **Header backdrop** — surface 95%→85% so the blur reads (Header.astro:29-36).
- **Topic bullets + lede** — accent `::before` bullets at `--space-md` spacing in `--color-text-1`; first paragraph as lede (TopicPageLayout.astro:83-94).
- **References readability** — hanging indent + per-item `margin-bottom: var(--space-md)` + accent DOI links (TopicPageLayout.astro:144-152).
- **Feature hero weight** — `--weight-heading` → `--weight-display` (FeaturePageLayout.astro:29).

## Already polished (credit what's good)

- **Design-token system is genuinely strong** — every reviewer worked *within* the token vocabulary (`--space-*`, `--weight-*`, `--text-*`, `--shadow-card`, `--ease-interactive`, palette). Nearly every fix is "use the token that already exists," which is the sign of a well-built foundation. `--weight-display: 200` and the shadow tokens are defined and correct (global.css:86-97); they're just under-applied.
- **Matisse decoration system** (MatisseDecoration / MatisseFrieze / MatisseShape, plus the FeatureGrid click-wheel) is consistently praised as on-brand and distinctive — the polish asks are to extend it into the flat sections, not to fix it.
- **Animation infrastructure** — `data-animate` scroll-reveal hooks are present on every section (incl. StatsCounter, LandingCTA, topic sections); lenis + reduced-motion guards on `.btn-cta` (global.css:269) are handled correctly.
- **Section alternation + reading measure** — the odd/even surface backgrounds with divider borders and `max-w-3xl` (~80-100 char) measure on topic/feature pages give good long-form rhythm; reviewers want anchors *within* it, not a rework.
- **Accessibility baseline** — skip-link, `min-height: 44px` touch targets, `aria-label`s on badge links and the StatsCounter section, `rel="noopener noreferrer nofollow"` on external refs are all in place.
- **Chart foundation** — the charts use the accent color and correct data; the work is cosmetic harmonization (gridline weight, label size, title placement), not re-architecture.
