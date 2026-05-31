import type { TopicPageContent } from '../../topicPage';

const content: TopicPageContent = {
  "meta": {
    "title": "Tuwa pour les coachs — la forme de ton équipe",
    "description": "Vois la récupération et la charge de chaque athlète entre les séances. Connexion par code, e-mail ou NFC. L'athlète partage des scores composites, jamais ses données brutes."
  },
  "hero": {
    "outcomeStatement": "Vois comment chaque athlète récupère — avant de prescrire la prochaine séance",
    "hookLine": "Tuwa comble le vide entre les jours d'entraînement et donne aux coachs la forme de toute l'équipe, les tendances de charge et des séances prescrites — sans jamais exposer les données de santé brutes d'un athlète."
  },
  "sections": [
    {
      "heading": "Le problème : entre les séances, tu coaches à l'aveugle",
      "body": [
        "L'essentiel du coaching se joue dans l'angle mort que tu ne vois pas. Un athlète s'entraîne dur le lundi, dort mal le mardi, saute un repas le mercredi, et débarque le jeudi l'air en forme alors que son système nerveux ne l'est pas du tout. Le temps que tu le lises dans son échauffement — ou pire, dans un ischio claqué — la décision qui comptait était déjà prise.",
        "Les solutions de fortune ne passent pas à l'échelle. Les groupes de discussion se remplissent de captures d'écran. Les tableurs deviennent obsolètes. Les applis des objets connectés rapportent les données à l'athlète, pas à toi, et elles rapportent tout — fréquence cardiaque brute, phases de sommeil, mesures individuelles — ce qui est à la fois plus que nécessaire et une limite de vie privée que la plupart des athlètes ne franchiront pas avec un coach.",
        "Tuwa est conçu autour de ce qu'un coach a vraiment besoin de décider : cet athlète est-il prêt à pousser aujourd'hui, ou a-t-il besoin d'un travail plus léger ? Cette réponse devrait t'attendre à l'écran avant la première conversation, pas se reconstituer une fois la séance déjà terminée."
      ]
    },
    {
      "heading": "Ce que Tuwa t'apporte",
      "subheading": "La visibilité sur toute l'équipe, dans un seul tableau de bord",
      "body": [
        "Chaque athlète lié apparaît sur un unique tableau de bord coach avec son score de récupération actuel, sa tendance ACWR (ratio de charge aiguë:chronique) et son historique récent de séances. Pas de changement de compte, pas de relances — les données sont prêtes avant que ton premier athlète n'arrive.",
        "La visibilité ne compte que si elle change la prochaine décision : Tuwa met donc en avant les signaux qui guident la prescription — qui est dans le vert, qui se dirige vers un pic de charge dangereux, et qui a besoin d'un déload avant qu'il ne devienne obligatoire."
      ],
      "bullets": [
        "La forme quotidienne en un coup d'œil — les zones codées vert / jaune / rouge te disent instantanément qui peut encaisser une séance intense et qui a besoin d'un travail plus léger aujourd'hui.",
        "Suivi des tendances ACWR — repère les athlètes dont la charge aiguë monte trop vite face à leur base chronique, et interviens avant qu'une blessure ne force la conversation.",
        "Séances prescrites via modèles intelligents — crée une séance une fois avec des cibles de séries, répétitions, poids et plages de RPE (perception de l'effort), puis assigne-la à un individu ou à tout un groupe ; elle se charge directement dans le journal de l'athlète.",
        "Enregistre au nom des athlètes — capture séries, répétitions et RPE pendant les séances en présentiel pour que des données précises alimentent les calculs de charge sans que personne ne tape entre deux séries.",
        "Suivi automatique des records — les nouveaux records personnels remontent des séances enregistrées sans que l'athlète ait à les signaler."
      ]
    },
    {
      "heading": "Comment les athlètes se connectent — et ce qui reste privé",
      "body": [
        "Lier un athlète prend quelques secondes, avec trois méthodes selon ce qui convient sur le moment : partage un code d'invitation à six caractères à l'oral ou par message, envoie une invitation par e-mail sur laquelle l'athlète appuie pour se connecter instantanément, ou colle deux téléphones pour une connexion NFC lors d'une intégration en présentiel. Dès qu'il accepte, ton tableau de bord se met à jour avec ses données.",
        "Le consentement va dans un seul sens et l'athlète garde la main. Il choisit de se lier, il choisit ce que son profil partage, et il peut se délier à tout moment depuis son écran Profil — la connexion est coupée immédiatement, sans période de grâce ni accès résiduel pour le coach.",
        "Surtout, tu ne vois jamais les données HealthKit brutes. Les mesures HRV (variabilité de la fréquence cardiaque) individuelles, la fréquence cardiaque brute et le détail des phases de sommeil restent sur l'appareil de l'athlète et ne sont jamais transmis. Ce qui se synchronise vers toi, ce sont des scores composites et des résumés de séances : le score de récupération (0–100), le ratio ACWR, la tendance de charge sur 28 jours, et les logs de séances avec noms d'exercices, séries, répétitions et RPE. Assez pour bien coacher — pas assez pour compromettre la vie privée."
      ]
    },
    {
      "heading": "À qui ça s'adresse",
      "body": [
        "Tuwa convient aux coachs qui prennent des décisions de charge pour de vraies personnes et veulent les preuves devant eux, pas derrière. Le modèle fonctionne que tu encadres un athlète à distance ou que tu mènes une petite équipe en présentiel.",
        "Les coachs de force s'appuient sur les tendances ACWR et le suivi des records pour progresser les athlètes en sécurité et prescrire des séances adaptées au jour. Les coachs d'endurance se servent de la forme et des tendances de charge pour caler les efforts intenses, les semaines de récupération et l'affûtage. Les petites équipes et clubs utilisent la visibilité globale et les prescriptions de groupe pour gérer de nombreux athlètes depuis un seul compte, les données de chacun restant totalement isolées des autres.",
        "Si tu évalues déjà Tuwa pour tes athlètes, la page des fonctionnalités coaching, le détail du score de forme et la méthodologie derrière les chiffres sont les lectures qui s'imposent ensuite."
      ]
    }
  ],
  "related": {
    "heading": "Continue d'explorer",
    "links": [
      {
        "label": "Fonctionnalités Coach + Athlète",
        "href": "/features/coaching"
      },
      {
        "label": "Le score de forme, expliqué",
        "href": "/readiness-score"
      },
      {
        "label": "Notre méthodologie",
        "href": "/methodology"
      }
    ]
  }
};

export default content;
