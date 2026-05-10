# Domain Pitfalls

**Domain:** Athletic/fitness app marketing website (iOS download-focused)
**Project:** Tuwa — precision training load and recovery management
**Researched:** 2026-05-10

---

## Critical Pitfalls

Mistakes that cause rewrites, significant conversion drops, or destroy credibility with the target audience.

---

### Pitfall 1: Feature-First Hero Copy

**What goes wrong:** The hero headline lists what the app does (EWMA-based ACWR, HRV-driven recovery scores, workload tracking) instead of what the athlete *gains*. Visitors read a capability inventory, not a reason to download.

**Why it happens:** Builders are close to the product and excited by the technology. The features feel like benefits to the team but not to a cold visitor.

**Consequences:** High bounce rate from the hero section; users cannot self-select ("is this for me?") without scrolling three sections deep. App Store downloads underperform against traffic.

**Warning signs:**
- Hero headline contains acronyms (ACWR, EWMA, HRV) without immediate plain-language payoff
- First sentence answers "what does this track?" instead of "what changes for me?"
- Feature pages lead with metric names rather than the athlete's outcome

**Prevention:**
- Lead with the transformation: "Know when to push. Know when to recover." before explaining ACWR.
- Reserve technical terminology for the feature deep-dive pages where credibility-seeking athletes land specifically to confirm science.
- Validate every above-the-fold sentence with the test: "Does a runner who has never heard of Tuwa understand why this matters to them?"

**Phase:** Landing page copy — address in design/copy phase before any implementation.

---

### Pitfall 2: Credibility Overcorrection — Jargon Walls

**What goes wrong:** Trying to differentiate from generic trackers (Strava, Apple Health) by front-loading sports science terminology creates the opposite problem: the page reads like a research abstract. Athletes trust the science but are not sports scientists.

**Why it happens:** The instinct to prove legitimacy to serious athletes leads to using the vocabulary of the methodology (ACWR, chronic load, acute:chronic ratio) as shorthand for "this is serious." But the audience proves itself serious by seeking you out — they don't need to decode the page to feel validated.

**Consequences:** Casual-serious athletes (recreational runners, amateur cyclists) self-select out prematurely. Only coaches already fluent in sports science stay engaged, narrowing the funnel to a fraction of the addressable market.

**Warning signs:**
- Feature descriptions require sports science vocabulary to parse in the first paragraph
- "Accessible-credible" tone drifts toward academic tone on feature deep-dive pages
- Support/explainer content is written for coaches, not athletes

**Prevention:**
- Adopt the hierarchy: plain-language outcome first, mechanism second (optional depth), methodology third (link-out for deep readers).
- Keep acronyms behind progressive disclosure — a tooltip or expandable, not the lead.
- The "accessible-credible" tone defined in PROJECT.md is correct; maintain it explicitly across all five feature pages, not just the landing page.

**Phase:** All copy phases. Flag for explicit review during feature page build.

---

### Pitfall 3: Misaligned Audience Signal — "Serious Athletes" vs. Everyone

**What goes wrong:** In an attempt not to exclude potential users, the copy hedges the audience signal. "For athletes of all levels" phrasing undermines the positioning against Whoop, Garmin Connect, and TrainingPeaks, all of which already own that positioning.

**Why it happens:** Fear of narrowing the top of the funnel. The instinct is that broader means more downloads.

**Consequences:** Loses differentiation against mass-market competitors. Serious athletes — the users most likely to stay subscribed and upgrade to Coach tier — see the site as another generic tracker and move on. The mid-tier (moderately competitive athletes who want to get serious) also fails to self-identify.

**Warning signs:**
- Hero copy could apply equally to a step counter app
- No explicit statement of who the app is NOT for
- Social proof quotes are generic ("love this app!") rather than from athletes with context (marathon runner, cycling coach, triathlete)

**Prevention:**
- Name the audience directly and early: "Built for athletes who train with a purpose — not just a step goal."
- Use specificity in testimonials and social proof — "50km/week runner preparing for Boston" signals audience better than a star rating.
- Competing against Whoop on recovery and TrainingPeaks on load management means the positioning must carve the overlap: both recovery-aware AND load-structured, without hardware lock-in.

**Phase:** Landing page hero and testimonials section.

---

### Pitfall 4: App Store Badge as the Only CTA — No Conversion Scaffolding

**What goes wrong:** The page puts an App Store badge prominently and considers CTA done. Desktop visitors have no seamless path; users who aren't ready to download yet have no re-engagement mechanism.

**Why it happens:** The natural conclusion for a mobile app is "just send them to the App Store." The badge is necessary but not sufficient.

**Consequences:** Desktop traffic (often coaches researching tools) hits a dead end — the App Store link opens the App Store app or a web preview with no context. Visitors who need more information before downloading have no path forward.

**Warning signs:**
- Single CTA on the landing page (one badge, no secondary action)
- No QR code option for desktop users to bridge to mobile
- Feature pages have no CTA at the bottom, or only repeat the same badge

**Prevention:**
- Primary CTA: App Store badge (mobile-first)
- Secondary CTA for desktop: QR code linking to the App Store URL, or "Send to your phone" mailto link (simple, no backend required on a static site)
- Feature pages should end with a contextual CTA connected to that feature's outcome: "Start tracking your recovery — Download Tuwa free."
- Apple's official marketing guidelines provide badge assets and embed code — use the official badge, not a custom-drawn one.

**Phase:** Landing page layout. Revisit on each feature page.

---

### Pitfall 5: Promise-to-Onboarding Divergence

**What goes wrong:** The website promises immediate, effortless insight. The actual app requires several days of data before ACWR becomes meaningful and HRV baselines are established. First-time users open the app expecting the dashboard to show something and see empty state.

**Why it happens:** Marketing naturally compresses time and effort. The cold-start problem is a real technical constraint that is easy to hide in copy ("See your recovery score" implies it's available immediately).

**Consequences:** Negative App Store reviews citing confusion or disappointment. Churn in the first 7 days. The website undermines the app experience by setting wrong expectations.

**Warning signs:**
- Copy says "see your score" without noting the baseline period
- Hero visual shows a fully populated dashboard without any caveat
- Feature pages describe capabilities that only activate after 2+ weeks of data

**Prevention:**
- The cold-start onboarding feature is already in scope — reference it honestly in website copy: "Tuwa learns your baseline in your first week, then tells you exactly how hard you can go."
- Show realistic app screenshots — a partially populated state is more honest and still compelling.
- Use the onboarding feature page to reframe cold-start as a feature ("Tuwa doesn't guess — it learns you").

**Phase:** Feature page copy, screenshot selection for hero and feature pages.

---

## Moderate Pitfalls

---

### Pitfall 6: Self-Hosted Font Causing LCP and CLS Problems

**What goes wrong:** Alpino (self-hosted from Fontshare) loads without preloading hints, causing Flash of Unstyled Text (FOUT) or layout shifts (CLS) during initial paint. Since text is the LCP element on ~24% of mobile pages, a slow font load directly harms the Core Web Vitals score.

**Why it happens:** Developers add @font-face declarations in CSS without adding `<link rel="preload">` for the woff2 files. The font loads after CSS is parsed, causing visible reflow.

**Warning signs:**
- No `<link rel="preload" as="font" crossorigin>` in the `<head>` for Alpino woff2 files
- Lighthouse reports CLS > 0.1 or LCP > 2.5s
- Text visibly swaps from fallback to Alpino after page load

**Prevention:**
- Preload the primary Alpino weight (400 or whichever is used for body text) and the heading weight directly in the `<head>`.
- Use `font-display: swap` for body text to avoid invisible text during load.
- Define a fallback font stack with similar metrics to Alpino to minimize layout shift on swap.
- Subset the font files to characters used (Latin) using fonttools or an online subsetter — reduces file size significantly.

**Phase:** Base layout / head component (Phase 1 of implementation).

---

### Pitfall 7: Dark/Light Mode Color Contrast Failures

**What goes wrong:** A warm travertine palette that passes contrast in light mode fails WCAG AA in dark mode, particularly for body text over warm off-white surfaces translated to dark equivalents. Thin font weights worsen this on dark backgrounds.

**Why it happens:** Designers test one mode thoroughly and assume the other is a simple inversion. Warm palettes (ochre, stone) lose contrast headroom on dark backgrounds faster than neutral palettes.

**Warning signs:**
- Contrast ratio below 4.5:1 for body text in dark mode
- Alpino at light weight (300) used as body text on dark backgrounds
- Color tokens defined as simple CSS `prefers-color-scheme` inverses without re-testing

**Prevention:**
- Define explicit dark-mode color tokens — do not auto-invert light-mode tokens.
- Target minimum contrast ratio 4.5:1 (WCAG AA) for body; 7:1 for critical UI like CTA labels.
- Use a heavier font weight (one step up) for body text in dark mode, per established dark-mode typography best practices.
- Test with the macOS Accessibility Inspector or browser devtools dark-mode emulation before shipping.

**Phase:** Design system / Tailwind config setup.

---

### Pitfall 8: Client-Side Islands Hiding Content from Crawlers

**What goes wrong:** If interactive components (scroll animations, feature carousels, tabbed content) are implemented as client-side Astro islands or React components, the content inside them is not rendered in the static HTML — search engines see empty containers.

**Why it happens:** Developers reach for island-based interactivity for components that also contain important copy or feature descriptions, not realizing the content inside is excluded from the static HTML payload.

**Consequences:** Feature page content fails to index. SEO for product keywords ("training load management app," "ACWR tracking iOS") is undermined by invisible content.

**Warning signs:**
- `client:load` or `client:visible` on a component that wraps product copy (not just decorative UI)
- View page source shows empty `<div>` where feature description content should appear
- Google Search Console shows pages as indexed but with "low quality" signals

**Prevention:**
- Keep all indexable content — headlines, feature descriptions, CTAs — in the Astro `.astro` template layer (static HTML).
- Use Astro islands only for decorative or purely interactive elements (scroll animations, tabbed UI state, video play buttons) where content is duplicated in the static layer.
- Verify by viewing page source (not browser inspector) and confirming all critical text is present.

**Phase:** All component implementation phases. Enforce as a code review checklist item.

---

### Pitfall 9: OG / Social Preview Tags Incorrect or Missing Per Page

**What goes wrong:** The site ships with either no `og:image` or a single global image used on every page. When feature pages or blog posts are shared on social media, the preview shows the homepage hero image, reducing click-through rates and looking like broken metadata.

**Why it happens:** The `<BaseHead>` component is set up once with a default image and the per-page override is forgotten during implementation of individual feature pages.

**Warning signs:**
- All pages share the same `og:image`
- `og:image` URL is relative (`/images/og.png`) rather than absolute (`https://tuwa.app/images/og.png`)
- Feature page titles in social previews show the site name instead of the specific feature name

**Prevention:**
- Build the `<BaseHead>` component to accept `title`, `description`, and `ogImage` props, with the homepage image as fallback only.
- All five feature pages must pass a unique `ogImage` at minimum — ideally an image relevant to that feature.
- OG image URLs must be absolute. In Astro, use `Astro.site` to construct absolute URLs from relative paths.
- Test with Twitter Card Validator and LinkedIn Post Inspector before launch.

**Phase:** Base component setup; enforce during feature page build.

---

### Pitfall 10: 301 vs 302 Redirect Mistakes for Future-Proofed URLs

**What goes wrong:** When internal page URLs are reorganized (e.g., `/features/recovery` → `/recovery-scoring`), 301 redirects are set that permanently transfer link equity. If the destination URL later changes, browsers have cached the redirect indefinitely.

**Why it happens:** Developers use 301 as the default for all redirects without considering permanence.

**Prevention:**
- Use Cloudflare `_redirects` file in `public/` for URL management rather than Astro's redirect config (which doesn't support wildcards).
- Reserve 301 for genuinely permanent internal moves. Use 302 for anything pointing to external services (app store links, support routes).
- Set up redirects at launch for the old support and legal page URLs (migrated from the existing HTML files) so existing links and bookmarks don't 404.

**Phase:** Deployment configuration.

---

## Minor Pitfalls

---

### Pitfall 11: App Screenshots That Show Empty or Placeholder State

**What goes wrong:** Screenshots sourced from the app before sufficient training data was collected show empty dashboards, zero values, or placeholder text. These do not communicate value to a prospect.

**Prevention:** Use screenshots from a seeded test account with representative data. Select moments that show the most compelling information density — a recovery score with actionable recommendation, a ACWR chart with meaningful trend, a prescribed workout with context.

**Phase:** Asset preparation before design/dev begins.

---

### Pitfall 12: Pricing Ambiguity Without a Pricing Page

**What goes wrong:** Since the pricing page is explicitly out of scope and subscription info lives in-app, visitors searching for pricing information will not find it. This is fine by design, but the site must not imply the app is free or hide that it has a paid tier, which creates expectation mismatch at the App Store.

**Prevention:** One neutral line in the hero or footer: "Free to start. Pro and Coach plans available." This sets honest expectations without requiring a full pricing page.

**Phase:** Landing page copy.

---

### Pitfall 13: Missing Sitemap or robots.txt

**What goes wrong:** Astro does not generate a sitemap by default. A marketing site launching without a sitemap or robots.txt relies entirely on Google's crawl discovery, slowing initial indexing.

**Prevention:** Install `@astrojs/sitemap` integration and configure it before launch. Add a minimal `robots.txt` to `public/`. Submit the sitemap URL to Google Search Console on launch day.

**Phase:** Deployment configuration / pre-launch checklist.

---

## Phase-Specific Warnings

| Phase Topic | Likely Pitfall | Mitigation |
|-------------|---------------|------------|
| Hero copy | Feature-first headline; jargon overload | Test every above-fold sentence against a non-athlete reader |
| Feature deep-dive pages | Credibility overcorrection; promise-to-onboarding divergence | Hierarchy: outcome → mechanism → methodology |
| Base layout / head component | Font FOUT/CLS; missing OG meta props; sitemap | Preload Alpino woff2; absolute OG URLs; install @astrojs/sitemap |
| Design system / Tailwind config | Dark mode contrast failures | Define explicit dark-mode tokens; test contrast separately in each mode |
| Component implementation | Client-side islands hiding indexable content | View-source check on all feature pages before merging |
| Deployment configuration | Redirect type mistakes; missing redirects from old HTML URLs | Use Cloudflare `_redirects`; map legacy support/legal URLs |
| Screenshot selection | Empty-state or overly technical dashboards | Seed test account; select insight-rich moments |
| CTA design | Single badge with no desktop bridge | Add QR code or "send to phone" option for desktop sessions |
| Landing page copy | Audience signal hedge; no pricing clarity | Name the audience; add one-line subscription transparency |

---

## Sources

- [App Landing Pages for Mobile Products: A Practical 2026 Conversion Playbook](https://unicornplatform.com/blog/app-landing-pages-for-mobile-products-in-2026/) — conversion and copy pitfalls
- [10 Landing Page Mistakes That Kill Conversions](https://www.fogdigitalmarketing.com/blog/blog/landing-page-mistakes/) — feature vs. outcome framing
- [How I Migrated from WordPress to Astro (Lighthouse 100)](https://kashifaziz.me/blog/wordpress-to-astro-migration-journey/) — client-side island SEO, redirect pitfalls
- [Self-host Google Fonts for Better Core Web Vitals](https://www.corewebvitals.io/pagespeed/self-host-google-fonts) — font loading and LCP impact
- [Fixing Layout Shifts Caused by Web Fonts](https://www.debugbear.com/blog/web-font-layout-shift) — CLS and font-display strategy
- [Dark Mode Web Design in 2025: UX, SEO & Design Tips](https://designindc.com/blog/dark-mode-web-design-seo-ux-trends-for-2025/) — dark mode typography and contrast
- [How To Get Social Media Previews Right with OpenGraph Meta Tags](https://lirantal.com/blog/getting-social-media-previews-right-with-opengraph-meta-tags) — OG image pitfalls in Astro
- [Deploy an Astro Site on Cloudflare Pages](https://developers.cloudflare.com/pages/framework-guides/deploy-an-astro-site/) — deployment configuration
- [App Store Marketing Guidelines](https://developer.apple.com/app-store/marketing/guidelines/) — badge usage rules and official CTA assets
- [ASO Mistakes Affecting App Visibility and Conversion Rate](https://splitmetrics.com/blog/aso-mistakes-affecting-app-visibility-and-conversion-rate/) — App Store conversion context
