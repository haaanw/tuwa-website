// The hosted plan-writing skill (app v1.7.6, PLAN-AUTHORING.md §13). The app's "Build it with
// your AI" prompt links to https://tuwa.app/skills/design-program; the athlete's own Claude or
// ChatGPT reads the skill there. The skill text, the import format and the rulebook are shown
// verbatim from src/skills/design-program/ — this file holds only the page's own words.
// Claim rails: Tuwa never writes the plan, never prescribes, never names an injury risk.
const skills = {
  shared: {
    copy: 'Copy',
    copied: 'Copied',
    copyFailed: 'Select the text to copy it',
    rawFile: 'Plain text file',
    routes: {
      heading: 'Two ways back to Tuwa',
      paste: {
        key: 'Paste',
        title: 'Paste the plan into Tuwa',
        body: 'Copy the plan from your AI. In Tuwa, paste it on the Your plan step of setup, or later in Log › Bring your program.',
      },
      connector: {
        key: 'Connector',
        title: 'Connect Tuwa to your AI',
        body: 'Where the Tuwa connector is available for your Claude or ChatGPT, your AI sends the plan to Tuwa as a draft. Open Tuwa to review it.',
      },
      after: 'Either way, Tuwa reads the plan, checks it against its rulebook and shows you what it found. In the app, findings never block your own plan. Through the connector, a draft that breaks a rule goes back to your AI with the exact findings. Tuwa never starts a plan you did not confirm.',
    },
    ownership: 'The plan is yours. Tuwa does not write it and does not judge whether it suits your body. If something hurts, talk to a qualified professional.',
  },
  skill: {
    meta: {
      title: 'Write your plan with your own AI',
      description: "Tuwa's plan-writing skill for Claude and ChatGPT: the rulebook to follow, the questions in order, and the text format Tuwa imports. Your AI writes the plan; you confirm it in Tuwa.",
    },
    kicker: 'Skill · design-program',
    heading: 'Write your plan with your own AI',
    lede: 'Your own Claude or ChatGPT writes your plan, inside Tuwa’s published rulebook and in the text format Tuwa imports. Tuwa does not write the plan. You review it in Tuwa and confirm it before it runs.',
    howHeading: 'How it works',
    steps: [
      'In Tuwa, tap Copy the prompt, then open Claude or ChatGPT and paste it. The prompt sends your AI to this page.',
      'Your AI reads the skill below and asks you its questions in a fixed order, one group at a time.',
      'It writes phase 1 of your plan in Tuwa’s format and keeps your profile, so it can write phase 2 later from the same start.',
    ],
    skillHeading: 'The skill',
    skillLede: 'This is the text your AI reads. Tuwa’s connector serves the same text.',
    forAI: 'For an AI model reading this page: follow the skill text below. The full import format is at https://tuwa.app/skills/design-program/import-format.md and the current rulebook is at https://tuwa.app/skills/design-program/program-rules.v0.json.',
    filesHeading: 'Files',
    files: {
      skill: 'The skill',
      format: 'The import format',
      rules: 'The rulebook (v0)',
    },
    rulesHeading: 'The rulebook',
    rulesBody: 'Tuwa checks every plan against a published rulebook. Your AI fetches the current version each time, so a change reaches every AI at once. Version v0 holds two rules: the beginner floor (a first plan starts at the low end of every range) and the week-to-week increase limit. The file names its sources.',
    formatHeading: 'The import format',
    formatBody: 'The plan comes back as plain text: a short header, then weeks, days and one movement per line.',
    formatLink: 'See the format and an example',
  },
  format: {
    meta: {
      title: 'Tuwa’s plan import format',
      description: 'The plain-text plan format Tuwa imports: the plan header, weeks, days, sections and movement lines, with a short example. Your AI writes it; you paste it into Tuwa.',
    },
    kicker: 'Import format · v1.7.6',
    heading: 'Tuwa’s plan import format',
    lede: 'The plain text Tuwa reads when you paste a plan, and the text an AI sends through Tuwa’s connector. Your AI writes it for you; this page shows what it looks like.',
    back: 'The plan-writing skill',
    exampleHeading: 'A short example',
    exampleNote: 'An example of the format, not a plan to follow.',
    linesHeading: 'What each line means',
    lines: [
      { code: 'Name: · Goal: · Phase: · Weeks: · Start rule: · Athlete history band:', text: 'The plan header. One “Key: value” per line, before Week 1. All six are required. Profile: is optional.' },
      { code: 'Week 1', text: 'Starts a week. Weeks count from 1, in order. “Week 4 — Deload” marks a deload week. “Week 3: same as Week 2” repeats a week exactly.' },
      { code: 'Day 1 — Lower strength', text: 'Starts a day inside the week, with the day’s own short title.' },
      { code: 'Strength A (rest 2–3 min)', text: 'A plain line is a section header. A short note can follow in parentheses. Sets under “Warm-up” are warm-up sets.' },
      { code: '- Back squat: 3 × 5 @ 40 kg · RIR 3', text: 'One movement per line: sets × reps, a time (30 s, 20 min) or a distance (30 m, 5 km). Then the load (kg, lb, %, bodyweight), the effort (RIR or RPE) and “each side” where it applies.' },
      { code: 'Cue: · Rule:', text: 'At most one cue under a movement, and one rule for the whole day.' },
      { code: 'Reference: Morning routine', text: 'Pages after the last week that are not training days, one item per line.' },
    ],
    specHeading: 'The full specification',
    specLede: 'Your AI reads this version. It is the same text Tuwa’s connector serves.',
  },
};

type WidenStrings<T> = T extends string ? string : { [K in keyof T]: WidenStrings<T[K]> };
export type Skills = WidenStrings<typeof skills>;

export default skills as Skills;
