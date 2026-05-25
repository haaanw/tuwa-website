import type { Support } from '../en/support';

const support: Support = {
  meta: {
    title: 'Support',
    description: 'Obtiens de l\'aide avec Tuwa — application de gestion de la charge d\'entraînement et de la récupération.',
  },
  faqHeading: 'Questions fréquentes',
  faq: [
    {
      q: 'Comment Tuwa calcule-t-il mon score de récupération ?',
      a: 'Tuwa synthétise des données de plusieurs sources — HRV, fréquence cardiaque au repos, durée du sommeil, température corporelle et ton bilan de forme matinal — en un score de préparation quotidien. Chaque facteur est pondéré selon sa fiabilité et ta base personnelle, avec des explications en langage clair sur ce qui a influencé le score.',
    },
    {
      q: 'Tuwa fonctionne-t-il sans Apple Watch ?',
      a: 'Oui. Bien que Tuwa lise les données HRV, fréquence cardiaque et sommeil depuis HealthKit (fournis par Apple Watch, Whoop, Oura et Garmin), tu peux quand même enregistrer tes entraînements, suivre ta charge et utiliser les bilans de forme sans aucun appareil connecté. La précision du score de récupération s\'améliore avec les données HealthKit, mais ce n\'est pas obligatoire.',
    },
    {
      q: 'Comment mes données de santé sont-elles stockées et protégées ?',
      a: 'Toutes les données sont stockées localement sur ton appareil via SwiftData. L\'application fonctionne entièrement hors ligne. Lorsque tu utilises les fonctionnalités cloud (synchronisation coach-athlète, accès multi-appareils), seuls les scores composites se synchronisent sur nos serveurs — les données HealthKit brutes ne quittent jamais ton appareil.',
    },
    {
      q: 'Comment gérer mon abonnement ?',
      a: 'Les abonnements sont gérés via Apple. Va dans Réglages > Identifiant Apple > Abonnements sur ton appareil pour consulter, modifier ou annuler ton abonnement Tuwa. L\'annulation prend effet à la fin de ta période de facturation en cours.',
    },
    {
      q: 'Comment fonctionne l\'invitation d\'un coach ?',
      a: 'Va dans Profil et appuie sur « Inviter mon coach ». Tu peux partager un code d\'invitation à 6 caractères, envoyer une invitation par e-mail, ou utiliser le NFC pour te connecter instantanément avec ton coach. Une fois liés, ton coach peut consulter tes scores de récupération, tendances de charge et historique de séances.',
    },
    {
      q: 'Qu\'est-ce que l\'ACWR et pourquoi est-ce important ?',
      a: 'L\'ACWR est le ratio charge aiguë/chronique (Acute:Chronic Workload Ratio). Il compare ta charge d\'entraînement récente (7 derniers jours) à ta moyenne à long terme (28 derniers jours). Quand ce ratio dépasse les seuils sûrs, le risque de blessure augmente. Tuwa le surveille en continu et t\'alerte quand une séance te ferait entrer dans une zone dangereuse.',
    },
    {
      q: 'Combien de temps avant que Tuwa ait assez de données pour donner des scores fiables ?',
      a: 'Tuwa commence à fournir des conseils utiles dès le premier jour en utilisant les bases de la population et tes bilans de forme. Au fur et à mesure que tu enregistres des séances et synchronises les données HealthKit, les scores deviennent de plus en plus personnalisés. Après environ 7 jours, ton score de récupération reflète tes patterns individuels plutôt que les moyennes de la population.',
    },
    {
      q: 'Comment contacter le support ou signaler un bug ?',
      a: 'Envoie-nous un e-mail à hanwenma09@gmail.com. Nous répondons généralement sous 48 heures. Inclus le modèle de ton appareil et la version iOS quand tu signales un bug pour nous aider à investiguer plus rapidement.',
    },
  ],
  contact: {
    heading: 'Nous contacter',
    subtext: 'Tu ne trouves pas ce que tu cherches ? Nous sommes là pour t\'aider.',
    buttonLabel: 'Contacter le support',
    responseTime: 'Nous répondons généralement sous 48 heures.',
  },
};

export default support;
