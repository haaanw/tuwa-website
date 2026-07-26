import type { Support } from '../en/support';

const support: Support = {
  meta: {
    title: 'Support',
    description: 'Obtiens de l\'aide avec Tuwa — application de gestion de la charge d\'entraînement et de la récupération.',
  },
  hero: {
    kicker: 'support',
    promise: "Des réponses directes aux questions fréquentes — et une vraie personne au bout de l'e-mail.",
  },
  requirements: {
    label: 'configuration requise',
    value: 'iOS 17+ · iPhone',
  },
  faqHeading: 'Questions fréquentes',
  faq: [
    {
      q: 'Comment Tuwa calcule-t-il mon score de récupération ?',
      a: 'Tuwa synthétise la VFC, la fréquence cardiaque au repos, la durée du sommeil et ton bilan de forme matinal en un signal de forme quotidien. Chaque facteur est pondéré selon sa fiabilité et ta référence personnelle, avec des explications en langage clair qui soutiennent le verdict go, modify ou hold de l\'app.',
    },
    {
      q: 'Tuwa fonctionne-t-il sans Apple Watch ?',
      a: 'Oui. Bien que Tuwa lise les données de VFC, fréquence cardiaque et sommeil depuis HealthKit (fournis par Apple Watch, Whoop, Oura et Garmin), tu peux quand même enregistrer tes entraînements, suivre ta charge et utiliser les bilans de forme sans aucun appareil connecté. La précision du score de récupération s\'améliore avec les données HealthKit, mais ce n\'est pas obligatoire.',
    },
    {
      q: 'Comment mes données de santé sont-elles stockées et protégées ?',
      a: 'Toutes les données sont stockées localement sur ton appareil via SwiftData. L\'application fonctionne entièrement hors ligne. Lorsque tu utilises les fonctionnalités cloud (accès multi-appareils), seuls les scores composites se synchronisent sur nos serveurs — les données HealthKit brutes ne quittent jamais ton appareil.',
    },
    {
      q: 'Comment gérer mon abonnement ?',
      a: 'Les abonnements sont gérés via Apple. Va dans Réglages > Identifiant Apple > Abonnements sur ton appareil pour consulter, modifier ou annuler ton abonnement Tuwa. L\'annulation prend effet à la fin de ta période de facturation en cours.',
    },
    {
      q: 'Qu\'est-ce que l\'ACWR et pourquoi est-ce important ?',
      a: 'L\'ACWR est le ratio de charge aiguë sur chronique (Acute:Chronic Workload Ratio). Il compare ta charge d\'entraînement récente à une moyenne de plus long terme. Tuwa le traite comme du contexte de charge, pas comme une prédiction de blessure : la charge récente et les signaux de pic sont affichés avant l\'entraînement, pour que tu puisses revoir le volume, l\'intensité ou le timing avec les dernières données enregistrées en tête.',
    },
    {
      q: 'Combien de temps avant que Tuwa ait assez de données pour donner des scores fiables ?',
      a: 'Tuwa commence par mettre en place ton profil d\'entraînement, puis construit à partir de tes bilans de forme, de tes séances enregistrées et des données HealthKit que tu autorises. Avec peu d\'historique de récupération, l\'app reste prudente au lieu de s\'appuyer sur des références de population. À mesure que les données réelles s\'accumulent, les scores deviennent de plus en plus personnels.',
    },
    {
      q: 'Comment contacter le support ou signaler un bug ?',
      a: 'Envoie-nous un e-mail à hanwenma09@gmail.com. Nous répondons généralement sous 48 heures. Inclus le modèle de ton appareil et la version iOS quand tu signales un bug pour nous aider à investiguer plus rapidement.',
    },
  ],
  contact: {
    emailLabel: 'e-mail',
    heading: 'Nous contacter',
    subtext: 'Tu ne trouves pas ce que tu cherches ? Nous sommes là pour t\'aider.',
    buttonLabel: 'Contacter le support',
    responseTime: 'Nous répondons généralement sous 48 heures.',
  },
};

export default support;
