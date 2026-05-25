import enCommon from './locales/en/common';
import zhCommon from './locales/zh/common';
import frCommon from './locales/fr/common';
import enHome from './locales/en/home';
import zhHome from './locales/zh/home';
import frHome from './locales/fr/home';
import type { Common } from './locales/en/common';
import type { Home } from './locales/en/home';

export type Locale = 'en' | 'zh' | 'fr';
export type CommonTranslations = Common;
export type HomeTranslations = Home;

const translations: Record<Locale, Common> = {
  en: enCommon,
  zh: zhCommon,
  fr: frCommon,
};

const homeTranslations: Record<Locale, Home> = {
  en: enHome,
  zh: zhHome,
  fr: frHome,
};

export function useTranslations(locale: Locale | undefined): Common {
  return translations[locale ?? 'en'] ?? translations['en'];
}

export function useHomeTranslations(locale: Locale | undefined): Home {
  return homeTranslations[locale ?? 'en'] ?? homeTranslations['en'];
}
