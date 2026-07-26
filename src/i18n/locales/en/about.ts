type WidenStrings<T> = T extends string
  ? string
  : T extends readonly any[]
  ? { [K in keyof T]: WidenStrings<T[K]> }
  : { [K in keyof T]: WidenStrings<T[K]> };

// ---------------------------------------------------------------------------
// About page — editorial manifesto. Copy claims are drawn from existing
// sources only: the homepage module (en/home.ts), compare.ts positioning,
// and the product definition in the app repo's CLAUDE.md. No new claims.
// ---------------------------------------------------------------------------
const about = {
  meta: {
    title: 'About',
    description:
      'Why Tuwa exists: the sports-science back room for self-coached athletes. Decision support for the plan you author — it never writes the program.',
  },
  hero: {
    kicker: 'about',
    title: 'The back room',
    lede:
      "Pro athletes don't make training decisions alone. Behind every plan there's a back room — coaches, physios, sports scientists — turning body signals into the day's call. Tuwa exists because self-coached athletes don't have one.",
  },
  problem: {
    kicker: '01 · the problem',
    heading: 'Serious athletes, coaching themselves, with no staff behind them',
    body: [
      "If you train sport skill, strength and conditioning in parallel — hard, and by yourself — nobody is watching the whole picture. No one weighs last night's session against this morning's physiology and tells you what today should actually look like.",
      "The apps don't fill the gap. Recovery wearables hand you a score without knowing your plan. AI coaches will happily train you — on their program, not yours. Planning platforms store your plan and leave the daily decision to you at the worst possible moment.",
      'Every tool either owns your program or refuses to touch it.',
    ],
  },
  what: {
    kicker: '02 · what tuwa is',
    heading: 'The decision layer for the plan you author',
    body: [
      "You write the program — or bring your coach's. Tuwa reads it whole, fuses it with your physiology — HRV, sleep, resting heart rate, training history — and supports the decisions around it: today's numbers, a go / modify / hold verdict, and where your load is trending over the coming weeks.",
      'It never writes the program. It never makes you chat with it. A verdict, the numbers behind it, and the session you actually meant to do.',
    ],
  },
  who: {
    kicker: '03 · who it’s for',
    heading: 'Built for self-coached athletes, by one',
    body: [
      'Tuwa is for athletes who train sport skill and strength in parallel and make every training decision themselves — no coach, no physio, no sports-science support on call.',
      'It is built by one self-coached athlete, for exactly this problem. The founder is the reference user: the first person training on every build.',
    ],
  },
  principles: {
    kicker: '04 · principles',
    heading: 'Five rules the product keeps',
    items: [
      {
        title: 'Your plan stays yours',
        body: 'Tuwa modulates the program you authored. It never generates one, and it never quietly rewrites yours.',
      },
      {
        title: 'Text before color',
        body: 'Zone states are always written out. Color is supplementary — never the message.',
      },
      {
        title: 'No black boxes',
        body: 'Every verdict comes with the numbers behind it, scored against your own baselines. Same input, same answer — the engine is deterministic.',
      },
      {
        title: 'Equal-weight choices',
        body: 'Go, modify and hold are presented as equal options. The interface never pressures you toward changing your plan.',
      },
      {
        title: 'Raw health data never leaves the device',
        body: 'HealthKit access is read-only. Raw HRV, sleep and heart-rate samples stay on your phone — only composite scores sync.',
      },
    ],
  },
  closing: {
    heading: 'Keep your plan. Adjust the day.',
    cta: 'Download on the App Store',
    ctaNote: 'iOS 17+ · iPhone',
  },
} as const;

export default about;
export type About = WidenStrings<typeof about>;
