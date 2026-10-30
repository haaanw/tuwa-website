import type { TopicPageContent } from '../../topicPage';

const content: TopicPageContent = {
  "meta": {
    "title": "C'est quoi la charge d'entraînement ? Le calcul Tuwa",
    "description": "La charge d'entraînement, c'est volume fois intensité. Découvre comment charge aiguë, chronique et ACWR décrivent la tendance de ta charge, et comment Tuwa l'affiche avant la séance."
  },
  "hero": {
    "outcomeStatement": "Comprends ta charge d'entraînement avant qu'elle te dépasse",
    "hookLine": "Ce que signifie vraiment la charge d'entraînement, pourquoi les pics méritent d'être vus, et comment Tuwa la mesure à partir des séries que tu enregistres déjà."
  },
  "sections": [
    {
      "heading": "Ce qu'est vraiment la charge d'entraînement",
      "subheading": "Volume fois intensité, additionnés en charge de séance",
      "body": [
        "La charge d'entraînement est un nombre unique qui capte le stress qu'une séance a imposé à ton corps. Au plus simple, c'est le volume multiplié par l'intensité : la quantité de travail effectué, pondérée par la difficulté de ce travail. Une séance à haut volume de répétitions avec une charge modérée et une séance à faibles répétitions proche du max peuvent produire des charges très différentes même quand le tonnage total se ressemble — parce que l'intensité compte autant que le volume.",
        "Pour capter l'intensité honnêtement, il te faut un signal qui reflète l'effort, pas seulement le chiffre sur la barre. Tuwa utilise le RPE — l'effort perçu, une échelle de 1 à 10 mesurant la difficulté ressentie d'une série — aux côtés du RIR (répétitions en réserve), qui te dit combien de répétitions il te restait avant l'échec. Une série à RPE 8 avec deux répétitions en réserve porte un stress différent d'une série menée jusqu'à l'échec, et combiner les deux signaux donne une lecture de l'intensité plus fidèle que le poids et les répétitions seuls.",
        "Tuwa transforme chaque série que tu enregistres en un nombre de charge de séance, puis empile ces charges dans le temps. Ce relevé continu est la matière première de tout ce qui suit : charge aiguë, charge chronique, et le ratio entre les deux — une lecture de la place de cette semaine face à ta base récente."
      ]
    },
    {
      "heading": "Charge aiguë, charge chronique et l'ACWR",
      "subheading": "Pourquoi un pic soudain mérite d'être vu",
      "body": [
        "Deux vues de ton entraînement comptent. La charge aiguë, c'est ce que tu as fait durant la dernière semaine environ — une mesure de la fatigue et de la fraîcheur actuelles. La charge chronique, c'est ton entraînement sur les quatre dernières semaines environ — ta base de condition physique accumulée, la charge à laquelle ton corps a réellement été préparé. Aucun de ces chiffres ne veut dire grand-chose isolément. L'insight réside dans le ratio entre les deux : le ratio charge aiguë:chronique, ou ACWR.",
        "Ton corps s'adapte aux augmentations progressives de charge. Les muscles se renforcent, les tendons durcissent, le système cardiovasculaire devient plus efficace — mais seulement quand le stress monte à un rythme que l'adaptation peut suivre. Un saut soudain, c'est autre chose. Quand ta charge aiguë dépasse largement ta base chronique — quand une semaine exige beaucoup plus que ce que ton entraînement récent supporte. L'ACWR rend ce décalage visible sous forme d'un seul nombre.",
        "C'est pourquoi une grosse semaine après une coupure mérite un second regard : le travail en lui-même peut être raisonnable, mais c'est le saut par rapport à ta base récente qu'il faut lire. Un ACWR élevé est une lecture de la tendance de ta charge, pas un diagnostic ni une prédiction."
      ]
    },
    {
      "heading": "Comment Tuwa le calcule",
      "subheading": "EWMA, RPE plus RIR, et le contexte de charge avant la séance",
      "body": [
        "Tuwa modélise la charge avec une moyenne mobile exponentiellement pondérée (EWMA) — une méthode de lissage qui donne plus de poids aux séances récentes qu'aux anciennes. Un bloc d'entraînement terminé il y a un mois compte moins que ce que tu as fait la semaine dernière, donc ta base suit qui tu es maintenant plutôt que qui tu étais il y a cinq semaines. Le modèle de charge reste ainsi réactif au lieu d'être ancré à des données périmées.",
        "Les données d'entrée viennent directement de ta façon de t'entraîner : exercices, séries, répétitions, charges, RPE et RIR. Tu ne tiens aucun tableur séparé et ne convertis rien à la main — la charge de séance et l'ACWR qui en résulte sont calculés à partir du journal que tu tiens de toute façon.",
        "Ce qui change ta manière de t'entraîner, c'est le moment. Tuwa affiche le contexte de ta charge récente avant que tu commences la séance, à partir des séances déjà enregistrées. Le ratio n'est qu'un contexte : le go, modify ou hold du jour vient de ta forme et de ton plan, et la tendance de charge se tient à côté pendant que tu choisis encore. Les signaux de pic sont calculés à partir du travail enregistré."
      ]
    },
    {
      "heading": "Lire la bande de 0,8 à 1,3",
      "subheading": "Une description de ta tendance, pas une cible à tenir",
      "body": [
        "La recherche sur l'ACWR — développée et validée par le scientifique du sport Tim Gabbett et ses collègues, d'abord dans le rugby et le cricket professionnels puis répliquée dans les sports collectifs, d'endurance et en résistance — utilise souvent une bande de référence située à peu près entre 0,8 et 1,3. Sous la bande, tu fais peut-être bien moins que ta base récente. Au-dessus, la semaine en cours demande peut-être un saut plus grand que ce que ton entraînement récent supporte.",
        "Une lecture proche de cette bande veut dire que le travail de la semaine reste proche de la charge que tu as réellement construite. Des hausses régulières se lisent plus facilement que des pics répétés qui perturbent le plan.",
        "Lis ça comme un contexte, pas comme une règle. Tuwa garde le ratio sous tes yeux pour que la prochaine grosse semaine soit un choix délibéré plutôt qu'un saut accidentel ; il ne décide jamais du jour à partir de ce nombre."
      ]
    }
  ],
  "related": {
    "heading": "Continue d'explorer",
    "links": [
      {
        "label": "Le suivi de charge dans Tuwa",
        "href": "/features/workload-tracking"
      },
      {
        "label": "Notre méthodologie",
        "href": "/methodology"
      },
      {
        "label": "Score de disponibilité",
        "href": "/readiness-score"
      }
    ]
  },
  "references": {
    "heading": "Références",
    "items": [
      {
        "label": "Gabbett TJ. The training-injury prevention paradox. Br J Sports Med, 2016.",
        "url": "https://bjsm.bmj.com/content/50/5/273"
      },
      {
        "label": "Hulin BT et al. The acute:chronic workload ratio predicts injury. Br J Sports Med, 2016.",
        "url": "https://bjsm.bmj.com/content/50/4/231"
      }
    ]
  }
};

export default content;
