# Tuwa Website Claim Audit

Scope: English website copy under `src/i18n/locales/en/`, `src/pages/`, `src/data/seoGeoPages.ts`, and the published English blog post. App evidence was checked against the UIKit shell in `/Users/hanwen/Desktop/Tonus/WorkloadApp/App/AppShell.swift` plus Services/Models. This audit did not edit website copy.

Important coach finding: the current UIKit shell still surfaces coach mode, roster, athlete invite, plan assignment/prescription, and reports behind coach role/subscription checks. It is not fully stripped. However, several coach-adjacent claims remain unsupported in the surfaced app: NFC invite, unlink UI, and coach logging workouts on behalf of athletes.

## Must Fix Before Publish

| Claim (quoted) | Source file:line | Verdict | Evidence | Recommended action |
| --- | --- | --- | --- | --- |
| "last night's game hammered your legs, today's squat readiness is down, and your bench is fine" and variants like "legs down, bench still fine" | `src/i18n/locales/en/workload-tracking.ts:16`, `src/pages/features/workload-tracking.astro:43`, `src/i18n/locales/en/compare.ts:58`, `src/i18n/locales/en/for-coaches.ts:19` | INFLATED | `Tonus/WorkloadApp/Services/CrossModalShadowGate.swift:10-38` says `crossModalDrivesVerdict` defaults false and cross-modal is forbidden from influencing verdicts. `TodayVerdictService.swift:109-123` computes cross-modal but passes it through the gated verdict path. | Cut these claims or gate them behind dogfood until cross-modal verdict influence is actually enabled. |
| "match tier" moves the readiness/verdict/intensity band | `src/i18n/locales/en/home.ts:21`, `src/i18n/locales/en/compare.ts:26`, `src/i18n/locales/en/coaching.ts:21`, `src/i18n/locales/en/recovery-scoring.ts:22`, `src/i18n/locales/en/for-coaches.ts:27` | INFLATED | Match tier is logged in `AppShell.swift:8119-8121`, but live verdict input is `nextMatchDate`/proximity, not match tier: `TodayVerdictService.swift:60-74`. | Soften to "match proximity" for verdict claims. Keep "match tier is logged context" only where not described as driving the verdict. |
| "population-level baselines", "actionable guidance from day one", and "confidence intervals narrow" | `src/i18n/locales/en/cold-start.ts:21-34`, `src/pages/features/cold-start.astro:36-99`, `src/i18n/locales/en/readiness-score.ts:49`, `src/i18n/locales/en/methodology.ts:44`, `src/i18n/locales/en/support.ts:40` | INFLATED | `ColdStartEngine.swift:3-16` and `TrainingProfile.swift:1-98` seed workload estimates from questionnaire answers. `TodayVerdictService.swift:93-104` explicitly defers rather than trimming on a guess. `RecoveryScoreEngine.swift:138-151` returns neutral 50 when no data exists; no population-baseline or confidence-interval surface found. | Rewrite cold-start around workload seeding/profile setup, or cut the cold-start page until population baseline and confidence UI ship. |
| "use NFC to connect with your coach instantly" | `src/i18n/locales/en/support.ts:32` | INFLATED | `AppShell.swift:2380-3060` exposes athlete code and coach email invite modes. `rg NFC` found no surfaced NFC path in AppShell/Services/Models. | Cut NFC from support copy. |
| "body temperature" is weighted into the daily readiness signal | `src/i18n/locales/en/support.ts:16` | INFLATED | `HealthKitService.swift:107-117` reads body temperature, but `RecoveryScoreEngine.swift:81-84` weights only HRV, resting HR, sleep, and wellness. | Remove body temperature from scoring claims, or say it may be collected/stored where available but is not part of the score. |
| "Tuwa detects load spikes before you execute the session" / "when a planned session would create a large spike" | `src/i18n/locales/en/training-load.ts:37`, `src/i18n/locales/en/methodology.ts:28`, `src/i18n/locales/en/support.ts:36` | INFLATED | `WorkoutPipeline.swift:15-60` computes workload snapshots and spike flags after a workout is saved. No planned-session ACWR simulation surfaced in the UIKit verdict path. | Soften to "recent workload context is shown before training" or implement planned-load simulation. |
| "push, maintain, reduce, swap, or recover" as current app output | `src/content/blog/how-to-adjust-strength-training-when-hrv-is-low.mdx:34`, `src/data/seoGeoPages.ts:588`, `src/data/seoGeoPages.ts:905` | DORMANT/STRIPPED | Older `AutoregulationEngine.swift:41-56` still has richer recommendation types, but the surfaced Train-tab verdict uses `TodayVerdictEngine.swift:52-56` go/modify/hold. | Align app-output claims to go/modify/hold. Keep push/maintain/reduce/swap/recover only for the standalone website calculator if desired. |
| "You can unlink from a coach at any time" and "Coaches who log workouts on behalf of athletes" | `src/i18n/locales/en/privacy.ts:82`, `src/pages/privacy.astro:46`, `src/i18n/locales/en/terms.ts:60-61`, `src/pages/terms.astro:31-32` | DORMANT/STRIPPED | `rg unlink/disconnect` found no AppShell UI. `WorkoutSession.loggedByCoachId` exists in `Models/WorkoutSession.swift:14`, but AppShell search found no coach surface for logging workouts on behalf. | Gate behind dogfood or rewrite as policy/future capability, not current app behavior. |

## Home Page

| Claim (quoted) | Source file:line | Verdict | Evidence | Recommended action |
| --- | --- | --- | --- | --- |
| "sports-science back room for self-coached basketball players who lift seriously" | `src/i18n/locales/en/home.ts:10`, `src/pages/index.astro:9` | SHIPPED | AppShell athlete mode is self-coached by default with Train/Insights/Profile tabs: `AppShell.swift:66-101`. Basketball match context is present via next-match and match-tier UI: `AppShell.swift:4320-4885`, `AppShell.swift:7930-8170`. | Keep. |
| "Enter your plan, log the match tier, and get a daily go, modify, or hold suggestion with an adjusted top-set number and a one-line reason." | `src/i18n/locales/en/home.ts:10` | SHIPPED | Plan Today and template flows are surfaced in `AppShell.swift:5580-6405`; verdict card and accept/keep actions are in `AppShell.swift:4320-4885`; go/modify/hold is defined in `TodayVerdictEngine.swift:52-56`. | Keep, but avoid implying match tier drives the verdict. |
| "HRV, resting heart rate, sleep, soreness, match tier, and lifting history move the day's optimal intensity band before you train." | `src/i18n/locales/en/home.ts:21` | INFLATED | HRV/RHR/sleep/history/wellness are live inputs, but match tier is not a verdict input; only `nextMatchDate` enters `TodayVerdictService.swift:60-74`. | Replace "match tier" with "match proximity" or split "match tier is logged context" from verdict influence. |
| "When a game is inside 48 hours, Tuwa frames the lift as a microdose: cap the top set, skip back-offs, and protect freshness." | `src/i18n/locales/en/home.ts:25` | SHIPPED | Match proximity microdose logic exists in `TodayVerdictEngine.swift:225-247`; reason text exists in `VerdictReasonBuilder.swift:80-96`. | Keep, but consider "within about two days" because the code uses calendar-day proximity, not exact 48-hour math. |
| "Last night's game can hammer your legs while your upper body is fine. Tuwa ties that context to today's squat or bench decision." | `src/i18n/locales/en/home.ts:29` | INFLATED | Cross-modal verdict influence is hard-gated off: `CrossModalShadowGate.swift:10-38`. | Cut or gate behind dogfood. |
| "Tuwa does not write your program or act like a chat coach. You author the plan; Tuwa makes today's lift safer and more precise." | `src/i18n/locales/en/home.ts:34` | SHIPPED | Plan import/parser and manual/template entry exist, but no chat coach/program generator was found in AppShell. `AppShell.swift:6104-6329` labels parsing as local/AI-assisted import, not generation. | Keep. |

## Smart Templates

| Claim (quoted) | Source file:line | Verdict | Evidence | Recommended action |
| --- | --- | --- | --- | --- |
| "Build the workout once. Let the day's verdict adjust the dose." | `src/i18n/locales/en/smart-templates.ts:11` | SHIPPED | Template management and Plan Today flows are surfaced in `AppShell.swift:5580-6405` and `AppShell.swift:6806-7908`. | Keep. |
| "Your authored workout is a starting point, not a commandment... Tuwa suggests a smaller dose and explains why." | `src/i18n/locales/en/smart-templates.ts:24` | SHIPPED | Verdict suggestions write adjusted top set/backoff/RPE cap into planned session: `TodayVerdictService.swift:257-380`; resolved plan applies accepted cuts in `ResolvedSessionPlan.swift:1-135`. | Keep. |
| "No chat coach, no generated program" | `src/i18n/locales/en/smart-templates.ts:28` | SHIPPED | AppShell has manual/template/text import surfaces, not a conversational program generator: `AppShell.swift:5580-6405`. | Keep. |
| "A hard game, a late pickup run, and a lower-body lift can all land within 72 hours... physiology decides whether the dose is still inside your strike zone." | `src/i18n/locales/en/smart-templates.ts:33` | INFLATED | Match proximity can influence microdose, but prior game/pickup intensity does not drive current verdict while cross-modal is gated off: `CrossModalShadowGate.swift:10-38`. | Soften to scheduled match proximity and current physiology only. |
| "If squats drift down after high-tier games while bench stays steady, the plan, log, and fatigue context are already connected." | `src/i18n/locales/en/smart-templates.ts:35` | INFLATED | High-tier game carryover into lift-specific verdict is gated off; no surfaced pattern review for this exact claim found. | Cut or gate behind dogfood. |

## Workload Tracking

| Claim (quoted) | Source file:line | Verdict | Evidence | Recommended action |
| --- | --- | --- | --- | --- |
| "Every lift you log in Tuwa carries... exercise, sets, reps, load, RPE, and reps in reserve. Basketball work gets its own context through match tier logging..." | `src/i18n/locales/en/workload-tracking.ts:22`, `src/pages/features/workload-tracking.astro:35` | SHIPPED | Active workout and template set inputs include load/reps/RPE/RIR-style fields: `AppShell.swift:8276-8679`; match tier appears in session settings: `AppShell.swift:7930-8170`. | Keep, but avoid saying match tier changes the verdict. |
| "Log lifting work and basketball match tier together so Tuwa can separate leg fatigue from upper-body readiness." | `src/i18n/locales/en/workload-tracking.ts:11`, `src/pages/features/workload-tracking.astro:10` | INFLATED | Cross-modal separation is explicitly dark-only: `CrossModalShadowGate.swift:10-38`. | Cut or gate behind dogfood. |
| "the verdict can say: legs down, bench still fine" | `src/i18n/locales/en/workload-tracking.ts:16`, `src/pages/features/workload-tracking.astro:15` | INFLATED | No shipped lift-region verdict influence from court work; cross-modal gate is false. | Cut. |
| "Tuwa uses exponentially weighted moving averages so recent sessions matter more than older ones." | `src/i18n/locales/en/workload-tracking.ts:34`, `src/pages/features/workload-tracking.astro:94` | SHIPPED | EWMA workload calculation is in `WorkloadCalculator.swift:1-180`; `WorkoutPipeline.swift:15-60` stamps ATL/CTL snapshots after sessions. | Keep. |
| "See PRs, session history, and load changes in one place." | `src/i18n/locales/en/home.ts:51` | SHIPPED | PR detection and workload snapshot generation run after workouts: `WorkoutPipeline.swift:15-60`; Insights surfaces recovery/workload/session history in `AppShell.swift:10004-11654`. | Keep. |

## Recovery Scoring

| Claim (quoted) | Source file:line | Verdict | Evidence | Recommended action |
| --- | --- | --- | --- | --- |
| "Tuwa turns HRV, sleep, resting heart rate, training history, soreness, and match proximity into a suggested adjustment for the lift you planned." | `src/i18n/locales/en/recovery-scoring.ts:15`, `src/pages/features/recovery-scoring.astro:16` | SHIPPED | `TodayVerdictService.swift:60-124` combines recovery signals, sessions, fatigue/load, and `nextMatchDate`; `TodayVerdictEngine.swift:225-247` handles match proximity. | Keep. |
| "It pairs those signals with your training history, soreness, and the match tier you logged, then evaluates the strength session you planned." | `src/i18n/locales/en/recovery-scoring.ts:22`, `src/pages/features/recovery-scoring.astro:50` | INFLATED | Match tier is logged but not part of the live verdict input. | Replace "match tier" with "match proximity" or "logged match context". |
| "The output is not just a score. It is a proposed adjustment: go, modify, or hold..." | `src/i18n/locales/en/recovery-scoring.ts:25` | SHIPPED | Verdict enum and suggestion shape exist in `TodayVerdictEngine.swift:52-76`; Train tab presents verdict card in `AppShell.swift:4450-4605`. | Keep. |
| "The planned session, match proximity, soreness, and recent training history give the signal training context." | `src/i18n/locales/en/recovery-scoring.ts:39`, `src/pages/features/recovery-scoring.astro:116` | SHIPPED | Planned session and training history are sourced by `TodayVerdictService.swift:60-124`; match proximity is passed as `nextMatchDate`. | Keep. |
| "last court session pickup/scrimmage/match intensity" affects the verdict | `src/i18n/locales/en/recovery-scoring.ts:29` | INFLATED | Court-session intensity/match tier is not used as a live verdict input while cross-modal influence is off. | Cut or rewrite as logged context only. |

## Back-Room Review / Coaching

| Claim (quoted) | Source file:line | Verdict | Evidence | Recommended action |
| --- | --- | --- | --- | --- |
| "Review workload, recovery, match proximity, and strength progress from the plan you authored." | `src/i18n/locales/en/coaching.ts:11`, `src/i18n/locales/en/home.ts:56` | SHIPPED | Workload/recovery/session history and PRs are surfaced in Insights: `AppShell.swift:10004-11654`; match proximity appears in Train verdict: `AppShell.swift:4320-4885`. | Keep. |
| "It reviews the planned strength session, recent lifting work, match tier, soreness, HRV, resting heart rate, and sleep, then turns that evidence into a daily verdict." | `src/i18n/locales/en/coaching.ts:21` | INFLATED | Same match-tier issue: `TodayVerdictService.swift:60-74` accepts next match date, not match tier. | Replace "match tier" with "match proximity"; keep other inputs. |
| "If last night's game hit your legs, the review can protect squats without muting upper-body work." | `src/i18n/locales/en/coaching.ts:22` | INFLATED | Cross-modal verdict influence is forbidden while gate is false: `CrossModalShadowGate.swift:10-38`. | Cut or dogfood-gate. |
| "You can see whether lower-body work repeatedly suffered after high-tier games..." | `src/i18n/locales/en/coaching.ts:24` | DORMANT/STRIPPED | Coach/Insights views show history and reports, but no surfaced high-tier-game pattern review found in `AppShell.swift:10004-13240`. | Soften to manual review of history, or cut until pattern UI ships. |
| "There is no generated program, no chat persona, and no fake certainty." | `src/i18n/locales/en/coaching.ts:29` | SHIPPED | No chat coach/program generator surfaced in AppShell. | Keep. |
| "Raw HealthKit readings stay on the device." | `src/i18n/locales/en/coaching.ts:35` | SHIPPED | HealthKit data is read locally in `HealthKitService.swift:1-260`; sync pushes composite app models in `SyncService.swift:1-140`, not raw HealthKit samples. | Keep. |
| "You confirm the change or run the original plan." | `src/i18n/locales/en/coaching.ts:48` | SHIPPED | Verdict card offers accept/keep actions in `AppShell.swift:4517-4587`; resolved plan applies accepted/kept path in `ResolvedSessionPlan.swift:1-135`. | Keep. |

## For Coaches / Self-Coached

| Claim (quoted) | Source file:line | Verdict | Evidence | Recommended action |
| --- | --- | --- | --- | --- |
| "Tuwa gives you the sports-science back room usually reserved for athletes with coaching, physio, and strength staff." | `src/i18n/locales/en/for-coaches.ts:12` | SHIPPED | Broad positioning aligns with self-coached athlete surface: Train verdict, plan, recovery, workload, and Insights are in `AppShell.swift:4320-6405` and `AppShell.swift:10004-11654`. | Keep. |
| "your legs took the hit, adjust squats, bench is still available" | `src/i18n/locales/en/for-coaches.ts:19` | INFLATED | Cross-modal/lift-region carryover does not drive verdicts while `CrossModalShadowGate.crossModalDrivesVerdict` is false. | Cut or dogfood-gate. |
| "adds training history, soreness, match tier, and match proximity, then returns a go, modify, or hold suggestion" | `src/i18n/locales/en/for-coaches.ts:27` | INFLATED | Training history/soreness/proximity are supported; match tier is not a live verdict input. | Remove "match tier" from verdict-influence list. |
| "Adjusted top-set: your plan stays intact, but today's number can move." | `src/i18n/locales/en/for-coaches.ts:28` | SHIPPED | `TodayVerdictEngine.swift:69-76` outputs adjusted load/backoff/RPE; AppShell shows adjusted top set in the verdict card. | Keep. |
| "Cross-modal fatigue: last night's game can lower squat readiness without blocking bench." | `src/i18n/locales/en/for-coaches.ts:34` | INFLATED | Cross-modal gate is false by default and not set in production code: `CrossModalShadowGate.swift:34-46`. | Cut or dogfood-gate. |
| "Tuwa does not write your program, predict injury, or replace judgment." | `src/i18n/locales/en/for-coaches.ts:41` | SHIPPED | No surfaced program generator, chat coach, or injury prediction found in AppShell/Services. | Keep. |

## Compare

| Claim (quoted) | Source file:line | Verdict | Evidence | Recommended action |
| --- | --- | --- | --- | --- |
| "Tuwa keeps your own plan in charge, then uses physiology, training history, and match proximity to suggest today's strength adjustment." | `src/i18n/locales/en/compare.ts:7` | SHIPPED | Plan is authored/imported by the athlete; `TodayVerdictService.swift:60-124` evaluates today's planned session with physiology/history/proximity. | Keep. |
| "whether Saturday's match is inside 48 hours" | `src/i18n/locales/en/compare.ts:18` | SHIPPED | Match proximity microdose exists in `TodayVerdictEngine.swift:225-247`. | Keep, preferably as "about two days" if precision matters. |
| "It fuses that plan with HRV, resting heart rate, sleep, training history, soreness, match tier, and match proximity..." | `src/i18n/locales/en/compare.ts:26` | INFLATED | Match tier is not part of `TodayVerdictService.evaluateTodaysPlannedSession` input; next match date is. | Remove "match tier" from fused-verdict list. |
| "No generated program and no chat coach." | `src/i18n/locales/en/compare.ts:48` | SHIPPED | No surfaced chat coach/program generator found. | Keep. |
| "Match tier and lift context: last night's game hammered your legs; bench may still be fine." | `src/i18n/locales/en/compare.ts:58` | INFLATED | Cross-modal verdict influence is dark-only: `CrossModalShadowGate.swift:10-38`. | Cut or dogfood-gate. |

## Training Load / Methodology

| Claim (quoted) | Source file:line | Verdict | Evidence | Recommended action |
| --- | --- | --- | --- | --- |
| "Training load is volume times intensity... acute vs chronic load and ACWR provide workload context" | `src/i18n/locales/en/training-load.ts:6` | SHIPPED | `WorkloadCalculator.swift:1-180` computes sRPE/TRIMP, ATL/CTL, and ACWR. | Keep. |
| "Tuwa detects load spikes before you execute the session, not after." | `src/i18n/locales/en/training-load.ts:37` | INFLATED | Spike detection is post-session in `WorkoutPipeline.swift:15-60`; planned-session spike simulation not found. | Soften or implement planned-load forecast. |
| "Each morning, Tuwa pulls overnight physiological data from Apple HealthKit and combines it with a short wellness check-in to produce a single readiness number between 0 and 100." | `src/i18n/locales/en/methodology.ts:17` | SHIPPED | HealthKit reads HRV/RHR/sleep in `HealthKitService.swift:1-260`; score is computed by `RecoveryPipeline.swift:1-115` and `RecoveryScoreEngine.swift:1-220`. | Keep. |
| "none of them is judged against a population norm — every signal is compared to your own recent trend." | `src/i18n/locales/en/methodology.ts:17` | SHIPPED | `RecoveryScoreEngine.swift:17` says baseline is a 7-day individual rolling average. | Keep. |
| "it flags spikes before you train, not after." | `src/i18n/locales/en/methodology.ts:28` | INFLATED | Same planned-spike gap as above. | Soften. |
| "Raw HealthKit data stays on-device. The app computes recovery, load, and recommendations locally." | `src/i18n/locales/en/methodology.ts:36` | SHIPPED | `HealthKitService.swift:1-260`; sync uses composite app models via `SyncService.swift:1-140`. | Keep. |

## Readiness Score / Cold Start

| Claim (quoted) | Source file:line | Verdict | Evidence | Recommended action |
| --- | --- | --- | --- | --- |
| "Tuwa builds your score from four inputs, each compared against your personal baseline..." | `src/i18n/locales/en/readiness-score.ts:25` | SHIPPED | `RecoveryScoreEngine.swift:7-18` weights HRV, RHR, sleep, and wellness against individual baselines/trends where available. | Keep; clarify that sleep quality enters through wellness/check-in, while HealthKit sleep contribution is duration. |
| "Only composite scores sync if you choose to share them with a coach." | `src/i18n/locales/en/readiness-score.ts:48` | SHIPPED | Coach views consume recovery/workload/session summaries in `AppShell.swift:11780-13240`; raw HealthKit samples are not synced. | Keep, but verify account/sync wording separately from app capability. |
| "the score is useful from day one. Tuwa starts with population baselines..." | `src/i18n/locales/en/readiness-score.ts:49` | INFLATED | No population baselines found; no-data recovery result is neutral 50 in `RecoveryScoreEngine.swift:138-151`; verdict cold-start defers in `TodayVerdictService.swift:93-104`. | Cut or rewrite. |
| "Honest guidance from day one — even without historical data." | `src/i18n/locales/en/cold-start.ts:11`, `src/pages/features/cold-start.astro:8` | INFLATED | Cold-start questionnaire seeds workload estimates only: `ColdStartEngine.swift:3-16`; live verdict defers rather than trims on no real input. | Rewrite around workload setup, not full guidance. |
| "population-level baselines drawn from validated sports science literature" | `src/i18n/locales/en/cold-start.ts:21`, `src/pages/features/cold-start.astro:36` | INFLATED | Not found in app Services/Models. | Cut. |
| "Your first recovery score reflects both sources, clearly labeling which factors are based on your personal data and which are supplemented by population baselines." | `src/i18n/locales/en/cold-start.ts:23`, `src/pages/features/cold-start.astro:44` | INFLATED | Recovery score model has no population-source labels; no AppShell surface found. | Cut. |
| "confidence intervals narrow" / "You watch the model learn." | `src/i18n/locales/en/cold-start.ts:25-34`, `src/pages/features/cold-start.astro:52-99` | INFLATED | No confidence-interval UI or model-state surface found in AppShell/Services. | Cut until shipped. |
| "Training load is accurate from the first logged workout." | `src/i18n/locales/en/cold-start.ts:28` | SHIPPED | Workload snapshots are computed after workouts via `WorkoutPipeline.swift:15-60`; cold-start training profile seeds estimates through `ColdStartEngine.swift:59-95`. | Keep, but "accurate" may be better softened to "starts building". |

## Support / Privacy / Terms

| Claim (quoted) | Source file:line | Verdict | Evidence | Recommended action |
| --- | --- | --- | --- | --- |
| "HRV, resting heart rate, sleep duration, body temperature, and your morning wellness check-in" are synthesized into readiness | `src/i18n/locales/en/support.ts:16` | INFLATED | Body temperature is read/stored but not weighted by `RecoveryScoreEngine.swift:81-84`. | Remove body temperature from scoring list. |
| "The app works fully offline." | `src/i18n/locales/en/support.ts:24` | SHIPPED | Core data lives in SwiftData models and HealthKit reads; sync is optional/cloud feature. | Keep. |
| "raw HealthKit data never leaves your device" | `src/i18n/locales/en/support.ts:24`, `src/i18n/locales/en/privacy.ts:67`, `src/pages/privacy.astro:46` | SHIPPED | Raw HealthKit samples are read locally by `HealthKitService.swift:1-260`; sync pushes composite app records in `SyncService.swift:1-140`. | Keep. |
| "No. You can manually log workouts, track training load, and complete wellness check-ins without a wearable." | `src/i18n/locales/en/support.ts:20` | SHIPPED | Manual workout/template/check-in surfaces exist in `AppShell.swift:5580-6405`, `AppShell.swift:7930-8995`, and `AppShell.swift:10224-10561`. | Keep. |
| "share a 6-character invite code, send an email invitation, or use NFC" | `src/i18n/locales/en/support.ts:32` | INFLATED | Six-character code and coach email invite are present in `AppShell.swift:2380-3060`; NFC was not found. | Cut NFC. |
| "when a planned session would create a large spike, the app prompts you to review volume, intensity, or timing before you train." | `src/i18n/locales/en/support.ts:36` | INFLATED | No planned-session spike simulation found; workload spike detection is post-session. | Soften to recent-workload context. |
| "If you link with a coach, they can view recovery scores, workload trends, workout summaries, and wellness check-in ratings." | `src/i18n/locales/en/privacy.ts:75-82`, `src/pages/privacy.astro:39-46` | SHIPPED | Coach roster/detail/report views fetch linked athletes and show recovery/workload/sessions/prescriptions: `AppShell.swift:11780-13240`. | Keep, note coach-role gated. |
| "you can unlink from a coach at any time" | `src/i18n/locales/en/privacy.ts:82`, `src/pages/privacy.astro:46`, `src/i18n/locales/en/terms.ts:60` | DORMANT/STRIPPED | `rg unlink/disconnect` found no AppShell UI or service path. | Add unlink UI before publish or soften to support request/policy wording. |
| "Coaches who log workouts on behalf of athletes do so with attribution." | `src/i18n/locales/en/terms.ts:61`, `src/pages/terms.astro:32` | DORMANT/STRIPPED | `WorkoutSession.loggedByCoachId` exists in `Models/WorkoutSession.swift:14`, but no coach workout-logging UI was found in AppShell. | Gate behind dogfood or cut from current Terms copy. |
| "coach-athlete collaboration" | `src/i18n/locales/en/terms.ts:21`, `src/pages/terms.astro:8` | SHIPPED | AppShell still has coach context, roster, invite athlete, prescribe plan, assign plan, and reports: `AppShell.swift:11780-13240`. | Keep as role/subscription-gated. |

## SEO Catch-All Pages / Blog

| Claim (quoted) | Source file:line | Verdict | Evidence | Recommended action |
| --- | --- | --- | --- | --- |
| "Add your signals to estimate whether to push, maintain, reduce, swap, or recover." | `src/pages/[...seoGeo].astro:173`, `src/data/seoGeoPages.ts:261` | SHIPPED | This is implemented by the standalone website calculator itself in `src/pages/[...seoGeo].astro:274-373`. | Keep if clearly framed as calculator output, not app output. |
| "The app helps you decide whether to push, maintain, reduce, swap, or recover before the session happens." | `src/content/blog/how-to-adjust-strength-training-when-hrv-is-low.mdx:34` | DORMANT/STRIPPED | Current surfaced app verdict is go/modify/hold: `TodayVerdictEngine.swift:52-56`. | Update blog to go/modify/hold plus adjusted top-set/backoff language. |
| "Tuwa frames the output as push, maintain, reduce, swap, or recover" | `src/data/seoGeoPages.ts:588` | DORMANT/STRIPPED | Same old-output mismatch. | Align to current app verdict language, or explicitly label as free calculator framing. |
| "The output is a practical change: push, maintain, reduce, swap, or recover." | `src/data/seoGeoPages.ts:905` | DORMANT/STRIPPED | Same old-output mismatch. | Align to current app verdict language. |
| "It keeps the output concrete: reduce volume, cap RPE, swap intensity, or recover." | `src/data/seoGeoPages.ts:986` | DORMANT/STRIPPED | App can reduce load/cut backoffs/cap RPE/hold, but no surfaced "swap intensity" output in current Train verdict. | Replace with go/modify/hold and specific shipped adjustments. |
| "A useful weekly training review connects what you planned, what you completed... and what should change next week." | `src/data/seoGeoPages.ts:828-851` | DORMANT/STRIPPED | App has Insights/history and coach reports, but no surfaced weekly review workflow with next-week adjustment output found in AppShell. | Soften to "review history" or build weekly review. |
| "Tuwa is an Apple Watch-first alternative... recovery signals, workout logging, soreness, RPE, workload, and a plain-English adjustment" | `src/data/seoGeoPages.ts:948-959` | SHIPPED | HealthKit/Apple Health recovery, workout logging, soreness/wellness, RPE, workload, and verdict reason are all surfaced. | Keep. |

## Verdict Counts

Detailed claim rows counted above:

- SHIPPED: 37
- DORMANT/STRIPPED: 8
- INFLATED: 25
