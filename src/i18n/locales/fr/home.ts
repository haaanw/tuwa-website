import type { Home } from '../en/home';

const home: Home = {
  hero: {
    headline: 'Entraîne-toi plus intelligemment. Récupère avec précision.',
    subtitle: 'Tuwa combine VFC, sommeil, charge d\'entraînement et six dimensions de fatigue en un seul score de forme — pour savoir exactement à quelle intensité pousser aujourd\'hui.',
    deviceAlt: 'Application Tuwa affichant un score de récupération de 82 — VFC en zone verte, 7,5 heures de sommeil.',
    badgeAlt: 'Télécharger sur l\'App Store',
    badgeAriaLabel: 'Télécharger Tuwa sur l\'App Store',
  },
  stats: {
    athletes: 'Athlètes utilisent Tuwa',
    sessions: 'Séances analysées',
    accuracy: 'Précision de prédiction VFC',
  },
  cta: {
    headline: 'Conçu pour les athlètes qui prennent l\'entraînement au sérieux.',
    body: 'Gestion de la charge basée sur les preuves. Pas de métriques de vanité. Pas de bruit.',
  },
  featureGrid: {
    heading: 'Tout ce qu\'il te faut pour ne plus t\'entraîner au hasard',
    features: [
      {
        title: 'Score de récupération',
        desc: 'VFC, sommeil, fréquence cardiaque et contexte d\'entraînement synthétisés en un score de forme quotidien.',
        href: '/features/recovery-scoring',
      },
      {
        title: 'Suivi de charge',
        desc: 'Suivi multi-facteurs de la fatigue et détection des pics de charge pour rester en zone optimale.',
        href: '/features/workload-tracking',
      },
      {
        title: 'Modèles intelligents',
        desc: 'Séances prescrites avec séries, poids et objectifs de répétitions intégrés.',
        href: '/features/smart-templates',
      },
      {
        title: 'Démarrage immédiat',
        desc: 'Tuwa est utile dès le premier jour — pas besoin de semaines de données de référence.',
        href: '/features/cold-start',
      },
      {
        title: 'Coach + Athlète',
        desc: 'Visibilité en temps réel sur la récupération et séances prescrites pour toute ton équipe.',
        href: '/features/coaching',
      },
    ],
    segmentLabels: ['RÉCUPÉRATION', 'CHARGE', 'ENTRAÎNEMENT', 'DÉMARRAGE', 'COACHING'],
    exploreCta: 'Explorer',
  },
};

export default home;
