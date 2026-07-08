import type { TopicPageContent } from '../../topicPage';

const content: TopicPageContent = {
  meta: {
    title: 'Tuwa vs. Wearable Scores, AI Coaches, and Planning Tools',
    description:
      'Tuwa keeps your own plan in charge, then uses physiology, training history, and match proximity to suggest today\'s strength adjustment.',
  },
  hero: {
    outcomeStatement: 'Your plan, made safe and optimal',
    hookLine:
      'Whoop and Bevel give scores without your plan. AI coaches replace your plan. TrainingPeaks stores the plan without a daily decision. Tuwa sits in the back room.',
  },
  sections: [
    {
      heading: 'What the other tools answer',
      body: [
        'Wearable recovery products are useful for broad body state. They can show sleep, HRV, resting heart rate, strain, or a composite score. The gap is that they usually do not know the strength session you authored, the planned top set, or whether Saturday\'s match is inside 48 hours.',
        'AI-coach apps answer a different question: what should the program be? That can be useful for athletes who want a generated plan. Tuwa is deliberately not that. It does not write the workout or act like a chat coach.',
        'Planning tools keep the calendar and structure clear. The missing piece is the day-of verdict tied to physiology: should this squat top set stay, move down, or become a microdose because match proximity is high?'
      ],
    },
    {
      heading: 'What Tuwa does differently',
      body: [
        'Tuwa starts with the plan you already chose. It fuses that plan with HRV, resting heart rate, sleep, training history, soreness, logged match context, and match proximity, then gives a go, modify, or hold suggestion with an adjusted top-set number and a one-line reason.',
        'That creates a narrower but more useful answer for amateur competitive basketball players who lift seriously: stay in your strike zone today. Not a lifestyle score, not a generated program, and not a spreadsheet that leaves the decision to you at the worst moment.',
        'The athlete stays in charge. Tuwa suggests and explains; you confirm.'
      ],
    },
    {
      heading: 'Tool category vs. Tuwa',
      subheading: 'A fit-for-purpose comparison, not a takedown',
      body: [
        'These tools can all be useful. The difference is which decision they are built to support.'
      ],
      comparison: {
        columns: ['Dimension', 'Other tool', 'Tuwa'],
        rows: [
          {
            label: 'Whoop / Bevel-style scores',
            generic: 'Body signals and composite readiness without direct knowledge of your planned lift.',
            tuwa: 'Your planned strength session plus physiology, training history, soreness, and match context.',
          },
          {
            label: 'AI-coach apps',
            generic: 'Their plan for you, often generated from prompts or profile inputs.',
            tuwa: 'Your plan, evaluated for today. No generated program and no chat coach.',
          },
          {
            label: 'TrainingPeaks-style planning',
            generic: 'Your plan and calendar, but the daily adjustment is still mostly on you.',
            tuwa: 'Your plan plus a go, modify, or hold suggestion before the lift starts.',
          },
          {
            label: 'Basketball fatigue',
            generic: 'Usually represented as a whole-body score or generic training load.',
            tuwa: 'Match tier and lift context: last night\'s game hammered your legs; bench may still be fine.',
          },
          {
            label: 'Decision owner',
            generic: 'Either the tool owns the plan or the tool stops before the decision.',
            tuwa: 'The athlete owns the plan and confirms the suggested adjustment.',
          },
        ],
      },
    },
    {
      heading: 'How to decide',
      body: [
        'Use a wearable score if you mainly want broad recovery awareness. Use an AI coach if you want the app to write the program. Use a planning platform if your main need is calendar structure.',
        'Use Tuwa if you are self-coached, play competitive basketball, strength-train seriously, and need the day\'s lift adjusted without surrendering the program.',
        'The compact promise is simple: you are the CEO of your own body; Tuwa is the sports-science back room.'
      ],
    },
  ],
  related: {
    heading: 'Go deeper',
    links: [
      { label: 'Daily verdict', href: '/features/recovery-scoring' },
      { label: 'Lift + match logging', href: '/features/workload-tracking' },
      { label: 'Your plan input', href: '/features/smart-templates' },
    ],
  },
};

export default content;
