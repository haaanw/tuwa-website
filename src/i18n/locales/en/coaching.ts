type WidenStrings<T> = T extends string
  ? string
  : T extends readonly any[]
  ? { [K in keyof T]: WidenStrings<T[K]> }
  : { [K in keyof T]: WidenStrings<T[K]> };

const coaching = {
  meta: {
    title: 'Coach + Athlete',
    description:
      'Real-time recovery visibility for every athlete you coach. Tuwa connects coaches and athletes with shared workload data, prescribed workouts, and invite-based team management.',
  },
  hero: {
    outcomeStatement: 'Real-time recovery visibility for every athlete you coach',
    hookLine:
      'Connect with your athletes. See their readiness. Prescribe workouts that adapt to how they\'re recovering.',
    screenshotAlt: 'Coach + Athlete Screenshot — coming soon',
  },
  howItWorks: {
    heading: 'How it works',
    p1: "Tuwa's coach-athlete model gives coaches a unified dashboard view of every linked athlete's recovery score, ACWR trends, and recent session history — all from a single screen. Instead of chasing athletes for updates or guessing who's at risk of overtraining, coaches have the data waiting before the first session of the day starts.",
    p2: "The key advantage of real-time visibility is timing. A coach who sees an athlete's readiness score before prescribing today's workout can adjust the session on the spot — reduce volume, swap a high-intensity effort for a technique day, or give a full rest recommendation. That's meaningfully different from reviewing data after the fact and realizing an athlete trained hard on a compromised recovery day.",
    p3: "For in-person coaching sessions where athletes are training and not typing, coaches can log workouts on behalf of their athletes directly from their coach account. Sessions are attributed to the athlete's profile and feed into their workload calculations just as if the athlete had logged it themselves. This is especially useful for group training environments where capturing accurate training data in real time matters.",
    p4: "All data sharing is consent-based. Athletes explicitly choose to link with a coach, and they can unlink at any time. The moment an athlete unlinks, the coach loses all access to their data immediately — no grace period, no residual visibility. This design reflects a core principle: coaching enhances an athlete's training, it doesn't take over their autonomy.",
    p5: "Coaches do not see raw HealthKit data. HealthKit readings — individual HRV measurements, raw heart rate data, sleep stage details — stay on the athlete's device and are never transmitted. What coaches see are composite scores and workout summaries: the recovery score (0–100), ACWR ratio, workload trend over the past 28 days, and session logs showing exercise names, sets, reps, and RPE. Enough to make good coaching decisions, not enough to compromise athlete privacy.",
  },
  coachAthlete: {
    athleteHeading: 'For athletes',
    athleteP1: "Linking with a coach gives them a structured window into your training — recovery scores, workload trends, and session logs — but never your raw health data. Your HRV measurements, sleep stages, and heart rate readings stay local to your device. Your coach sees aggregated readiness and performance data, the same information you see on your dashboard, presented from their perspective.",
    athleteP2: "When your coach prescribes a workout, it loads directly into your session with target placeholders — prescribed sets, reps, weights, and RPE ranges that you can follow or adjust based on how you feel that day. The prescription flows into your normal logging workflow, so you're not juggling separate apps or paper training plans.",
    athleteP3: "You stay in control throughout. Unlink from your coach at any time from the Profile screen — the connection is severed immediately and your coach loses all access. No waiting, no approval process. Coaching enhances your training; it doesn't own it.",
    coachHeading: 'For coaches',
    coachP1: "See every athlete's daily readiness at a glance. Color-coded zones — green, yellow, red — tell you immediately who is primed for a hard session and who needs lighter work today. No checking in with each athlete individually, no guesswork based on how they look warming up. The data is ready before your first conversation.",
    coachP2: "Review ACWR trends to spot athletes approaching dangerous load spikes before they happen. When an athlete's acute workload is climbing too fast relative to their chronic baseline, Tuwa flags it. You have the information you need to intervene — reduce this week's volume, push back a test week, or pull the athlete from a high-load group session — before an injury forces the conversation.",
    coachP3: "Log workouts on behalf of athletes during in-person training sessions, build workout templates and assign them to individuals or groups, and track personal records without athletes needing to self-report. The tools are designed to reduce administrative overhead so you can focus on what coaching actually is — reading athletes and making good decisions.",
  },
  teamFeatures: {
    heading: 'Team workflows',
    p1: "Manage multiple athletes from a single coach account. Your coach dashboard presents all linked athletes in one view, with readiness scores and workload status visible at a glance — no switching between accounts, no separate logins per athlete.",
    p2: "Each athlete's data is fully isolated. Athletes cannot see each other's recovery scores, ACWR trends, or session history. Team visibility is one-directional: coaches see athletes, athletes see their own data and their coach's prescriptions. This separation is important in competitive environments where training data is sensitive.",
    p3: "Group prescriptions let you create a workout template once and assign it to multiple athletes simultaneously. Each athlete receives the template as a prescribed session in their training log, with the same target parameters. From there, you track individual completion and actual performance against the prescription — who hit the targets, who scaled back, and how that tracked with their readiness score that day.",
    p4: "Personal record tracking surfaces athlete PRs automatically from their logged sessions. You see new records as they're achieved without athletes needing to flag them. It's a small thing that closes a gap between what's happening in training and what you as a coach are aware of.",
  },
  inviteFlow: {
    heading: 'Connect in seconds',
    intro: "Three ways to link athletes to your coaching account, depending on what's convenient in the moment. No friction between deciding to coach someone and actually having their data visible.",
    codeMethod: '6-character invite code — Generate a code from your Profile screen and share it verbally or by text. Works in any setting.',
    emailMethod: "Email invitation — Send a deep link to the athlete's email. They tap the link and the connection is established instantly.",
    nfcMethod: 'NFC tap — Hold phones together. Ideal for in-person sessions where you\'re onboarding athletes on the spot.',
    howConnectionLabel: 'How connection works',
    step1: 'Coach taps "Invite Athlete" in their Profile screen',
    step2: 'Share the invite code, send an email link, or use NFC tap',
    step3: "Athlete enters the code or taps the link in their app",
    step4: "Connected — the coach's dashboard updates immediately with the athlete's data",
  },
} as const;

export default coaching;
export type Coaching = WidenStrings<typeof coaching>;
