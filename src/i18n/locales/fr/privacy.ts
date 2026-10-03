import type { Privacy } from '../en/privacy';

const privacy: Privacy = {
  meta: {
    title: 'Politique de confidentialité',
    lastUpdated: '3 octobre 2026',
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
        'Fréquence cardiaque pendant les séances importées',
        'Sommeil (durée et phases)',
        'Température corporelle et température du poignet pendant le sommeil',
        'Fréquence respiratoire (nocturne)',
        'VO2 Max',
        'Énergie active',
        'Poids',
        'Séances d\'entraînement et la note d\'effort que tu leur as donnée',
        'Uniquement si tu actives les mesures adaptées au cycle : données du cycle menstruel (flux, facteurs du cycle comme la contraception, la grossesse ou l\'allaitement, irrégularités du cycle) et symptômes du cycle',
      ],
    },
    healthKitNote: 'Tuwa n\'écrit jamais de données dans HealthKit. L\'accès à HealthKit est facultatif et nécessite ton autorisation explicite.',
    healthKitNoteStrong: 'n\'écrit jamais',
    // Ajouté le 2026-10-03 pour l'app v1.7.5 : mesures adaptées au cycle
    // (activation volontaire). Les données de cycle et la température du
    // poignet pendant le sommeil ne servent que sur le téléphone.
    cycleAware: {
      label: 'Mesures adaptées au cycle (facultatif).',
      text: "Si tu actives les mesures adaptées au cycle dans Profil, Tuwa demande à Apple Santé tes données de cycle et la température de ton poignet pendant le sommeil. Tuwa les utilise uniquement sur ton téléphone, pour lire ta HRV et ta fréquence cardiaque au repos par rapport à ta propre référence pour la même phase de ton cycle. Les données de cycle ne quittent jamais ton téléphone : elles ne sont ni synchronisées, ni envoyées à un service d'IA, ni partagées avec qui que ce soit. Désactiver la fonction arrête cette lecture ; tu peux aussi retirer l'accès dans Réglages iOS › Santé.",
    },
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
  // Ajouté le 2026-10-03 pour l'app v1.7.5 : raisonnement IA facultatif (Pro).
  // OpenAI est appelé DIRECTEMENT par le serveur de Tuwa (pas via OpenRouter).
  // Conservation jusqu'à 30 jours pour surveiller les abus (décision de HAN du
  // 2026-10-03 : pas de conservation nulle). Distinct de la permission
  // « Traitement IA » ci-dessus.
  aiReasoning: {
    heading: 'Raisonnement IA (facultatif, Pro)',
    p1: "Si tu es abonné à Tuwa Pro et que tu actives le raisonnement IA, Tuwa demande à un modèle d'IA quel ajustement convient à la séance du jour. Le serveur de Tuwa envoie la demande directement à OpenAI, qui la traite pour notre compte.",
    items: [
      {
        label: 'Ce qui est envoyé',
        description: "Ton programme d'entraînement, les séries que tu as enregistrées et tes mesures exprimées en mots — par exemple « forme élevée », « charge accrue », « match dans 2 jours ».",
      },
      {
        label: "Ce qui n'est jamais envoyé",
        description: "Aucune valeur issue d'Apple Santé (ni fréquence cardiaque, ni HRV, ni durée de sommeil, ni température, ni données du cycle menstruel), ni ton nom, ni ton adresse e-mail, ni ton identifiant de compte. OpenAI ne reçoit qu'un identifiant haché à sens unique, afin de détecter les abus.",
      },
      {
        label: 'Pourquoi',
        description: "Pour suggérer l'ajustement qui convient aujourd'hui, dans les limites fixées par le moteur de Tuwa. Tuwa vérifie chaque réponse par rapport à ces limites, et tu décides de chaque ajustement. Si le service ne répond pas, Tuwa affiche sa propre suggestion.",
      },
      {
        label: 'Conservation',
        description: "OpenAI peut conserver les demandes jusqu'à 30 jours pour surveiller les abus, puis les supprime. OpenAI ne les utilise pas pour entraîner ses modèles. Nous n'utilisons pas ces données à des fins publicitaires.",
      },
      {
        label: 'Ton choix',
        description: "Le raisonnement IA reste désactivé tant que tu ne l'autorises pas. Cette permission est distincte de la permission Traitement IA utilisée pour le texte de séance et l'importation de programme. Tu peux retirer ton accord à tout moment dans Profil › Mentions légales › Raisonnement IA. Après ce retrait, Tuwa cesse tout envoi et supprime ses données de raisonnement IA sur ton téléphone.",
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
        description: "(modèle de langue par défaut derrière OpenRouter pour le texte de séance et de programme, et appelé directement par le serveur de Tuwa pour le raisonnement IA facultatif — texte uniquement)",
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
