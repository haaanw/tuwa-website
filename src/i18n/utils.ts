import enCommon from './locales/en/common';
import zhCommon from './locales/zh/common';
import frCommon from './locales/fr/common';
import type { Common } from './locales/en/common';

export type Locale = 'en' | 'zh' | 'fr';
export type CommonTranslations = Common;

const translations: Record<Locale, Common> = {
  en: enCommon,
  zh: zhCommon,
  fr: frCommon,
};

export function useTranslations(locale: Locale | undefined): Common {
  return translations[locale ?? 'en'] ?? translations['en'];
}
