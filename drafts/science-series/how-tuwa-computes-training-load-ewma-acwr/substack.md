# Substack edition — paste source

**Do not publish from this repo.** Paste-source for Substack. The canonical edition is
the tuwa.app blog post of the same slug and it publishes FIRST.

**Required Substack settings before sending:**
- Set the post's **canonical URL** to `https://tuwa.app/blog/how-tuwa-computes-training-load-ewma-acwr/`
  (Settings → SEO → Canonical URL). Without it this newsletter competes with the site in
  search, which defeats the point of the series.
- Footer CTA: subscribe + App Store link (both at the bottom of this file).

---

## SUBTITLE

The acute:chronic workload ratio was taken apart between 2019 and 2021. I still use it. Here is exactly what I let it say.

## POST BODY

I am a designer who vibe-codes. Tuwa gets built mostly by describing what I want to an AI and then arguing with it about the details. I also train the way the app is built for: basketball, plus lifting, self-coached, nobody in a back room telling me whether today should be heavy.

This issue is about the oldest problem in the app — turning "what I did" into one number that means something tomorrow — and about the uncomfortable fact that the research I built it on was later dismantled in public.

### One number for one body

External load is what you did. Kilograms, minutes, sets. Internal load is what it cost you. They come apart constantly: the same 90-minute practice costs far more in a bad week than a good one.

Tuwa's series is internal. It rests on the session-RPE method from Carl Foster's group in the late 1990s — rate the whole session out of 10 after it ends, combine that with duration (Foster, *Med Sci Sports Exerc* 1998, 30(7):1164–1168; Foster et al., *J Strength Cond Res* 2001, 15(1):109–115). No lab, no chest strap, and it works the same for a lifting session and a scrimmage, which is the whole reason it survives in the field.

In the app, a session's stress figure is duration in hours × session RPE × (RPE ÷ 10). The second RPE term makes hard sessions count more steeply than long easy ones. A day's load is the sum of that day's sessions. Rest days enter as zeros rather than gaps, which is what keeps the decay arithmetic honest about time off.

The design decision I care about most: **one load curve, not one per sport.** Strength work is scored by hard sets and converted into session-RPE-equivalent units before it joins the same daily series as conditioning and sport practice. If you played a match on Tuesday and squatted on Wednesday, you have one fatigue budget. This is the gap I built the whole product into — apps that model your fatigue this way generally own your programme, and apps that accept your programme generally refuse to model it.

### Why the smoothing is exponential

The standard metric is the acute:chronic workload ratio: the last 7 days of load over the last 28. Near 1.0 means this week resembles the last month.

Rolling averages have a crude property. A day inside the window counts fully; a day outside counts zero. A brutal session carries its full weight for seven days and then vanishes overnight. Nothing about fatigue has a cliff edge on day eight.

Williams, West, Cross and Stokes proposed replacing both windows with exponentially weighted moving averages, which decay geometrically (*Br J Sports Med* 2017, 51(3):209–210). Menaspà made the same argument from the coaching side (*Br J Sports Med* 2017, 51(7):618–619). Murray and colleagues compared both forms in Australian football players and reported the exponential version as the more sensitive indicator (*Br J Sports Med* 2017, 51(9):749–754).

Tuwa uses that form. Acute decays at 1/7 per day, chronic at 1/28, and the ratio is one over the other.

One honest note about my implementation. Both terms are re-estimated over a 35-day history each time a session saves, starting from zero — a short memory for a 28-day decay constant. The chronic term therefore settles below its long-run value and the ratio sits above where a fully settled estimate would put it. It is one of several reasons I show a zone and a direction rather than a number you are meant to obey.

### Then the field took the metric apart

This is the part that changed the product.

The ratio got popular through a run of findings from 2014 onward: Hulin and colleagues in elite cricket fast bowlers (*Br J Sports Med* 2014, 48(8):708–712), then rugby league, then Gabbett's "training-injury prevention paradox" paper (*Br J Sports Med* 2016, 50(5):273–280), one of the most cited sports-medicine papers of its decade. The IOC's 2016 consensus statement on load and injury risk treated it as a monitoring tool worth using (*Br J Sports Med* 2016, 50(17):1030–1041). A "sweet spot" near 0.8–1.3 and a "danger zone" above 1.5 entered the vocabulary of team sport.

Then four criticisms landed.

**Mathematical coupling.** The acute window sits inside the chronic window, so the numerator is part of its own denominator. Lolli and colleagues showed this alone produces spurious correlation with outcome — the same structure appears in random numbers (*Br J Sports Med* 2019, 53(15):921–922).

**Confounding by schedule.** Bornn, Ward and Norman combined Monte Carlo simulation with load data from professional soccer and American football and showed the training calendar alone can manufacture an apparent ACWR-injury relationship with no causal relationship present (MIT Sloan Sports Analytics Conference, 2019).

**Analytical freedom.** Impellizzeri and colleagues catalogued the undeclared choices in a typical ACWR analysis — binning, reference category, coupled or uncoupled, EWMA or rolling — and showed the direction of a result can turn on them (*Int J Sports Physiol Perform* 2020, 15(6):907–913). Their follow-up is titled "What Role Do Chronic Workloads Play in the Acute to Chronic Workload Ratio? Time to Dismiss ACWR and Its Underlying Theory" (*Sports Med* 2021, 51(3):581–592).

**Weak evidence overall.** Two 2020 systematic reviews — Griffin and colleagues (*Sports Med* 2020, 50(3):561–580) and Maupin and colleagues (*Open Access J Sports Med* 2020, 11:51–75) — found the underlying studies heterogeneous and generally at moderate-to-high risk of bias. Wang and colleagues set out what a defensible causal analysis of activity and injury would require (*Sports Med* 2020, 50(7):1243–1254).

Precision matters here, so let me separate two claims that usually travel together.

The idea that ramping training faster than you are accustomed to matters is not dead. Practitioners believe it, the mechanism is plausible, and I believe it.

The specific claim that a ratio above 1.5 carries a quantified injury risk is dead. It did not survive the scrutiny.

Only the first is safe to build a product on.

### What I shipped after reading all of it

Four decisions, each one a place where I made the app say less than it could have.

**The ratio never predicts injury and never blocks a session.** Tuwa's daily verdict is go, modify or hold, with a concrete number attached and a reason line that names its inputs. One tap overrides it, and the app does not argue.

**Zones are labels, not verdicts.** Below 0.8 Load Light, 0.8–1.3 Load Steady, 1.3–1.5 Load Building, 1.5 and above High Load. Conventional bands. They describe where your training moved. They are not calibrated risk boundaries for you, and the copy does not pretend they are.

**Spikes compare you to you.** A session reaching 1.5× your own recent average is flagged, 2× is flagged harder, and nothing is said at all until there are three prior sessions to compare against. A spike against personal history is a far less contested signal than a ratio of two smoothed curves.

**When nothing is known, nothing is reported.** No chronic load yet means the zone reads No Data rather than defaulting to something reassuring. The same gate governs session monotony and strain in Foster's sense: computed only when a 14-day window holds at least seven logged days with real variance. Below that, those statistics are fragile on the sparse logs real amateurs produce, so the app falls back to a coarser signal and says which one it used.

### What it does not do

No forecasting. There is no overreach prediction in the shipped app; the history it draws is 28 days of what already happened.

No programme writing. You or your coach author the plan; Tuwa modulates today's numbers inside it.

No diagnosis. Tuwa is a training tool, not a medical device. It does not diagnose, treat or prevent injury. Pain, fever, dizziness, unusual fatigue or any medical concern overrides anything an app tells you.

### Why publish the criticism of my own metric

Because the alternative is worse. A great many training apps sell a number derived from this same literature with none of the caveats attached, and the caveats are the interesting part. Telling you only the 2016 version of this story would be selling a certainty the field itself withdrew.

The canonical version of this piece, with every citation linked to PubMed, lives at:
https://tuwa.app/blog/how-tuwa-computes-training-load-ewma-acwr/

---

## FOOTER CTA

If you want the next one — I am writing up HRV baselines, sleep and next-day capacity, and whatever the app forces me to learn next — subscribe below.

Tuwa is on the App Store: https://apps.apple.com/us/app/tuwa/id6761185505
