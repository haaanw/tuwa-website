import type { WorkloadTracking } from '../en/workload-tracking';

const workloadTracking: WorkloadTracking = {
  meta: {
    title: 'Suivi de charge d\'entraînement — Tuwa',
    description:
      'Entraîne-toi à fond sans franchir la ligne. Tuwa suit ta charge d\'entraînement avec une surveillance basée sur les EWMA, la détection de pics et le suivi de tes records personnels.',
  },
  hero: {
    outcomeStatement: 'Entraîne-toi à fond sans franchir la ligne',
    hookLine: 'Vois exactement où en est ta charge d\'entraînement — et quand tu pousses trop loin, trop vite.',
    screenshotAlt:
      'Application Tuwa — écran de charge d\'entraînement affichant les tendances de charge aiguë et chronique avec la zone ACWR sûre mise en évidence',
  },
  howItWorks: {
    heading: 'Comment ça fonctionne',
    p1: 'Chaque entraînement que tu enregistres dans Tuwa alimente un modèle de charge qui ne suit pas seulement ce que tu as fait aujourd\'hui, mais comment ça s\'intègre dans l\'arc plus large de ton entraînement. Tu enregistres tes exercices, séries, répétitions, charges et ton effort perçu (RPE) — l\'échelle familière qui mesure l\'intensité ressentie d\'une série de 1 à 10. Tuwa combine volume et intensité en un nombre de charge de séance, puis suit comment ces charges se cumulent dans le temps.',
    acuteChronicHeading: 'Charge aiguë versus charge chronique',
    p2: 'Tuwa maintient deux vues parallèles de ton entraînement. Ta charge aiguë reflète ce que tu as fait durant la dernière semaine environ — à quel point tu es frais ou fatigué en ce moment. Ta charge chronique reflète ton entraînement sur les quatre dernières semaines environ — ta base de condition physique. Le ratio entre ces deux chiffres, c\'est là que réside l\'insight.',
    p3: 'Ton corps peut gérer des augmentations progressives du stress d\'entraînement parce qu\'il s\'adapte — les muscles se renforcent, les tendons durcissent, le système cardiovasculaire devient plus efficace. Mais des sauts soudains, c\'est une autre histoire. Quand ta charge aiguë dépasse largement ta base chronique — quand tu fais beaucoup plus en une semaine que ce à quoi ton corps a été préparé — le risque de blessure augmente significativement. Tuwa détecte ces pics avant que tu exécutes la séance, pas après, te donnant la chance d\'ajuster plutôt que de simplement récupérer d\'une erreur.',
    repsInReserveHeading: 'Répétitions en réserve comme second signal d\'intensité',
    p4: 'L\'RPE te dit à quel point une série était difficile. Les répétitions en réserve (RIR) te disent à quel point tu étais proche de l\'échec. Un RPE 8 sur un squat lourd pourrait signifier que tu avais deux répétitions dans le réservoir. Tuwa prend en charge les deux métriques parce qu\'ensemble elles donnent une image plus complète de l\'intensité d\'entraînement que le poids et les répétitions seuls. Quand l\'autorégulation entre en jeu pendant les jours de faible récupération, Tuwa utilise tes objectifs de RIR pour suggérer où réduire l\'effort sans éliminer entièrement le stimulus d\'entraînement.',
    personalRecordsHeading: 'Records personnels suivis automatiquement',
    p5: 'Tuwa signale automatiquement quand tu atteins de nouveaux records personnels dans trois dimensions : poids maximum pour un exercice donné, répétitions maximum à un poids donné, et volume total en une seule séance. Pas besoin de journalisation manuelle ou de tableau de suivi séparé. Le record apparaît dans ton journal de séance et est conservé comme référence pour les séances futures. Quand tu le bats à nouveau, Tuwa le remarque.',
  },
  scienceSection: {
    heading: 'La science derrière tout ça',
    p1: 'Le concept de ratio charge aiguë:chronique a été développé et validé par le scientifique du sport Tim Gabbett et ses collègues, en étudiant initialement des joueurs de rugby et de cricket professionnels. La découverte principale : les athlètes dont la charge hebdomadaire augmentait considérablement au-dessus de leur base établie étaient significativement plus susceptibles de se blesser que ceux qui construisaient la charge progressivement. Les recherches ont depuis été répliquées dans les sports collectifs, les sports d\'endurance et l\'entraînement en résistance.',
    p2: 'Tuwa l\'implémente en utilisant des moyennes mobiles exponentiellement pondérées — une technique de lissage qui donne plus de poids aux séances d\'entraînement récentes qu\'aux anciennes. Cela signifie que ton modèle de charge répond rapidement aux changements dans ton entraînement plutôt que d\'être ancré à des données vieilles de plusieurs semaines. Un bloc d\'entraînement que tu as terminé il y a un mois compte moins pour ta base actuelle que ce que tu as fait au cours des deux dernières semaines.',
    p3: 'La "zone idéale" pour le ratio charge aiguë:chronique se situe entre environ 0,8 et 1,3. En dessous de 0,8, tu t\'entraînes trop peu par rapport à ta base de condition physique — l\'adaptation ralentit. Au-dessus de 1,3, la courbe du risque de blessure commence à monter fortement. Rester dans cette plage n\'est pas une question de prudence excessive ; c\'est créer les conditions où la surcharge progressive mène réellement à l\'adaptation plutôt qu\'à la rupture. Le graphique ci-dessous montre comment ce ratio évolue au cours d\'un cycle d\'entraînement représentatif.',
  },
};

export default workloadTracking;
