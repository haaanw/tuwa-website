# X long-form edition — paste source

**Do not publish from this repo.** This is a paste-source for X's **Article**
composer. HAN confirmed direct Article access 2026-08-25, so this is written for
the Article surface, not for a plain long-form post: real headings, inline images
placed where they belong, and a piece that lives on its own profile tab instead of
scrolling away.

The canonical edition is the tuwa.app blog post of the same slug, and it publishes
FIRST.

- Canonical URL (must be live before this posts): `https://tuwa.app/blog/hrv-readiness-morning-median-personal-baseline/`
- Evidence core: identical to the site edition. Every citation is intact and verified.
- Claim rails bind in this voice too: no injury prediction, no forecasting, no medical claim.
- **Strategy (see `.planning/v173/X-LONGFORM-RESEARCH.md`):** X penalises outbound
  links and rewards on-platform dwell, and the site does not need X clicks — its job
  is search and answer-engine citation, which the canonical URL does by existing. So
  this edition is written to be **sufficient on its own**. A reader who never leaves
  X gets the whole argument and every citation by name. The site link is a citations
  appendix near the end, not the payoff.
- **Figures:** export each named figure as PNG from the live article and attach it
  inline at the marked point. They are the same diagrams the site edition uses.

---

## ARTICLE TITLE

Your HRV number is mostly noise. Here is the code I wrote to stop believing it.

## ARTICLE BODY

For a long time my app scored your recovery against whatever HRV reading Apple Health had written most recently. If you wear an Apple Watch, that is often a reading taken standing in a queue at 2pm.

I now think that was close to dishonest. Here is what I replaced it with.

I'm a designer who vibe-codes. Tuwa gets built by describing what I want to an AI and then arguing with it about details for hours, and I train the way it is built for — basketball plus lifting, self-coached, no back-room staff.

[APP SCREENSHOT 1 — the readiness card with the HRV row visible]

## First, what the number even is

HRV is the variation in time between heartbeats. The reference for how it's measured is still the 1996 Task Force report in *Circulation* — that's where RMSSD and SDNN come from.

RMSSD is beat-to-beat variation, mostly vagal. SDNN is total variability over the recording.

Apple gives you SDNN. Nearly all of the athlete-monitoring research I'm about to cite used RMSSD, which behaves better over short recordings (Esco & Flatt, *J Sports Sci Med* 2014).

I want to be upfront about that gap. What transfers is the method — smooth it, compare it to yourself, standardise conditions. What does not transfer is any specific number from those papers. I don't get to borrow their thresholds.

[FIGURE — morning-median — one artefact drags the mean and leaves the median]

## Second, one reading tells you almost nothing

Daniel Plews' group did the work here.

Their 2012 case comparison of elite triathletes (*Eur J Appl Physiol*) found the athlete who performed well had a stable weekly HRV average, and the one who performed badly had bigger swings around a similar mean. The variation in the variability was the signal.

Their 2013 review in *Sports Medicine* turned that into the recommendation the field still runs on: track a weekly rolling average against your own baseline, don't react to daily values.

And in 2014 (*IJSPP*) they answered the practical question — how many mornings do you actually need? Three to four per week approximates a seven-day average. That's why partial watch-wearing still works.

The sober counterweight: Bellenger et al. (*Sports Med* 2016) reviewed autonomic heart-rate measures against training status and found the relationship real but modest, and not always able to separate functional overreaching from genuine adaptation.

HRV is one signal. It is not a verdict.

[FIGURE — score-composition — the four weights, and what renormalising does]

## What I actually changed in the app

Three rules.

Only morning readings count. Samples timestamped before 11am local. HRV is a momentary measurement, so *when* you took it changes what it means, and an afternoon reading after coffee is not comparable to one on waking. Altini & Plews (*Sensors* 2021) analysed a large free-living dataset and showed how hard alcohol, illness, travel and sleep disruption hit these numbers.

The day's value is the median of those samples, not the mean. Overnight wearable readings arrive in bursts of variable quality and one artefact should not drag the day.

A day with no morning reading gets no HRV score. Not filled in from the afternoon. Not carried over from yesterday. It just says three of four signals contributed today.

That last one was the hardest to accept, because it means the app sometimes admits it knows less than it did yesterday. I think that's the correct behaviour and most apps in this category won't do it.

## The one place I deliberately treat two signals differently

Resting heart rate does NOT get the morning filter.

Apple Watch computes RHR as a daily aggregate and refines it through the day, so the timestamp on it doesn't mark a morning reading. Filtering it by hour would include or drop it basically at random.

So: HRV gets a morning window, RHR gets an all-day daily value. Two signals, two reductions, and I only know that because two independent reviewers flagged it when I had it wrong.

[APP SCREENSHOT 2 — the HRV detail chart with the "Morning" label]

[FIGURE — own-baseline — seven readings spanning more than seven calendar days]

## The baseline is you, and today isn't in it

30 days of history, reduced to one value per day. The baseline is the mean of your most recent seven prior days that actually had a reading — which can span more than seven calendar days if you don't wear the watch every night.

Today is never part of the baseline today is compared against.

This was a real bug, not a hypothetical. The old version fetched a seven-day history that included today's own stored row, so a second run on the same day — opening the dashboard again, filing a check-in — folded today's reading into the average it was about to be compared with. The deviation shrank and the score moved with no new physiology behind it.

Then the ratio maps to points: 1.0 scores 70, 1.2+ scores 100, 0.7 scores 20, clamped.

That mapping is a stated convention. It is not a validated dose-response curve, and it is the part of this system I most want to replace. There is a robust estimator in the codebase — median and median-absolute-deviation, outlier clipping — but it runs shadow-only. It computes alongside the live score, writes to local rows, and drives nothing you see. It is an open question I'm evaluating, not a feature, and I'm making no accuracy claim for it.

[FIGURE — evidence-coverage — every trial sits in endurance sport]

## Does HRV-guided training actually work?

Real evidence, narrow evidence.

Kiviniemi et al. (*Eur J Appl Physiol* 2007) ran the first controlled test — endurance training guided by daily HRV beat a predetermined programme. Vesterinen et al. (*MSSE* 2016) reproduced it in recreational runners. Javaloyes et al. (*IJSPP* 2019, then *JSCR* 2020) in trained cyclists. Nuuttila et al. (*Int J Sports Med* 2017) against block training.

Now look at what those studies have in common. All endurance. Running and cycling. Modest samples. A few weeks to a few months. The intervention is usually "swap a hard session for an easy one when smoothed HRV drops below your individual range."

Not one of them studied someone who plays a court sport twice a week and lifts three times.

There is no published trial that tells me how much to cut a top set when a basketball player's morning HRV is down. Flatt & Esco (*JSCR* 2016) show the monitoring approach works outside endurance sport in a collegiate soccer team, but that's monitoring, not prescription.

So I use HRV the way the evidence supports — one smoothed, individually referenced input to a decision — and I don't pretend my adjustment sizes are validated. The app names the signals behind a verdict, states how many contributed, and you override it in one tap.

## Not medical advice

HRV, RHR, sleep and wellness are training-planning signals. Tuwa is a training tool, not a medical device. It does not diagnose, treat or prevent anything. Persistent unexplained changes in your resting heart rate or HRV belong with a clinician, not an app.

Full version with every citation linked:
https://tuwa.app/blog/hrv-readiness-morning-median-personal-baseline/

Tuwa on the App Store:
https://apps.apple.com/us/app/tuwa/id6761185505

---

## TEASER THREAD (2–3 tweets)

**Link the X ARTICLE, not tuwa.app.** An on-platform link
carries no distribution penalty and feeds the dwell-time signal; the canonical URL
already sits inside the Article for anyone who wants the citations.

**Tweet 1**
My app used to score your day against whatever HRV reading Apple Health wrote most recently.

For a lot of Apple Watch users that's a reading taken standing in a queue at 2pm.

I rewrote it. Long post on what HRV can and can't tell you 👇

**Tweet 2**
Three rules that replaced it:

— only samples before 11am count
— the day's value is the median, not the mean
— no morning reading means no HRV score, not a substituted one

That last one means the app sometimes admits it knows less than yesterday.

**Tweet 3**
Also in there: why resting heart rate deliberately does NOT get the morning filter, the baseline bug where today was folded into the average today got compared to, and the awkward fact that every HRV-guided training trial is in endurance athletes.

[LINK THE X ARTICLE HERE]
