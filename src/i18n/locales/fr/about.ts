import type { About } from '../en/about';

const about: About = {
  meta: {
    title: 'À propos',
    description:
      "Pourquoi Tuwa existe : le staff sports-science des athlètes qui se coachent seuls. Un appui de décision pour le plan que tu écris — il n'écrit jamais le programme.",
  },
  hero: {
    kicker: 'à propos',
    title: 'Le staff',
    lede:
      "Les athlètes pros ne décident jamais seuls. Derrière chaque plan, il y a un staff — entraîneurs, kinés, scientifiques du sport — qui transforme les signaux du corps en décision du jour. Tuwa existe parce que les athlètes qui se coachent seuls n'en ont pas.",
  },
  problem: {
    kicker: '01 · le problème',
    heading: 'Des athlètes sérieux, seuls aux commandes, sans staff derrière eux',
    body: [
      "Si tu travailles ton sport, ta force et ton cardio en parallèle — dur, et par toi-même — personne ne regarde l'ensemble. Personne ne pèse la séance d'hier soir contre la physiologie de ce matin pour te dire à quoi la journée devrait vraiment ressembler.",
      "Les applis ne comblent pas le vide. Les wearables de récupération te donnent un score sans connaître ton plan. Les coachs IA veulent bien t'entraîner — sur leur programme, pas le tien. Les plateformes de planification stockent ton plan et te laissent la décision du jour au pire moment.",
      "Chaque outil veut posséder ton programme, ou refuse d'y toucher.",
    ],
  },
  what: {
    kicker: "02 · ce qu'est tuwa",
    heading: 'La couche de décision du plan que tu écris',
    body: [
      "C'est toi qui écris le programme — ou tu apportes celui de ton coach. Tuwa le lit en entier, le croise avec ta physiologie — VFC, sommeil, fréquence cardiaque au repos, historique d'entraînement — et soutient les décisions autour : les chiffres du jour, un verdict go / modify / hold, et la direction que prend ta charge sur les semaines à venir.",
      "Il n'écrit jamais le programme. Il ne te fait jamais discuter avec lui. Un verdict, les chiffres derrière, et la séance que tu comptais vraiment faire.",
    ],
  },
  who: {
    kicker: '03 · pour qui',
    heading: "Conçu pour les athlètes qui se coachent seuls — par l'un d'eux",
    body: [
      "Tuwa s'adresse aux athlètes qui travaillent leur sport et leur force en parallèle et prennent chaque décision d'entraînement eux-mêmes — sans coach, sans kiné, sans support sports-science sous la main.",
      "Il est développé par un athlète qui se coache seul, précisément pour ce problème. Le fondateur est l'utilisateur de référence : le premier à s'entraîner avec chaque version.",
    ],
  },
  principles: {
    kicker: '04 · principes',
    heading: 'Cinq règles que le produit tient',
    items: [
      {
        title: 'Ton plan reste le tien',
        body: "Tuwa module le programme que tu as écrit. Il n'en génère jamais, et ne réécrit jamais le tien en douce.",
      },
      {
        title: 'Le texte avant la couleur',
        body: "Les zones sont toujours écrites en toutes lettres. La couleur est un appui — jamais le message.",
      },
      {
        title: 'Pas de boîte noire',
        body: 'Chaque verdict vient avec les chiffres derrière, notés contre tes propres références. Même entrée, même réponse — le moteur est déterministe.',
      },
      {
        title: 'Des choix à poids égal',
        body: "Go, modify et hold sont présentés comme des options équivalentes. L'interface ne te pousse jamais à modifier ton plan.",
      },
      {
        title: "Les données de santé brutes ne quittent jamais l'appareil",
        body: "L'accès HealthKit est en lecture seule. Les échantillons bruts de VFC, sommeil et fréquence cardiaque restent sur ton téléphone — seuls des scores composites se synchronisent.",
      },
    ],
  },
  closing: {
    heading: 'Garde ton plan. Ajuste la journée.',
    cta: "Télécharger sur l'App Store",
    ctaNote: 'iOS 17+ · iPhone',
  },
};

export default about;
