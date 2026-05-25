import type { Privacy } from '../en/privacy';

const privacy: Privacy = {
  meta: {
    title: 'Politique de confidentialité',
    lastUpdated: '27 mars 2026',
    description: 'Politique de confidentialité de Tuwa — application de gestion de la charge d\'entraînement et de la récupération.',
  },
  disclaimer: {
    text: 'Ceci est une traduction. La version anglaise est le document juridiquement contraignant.',
  },
  intro: {
    p1: 'Tuwa (« l\'application ») est développée par Hanwen Ma. Cette politique explique les données que l\'application collecte, comment elles sont utilisées, et tes droits.',
  },
  whatWeCollect: {
    heading: 'Données collectées',
    dataYouProvide: {
      heading: 'Données que tu fournis',
      items: [
        {
          label: 'Informations de compte',
          description: 'Adresse e-mail et nom d\'affichage (utilisés pour l\'authentification et le jumelage coach-athlète)',
        },
        {
          label: 'Journaux d\'entraînement',
          description: 'Exercices, séries, répétitions, charges, RPE, durée de séance et notes que tu saisis',
        },
        {
          label: 'Bilans de forme',
          description: 'Auto-évaluations de la qualité du sommeil, des courbatures, de l\'énergie et du stress',
        },
      ],
    },
    healthKitData: {
      heading: 'Données issues de HealthKit (lecture seule)',
      items: [
        'Variabilité de la fréquence cardiaque (HRV)',
        'Fréquence cardiaque au repos',
        'Durée du sommeil',
        'Température corporelle',
        'VO2 Max',
        'Fréquence cardiaque à l\'effort',
      ],
    },
    healthKitNote: 'Tuwa n\'écrit jamais de données dans HealthKit. L\'accès à HealthKit est facultatif et nécessite ton autorisation explicite.',
    healthKitNoteStrong: 'n\'écrit jamais',
    dataWeCompute: {
      heading: 'Données calculées',
      p1: 'Les scores de récupération, l\'ACWR (ratio charge aiguë/chronique), le stress d\'entraînement et les records personnels sont calculés sur ton appareil à partir des données ci-dessus.',
    },
  },
  howDataIsStored: {
    heading: 'Stockage des données',
    items: [
      {
        label: 'Sur ton appareil',
        description: 'Toutes les données sont stockées localement via SwiftData. L\'application fonctionne entièrement hors ligne.',
      },
      {
        label: 'Dans le cloud',
        description: 'Les scores composites (score de récupération, instantanés de charge, bilans de forme, en-têtes de séance et records personnels) se synchronisent sur Supabase (hébergé sur AWS) pour les fonctionnalités coach-athlète et l\'accès multi-appareils.',
      },
      {
        label: 'Les données HealthKit brutes ne sont jamais téléchargées.',
        description: 'Seuls les scores calculés à partir des données HealthKit sont synchronisés.',
      },
    ],
  },
  coachAthleteSharing: {
    heading: 'Partage de données coach-athlète',
    intro: 'Si tu te lies à un coach, il peut consulter :',
    items: [
      'Tes scores de récupération et tendances ACWR',
      'Les résumés de tes séances d\'entraînement',
      'Tes records personnels',
      'Tes évaluations de bilan de forme',
    ],
    outro: 'Les coachs ne peuvent pas accéder à tes données HealthKit brutes, et tu peux te délier d\'un coach à tout moment.',
  },
  thirdPartyServices: {
    heading: 'Services tiers',
    services: [
      {
        label: 'Supabase',
        description: '(authentification et synchronisation cloud)',
        url: 'https://supabase.com/privacy',
        urlDisplay: 'supabase.com/privacy',
      },
      {
        label: 'RevenueCat',
        description: '(gestion des abonnements)',
        url: 'https://www.revenuecat.com/privacy',
        urlDisplay: 'revenuecat.com/privacy',
      },
    ],
    outro: 'Nous n\'utilisons aucun réseau publicitaire, aucun tracker analytique, ni aucun courtier de données tiers.',
  },
  dataRetention: {
    heading: 'Conservation et suppression des données',
    intro: 'Tes données sont conservées tant que ton compte existe. Pour supprimer toutes tes données :',
    steps: [
      'Va dans Profil → Se déconnecter dans l\'application',
      'Contacte-nous à l\'adresse e-mail ci-dessous pour demander la suppression complète de ton compte et de tes données de nos serveurs',
    ],
    stepOneStrong: 'Profil → Se déconnecter',
    outro: 'Après suppression, toutes tes données — journaux d\'entraînement, scores et relations de coaching inclus — sont définitivement retirées de nos serveurs.',
  },
  yourRights: {
    heading: 'Tes droits',
    intro: 'Tu as le droit de :',
    items: [
      'Accéder aux données que nous stockons te concernant',
      'Demander la correction de données inexactes',
      'Demander la suppression de ton compte et de toutes les données associées',
      'Révoquer les autorisations HealthKit à tout moment via Réglages iOS → Confidentialité et sécurité → Santé',
    ],
  },
  children: {
    heading: 'Mineurs',
    p1: 'Tuwa ne s\'adresse pas aux enfants de moins de 13 ans. Nous ne collectons pas sciemment de données auprès des enfants.',
  },
  changes: {
    heading: 'Modifications de cette politique',
    p1: 'Nous pouvons mettre à jour cette politique de temps à autre. Les modifications seront publiées sur cette page avec une date de mise à jour.',
  },
  contact: {
    heading: 'Contact',
    intro: 'Pour toute question relative à la confidentialité ou demande de suppression de données :',
    emailLabel: 'E-mail',
    email: 'hanwenma09@gmail.com',
  },
};

export default privacy;
