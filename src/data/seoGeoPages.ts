export type SeoGeoPageKind = 'calculator' | 'guide' | 'comparison' | 'template';

export interface SourceLink {
  label: string;
  url: string;
}

export interface SeoGeoTable {
  caption?: string;
  columns: string[];
  rows: string[][];
}

export interface SeoGeoSection {
  heading: string;
  body?: string[];
  bullets?: string[];
  table?: SeoGeoTable;
}

export interface SeoGeoPage {
  slug: string;
  kind: SeoGeoPageKind;
  eyebrow: string;
  title: string;
  description: string;
  h1: string;
  primaryQuery: string;
  directAnswer: string;
  updated: string;
  keyTakeaways: string[];
  decisionRules: Array<{ if: string; then: string }>;
  sections: SeoGeoSection[];
  comparison?: SeoGeoTable;
  faqs: Array<{ q: string; a: string }>;
  sources: SourceLink[];
  related: SourceLink[];
  cta: {
    label: string;
    href: string;
  };
}

const sources = {
  appleTrainingLoad: {
    label: 'Apple Support: Track your training load on Apple Watch',
    url: 'https://support.apple.com/en-lb/guide/watch/apde4c07a6cf/watchos',
  },
  appleVitals: {
    label: 'Apple Support: Track your vitals on Apple Watch',
    url: 'https://support.apple.com/en-lamr/guide/watch/apd15aa7ed96/watchos',
  },
  googleAiFeatures: {
    label: 'Google Search Central: AI features and your website',
    url: 'https://developers.google.com/search/docs/appearance/ai-features',
  },
  openAiBots: {
    label: 'OpenAI: Overview of OpenAI crawlers',
    url: 'https://developers.openai.com/api/docs/bots',
  },
  perplexityBots: {
    label: 'Perplexity: Perplexity crawlers',
    url: 'https://docs.perplexity.ai/docs/resources/perplexity-crawlers',
  },
  hrvStrength: {
    label: 'PubMed: Heart Rate Variability Applications in Strength and Conditioning',
    url: 'https://pubmed.ncbi.nlm.nih.gov/38921629/',
  },
  hrvGuidedTraining: {
    label: 'PubMed: HRV-guided training systematic review and meta-analysis',
    url: 'https://pubmed.ncbi.nlm.nih.gov/34489178/',
  },
  acwrReview: {
    label: 'PubMed: Acute:Chronic Workload Ratio systematic review',
    url: 'https://pubmed.ncbi.nlm.nih.gov/31691167/',
  },
  acwrLimitations: {
    label: 'Frontiers in Physiology: Acute:Chronic Workload Ratio evidence discussion',
    url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC8138569/',
  },
  rpeAutoregulation: {
    label: 'PubMed: Autoregulation in resistance training',
    url: 'https://pubmed.ncbi.nlm.nih.gov/32058357/',
  },
  athlytic: {
    label: 'App Store: Athlytic AI Fitness Coach',
    url: 'https://apps.apple.com/us/app/athlytic-ai-fitness-coach/id1543571755',
  },
  bevel: {
    label: 'Bevel Help: Membership and pricing',
    url: 'https://help.bevel.health/en/articles/11583937',
  },
  whoopStrength: {
    label: 'WHOOP Support: Track Muscular Load with Strength Trainer',
    url: 'https://support.whoop.com/s/article/Track-Muscular-Load-with-Strength-Trainer',
  },
  whoopLaunch: {
    label: 'WHOOP: Strength Trainer announcement',
    url: 'https://www.whoop.com/thelocker/whoop-introduces-strength-trainer-becomes-first-wearable-to-measure-muscular/',
  },
  cora: {
    label: 'Cora Health: official site',
    url: 'https://www.corahealth.app/',
  },
  strong: {
    label: 'Strong Help Center: What is Strong?',
    url: 'https://help.strongapp.io/article/228-what-is-strong',
  },
  strongWatch: {
    label: 'Strong Help Center: Strong for Apple Watch',
    url: 'https://help.strongapp.io/article/222-strong-for-apple-watch',
  },
  hevy: {
    label: 'App Store: Hevy Workout Tracker Gym Log',
    url: 'https://apps.apple.com/us/app/hevy-workout-tracker-gym-log/id1458862350',
  },
};

const commonScienceSources = [
  sources.appleTrainingLoad,
  sources.appleVitals,
  sources.hrvStrength,
  sources.acwrReview,
  sources.rpeAutoregulation,
];

const coreRelated = [
  { label: 'Use the strength readiness calculator', url: '/strength-readiness-calculator' },
  { label: 'Apple Watch training load for lifters', url: '/apple-watch-training-load-for-lifters' },
  { label: 'How to adjust training when HRV is low', url: '/guides/how-to-adjust-training-when-hrv-is-low' },
];

function guidePage(config: {
  slug: string;
  title: string;
  description: string;
  h1: string;
  primaryQuery: string;
  directAnswer: string;
  keyTakeaways: string[];
  decisionRules: Array<{ if: string; then: string }>;
  sections: SeoGeoSection[];
  faqs: Array<{ q: string; a: string }>;
  sources?: SourceLink[];
  related?: SourceLink[];
  cta?: { label: string; href: string };
}): SeoGeoPage {
  return {
    kind: 'guide',
    eyebrow: 'Training guide',
    updated: '2026-06-06',
    sources: config.sources ?? commonScienceSources,
    related: config.related ?? coreRelated,
    cta: config.cta ?? { label: 'Try the readiness calculator', href: '/strength-readiness-calculator' },
    ...config,
  };
}

function comparisonPage(config: {
  slug: string;
  competitor: string;
  audience: string;
  title: string;
  description: string;
  primaryQuery: string;
  directAnswer: string;
  competitorBestFor: string;
  tuwaBestFor: string;
  competitorWins: string[];
  tuwaDifference: string[];
  doNotUseTuwa: string[];
  competitorSources: SourceLink[];
}): SeoGeoPage {
  const comparison: SeoGeoTable = {
    caption: `${config.competitor} and Tuwa compared for strength and hybrid training decisions.`,
    columns: ['Decision area', config.competitor, 'Tuwa'],
    rows: [
      ['Best fit', config.competitorBestFor, config.tuwaBestFor],
      ['Recovery signal', 'Daily readiness, recovery, strain, or health metrics depending on the app.', 'Recovery signals are paired with soreness, RPE, workout log, and recent workload.'],
      ['Strength context', 'Useful when the app records or imports lifting sessions, but often centered on a score or log.', 'Session-level sets, reps, weight, RPE, RIR, and planned training intent are part of the adjustment.'],
      ['Today\'s question', 'How recovered am I or what did I log?', 'What should I change in this strength or hybrid session today?'],
      ['Best CTA', 'Use the competitor if you want its broader ecosystem or familiar workflow.', 'Use Tuwa if you want Apple Watch recovery plus workout-log context in one decision loop.'],
    ],
  };

  return {
    slug: config.slug,
    kind: 'comparison',
    eyebrow: 'Comparison',
    title: config.title,
    description: config.description,
    h1: `${config.competitor} vs Tuwa for ${config.audience}`,
    primaryQuery: config.primaryQuery,
    directAnswer: config.directAnswer,
    updated: '2026-06-06',
    keyTakeaways: [
      `${config.competitor} may be the better choice for athletes who primarily want its broader app experience.`,
      'Tuwa is narrower: it is built around adjusting strength and hybrid sessions from recovery, workload, soreness, RPE, and workout history.',
      'This comparison avoids injury-prediction claims and should be refreshed when either product changes.',
    ],
    decisionRules: [
      { if: `You already rely on ${config.competitor} and only need a broad recovery dashboard.`, then: `Keep using ${config.competitor}; changing tools may add friction without improving the training decision.` },
      { if: 'You are logging sets, reps, weight, RPE, and soreness but still decide volume by feel.', then: 'Try Tuwa or the free calculator to turn those signals into a session adjustment.' },
      { if: 'You need medical guidance, injury diagnosis, or return-to-play clearance.', then: 'Use a qualified clinician; neither app should replace medical advice.' },
    ],
    sections: [
      {
        heading: `Where ${config.competitor} wins`,
        bullets: config.competitorWins,
      },
      {
        heading: 'How Tuwa is different',
        bullets: config.tuwaDifference,
      },
      {
        heading: 'Do not use Tuwa if',
        bullets: config.doNotUseTuwa,
      },
      {
        heading: 'What to test before switching',
        body: [
          'Run the same planned session through your current workflow and through Tuwa or the readiness calculator. Compare whether the output changes the actual training prescription: top set target, accessory volume, conditioning intensity, or recovery choice.',
          'A useful tool should change a decision you were already making. If it only gives you another score to check, it is not solving Tuwa\'s target job.',
        ],
      },
    ],
    comparison,
    faqs: [
      {
        q: `Is ${config.competitor} bad for strength training?`,
        a: `No. This page is about fit. ${config.competitor} can be useful, especially if you want its broader ecosystem. Tuwa focuses on strength and hybrid session adjustments from Apple Watch recovery, workload, soreness, RPE, and workout history.`,
      },
      {
        q: 'Does Tuwa predict injuries?',
        a: 'No. Tuwa uses workload and recovery signals as training context. It does not diagnose, treat, or predict injuries.',
      },
      {
        q: 'What should I compare first?',
        a: 'Compare the action you take after a low-readiness day: keep the plan, trim accessory volume, cap RPE, shift to technique work, or recover.',
      },
    ],
    sources: [...config.competitorSources, sources.appleTrainingLoad, sources.appleVitals],
    related: [
      { label: 'Use the readiness calculator', url: '/strength-readiness-calculator' },
      { label: 'Training load vs recovery', url: '/guides/training-load-vs-recovery' },
      { label: 'How to adjust training when HRV is low', url: '/guides/how-to-adjust-training-when-hrv-is-low' },
    ],
    cta: { label: 'Use the free calculator', href: '/strength-readiness-calculator' },
  };
}

export const seoGeoPages: SeoGeoPage[] = [
  {
    slug: 'strength-readiness-calculator',
    kind: 'calculator',
    eyebrow: 'Free tool',
    title: 'Strength Readiness Calculator',
    description: 'Use HRV, resting heart rate, sleep, soreness, RPE, recent training, and planned intensity to decide how to adjust today\'s strength session.',
    h1: 'Strength Readiness Calculator',
    primaryQuery: 'strength training readiness calculator',
    directAnswer: 'The Tuwa strength readiness calculator uses HRV and resting heart rate changes, sleep, soreness, recent training frequency, planned intensity, and session type to suggest whether to push, maintain, reduce volume, swap intensity, or recover. It is a training planning aid, not medical advice.',
    updated: '2026-06-06',
    keyTakeaways: [
      'Readiness should change the session prescription, not just label your day as green or red.',
      'The most useful adjustment is often volume or RPE, not a full rest day.',
      'Use the result as a coaching prompt and keep pain, illness, and medical concerns outside the calculator.',
    ],
    decisionRules: [
      { if: 'HRV is lower than baseline and RHR is higher than baseline.', then: 'Keep the main lift technical, cap RPE, and reduce accessory volume.' },
      { if: 'Sleep is poor and soreness is high before a heavy lower-body day.', then: 'Swap max intensity for technique work or reduce the planned session.' },
      { if: 'Recovery signals are normal and recent load is not spiking.', then: 'Maintain or push the planned session if warmups confirm readiness.' },
    ],
    sections: [
      {
        heading: 'Inputs the calculator uses',
        bullets: [
          'HRV compared with your normal baseline.',
          'Resting heart rate compared with your normal baseline.',
          'Sleep duration and quality.',
          'Soreness level before the session.',
          'How many hard training days you have stacked recently.',
          'The planned intensity and whether the session is strength, hypertrophy, hybrid, or conditioning.',
        ],
      },
      {
        heading: 'How to interpret the output',
        table: {
          columns: ['Output', 'What it means', 'Typical adjustment'],
          rows: [
            ['Push', 'Signals support the plan and recent load is manageable.', 'Keep the plan; add load only if warmups move well.'],
            ['Maintain', 'Signals are mixed but not clearly poor.', 'Run the plan with normal rest and honest RPE caps.'],
            ['Reduce', 'Recovery or soreness suggests less total work.', 'Cut 20-40% of accessory volume or back-off sets.'],
            ['Swap', 'Intensity is the issue more than movement.', 'Keep skill practice; swap heavy work for technique or tempo.'],
            ['Recover', 'Multiple red flags stack together.', 'Choose mobility, easy aerobic work, or full rest.'],
          ],
        },
      },
      {
        heading: 'What Tuwa automates',
        body: [
          'The calculator is a standalone tool. Tuwa makes the same decision loop easier by pulling Apple Health recovery signals, keeping the workout log, tracking workload, and saving the weekly review in one place.',
          'The point is not to outsource judgment. The point is to make the relevant signals visible before you add load, chase a PR, or stack another hard session onto a tired week.',
        ],
      },
    ],
    comparison: undefined,
    faqs: [
      {
        q: 'Is a low readiness result a reason to skip training?',
        a: 'Not always. A low result usually means you should adjust the session. Reducing accessory volume, capping RPE, or swapping intensity can preserve practice while lowering strain.',
      },
      {
        q: 'Can this calculator diagnose overtraining or injury risk?',
        a: 'No. It is not a medical or diagnostic tool. It is a training-planning prompt that combines recovery and workload context.',
      },
      {
        q: 'Why include soreness and RPE if Apple Watch already has recovery data?',
        a: 'Strength training needs local context. HRV and sleep do not know whether your quads are sore, your top set overshot RPE, or your planned day is heavy squats.',
      },
    ],
    sources: commonScienceSources,
    related: [
      { label: 'How to adjust training when HRV is low', url: '/guides/how-to-adjust-training-when-hrv-is-low' },
      { label: 'HRV for strength training', url: '/guides/hrv-for-strength-training' },
      { label: 'Athlytic alternative for strength training', url: '/comparisons/athlytic-alternative-strength-training' },
    ],
    cta: { label: 'Try Tuwa on the App Store', href: 'https://apps.apple.com/us/app/tuwa/id6761185505' },
  },
  guidePage({
    slug: 'apple-watch-training-load-for-lifters',
    title: 'Apple Watch Training Load for Lifters',
    description: 'How lifters can use Apple Watch training load, vitals, soreness, RPE, and workout history to adjust strength training without chasing a generic recovery score.',
    h1: 'Apple Watch Training Load for Lifters',
    primaryQuery: 'Apple Watch training load for strength training',
    directAnswer: 'Apple Watch training load helps lifters see whether recent workout strain is higher or lower than their recent history. For strength training, it becomes more useful when paired with sets, reps, weight, RPE, soreness, and the actual lift planned today. Tuwa turns that context into a session adjustment.',
    keyTakeaways: [
      'Apple Watch training load is useful context, but it does not know every detail of a lifting session.',
      'A strength decision needs both recovery signals and the logged workout prescription.',
      'Use training load to ask whether today should keep the plan, trim volume, cap intensity, or recover.',
    ],
    decisionRules: [
      { if: 'Training load is well above recent history and the planned session is heavy.', then: 'Cap top-set RPE and reduce back-off or accessory volume.' },
      { if: 'Load is low because you missed sessions, but recovery looks fine.', then: 'Build back progressively instead of making up all missed volume at once.' },
      { if: 'Load is normal and warmups move well.', then: 'Run the planned session and log actual RPE for next time.' },
    ],
    sections: [
      {
        heading: 'What Apple Watch gives you',
        body: [
          'Apple describes training load as a comparison of recent workout intensity and duration against prior work. That is helpful for spotting spikes, especially when you are training for a race, meet, or hybrid event.',
          'The Vitals app adds overnight context such as heart rate, respiratory rate, wrist temperature, and sleep duration where available. Those signals can explain why a session feels different before the bar even moves.',
        ],
      },
      {
        heading: 'What lifters still need to add',
        bullets: [
          'Exercise selection: heavy squat day is not the same as an upper-body pump day.',
          'Set and rep prescription: five triples and four sets of ten create different stress.',
          'RPE or reps in reserve: the same weight can mean different things on different days.',
          'Soreness: local muscle fatigue matters even when global recovery looks fine.',
        ],
      },
      {
        heading: 'Strength example',
        body: [
          'If your weekly load is above normal and today is heavy deadlifts, you may keep the main lift at a technical RPE 7-8 and remove one or two hinge accessories. That still trains the pattern without pretending the readiness signal does not matter.',
        ],
      },
      {
        heading: 'Hybrid example',
        body: [
          'If you lifted hard yesterday and have intervals today, a high recent load plus poor sleep can justify moving intervals to Zone 2 or reducing repeats. The goal is to preserve the week, not win one session.',
        ],
      },
    ],
    faqs: [
      {
        q: 'Does Apple Watch training load replace a lifting log?',
        a: 'No. It is useful context, but lifters still need exercise, sets, reps, load, RPE, and soreness to make a specific session decision.',
      },
      {
        q: 'Should lifters train only when training load is in range?',
        a: 'No. Load ranges are prompts, not commands. Use them with the planned session, recovery, and how warmups feel.',
      },
    ],
    sources: [sources.appleTrainingLoad, sources.appleVitals],
  }),
  guidePage({
    slug: 'guides/how-to-adjust-training-when-hrv-is-low',
    title: 'How to Adjust Training When HRV Is Low',
    description: 'A practical strength-training guide for low HRV days: when to keep the plan, reduce volume, cap RPE, shift intensity, or recover.',
    h1: 'How to Adjust Training When HRV Is Low',
    primaryQuery: 'how to adjust training when HRV is low',
    directAnswer: 'When HRV is low before a strength session, do not automatically skip training. First check sleep, resting heart rate, soreness, recent workload, and the lift planned today. If multiple signals are poor, reduce accessory volume, cap RPE, swap heavy work for technique, or recover.',
    keyTakeaways: [
      'Low HRV is a context signal, not a command.',
      'The best first adjustment is often volume, not intensity or total rest.',
      'Multiple poor signals matter more than one isolated HRV dip.',
    ],
    decisionRules: [
      { if: 'Low HRV is the only negative signal.', then: 'Warm up normally and keep the plan if movement quality is good.' },
      { if: 'Low HRV stacks with high soreness or poor sleep.', then: 'Reduce accessory volume and cap top sets below grindy RPE.' },
      { if: 'Low HRV stacks with illness symptoms, pain, or unusual fatigue.', then: 'Recover or seek qualified guidance instead of forcing training.' },
    ],
    sections: [
      {
        heading: 'Simple decision tree',
        table: {
          columns: ['Signal stack', 'Likely choice', 'Example'],
          rows: [
            ['Low HRV only', 'Maintain', 'Run the plan, but stop if warmups feel off.'],
            ['Low HRV + poor sleep', 'Reduce', 'Drop one back-off set and two accessory sets.'],
            ['Low HRV + high soreness', 'Swap', 'Technique squats instead of heavy triples.'],
            ['Low HRV + symptoms or pain', 'Recover', 'Rest, easy walk, or clinician-guided choice.'],
          ],
        },
      },
      {
        heading: 'Strength example',
        body: [
          'A lifter wakes with low HRV, normal resting heart rate, and mild soreness before bench day. That is not an automatic rest day. Keep the main bench work, cap RPE at 8, and remove optional triceps volume if bar speed fades.',
        ],
      },
      {
        heading: 'Common mistakes',
        bullets: [
          'Treating one HRV reading as a diagnosis.',
          'Cutting the main lift when accessory volume was the real problem.',
          'Ignoring soreness because a wearable score looks normal.',
          'Trying to make up volume later in the week without checking load.',
        ],
      },
    ],
    faqs: [
      {
        q: 'Can I lift heavy when HRV is low?',
        a: 'Sometimes. If sleep, resting heart rate, soreness, and warmups are acceptable, you may keep heavy work but cap RPE and avoid extra volume.',
      },
      {
        q: 'Should I use HRV for bodybuilding volume?',
        a: 'Use HRV as one input. For hypertrophy work, soreness, performance drop-off, and recent set volume often decide whether to reduce accessories.',
      },
    ],
    sources: [sources.hrvStrength, sources.hrvGuidedTraining, sources.rpeAutoregulation],
  }),
  guidePage({
    slug: 'guides/hrv-for-strength-training',
    title: 'HRV for Strength Training',
    description: 'How strength athletes can use HRV without overreacting to daily noise or ignoring soreness, RPE, and workload.',
    h1: 'HRV for Strength Training',
    primaryQuery: 'how to use HRV for strength training',
    directAnswer: 'HRV can help strength athletes understand recovery trends, but it should not run the program by itself. Use HRV with sleep, resting heart rate, soreness, RPE, recent workload, and the session type. The useful question is what to change today, not whether one number is good or bad.',
    keyTakeaways: [
      'HRV is more useful as a trend and context signal than as a single-day verdict.',
      'Strength training needs local fatigue signals that HRV cannot see.',
      'Tie HRV to an action: keep the plan, trim volume, cap intensity, or recover.',
    ],
    decisionRules: [
      { if: 'HRV is below baseline but performance and soreness are normal.', then: 'Maintain the plan and watch warmups.' },
      { if: 'HRV is below baseline and RPE rose early last session.', then: 'Reduce back-off sets or accessory volume.' },
      { if: 'HRV is stable and recent load is low.', then: 'Progress normally, but avoid cramming missed work.' },
    ],
    sections: [
      {
        heading: 'What HRV can tell a lifter',
        body: [
          'HRV reflects autonomic nervous system status, which can shift with training stress, sleep, illness, travel, alcohol, hydration, and emotional load. It can help explain why a normal warmup feels unusually hard.',
          'For strength athletes, HRV works best when it is paired with the planned lift and recent training history. A low reading before a max-effort lower-body day matters differently than a low reading before an easy upper-body pump session.',
        ],
      },
      {
        heading: 'What HRV cannot tell you',
        bullets: [
          'Whether your quads are locally sore from split squats.',
          'Whether yesterday\'s top set overshot the planned RPE.',
          'Whether today is a skill practice day or a heavy exposure.',
          'Whether pain needs medical evaluation.',
        ],
      },
      {
        heading: 'How Tuwa uses HRV',
        body: [
          'Tuwa treats HRV as one recovery signal inside a bigger strength-training decision. The app combines Apple Health signals, workout history, soreness, and RPE so the output is a session adjustment instead of a naked score.',
        ],
      },
    ],
    faqs: [
      {
        q: 'Is HRV useful for powerlifting?',
        a: 'It can be useful as context, especially around heavy exposures and fatigue blocks, but it should be combined with bar performance, RPE, soreness, and recent workload.',
      },
      {
        q: 'What is a bad HRV for lifting?',
        a: 'There is no universal bad value. Compare HRV with your own baseline and check whether other recovery and performance signals agree.',
      },
    ],
    sources: [sources.hrvStrength, sources.hrvGuidedTraining, sources.rpeAutoregulation],
  }),
  guidePage({
    slug: 'guides/recovery-score-for-lifting',
    title: 'Recovery Score for Lifting',
    description: 'What a recovery score can and cannot tell lifters, and how to turn readiness into a useful session adjustment.',
    h1: 'Recovery Score for Lifting',
    primaryQuery: 'recovery score for lifting',
    directAnswer: 'A recovery score for lifting is useful only if it changes the workout decision. Lifters need more than a green, yellow, or red number. The score should account for recovery signals, recent workload, soreness, RPE, and the lift planned today so it can recommend a practical adjustment.',
    keyTakeaways: [
      'A recovery score should lead to a specific action.',
      'Strength training needs set, rep, load, and RPE context.',
      'Do not use recovery scores as medical advice or injury prediction.',
    ],
    decisionRules: [
      { if: 'Score is low but soreness is low and session is technical.', then: 'Maintain with conservative RPE caps.' },
      { if: 'Score is low and soreness is high before heavy compounds.', then: 'Reduce or swap the session.' },
      { if: 'Score is high but recent load is low after time off.', then: 'Progress gradually instead of chasing all missed volume.' },
    ],
    sections: [
      {
        heading: 'What makes a lifting score useful',
        bullets: [
          'It separates global recovery from local muscle soreness.',
          'It knows whether today is heavy, moderate, hypertrophy, or conditioning.',
          'It uses the previous session outcome, especially RPE and completed volume.',
          'It explains the reason in plain language.',
        ],
      },
      {
        heading: 'Useful score outcomes',
        table: {
          columns: ['Score meaning', 'Bad output', 'Useful output'],
          rows: [
            ['Ready', 'Green day.', 'Push if warmups confirm and recent load is not spiking.'],
            ['Mixed', 'Yellow day.', 'Maintain, cap RPE, and avoid optional volume.'],
            ['Poor', 'Red day.', 'Reduce 20-40%, swap intensity, or recover based on signal stack.'],
          ],
        },
      },
      {
        heading: 'Limitations',
        body: [
          'No score sees everything. Pain, illness, life stress, poor technique, and competitive context require human judgment. Tuwa keeps the score tied to the training decision and avoids claiming to predict injury.',
        ],
      },
    ],
    faqs: [
      {
        q: 'What is a good recovery score for lifting?',
        a: 'The useful threshold depends on the athlete and the session. A better question is whether the score changes top-set intensity, accessory volume, or recovery work.',
      },
      {
        q: 'Should I ignore a high score if I am sore?',
        a: 'Do not ignore soreness. A high global recovery score can still miss local muscle fatigue from strength work.',
      },
    ],
  }),
  guidePage({
    slug: 'guides/training-load-vs-recovery',
    title: 'Training Load vs Recovery',
    description: 'The difference between training load and recovery, and how strength athletes should use both to adjust today\'s workout.',
    h1: 'Training Load vs Recovery',
    primaryQuery: 'training load vs recovery',
    directAnswer: 'Training load describes the work you have done; recovery describes how ready your body appears to absorb more work. Strength athletes need both. A normal recovery score can still be risky if workload is spiking, and a high workload can be manageable if today\'s session is adjusted intelligently.',
    keyTakeaways: [
      'Load is the demand; recovery is the current capacity signal.',
      'The session decision sits between the two.',
      'Workload spikes should change volume even when motivation is high.',
    ],
    decisionRules: [
      { if: 'Recovery is good and load is stable.', then: 'Push or maintain the planned session.' },
      { if: 'Recovery is good but load is spiking.', then: 'Maintain intensity but avoid extra volume.' },
      { if: 'Recovery is poor and load is high.', then: 'Reduce, swap, or recover.' },
    ],
    sections: [
      {
        heading: 'The simplest distinction',
        table: {
          columns: ['Concept', 'Question it answers', 'Strength example'],
          rows: [
            ['Training load', 'How much work have I stacked recently?', 'A week with heavy squats, deadlifts, and intervals.'],
            ['Recovery', 'How ready do I seem today?', 'HRV below baseline, sleep short, soreness high.'],
            ['Adjustment', 'What should change now?', 'Keep skill work, cut accessories, or recover.'],
          ],
        },
      },
      {
        heading: 'Why both matter',
        body: [
          'Recovery without load misses the training history. Load without recovery misses today\'s capacity. A good workload system combines both before suggesting the next session.',
          'That is why Tuwa frames the app output as go, modify, or hold with concrete session adjustments instead of only showing separate charts.',
        ],
      },
      {
        heading: 'Common mistake',
        body: [
          'A motivated athlete sees a good recovery score after several hard days and adds more volume. If recent load is already high, the smarter choice may be to keep intensity technical and avoid optional work.',
        ],
      },
    ],
    faqs: [
      {
        q: 'Which matters more, training load or recovery?',
        a: 'Neither is enough alone. Training load describes accumulated work, while recovery describes the current readiness signal. The session adjustment should use both.',
      },
      {
        q: 'Can training load predict injury?',
        a: 'No simple load metric should be treated as injury prediction. Use load as context for progressing training and managing spikes.',
      },
    ],
    sources: [sources.appleTrainingLoad, sources.hrvStrength, sources.acwrReview, sources.acwrLimitations],
  }),
  guidePage({
    slug: 'guides/should-i-train-when-recovery-is-low',
    title: 'Should I Train When Recovery Is Low?',
    description: 'A practical decision guide for low recovery days: when to train, reduce, swap, or rest.',
    h1: 'Should I Train When Recovery Is Low?',
    primaryQuery: 'should I train when recovery is low',
    directAnswer: 'You can sometimes train when recovery is low, but you should change the session if low recovery stacks with poor sleep, high soreness, elevated resting heart rate, pain, illness, or high recent workload. The best adjustment is usually lower volume, capped RPE, technique work, or recovery.',
    keyTakeaways: [
      'Low recovery does not always mean full rest.',
      'Stacked red flags matter more than a single score.',
      'Pain, illness, and medical concerns are outside app-based training advice.',
    ],
    decisionRules: [
      { if: 'Low recovery is isolated and warmups feel normal.', then: 'Train, but keep RPE honest.' },
      { if: 'Low recovery stacks with soreness and high workload.', then: 'Reduce volume or swap intensity.' },
      { if: 'Low recovery stacks with pain, dizziness, fever, or illness symptoms.', then: 'Do not use a calculator as clearance; rest or seek qualified guidance.' },
    ],
    sections: [
      {
        heading: 'A practical low-recovery checklist',
        bullets: [
          'Is resting heart rate higher than normal?',
          'Was sleep short or low quality?',
          'Is soreness local to today\'s main lift?',
          'Did the last session overshoot RPE?',
          'Is this the third or fourth hard day in a row?',
          'Are there symptoms or pain that should override training goals?',
        ],
      },
      {
        heading: 'If you train anyway',
        body: [
          'Choose the smallest change that respects the signal. For example, keep the main lift but remove optional back-off sets, reduce load by 5-10%, or replace hard conditioning with easy aerobic work.',
        ],
      },
      {
        heading: 'If you recover',
        body: [
          'Recovery is not failure. It is a programming choice when the session is unlikely to create a useful adaptation. Log why you changed the plan so the next weekly review has real context.',
        ],
      },
    ],
    faqs: [
      {
        q: 'Is it bad to train on a red recovery day?',
        a: 'Not automatically. It depends on why the day is red and what the planned session demands. The safest app-based advice is to adjust the session, not ignore the signal.',
      },
      {
        q: 'What should I do instead of resting completely?',
        a: 'Options include technique work, mobility, easy Zone 2, or reduced accessory volume, as long as pain and illness are not present.',
      },
    ],
  }),
  guidePage({
    slug: 'guides/how-much-volume-to-cut-when-tired',
    title: 'How Much Volume Should I Cut When Tired?',
    description: 'A simple framework for reducing strength training volume when recovery, soreness, RPE, or workload suggest fatigue.',
    h1: 'How Much Volume Should I Cut When Tired?',
    primaryQuery: 'how much volume should I cut when tired',
    directAnswer: 'When you are tired but still able to train, start by cutting 20-40% of accessory or back-off volume before removing the whole session. Keep technical main work if warmups are safe, cap RPE, and avoid making up the lost volume later unless the weekly plan still supports it.',
    keyTakeaways: [
      'Cut optional volume before cutting the whole workout.',
      'Use RPE and warmups to decide whether main work stays.',
      'Do not automatically make up skipped sets later in the week.',
    ],
    decisionRules: [
      { if: 'Mild fatigue and normal warmups.', then: 'Cut 0-20% and cap RPE.' },
      { if: 'Moderate fatigue, high soreness, or poor sleep.', then: 'Cut 20-40% from accessories and back-off sets.' },
      { if: 'Severe fatigue, pain, or illness signals.', then: 'Recover or get qualified help rather than forcing volume.' },
    ],
    sections: [
      {
        heading: 'Volume cut ranges',
        table: {
          columns: ['Fatigue level', 'What to cut', 'Example'],
          rows: [
            ['Low', 'Optional accessories only', 'Skip curls or one isolation movement.'],
            ['Moderate', '20-40% of accessories or back-off sets', 'Three back-off sets become two; four accessories become two.'],
            ['High', 'Most hard volume', 'Technique singles and mobility only, or rest.'],
          ],
        },
      },
      {
        heading: 'Why volume first',
        body: [
          'For many strength sessions, volume is easier to trim than intensity. You can still practice the main lift while reducing total stress. This is especially useful when HRV or sleep is poor but warmups are technically sound.',
        ],
      },
      {
        heading: 'How Tuwa handles it',
        body: [
          'Tuwa keeps session history, RPE, soreness, and workload together so the suggested cut is attached to the actual plan rather than a generic recovery label.',
        ],
      },
    ],
    faqs: [
      {
        q: 'Should I lower weight or sets first?',
        a: 'If technique is good, reduce optional sets first. If warmups feel heavy or positions break down, reduce load or swap intensity.',
      },
      {
        q: 'Should I make up skipped volume tomorrow?',
        a: 'Usually no. Re-check the weekly load and your next planned session before adding the skipped work back.',
      },
    ],
    sources: [sources.rpeAutoregulation, sources.hrvStrength, sources.acwrReview],
  }),
  guidePage({
    slug: 'guides/acwr-explained',
    title: 'ACWR Explained for Strength and Hybrid Training',
    description: 'A plain-English guide to acute:chronic workload ratio, how it can help, and why Tuwa treats it as context rather than injury prediction.',
    h1: 'ACWR Explained for Strength and Hybrid Training',
    primaryQuery: 'ACWR explained',
    directAnswer: 'ACWR, or acute:chronic workload ratio, compares recent training load with a longer baseline. It can help athletes notice workload spikes, but it should not be treated as injury prediction. For strength and hybrid training, ACWR is most useful when combined with recovery, soreness, RPE, and the next planned session.',
    keyTakeaways: [
      'ACWR compares recent work with the work you have been prepared for.',
      'It is a workload context tool, not a crystal ball.',
      'Tuwa avoids overconfident injury-prediction claims from ACWR.',
    ],
    decisionRules: [
      { if: 'Acute load is far above chronic load.', then: 'Avoid adding optional volume and watch recovery signals.' },
      { if: 'Acute load is far below chronic load after time off.', then: 'Return progressively instead of jumping to old volume.' },
      { if: 'ACWR looks normal but soreness and RPE are poor.', then: 'Use the human signals; the ratio is not enough.' },
    ],
    sections: [
      {
        heading: 'The basic formula',
        body: [
          'Acute load usually means recent workload, often around the last week. Chronic load usually means a longer baseline, often several weeks. The ratio helps show whether current work is unusually high or low compared with recent preparation.',
        ],
      },
      {
        heading: 'Why Tuwa is careful with ACWR',
        body: [
          'ACWR research includes useful ideas and real debate. The safest product use is to flag workload context and support training decisions, not to promise injury prediction or universal safe zones.',
        ],
      },
      {
        heading: 'Strength example',
        body: [
          'If you add heavy squats, deadlifts, and hard conditioning in the same week, acute load may spike even if you feel motivated. Tuwa can suggest keeping technical work while trimming optional accessories.',
        ],
      },
    ],
    faqs: [
      {
        q: 'What does ACWR stand for?',
        a: 'ACWR stands for acute:chronic workload ratio. It compares recent training load with a longer workload baseline.',
      },
      {
        q: 'Does ACWR predict injuries?',
        a: 'Tuwa does not use ACWR as injury prediction. It is treated as one workload context signal among recovery, soreness, RPE, and session history.',
      },
    ],
    sources: [sources.acwrReview, sources.acwrLimitations, sources.appleTrainingLoad],
  }),
  guidePage({
    slug: 'guides/rpe-volume-adjustment',
    title: 'RPE-Based Volume Adjustment',
    description: 'How to use RPE to adjust strength training volume without abandoning the plan every time a set feels hard.',
    h1: 'RPE-Based Volume Adjustment',
    primaryQuery: 'RPE based volume adjustment',
    directAnswer: 'RPE-based volume adjustment means changing sets, reps, or load when effort is higher or lower than planned. If warmups or top sets overshoot target RPE, reduce back-off volume, lower load, or stop optional accessories. Tuwa uses RPE with recovery and workload so the adjustment is not based on feel alone.',
    keyTakeaways: [
      'RPE turns subjective effort into a training input.',
      'The first useful change is often back-off volume.',
      'RPE should be compared with the plan, not judged in isolation.',
    ],
    decisionRules: [
      { if: 'Top set is 1 RPE higher than planned.', then: 'Keep the lift but reduce one back-off set or lower load slightly.' },
      { if: 'Warmups feel unusually heavy and recovery is poor.', then: 'Swap intensity or reduce the day.' },
      { if: 'Sets feel easier than planned and load is stable.', then: 'Add small load or one optional set only if the week can absorb it.' },
    ],
    sections: [
      {
        heading: 'How to apply RPE in a session',
        table: {
          columns: ['Planned', 'Actual', 'Adjustment'],
          rows: [
            ['3x5 at RPE 7', 'First set is RPE 8.5', 'Reduce load or stop after two work sets.'],
            ['Top single at RPE 8', 'Warmup already feels like RPE 8', 'Swap to technique work.'],
            ['Accessories at RPE 8', 'First two exercises overshoot', 'Cut the last accessory.'],
          ],
        },
      },
      {
        heading: 'Why RPE needs recovery context',
        body: [
          'A high RPE can come from under-recovery, poor sleep, stress, accumulated workload, or simply choosing too much weight. Pairing RPE with recovery signals makes the adjustment more useful.',
        ],
      },
      {
        heading: 'Common mistake',
        body: [
          'Do not use RPE as a reason to rewrite the program every day. Use it to make the smallest adjustment that keeps the training goal intact.',
        ],
      },
    ],
    faqs: [
      {
        q: 'Is RPE better than percentage-based training?',
        a: 'They answer different questions. Percentages set a plan; RPE helps adjust the plan to the athlete on that day.',
      },
      {
        q: 'Can beginners use RPE?',
        a: 'Beginners can use simple versions, but they should expect calibration to improve with practice and honest logging.',
      },
    ],
    sources: [sources.rpeAutoregulation, sources.hrvStrength],
  }),
  {
    slug: 'weekly-training-review-template',
    kind: 'template',
    eyebrow: 'Template',
    title: 'Weekly Training Review Template',
    description: 'A simple weekly review template for strength and hybrid athletes to connect workload, recovery, soreness, RPE, and next-week adjustments.',
    h1: 'Weekly Training Review Template',
    primaryQuery: 'weekly training review template',
    directAnswer: 'A useful weekly training review connects what you planned, what you completed, how hard it felt, and how you recovered. For strength and hybrid athletes, review volume, intensity, soreness, HRV, sleep, RPE misses, and workload spikes before deciding what to change next week.',
    updated: '2026-06-06',
    keyTakeaways: [
      'The review should create next-week decisions, not just record totals.',
      'Track both planned and completed work.',
      'Log why a session changed so patterns are visible later.',
    ],
    decisionRules: [
      { if: 'Most sessions overshot RPE.', then: 'Reduce next week\'s top-set targets or accessory volume.' },
      { if: 'Recovery was poor after one specific session type.', then: 'Adjust that session before blaming the whole program.' },
      { if: 'Workload jumped after missed sessions.', then: 'Smooth the return instead of cramming volume.' },
    ],
    sections: [
      {
        heading: 'Copy this weekly review',
        table: {
          columns: ['Prompt', 'What to write'],
          rows: [
            ['Best session', 'What went well and why.'],
            ['Hardest session', 'What made it hard: load, sleep, soreness, stress, or pacing.'],
            ['RPE misses', 'Where actual effort exceeded the plan.'],
            ['Recovery signals', 'HRV, resting heart rate, sleep, soreness, and mood trends.'],
            ['Workload change', 'Whether total training rose, fell, or spiked.'],
            ['Next adjustment', 'Note whether next week should hold steady, trim volume, cap intensity, or add recovery.'],
          ],
        },
      },
      {
        heading: 'Strength example',
        body: [
          'If squats overshot RPE twice and soreness carried into conditioning, next week might keep the squat exposure but cut one back-off set and move intervals farther from the heavy lower-body day.',
        ],
      },
      {
        heading: 'How Tuwa helps',
        body: [
          'Tuwa keeps the workout log, readiness, workload, soreness, and weekly review together, so the review is built from what actually happened instead of memory.',
        ],
      },
    ],
    comparison: undefined,
    faqs: [
      {
        q: 'How long should a weekly training review take?',
        a: 'Five to ten minutes is enough if the workout log, RPE, soreness, sleep, and workload are already captured.',
      },
      {
        q: 'What is the most important weekly review question?',
        a: 'Ask what should change next week. If the review does not alter a decision, it is only a diary.',
      },
    ],
    sources: [sources.appleTrainingLoad, sources.hrvStrength, sources.rpeAutoregulation],
    related: [
      { label: 'Training load vs recovery', url: '/guides/training-load-vs-recovery' },
      { label: 'RPE-based volume adjustment', url: '/guides/rpe-volume-adjustment' },
      { label: 'Use the readiness calculator', url: '/strength-readiness-calculator' },
    ],
    cta: { label: 'Try Tuwa on the App Store', href: 'https://apps.apple.com/us/app/tuwa/id6761185505' },
  },
  comparisonPage({
    slug: 'comparisons/athlytic-alternative-strength-training',
    competitor: 'Athlytic',
    audience: 'strength training',
    title: 'Athlytic Alternative for Strength Training',
    description: 'Compare Athlytic and Tuwa for lifters who want Apple Watch recovery plus strength workout logging and session-level adjustments.',
    primaryQuery: 'Athlytic alternative for strength training',
    directAnswer: 'Athlytic is a strong Apple Watch recovery and exertion dashboard. Tuwa is the better fit if your main question is how to adjust a strength session from HRV, sleep, soreness, RPE, recent workload, and the lifts planned today. It is narrower, but more training-prescription focused.',
    competitorBestFor: 'Apple Watch users who want a broad recovery, exertion, sleep, and health dashboard.',
    tuwaBestFor: 'Self-coached lifters who want session-level strength adjustments from recovery plus workout-log context.',
    competitorWins: [
      'Broad Apple Watch health and recovery surface.',
      'Exertion and target exertion framing for daily training load.',
      'Established App Store presence and mature wearable workflow.',
    ],
    tuwaDifference: [
      'Tuwa starts from the planned strength or hybrid session, not only a daily score.',
      'Sets, reps, weight, RPE, RIR, soreness, and workload feed the adjustment.',
      'The output is a practical app verdict: go, modify, or hold with session-level adjustment details.',
    ],
    doNotUseTuwa: [
      'You mainly want a broad Apple Watch health dashboard.',
      'You do not log strength sessions or RPE.',
      'You want social recovery badges more than workout prescription changes.',
    ],
    competitorSources: [sources.athlytic],
  }),
  comparisonPage({
    slug: 'comparisons/bevel-alternative-lifters',
    competitor: 'Bevel',
    audience: 'lifters',
    title: 'Bevel Alternative for Lifters',
    description: 'Compare Bevel and Tuwa for lifters choosing between broad health tracking and strength-specific session adjustment.',
    primaryQuery: 'Bevel alternative for lifters',
    directAnswer: 'Bevel is a broad Apple Watch health, recovery, strain, nutrition, and coaching app. Tuwa is more focused for lifters who already know the workout they plan to do and need to decide what to change today from readiness, soreness, RPE, workload, and session history.',
    competitorBestFor: 'People who want recovery, strain, sleep, nutrition, health monitors, and broader coaching in one app.',
    tuwaBestFor: 'Lifters who want a quieter tool for workout logging, readiness, workload, and session adjustment.',
    competitorWins: [
      'Broader lifestyle and health surface, including nutrition and health monitors.',
      'Free and Pro tiers with many tracking features.',
      'Apple Watch app, widgets, and complications.',
    ],
    tuwaDifference: [
      'Tuwa is built around the strength training loop: plan, log, adapt, review.',
      'It treats soreness and RPE as first-class inputs for the day\'s training decision.',
      'It avoids turning every health signal into a broad lifestyle coaching feed.',
    ],
    doNotUseTuwa: [
      'You want nutrition tracking or broad biological age features.',
      'You want an all-in-one lifestyle dashboard.',
      'You do not care about set, rep, load, and RPE logging.',
    ],
    competitorSources: [sources.bevel],
  }),
  comparisonPage({
    slug: 'comparisons/whoop-strength-trainer-alternative-apple-watch',
    competitor: 'WHOOP Strength Trainer',
    audience: 'Apple Watch users',
    title: 'WHOOP Strength Trainer Alternative for Apple Watch',
    description: 'Compare WHOOP Strength Trainer and Tuwa for athletes who want strength-training load context while staying on Apple Watch.',
    primaryQuery: 'WHOOP Strength Trainer alternative Apple Watch',
    directAnswer: 'WHOOP Strength Trainer is built for WHOOP members who want muscular load included in WHOOP strain. Tuwa is an Apple Watch-first alternative for lifters who want recovery signals, workout logging, soreness, RPE, workload, and a plain-English adjustment for today\'s strength or hybrid session.',
    competitorBestFor: 'WHOOP members who want strength work included in the WHOOP strain ecosystem.',
    tuwaBestFor: 'Apple Watch users who want to keep HealthKit data local and make strength-specific adjustments.',
    competitorWins: [
      'Direct muscular-load story inside the WHOOP ecosystem.',
      'Exercise, reps, and weight tracking for strength sessions.',
      'Works naturally if WHOOP is already your primary wearable.',
    ],
    tuwaDifference: [
      'Tuwa is designed around Apple Watch and Apple Health rather than a separate wearable.',
      'It combines recovery, workload, soreness, RPE, and planned session type for the adjustment.',
      'It emphasizes privacy and practical training changes over wearable ecosystem lock-in.',
    ],
    doNotUseTuwa: [
      'You already train with WHOOP and want all strain inside that membership.',
      'You do not use Apple Watch.',
      'You need team or organization-level WHOOP workflows.',
    ],
    competitorSources: [sources.whoopStrength, sources.whoopLaunch],
  }),
  comparisonPage({
    slug: 'comparisons/cora-vs-tuwa',
    competitor: 'Cora',
    audience: 'adaptive training',
    title: 'Cora vs Tuwa',
    description: 'Compare Cora and Tuwa for athletes choosing between all-in-one AI fitness coaching and strength-specific recovery and workload adjustment.',
    primaryQuery: 'Cora vs Tuwa',
    directAnswer: 'Cora is an all-in-one AI fitness coach for recovery, training, nutrition, and progress. Tuwa is more focused: it helps serious strength and hybrid athletes adjust today\'s session from Apple Watch recovery, workout history, workload, soreness, and RPE without adding a broad lifestyle coaching layer.',
    competitorBestFor: 'Athletes who want recovery, training, nutrition, and AI coaching in one broader app.',
    tuwaBestFor: 'Self-coached strength and hybrid athletes who want fewer surfaces and sharper session decisions.',
    competitorWins: [
      'Broader all-in-one positioning across recovery, training, nutrition, and progress.',
      'AI coach experience for users who want conversational guidance.',
      'Support for multiple wearable ecosystems according to Cora\'s own positioning.',
    ],
    tuwaDifference: [
      'Tuwa stays closer to the workout log and next-session decision.',
      'It is designed for Apple Watch recovery plus strength/hybrid workload context.',
      'It keeps the output concrete: go, modify, or hold, with details such as reduced volume, capped RPE, or delayed hard work.',
    ],
    doNotUseTuwa: [
      'You want one app for nutrition, habits, and broad AI coaching.',
      'You prefer conversational coaching over a quieter training log.',
      'You use a wearable ecosystem outside Apple Watch as your main data source.',
    ],
    competitorSources: [sources.cora],
  }),
  comparisonPage({
    slug: 'comparisons/strong-vs-tuwa',
    competitor: 'Strong',
    audience: 'strength logging',
    title: 'Strong vs Tuwa',
    description: 'Compare Strong and Tuwa for lifters choosing between a mature workout tracker and a recovery-informed strength training system.',
    primaryQuery: 'Strong vs Tuwa',
    directAnswer: 'Strong is a mature gym workout tracker for logging routines, sets, reps, and progress. Tuwa is different because it combines strength logging with Apple Watch recovery, workload, soreness, and RPE to answer what should change in today\'s session. Choose based on whether you need logging alone or adaptive adjustment.',
    competitorBestFor: 'Lifters who want a simple, mature, flexible workout log.',
    tuwaBestFor: 'Lifters who want a log plus readiness and workload-informed adjustments.',
    competitorWins: [
      'Longstanding strength tracking workflow.',
      'Simple gym logging and workout history.',
      'Apple Watch support for recording workouts from the wrist.',
    ],
    tuwaDifference: [
      'Tuwa connects the log to recovery and workload instead of leaving adaptation entirely manual.',
      'It captures RPE, RIR, soreness, and readiness as part of the same decision loop.',
      'It focuses on self-coached athletes who need help changing today\'s plan.',
    ],
    doNotUseTuwa: [
      'You only need a classic workout log.',
      'You do not want readiness, workload, or recovery context.',
      'You have a coach who already prescribes every adjustment.',
    ],
    competitorSources: [sources.strong, sources.strongWatch],
  }),
  comparisonPage({
    slug: 'comparisons/hevy-vs-tuwa',
    competitor: 'Hevy',
    audience: 'workout tracking',
    title: 'Hevy vs Tuwa',
    description: 'Compare Hevy and Tuwa for lifters choosing between social workout tracking and recovery-informed strength session adjustment.',
    primaryQuery: 'Hevy vs Tuwa',
    directAnswer: 'Hevy is a popular workout tracker and planner with social features, routines, graphs, Apple Watch support, and a large user base. Tuwa is more focused on recovery-informed strength decisions: it combines Apple Watch recovery, workload, soreness, RPE, and workout history to adjust today\'s session.',
    competitorBestFor: 'Lifters who want a polished workout tracker with routines, progress graphs, and social motivation.',
    tuwaBestFor: 'Lifters who want the workout log connected to readiness and workload guidance.',
    competitorWins: [
      'Large workout-tracking feature set and community orientation.',
      'Routines, custom exercises, graphs, and Apple Watch live sync.',
      'A familiar gym-log workflow for many lifters.',
    ],
    tuwaDifference: [
      'Tuwa treats the workout log as an input to readiness and session adjustment.',
      'It emphasizes recovery, workload, soreness, RPE, and weekly review over social comparison.',
      'It answers what to change today rather than only recording what happened.',
    ],
    doNotUseTuwa: [
      'You primarily want social workout sharing and community feeds.',
      'You only need routine planning and progress graphs.',
      'You do not use Apple Watch recovery data.',
    ],
    competitorSources: [sources.hevy],
  }),
];
