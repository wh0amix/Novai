const profiles = {
  captain: {
    title: 'Le Capitaine',
    emoji: '🧭',
    tagline: 'Vous utilisez l\'IA comme copilote, sans lui laisser prendre toute la place',
    description:
      'Le Capitaine est le profil qui utilise l\'IA de la manière la plus équilibrée. Il comprend que l\'IA peut faire gagner du temps, aider à structurer une réponse, proposer une organisation ou repérer un problème, sans suivre ses propositions automatiquement.',
    details: [
      'Ce profil garde toujours un regard critique. Il vérifie les informations, ajoute du contexte quand c\'est nécessaire et compare les réponses de l\'IA avec ce qu\'il connaît du terrain.',
      'Par exemple, s\'il reçoit une recommandation de commande, il ne valide pas directement : il vérifie aussi les stocks, les fournisseurs ou les contraintes du magasin.',
      'Ce profil montre la bonne posture : l\'IA accompagne le travail, mais ne remplace pas l\'expérience du manager.',
    ],
    strengths: [
      'Il utilise l\'IA pour gagner du temps',
      'Il vérifie avant d\'agir',
      'Il adapte les réponses à la réalité du magasin',
      'Il ne partage pas d\'informations sensibles sans faire attention',
      'Il garde toujours la décision finale',
    ],
    vigilance:
      'Même avec de bons réflexes, il faut continuer à rester attentif. Une réponse bien formulée par l\'IA peut quand même contenir une erreur ou manquer de contexte.',
    advice:
      'Continuez à utiliser l\'IA comme un outil d\'aide. Le bon réflexe à garder : l\'IA propose, vous vérifiez, vous adaptez, puis vous décidez.',
  },
  explorer: {
    title: 'L\'Explorateur',
    emoji: '🔍',
    tagline: 'Vous avez compris l\'intérêt de l\'IA, mais vous apprenez encore à bien l\'utiliser',
    description:
      'L\'Explorateur est un profil en phase d\'apprentissage. Il voit que l\'IA peut être utile dans le travail, mais il ne sait pas toujours comment bien formuler sa demande ou comment interpréter la réponse obtenue.',
    details: [
      'Il peut parfois manquer de précision dans ses consignes. Par exemple, demander un planning sans indiquer toutes les contraintes de l\'équipe, ou un rapport sans expliquer le contexte commercial.',
      'Dans ce cas, l\'IA peut produire une réponse correcte en apparence, mais pas totalement adaptée à la réalité.',
      'Bien utiliser l\'IA ne dépend pas seulement de l\'outil : cela dépend aussi de la manière dont on lui parle, du contexte fourni et de la relecture humaine.',
      'Ce profil peut aussi vouloir être très précis pour obtenir une meilleure réponse. Mais il faut se limiter : ne jamais partager des données confidentielles, clients, internes ou sensibles dans un outil non sécurisé.',
    ],
    improvements: [
      'Donner plus de contexte à l\'IA',
      'Préciser les contraintes dès le départ',
      'Demander une nouvelle version si la première réponse ne convient pas',
      'Éviter de partager des données sensibles avec l\'IA',
      'Relire avant d\'utiliser la réponse',
      'Éviter de copier-coller directement ce que l\'IA propose',
    ],
    strengths: [
      'Il ose tester l\'IA',
      'Il comprend qu\'elle peut faire gagner du temps',
      'Il ne rejette pas l\'outil',
      'Il commence à repérer certaines limites',
    ],
    vigilance:
      'Une demande trop vague donne souvent une réponse trop générale. L\'IA peut être utile, mais elle a besoin d\'être guidée.',
    advice:
      'Avant d\'utiliser l\'IA, prenez quelques secondes pour préciser la situation : le contexte, l\'objectif, les contraintes et ce que vous attendez. Plus votre demande est claire, plus la réponse sera utile.',
  },
  skeptic: {
    title: 'Le Sceptique',
    emoji: '🤔',
    tagline: 'Vous êtes prudent avec l\'IA, mais vous pourriez l\'utiliser sur des tâches simples et encadrées',
    description:
      'Le Sceptique est un profil qui se méfie de l\'IA. Cette prudence est compréhensible, surtout dans un contexte professionnel avec des données sensibles, des décisions importantes ou des informations clients.',
    details: [
      'Ce profil a un bon réflexe : il ne fait pas confiance aveuglément à l\'IA. Il sait qu\'elle peut se tromper, inventer des informations ou donner une réponse qui ne prend pas en compte la réalité du terrain.',
      'Le risque est de rejeter complètement l\'outil, même dans des situations où il pourrait simplement faire gagner du temps.',
      'L\'objectif n\'est pas de forcer tout le monde à utiliser l\'IA, mais d\'apprendre à l\'utiliser au bon moment, sur les bonnes tâches et avec les bonnes limites.',
    ],
    strengths: [
      'Il reste prudent',
      'Il ne laisse pas l\'IA décider à sa place',
      'Il évite de partager trop facilement des données sensibles',
      'Il garde une vraie place au jugement humain',
    ],
    applications: [
      'Demander à l\'IA de reformuler un mail',
      'Organiser des idées avant une réunion',
      'Préparer une première version de rapport',
      'Résumer une information non confidentielle',
      'Créer une base de message à relire et adapter ensuite',
    ],
    vigilance:
      'Être prudent est important, mais ignorer totalement l\'IA peut aussi faire perdre du temps ou faire passer à côté d\'un outil utile.',
    advice:
      'Commencez par une tâche simple, sans donnée sensible. Le but n\'est pas de laisser l\'IA décider, mais de voir comment elle peut vous aider dans certaines étapes du travail.',
  },
};

export default profiles;
