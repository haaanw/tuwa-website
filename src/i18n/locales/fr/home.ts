import type { Home } from '../en/home';

const home: Home = {
  // Page d'accueil Field Notes (Session X · portage Astro). Même ordre de
  // sections que la version EN : hero → 01 aujourd'hui → 02 charge → 03 le
  // système → 04 journal → chiffres → 05 récupération → 06 méthodologie →
  // bande fantôme → 07 confidentialité. Chiffres, animations et visuels
  // identiques à la version EN ; seules les chaînes sont traduites.
  meta: {
    title: 'Reste dans ta strike zone',
    description:
      "Tuwa est le staff sports-science des athlètes qui se coachent seuls. Tu écris le plan ; Tuwa te renvoie la dose du jour : go, modify ou hold. Il n'écrit jamais ton programme.",
  },
  heroScrub: {
    sectionAria: 'Tuwa — ton plan, rendu sûr et optimal',
    scoreAria: 'Score de forme 82',
    scoreCaption: 'forme du jour',
    strapline: 'Tuwa // le staff sports-science',
    lines: ['Ton plan.', 'Rendu sûr', 'et optimal.'],
    lead: "Tuwa est le staff sports-science des athlètes qui se coachent seuls. Il lit ton corps — VFC, sommeil, fréquence cardiaque au repos, historique d'entraînement — et module le plan que tu as écrit : les chiffres du jour, un verdict go / modify / hold, et la tendance de ta charge. Il n'écrit jamais ton programme.",
    sub: 'Conçu pour les athlètes qui travaillent leur sport et leur force en parallèle',
    cta: "Télécharger sur l'App Store",
    ctaNote: 'iOS 17+ · iPhone',
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
        body: 'Un seul budget de fatigue pour le sport, la force et le cardio — et sa tendance, semaine après semaine.',
      },
    ],
    verdictAlt: 'Écran de verdict Tuwa : go / modify / hold avec ajustements chiffrés',
    strikeZoneAlt: 'Barre strike zone de Tuwa montrant le ratio de charge aiguë sur chronique',
    workloadAlt: "Graphique de charge d'entraînement Tuwa avec tendance ACWR",
  },
  zoneScrub: {
    kicker: "02 · charge d'entraînement",
    heading: 'Un seul budget de fatigue',
    body: 'Le sport, la force et le cardio puisent dans le même réservoir. Tuwa les suit comme une seule charge — aiguë contre chronique — et garde le ratio dans la strike zone. Quand la tendance pointe vers le surmenage, tu le vois quand il est encore temps de modifier.',
    barMicro: 'ratio de charge aiguë : chronique',
    barNow: 'maintenant',
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
  system: {
    kicker: '03 · le système',
    heading: 'Tout le système, en un geste',
    body: "La récupération, la décision du jour, et la série que tu es en train de faire — une toile pour chacune, aucun tableau de bord à assembler.",
    recoveryAlt: 'Écran de récupération Tuwa : tendances VFC et sommeil contre les références personnelles',
    dashboardAlt: 'Tableau de bord Tuwa : carte de forme affichant 82 avec les métriques',
    activeWorkoutAlt: 'Séance en cours dans Tuwa : saisie des séries en direct',
  },
  // v1.7.4 — la saisie vocale de la séance a été RETIRÉE (décision de HAN,
  // 2026-09-24). Le journal se fait au clavier ou en direct sur la réglette ;
  // l'importation d'un programme se fait aussi en collant du texte ou en
  // important un PDF/une photo, à la place de la voix — plus de micro nulle
  // part dans l'app. Le modèle de langue est un ANALYSEUR : il transforme du
  // texte tapé en brouillon. Jamais un chat, un assistant ou un coach à qui
  // on parle.
  logging: {
    kicker: '04 · journal',
    heading: 'Tape la séance, ou règle-la sur la réglette',
    body: "Tape la séance comme tu la dirais à voix haute, ou enregistre les séries directement sur la réglette — deux portes, un seul journal. Tuwa transforme la description tapée en brouillon modifiable, chaque série déjà remplie. Rien n'est enregistré tant que tu n'as pas confirmé, et chaque chiffre reste corrigeable à la main.",
    doors: ['tape-la', 'règle-la'],
    manual: "La saisie manuelle ne disparaît jamais. Une banque de 1 324 mouvements reste derrière un sélecteur pensé recherche d'abord, et la réglette de charge s'affiche en entier avant que tu la touches — ta dernière série et la cible du jour marquées dessus.",
    captions: ['01 · tape-la', '02 · vérifie le brouillon, corrige une série', '03 · confirmé, puis inscrit'],
    foot: "gratuit sur toutes les formules · rien ne s'enregistre sans ta confirmation",
    moreLink: 'Comment fonctionne la saisie de texte',
    logCaptureAlt: 'Saisie de séance Tuwa : une séance tapée, écrite en une phrase, prête à être analysée',
    activeWorkoutAlt: 'Saisie des séries dans Tuwa : la réglette de charge avec les repères cible et dernière série',
    workoutLogAlt: "Journal d'entraînement Tuwa : historique des séances",
  },
  statsBand: {
    sectionAria: 'Chiffres clés',
    labels: ['exercices dans la banque de mouvements', 'forme, notée chaque matin', 'jours de charge derrière chaque ratio'],
  },
  recovery: {
    kicker: '05 · récupération',
    heading: 'Tes références, tracées chaque jour',
    body: "VFC nocturne, sommeil et fréquence cardiaque au repos sont notés contre tes propres références glissantes — pas des normes de population — puis condensés en un seul chiffre avec des raisons en langage clair. Tu ne reçois pas un tableau de bord à interpréter. Tu reçois un score et le pourquoi.",
    // Couche d'annotation du graphe qui se dessine (Field Notes v6).
    // Écrit en minuscules ; la règle .micro/.anno met en capitales pour le latin.
    spark: {
      label: 'vfc · 28 jours',
      reading: '62 ms +4 · à la référence',
      axis: ['j-28', 'j-21', 'j-14', 'j-7', "aujourd'hui"],
      chartAlt: 'Tendance de la VFC sur 28 jours, actuellement 62 millisecondes, à la référence',
      foot: 'chaque métrique est notée contre ta propre référence glissante, pas des normes de population',
    },
  },
  // ------------------------------------------------------------------
  // 06 · MÉTHODOLOGIE — le score de sommeil v2 est une CONCEPTION, pas
  // une fonction publiée. Chaque réserve doit survivre à la traduction :
  // « conception, pas dans l'app publiée », « aucune promesse », « une
  // supposition », « rien n'est prouvé », « pas un dispositif médical ».
  // Aucune affirmation ne doit être renforcée.
  // ------------------------------------------------------------------
  methodology: {
    kicker: '06 · méthodologie · en développement',
    headingLines: ['Voici ce que nous croyons,', 'et ce qui nous donnerait tort'],
    lede: "Aujourd'hui, Tuwa note ton sommeil contre une cible fixe. Nous en construisons une qui s'adapte à l'état dans lequel tu t'es couché. Ce n'est pas terminé — voici donc toute la conception, les poids, et les parties dont nous sommes le moins sûrs.",
    chips: ["statut : conception · pas dans l'app publiée", "aucune promesse de performance ni de précision n'est faite ici"],
    intents: [
      {
        kicker: '01 · intention de conception',
        title: 'La cible est la tienne, et tu peux la voir',
        body: "Ta cible de sommeil est apprise sur tes propres nuits, pas prise sur une moyenne de population. Et les poids derrière le score sont imprimés ci-dessous — ce n'est pas un secret industriel.",
      },
      {
        kicker: '02 · intention de conception',
        title: 'Le score sait ce que la nuit avait à faire',
        body: "Sept heures après une journée de dix-huit heures, après un match, et après un mardi tranquille : trois nuits différentes. Le même calcul à chaque fois — seuls les poids des parties changent.",
      },
      {
        kicker: "03 · déjà dans l'app",
        title: 'Rien ne quitte le téléphone',
        body: "Tes mesures brutes de sommeil, de VFC et de fréquence cardiaque restent dans HealthKit, sur ton appareil. Seuls les scores finis se synchronisent. Celle-ci n'est pas un projet — c'est déjà le fonctionnement de l'app.",
      },
    ],
    mechanism: {
      kicker: 'le mécanisme',
      heading: 'Un seul jeu de poids, ajusté — pas un second algorithme',
      body: "Chaque matin, l'app regarde ce qu'elle sait déjà d'hier — combien de temps tu es resté debout, à quel point tu t'es entraîné dur, la régularité de ton sommeil. Cela désigne les situations qui s'appliquent, et chacune ajuste les poids ci-dessous. Chaque nuit garde ce qu'elle a vu et ce qu'elle a décidé, pour que tout score puisse être démonté plus tard.",
      tree: [
        ['ce qu’elle lit', 'éveil · charge · régularité · dette · siestes'],
        ['ce qu’elle reconnaît', "toutes les situations qui s'appliquent, ou aucune"],
        ['ce qu’elle ajuste', 'les poids, dans des limites fixes'],
        ['ce qu’elle garde', 'tout ce qui précède, chaque nuit'],
      ],
      foot: 'calcul simple sur ton téléphone · aucun réseau · aucun nouveau capteur',
    },
    weights: {
      label: 'poids de base · palier a',
      sum: 'somme 1,00',
      rows: [
        { name: 'Durée', value: '0.50' },
        { name: 'Continuité', value: '0.15' },
        { name: 'Régularité', value: '0.15' },
        { name: 'Sommeil profond', value: '0.10' },
        { name: 'Sommeil paradoxal', value: '0.10' },
      ],
      note: "les heures dormies portent la moitié du score — c'est la partie la mieux étayée · le profond et le paradoxal comptent peu, car un poignet n'est qu'à moitié d'accord avec un laboratoire du sommeil",
      provenance: "nous avons débattu ces chiffres — nous ne les avons pas ajustés sur des données · consigné en h-01",
    },
    situations: {
      kicker: 'les situations · trois sur six',
      heading: 'Ce qui change, et à quel point nous en sommes sûrs',
      columns: ['situation', "quand elle s'applique", 'ce qui change', 'à quel point nous en sommes sûrs'],
      rows: [
        {
          name: 'Tu es resté debout trop longtemps',
          when: "Tu étais éveillé bien plus longtemps que d'habitude avant de te coucher.",
          change: 'Les heures et le sommeil profond comptent plus. Ta cible monte, de 45 minutes au maximum.',
          status: 'étayé · la valeur est notre supposition (h-02)',
          confidence: "La pression de sommeil monte avec le temps d'éveil : cela, c'est acquis. Combien de sommeil en plus cela vaut est notre chiffre, pas celui de la recherche.",
        },
        {
          name: "Tu t'es entraîné dur",
          when: 'Hier était bien au-dessus de ta normale du dernier mois.',
          change: 'Les heures et le sommeil profond comptent un peu plus. Ta cible monte de trente minutes au maximum.',
          status: 'une supposition (h-03)',
          confidence: "La seule étude que nous avons trouvée à tester cela directement n'a rien trouvé. Nous l'avons gardée, avons écrit ce qui nous la ferait supprimer, et le disons ici.",
        },
        {
          name: 'Ton rythme vient de casser',
          when: "Tu t'es couché plus de deux heures à côté de ton heure habituelle — le vol, le match tardif.",
          change: "Être décalé compte moins, rester endormi compte plus, et le profond comme le paradoxal ne sont crus qu'à moitié.",
          status: 'étayé · la réponse est notre supposition (h-05)',
          confidence: "La première nuit perturbée est bien la pire. Alléger la pénalité de décalage est notre réponse à cela, pas un résultat d'étude.",
        },
      ],
      foot: 'les situations ne déplacent que les poids — elles n’ajoutent jamais un nouvel ingrédient au score',
    },
    registry: {
      kicker: 'la liste des suppositions · 4 sur 10',
      heading: 'Chaque supposition, écrite avec le test qui la tue',
      body: "Tout ce qui, dans le score, n'est appuyé par aucune étude figure sur cette liste, à côté du résultat qui nous ferait changer d'avis. Rien n'entre dans l'app sans une ligne ici — et si nous ne pouvons pas dire ce qui prouverait qu'une supposition est fausse, elle n'entre pas du tout.",
      columns: ['n°', 'ce que nous supposons', 'où cela en est', "ce qui nous ferait changer d'avis"],
      rows: [
        {
          id: 'H-01',
          claim: 'Les poids ci-dessus sont à peu près justes.',
          status: 'une supposition · débattue, pas mesurée',
          test: "Comparer chaque partie à ce que les gens ressentent réellement le lendemain, puis réajuster une fois que nous aurons assez de nuits chez assez d'athlètes.",
        },
        {
          id: 'H-03',
          claim: "Une journée d'entraînement dure veut dire jusqu'à trente minutes de sommeil en plus.",
          status: "une supposition · le seul test n'a rien trouvé",
          test: "Si les journées dures et faciles ne montrent aucune différence, cela sort — de la situation comme de la cible.",
        },
        {
          id: 'H-07',
          claim: 'Quand tu es bien en retard sur ton sommeil, les heures comptent plus que les stades.',
          status: 'une supposition · mais bien appuyée',
          test: 'Vérifier si le profond et le paradoxal nous disent encore quelque chose une fois en déficit réel.',
        },
        {
          id: 'H-10',
          claim: "Voir ta cible bouger, et pourquoi, aide plus que cela n'inquiète.",
          status: 'une supposition · aucune étude, juste notre avis',
          test: "Notre propre usage, et ce que les gens nous disent. Si cela se lit comme une alarme, toute la couche se tait.",
        },
      ],
    },
    // Les garde-fous. Ils portent le même sens dans chaque langue.
    rails: [
      "tuwa est un outil d'entraînement, pas un dispositif médical",
      'il ne diagnostique pas, ne traite pas et ne prévient pas les blessures',
      "les stades de sommeil viennent de ta montre, comparés seulement à ton propre historique",
      "rien ici n'est terminé, et rien ici n'est prouvé",
      'les sources ci-dessous disent ce que chaque article a trouvé — rien de plus',
    ],
    sources: {
      kicker: 'ce que nous avons lu, et ce que nous en avons tiré',
      items: [
        {
          finding: "La pression de sommeil monte pendant l'éveil.",
          cite: "Borbély, Daan, Wirz-Justice & Deboer (2016), Journal of Sleep Research 25(2). Nous en avons pris la forme. Nous n'en avons pris aucun chiffre.",
        },
        {
          finding: "L'entraînement déplace le sommeil, mais faiblement.",
          cite: "Kredlow et al. (2015), Journal of Behavioral Medicine 38. De petits effets sur 66 études — c'est pourquoi celle-ci reste une supposition.",
        },
        {
          finding: 'La régularité, c’est le milieu de ta nuit, pas son début.',
          cite: "Wittmann & Roenneberg (2006), Chronobiology International 23(1–2). C'est le chiffre que nous suivons.",
        },
        {
          finding: 'Le sommeil perdu s’accumule, et ce sont les heures qui le remboursent.',
          cite: 'Van Dongen et al. (2003). La raison pour laquelle les heures passent devant les stades quand tu es en retard.',
        },
      ],
    },
  },
  ghostBand: {
    sectionAria: 'Ce qu’est Tuwa',
    quote: "Le staff d'une équipe pro — plan, physiologie et une décision — pour les athlètes qui se coachent eux-mêmes.",
  },
  privacyClose: {
    kicker: '07 · confidentialité',
    heading: 'Tes données restent sur ton téléphone',
    body: "Tuwa lit HealthKit — il n'y écrit jamais — et les données de santé brutes ne quittent jamais l'appareil. Seuls des scores composites se synchronisent.",
    bullets: [
      "L'accès HealthKit est en lecture seule",
      "Les échantillons bruts de VFC, sommeil et fréquence cardiaque restent sur l'appareil",
      'Seuls des scores composites se synchronisent avec ton compte',
      'Nécessite iOS 17 ou plus récent',
    ],
    shotAlt: 'Écran de récupération Tuwa : tendances VFC et sommeil contre les références personnelles',
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
