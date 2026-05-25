import type { Terms } from '../en/terms';

const terms: Terms = {
  meta: {
    title: 'Conditions d\'utilisation',
    lastUpdated: '10 avril 2026',
    description: 'Conditions d\'utilisation de Tuwa — application de gestion de la charge d\'entraînement et de la récupération.',
  },
  disclaimer: {
    text: 'Ceci est une traduction. La version anglaise est le document juridiquement contraignant.',
  },
  intro: {
    p1: 'Les présentes Conditions d\'utilisation (« Conditions ») régissent ton utilisation de l\'application mobile Tuwa (« l\'application ») développée par Hanwen Ma (« nous »). En téléchargeant, installant ou utilisant l\'application, tu acceptes ces Conditions.',
  },
  useOfApp: {
    heading: '1. Utilisation de l\'application',
    p1: 'Tuwa est un outil de gestion de la charge d\'entraînement et de la récupération. Tu peux l\'utiliser pour le suivi personnel de ta condition physique et, le cas échéant, pour la collaboration coach-athlète. Tu t\'engages à :',
    items: [
      'Fournir des informations exactes lors de la création de ton compte',
      'Garder tes identifiants de connexion en sécurité',
      'Utiliser l\'application conformément à toutes les lois applicables',
    ],
  },
  accounts: {
    heading: '2. Comptes',
    p1: 'Tu as besoin d\'un compte pour utiliser Tuwa. Tu es responsable de toute l\'activité sur ton compte. Si tu suspectes un accès non autorisé, contacte-nous immédiatement.',
  },
  subscriptions: {
    heading: '3. Abonnements',
    p1: 'Tuwa propose des formules d\'abonnement gratuites et payantes (Athlète Pro et Coach). Les abonnements payants sont facturés via l\'App Store d\'Apple et gérés par RevenueCat.',
    items: [
      {
        label: 'Facturation',
        description: 'Les abonnements se renouvellent automatiquement, sauf annulation au moins 24 heures avant la fin de la période en cours.',
      },
      {
        label: 'Annulation',
        description: 'Tu peux annuler à tout moment via Réglages > Identifiant Apple > Abonnements sur ton appareil. L\'annulation prend effet à la fin de la période de facturation en cours.',
      },
      {
        label: 'Remboursements',
        description: 'Les demandes de remboursement sont traitées par Apple conformément à leurs politiques App Store.',
      },
      {
        label: 'Modifications de prix',
        description: 'Nous pouvons modifier les prix des abonnements. Tu seras informé avant toute augmentation de prix.',
      },
    ],
  },
  healthKitData: {
    heading: '4. Données HealthKit',
    p1: 'Tuwa lit les données de santé d\'Apple HealthKit avec ton autorisation explicite. Nous n\'écrivons jamais de données dans HealthKit. Les données HealthKit brutes restent sur ton appareil — seuls les scores calculés sont synchronisés sur nos serveurs. Tu peux révoquer l\'accès à HealthKit à tout moment via les Réglages iOS.',
  },
  coachAthleteFeatures: {
    heading: '5. Fonctionnalités coach-athlète',
    p1: 'Si tu te lies à un coach, tu lui accordes l\'accès à tes scores de récupération, tendances de charge, résumés de séances et évaluations de bilan de forme. Tu peux te délier d\'un coach à tout moment, ce qui révoque immédiatement son accès à tes données.',
    p2: 'Les coachs qui enregistrent des séances au nom des athlètes le font avec attribution. Les coachs sont responsables d\'utiliser la plateforme de bonne foi.',
  },
  acceptableUse: {
    heading: '6. Utilisation acceptable',
    p1: 'Tu t\'engages à ne pas :',
    items: [
      'Rétro-ingénier, décompiler ou altérer l\'application',
      'Utiliser l\'application à des fins illégales',
      'Tenter d\'accéder sans autorisation à nos serveurs ou aux données d\'autres utilisateurs',
      'Revendre ou redistribuer l\'application ou son contenu',
    ],
  },
  intellectualProperty: {
    heading: '7. Propriété intellectuelle',
    p1: 'L\'application, y compris son design, son code et son contenu, appartient à Hanwen Ma. L\'utilisation de l\'application ne t\'accorde aucun droit de propriété.',
  },
  disclaimerSection: {
    heading: '8. Avertissement',
    p1: 'Tuwa fournit des données sur la charge d\'entraînement et la récupération à titre informatif uniquement. Il ne s\'agit pas d\'un avis médical. Consulte toujours un professionnel de santé qualifié avant de prendre des décisions concernant ta santé ou ton entraînement. Nous ne sommes pas responsables des blessures, du surentraînement ou des problèmes de santé résultant de l\'utilisation de l\'application.',
    informationalStrong: 'à titre informatif uniquement',
  },
  limitationOfLiability: {
    heading: '9. Limitation de responsabilité',
    p1: 'Dans la mesure maximale permise par la loi, nous ne sommes pas responsables des dommages indirects, accessoires ou consécutifs découlant de ton utilisation de l\'application. Notre responsabilité totale est limitée au montant que tu as payé pour l\'application au cours des 12 mois précédant la réclamation.',
  },
  termination: {
    heading: '10. Résiliation',
    p1: 'Nous pouvons suspendre ou résilier ton compte si tu violes ces Conditions. Tu peux supprimer ton compte à tout moment en nous contactant.',
  },
  changes: {
    heading: '11. Modifications des présentes Conditions',
    p1: 'Nous pouvons mettre à jour ces Conditions de temps à autre. Les modifications seront publiées sur cette page avec une date de mise à jour. La poursuite de l\'utilisation de l\'application après les modifications vaut acceptation.',
  },
  contact: {
    heading: '12. Contact',
    intro: 'Pour toute question concernant ces Conditions :',
    emailLabel: 'E-mail',
    email: 'hanwenma09@gmail.com',
  },
};

export default terms;
