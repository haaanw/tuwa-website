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
    // D1 = A (HAN 2026-10-31): the lead message is "Bring your plan — or build it with your own AI".
    title: 'Bring Your Plan — or Build It With Your Own AI',
    description:
      'Tuwa is the sports-science back room for self-coached athletes. Bring your plan, or build one with your own Claude or ChatGPT; Tuwa reads it against your body each day and states the day’s dose. It never writes your program.',
  },
  heroScrub: {
    sectionAria: 'Tuwa — bring your plan, or build it with your own AI',
    scoreAria: 'Readiness score 82',
    scoreCaption: 'readiness today',
    // Annotation voice, so it stays a phrase and never a sentence.
    strapline: 'Tuwa // the sports-science back room',
    // D1 = A (HAN 2026-10-31).
    lines: ['Bring your plan.', 'Or build it with', 'your own AI.'],
    lead: "Tuwa is the sports-science back room for self-coached athletes. Import the plan you train from, or let your own Claude or ChatGPT write one for Tuwa to read. Each morning Tuwa reads your body — HRV, sleep, resting heart rate, training history — against that plan and states the day: its dose in words, and a go, modify or hold suggestion you decide on. It never writes your program.",
    sub: 'Built for athletes who train sport skill and strength in parallel',
    cta: 'Download on the App Store',
    ctaNote: 'iOS 17+ · iPhone',
  },
  // W1 (1.7.6 truth pass). Section order: hero → 01 your plan → 02 today → 03 the day card →
  // stats → 04 trends → 05 your own AI → 06 recovery → 07 methodology → ghost → 08 privacy.
  // Every feature claim is in the 1.7.6 What's New (app repo .planning/asc/v176-draft/).
  yourPlan: {
    kicker: '01 · your plan',
    heading: 'Bring your plan, or build it with your own AI',
    body: 'Tuwa reads the program you already train from and adjusts each day from your body. It never writes the program.',
    doors: [
      {
        title: 'I have a plan',
        body: 'Paste it, or bring a PDF or a photo of the whiteboard. Tuwa reads the weeks, days and sets; you check what it read, and week 1 starts next Monday or today.',
      },
      {
        title: "I don't have one yet",
        body: "Copy one prompt into your own Claude or ChatGPT. It reads Tuwa's plan-writing skill, asks about your training, and writes the first phase in Tuwa's import format for you to paste back.",
      },
    ],
    skillLink: 'The plan-writing skill',
    formatLink: 'The import format',
    moreLink: 'Your plan, in detail',
    aside: 'Then the program overview: your weeks and phases on one grid, with the lifts of each week.',
    shotAlt: "Tuwa program overview: your weeks and phases on one grid, with the lifts of each week",
  },
  showcase: {
    kicker: '02 · today',
    heading: 'Today states the day',
    body: 'Each morning the day card names the kind of day and its dose in words — Volume, Effort and Length — against your plan. The numbers live in the brief, lift by lift, with the reason. You choose, then you start.',
    lottieAria: 'Animated verdict check mark with a calm pulse ring',
    lottieCaption: 'the verdict, drawn calm',
    aside: 'No chat, no interpretation homework. Your readings, a suggestion with its reason, and the session you meant to do.',
    steps: [
      {
        title: 'The day card',
        body: 'The kind of day and its dose in words: Volume, Effort and Length, against your plan.',
      },
      {
        title: 'The brief',
        body: "Your readings, the day's suggestion and its reason, and each lift planned against today. The adjustment and Keep my plan sit side by side; you choose.",
      },
      {
        title: 'The load trend',
        body: 'One fatigue budget across sport skill, strength and conditioning, read against your own four bands.',
      },
    ],
    todayAlt: 'Tuwa Today: the day card names the kind of day and its dose — Volume, Effort, Length — against your plan',
    briefAlt: "Tuwa brief: today's readings, the suggested adjustment beside Keep my plan, and each lift planned against today",
    loadAlt: 'Tuwa load detail: acute against chronic load, read against your own four bands',
  },
  dayCard: {
    kicker: '03 · the day card',
    heading: 'The whole day on one card',
    body: "On Log, the whole program day sits on one card: its sections, cues and the day's rule. Start, and the session runs right in the card — tap a move, log the set, finish.",
    doors: ['run it on the card', 'or type it in words'],
    manual: "Training off the plan? Type the session the way you would say it; Tuwa turns it into a draft you check before it saves. A 1,328-exercise movement bank sits behind a search-first picker.",
    captions: ['01 · the day on one card', '02 · tap a move, log the set'],
    foot: 'drills with no weight · one tap logs them as planned, a second tap undoes it',
    cardLink: 'The Day Card, in detail',
    moreLink: 'How text logging works',
    dayCardAlt: 'Tuwa Day Card: the whole program day on one card, with the session running in it',
    plateAlt: 'Tuwa move plate: one movement, its sets and the Log set button',
  },
  trends: {
    kicker: '04 · trends',
    heading: 'Trends you can read',
    body: 'Fatigue split into its parts, load against your own four bands, and each body signal on its own screen against your own baseline.',
    hrvAlt: "Tuwa HRV detail: this morning's reading against your own baseline",
    fatigueAlt: 'Tuwa Trends: fatigue split into its parts',
    sleepAlt: 'Tuwa sleep detail: last night against your own nights',
  },
  getStarted: {
    kicker: 'get started',
    heading: 'From install to your own AI, in three steps',
    allLink: 'Read the full guide',
    heroLink: 'New here? Get started',
    steps: [
      { n: '1', title: 'Get Tuwa', body: 'Install the app, connect Apple Health if you wear a watch or ring, and make your account.', links: [{ label: 'Quick start', path: 'quick-start/' }] },
      { n: '2', title: 'Bring your plan', body: 'Paste it, add a PDF or a photo, or build it with your own AI. Tuwa never writes the program.', links: [{ label: 'Your plan, step by step', path: 'quick-start/#your-plan' }] },
      { n: '3', title: 'Add Tuwa to your AI', body: 'Turn on the connector in the app, then add one URL to your AI. It reads composite scores, never an Apple Health number.', links: [{ label: 'Claude', path: 'claude/' }, { label: 'ChatGPT', path: 'chatgpt/' }, { label: 'Coding agents', path: 'coding-agents/' }] },
    ],
  },
  connector: {
    kicker: '05 · your own AI',
    heading: 'Ask your own AI about your training',
    body: "Turn on the AI connector, and your own Claude or ChatGPT can read your Tuwa readings, sessions and plan, show the day's card in the chat, and send you a plan draft to review. Tuwa still makes the day's decision in the app.",
    bullets: [
      'off until you turn it on · profile › legal › ai connector',
      'composite scores only · never an apple health number',
      'a plan draft waits until you activate it',
    ],
    connectorLink: 'How the connector works',
    guideLink: 'Add Tuwa to Claude, ChatGPT or a coding agent, step by step',
    shotAlt: 'Tuwa AI connector screen: what is sent, what is never sent, and what is kept',
  },
  statsBand: {
    sectionAria: 'Key numbers',
    labels: ['exercises in the movement bank', 'readiness, scored every morning', 'days of load behind every ratio'],
  },
  recovery: {
    kicker: '06 · recovery',
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
    kicker: '07 · methodology · in development',
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
      'it does not diagnose, treat, or prevent injury', // claim-fence-allow: disclaimer
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
    kicker: '08 · privacy',
    heading: 'Your data stays on your phone',
    body: 'Tuwa reads HealthKit — it never writes to it — and raw health data never leaves the device. Only composite scores sync.',
    bullets: [
      'HealthKit access is read-only',
      'Raw HRV, sleep, and heart-rate samples stay on-device',
      'Only composite scores sync to your account',
      'Requires iOS 17 or later',
    ],
    shotAlt: "Tuwa HRV detail: this morning's reading against your own baseline",
    cta: 'Download on the App Store',
    ctaNote: 'bring your plan, or build it with your own AI',
  },
  // ------------------------------------------------------------------
  // Legacy sections below feed the retired pre-Pavilion components
  // (Hero / FeatureGrid / StatsCounter / LandingCTA). No page uses them
  // anymore; kept only so the parked components keep typechecking until
  // they are deleted.
  // ------------------------------------------------------------------
  hero: {
    headline: 'Stay in your strike zone — every workout.',
    subtitle:
      'Tuwa is the sports-science back room for self-coached athletes who train sport skill and strength in parallel. Enter your plan, log the match tier, and get a daily go, modify, or hold suggestion with an adjusted top-set number and a one-line reason.',
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
    body: 'Tuwa does not write your program or act like a chat coach. You author the plan; Tuwa reads today\'s body against it.',
  },
  featureGrid: {
    heading: 'Your plan, read against today',
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
