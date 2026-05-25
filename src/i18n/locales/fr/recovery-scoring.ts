import type { RecoveryScoring } from '../en/recovery-scoring';

const recoveryScoring: RecoveryScoring = {
  meta: {
    title: 'Score de récupération — Tuwa',
    description:
      'Sache exactement à quelle intensité t\'entraîner aujourd\'hui. Tuwa synthétise la VFC, la fréquence cardiaque au repos, le sommeil et ton état de forme en un score de forme quotidien.',
  },
  hero: {
    outcomeStatement: 'Sache exactement à quelle intensité pousser aujourd\'hui',
    hookLine: 'Un score de forme unique construit à partir de tout ce que ton corps t\'indique.',
    screenshotAlt:
      'Application Tuwa — écran de récupération affichant un score de forme quotidien avec tendance VFC codée par couleur, fréquence cardiaque au repos, durée de sommeil et facteurs de bien-être',
  },
  howItWorks: {
    heading: 'Comment ça fonctionne',
    deviceAlt: 'Écran de score de récupération Tuwa affichant le score de forme quotidien avec zones codées par couleur',
    p1: 'Chaque matin, avant que tu n\'attrapes une barre ou ne laçes tes chaussures, Tuwa a déjà effectué l\'analyse. Pendant que tu dormais, il a récupéré tes données physiologiques depuis Apple HealthKit — variabilité de la fréquence cardiaque, fréquence cardiaque au repos, durée du sommeil, tendance de température corporelle et estimation du VO2 Max — et les a combinées avec ton bilan de bien-être matinal, où tu évalues tes courbatures, ton niveau d\'énergie et ton stress. Ces données alimentent un algorithme de score composite qui produit un chiffre de forme unique entre 0 et 100.',
    p2: 'Ce chiffre est utile en lui-même, mais il prend encore plus de valeur associé à des facteurs d\'explication en langage clair. Tuwa ne te dit pas seulement que ta forme est à 62 — il t\'explique que ta VFC est 8 % en dessous de ta référence récente, que ton sommeil a été écourtée, mais que ta fréquence cardiaque au repos est normale. Tu comprends non seulement le score, mais aussi pourquoi.',
    threeZonesHeading: 'Trois zones, des conseils clairs',
    p3: 'Les scores de récupération correspondent à trois zones, chacune avec des implications concrètes pour l\'entraînement. Le vert signifie pleine capacité — réalise ta séance telle que prévue. Le jaune signifie récupération modérée — entraîne-toi, mais réduis le volume total de 10–20 % et garde l\'RPE modéré. Le rouge signifie que ton corps envoie un vrai signal de besoin de récupération — mouvement léger, mobilité ou repos. Pas de devinettes, pas de lutte de volonté avec toi-même. Les données tranchent.',
  },
  deviceCompatibility: {
    heading: 'Données de n\'importe quel appareil que tu possèdes déjà',
    p1: 'Tuwa fonctionne avec le matériel que tu portes déjà. Apple Watch est la source la plus courante, mais Whoop, Oura, Garmin et tout autre appareil qui écrit des données de VFC et de sommeil dans Apple HealthKit s\'intègre directement dans le pipeline de scoring. Tu n\'es pas lié à un nouvel écosystème de wearables — Tuwa s\'adapte à ce que tu as.',
  },
  personalBaseline: {
    heading: 'Une référence qui t\'appartient, pas celle de la population',
    p1: 'Les valeurs de VFC varient énormément d\'un individu à l\'autre — un athlète avec une VFC au repos de 45 ms n\'est pas moins bien qu\'un autre avec 80 ms, ils sont juste différents. Ce qui compte, c\'est de savoir si ta VFC est au-dessus ou en dessous de ta propre tendance récente. Tuwa calcule cette tendance en utilisant une méthode de moyenne qui donne plus de poids aux jours récents qu\'aux anciens. Au lieu d\'être perturbée par une lecture isolée anormale, ta référence évolue naturellement au fil des semaines et des mois, à mesure que ta condition physique et tes habitudes de récupération changent.',
  },
  scienceSection: {
    heading: 'La science derrière tout ça',
    p1: 'La variabilité de la fréquence cardiaque est la variation du temps entre des battements cardiaques consécutifs, mesurée en millisecondes. Un cœur parfaitement métronome — chaque intervalle exactement identique — est en fait un signe de stress. Les cœurs en bonne santé montrent une légère variation battement-par-battement parce qu\'ils répondent aux signaux du système nerveux autonome, qui équilibre les branches sympathique (combat ou fuite) et parasympathique (repos et digestion).',
    p2: 'Quand tu es bien récupéré, l\'activité parasympathique est dominante et la VFC est plus élevée. Quand tu es stressé, fatigué ou en train de combattre une maladie, le tonus sympathique augmente et la VFC chute. C\'est pourquoi la VFC est devenue l\'un des biomarqueurs les plus étudiés en science du sport au cours des vingt dernières années — c\'est une fenêtre sur l\'état actuel de ton système nerveux.',
    p3: 'Mais la VFC est aussi bruitée. Une mauvaise nuit de sommeil, un verre de vin, un réveil inhabituellement matinal — tout cela affecte une mesure isolée. Comparer ta lecture du lundi à celle du dimanche de manière isolée est trompeur. Le signal émerge au fil du temps, c\'est pourquoi Tuwa suit ta tendance personnelle plutôt que des points de données individuels. Le graphique ci-dessous illustre comment chaque source de données contribue à ton score de forme composite.',
  },
};

export default recoveryScoring;
