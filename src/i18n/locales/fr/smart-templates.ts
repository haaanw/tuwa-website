import type { SmartTemplates } from '../en/smart-templates';

const smartTemplates: SmartTemplates = {
  meta: {
    title: 'Modèles d\'entraînement intelligents',
    description:
      'Des séances prescrites, pas des suppositions. Tuwa permet aux coachs de créer des modèles d\'entraînement structurés avec des groupes d\'exercices nommés, des séries cibles et des objectifs de charge et de répétitions.',
  },
  hero: {
    outcomeStatement: 'Des séances prescrites, pas des suppositions',
    hookLine: 'Des modèles d\'entraînement structurés qui font le lien entre ce que ton coach prescrit et ce que tu exécutes.',
    screenshotAlt: 'Application Tuwa affichant une séance d\'entraînement en cours avec les exercices prescrits, les séries cibles et les objectifs de charge issus d\'un modèle de coach',
  },
  howItWorks: {
    heading: 'Comment ça fonctionne',
    p1: 'Les coachs créent des modèles d\'entraînement directement dans Tuwa en utilisant des groupes d\'exercices nommés — des structures comme « Force haut du corps A », « Chaîne postérieure » ou « Finisher cardio ». Chaque groupe contient des exercices avec des séries cibles, des plages de répétitions, des objectifs de charge et des cibles RPE (effort perçu). Le modèle capture non seulement ce qu\'il faut faire, mais aussi l\'intensité et l\'ordre, reflétant la logique d\'une vraie programmation plutôt qu\'une simple liste d\'exercices.',
    prescriptionToExecutionHeading: 'De la prescription à l\'exécution sans friction',
    p2: 'Quand un coach prescrit un modèle à un athlète, il apparaît directement dans l\'application de l\'athlète, prêt à démarrer. Les athlètes chargent la prescription dans leur séance — les espaces réservés pour les cibles pré-remplissent le journal pour qu\'ils sachent exactement ce qui est prescrit pour chaque série. Pas de traduction depuis une feuille de calcul, pas de ressaisie manuelle des charges de la session précédente. La prescription est là, l\'athlète l\'exécute, et tout est capturé automatiquement.',
    p3: 'La performance réelle est enregistrée en regard de la prescription. L\'athlète a-t-il atteint la charge cible ? Combien de répétitions a-t-il fait ? Quel était son effort perçu en fin de série ? Ce relevé côte à côte — prescrit vs réalisé — est là que réside la vraie valeur pour le coaching. Une semaine de séances où l\'athlète atteint systématiquement une intensité inférieure à la prescription est un signal. Tout comme de la dépasser systématiquement.',
    autoregulationHeading: 'L\'autorégulation en complément de la prescription',
    p4: 'Les séances prescrites sont un point de départ, pas un plafond. Quand le score de récupération d\'un athlète est bas, Tuwa superpose des recommandations d\'autorégulation au modèle — en suggérant des plafonds RPE et des ajustements de volume qui adaptent la séance à l\'état actuel de l\'athlète. La prescription fournit toujours la structure ; les données de récupération fournissent le calibrage. Un athlète qui réalise 70 % du volume prescrit un jour en zone rouge s\'entraîne plus intelligemment — il ne fait pas l\'impasse.',
    connectHeading: 'Connexion par code d\'invitation, email ou NFC',
    p5: 'Lier un compte coach et un compte athlète prend moins d\'une minute. Les coachs partagent un code d\'invitation, un lien par email ou une mise en contact NFC pour le jumelage en personne. Une fois liés, le coach voit l\'historique complet d\'entraînement de l\'athlète, ses scores de récupération et ses journaux de séances. Les prescriptions sont transmises du coach à l\'athlète en temps réel. Tuwa gère la connexion — toi, tu te concentres sur la relation d\'entraînement.',
  },
  realProgramming: {
    heading: 'Conçu pour une vraie programmation',
    p1: 'La plupart des applications d\'entraînement traitent les séances comme de simples listes d\'exercices à plat. Les coachs, eux, pensent en blocs, en phases et en schémas de mouvement. Ils construisent des programmes où l\'échauffement prépare l\'athlète aux mouvements principaux, où le travail accessoire cible des lacunes spécifiques, où le cardio est séquencé pour soutenir — et non saper — le travail de force effectué plus tôt dans la séance.',
    p2: 'La structure des modèles Tuwa respecte cette logique. Les groupes d\'exercices donnent aux séances une architecture interne. Un modèle « Préparation compétition » est différent d\'un modèle « Phase hypertrophie A », non seulement dans le choix des exercices mais aussi dans la façon dont le travail est organisé et séquencé. Cette structure est préservée quand les athlètes exécutent la séance et quand les coachs analysent les données.',
    p3: 'Les modèles persistent également dans le temps. Un coach crée un programme de force une fois ; les athlètes l\'exécutent à répétition sur des semaines ou des mois. La progression est suivie par rapport au modèle — pas seulement de séance en séance, mais sur toute la durée du bloc de programmation. Les coachs peuvent voir si un athlète progresse sur les mouvements clés, stagne, ou montre des signes de fatigue accumulée via l\'ACWR et les scores de récupération. Les données racontent l\'histoire de la programmation sans que le coach ait à reconstituer les pièces manuellement.',
  },
};

export default smartTemplates;
