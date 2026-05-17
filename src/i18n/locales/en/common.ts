const common = {
  nav: {
    features: 'Features',
    support: 'Support',
    blog: 'Blog',
    getApp: 'Get the App',
  },
  footer: {
    features: 'Features',
    resources: 'Resources',
    legal: 'Legal',
    privacy: 'Privacy Policy',
    terms: 'Terms of Service',
    copyright: '© {year} Tuwa. All rights reserved.',
  },
  meta: {
    title: 'Tuwa',
    description: 'Precision training load and recovery management for serious athletes and coaches.',
  },
} as const;

export default common;
export type Common = typeof common;
