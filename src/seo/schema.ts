// Structured-data (JSON-LD) builders. Emitted via SEO.astro's structuredData prop.
// Gives AI search engines and rich results an entity anchor for "Tuwa".
import { APP_STORE_URL } from '../config';

const SITE = 'https://tuwa.app';
const DEFAULT_IMAGE = `${SITE}/og-default.png`;

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

export function breadcrumbListSchema(items: ReadonlyArray<{ name: string; url: string }>): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function articleSchema(page: {
  title: string;
  description: string;
  url: string;
  dateModified: string;
  image?: string;
}): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: page.title,
    description: page.description,
    image: page.image ?? DEFAULT_IMAGE,
    datePublished: page.dateModified,
    dateModified: page.dateModified,
    mainEntityOfPage: page.url,
    author: {
      '@type': 'Organization',
      name: 'Tuwa',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Tuwa',
      logo: {
        '@type': 'ImageObject',
        url: `${SITE}/icon-512.png`,
      },
    },
  };
}

export function webApplicationSchema(page: {
  name: string;
  description: string;
  url: string;
}): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: page.name,
    applicationCategory: 'HealthApplication',
    operatingSystem: 'Web',
    description: page.description,
    url: page.url,
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

export function itemListSchema(name: string, items: ReadonlyArray<string>): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name,
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item,
    })),
  };
}
