const scenarios = [
  {
    id: 'stock-shortage',
    title: 'Rupture de stock :',
    subtitle: 'anticiper grâce aux données',
    context:
      "Vous êtes manager du rayon frais. L'IA de votre enseigne vous alerte : d'après les données météo et l'historique des ventes, une rupture de stock sur les salades est probable ce week-end. Que faites-vous ?",
    choices: [
      {
        id: 'a',
        title: "Faire confiance à l'IA",
        label: "Je commande 30 % de salades en plus immédiatement sur la base de l'alerte IA.",
        profile: 'captain',
        points: 80,
        feedback:
          "Bonne réactivité ! L'IA analyse des milliers de données (météo, historique, tendances) que vous ne pouvez pas traiter seul. Faire confiance à ses alertes tout en gardant un œil critique est la bonne approche. Attention toutefois à vérifier que la prévision tient compte d'éventuels événements locaux.",
      },
      {
        id: 'b',
        title: "Croiser avec mon expérience",
        label: "Je croise l'alerte IA avec mon expérience terrain avant de décider du volume de commande.",
        profile: 'explorer',
        points: 100,
        feedback:
          "Excellente approche hybride ! L'IA fournit une base de données solide, mais votre connaissance du terrain (travaux à proximité, événement local, habitudes spécifiques de vos clients) peut affiner la décision. C'est cette complémentarité humain + IA qui crée le plus de valeur.",
      },
      {
        id: 'c',
        title: "Ignorer l'alerte",
        label: "Je ne change rien à ma commande habituelle. Mon expérience suffit pour anticiper la demande.",
        profile: 'skeptic',
        points: 30,
        feedback:
          "L'expérience terrain est précieuse, mais ignorer systématiquement les alertes IA, c'est se priver d'un outil puissant. L'IA traite des volumes de données impossibles à analyser manuellement. Le risque ici : une vraie rupture de stock et des clients mécontents. L'enjeu n'est pas de remplacer votre expertise, mais de l'augmenter.",
      },
    ],
  },
  {
    id: 'team-planning',
    title: "Planning d'équipe :",
    subtitle: "l'humain avant l'algorithme",
    context:
      "Le siège déploie un nouvel outil IA qui génère automatiquement les plannings de votre équipe en fonction de l'affluence prévue. Un de vos employés, jeune parent, se retrouve systématiquement planifié le samedi. Il vient vous voir, mécontent. Que faites-vous ?",
    choices: [
      {
        id: 'a',
        title: "Faire confiance à l'IA",
        label: "Vous approuvez le planning généré par l'IA sans modification et l'envoyez aux équipes.",
        profile: 'captain',
        points: 85,
        feedback:
          "C'est la bonne démarche ! L'IA optimise selon des critères de performance (affluence, compétences), mais elle ne connaît pas les contraintes humaines si on ne les lui fournit pas. Votre rôle de manager est justement de paramétrer l'outil avec ces informations pour qu'il produise un planning à la fois efficace et humain.",
      },
      {
        id: 'b',
        title: "Ajuster manuellement",
        label: "Vous vérifiez le planning et ajustez en fonction des contraintes individuelles que vous connaissez.",
        profile: 'explorer',
        points: 100,
        feedback:
          "Approche très collaborative ! Impliquer l'équipe dans la définition des règles de l'IA favorise l'adhésion au changement. C'est aussi un excellent moyen de détecter des biais dans l'algorithme. L'IA est un outil au service du collectif, pas l'inverse.",
      },
      {
        id: 'c',
        title: "Demander à l'IA de refaire le planning",
        label: "Vous partagez le planning avec l'équipe pour recueillir leurs retours avant validation.",
        profile: 'skeptic',
        points: 20,
        feedback:
          "Attention : l'IA est un outil d'aide à la décision, pas un décideur. En tant que manager, vous restez responsable du bien-être de votre équipe et des décisions finales. Appliquer aveuglément les suggestions d'une IA sans recul humain, c'est abdiquer votre rôle managérial. Vous avez toujours le dernier mot.",
      },
    ],
  },
  {
    id: 'director-report',
    title: 'Rapport au directeur :',
    subtitle: 'vérifier avant d\'envoyer',
    context:
      "Votre directeur régional vous demande d'utiliser un outil IA qui génère automatiquement vos rapports de performance mensuels. Le rapport généré est globalement correct, mais vous remarquez une erreur : l'IA attribue la hausse des ventes bio à une promotion, alors que c'est le résultat d'une action locale que vous avez menée. Que faites-vous ?",
    choices: [
      {
        id: 'a',
        title: "Corriger et enrichir le rapport",
        label: "Je corrige l'erreur, j'ajoute le contexte manquant et j'envoie le rapport en précisant mes modifications.",
        profile: 'captain',
        points: 90,
        feedback:
          "Parfait ! L'IA génère une base de travail rapide, mais c'est à vous de valider, corriger et enrichir avec le contexte terrain. Un rapport IA non relu peut contenir des erreurs factuelles ou des corrélations erronées. Votre valeur ajoutée de manager, c'est justement cette relecture critique.",
      },
      {
        id: 'b',
        title: "Signaler le bug au service IT",
        label: "Je renvoie le rapport tel quel en signalant l'erreur au service IT pour améliorer l'outil.",
        profile: 'explorer',
        points: 65,
        feedback:
          "Signaler l'erreur au service IT est une bonne initiative pour améliorer l'outil à long terme. Mais envoyer un rapport avec une erreur connue n'est pas idéal pour votre crédibilité. La meilleure pratique : corriger d'abord, puis remonter le bug. Vous êtes le garant de la fiabilité de ce qui sort sous votre nom.",
      },
      {
        id: 'c',
        title: "Envoyer tel quel",
        label: "J'envoie le rapport tel quel. L'IA est plus fiable que moi pour analyser les chiffres.",
        profile: 'skeptic',
        points: 15,
        feedback:
          "C'est risqué. L'IA excelle dans le traitement de données, mais elle ne comprend pas le contexte. Elle peut confondre corrélation et causalité. Un rapport envoyé sous votre nom avec des erreurs, c'est votre crédibilité qui en pâtit. L'IA produit un brouillon intelligent ; la validation humaine reste indispensable.",
      },
    ],
  },
];

export default scenarios;
