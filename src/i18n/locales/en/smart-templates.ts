type WidenStrings<T> = T extends string
  ? string
  : T extends readonly any[]
  ? { [K in keyof T]: WidenStrings<T[K]> }
  : { [K in keyof T]: WidenStrings<T[K]> };

const smartTemplates = {
  meta: {
    title: 'Your Plan Input',
    description:
      'Bring your own strength plan into Tuwa so today\'s readiness verdict can adjust the top set without replacing your programming.',
  },
  hero: {
    outcomeStatement: 'Your plan stays yours',
    hookLine:
      'Tuwa does not write the program. It reads the strength session you authored, then helps you decide how hard to run it today.',
    screenshotAlt:
      'Tuwa app active workout screen showing a Bodyweight Circuit session, session settings, exercise rows, and workout controls',
  },
  howItWorks: {
    heading: 'How it works',
    p1: 'Build the strength sessions you already believe in: lower-body strength after skill work, upper-body lifts between pickup nights, or a simple two-day template around your league schedule. Each session can carry target sets, rep ranges, planned top-set weight, RPE caps, and notes.',
    prescriptionToExecutionHeading: 'From your plan to today\'s decision',
    p2: 'When you open the planned session, Tuwa has enough structure to answer the only useful question: is this still the right dose today? The app can suggest the planned top set, an adjusted number, or a capped microdose without inventing a different workout.',
    p3: 'Actual work is recorded beside the target: set, reps, load, RPE, and reps in reserve. That planned-versus-actual trail is what lets Tuwa connect your own programming to the next readiness verdict.',
    autoregulationHeading: 'A suggestion, not a command',
    p4: 'A planned workout is a starting point, not a commandment. If match proximity, HRV, sleep, soreness, or recent load point down, Tuwa suggests a smaller dose and explains why. You confirm the change or run the original plan.',
    connectHeading: 'No chat coach, no generated program',
    p5: 'Use Tuwa as the sports-science back room for the plan you authored. It sits between planning and execution: quiet enough for the weight room, structured enough to make the day\'s adjustment specific.',
  },
  realProgramming: {
    heading: 'Built for basketball-plus-strength reality',
    p1: 'Your week is not clean. A hard game, a late pickup run, and a lower-body lift can all land within 72 hours. Tuwa keeps the plan visible while physiology decides whether the dose is still inside your strike zone.',
    p2: 'A match within 48 hours changes the framing. Instead of pretending the lift disappeared, Tuwa can suggest a microdose: keep the movement pattern, cap the top set, skip back-offs, and leave the legs fresh enough to play.',
    p3: 'Templates persist over time, so you can review how actual lifting moved against the plan. If squats drift down after high-tier games while bench stays steady, the plan, log, and fatigue context are already connected.',
  },
} as const;

export default smartTemplates;
export type SmartTemplates = WidenStrings<typeof smartTemplates>;
