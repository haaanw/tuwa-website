import type { TopicPageContent } from '../../topicPage';

const content: TopicPageContent = {
  "meta": {
    "title": "Tuwa face aux trackers fitness génériques",
    "description": "Comment Tuwa se distingue des trackers fitness génériques et des apps de récupération boîte noire — charge et récupération en une seule décision, fondée sur l'ACWR et la VFC."
  },
  "hero": {
    "outcomeStatement": "Choisis l'outil qui répond vraiment à « à quelle intensité m'entraîner aujourd'hui ? »",
    "hookLine": "La plupart des trackers comptent ce que tu as fait. Tuwa relie ta charge d'entraînement à ta récupération pour te dire quoi faire ensuite."
  },
  "sections": [
    {
      "heading": "Ce que les trackers génériques font bien — et où ils s'arrêtent",
      "body": [
        "Les trackers fitness génériques sont vraiment bons pour ce pour quoi ils ont été conçus. Ils comptent les pas, estiment les calories, enregistrent les séances, cartographient tes courses et tiennent un historique d'activité bien rangé. Si ton objectif est de bouger plus, de fermer quelques anneaux et de voir un résumé hebdomadaire, c'est un choix tout à fait adapté — et Tuwa ne cherche pas à le remplacer.",
        "L'écart apparaît dès que l'entraînement devient sérieux. Les pas et les calories ne disent rien sur le fait que la séance prévue aujourd'hui soit judicieuse au vu des trois dernières semaines de travail. Beaucoup de trackers affichent aussi un chiffre unique de « récupération » ou de « forme », mais il arrive comme une boîte noire : un nombre sans entrées visibles, sans contexte d'entraînement, et sans explication que tu puisses contester. On te demande de lui faire confiance les yeux fermés.",
        "Cette boîte noire, c'est la vraie limite. Un score de forme construit uniquement à partir du sommeil et de la fréquence cardiaque de la nuit ignore l'autre moitié de l'équation — combien de stress d'entraînement tu as réellement accumulé. Un score peut afficher vert alors que ta charge aiguë dépasse largement ta base chronique, soit exactement la situation où le risque de blessure grimpe. Récupération et charge sont les deux moitiés d'une même décision ; les lire séparément laisse la question la plus importante sans réponse."
      ]
    },
    {
      "heading": "Ce que Tuwa fait différemment",
      "body": [
        "Tuwa est construit autour d'une question à laquelle les trackers génériques ne répondent pas pleinement : compte tenu de tout ce que mon corps m'indique et de tout ce que je lui ai récemment demandé, à quelle intensité dois-je m'entraîner aujourd'hui ? Y répondre suppose de tenir récupération et charge d'entraînement dans la même vue, pas sur des écrans séparés dans des apps séparées.",
        "Côté récupération, Tuwa synthétise la VFC (variabilité de la fréquence cardiaque), la fréquence cardiaque au repos, le sommeil et un court bilan de bien-être matinal en un score de forme unique entre 0 et 100 — puis montre les facteurs d'explication en langage clair. Côté charge, il suit ta charge aiguë (la dernière semaine environ) face à ta charge chronique (les quatre dernières semaines environ) à l'aide des EWMA (moyennes mobiles exponentiellement pondérées), qui pèsent davantage les séances récentes, et signale les pics de charge avant que tu exécutes une séance plutôt qu'après.",
        "Le scoring est transparent à dessein. Tuwa ne te dit pas seulement que ta forme est à 62 — il t'explique que ta VFC est en dessous de ta référence récente et que ton sommeil a été court, pour que tu puisses confronter le verdict à ton propre jugement. Il est aussi utile dès le premier jour : des références de population issues de la littérature scientifique validée donnent un vrai guidage immédiatement, puis cèdent progressivement la place à ta référence personnelle à mesure que tes propres données s'accumulent."
      ]
    },
    {
      "heading": "Tracker fitness générique vs. Tuwa",
      "subheading": "Une comparaison « adapté à l'usage », pas un règlement de comptes",
      "body": [
        "Aucun des deux outils n'est universellement « meilleur » — ils répondent à des questions différentes. Voici le contraste honnête pour quiconque décide de ce qu'un entraînement sérieux exige vraiment."
      ],
      "comparison": {
    "columns": [
      "Dimension",
      "Tracker générique",
      "Tuwa"
    ],
    "rows": [
      {
        "label": "Question principale",
        "generic": "« Qu’ai-je fait ? » — historique d’activité",
        "tuwa": "« Que faire aujourd’hui ? » — une décision d’entraînement"
      },
      {
        "label": "Signal de récupération",
        "generic": "Un chiffre boîte noire aux entrées cachées",
        "tuwa": "Score transparent : VFC, FC au repos, sommeil, bien-être"
      },
      {
        "label": "Charge d’entraînement",
        "generic": "Pas, calories, journaux — sans contexte aigu:chronique",
        "tuwa": "Suivi ACWR avec EWMA et détection des pics avant la séance"
      },
      {
        "label": "Charge + récupération",
        "generic": "Séparées, ou contexte de charge absent",
        "tuwa": "Combinées en une seule décision de forme"
      },
      {
        "label": "Fondement scientifique",
        "generic": "Propriétaire, souvent non documenté",
        "tuwa": "ACWR validé par Gabbett et al. ; VFC très étudiée"
      },
      {
        "label": "Confidentialité",
        "generic": "Données traitées dans le cloud",
        "tuwa": "HealthKit brut sur l’appareil ; seuls les scores composites se synchronisent"
      },
      {
        "label": "Saisie de la séance",
        "generic": "Séries tapées écran par écran",
        "tuwa": "Tape la séance en une phrase, ou enregistre chaque série directement — puis confirme le brouillon"
      },
      {
        "label": "Délai avant utilité",
        "generic": "Variable ; parfois des semaines",
        "tuwa": "Utile dès le premier jour, puis se personnalise"
      }
    ]
  }
    },
    {
      "heading": "Comment choisir",
      "body": [
        "Si tu veux une conscience générale de ton activité — mouvement quotidien, calories, un journal de séance décontracté — un tracker fitness grand public couvre bien ça et Tuwa serait plus que ce dont tu as besoin. Il n'y a aucune honte à choisir adapté à l'usage ; le meilleur outil est celui qui correspond à la tâche.",
        "Tuwa est fait pour le cas où les enjeux sont plus élevés : tu suis un vrai programme, tu pousses près de tes limites, et une séance dure mal placée te coûte des semaines. Dans cette situation, tu as besoin de lire charge et récupération ensemble, d'un scoring que tu peux interroger, et de données qui restent les tiennes. Tuwa fonctionne avec le wearable que tu possèdes déjà — Apple Watch, Whoop, Oura, Garmin, tout ce qui écrit la VFC et le sommeil dans Apple HealthKit — donc le choisir ne veut pas dire acheter du nouveau matériel.",
        "Si tu veux voir exactement comment le score de forme et le modèle de charge sont construits avant de leur faire confiance, la page méthodologie en expose les mécanismes en détail."
      ]
    }
  ],
  "related": {
    "heading": "Aller plus loin",
    "links": [
      {
        "label": "Score de récupération",
        "href": "/features/recovery-scoring"
      },
      {
        "label": "Suivi de charge d'entraînement",
        "href": "/features/workload-tracking"
      },
      {
        "label": "Méthodologie",
        "href": "/methodology"
      }
    ]
  }
};

export default content;
