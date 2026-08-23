# X long-form edition — paste source

**Do not publish from this repo.** Paste-source for X's long-form article composer. The
canonical edition is the tuwa.app blog post of the same slug, and it publishes FIRST.
Attach images natively in X at the marked slots.

- Canonical URL (must be live before this posts): `https://tuwa.app/blog/sleep-and-next-day-training-capacity/`
- Evidence core: identical to the site edition. Every citation intact and verified.
- Claim rails: the context-conditional sleep engine is SHADOW-ONLY. It must never be
  described as a shipping feature, and no accuracy claim may be attached to it in any
  voice. No medical claim anywhere.

---

## ARTICLE TITLE

I read the sleep literature to build a better recovery score. It mostly told me to claim less.

## ARTICLE BODY

I am a designer who vibe-codes. Tuwa gets built by describing what I want to an AI and then arguing with it for hours about the details. I train the way it's built for — basketball plus lifting, self-coached, no back-room staff.

I went into the sleep literature wanting a better recovery score. I came out with a shorter list of things I'm allowed to say.

Here's what's actually established, what isn't, and what I shipped.

[IMAGE SLOT 1 — the sleep detail screen with the 7.5 h target rule visible]

**What one bad night actually costs**

The best synthesis available is Craven et al. (*Sports Medicine* 2022) — a systematic review and meta-analysis of acute sleep loss and physical performance. Sleep loss does impair performance. The size depends on the task, and effects showed up more consistently in afternoon and evening testing than morning testing.

That last detail changed how I think about it. The question isn't just "did I sleep badly." It's "when am I training, and how deep into a day of accumulated wakefulness will I be."

The older experiments give it texture:

Reilly & Piercy (*Ergonomics* 1994) restricted sleep in 8 people and tested weightlifting. Submaximal lifts degraded before maximal ones, and perceived effort rose before output fell. It feels harder before it *is* worse. That pattern shows up over and over.

Skein et al. (*MSSE* 2011) — 30 hours of total deprivation, intermittent-sprint protocol. Reduced sprint performance, pacing changes, altered muscle glycogen. Not a realistic scenario, but it proves the effect isn't purely motivational.

Knowles et al. (*J Sci Med Sport* 2018) reviewed sleep and muscle strength specifically. One night of restriction barely moves maximal strength. Repeated restriction and multi-set work show clearer decrements.

For a lifter that's the most useful sentence in the whole literature: **one bad night probably won't move your top single. A bad week will show up in your volume.**

**The famous study, and why I quote it with caveats every time**

Mah et al. (*Sleep* 2011) had collegiate basketball players extend time in bed to 10 hours for 5–7 weeks. Faster sprints, better free-throw and three-point accuracy, better reaction time and mood.

Every sleep article on the internet cites this. Almost none of them mention:

n = 11. No control group. Unblinded outcomes. A multi-week in-season block during which practice alone would improve shooting.

The result is consistent with a real sleep-extension effect. It is also consistent with training, familiarisation and expectancy. It's a reason to prioritise sleep. It is not an effect size anyone should be quoting as a number.

The related idea with better support is **sleep banking** — Rupp et al. (*Sleep* 2009) extended sleep for a week before a restriction protocol and the extended group held alertness better during restriction and recovered faster. If you know a bad week is coming, going in with sleep in hand is one of the few genuinely evidence-supported preparations available.

**"How much sleep do I need" has no population answer**

The National Sleep Foundation's 7–9 hours is a range for general adult health, not a training target.

The individual-differences evidence is much stronger than the population guidance.

Van Dongen et al. (*Sleep* 2003) established the dose-response between cumulative wakefulness and impairment, and found something uncomfortable: under chronic moderate restriction, deficits keep accumulating while subjective sleepiness plateaus. People adapt to *feeling* fine long before they *are* fine.

Their 2004 follow-up (*Sleep*) showed vulnerability to sleep loss is trait-like and stable — the same people are consistently more or less impaired by the same restriction, and between-person differences dwarf within-person noise.

Which means a fixed hours-per-night target is a population convenience. The honest object is your own need and your own response, and that needs your own data over time.

Also worth knowing: Roberts et al. (*BJSM* 2019) meta-analysed how training and competition affect elite athletes' sleep. Intensified training and night competition disturb it. The periods where recovery matters most are exactly the periods where sleep degrades.

[IMAGE SLOT 2 — the per-night sleep breakdown screen]

**The sleep-injury claim, handled honestly**

Milewski et al. (*J Pediatr Orthop* 2014) surveyed adolescent athletes and found those averaging under 8 hours had substantially higher odds of injury. A 2019 meta-analysis in the same journal (Gao et al.) found the association held.

Both observational. Adolescents who sleep least may simply be doing the most of everything — training volume, school load, travel. Consistent association, worth acting on cautiously. Not evidence that adding sleep prevents injury. Nobody has tested that directly.

**The part almost every training app ignores**

Your sleep stages are the least reliable number on your wrist.

Chinoy et al. (*Sleep* 2021) tested seven consumer sleep trackers against laboratory polysomnography. Total sleep time: reasonable. Stage classification — light, deep, REM: substantially poorer agreement, with real bias. Their 2022 follow-up (*Nat Sci Sleep*) reproduced it at home, in the conditions people actually use these things.

So when an app tells you to train lighter because your deep sleep was low, that recommendation is built on the worst number the device produced.

Duration and timing from a modern wearable: usable. Stage percentages on a single night: not a foundation for a training decision.

**Where the evidence runs out**

Three gaps that bound what any product here can honestly claim.

Nobody has established a dose-response between a night of sleep and a training adjustment. No trial says a five-hour night justifies dropping one back-off set or capping RPE at 7. Every app that adjusts training from sleep — mine included — is applying engineering judgment on top of a directional finding, and should say so out loud.

Chronic partial restriction is under-studied compared to acute loss. The dramatic experiment is one sleepless night. The actual reality is six hours a night for three weeks.

Almost none of this is in amateur multi-sport athletes. The subjects are collegiate teams, elite endurance athletes, or lab volunteers. The person who plays twice a week, lifts three times, and has a job is not in this literature.

**What I actually shipped, including what I didn't**

Sleep is 25% of Tuwa's recovery score, and that contribution is **duration only**, against a fixed 7.5-hour target. Below 5 hours scores 10; the curve rises through 40 at 6 hours and 70 at 7.5, hitting 100 at 9. Sleep is attributed to the day you *woke*, not the day the app happened to run, and the night is identified by clustering raw HealthKit samples so an afternoon nap can't be mistaken for last night.

That is deliberately cruder than the evidence above. No continuity term, no regularity term, no stages — and given Chinoy, leaving stages out of a live score is a feature, not an omission. But a fixed target does contradict the trait-like individual variation Van Dongen established, and I'm not going to pretend otherwise.

There is a context-conditional sleep engine in the codebase — stage-aware, personalised need, explicit night profiles. It runs **shadow-only**. It computes every night on real data, writes to local rows, and drives nothing you see. It is design in development, not a shipping feature, and I'm making no performance or accuracy claim for it. It becomes a product claim the day it's wired to the score, and not one day earlier.

**Not medical advice**

This is training and education content. Sleep duration and recovery scores are training-planning signals; they diagnose and treat nothing. Tuwa is a training tool, not a medical device. Persistent insomnia, or loud snoring with daytime sleepiness, belongs with a clinician — some of these have treatable medical causes no app can detect.

Full version, every citation linked:
https://tuwa.app/blog/sleep-and-next-day-training-capacity/

Tuwa on the App Store:
https://apps.apple.com/us/app/tuwa/id6761185505

---

## TEASER THREAD (2–3 tweets, links the article)

**Tweet 1**
The most-cited sleep study in sports has 11 participants, no control group, and unblinded outcomes.

It's the one everybody quotes to tell you sleep 10 hours.

I read the actual sleep literature to build a better recovery score. Mostly it told me to claim less 👇

**Tweet 2**
Three things that survived:

— one bad night barely moves a max single; a bad week shows up in your volume
— it feels harder before it *is* worse
— sleep banking before a known bad week is one of the few genuinely supported preparations

**Tweet 3**
And the part training apps skip: consumer trackers measure duration reasonably and sleep STAGES badly.

So "train light, your deep sleep was low" is advice built on the worst number your watch produced.

https://tuwa.app/blog/sleep-and-next-day-training-capacity/
