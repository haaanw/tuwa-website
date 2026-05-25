import type { ColdStart } from '../en/cold-start';

const coldStart: ColdStart = {
  meta: {
    title: 'Démarrage à froid',
    description:
      'Des conseils honnêtes dès le premier jour — même sans données historiques. Tuwa construit ton intelligence d\'entraînement dès l\'instant où tu t\'inscris.',
  },
  hero: {
    outcomeStatement: 'Des conseils honnêtes dès le premier jour — même sans données historiques',
    hookLine: 'La plupart des applications ont besoin de semaines de données avant d\'être utiles. Tuwa commence à fonctionner immédiatement.',
    screenshotAlt: 'Capture d\'écran du démarrage à froid — bientôt disponible',
  },
  howItWorks: {
    heading: 'Comment ça fonctionne',
    p1: 'Chaque algorithme qui apprend à partir de données personnelles fait face au même problème le premier jour : il n\'y a pas de données personnelles. Le score de récupération, les tendances de charge d\'entraînement, les références personnelles — tout cela nécessite un historique. La plupart des applications gèrent ça en te donnant des scores fictifs, des valeurs par défaut optimistes, ou un message te disant « reviens dans deux semaines ». Rien de tout ça n\'est honnête, et rien n\'est utile.',
    p2: 'L\'approche de Tuwa est différente : commencer avec des références issues de la littérature scientifique en sports validée au niveau populationnel, et les remplacer progressivement par tes propres données au fur et à mesure qu\'elles s\'accumulent. Dès l\'instant où tu ouvres l\'application, tu reçois des conseils actionnables — avec une communication transparente sur ce qui fonde ces conseils.',
    day1Heading: 'Jour 1 : signal immédiat à partir de ce que tu as',
    p3: 'Dès ton premier jour, Tuwa réalise un bilan bien-être matinal — des évaluations subjectives de tes courbatures, ton énergie et ton stress. Ces données sont disponibles immédiatement, sans matériel requis. Si tu as une Apple Watch ou un autre appareil qui écrit dans HealthKit, Tuwa lit les données historiques de VFC et de sommeil déjà disponibles. Ton premier score de récupération reflète les deux sources, en indiquant clairement quels facteurs sont basés sur tes données personnelles et lesquels sont complétés par les références populationnelles.',
    days3to5Heading: 'Jours 3 à 5 : précision directionnelle',
    p4: 'Après quelques jours, Tuwa dispose de suffisamment de lectures consécutives pour établir des tendances personnelles rudimentaires. Ta référence VFC commence à émerger. Les schémas de sommeil deviennent visibles. Les scores de récupération portent des intervalles de confiance plus larges à ce stade — le modèle apprend encore — mais le signal directionnel est fiable. Un score bas après un mauvais sommeil et un stress élevé reflète quelque chose de réel sur ton état actuel, même si le chiffre précis est encore en cours de calibrage.',
    day7Heading: 'Jour 7 et au-delà : les références personnelles se stabilisent',
    p5: 'Avec une semaine de données cohérentes, les références personnelles commencent à se stabiliser. Tuwa passe progressivement d\'un scoring pondéré par la population à un scoring pondéré par l\'individu au fur et à mesure que tes données s\'accumulent. Ce n\'est pas un basculement soudain — c\'est un transfert graduel, pondéré par la confiance dans les données. À la fin de ta première semaine, tes scores de récupération reflètent ta physiologie, pas un profil d\'athlète générique.',
    p6: 'Le suivi de la charge d\'entraînement fonctionne différemment : il est précis dès la première séance. La charge est calculée à partir de ce que tu enregistres réellement — séries, répétitions, charges, RPE — et ne dépend pas des tendances historiques. Ta première séance d\'entraînement produit un vrai chiffre de charge qui alimente directement le calcul de ta charge aiguë. Le modèle de charge n\'a pas besoin de semaines d\'historique pour commencer à fonctionner ; il a juste besoin que tu enregistres tes séances.',
  },
  honestySection: {
    heading: 'Pourquoi l\'honnêteté compte',
    p1: 'La fausse précision est pire que l\'incertitude reconnue. Si une application te dit « ton score de récupération est 84 » le premier jour sans aucune donnée physiologique derrière, ce chiffre est fabriqué. Les athlètes qui s\'en remettent à lui s\'entraînent sur la base d\'une fiction. Avec le temps, le décalage entre les résultats confiants de l\'application et leur ressenti subjectif érode entièrement la confiance dans l\'outil.',
    p2: 'Les athlètes sérieux ont déjà de bonnes intuitions sur leur propre récupération — construites au fil des années d\'entraînement, de compétition et d\'attention aux réactions de leur corps. L\'approche de démarrage à froid de Tuwa respecte ça. Pendant la période de calibrage, l\'application complète ton jugement plutôt que de l\'écraser avec une certitude fabriquée. Tu es informé de ce que le modèle sait et de ce qu\'il ne sait pas. Cette transparence est une fonctionnalité, pas une limitation.',
    p3: 'La transition des références populationnelles aux références personnelles est visible dans l\'application. Au fur et à mesure que les données s\'accumulent, tes intervalles de confiance se rétrécissent, tes scores deviennent plus précis, et les facteurs de raisonnement deviennent plus spécifiques à ta physiologie. Tu vois le modèle apprendre. Quand Tuwa fonctionne enfin sur ta référence personnelle, tu as vu le calibrage se produire — donc tu fais confiance au résultat d\'une façon que tu ne pourrais pas avec une application qui t\'aurait simplement donné des chiffres dès le premier jour.',
  },
};

export default coldStart;
