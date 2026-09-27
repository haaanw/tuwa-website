import type { Privacy } from '../en/privacy';

const privacy: Privacy = {
  meta: {
    title: 'Politique de confidentialité',
    lastUpdated: '27 septembre 2026',
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
          description: 'La phrase que tu tapes lorsque tu notes une séance en mots (voir « Analyse du texte de séance » ci-dessous)',
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
  // Mis à jour le 2026-09-24 pour l'app v1.7.4 : LA SAISIE VOCALE DE LA SÉANCE A
  // ÉTÉ RETIRÉE (décision de HAN). Seule une description de séance tapée
  // emprunte encore ce chemin ; la règle HealthKit ci-dessus est inchangée et
  // redite ici pour que les deux ne se confondent pas.
  // Mis à jour le 2026-09-27 : le service d'analyse passe désormais par
  // OpenRouter (une passerelle IA) vers un modèle OpenAI par défaut ;
  // DeepSeek n'est plus utilisé dans ce pipeline. Le texte de permission
  // reprend l'écran de consentement « Traitement IA » ponctuel de l'app et
  // son chemin de retrait Profil › Mentions légales › Traitement IA
  // (décision de HAN ; condition de sortie pour le passage à OpenRouter).
  voiceParsing: {
    heading: 'Analyse du texte de séance',
    p1: "Quand tu notes une séance en tapant une description, ce texte est envoyé à notre service d'analyse pour être transformé en un brouillon de séries, répétitions et charges que tu vérifies.",
    p2: "Le texte passe par OpenRouter, une passerelle IA qui l'achemine vers un modèle de langue — par défaut, un modèle OpenAI. Les requêtes passent par notre serveur, exigent un compte connecté et sont plafonnées par un quota quotidien par utilisateur. Nous demandons à OpenRouter de n'acheminer les requêtes qu'à des fournisseurs qui ne conservent pas le contenu envoyé pour entraîner leurs modèles.",
    items: [
      {
        label: 'Ce qui est envoyé',
        description: "Uniquement la description de séance que tu as tapée, et les unités dans lesquelles tu t'entraînes.",
      },
      {
        label: "Ce qui n'est jamais envoyé",
        description: "Aucune donnée HealthKit, aucun score de récupération ou de forme, aucune adresse e-mail — seulement le texte que tu as tapé.",
      },
      {
        label: "C'est facultatif",
        description: "La première fois que tu utilises cette fonction ou l'importation de programme ci-dessous, Tuwa te demande ta permission avant d'envoyer quoi que ce soit. Tu peux la retirer à tout moment dans Profil › Mentions légales › Traitement IA — sans elle, rien n'est envoyé, et tu peux toujours noter tes séances à la main.",
      },
    ],
    p3: "Le résultat revient sur ton téléphone sous forme de brouillon. Rien n'est enregistré dans ton journal tant que tu n'as pas confirmé.",
    healthKitReminder: "C'est distinct de la règle HealthKit ci-dessus, qui est inchangée : les données HealthKit brutes ne sont jamais téléchargées, ni vers ce service ni vers aucun autre.",
    healthKitReminderStrong: 'les données HealthKit brutes ne sont jamais téléchargées',
  },
  // Ajouté le 2026-09-24 pour l'app v1.7.4. L'importation d'un programme est
  // une fonction SÉPARÉE de la saisie de séance ci-dessus. Depuis la v1.7.4,
  // l'app n'utilise plus du tout le micro ni la reconnaissance vocale : un
  // programme s'importe en collant du texte ou en important un PDF/une photo,
  // dont le texte est extrait sur l'appareil.
  programImport: {
    heading: 'Importation de programme',
    p1: "Tu peux importer un programme d'entraînement dans Tuwa en collant du texte, ou en important un PDF ou une photo — le texte en est extrait sur ton téléphone.",
    items: [
      {
        label: 'Ce qui est envoyé',
        description: "Le texte du programme que tu colles, ou le texte extrait de ton PDF ou de ta photo sur ton téléphone — du texte uniquement. Aucun audio, aucune donnée HealthKit, aucun score n'est envoyé.",
      },
      {
        label: 'Qui le traite',
        description: "Le texte est envoyé via OpenRouter, une passerelle IA, qui l'achemine vers un modèle de langue — par défaut, un modèle OpenAI — pour en faire un programme structuré.",
      },
      {
        label: 'Ce que tu reçois',
        description: "Un brouillon de programme revient sur ton téléphone pour que tu le vérifies. Rien n'est enregistré tant que tu n'as pas confirmé.",
      },
    ],
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
        label: 'OpenRouter',
        description: '(passerelle IA qui achemine le texte de séance et de programme vers un modèle de langue — texte uniquement)',
        url: 'https://openrouter.ai/privacy',
        urlDisplay: 'openrouter.ai/privacy',
      },
      {
        label: 'OpenAI',
        description: '(modèle de langue par défaut derrière OpenRouter — texte uniquement)',
        url: 'https://openai.com/policies/privacy-policy/',
        urlDisplay: 'politique de confidentialité openai.com',
      },
    ],
    outro: 'Nous n\'utilisons aucun réseau publicitaire, aucun tracker analytique, ni aucun courtier de données tiers.',
  },
  dataRetention: {
    heading: 'Conservation et suppression des données',
    intro: 'Tes données sont conservées tant que ton compte existe. Pour supprimer ton compte et toutes tes données :',
    steps: [
      'Va dans Profil → Supprimer le compte dans l\'application',
    ],
    outro: 'Cela supprime ton compte et ses données — journaux d\'entraînement et scores inclus — de notre base de données. Pour toute autre demande liée à la confidentialité, contacte-nous à l\'adresse e-mail ci-dessous.',
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
