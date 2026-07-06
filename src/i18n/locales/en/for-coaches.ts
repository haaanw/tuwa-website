import type { TopicPageContent } from '../../topicPage';

const content: TopicPageContent = {
  meta: {
    title: 'Tuwa for Self-Coached Basketball Players',
    description:
      'How Tuwa helps amateur competitive basketball players who lift seriously adjust their own planned strength sessions.',
  },
  hero: {
    outcomeStatement: 'Self-coached does not have to mean guessing',
    hookLine:
      'Tuwa gives you the sports-science back room usually reserved for athletes with coaching, physio, and strength staff.',
  },
  sections: [
    {
      heading: 'The problem: basketball and lifting collide',
      body: [
        'You write your own plan, play real games, and still want to get stronger. The difficult decision is rarely whether to train. It is whether today\'s planned top set is still inside your strike zone after last night\'s court work.',
        'A generic recovery score can tell you your whole body looks good or bad. A training log can tell you what you planned. Neither one alone says: your legs took the hit, adjust squats, bench is still available.',
        'Tuwa is built for that gap. It does not take over programming. It gives the daily evidence you would want from a sports-science back room, then lets you confirm the call.'
      ],
    },
    {
      heading: 'What Tuwa gives you',
      subheading: 'Your plan, physiology, and match context in one decision',
      body: [
        'Tuwa starts with the strength session you authored. It reads HRV, resting heart rate, and sleep from HealthKit, adds training history, soreness, match tier, and match proximity, then returns a go, modify, or hold suggestion.',
        'The suggestion includes an adjusted top-set number and a one-line reason so the decision is concrete before warmups begin.'
      ],
      bullets: [
        'Strike zone: the daily intensity band that moves with physiology, training history, and basketball context.',
        'Microdose: a trimmed version of your own planned lift, often one or two capped top sets near game day.',
        'Match proximity: when a game is within 48 hours, the verdict protects freshness.',
        'Cross-modal fatigue: last night\'s game can lower squat readiness without blocking bench.',
        'Suggest-and-confirm: Tuwa explains the adjustment; you decide.'
      ],
    },
    {
      heading: 'What Tuwa does not do',
      body: [
        'Tuwa does not write the program. It does not generate a workout from chat. It does not command you to stop training. It does not replace a medical professional or claim to predict injury.',
        'That restraint is the point. The app is designed for athletes who want to stay the author of their own training while getting a more precise day-of adjustment.'
      ],
    },
    {
      heading: 'Who it is for',
      body: [
        'Tuwa fits amateur competitive basketball players who also strength-train seriously, especially athletes without pro coaching, physio, or strength-and-conditioning support.',
        'If your week includes pickup, scrimmages, matches, and planned lifts, Tuwa helps you keep the program moving without pretending every hard session costs the same.',
        'You are the CEO of your own body. Tuwa is the back room.'
      ],
    },
  ],
  related: {
    heading: 'Keep exploring',
    links: [
      { label: 'Daily verdict', href: '/features/recovery-scoring' },
      { label: 'Lift + match logging', href: '/features/workload-tracking' },
      { label: 'Compare Tuwa', href: '/compare' },
    ],
  },
};

export default content;
