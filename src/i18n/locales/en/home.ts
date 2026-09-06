type WidenStrings<T> = T extends string
  ? string
  : T extends readonly any[]
  ? { [K in keyof T]: WidenStrings<T[K]> }
  : { [K in keyof T]: WidenStrings<T[K]> };

const home = {
  // ------------------------------------------------------------------
  // Field Notes homepage (Session X — the Astro port of the locked
  // .design-explorations/website-v2-demo). Section order and numbering:
  // hero → 01 today → 02 training load → 03 the system → 04 logging →
  // stats → 05 recovery → 06 methodology → ghost band → 07 privacy.
  // Numbers, motion targets, and assets are identical across locales;
  // only the strings below translate.
  // ------------------------------------------------------------------
  meta: {
    title: 'Stay in Your Strike Zone',
    description:
      'Tuwa is the sports-science back room for self-coached athletes. You write the plan; Tuwa returns today’s dose: go, modify, or hold. It never writes your program.',
  },
  heroScrub: {
    sectionAria: 'Tuwa — your plan, made safe and optimal',
    scoreAria: 'Readiness score 82',
    scoreCaption: 'readiness today',
    // Annotation voice, so it stays a phrase and never a sentence.
    strapline: 'Tuwa // the sports-science back room',
    lines: ['Your plan.', 'Made safe', 'and optimal.'],
    lead: "Tuwa is the sports-science back room for self-coached athletes. It reads your body — HRV, sleep, resting heart rate, training history — and modulates the plan you authored: today's numbers, a go / modify / hold verdict, and where your load is trending. It never writes your program.",
    sub: 'Built for athletes who train sport skill and strength in parallel',
    cta: 'Download on the App Store',
    ctaNote: 'iOS 17+ · iPhone',
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
        body: 'One fatigue budget across sport skill, strength and conditioning — and how it is trending, week by week.',
      },
    ],
    verdictAlt: 'Tuwa verdict screen: go / modify / hold with concrete number adjustments',
    strikeZoneAlt: 'Tuwa strike-zone bar showing acute-to-chronic workload ratio',
    workloadAlt: 'Tuwa training load chart with ACWR trend',
  },
  zoneScrub: {
    kicker: '02 · training load',
    heading: 'One fatigue budget',
    body: 'Sport skill, strength, and conditioning drain the same tank. Tuwa tracks them as one load — acute against chronic — and keeps the ratio inside the strike zone. When the trend points at overreach, you see it while there is still time to modify.',
    barMicro: 'acute : chronic workload ratio',
    barNow: 'now',
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
  system: {
    kicker: '03 · the system',
    heading: 'The whole system, one gesture',
    body: "Recovery, today's decision, and the set you are in the middle of — one canvas each, no dashboard to assemble.",
    recoveryAlt: 'Tuwa recovery screen: HRV and sleep trends against personal baselines',
    dashboardAlt: 'Tuwa dashboard: hero readiness card scoring 82 with metrics',
    activeWorkoutAlt: 'Tuwa active workout: live set logging',
  },
  // 1.7.2 — voice logging. The LLM is a PARSER: it turns one sentence into a
  // draft. Never write it as a chat, an assistant, or a coach you talk to.
  // Voice logging is shipped and free on every tier, so present tense is
  // sanctioned here (§10 claim rails).
  logging: {
    kicker: '04 · logging',
    heading: 'Say the session, or scrub it in',
    body: "Describe the workout out loud, type the same sentence, or use the keyboard's dictation mic — three doors, one pipeline. Tuwa parses it into an editable draft with every set filled in. Nothing saves until you confirm it, and any number is still yours to correct by hand.",
    doors: ['speak it', 'type it', 'dictate it'],
    manual: 'Manual entry never goes away. A 1,324-exercise movement bank sits behind a search-first picker, and the weight scale shows its full range before you touch it — your last set and today\'s target marked on the rule.',
    // Annotation captions under each plate. They trace one pipeline, so each
    // caption must stay true of the screen above it.
    captions: ['01 · say it, type it, or dictate it', '02 · check the draft, fix any set', '03 · confirmed, then in the record'],
    foot: 'free on every tier · nothing saves until you confirm',
    moreLink: 'How voice logging works',
    logCaptureAlt: 'Tuwa log capture: a spoken session written out as a sentence, ready to parse',
    activeWorkoutAlt: 'Tuwa set entry: the weight scale with target and last markers on the rule',
    workoutLogAlt: 'Tuwa workout log: session history',
  },
  statsBand: {
    sectionAria: 'Key numbers',
    labels: ['exercises in the movement bank', 'readiness, scored every morning', 'days of load behind every ratio'],
  },
  recovery: {
    kicker: '05 · recovery',
    heading: 'Your baselines, drawn daily',
    body: "Overnight HRV, sleep, and resting heart rate are scored against your own rolling baselines — not population norms — and compressed into one number with plain-language reasons. You don't get a dashboard to interpret. You get a score and the why.",
    // Annotation layer for the self-drawing baseline chart (Field Notes v6).
    // Written lowercase; the .micro/.anno rule uppercases Latin locales.
    spark: {
      label: 'hrv · 28 days',
      reading: '62 ms +4 · at baseline',
      axis: ['d-28', 'd-21', 'd-14', 'd-7', 'today'],
      chartAlt: 'HRV trend over 28 days, currently 62 milliseconds, at baseline',
      foot: 'every metric is scored against your own rolling baseline, not population norms',
    },
  },
  // ------------------------------------------------------------------
  // 06 · METHODOLOGY — the sleep-score v2 design, presented under the
  // §10 claim ladder. THE ENGINE IS NOT BUILT. Every string here must
  // keep its hedge in translation: "design, not in the shipping app",
  // "no performance or accuracy claim", "a guess", "nothing here is
  // proven", "not a medical device". No claim may be strengthened.
  // ------------------------------------------------------------------
  methodology: {
    kicker: '06 · methodology · in development',
    headingLines: ['Here is what we believe,', 'and what would prove us wrong'],
    lede: 'Tuwa scores your sleep against a fixed target today. We are building one that adapts to the state you went to bed in. It is not finished — so here is the whole design, the weights, and the parts we are least sure of.',
    chips: ['status: design · not in the shipping app', 'no performance or accuracy claim is made here'],
    intents: [
      {
        kicker: '01 · design intent',
        title: 'The target is yours, and you can see it',
        body: 'Your sleep target is learned from your own nights, not taken from a population average. And the weights behind the score are printed below — not a trade secret.',
      },
      {
        kicker: '02 · design intent',
        title: 'The score knows what the night had to do',
        body: 'Seven hours after an eighteen-hour day, after a match, and after a quiet Tuesday are three different nights. Same maths each time — the parts are just weighted differently.',
      },
      {
        kicker: '03 · shipping today',
        title: 'It never leaves the phone',
        body: 'Your raw sleep, HRV and heart-rate readings stay in HealthKit on your device. Only the finished scores sync. This one is not a plan — it is how the app already works.',
      },
    ],
    mechanism: {
      kicker: 'the mechanism',
      heading: 'One set of weights, nudged — not a second algorithm',
      body: 'Every morning the app looks at what it already knows about yesterday — how long you were up, how hard you trained, how steady your sleep has been. That picks out which situations apply, and each one nudges the weights below. Every night stores what it saw and what it decided, so any score can be taken apart later.',
      tree: [
        ['what it reads', 'wake · load · regularity · debt · naps'],
        ['what it matches', 'any situations that apply, or none'],
        ['what it nudges', 'the weights, within fixed limits'],
        ['what it keeps', 'all of the above, every night'],
      ],
      foot: 'simple arithmetic on your phone · no network · no new sensor',
    },
    weights: {
      label: 'base weights · tier a',
      sum: 'sum 1.00',
      // Values are the series data — they never translate. Only the names do.
      rows: [
        { name: 'Duration', value: '0.50' },
        { name: 'Continuity', value: '0.15' },
        { name: 'Regularity', value: '0.15' },
        { name: 'Deep sleep', value: '0.10' },
        { name: 'REM sleep', value: '0.10' },
      ],
      note: 'hours slept carries half the score — it is the best-evidenced part · deep and rem count for little, because a wrist only half-agrees with a sleep lab',
      provenance: 'we argued these numbers out — we did not fit them to data · logged as h-01',
    },
    situations: {
      kicker: 'the situations · three of six',
      heading: 'What changes, and how sure we are',
      columns: ['situation', 'when it applies', 'what changes', 'how sure we are'],
      rows: [
        {
          name: 'You were up too long',
          when: 'You had been awake far longer than usual before going to bed.',
          change: 'Hours and deep sleep matter more. Your target goes up, by 45 minutes at most.',
          status: 'backed · the size is our guess (h-02)',
          confidence: "Sleep pressure builds the longer you are awake — that much is settled. How much extra sleep it earns is our number, not the research's.",
        },
        {
          name: 'You trained hard',
          when: 'Yesterday was well above your normal for the last month.',
          change: 'Hours and deep sleep matter slightly more. Your target goes up by half an hour at most.',
          status: 'a guess (h-03)',
          confidence: 'The only study we found that tested this directly found nothing. We kept it, wrote down what would make us delete it, and said so here.',
        },
        {
          name: 'Your rhythm just broke',
          when: 'You went to bed more than two hours off your usual time — the flight, the late game.',
          change: 'Being off-schedule counts for less, staying asleep counts for more, and deep and REM are trusted only half as much.',
          status: 'backed · the response is our guess (h-05)',
          confidence: 'The first disrupted night really is the worst one. Easing off the schedule penalty is our answer to that, not a finding.',
        },
      ],
      foot: 'situations only shift the weights — they never add a new ingredient to the score',
    },
    registry: {
      kicker: 'the list of guesses · 4 of 10',
      heading: 'Every guess, written down with the test that kills it',
      body: 'Anything in the score that no study backs goes on this list, next to the result that would make us change it. Nothing gets into the app without a line here — and if we cannot say what would prove a guess wrong, it does not go in at all.',
      columns: ['no.', 'what we are guessing', 'where it stands', 'what would change our mind'],
      rows: [
        {
          id: 'H-01',
          claim: 'The weights above are roughly right.',
          status: 'a guess · argued, not measured',
          test: 'Check each part against how people actually feel the next day, then re-fit once we have enough nights from enough athletes.',
        },
        {
          id: 'H-03',
          claim: 'A hard training day means you need up to half an hour more sleep.',
          status: 'a guess · the one test found nothing',
          test: 'If hard days and easy days show no difference, this comes out — from the situation and from the target.',
        },
        {
          id: 'H-07',
          claim: 'When you are well behind on sleep, hours matter more than sleep stages.',
          status: 'a guess · but well supported',
          test: 'Check whether deep and REM still tell us anything once you are in real deficit.',
        },
        {
          id: 'H-10',
          claim: 'Seeing your target move, and why, helps more than it worries you.',
          status: 'a guess · no study, just our call',
          test: 'Our own use, and what people tell us. If it reads as alarming, the whole layer goes quiet.',
        },
      ],
    },
    // The claim rails. These carry the same meaning in every locale.
    rails: [
      'tuwa is a training tool, not a medical device',
      'it does not diagnose, treat, or prevent injury',
      'sleep stages come from your watch, compared only to your own history',
      'nothing here is finished, and nothing here is proven',
      'the sources below say what each paper found — nothing more',
    ],
    sources: {
      kicker: 'what we read, and what we took from it',
      items: [
        {
          finding: 'Sleep pressure builds while you are awake.',
          cite: 'Borbély, Daan, Wirz-Justice & Deboer (2016), Journal of Sleep Research 25(2). We took the shape of it. We did not take any numbers.',
        },
        {
          finding: 'Training shifts sleep, but only slightly.',
          cite: 'Kredlow et al. (2015), Journal of Behavioral Medicine 38. Small effects across 66 studies — which is why this one stays a guess.',
        },
        {
          finding: 'Regularity is the middle of your night, not its start.',
          cite: 'Wittmann & Roenneberg (2006), Chronobiology International 23(1–2). That is the number we track.',
        },
        {
          finding: 'Lost sleep adds up, and hours are what repay it.',
          cite: 'Van Dongen et al. (2003). The reason hours outrank sleep stages when you are behind.',
        },
      ],
    },
  },
  ghostBand: {
    sectionAria: 'What Tuwa is',
    quote: 'The back room of a pro team — plan, physiology, and a decision — for athletes who coach themselves.',
  },
  privacyClose: {
    kicker: '07 · privacy',
    heading: 'Your data stays on your phone',
    body: 'Tuwa reads HealthKit — it never writes to it — and raw health data never leaves the device. Only composite scores sync.',
    bullets: [
      'HealthKit access is read-only',
      'Raw HRV, sleep, and heart-rate samples stay on-device',
      'Only composite scores sync to your account',
      'Requires iOS 17 or later',
    ],
    shotAlt: 'Tuwa recovery screen: HRV and sleep trends against personal baselines',
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
