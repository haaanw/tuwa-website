import type { TopicPageContent } from '../../topicPage';

const content: TopicPageContent = {
  "meta": {
    "title": "Qu'est-ce qu'un score de forme et comment l'utiliser",
    "description": "Un score de forme quotidien transforme VFC, fréquence cardiaque au repos, sommeil et bilan matinal en un seul chiffre. Découvre ce qu'il mesure et comment agir."
  },
  "hero": {
    "outcomeStatement": "Sache exactement à quelle intensité pousser aujourd'hui",
    "hookLine": "Un score de forme est un chiffre transparent qui te dit si tu dois pousser, maintenir ou lever le pied — construit à partir de tout ce que ton corps t'indique."
  },
  "sections": [
    {
      "heading": "Ce qu'est vraiment un score de forme quotidien",
      "body": [
        "Un score de forme — parfois appelé score de récupération — est un chiffre unique, généralement sur une échelle de 0 à 100, qui estime à quel point ton corps est prêt à encaisser un entraînement intense aujourd'hui. Ce n'est pas un verdict sur ta condition physique ni sur ta discipline. C'est un instantané de ton état physiologique actuel : à quel point ton système nerveux a récupéré durant la nuit, comparé à ce qu'il montre habituellement.",
        "Ce qui rend un score utile, c'est que les signaux sous-jacents sont difficiles à lire isolément. Ta variabilité de la fréquence cardiaque (VFC — la variation du temps entre des battements consécutifs) est peut-être en baisse, mais tu as bien dormi et ta fréquence cardiaque au repos est normale. Feu vert ou feu rouge ? Le score de forme fait la pesée pour toi, condensant plusieurs données bruitées en une seule décision sur laquelle tu peux agir avant de t'entraîner.",
        "Surtout, un bon score de forme est toujours relatif à toi. Un athlète avec une VFC au repos de 45 ms n'est pas moins récupéré qu'un autre à 80 ms — la question est de savoir si ta VFC du jour se situe au-dessus ou en dessous de ta propre tendance récente. C'est ce cadrage personnel qui distingue un vrai signal de forme d'un indicateur de bien-être générique."
      ]
    },
    {
      "heading": "Les quatre données et leur pondération",
      "subheading": "VFC, fréquence cardiaque au repos, sommeil et bilan matinal",
      "body": [
        "Tuwa construit ton score à partir de quatre données, chacune comparée à ta référence personnelle plutôt qu'à une moyenne de population. La VFC est le signal isolé le plus fort : quand tu es bien récupéré, l'activité parasympathique (repos et digestion) domine et la VFC monte ; quand tu es fatigué, stressé ou en train de combattre une maladie, le tonus sympathique (combat ou fuite) grimpe et la VFC chute. La fréquence cardiaque au repos apporte une confirmation — une fréquence au repos élevée le matin corrobore souvent une VFC abaissée.",
        "Le sommeil contribue par sa durée et sa qualité. Une nuit courte ou fragmentée augmente le coût d'une séance intense, donc elle tire le score vers le bas même quand tes indicateurs cardiaques semblent bons. Le bilan de bien-être matinal, c'est là qu'entre ton ressenti subjectif dans le modèle : tu évalues tes courbatures, ton énergie et ton stress, et ces réponses peuvent l'emporter sur la physiologie quand, par exemple, tu te sens vidé malgré des chiffres impeccables.",
        "Aucune donnée seule ne dicte le score. La pondération s'appuie sur la VFC et la fréquence cardiaque au repos comme ancrages physiologiques objectifs, puis s'ajuste selon le sommeil et ton auto-évaluation. Comme tout est mesuré par rapport à ta propre référence évolutive — calculée avec une méthode de moyenne qui donne plus de poids aux jours récents qu'aux anciens — une lecture isolée anormale fait rarement basculer le chiffre à elle seule."
      ],
      "bullets": [
        "VFC : le signal principal de récupération du système nerveux autonome, comparé à ta tendance récente",
        "Fréquence cardiaque au repos : un marqueur de confirmation qui évolue souvent à l'inverse de la VFC en cas de fatigue",
        "Durée et qualité du sommeil : un sommeil court ou haché augmente le coût réel d'un entraînement intense",
        "Bilan de bien-être matinal : courbatures, énergie et stress laissent ton état subjectif ajuster la physiologie"
      ]
    },
    {
      "heading": "Comment agir selon ton score : pousser, maintenir ou lever le pied",
      "body": [
        "Un score n'est utile que s'il change ce que tu fais. Tuwa associe la forme à trois zones aux implications concrètes pour l'entraînement. Le vert signifie pleine capacité — réalise ta séance telle que prévue. Le jaune signifie récupération modérée — entraîne-toi, mais réduis le volume total d'environ 10 à 20 % et plafonne l'intensité ressentie de chaque série (ton RPE, l'effort perçu sur une échelle de 1 à 10). Le rouge signifie que ton corps envoie un vrai signal de besoin de récupération — mouvement léger, mobilité ou repos.",
        "La forme devient bien plus puissante associée à la charge d'entraînement. Un score vert un jour où ta charge aiguë est déjà en train de grimper n'est pas une invitation à en ajouter — c'est la permission d'exécuter une séance intense prévue sans en rajouter. Un score rouge pendant un bloc chargé, c'est l'alerte précoce qui te permet de décharger avant qu'une blessure n'impose la conversation. La récupération te dit combien tu peux dépenser aujourd'hui ; la charge te dit combien tu as déjà dépensé.",
        "Le but n'est pas de courir après un chiffre parfait chaque matin. C'est d'arrêter d'avoir le même débat de volonté avec toi-même à 6 h. Quand les données disent de lever le pied, tu lèves le pied sans culpabilité ; quand elles disent d'y aller, tu t'engages sans hésiter. Au fil des semaines, cette régularité — pousser quand tu es prêt, maintenir quand tu ne l'es pas — est ce qui se transforme en adaptation plutôt qu'en effondrement."
      ]
    },
    {
      "heading": "Pourquoi il est transparent, pas une boîte noire",
      "body": [
        "Un score que tu ne comprends pas est un score auquel tu ne feras pas confiance — et que tu finiras par ignorer. C'est pourquoi Tuwa accompagne chaque chiffre d'une explication en langage clair. Il ne te dit pas seulement que ta forme est à 62 ; il t'explique que ta VFC est 8 % en dessous de ta référence récente, que ton sommeil a été écourté, mais que ta fréquence cardiaque au repos est normale. Tu vois le score et le pourquoi derrière, pour appliquer un jugement que l'algorithme ne peut pas avoir.",
        "La transparence signifie aussi que les données restent les tiennes. Tes lectures HealthKit brutes — mesures de VFC individuelles, données brutes de fréquence cardiaque, détail des phases de sommeil — ne quittent jamais ton appareil. Le calcul du score s'exécute en local et fonctionne hors ligne, donc tu obtiens un chiffre chaque matin que tu aies du réseau ou non. Seuls les scores composites se synchronisent, uniquement pour l'accès multi-appareils.",
        "Et le score est utile dès le premier jour. Tuwa démarre avec des références de population pour te donner des conseils sensés immédiatement, puis bascule discrètement vers ta tendance personnelle à mesure qu'il apprend tes schémas individuels au fil des premières semaines. Tu ne restes jamais devant un écran vide à attendre que le modèle se mette en route."
      ]
    }
  ],
  "related": {
    "heading": "Continue d'explorer",
    "links": [
      {
        "label": "Le score de récupération dans l'app",
        "href": "/features/recovery-scoring"
      },
      {
        "label": "La méthodologie derrière Tuwa",
        "href": "/methodology"
      },
      {
        "label": "Charge d'entraînement et ACWR",
        "href": "/training-load"
      }
    ]
  },
  "references": {
    "heading": "Pour aller plus loin",
    "items": [
      {
        "label": "Plews et al. — Suivi de la VFC chez les athlètes d'élite",
        "url": "https://pubmed.ncbi.nlm.nih.gov/23852425/"
      },
      {
        "label": "Gabbett — Le paradoxe prévention-blessure (charge aiguë:chronique)",
        "url": "https://bjsm.bmj.com/content/50/5/273"
      },
      {
        "label": "Apple HealthKit — données de VFC et de sommeil",
        "url": "https://developer.apple.com/documentation/healthkit"
      }
    ]
  }
};

export default content;
