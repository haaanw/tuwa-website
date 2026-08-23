import type { Privacy } from '../en/privacy';

const privacy: Privacy = {
  meta: {
    title: 'Politique de confidentialité',
    lastUpdated: '24 août 2026',
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
          description: 'Adresse e-mail et nom d\'affichage (utilisés pour l\'authentification)',
        },
        {
          label: 'Journaux d\'entraînement',
          description: 'Exercices, séries, répétitions, charges, RPE, durée de séance et notes que tu saisis',
        },
        {
          label: 'Bilans de forme',
          description: 'Auto-évaluations de la qualité du sommeil, des courbatures, de l\'énergie et du stress',
        },
        {
          label: 'Descriptions de séance',
          description: 'La phrase que tu dis, tapes ou dictes lorsque tu notes une séance en mots (voir « Analyse du texte de séance » ci-dessous)',
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
        description: 'Les scores composites (score de récupération, instantanés de charge, bilans de forme, en-têtes de séance et records personnels) se synchronisent sur Supabase (hébergé sur AWS) pour l\'accès multi-appareils.',
      },
      {
        label: 'Les données HealthKit brutes ne sont jamais téléchargées.',
        description: 'Seuls les scores calculés à partir des données HealthKit sont synchronisés.',
      },
    ],
  },
  // Ajouté pour l'app v1.7.2 (saisie vocale et texte). Seule la description de
  // séance soumise par l'athlète emprunte ce chemin ; la règle HealthKit
  // ci-dessus est inchangée et redite ici pour que les deux ne se confondent pas.
  voiceParsing: {
    heading: 'Analyse du texte de séance',
    p1: "Quand tu notes une séance en la décrivant — dictée dans l'application, tapée, ou dictée avec le micro du clavier — la parole est convertie en texte sur ton téléphone, puis ce texte est envoyé à notre service d'analyse pour être transformé en un brouillon de séries, répétitions et charges que tu vérifies.",
    p2: "Le texte est traité pour notre compte par un fournisseur tiers de modèle de langue (DeepSeek). Les requêtes exigent un compte connecté et sont plafonnées par un quota quotidien par utilisateur.",
    items: [
      {
        label: 'Ce qui est envoyé',
        description: "Uniquement la description de séance que tu as soumise, et les unités dans lesquelles tu t'entraînes.",
      },
      {
        label: "Ce qui n'est jamais envoyé",
        description: "Aucune donnée HealthKit, aucun score de récupération ou de forme, aucune adresse e-mail, aucun enregistrement audio — du texte, et rien d'autre.",
      },
      {
        label: "C'est facultatif",
        description: "La saisie manuelle fait le même travail. Si tu ne décris jamais une séance en mots, rien n'est jamais envoyé au service d'analyse.",
      },
    ],
    p3: "Le résultat revient sur ton téléphone sous forme de brouillon. Rien n'est enregistré dans ton journal tant que tu n'as pas confirmé.",
    healthKitReminder: "C'est distinct de la règle HealthKit ci-dessus, qui est inchangée : les données HealthKit brutes ne sont jamais téléchargées, ni vers ce service ni vers aucun autre.",
    healthKitReminderStrong: 'les données HealthKit brutes ne sont jamais téléchargées',
  },
  dataSharing: {
    heading: 'Partage des données',
    p1: "Tuwa ne partage pas tes données d'entraînement ou de récupération avec des coachs, d'autres utilisateurs, des annonceurs ou des courtiers en données. Si des fonctionnalités de partage sont ajoutées à l'avenir, elles nécessiteront ton consentement explicite.",
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
      {
        label: 'DeepSeek',
        description: '(modèle de langue qui transforme les descriptions de séance en séries — texte uniquement)',
        url: 'https://cdn.deepseek.com/policies/en-US/deepseek-privacy-policy.html',
        urlDisplay: 'politique de confidentialité deepseek.com',
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
    outro: 'Après suppression, toutes tes données — journaux d\'entraînement et scores inclus — sont définitivement retirées de nos serveurs.',
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
    email: 'support@tuwa.app',
  },
};

export default privacy;
