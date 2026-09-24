type WidenStrings<T> = T extends string
  ? string
  : T extends readonly any[]
  ? { [K in keyof T]: WidenStrings<T[K]> }
  : { [K in keyof T]: WidenStrings<T[K]> };

const terms = {
  meta: {
    title: 'Terms of Service',
    lastUpdated: 'September 24, 2026',
    description: 'Terms of Service for Tuwa — Training Load & Recovery app.',
  },
  disclaimer: {
    text: 'This is a translation. The English version is the legally binding document.',
  },
  intro: {
    p1: 'These Terms of Service ("Terms") govern your use of the Tuwa mobile application ("the app") developed by Hanwen Ma ("we", "us", "our"). By downloading, installing, or using the app, you agree to these Terms.',
  },
  useOfApp: {
    heading: '1. Use of the App',
    p1: 'Tuwa is a training load and recovery management tool. You may use it for personal fitness tracking. You agree to:',
    items: [
      'Provide accurate information when creating your account',
      'Keep your login credentials secure',
      'Use the app in compliance with all applicable laws',
    ] as const,
  },
  accounts: {
    heading: '2. Accounts',
    p1: 'You need an account to use Tuwa. You are responsible for all activity under your account. If you suspect unauthorized access, contact us immediately.',
  },
  subscriptions: {
    heading: '3. Subscriptions',
    p1: "Tuwa offers a free tier and a paid auto-renewing subscription, Tuwa Pro. The available subscription lengths and their prices are shown in the app before you purchase and on the App Store product page. Paid subscriptions are billed through Apple's App Store and managed by RevenueCat.",
    items: [
      {
        label: 'Billing',
        description: 'Payment is charged to your Apple account at confirmation of purchase. Subscriptions auto-renew at the same price and for the same length unless cancelled at least 24 hours before the end of the current period, and your account is charged for renewal within 24 hours of the end of that period.',
      },
      {
        label: 'Cancellation',
        description: "You can cancel anytime through your device's Settings > Apple ID > Subscriptions. Cancellation takes effect at the end of the current billing period.",
      },
      {
        label: 'Refunds',
        description: 'Refund requests are handled by Apple per their App Store policies.',
      },
      {
        label: 'Price changes',
        description: 'We may change subscription prices. You will be notified before any price increase takes effect.',
      },
    ] as const,
  },
  healthKitData: {
    heading: '4. HealthKit Data',
    p1: 'Tuwa reads health data from Apple HealthKit with your explicit permission. We never write data to HealthKit. Raw HealthKit data stays on your device — only computed scores are synced to our servers. You can revoke HealthKit access at any time via iOS Settings.',
  },
  acceptableUse: {
    heading: '5. Acceptable Use',
    p1: 'You agree not to:',
    items: [
      'Reverse-engineer, decompile, or tamper with the app',
      'Use the app for any unlawful purpose',
      "Attempt to gain unauthorized access to our servers or other users' data",
      'Resell or redistribute the app or its content',
    ] as const,
  },
  intellectualProperty: {
    heading: '6. Intellectual Property',
    p1: 'The app, including its design, code, and content, is owned by Hanwen Ma. Your use of the app does not grant you any ownership rights.',
  },
  disclaimerSection: {
    heading: '7. Disclaimer',
    p1: 'Tuwa provides training load and recovery data for informational purposes only. It is not medical advice. Always consult a qualified healthcare professional before making decisions about your health or training. We are not liable for injuries, overtraining, or health issues arising from use of the app.',
    informationalStrong: 'informational purposes only',
  },
  limitationOfLiability: {
    heading: '8. Limitation of Liability',
    p1: 'To the maximum extent permitted by law, we are not liable for any indirect, incidental, or consequential damages arising from your use of the app. Our total liability is limited to the amount you paid for the app in the 12 months preceding the claim.',
  },
  termination: {
    heading: '9. Termination',
    p1: 'We may suspend or terminate your account if you violate these Terms. You may delete your account at any time from Profile → Delete account in the app, or by contacting us.',
  },
  changes: {
    heading: '10. Changes to These Terms',
    p1: 'We may update these Terms from time to time. Changes will be posted to this page with an updated date. Continued use of the app after changes constitutes acceptance.',
  },
  appStore: {
    heading: '11. Apple App Store terms',
    p1: 'Tuwa is distributed through the Apple App Store. The following terms apply to that distribution and, where they conflict with anything above, they govern:',
    items: [
      'This agreement is between you and Hanwen Ma only, not with Apple. Apple is not responsible for the app or its content.',
      'You are granted a non-transferable licence to use the app on any Apple-branded products that you own or control, as permitted by the App Store Usage Rules, except that the app may be accessed by other accounts associated with you via Family Sharing or volume purchasing.',
      'Hanwen Ma is solely responsible for maintenance and support. Apple has no obligation to furnish any maintenance or support services.',
      'Hanwen Ma is solely responsible for any product warranties, whether express or implied. If the app fails to conform to an applicable warranty, you may notify Apple, and Apple will refund the purchase price of the app to you. To the maximum extent permitted by law, Apple has no other warranty obligation whatsoever with respect to the app.',
      'Hanwen Ma, not Apple, is responsible for addressing any claim relating to the app, including product liability claims, any claim that the app fails to conform to a legal or regulatory requirement, and claims arising under consumer protection, privacy, or similar legislation.',
      'In the event of a third-party claim that the app or your use of it infringes that third party’s intellectual property rights, Hanwen Ma is solely responsible for the investigation, defence, settlement, and discharge of that claim.',
      'You represent that you are not located in a country subject to a U.S. Government embargo or designated by the U.S. Government as a "terrorist supporting" country, and that you are not listed on any U.S. Government list of prohibited or restricted parties.',
      'Apple and Apple’s subsidiaries are third-party beneficiaries of this agreement and, upon your acceptance of these Terms, have the right to enforce this agreement against you as a third-party beneficiary.',
    ] as const,
  },
  contact: {
    heading: '12. Contact',
    intro: 'For questions about these Terms:',
    emailLabel: 'Email',
    email: 'support@tuwa.app',
  },
} as const;

export default terms;
export type Terms = WidenStrings<typeof terms>;
