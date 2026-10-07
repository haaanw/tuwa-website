import type { Terms } from '../en/terms';

const terms: Terms = {
  meta: {
    title: 'Conditions d\'utilisation',
    lastUpdated: '7 octobre 2026',
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
    p1: 'Tuwa est un outil de gestion de la charge d\'entraînement et de la récupération. Tu peux l\'utiliser pour le suivi personnel de ta condition physique. Tu t\'engages à :',
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
    p1: 'Tuwa propose une formule gratuite et un abonnement payant à renouvellement automatique, Tuwa Pro. Les durées d\'abonnement disponibles et leurs prix sont affichés dans l\'app avant l\'achat ainsi que sur la fiche produit de l\'App Store. Les abonnements payants sont facturés via l\'App Store d\'Apple et gérés par RevenueCat.',
    items: [
      {
        label: 'Facturation',
        description: 'Le paiement est débité de ton compte Apple à la confirmation de l\'achat. Les abonnements se renouvellent automatiquement au même prix et pour la même durée, sauf annulation au moins 24 heures avant la fin de la période en cours ; le renouvellement est débité dans les 24 heures précédant la fin de cette période.',
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
      {
        label: 'Quota gratuit',
        description: 'Certaines fonctions ont un quota gratuit : 3 imports de programme et 5 exercices personnalisés par compte. Tuwa Pro lève ces limites. Des limites quotidiennes d\'usage raisonnable s\'appliquent à tous les comptes.',
      },
      {
        label: 'Parrainage',
        description: 'Le parrainage facultatif « Offre un mois » a ses propres conditions (tuwa.app/referral/, en anglais).',
      },
    ],
  },
  healthKitData: {
    heading: '4. Données HealthKit',
    p1: 'Tuwa lit les données de santé d\'Apple HealthKit avec ton autorisation explicite. Nous n\'écrivons jamais de données dans HealthKit. Les données HealthKit brutes restent sur ton appareil — seuls les scores calculés sont synchronisés sur nos serveurs. Tu peux révoquer l\'accès à HealthKit à tout moment via les Réglages iOS.',
  },
  acceptableUse: {
    heading: '5. Utilisation acceptable',
    p1: 'Tu t\'engages à ne pas :',
    items: [
      'Rétro-ingénier, décompiler ou altérer l\'application',
      'Utiliser l\'application à des fins illégales',
      'Tenter d\'accéder sans autorisation à nos serveurs ou aux données d\'autres utilisateurs',
      'Revendre ou redistribuer l\'application ou son contenu',
    ],
  },
  intellectualProperty: {
    heading: '6. Propriété intellectuelle',
    p1: 'L\'application, y compris son design, son code et son contenu, appartient à Hanwen Ma. L\'utilisation de l\'application ne t\'accorde aucun droit de propriété.',
  },
  disclaimerSection: {
    heading: '7. Avertissement',
    p1: 'Tuwa fournit des données sur la charge d\'entraînement et la récupération à titre informatif uniquement. Il ne s\'agit pas d\'un avis médical. Consulte toujours un professionnel de santé qualifié avant de prendre des décisions concernant ta santé ou ton entraînement. Nous ne sommes pas responsables des blessures, du surentraînement ou des problèmes de santé résultant de l\'utilisation de l\'application.',
    informationalStrong: 'à titre informatif uniquement',
  },
  limitationOfLiability: {
    heading: '8. Limitation de responsabilité',
    p1: 'Dans la mesure maximale permise par la loi, nous ne sommes pas responsables des dommages indirects, accessoires ou consécutifs découlant de ton utilisation de l\'application. Notre responsabilité totale est limitée au montant que tu as payé pour l\'application au cours des 12 mois précédant la réclamation.',
  },
  termination: {
    heading: '9. Résiliation',
    p1: 'Nous pouvons suspendre ou résilier ton compte si tu violes ces Conditions. Tu peux supprimer ton compte à tout moment depuis Profil → Supprimer le compte dans l\'application, ou en nous contactant.',
  },
  changes: {
    heading: '10. Modifications des présentes Conditions',
    p1: 'Nous pouvons mettre à jour ces Conditions de temps à autre. Les modifications seront publiées sur cette page avec une date de mise à jour. La poursuite de l\'utilisation de l\'application après les modifications vaut acceptation.',
  },
  appStore: {
    heading: '11. Conditions de l\'App Store d\'Apple',
    p1: 'Tuwa est distribuée via l\'App Store d\'Apple. Les conditions suivantes s\'appliquent à cette distribution et, en cas de conflit avec ce qui précède, elles prévalent :',
    items: [
      'Le présent accord est conclu uniquement entre toi et Hanwen Ma, et non avec Apple. Apple n\'est pas responsable de l\'app ni de son contenu.',
      'Il t\'est accordé une licence non transférable d\'utilisation de l\'app sur tout produit de marque Apple que tu possèdes ou contrôles, dans les limites des Règles d\'utilisation de l\'App Store ; l\'app peut en outre être accessible à d\'autres comptes qui te sont associés via le partage familial ou l\'achat en volume.',
      'Hanwen Ma est seul responsable de la maintenance et de l\'assistance. Apple n\'a aucune obligation de fournir des services de maintenance ou d\'assistance.',
      'Hanwen Ma est seul responsable des garanties du produit, expresses ou implicites. Si l\'app n\'est pas conforme à une garantie applicable, tu peux en informer Apple, qui te remboursera le prix d\'achat de l\'app. Dans toute la mesure permise par la loi, Apple n\'a aucune autre obligation de garantie concernant l\'app.',
      'Hanwen Ma, et non Apple, est responsable du traitement de toute réclamation relative à l\'app, y compris les réclamations en matière de responsabilité du fait des produits, toute réclamation selon laquelle l\'app ne satisfait pas à une exigence légale ou réglementaire, et les réclamations fondées sur le droit de la consommation, la protection de la vie privée ou une législation similaire.',
      'En cas de réclamation d\'un tiers selon laquelle l\'app ou ton utilisation de celle-ci porte atteinte à ses droits de propriété intellectuelle, Hanwen Ma est seul responsable de l\'enquête, de la défense, du règlement et de l\'acquittement de cette réclamation.',
      'Tu déclares ne pas te trouver dans un pays soumis à un embargo du gouvernement des États-Unis ou désigné par celui-ci comme « soutenant le terrorisme », et ne figurer sur aucune liste de parties interdites ou soumises à restrictions du gouvernement des États-Unis.',
      'Apple et ses filiales sont bénéficiaires tiers du présent accord et, dès ton acceptation des présentes Conditions, ont le droit de le faire appliquer à ton encontre en qualité de bénéficiaires tiers.',
    ],
  },
  contact: {
    heading: '12. Contact',
    intro: 'Pour toute question concernant ces Conditions :',
    emailLabel: 'E-mail',
    email: 'support@tuwa.app',
  },
};

export default terms;
