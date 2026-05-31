// Structured-data (JSON-LD) builders. Emitted via SEO.astro's structuredData prop.
// Gives AI search engines and rich results an entity anchor for "Tuwa".
import { APP_STORE_URL } from '../config';

const SITE = 'https://tuwa.app';

export function softwareApplicationSchema(description: string): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Tuwa',
    applicationCategory: 'HealthApplication',
    operatingSystem: 'iOS',
    description,
    url: SITE,
    downloadUrl: APP_STORE_URL,
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Tuwa',
    },
  };
}

export function organizationSchema(): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Tuwa',
    url: SITE,
    logo: `${SITE}/icon-512.png`,
  };
}

/** FAQPage schema from a list of question/answer pairs (citation-grade GEO signal). */
export function faqPageSchema(faqs: ReadonlyArray<{ q: string; a: string }>): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: a,
      },
    })),
  };
}
