import type { Locale } from './utils';

/**
 * BCP-47 locale tags keyed by app Locale (D-07).
 * Source of truth for all locale-formatted date/number output.
 */
export const LOCALE_TAG: Record<Locale, string> = {
  en: 'en-US',
  zh: 'zh-CN',
  fr: 'fr-FR',
};

/**
 * Format a Date for the given app locale (D-03).
 * Default options reproduce the long-style visual contract (D-06):
 *   May 25, 2026 / 2026年5月25日 / 25 mai 2026
 * Pass `options` to override.
 */
export function formatDate(
  date: Date,
  locale: Locale | undefined,
  options?: Intl.DateTimeFormatOptions,
): string {
  const tag = LOCALE_TAG[locale ?? 'en'] ?? LOCALE_TAG['en'];
  return date.toLocaleDateString(
    tag,
    options ?? { year: 'numeric', month: 'long', day: 'numeric' },
  );
}

/**
 * Format a number for the given app locale (D-04).
 * No default options — Intl defaults are correct for integer counters.
 */
export function formatNumber(
  value: number,
  locale: Locale | undefined,
  options?: Intl.NumberFormatOptions,
): string {
  const tag = LOCALE_TAG[locale ?? 'en'] ?? LOCALE_TAG['en'];
  return value.toLocaleString(tag, options);
}
