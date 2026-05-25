import type { Coaching } from '../en/coaching';

const coaching: Coaching = {
  meta: {
    title: 'Coach + Athlète — Tuwa',
    description:
      "Visibilité en temps réel sur la récupération de chaque athlète que tu encadres. Tuwa connecte coachs et athlètes via des données de charge partagées, des séances prescrites et une gestion d'équipe par invitation.",
  },
  hero: {
    outcomeStatement: 'Visibilité en temps réel sur la récupération de chaque athlète',
    hookLine:
      "Connecte-toi à tes athlètes. Vois leur état de forme. Prescris des séances qui s'adaptent à leur récupération.",
    screenshotAlt: 'Capture d\'écran Coach + Athlète — bientôt disponible',
  },
  howItWorks: {
    heading: 'Comment ça marche',
    p1: "Le modèle coach-athlète de Tuwa offre aux coachs une vue tableau de bord unifiée du score de récupération, des tendances ACWR et de l'historique récent de chaque athlète lié — depuis un seul écran. Fini de courir après les athlètes pour avoir des nouvelles ou de deviner qui risque le surentraînement : les données sont prêtes avant même le début de la première séance de la journée.",
    p2: "L'avantage clé de la visibilité en temps réel, c'est le timing. Un coach qui connaît le score de forme d'un athlète avant de prescrire la séance du jour peut ajuster sur le moment — réduire le volume, remplacer un effort intense par une journée technique, ou recommander un repos complet. C'est fondamentalement différent d'analyser les données après coup et de réaliser qu'un athlète s'est entraîné intensément avec une récupération compromise.",
    p3: "Pour les séances en présentiel où les athlètes s'entraînent sans toucher leur téléphone, les coachs peuvent enregistrer des séances au nom de leurs athlètes directement depuis leur compte coach. Les séances sont attribuées au profil de l'athlète et alimentent ses calculs de charge exactement comme s'il les avait saisies lui-même. C'est particulièrement utile dans les environnements d'entraînement collectif où la capture précise des données en temps réel est essentielle.",
    p4: "Tout partage de données est basé sur le consentement. Les athlètes choisissent explicitement de se lier à un coach, et peuvent se délier à tout moment. Dès qu'un athlète se délie, le coach perd immédiatement tout accès à ses données — pas de période de grâce, pas de visibilité résiduelle. Cette conception reflète un principe fondamental : le coaching améliore l'entraînement de l'athlète, il ne prend pas le contrôle de son autonomie.",
    p5: "Les coachs n'ont pas accès aux données brutes HealthKit. Les lectures HealthKit — mesures HRV individuelles, données brutes de fréquence cardiaque, détails des phases de sommeil — restent sur l'appareil de l'athlète et ne sont jamais transmises. Ce que les coachs voient, ce sont des scores composites et des résumés de séances : le score de récupération (0–100), le ratio ACWR, la tendance de charge sur les 28 derniers jours, et les logs de séances avec noms d'exercices, séries, répétitions et RPE. Suffisant pour prendre de bonnes décisions de coaching, sans compromettre la vie privée des athlètes.",
  },
  coachAthlete: {
    athleteHeading: 'Pour les athlètes',
    athleteP1:
      "Te lier à un coach lui donne une fenêtre structurée sur ton entraînement — scores de récupération, tendances de charge et logs de séances — mais jamais tes données de santé brutes. Tes mesures HRV, tes phases de sommeil et tes relevés de fréquence cardiaque restent sur ton appareil. Ton coach voit des données agrégées de forme et de performance, les mêmes informations que tu vois sur ton tableau de bord, présentées de son point de vue.",
    athleteP2:
      "Quand ton coach prescrit une séance, elle se charge directement dans ta session avec des paramètres cibles — séries prescrites, répétitions, poids et plages de RPE que tu peux suivre ou ajuster selon comment tu te sens ce jour-là. La prescription s'intègre naturellement dans ton workflow de saisie habituel, sans jongler entre plusieurs applications ou plans d'entraînement papier.",
    athleteP3:
      "Tu gardes le contrôle tout au long. Délie-toi de ton coach à tout moment depuis l'écran Profil — la connexion est coupée immédiatement et ton coach perd tout accès. Pas d'attente, pas de processus d'approbation. Le coaching améliore ton entraînement ; il ne te le prend pas.",
    coachHeading: 'Pour les coachs',
    coachP1:
      "Vois la forme quotidienne de chaque athlète en un coup d'œil. Les zones codées par couleur — vert, jaune, rouge — te disent immédiatement qui est prêt pour une séance intense et qui a besoin d'un travail plus léger aujourd'hui. Pas besoin de vérifier individuellement auprès de chaque athlète, pas de supposition basée sur leur apparence à l'échauffement. Les données sont prêtes avant ta première conversation.",
    coachP2:
      "Analyse les tendances ACWR pour repérer les athlètes qui s'approchent de pics de charge dangereux avant qu'ils ne surviennent. Quand la charge aiguë d'un athlète monte trop vite par rapport à sa base chronique, Tuwa le signale. Tu as les informations nécessaires pour intervenir — réduire le volume de la semaine, reporter une semaine test, ou sortir l'athlète d'une séance de groupe à forte charge — avant qu'une blessure ne force la conversation.",
    coachP3:
      "Enregistre des séances au nom des athlètes pendant les entraînements en présentiel, crée des modèles de séances et assigne-les à des individus ou des groupes, et suis les records personnels sans que les athlètes aient besoin de les signaler eux-mêmes. Ces outils sont conçus pour réduire la charge administrative et te permettre de te concentrer sur ce qu'est vraiment le coaching — lire les athlètes et prendre les bonnes décisions.",
  },
  teamFeatures: {
    heading: "Workflows d'équipe",
    p1: "Gère plusieurs athlètes depuis un seul compte coach. Ton tableau de bord coach présente tous les athlètes liés en une seule vue, avec les scores de récupération et l'état de charge visibles d'un coup d'œil — pas de changement de compte, pas de connexions séparées par athlète.",
    p2: "Les données de chaque athlète sont entièrement isolées. Les athlètes ne peuvent pas voir les scores de récupération, les tendances ACWR ou l'historique des séances des uns et des autres. La visibilité d'équipe est unidirectionnelle : les coachs voient les athlètes, les athlètes voient leurs propres données et les prescriptions de leur coach. Cette séparation est importante dans les environnements compétitifs où les données d'entraînement sont sensibles.",
    p3: "Les prescriptions de groupe te permettent de créer un modèle de séance une seule fois et de l'assigner simultanément à plusieurs athlètes. Chaque athlète reçoit le modèle comme séance prescrite dans son journal d'entraînement, avec les mêmes paramètres cibles. Ensuite, tu suis l'exécution individuelle et les performances réelles par rapport à la prescription — qui a atteint les objectifs, qui a réduit la charge, et comment cela a correspondu à leur score de forme ce jour-là.",
    p4: "Le suivi des records personnels fait remonter automatiquement les PRs des athlètes à partir de leurs séances enregistrées. Tu vois les nouveaux records au moment où ils sont établis sans que les athlètes aient besoin de les signaler. C'est un détail qui comble le fossé entre ce qui se passe à l'entraînement et ce dont tu as conscience en tant que coach.",
  },
  inviteFlow: {
    heading: 'Connecte-toi en quelques secondes',
    intro:
      "Trois façons de lier des athlètes à ton compte coach, selon ce qui est pratique sur le moment. Aucune friction entre la décision d'entraîner quelqu'un et le fait d'avoir ses données visibles.",
    codeMethod:
      "Code d'invitation à 6 caractères — Génère un code depuis ton écran Profil et partage-le verbalement ou par message. Fonctionne dans n'importe quel contexte.",
    emailMethod:
      "Invitation par e-mail — Envoie un lien profond à l'e-mail de l'athlète. Il appuie sur le lien et la connexion est établie instantanément.",
    nfcMethod:
      'Connexion NFC — Tiens les téléphones ensemble. Idéal pour les séances en présentiel où tu intègres des athlètes sur le moment.',
    howConnectionLabel: 'Comment fonctionne la connexion',
    step1: 'Le coach appuie sur « Inviter un athlète » dans son écran Profil',
    step2: "Partage le code d'invitation, envoie un lien par e-mail, ou utilise la connexion NFC",
    step3: "L'athlète entre le code ou appuie sur le lien dans son application",
    step4: "Connecté — le tableau de bord du coach se met à jour immédiatement avec les données de l'athlète",
  },
};

export default coaching;
