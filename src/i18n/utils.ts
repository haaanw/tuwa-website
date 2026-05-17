import enCommon from './locales/en/common';
import zhCommon from './locales/zh/common';
import frCommon from './locales/fr/common';

export type Locale = 'en' | 'zh' | 'fr';
export type CommonTranslations = typeof enCommon;

const translations: Record<Locale, CommonTranslations> = {
  en: enCommon,
  zh: zhCommon,
  fr: frCommon,
};

export function useTranslations(locale: Locale | undefined): CommonTranslations {
  return translations[locale ?? 'en'] ?? translations['en'];
}
