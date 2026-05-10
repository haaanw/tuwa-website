# Feature Landscape

**Domain:** Athletic/fitness app marketing website (iOS app promotion)
**Project:** Tuwa — precision training load and recovery management
**Researched:** 2026-05-10
**Competitors analyzed:** WHOOP, TrainingPeaks, Strava, Garmin Connect

---

## Table Stakes

Features users expect. Missing = product feels incomplete or untrustworthy.

| Feature | Why Expected | Complexity | Notes |
|---------|--------------|------------|-------|
| Hero section with clear value prop | First 5 seconds must answer "what is this?" | Low | Headline + subhead + primary CTA. WHOOP: "Unlock Human Performance & Healthspan." Must be punchy. |
| App Store download badge + link | The entire conversion goal. Visitors must be one tap from the App Store. | Low | Use Apple official badge (black, per guidelines). Link directly to App Store product page. |
| Device mockup / app screenshot in hero | Visitors need visual proof this is a real product with a real UI. | Low-Med | Angled or floating iPhone mockup is standard. Show most compelling screen (dashboard or recovery score). |
| Feature overview section | Visitors need to understand what the app does beyond the headline | Low-Med | 3-4 feature cards or alternating text/image rows. Not exhaustive — curiosity-generating. |
| Responsive / mobile-first layout | 60%+ of web traffic is mobile. Fitness audience is mobile-native. | Low | Static Astro site makes this straightforward. Breakpoints: mobile, tablet, desktop. |
| SEO meta tags + OG images | Organic discovery and link-sharing (social, Slack, Discord) | Low | title, description, og:image per page. Critical for feature deep-dive pages shared by athletes/coaches. |
| Support / contact page | Trust signal. Users need to know there's a human behind the app. | Low | Already exists in legacy HTML — migrate. Link from footer. |
| Privacy policy + terms | Legal requirement and trust signal for health data app. | Low | Already exists. Migrate and link from footer. |
| Footer with nav + legal links | Standard web trust pattern. Missing footer reads as unfinished. | Low | Support, Privacy, Terms, maybe social links. |
| Readable typography at all sizes | Fitness audience reads on phones in bright light during or after workouts. | Low | Alpino chosen — verify weight range handles small sizes. |
| Fast page load | Athletes notice performance. Core Web Vitals matter for SEO. | Low | Astro static output + Cloudflare Pages = excellent baseline. Avoid heavy JS bundles. |

---

## Differentiators

Features that set the product apart from generic marketing templates. Not expected by default, but they build conviction.

| Feature | Value Proposition | Complexity | Notes |
|---------|-------------------|------------|-------|
| Feature deep-dive pages (5 pages) | Serious athletes do their homework. Deep pages answer "how does this actually work?" and filter in the right users. | Med | One page per: recovery scoring, workload tracking, smart templates, cold-start onboarding, coaching. 800-1200 words each with methodology explanation. |
| Science methodology explanation (non-jargon) | Tuwa's EWMA-based ACWR and HRV recovery scoring are legitimate. Explaining *why* these work signals credibility that generic trackers lack. | Med | "Accessible-credible" tone per PROJECT.md. Cite the science (ACWR EWMA smoothing, HRV research), but translate it. Example: "WHOOP: Backed by PhDs" — Tuwa can go deeper without being clinical. |
| Dual audience targeting: athletes + coaches | TrainingPeaks does this well. Shows coaches a dedicated path, not an afterthought. | Med | Separate value props on the landing page. Hero copy addresses athletes; a clear "For coaches" section or nav item addresses coaches. Feature pages should clarify which role benefits. |
| Dark/light mode support | Tuwa is a dark-mode-first app. Website matching both modes signals polish and intentionality. | Med | Tailwind dark: variant + CSS custom properties. First-visit respect of system preference. |
| Scroll-triggered animations | Elevates perceived quality of the product. Strava and WHOOP use subtle motion. | Med | Intersection Observer or Astro-native approach. Keep subtle — reveal on scroll, not parallax-heavy. Not table stakes but strongly expected by 2025 for consumer fitness products. |
| Stat/number callouts from science | Converts skeptics. WHOOP uses "91 more minutes of weekly activity," "2.3 more hours of sleep." Tuwa should surface its own comparable outcome claims. | Low-Med | Requires validated stats from the app's methodology or published research on ACWR/HRV guided training. Don't fabricate. |
| Athlete testimonial / social proof | Real quotes from real athletes build trust faster than feature lists. | Low-Med | Even 2-3 authentic testimonials from beta users or early adopters outperform no testimonials. Attributed name and sport is minimum. |
| Blog infrastructure (MDX-ready) | Authority building over time. Science-literate blog posts attract serious athletes via organic search. | Med | No posts at launch — infrastructure only. MDX enables embedded charts/components in future posts. |
| Coach-specific feature page or section | Coaches are a high-LTV user segment. TrainingPeaks treats coach<>athlete relationship as a core pillar. Tuwa's coaching feature warrants deep treatment. | Med | One of the 5 deep-dive pages is already planned as "coaching." Ensure it addresses coach's actual workflow pain: visibility into athlete readiness, not just "share data." |
| App UI screenshots on feature pages | Reduces the gap between marketing claim and product reality. Lets athletes visualize themselves using it. | Low | Screenshots already available per PROJECT.md. Show in context — annotated or with callout labels. |
| "Who it's for" clarity / positioning | Tuwa is not for casual fitness hobbyists. The site should qualify visitors — "for serious athletes and coaches." This reduces churn and increases install quality. | Low | A tagline, a badge, or a short sentence in the hero makes this explicit. Reference to triathlon/cycling/running/endurance sports where ACWR matters most. |

---

## Anti-Features

Features to deliberately NOT build for v1. Scope discipline is a differentiator in itself.

| Anti-Feature | Why Avoid | What to Do Instead |
|--------------|-----------|-------------------|
| Pricing page on website | PROJECT.md explicitly excludes this. Subscription info lives in-app. Adding it creates a maintenance surface (pricing changes require site deploys) and may confuse users about free-tier access. | Link to App Store listing where pricing is accurate and maintained by Apple. |
| App Store rating/review widget | PROJECT.md excludes this. Dynamic ratings can go negative, widgets add JS weight, and early apps may not have enough reviews to look credible. | Use hand-selected testimonial quotes instead (static, controlled). |
| User authentication / account portal | Users authenticate in the app, not the website. Adding auth increases complexity, security surface, and scope massively. | Focus 100% of energy on conversion to App Store download. |
| Live chat / support chat widget | Adds JS weight, ongoing cost (Intercom, Drift, etc.), and creates support expectation the developer may not have bandwidth for. | Support page with email contact is sufficient. |
| Interactive demo / in-browser app preview | High complexity (web version of iOS app, or iframe/embed). Rarely converts better than good screenshots + copy. | High-quality app screenshots on feature deep-dive pages serve the same need. |
| Community forum or social features on website | Strava's moat is its community. Attempting community features on a marketing site is a distraction and resource sink. | Link to any existing Discord, Reddit, or social presence in footer if relevant. |
| A/B testing infrastructure | Adds complexity. Premature optimization before validating core conversion. | Ship clean site, observe App Store analytics and referrer data, then test later. |
| Video autoplay hero | Common in fitness marketing (Peloton, Nike). Extremely heavy — kills Core Web Vitals on Cloudflare Pages edge. Alienates mobile users on cellular. | Animated device mockup or CSS-animated hero achieves motion without video penalty. |
| Internationalization / multi-language | PROJECT.md explicitly excludes. English-only for v1. | Build site with i18n-friendly URL structure (no locale in paths for v1) so adding later is feasible. |
| E-commerce / merch | Out of scope per PROJECT.md. | — |

---

## Feature Dependencies

```
App Store CTA (primary)
  requires: App Store badge, direct App Store URL

Feature deep-dive pages
  requires: Landing page hero exists (navigation context)
  requires: SEO meta per page (each page is independently discoverable)
  requires: App screenshots per feature (visual proof)

Blog infrastructure
  requires: MDX setup in Astro
  requires: Base layout/typography established
  NOTE: No posts required at launch — infrastructure only

Dark/light mode
  requires: CSS custom property system defined before other components
  requires: Tailwind dark: variant configured
  NOTE: Must be defined first or retrofitting is painful

Scroll animations
  requires: Core layout and content exists (animate what's already right)
  requires: Respect prefers-reduced-motion (accessibility requirement)

Coach feature page
  requires: General coaching value prop established in hero/landing
  NOTE: Deep-dive page should link back to landing "For coaches" section

Science methodology explanations (on feature pages)
  requires: Copy research into ACWR / EWMA / HRV citations
  NOTE: Must be written before feature pages are built — don't build shell and fill later

Testimonials
  requires: Outreach to real beta users or early adopters
  NOTE: Even 2-3 authentic quotes are better than 0. Placeholder slots are acceptable at launch if outreach is pending.
```

---

## MVP Recommendation

Prioritize for v1 launch (shipping to validate):

1. **Landing page hero + App Store CTA** — the entire purpose of the site
2. **Feature overview section** — 3-4 cards that tease the deep-dives
3. **5 feature deep-dive pages** — qualification + conversion for serious athletes
4. **Support, Privacy, Terms pages** — migrate from existing HTML
5. **SEO fundamentals** — meta, OG, semantic HTML per page
6. **Responsive + dark/light mode** — baseline quality gate
7. **Blog infrastructure** — low effort in Astro, high future payoff

Defer (not needed to validate):
- **Testimonials** — can add post-launch when real user quotes are collected. Placeholder CTA ("leave a review on the App Store") acceptable.
- **Scroll animations** — add after layout is stable. Don't let animation block content shipping.
- **Stat callouts** — add when validated outcome data is available. Don't use placeholder numbers.

---

## Competitor Feature Matrix (Reference)

| Feature | WHOOP | TrainingPeaks | Strava | Tuwa (target) |
|---------|-------|---------------|--------|----------------|
| Hero value prop | "Unlock Human Performance" | "World's most complete platform" | "Community-Powered Motivation" | "Precision training load management" |
| Primary CTA | "Try free 1 month" | Athlete/Coach signup | "Join for free" | App Store download |
| Science/research callouts | Yes (PhD-backed, outcome stats) | 25 years of innovation | No | Yes (EWMA, HRV methodology) |
| Feature deep-dive pages | Limited (feature overview) | Yes (Plan/Train/Lift/Coach pillars) | No | Yes (5 pages, each feature) |
| Elite athlete social proof | Yes (Ronaldo, Mahomes) | Yes (87% WorldTour teams) | Community scale (100M users) | Aspirational — real beta users |
| Pricing on site | Yes (3 tiers) | No | Free tier prominent | No (in-app only) |
| Coach/athlete split | Not explicit | Explicit dual paths | Not explicit | Explicit (feature page + section) |
| Testimonials | Yes (attributed users) | No | No | Target: yes |
| Blog/resources | No | Yes | No | Infrastructure only at launch |
| Device mockup in hero | Yes | Yes | Yes | Yes |
| Dark mode website | No | No | No | Yes (distinctive) |

---

## Sources

- WHOOP.com direct analysis (fetched 2026-05-10): hero, pricing, social proof, trust signals
- TrainingPeaks.com direct analysis (fetched 2026-05-10): feature pillars, dual audience approach
- Strava.com direct analysis (fetched 2026-05-10): community positioning, feature hierarchy
- Apple App Store Marketing Guidelines: https://developer.apple.com/app-store/marketing/guidelines/
- Fast Talk Laboratories — TrainingPeaks/Strava feature comparison: https://www.fasttalklabs.com/training/the-best-features-of-trainingpeaks-strava-and-garmin-connect/
- Adjust — Fitness app marketing plan: https://www.adjust.com/blog/fitness-app-marketing-plan/
- PMC — HRV in athlete monitoring (2025 review): https://pmc.ncbi.nlm.nih.gov/articles/PMC12787763/
- PMC — ACWR scientific evidence review: https://pmc.ncbi.nlm.nih.gov/articles/PMC8138569/
- PROJECT.md — Tuwa project context and out-of-scope decisions
