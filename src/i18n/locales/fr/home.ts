import type { Home } from '../en/home';

const home: Home = {
  hero: {
    headline: 'L\'entraînement de force adaptatif pour les athlètes autonomes.',
    subtitle: 'Planifie et journalise tes séances de force, ajuste le volume selon ta récupération et ta charge, puis relis tes progrès sans jongler entre carnet, tableur et app de récupération.',
    loopSteps: ['Planifier', 'Noter', 'Adapter', 'Relire'],
    loopAriaLabel: 'Boucle d\'entraînement Tuwa',
    deviceAlt: 'Écran Aujourd\'hui de Tuwa affichant un score de forme, les conseils du jour, les signaux de récupération et la charge d\'entraînement.',
    badgeAlt: 'Télécharger sur l\'App Store',
    badgeAriaLabel: 'Télécharger Tuwa sur l\'App Store',
  },
  stats: {
    heading: 'Pourquoi les athlètes autonomes font confiance à Tuwa',
    science: {
      title: 'Récupération et charge ensemble',
      desc: 'Tuwa combine VFC, fréquence cardiaque au repos, sommeil, ressenti et charge récente pour donner du contexte à chaque ajustement.',
    },
    privacy: {
      title: 'Confidentiel par conception',
      desc: 'Tes données HealthKit brutes restent sur ton appareil. Seuls des scores composites se synchronisent pour la sauvegarde du compte et l\'accès multi-appareils.',
    },
    dayOne: {
      title: 'Utile dès la première séance',
      desc: 'Commence avec le plan et le journal que tu as déjà. Tuwa devient plus précis à mesure que tes références et ton historique se construisent.',
    },
  },
  cta: {
    headline: 'Coach-toi avec plus de confiance.',
    body: 'Construis le plan, note le travail, ajuste la journée et relis la semaine depuis un seul système d\'entraînement calme.',
  },
  featureGrid: {
    heading: 'Une boucle pour planifier, noter, adapter et relire',
    features: [
      {
        title: 'Planification des séances',
        desc: 'Crée des séances de force réutilisables ou importe un plan depuis du texte, un PDF ou une photo.',
        href: '/features/smart-templates',
      },
      {
        title: 'Journal de force',
        desc: 'Note séries, répétitions, charges, RPE et répétitions en réserve sans casser le rythme.',
        href: '/features/workload-tracking',
      },
      {
        title: 'Ajustements par récupération',
        desc: 'Décide s\'il faut pousser, maintenir, réduire le volume ou récupérer selon la forme et la charge.',
        href: '/features/recovery-scoring',
      },
      {
        title: 'Revue des progrès',
        desc: 'Vois charge, séances récentes, bilans hebdomadaires et progression de force au même endroit.',
        href: '/training-load',
      },
    ],
    segmentLabels: ['PLAN', 'NOTES', 'ADAPT', 'REVUE'],
    exploreCta: 'Explorer',
  },
};

export default home;
