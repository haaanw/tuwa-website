import enCommon from './locales/en/common';
import zhCommon from './locales/zh/common';
import frCommon from './locales/fr/common';
import enHome from './locales/en/home';
import zhHome from './locales/zh/home';
import frHome from './locales/fr/home';
import enRecoveryScoring from './locales/en/recovery-scoring';
import enWorkloadTracking from './locales/en/workload-tracking';
import enSmartTemplates from './locales/en/smart-templates';
import enColdStart from './locales/en/cold-start';
import enCoaching from './locales/en/coaching';
import zhRecoveryScoring from './locales/zh/recovery-scoring';
import frRecoveryScoring from './locales/fr/recovery-scoring';
// TODO: uncomment when zh/fr files exist (Plans 04-05)
// import zhWorkloadTracking from './locales/zh/workload-tracking';
// import frWorkloadTracking from './locales/fr/workload-tracking';
// import zhSmartTemplates from './locales/zh/smart-templates';
// import frSmartTemplates from './locales/fr/smart-templates';
// import zhColdStart from './locales/zh/cold-start';
// import frColdStart from './locales/fr/cold-start';
// import zhCoaching from './locales/zh/coaching';
// import frCoaching from './locales/fr/coaching';
import type { Common } from './locales/en/common';
import type { Home } from './locales/en/home';
import type { RecoveryScoring } from './locales/en/recovery-scoring';
import type { WorkloadTracking } from './locales/en/workload-tracking';
import type { SmartTemplates } from './locales/en/smart-templates';
import type { ColdStart } from './locales/en/cold-start';
import type { Coaching } from './locales/en/coaching';

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
  zh: enWorkloadTracking, // TODO: replace with zhWorkloadTracking (Plan 03)
  fr: enWorkloadTracking, // TODO: replace with frWorkloadTracking (Plan 04)
};

const smartTemplatesTranslations: Record<Locale, SmartTemplates> = {
  en: enSmartTemplates,
  zh: enSmartTemplates, // TODO: replace with zhSmartTemplates (Plan 03)
  fr: enSmartTemplates, // TODO: replace with frSmartTemplates (Plan 04)
};

const coldStartTranslations: Record<Locale, ColdStart> = {
  en: enColdStart,
  zh: enColdStart, // TODO: replace with zhColdStart (Plan 03)
  fr: enColdStart, // TODO: replace with frColdStart (Plan 04)
};

const coachingTranslations: Record<Locale, Coaching> = {
  en: enCoaching,
  zh: enCoaching, // TODO: replace with zhCoaching (Plan 03)
  fr: enCoaching, // TODO: replace with frCoaching (Plan 04)
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
