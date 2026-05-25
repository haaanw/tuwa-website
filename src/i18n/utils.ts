import enCommon from './locales/en/common';
import zhCommon from './locales/zh/common';
import frCommon from './locales/fr/common';
import enHome from './locales/en/home';
import zhHome from './locales/zh/home';
import frHome from './locales/fr/home';
import enRecoveryScoring from './locales/en/recovery-scoring';
import enWorkloadTracking from './locales/en/workload-tracking';
import enSmartTemplates from './locales/en/smart-templates';
import zhSmartTemplates from './locales/zh/smart-templates';
import frSmartTemplates from './locales/fr/smart-templates';
import enColdStart from './locales/en/cold-start';
import zhColdStart from './locales/zh/cold-start';
import frColdStart from './locales/fr/cold-start';
import enCoaching from './locales/en/coaching';
import enPrivacy from './locales/en/privacy';
import zhPrivacy from './locales/zh/privacy';
import frPrivacy from './locales/fr/privacy';
import enTerms from './locales/en/terms';
import zhTerms from './locales/zh/terms';
import frTerms from './locales/fr/terms';
import enSupport from './locales/en/support';
import zhSupport from './locales/zh/support';
import frSupport from './locales/fr/support';
import enBlog from './locales/en/blog';
import zhBlog from './locales/zh/blog';
import frBlog from './locales/fr/blog';
import en404 from './locales/en/404';
import zh404 from './locales/zh/404';
import fr404 from './locales/fr/404';
import zhRecoveryScoring from './locales/zh/recovery-scoring';
import frRecoveryScoring from './locales/fr/recovery-scoring';
import zhWorkloadTracking from './locales/zh/workload-tracking';
import frWorkloadTracking from './locales/fr/workload-tracking';
import zhCoaching from './locales/zh/coaching';
import frCoaching from './locales/fr/coaching';
import type { Common } from './locales/en/common';
import type { Home } from './locales/en/home';
import type { RecoveryScoring } from './locales/en/recovery-scoring';
import type { WorkloadTracking } from './locales/en/workload-tracking';
import type { SmartTemplates } from './locales/en/smart-templates';
import type { ColdStart } from './locales/en/cold-start';
import type { Coaching } from './locales/en/coaching';
import type { Privacy } from './locales/en/privacy';
import type { Terms } from './locales/en/terms';
import type { Support } from './locales/en/support';
import type { Blog } from './locales/en/blog';
import type { NotFound } from './locales/en/404';

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

const recoveryScoringTranslations: Record<Locale, RecoveryScoring> = {
  en: enRecoveryScoring,
  zh: zhRecoveryScoring,
  fr: frRecoveryScoring,
};

const workloadTrackingTranslations: Record<Locale, WorkloadTracking> = {
  en: enWorkloadTracking,
  zh: zhWorkloadTracking,
  fr: frWorkloadTracking,
};

const smartTemplatesTranslations: Record<Locale, SmartTemplates> = {
  en: enSmartTemplates,
  zh: zhSmartTemplates,
  fr: frSmartTemplates,
};

const coldStartTranslations: Record<Locale, ColdStart> = {
  en: enColdStart,
  zh: zhColdStart,
  fr: frColdStart,
};

const coachingTranslations: Record<Locale, Coaching> = {
  en: enCoaching,
  zh: zhCoaching,
  fr: frCoaching,
};

const privacyTranslations: Record<Locale, Privacy> = {
  en: enPrivacy,
  zh: zhPrivacy,
  fr: frPrivacy,
};

const termsTranslations: Record<Locale, Terms> = {
  en: enTerms,
  zh: zhTerms,
  fr: frTerms,
};

const supportTranslations: Record<Locale, Support> = {
  en: enSupport,
  zh: zhSupport,
  fr: frSupport,
};

const blogTranslations: Record<Locale, Blog> = {
  en: enBlog,
  zh: zhBlog,
  fr: frBlog,
};

const notFoundTranslations: Record<Locale, NotFound> = {
  en: en404,
  zh: zh404,
  fr: fr404,
};

export function useTranslations(locale: Locale | undefined): Common {
  return translations[locale ?? 'en'] ?? translations['en'];
}

export function useHomeTranslations(locale: Locale | undefined): Home {
  return homeTranslations[locale ?? 'en'] ?? homeTranslations['en'];
}

export function useRecoveryScoringTranslations(locale: Locale | undefined): RecoveryScoring {
  return recoveryScoringTranslations[locale ?? 'en'] ?? recoveryScoringTranslations['en'];
}

export function useWorkloadTrackingTranslations(locale: Locale | undefined): WorkloadTracking {
  return workloadTrackingTranslations[locale ?? 'en'] ?? workloadTrackingTranslations['en'];
}

export function useSmartTemplatesTranslations(locale: Locale | undefined): SmartTemplates {
  return smartTemplatesTranslations[locale ?? 'en'] ?? smartTemplatesTranslations['en'];
}

export function useColdStartTranslations(locale: Locale | undefined): ColdStart {
  return coldStartTranslations[locale ?? 'en'] ?? coldStartTranslations['en'];
}

export function useCoachingTranslations(locale: Locale | undefined): Coaching {
  return coachingTranslations[locale ?? 'en'] ?? coachingTranslations['en'];
}

export function usePrivacyTranslations(locale: Locale | undefined): Privacy {
  return privacyTranslations[locale ?? 'en'] ?? privacyTranslations['en'];
}

export function useTermsTranslations(locale: Locale | undefined): Terms {
  return termsTranslations[locale ?? 'en'] ?? termsTranslations['en'];
}

export function useSupportTranslations(locale: Locale | undefined): Support {
  return supportTranslations[locale ?? 'en'] ?? supportTranslations['en'];
}

export function useBlogTranslations(locale: Locale | undefined): Blog {
  return blogTranslations[locale ?? 'en'] ?? blogTranslations['en'];
}

export function use404Translations(locale: Locale | undefined): NotFound {
  return notFoundTranslations[locale ?? 'en'] ?? notFoundTranslations['en'];
}
