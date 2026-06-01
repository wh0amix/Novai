const scenarios = [
  {
    id: 'stock-shortage',
    title: 'Rupture de stock',
    context:
      "Vous êtes manager du rayon frais. L'IA de votre enseigne vous alerte : d'après les données météo et l'historique des ventes, une rupture de stock sur les salades est probable ce week-end. Que faites-vous ?",
    choices: [
      {
        id: 'a',
        label: "Je fais confiance à l'IA et je commande 30 % de salades en plus immédiatement.",
        profile: 'captain',
        feedback:
          "Bonne réactivité ! L'IA analyse des milliers de données (météo, historique, tendances) que vous ne pouvez pas traiter seul. Faire confiance à ses alertes tout en gardant un œil critique est la bonne approche. Attention toutefois à vérifier que la prévision tient compte d'éventuels événements locaux.",
      },
      {
        id: 'b',
        label: "Je croise l'alerte IA avec mon expérience terrain avant de décider du volume de commande.",
        profile: 'explorer',
        feedback:
          "Excellente approche hybride ! L'IA fournit une base de données solide, mais votre connaissance du terrain (travaux à proximité, événement local, habitudes spécifiques de vos clients) peut affiner la décision. C'est cette complémentarité humain + IA qui crée le plus de valeur.",
      },
      {
        id: 'c',
        label: "Je ne change rien à ma commande habituelle. Mon expérience suffit pour anticiper la demande.",
        profile: 'skeptic',
        feedback:
          "L'expérience terrain est précieuse, mais ignorer systématiquement les alertes IA, c'est se priver d'un outil puissant. L'IA traite des volumes de données impossibles à analyser manuellement. Le risque ici : une vraie rupture de stock et des clients mécontents. L'enjeu n'est pas de remplacer votre expertise, mais de l'augmenter.",
      },
    ],
  },
  {
    id: 'team-planning',
    title: "Planning d'équipe",
    context:
      "Le siège déploie un nouvel outil IA qui génère automatiquement les plannings de votre équipe en fonction de l'affluence prévue. Un de vos employés, jeune parent, se retrouve systématiquement planifié le samedi. Il vient vous voir, mécontent. Que faites-vous ?",
    choices: [
      {
        id: 'a',
        label: "Je modifie manuellement le planning en ajoutant ses contraintes personnelles dans l'outil IA.",
        profile: 'captain',
        feedback:
          "C'est la bonne démarche ! L'IA optimise selon des critères de performance (affluence, compétences), mais elle ne connaît pas les contraintes humaines si on ne les lui fournit pas. Votre rôle de manager est justement de paramétrer l'outil avec ces informations pour qu'il produise un planning à la fois efficace et humain.",
      },
      {
        id: 'b',
        label: "J'organise une réunion d'équipe pour co-construire les règles de planification à intégrer dans l'outil.",
        profile: 'explorer',
        feedback:
          "Approche très collaborative ! Impliquer l'équipe dans la définition des règles de l'IA favorise l'adhésion au changement. C'est aussi un excellent moyen de détecter des biais dans l'algorithme. L'IA est un outil au service du collectif, pas l'inverse.",
      },
      {
        id: 'c',
        label: "L'IA a été mise en place par le siège, ce n'est pas à moi de modifier ses décisions.",
        profile: 'skeptic',
        feedback:
          "Attention : l'IA est un outil d'aide à la décision, pas un décideur. En tant que manager, vous restez responsable du bien-être de votre équipe et des décisions finales. Appliquer aveuglément les suggestions d'une IA sans recul humain, c'est abdiquer votre rôle managérial. Vous avez toujours le dernier mot.",
      },
    ],
  },
  {
    id: 'director-report',
    title: 'Rapport au directeur',
    context:
      "Votre directeur régional vous demande d'utiliser un outil IA qui génère automatiquement vos rapports de performance mensuels. Le rapport généré est globalement correct, mais vous remarquez une erreur : l'IA attribue la hausse des ventes bio à une promotion, alors que c'est le résultat d'une action locale que vous avez menée. Que faites-vous ?",
    choices: [
      {
        id: 'a',
        label: "Je corrige l'erreur, j'ajoute le contexte manquant et j'envoie le rapport en précisant mes modifications.",
        profile: 'captain',
        feedback:
          "Parfait ! L'IA génère une base de travail rapide, mais c'est à vous de valider, corriger et enrichir avec le contexte terrain. Un rapport IA non relu peut contenir des erreurs factuelles ou des corrélations erronées. Votre valeur ajoutée de manager, c'est justement cette relecture critique.",
      },
      {
        id: 'b',
        label: "Je renvoie le rapport tel quel en signalant l'erreur au service IT pour améliorer l'outil.",
        profile: 'explorer',
        feedback:
          "Signaler l'erreur au service IT est une bonne initiative pour améliorer l'outil à long terme. Mais envoyer un rapport avec une erreur connue n'est pas idéal pour votre crédibilité. La meilleure pratique : corriger d'abord, puis remonter le bug. Vous êtes le garant de la fiabilité de ce qui sort sous votre nom.",
      },
      {
        id: 'c',
        label: "J'envoie le rapport tel quel. L'IA est plus fiable que moi pour analyser les chiffres.",
        profile: 'skeptic',
        feedback:
          "C'est risqué. L'IA excelle dans le traitement de données, mais elle ne comprend pas le contexte. Elle peut confondre corrélation et causalité. Un rapport envoyé sous votre nom avec des erreurs, c'est votre crédibilité qui en pâtit. L'IA produit un brouillon intelligent ; la validation humaine reste indispensable.",
      },
    ],
  },
];

export default scenarios;
