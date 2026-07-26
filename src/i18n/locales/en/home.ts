type WidenStrings<T> = T extends string
  ? string
  : T extends readonly any[]
  ? { [K in keyof T]: WidenStrings<T[K]> }
  : { [K in keyof T]: WidenStrings<T[K]> };

const home = {
  // ------------------------------------------------------------------
  // Pavilion homepage (demo-d) — consumed by src/components/home/*.
  // Numbers, motion targets, and assets are identical across locales;
  // only the strings below translate.
  // ------------------------------------------------------------------
  meta: {
    title: 'Stay in Your Strike Zone',
    description: 'Tuwa is the sports-science back room for self-coached basketball players who strength-train seriously.',
  },
  heroScrub: {
    sectionAria: 'Tuwa — your plan, made safe and optimal',
    scoreAria: 'Readiness score 82',
    scoreCaption: 'readiness today',
    lines: ['Your plan.', 'Made safe', 'and optimal.'],
    lead: "Tuwa is the sports-science back room for self-coached athletes. It reads your body — HRV, sleep, resting heart rate, training history — and modulates the plan you authored: today's numbers, a go / modify / hold verdict, and where your load is trending. It never writes your program.",
    sub: 'Built for athletes who train sport skill and strength in parallel.',
    cta: 'Download on the App Store',
    ctaNote: 'iOS 17+ · iPhone',
    scrollCue: 'scroll',
  },
  marquee: {
    sectionAria: 'Product vocabulary',
    srText: 'Strike zone, microdose, match tier, readiness, one fatigue budget, go / modify / hold.',
    terms: ['strike zone', 'microdose', 'match tier', 'readiness', 'one fatigue budget', 'go / modify / hold'],
    pauseLabel: 'pause',
    playLabel: 'play',
  },
  showcase: {
    kicker: '01 · today',
    heading: 'One decision, every day',
    body: "Every session starts with a verdict: go, modify, or hold. Tuwa turns this morning's physiology and yesterday's load into concrete number adjustments — drop the top set five percent, cap the conditioning piece, or take the microdose option and keep the pattern without the cost.",
    lottieAria: 'Animated verdict check mark with a calm pulse ring',
    lottieCaption: 'the verdict, drawn calm',
    aside: 'No chat, no interpretation homework. A verdict, the numbers behind it, and the session you actually meant to do.',
    steps: [
      {
        title: 'The verdict',
        body: "Go, modify or hold — with the exact number changes for today's session, computed from your readiness and where you sit in your plan.",
      },
      {
        title: 'The strike zone',
        body: 'A live view of your acute-to-chronic workload ratio, held inside the band where adaptation outpaces injury risk.',
      },
      {
        title: 'The load trend',
        body: 'One fatigue budget across sport skill, strength and conditioning — and where it is heading over the coming weeks.',
      },
    ],
    verdictAlt: 'Tuwa verdict screen: go / modify / hold with concrete number adjustments',
    strikeZoneAlt: 'Tuwa strike-zone bar showing acute-to-chronic workload ratio',
    workloadAlt: 'Tuwa training load chart with ACWR trend',
  },
  zoneScrub: {
    kicker: '02 · training load',
    heading: 'One fatigue budget',
    body: 'Sport skill, strength, and conditioning drain the same tank. Tuwa tracks them as one load — acute against chronic — and keeps the ratio inside the strike zone. When the trend points at overreach, you see it days before you feel it.',
    barMicro: 'acute : chronic workload ratio',
    zoneLabels: [
      'Undertraining — room to build',
      'In the strike zone',
      'Trending hot — time to modify',
      'Overreach risk — hold',
    ],
    zoneCopy: "The ratio compares the last seven days of load to the last four weeks. Tuwa's job is to keep it inside the strike zone.",
    legend: ['under 0.8 — undertraining', '0.8–1.3 — strike zone', '1.3–1.5 — caution', 'over 1.5 — danger'],
    foot: 'Zone names are always written out — colour is supplementary, never the message.',
    dashboardAlt: 'Tuwa dashboard: hero readiness card scoring 82 with metrics',
    lottieAria: 'Animated readiness gauge with a travertine needle sweeping the tick arc',
    lottieCaption: 'readiness, measured',
    aside: 'The needle is fed by your history, not a population average. Same input, same answer — the engine is deterministic.',
  },
  statsBand: {
    sectionAria: 'Key numbers',
    labels: ['exercises in the movement bank', 'readiness, scored every morning', 'days of load forecast'],
  },
  recovery: {
    kicker: '03 · recovery',
    heading: 'Readiness you can read',
    body: "Overnight HRV, sleep, and resting heart rate are scored against your own rolling baselines — not population norms — and compressed into one number with plain-language reasons. You don't get a dashboard to interpret. You get a score and the why.",
    shotAlt: 'Tuwa recovery screen: HRV and sleep trends against personal baselines',
    quote: 'The back room of a pro team — plan, physiology, and a decision — for athletes who coach themselves.',
  },
  logging: {
    kicker: '04 · logging',
    heading: 'Log fast, between sets',
    body: 'A 1,324-exercise movement bank behind a search-first picker. Weight, reps, done — logging built for chalk-covered thumbs, so the record keeps up with the session instead of slowing it down.',
    movementBankAlt: 'Tuwa movement bank: searchable 1,324-exercise catalog',
    activeWorkoutAlt: 'Tuwa active workout: live set logging',
    workoutLogAlt: 'Tuwa workout log: session history',
  },
  privacyClose: {
    kicker: '05 · privacy',
    heading: 'Your data stays on your phone',
    body: 'Tuwa reads HealthKit — it never writes to it — and raw health data never leaves the device. Only composite scores sync.',
    bullets: [
      'HealthKit access is read-only',
      'Raw HRV, sleep, and heart-rate samples stay on-device',
      'Only composite scores sync to your account',
      'Requires iOS 17 or later',
    ],
    cta: 'Download on the App Store',
    ctaNote: 'your plan, made safe and optimal',
  },
  // ------------------------------------------------------------------
  // Legacy sections below feed the retired pre-Pavilion components
  // (Hero / FeatureGrid / StatsCounter / LandingCTA). No page uses them
  // anymore; kept only so the parked components keep typechecking until
  // they are deleted.
  // ------------------------------------------------------------------
  hero: {
    headline: 'Stay in your strike zone — every workout.',
    subtitle: 'Tuwa is the sports-science back room for self-coached basketball players who lift seriously. Enter your plan, log the match tier, and get a daily go, modify, or hold suggestion with an adjusted top-set number and a one-line reason.',
    loopSteps: ['Plan', 'Check', 'Modify', 'Review'],
    loopAriaLabel: 'Tuwa training loop',
    deviceAlt: 'Tuwa Today screen showing a readiness verdict, planned strength session adjustment, recovery signals, and training load.',
    badgeAlt: 'Download on the App Store',
    badgeAriaLabel: 'Download Tuwa on the App Store',
  },
  stats: {
    heading: 'Built for basketball legs and serious lifting',
    science: {
      title: 'Your moving strike zone',
      desc: 'HRV, resting heart rate, sleep, soreness, match proximity, and lifting history move the day\'s optimal intensity band before you train.',
    },
    privacy: {
      title: 'Match proximity built in',
      desc: 'When a game is inside 48 hours, Tuwa frames the lift as a microdose: cap the top set, skip back-offs, and protect freshness.',
    },
    dayOne: {
      title: 'Local fatigue, not one body score',
      desc: 'Last night\'s game can hammer your legs while your upper body is fine. Tuwa ties that context to today\'s squat or bench decision.',
    },
  },
  cta: {
    headline: 'Keep your plan. Adjust the day.',
    body: 'Tuwa does not write your program or act like a chat coach. You author the plan; Tuwa makes today\'s lift safer and more precise.',
  },
  featureGrid: {
    heading: 'Your plan, made safe and optimal for today',
    features: [
      {
        title: 'Your Plan Input',
        desc: 'Bring in the strength session you already meant to run, with targets, notes, RPE caps, and top-set intent.',
        href: '/features/smart-templates',
      },
      {
        title: 'Lift + Match Logging',
        desc: 'Record sets, reps, load, RPE, RIR, and whether last night was pickup, scrimmage, or match intensity.',
        href: '/features/workload-tracking',
      },
      {
        title: 'Daily Verdict',
        desc: 'See a go, modify, or hold suggestion, an adjusted top-set number, and the reason before you start warming up.',
        href: '/features/recovery-scoring',
      },
      {
        title: 'Back-Room Review',
        desc: 'Review workload, recovery, match proximity, and strength progress without handing the program to an AI coach.',
        href: '/training-load',
      },
    ],
    segmentLabels: ['PLAN', 'LOG', 'VERDICT', 'REVIEW'],
    exploreCta: 'Explore',
  },
} as const;

export default home;
export type Home = WidenStrings<typeof home>;
