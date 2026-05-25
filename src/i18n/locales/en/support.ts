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
      a: 'Tuwa synthesizes data from multiple sources -- HRV, resting heart rate, sleep duration, body temperature, and your morning wellness check-in -- into a single readiness score each day. Each factor is weighted based on its reliability and your personal baseline, with plain-language explanations of what drove the score.',
    },
    {
      q: 'Does Tuwa work without an Apple Watch?',
      a: 'Yes. While Tuwa reads HRV, heart rate, and sleep data from HealthKit (which Apple Watch, Whoop, Oura, and Garmin provide), you can still log workouts, track load, and use wellness check-ins without any wearable. Recovery scoring accuracy improves with HealthKit data but is not required.',
    },
    {
      q: 'How is my health data stored and protected?',
      a: 'All data is stored locally on your device using SwiftData. The app works fully offline. When you use cloud features (coach-athlete sync, multi-device access), only composite scores sync to our servers -- raw HealthKit data never leaves your device.',
    },
    {
      q: 'How do I manage my subscription?',
      a: 'Subscriptions are managed through Apple. Go to Settings > Apple ID > Subscriptions on your device to view, change, or cancel your Tuwa subscription. Cancellation takes effect at the end of your current billing period.',
    },
    {
      q: 'How does the coach invitation work?',
      a: 'Go to Profile and tap Invite My Coach. You can share a 6-character invite code, send an email invitation, or use NFC to connect with your coach instantly. Once linked, your coach can view your recovery scores, workload trends, and session history.',
    },
    {
      q: 'What is ACWR and why does it matter?',
      a: 'ACWR stands for Acute:Chronic Workload Ratio. It compares your recent training load (last 7 days) against your longer-term average (last 28 days). When this ratio spikes above safe thresholds, injury risk increases. Tuwa monitors this continuously and alerts you when a session would push you into a danger zone.',
    },
    {
      q: 'How long until Tuwa has enough data to give reliable scores?',
      a: 'Tuwa starts providing useful guidance from day one using population-level baselines and your wellness check-ins. As you log workouts and sync HealthKit data, scores become increasingly personalized. After about 7 days, your recovery score reflects your individual patterns rather than population averages.',
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
