import type { Home } from '../en/home';

const home: Home = {
  // Page d'accueil Pavilion (nouvelle structure). Chiffres, animations et
  // visuels identiques à la version EN ; seules les chaînes sont traduites.
  meta: {
    title: 'Reste dans ta strike zone',
    description: "Tuwa est le staff sports-science des basketteurs qui se coachent seuls et s'entraînent sérieusement en force.",
  },
  heroScrub: {
    sectionAria: 'Tuwa — ton plan, rendu sûr et optimal',
    scoreAria: 'Score de forme 82',
    scoreCaption: 'forme du jour',
    lines: ['Ton plan.', 'Rendu sûr', 'et optimal.'],
    lead: "Tuwa est le staff sports-science des athlètes qui se coachent seuls. Il lit ton corps — VFC, sommeil, fréquence cardiaque au repos, historique d'entraînement — et module le plan que tu as écrit : les chiffres du jour, un verdict go / modify / hold, et la direction que prend ta charge. Il n'écrit jamais ton programme.",
    sub: 'Conçu pour les athlètes qui travaillent leur sport et leur force en parallèle.',
    cta: "Télécharger sur l'App Store",
    ctaNote: 'iOS 17+ · iPhone',
    scrollCue: 'défiler',
  },
  marquee: {
    sectionAria: 'Vocabulaire produit',
    srText: 'Strike zone, microdose, niveau de match, forme, un seul budget de fatigue, go / modify / hold.',
    terms: ['strike zone', 'microdose', 'niveau de match', 'forme', 'un seul budget de fatigue', 'go / modify / hold'],
    pauseLabel: 'pause',
    playLabel: 'lecture',
  },
  showcase: {
    kicker: "01 · aujourd'hui",
    heading: 'Une décision par jour',
    body: "Chaque séance commence par un verdict : go, modify ou hold. Tuwa transforme la physiologie du matin et la charge d'hier en ajustements concrets — baisse la série lourde de cinq pour cent, plafonne le travail cardio, ou prends l'option microdose pour garder le schéma moteur sans en payer le prix.",
    lottieAria: 'Animation : coche de verdict avec un anneau de pulsation calme',
    lottieCaption: 'le verdict, tracé calmement',
    aside: "Pas de chat, pas de données à interpréter toi-même. Un verdict, les chiffres derrière, et la séance que tu comptais vraiment faire.",
    steps: [
      {
        title: 'Le verdict',
        body: 'Go, modify ou hold — avec les ajustements exacts pour la séance du jour, calculés à partir de ta forme et de ta position dans ton plan.',
      },
      {
        title: 'La strike zone',
        body: "Une vue en direct de ton ratio de charge aiguë sur chronique, maintenu dans la bande où l'adaptation dépasse le risque de blessure.",
      },
      {
        title: 'La tendance de charge',
        body: 'Un seul budget de fatigue pour le sport, la force et le cardio — et sa trajectoire sur les semaines à venir.',
      },
    ],
    verdictAlt: 'Écran de verdict Tuwa : go / modify / hold avec ajustements chiffrés',
    strikeZoneAlt: 'Barre strike zone de Tuwa montrant le ratio de charge aiguë sur chronique',
    workloadAlt: "Graphique de charge d'entraînement Tuwa avec tendance ACWR",
  },
  zoneScrub: {
    kicker: "02 · charge d'entraînement",
    heading: 'Un seul budget de fatigue',
    body: 'Le sport, la force et le cardio puisent dans le même réservoir. Tuwa les suit comme une seule charge — aiguë contre chronique — et garde le ratio dans la strike zone. Quand la tendance pointe vers le surmenage, tu le vois des jours avant de le sentir.',
    barMicro: 'ratio de charge aiguë : chronique',
    zoneLabels: [
      'Sous-entraînement — de la marge pour construire',
      'Dans la strike zone',
      'Ça chauffe — le moment de modify',
      'Risque de surmenage — hold',
    ],
    zoneCopy: 'Le ratio compare la charge des sept derniers jours à celle des quatre dernières semaines. Le travail de Tuwa : le garder dans la strike zone.',
    legend: ['sous 0.8 — sous-entraînement', '0.8–1.3 — strike zone', '1.3–1.5 — prudence', 'au-delà de 1.5 — danger'],
    foot: "Les zones sont toujours écrites en toutes lettres — la couleur est un appui, jamais le message.",
    dashboardAlt: 'Tableau de bord Tuwa : carte de forme affichant 82 avec les métriques',
    lottieAria: "Animation : jauge de forme avec une aiguille travertin balayant l'arc gradué",
    lottieCaption: 'la forme, mesurée',
    aside: "L'aiguille est alimentée par ton historique, pas par une moyenne de population. Même entrée, même réponse — le moteur est déterministe.",
  },
  statsBand: {
    sectionAria: 'Chiffres clés',
    labels: ['exercices dans la banque de mouvements', 'forme, notée chaque matin', 'jours de prévision de charge'],
  },
  recovery: {
    kicker: '03 · récupération',
    heading: 'Une forme que tu peux lire',
    body: "VFC nocturne, sommeil et fréquence cardiaque au repos sont notés contre tes propres références glissantes — pas des normes de population — puis condensés en un seul chiffre avec des raisons en langage clair. Tu ne reçois pas un tableau de bord à interpréter. Tu reçois un score et le pourquoi.",
    shotAlt: 'Écran de récupération Tuwa : tendances VFC et sommeil contre les références personnelles',
    quote: "Le staff d'une équipe pro — plan, physiologie et une décision — pour les athlètes qui se coachent eux-mêmes.",
    // Couche d'annotation du graphe qui se dessine (Field Notes v6).
    // Écrit en minuscules ; la règle .micro/.anno met en capitales pour le latin.
    spark: {
      caption: "Chaque métrique est notée contre ta propre référence glissante, pas des normes de population. Voici 28 jours de VFC, tracés comme l'app les trace.",
      label: 'vfc · 28 jours',
      reading: '62 ms +4 · à la référence',
      axis: ['j-28', 'j-21', 'j-14', 'j-7', "aujourd'hui"],
      chartAlt: 'Tendance de la VFC sur 28 jours, actuellement 62 millisecondes, à la référence',
    },
  },
  logging: {
    kicker: '04 · journal',
    heading: 'Note vite, entre les séries',
    body: "Une banque de 1 324 mouvements derrière un sélecteur pensé recherche d'abord. Charge, répétitions, validé — un journal fait pour des pouces couverts de magnésie, qui suit la séance au lieu de la ralentir.",
    movementBankAlt: 'Banque de mouvements Tuwa : catalogue de 1 324 exercices avec recherche',
    activeWorkoutAlt: 'Séance en cours dans Tuwa : saisie des séries en direct',
    workoutLogAlt: "Journal d'entraînement Tuwa : historique des séances",
  },
  privacyClose: {
    kicker: '05 · confidentialité',
    heading: 'Tes données restent sur ton téléphone',
    body: "Tuwa lit HealthKit — il n'y écrit jamais — et les données de santé brutes ne quittent jamais l'appareil. Seuls des scores composites se synchronisent.",
    bullets: [
      "L'accès HealthKit est en lecture seule",
      "Les échantillons bruts de VFC, sommeil et fréquence cardiaque restent sur l'appareil",
      'Seuls des scores composites se synchronisent avec ton compte',
      'Nécessite iOS 17 ou plus récent',
    ],
    cta: "Télécharger sur l'App Store",
    ctaNote: 'ton plan, rendu sûr et optimal',
  },
  // Sections héritées des anciens composants (Hero / FeatureGrid /
  // StatsCounter / LandingCTA) — plus utilisées ; à supprimer avec eux.
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
