import type { TopicPageContent } from '../../topicPage';

const content: TopicPageContent = {
  "meta": {
    "title": "La science derrière Tuwa : méthodologie",
    "description": "Comment Tuwa construit ton score de préparation et ton modèle de charge — la science du sport, les sources de données et les limites honnêtes, expliquées simplement."
  },
  "hero": {
    "outcomeStatement": "La science derrière chaque chiffre que Tuwa t'affiche",
    "hookLine": "Aucune boîte noire. Voici exactement comment fonctionnent le score de préparation et le modèle de charge, d'où viennent les données, et ce qu'ils peuvent — ou non — te dire."
  },
  "sections": [
    {
      "heading": "Comment se compose le score de préparation",
      "subheading": "Quatre signaux physiologiques, pondérés par rapport à ta propre base",
      "body": [
        "Chaque matin, Tuwa récupère tes données physiologiques nocturnes depuis Apple HealthKit et les combine à un court bilan de forme pour produire un score de préparation unique entre 0 et 100. Les entrées ne sont pas traitées de façon égale, et aucune n'est jugée par rapport à une norme de population — chaque signal est comparé à ta propre tendance récente.",
        "La variabilité de la fréquence cardiaque (VFC — la variation, à la milliseconde, entre des battements consécutifs) est l'entrée la plus fortement pondérée, car elle reflète l'équilibre du système nerveux autonome plus directement que tout autre signal grand public. La fréquence cardiaque au repos ajoute une seconde vue, plus lente, du stress systémique. La durée et la régularité du sommeil capturent la fenêtre de récupération elle-même. Le bilan de forme du matin — où tu évalues courbatures, énergie et stress — apporte le contexte qu'aucun objet connecté ne peut mesurer.",
        "Tuwa pondère chaque facteur selon son écart au-dessus ou en dessous de ta base personnelle, puis les combine. Un score de 62 n'est jamais qu'un chiffre : l'app te dit que ta VFC est 8 % sous ta base récente, que ton sommeil a été court, mais que ta fréquence cardiaque au repos est normale. Tu vois le raisonnement, pas seulement le verdict."
      ]
    },
    {
      "heading": "Le modèle de charge d'entraînement",
      "subheading": "Charge aiguë versus chronique, ACWR et la plage 0,8–1,3",
      "body": [
        "Chaque séance que tu enregistres est convertie en une valeur de charge à partir du volume et de l'intensité (avec l'RPE — l'effort perçu, l'échelle de 1 à 10 mesurant la difficulté d'une série — et, en option, les RIR, répétitions en réserve). Tuwa maintient ensuite deux vues de cette charge : la charge aiguë, environ la dernière semaine, qui reflète la fatigue actuelle, et la charge chronique, environ les quatre dernières semaines, qui reflète ta base de condition physique.",
        "Le ratio entre les deux est le ratio charge aiguë:chronique (ACWR). Le consensus scientifique, issu des travaux de Tim Gabbett et ses collègues, situe une « zone idéale » relative entre environ 0,8 et 1,3. En dessous de 0,8, tu t'entraînes peut-être trop peu par rapport à ta base ; au-dessus de 1,3, la courbe du risque de blessure tend à monter fortement, ton corps absorbant en une semaine plus de stress qu'il n'y a été préparé.",
        "Plutôt que de simples sommes glissantes, Tuwa calcule ces charges avec des moyennes mobiles exponentiellement pondérées (EWMA) — une méthode de lissage qui donne plus de poids aux séances récentes qu'aux anciennes. Ton modèle réagit ainsi vite à un bloc intense ou à un déchargement au lieu d'être ancré à des données vieilles de plusieurs semaines, et il signale les pics avant que tu t'entraînes, pas après."
      ]
    },
    {
      "heading": "Données et confidentialité",
      "subheading": "Sur l'appareil par défaut, utilisable hors ligne, synchronisation des seuls résultats composites",
      "body": [
        "Tes données HealthKit brutes — chaque mesure de VFC, chaque échantillon de fréquence cardiaque, chaque enregistrement de sommeil — restent sur ton appareil. Tuwa les lit localement pour calculer tes scores et n'envoie jamais les flux physiologiques sous-jacents à un serveur.",
        "L'app fonctionne entièrement hors ligne. Le calcul des scores, de la charge et la détection des pics s'exécutent sur l'appareil : une connexion instable ou une salle en sous-sol n'interrompt jamais l'analyse.",
        "Les fonctionnalités pour le coach ne synchronisent que les résultats composites — ton score de préparation et tes indicateurs de charge — jamais les données biométriques brutes qui les sous-tendent. Tu partages la conclusion, pas le dossier complet de ton système nerveux."
      ]
    },
    {
      "heading": "Limites honnêtes",
      "subheading": "Ce que le modèle peut et ne peut pas faire",
      "body": [
        "Tuwa est utile dès le premier jour, car il démarre avec des bases de population raisonnables, mais sa vraie valeur est personnelle. Durant les sept premiers jours environ, il apprend ta propre VFC, ta fréquence cardiaque au repos et tes habitudes de sommeil, et le score de préparation devient nettement plus précis à mesure que ces bases se stabilisent. Les premiers scores sont à lire comme une direction, pas comme une précision.",
        "Aucun modèle bâti sur des objets connectés grand public n'est parfait. La VFC est bruitée — un verre de vin, un réveil matinal ou une mauvaise nuit peuvent déplacer une mesure isolée — et c'est précisément pourquoi Tuwa suit des tendances plutôt que de réagir à des points de données isolés. Le cadre ACWR décrit des associations de risque de blessure au niveau d'une population, pas des garanties individuelles ; il éclaire tes décisions, il ne les prend pas à ta place.",
        "Tuwa est un outil d'entraînement, pas un dispositif médical. Il ne diagnostique ni maladie, ni blessure, ni aucune condition de santé, et rien dans l'app ne constitue un avis médical. Si un indicateur t'inquiète ou si tu te sens mal, consulte un professionnel qualifié."
      ]
    }
  ],
  "references": {
    "heading": "Sources primaires",
    "items": [
      {
        "label": "Gabbett TJ (2016). The training–injury prevention paradox: should athletes be training smarter and harder? British Journal of Sports Medicine, 50(5), 273–280.",
        "url": "https://bjsm.bmj.com/content/50/5/273"
      },
      {
        "label": "Hulin BT, Gabbett TJ, et al. (2016). The acute:chronic workload ratio predicts injury: high chronic workload may decrease injury risk. British Journal of Sports Medicine, 50(4), 231–236.",
        "url": "https://bjsm.bmj.com/content/50/4/231"
      }
    ]
  },
  "related": {
    "heading": "Aller plus loin",
    "links": [
      {
        "label": "Score de récupération",
        "href": "/features/recovery-scoring"
      },
      {
        "label": "Suivi de charge",
        "href": "/features/workload-tracking"
      },
      {
        "label": "Le score de préparation expliqué",
        "href": "/readiness-score"
      },
      {
        "label": "La charge d'entraînement expliquée",
        "href": "/training-load"
      }
    ]
  }
};

export default content;
