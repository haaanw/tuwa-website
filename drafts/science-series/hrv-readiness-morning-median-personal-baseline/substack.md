# Substack edition — paste source

**Do not publish from this repo.** Paste-source for Substack. The canonical edition is the
tuwa.app blog post of the same slug and it publishes FIRST.

**Required Substack settings before sending:**
- Set the post's **canonical URL** to `https://tuwa.app/blog/hrv-readiness-morning-median-personal-baseline/`
  (Settings → SEO → Canonical URL), so the newsletter never competes with the site in search.
- Footer CTA: subscribe + App Store link (both at the bottom of this file).

---

## SUBTITLE

Three rules that replaced "whatever reading Apple Health wrote last" — and the awkward fact that every HRV-guided training trial is in endurance athletes.

## POST BODY

I am a designer who vibe-codes. Tuwa gets built by describing what I want to an AI and then arguing with it about the details for hours. I train the way it is built for: basketball plus lifting, self-coached, no back-room staff.

For a long time the app did something I now think was close to dishonest. It took whatever HRV reading Apple Health had written most recently and scored the day against it. If you wear an Apple Watch, that is frequently a reading taken standing in a queue at two in the afternoon.

This issue is about what replaced it, and about the limits of the evidence underneath the whole idea.

### What the number is, and which one you actually get

Heart rate variability is the variation in time between consecutive heartbeats. The reference for how it is measured remains the 1996 Task Force report published in *Circulation* (93(5):1043–1065), which defined the indices everything since has used.

Two matter here. **RMSSD** — the root mean square of successive differences — reflects beat-to-beat variation and is dominated by vagal activity. **SDNN** — the standard deviation of normal-to-normal intervals — captures total variability across the recording, slower rhythms included.

Apple Health gives you SDNN. Almost every athlete-monitoring study I am about to cite used RMSSD, or its natural log, which is the better-behaved index over short recordings (Esco & Flatt, *J Sports Sci Med* 2014, 13(3):535–541).

I want that gap on the record. What transfers across the substitution is the *method* — smooth it, compare it to yourself, standardise conditions. What does not transfer is any specific number from those papers. I do not get to borrow their thresholds, and I do not.

### One reading tells you almost nothing

Daniel Plews' group did the work here.

Their 2012 case comparison of elite triathletes found that the athlete who performed well showed a stable weekly HRV average, while the one who performed poorly showed larger swings around a similar mean — the variation in the variability carried the signal (*Eur J Appl Physiol* 2012, 112(11):3729–3741).

Their 2013 review in *Sports Medicine* turned that into the recommendation the field still runs on: track a weekly rolling average against the individual's own baseline, rather than reacting to daily values (*Sports Med* 2013, 43(9):773–781).

And in 2014 they answered the practical question — how many mornings do you need? Three to four recordings per week approximated a seven-day average (*Int J Sports Physiol Perform* 2014, 9(5):783–790). That result is why partial watch-wearing still yields something usable.

The sober counterweight, which I include because it constrains what I am allowed to claim: Bellenger and colleagues systematically reviewed autonomic heart-rate measures against training status and found the relationship real but modest and direction-dependent, with functional overreaching and genuine adaptation not always separable by HRV alone (*Sports Med* 2016, 46(10):1461–1486).

HRV is one signal. It is not a readiness verdict on its own.

### The three rules I shipped

**Only morning readings count.** Samples timestamped before 11:00 local time. HRV is a momentary measurement, so when it was taken changes what it means, and an afternoon reading after coffee and a commute is not comparable with one on waking. Altini and Plews analysed a large set of longitudinal free-living measurements and showed how strongly alcohol, illness, travel and sleep disruption move these numbers (*Sensors* 2021, 21(23):7932). I cannot enforce a five-minute supine protocol through passive watch data — but I can refuse readings that are not comparable.

**The day's value is the median of those samples, not the mean.** Overnight and early-morning wearable readings arrive in bursts of uneven quality, and a median is not dragged around by a single artefact.

**A day with no morning reading gets no HRV score.** Not filled in from the afternoon, not carried over from yesterday. The recovery score renormalises over the signals that are present and the app states that three of four contributed.

That third rule was the hardest to accept, because it means the app sometimes admits it knows less today than it did yesterday. I believe that is the correct behaviour, and it is not what most apps in this category do.

### The one place two signals are deliberately handled differently

Resting heart rate does **not** get the morning filter.

Apple Watch computes resting heart rate as a daily aggregate and refines it through the day, so its timestamp does not mark a morning reading. Applying an hour filter would include or exclude it more or less at random.

So HRV takes a morning window and resting heart rate takes an all-day per-day value. Two signals, two reductions. I only know this because two independent reviewers flagged it, separately, when I had it wrong.

### The baseline is you, and today is not in it

Tuwa fetches 30 days of history and reduces it to one value per day. The baseline is the mean of the most recent **seven prior days that carried a reading** — which can span more than seven calendar days if the watch comes off some nights.

Today is never part of the baseline today is compared against.

That was a real defect, not a hypothetical. The earlier version fetched a seven-day history that included today's own stored row, so any second run on the same day — reopening the dashboard, filing a wellness check-in — folded today's reading into the average it was about to be measured against. The deviation shrank and the score moved with no new physiology behind it. The same rule now governs the score's trend term, which is an autoregression on the engine's own past output and had exactly the same problem.

The comparison is a ratio: today's morning median over the baseline, mapped to points, where 1.0 scores 70, 1.2 or above scores 100, 0.7 scores 20, clamped to 0–100. Resting heart rate runs the same curve mirrored.

That mapping is a stated convention, not a validated dose-response curve, and it is the piece of this system I most want to replace. A robust estimator — median and median-absolute-deviation based, with outlier clipping — exists in the codebase and runs **shadow-only**: it computes alongside the live score, writes to local rows, and drives nothing anyone sees. It is an open question under evaluation, not a shipped feature, and I make no accuracy claim for it.

### How it enters the score

Four components: HRV against baseline at 30%, resting heart rate at 20%, sleep duration at 25%, subjective wellness at 25%. Missing components cause the remaining weights to renormalise, and the app reports how many signals contributed — because a 68 built from three signals is a different object from a 68 built from four, and a change in coverage must never read as a change in physiology.

A modifier of up to ±10 points then comes from the three-day slope of prior scores, damped through a hyperbolic tangent. A 70 falling from 85 is not the same situation as a 70 climbing from 55. With no data at all, the score is 50 — a stated neutral, not an inference.

### Does HRV-guided training actually work?

Real evidence. Narrow evidence.

Kiviniemi and colleagues ran the first controlled test, and endurance training guided by daily HRV outperformed a predetermined programme (*Eur J Appl Physiol* 2007, 101(6):743–751). Vesterinen and colleagues reproduced the pattern in recreational runners (*Med Sci Sports Exerc* 2016, 48(7):1347–1354). Javaloyes and colleagues found similar results in trained cyclists (*Int J Sports Physiol Perform* 2019, 14(1):23–32; and against block periodization, *J Strength Cond Res* 2020, 34(6):1511–1518). Nuuttila and colleagues compared HRV-guided with predetermined block training on performance and hormonal outcomes (*Int J Sports Med* 2017, 38(12):909–920).

Now notice what all of them share. Endurance sport. Running and cycling. Modest sample sizes. Blocks of a few weeks to a few months. The intervention is typically "swap a hard session for an easy one when the smoothed value falls below an individually determined range."

None studied an amateur who plays a court sport twice a week and lifts three times. There is no published trial telling me how far to reduce a top set when a basketball player's morning HRV is down. Flatt and Esco showed the monitoring approach applies outside endurance sport in a collegiate soccer team (*J Strength Cond Res* 2016, 30(2):378–385) — but that is a monitoring study, not a prescription trial.

So I use HRV the way the evidence supports: one smoothed, individually referenced input to a decision. The adjustment sizes are my engineering judgment, stated as such, and overridable in one tap.

### Not medical advice

HRV, resting heart rate, sleep and wellness are training-planning signals. Tuwa is a training tool, not a medical device. It does not diagnose, treat or prevent injury or illness. Persistent unexplained changes in resting heart rate or HRV, and any symptom that concerns you, belong with a clinician rather than an app.

The canonical version, with every citation linked to PubMed:
https://tuwa.app/blog/hrv-readiness-morning-median-personal-baseline/

---

## FOOTER CTA

If you want the next one — sleep and next-day training capacity is already drafted — subscribe below.

Tuwa is on the App Store: https://apps.apple.com/us/app/tuwa/id6761185505
