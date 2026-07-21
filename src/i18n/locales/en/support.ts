type WidenStrings<T> = T extends string
  ? string
  : T extends readonly any[]
  ? { [K in keyof T]: WidenStrings<T[K]> }
  : { [K in keyof T]: WidenStrings<T[K]> };

const support = {
  meta: {
    title: 'Support',
    description: 'Get help with Tuwa — Training Load & Recovery app.',
  },
  faqHeading: 'Frequently Asked Questions',
  faq: [
    {
      q: 'How does Tuwa calculate my recovery score?',
      a: 'Tuwa synthesizes HRV, resting heart rate, sleep duration, and your morning wellness check-in into a daily readiness signal. Each factor is weighted based on its reliability and your personal baseline, with plain-language explanations that support the app\'s go, modify, or hold verdict.',
    },
    {
      q: 'Does Tuwa work without an Apple Watch?',
      a: 'Yes. While Tuwa reads HRV, heart rate, and sleep data from HealthKit (which Apple Watch, Whoop, Oura, and Garmin provide), you can still log workouts, track load, and use wellness check-ins without any wearable. Recovery scoring accuracy improves with HealthKit data but is not required.',
    },
    {
      q: 'How is my health data stored and protected?',
      a: 'All data is stored locally on your device using SwiftData. The app works fully offline. When you use cloud features (multi-device access), only composite scores sync to our servers -- raw HealthKit data never leaves your device.',
    },
    {
      q: 'How do I manage my subscription?',
      a: 'Subscriptions are managed through Apple. Go to Settings > Apple ID > Subscriptions on your device to view, change, or cancel your Tuwa subscription. Cancellation takes effect at the end of your current billing period.',
    },
    {
      q: 'What is ACWR and why does it matter?',
      a: 'ACWR stands for Acute:Chronic Workload Ratio. It compares your recent training load against a longer-term average. Tuwa treats it as workload context, not injury prediction: recent workload and spike flags are shown before training so you can review volume, intensity, or timing with the latest saved data in mind.',
    },
    {
      q: 'How long until Tuwa has enough data to give reliable scores?',
      a: 'Tuwa starts by setting up your training profile and building from your wellness check-ins, logged workouts, and any HealthKit data you permit. With little recovery history, the app stays conservative instead of using population baselines. As real data accumulates, scores become increasingly personal.',
    },
    {
      q: 'How do I contact support or report a bug?',
      a: 'Email us at hanwenma09@gmail.com. We typically respond within 48 hours. Include your device model and iOS version when reporting bugs to help us investigate faster.',
    },
  ] as const,
  contact: {
    heading: 'Contact us',
    subtext: "Can't find what you're looking for? We're here to help.",
    buttonLabel: 'Contact Support',
    responseTime: 'We typically respond within 48 hours.',
  },
} as const;

export default support;
export type Support = WidenStrings<typeof support>;
