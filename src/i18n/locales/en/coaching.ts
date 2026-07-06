type WidenStrings<T> = T extends string
  ? string
  : T extends readonly any[]
  ? { [K in keyof T]: WidenStrings<T[K]> }
  : { [K in keyof T]: WidenStrings<T[K]> };

const coaching = {
  meta: {
    title: 'Back-Room Review',
    description:
      "Review workload, recovery, match proximity, and strength progress from the plan you authored.",
  },
  hero: {
    outcomeStatement: 'Be the CEO of your own body',
    hookLine:
      'Tuwa is the sports-science back room: it organizes the evidence, explains the verdict, and leaves the final call with you.',
    screenshotAlt: 'Back-room review screen — coming soon',
  },
  howItWorks: {
    heading: 'How it works',
    p1: "Tuwa starts from your plan and your logs. It reviews the planned strength session, recent lifting work, match tier, soreness, HRV, resting heart rate, and sleep, then turns that evidence into a daily verdict.",
    p2: "The value is timing. You see the suggestion before the lift, not after the week is already messy. If match proximity is high, the review can steer you toward a microdose. If last night's game hit your legs, the review can protect squats without muting upper-body work.",
    p3: "Review is not command and control. Tuwa gives the back-room view: what changed, what number moved, and what adjustment makes sense. You decide whether to accept the suggestion.",
    p4: "The same review loop makes weekly planning cleaner. You can see whether lower-body work repeatedly collides with games, whether upper-body sessions tolerate match weeks better, and whether top-set adjustments are preserving enough stimulus.",
    p5: "Raw HealthKit readings stay on your device. Tuwa uses composite physiology and training context to support your decision, not to turn your body into a dashboard for someone else.",
  },
  coachAthlete: {
    athleteHeading: 'You author the plan',
    athleteP1: "Tuwa is not an AI coach and does not generate a program. If you planned squats, bench, and accessories, that structure remains the structure. The app only evaluates whether today's dose still fits your state.",
    athleteP2: "That matters for amateur competitive basketball players because the hard part is not motivation. It is knowing when to trim your own planned lift so you can keep getting stronger without carrying dead legs into a game.",
    athleteP3: "The verdict is suggest-and-confirm. Go, modify, and hold are prompts with reasons, never a red stop sign.",
    coachHeading: 'Tuwa runs the back room',
    coachP1: "A good back room does not take the whistle from the athlete. It gathers the signals: HealthKit physiology, soreness, recent load, match tier, match proximity, and the planned top set.",
    coachP2: "Then it turns them into one useful sentence: \"Match Saturday — cap the top set, skip back-offs.\" That is specific enough to act on and limited enough to stay honest.",
    coachP3: "Over time, the review shows patterns you can use: which lifts suffer after games, which sessions tolerate match weeks, and when your planned progression is asking for more than the week supports.",
  },
  teamFeatures: {
    heading: 'The review that a whole-body score misses',
    p1: "A whole-body score can say you are 71% recovered. It cannot look at your own plan and say whether today's squat top set should move while bench stays unchanged.",
    p2: "Tuwa's review is tied to the lift in front of you. Lower-body fatigue from a game changes lower-body recommendations first. Upper-body work can remain available when the evidence supports it.",
    p3: "This is the flagship distinction: Last night's game hammered your legs. Today's squat readiness is down — your bench is fine.",
    p4: "That specificity is why Tuwa belongs between a wearable score and your training log.",
  },
  inviteFlow: {
    heading: 'Where each tool stops',
    intro: "Tuwa is deliberately narrow. It does not replace your wearable, your training log, or your judgment; it connects the parts that matter for today's lift.",
    codeMethod: 'Whoop and Bevel-style scores: useful body signals, but no direct knowledge of the strength session you planned.',
    emailMethod: "AI-coach apps: they write the plan. Tuwa does not. The plan stays yours.",
    nfcMethod: 'TrainingPeaks-style planning: strong planning structure, but no daily verdict tied to your physiology.',
    howConnectionLabel: 'Tuwa position',
    step1: 'Your plan',
    step2: 'Physiology and training history',
    step3: 'Go, modify, or hold suggestion',
    step4: 'Athlete confirms the decision',
  },
} as const;

export default coaching;
export type Coaching = WidenStrings<typeof coaching>;
