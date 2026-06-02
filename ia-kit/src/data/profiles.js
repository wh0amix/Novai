const profiles = {
  captain: {
    title: 'Le Capitaine',
    emoji: '🧭',
    tagline: 'Vous savez piloter l\'IA avec discernement',
    description:
      'Vous utilisez l\'IA comme un outil d\'aide, tout en gardant toujours le contrôle. Vous vérifiez les informations, ajoutez du contexte quand c\'est nécessaire et prenez en compte ce que vous connaissez du terrain. Vous ne validez pas automatiquement une décision simplement parce que l\'IA la propose.',
    strengths: [
      'Vous vérifiez avant d\'agir',
      'Vous gardez un regard critique',
      'Vous adaptez les réponses de l\'IA à la réalité du terrain',
      'Vous ne laissez pas l\'IA décider seule',
    ],
    advice:
      'Continuez à utiliser l\'IA comme un appui, mais gardez toujours cette logique : l\'IA propose, vous vérifiez, puis vous décidez. C\'est cette rigueur qui fait une bonne utilisation de l\'IA.',
  },
  explorer: {
    title: 'L\'Explorateur',
    emoji: '🔍',
    tagline: 'Vous découvrez progressivement l\'IA',
    description:
      'Vous voyez l\'intérêt de l\'IA, mais vous hésitez encore sur la meilleure façon de l\'utiliser. Vous avez souvent les bons réflexes, mais vous ne pensez pas toujours à donner assez de contexte ou à préciser clairement votre demande. Ce n\'est pas négatif : vous êtes en phase d\'apprentissage.',
    improvements: [
      'Donner plus de contexte à l\'IA',
      'Préciser les contraintes dès le départ',
      'Demander une nouvelle version si la première ne convient pas',
      'Relire et adapter avant d\'utiliser la réponse',
    ],
    advice:
      'Avant d\'utiliser l\'IA, prenez quelques secondes pour expliquer clairement votre situation. Plus votre demande est précise, plus la réponse sera utile. Par exemple, au lieu de "fais-moi un planning", précisez les contraintes de l\'équipe, les absences, les horaires impossibles ou les priorités.',
  },
  skeptic: {
    title: 'Le Sceptique',
    emoji: '🤔',
    tagline: 'Vous restez vigilant face à l\'IA',
    description:
      'Vous restez méfiant face à l\'IA. Cette prudence peut être positive, surtout avec les données sensibles, les décisions importantes ou les informations clients. Cependant, risque de rejeter complètement l\'IA, même dans des situations où elle pourrait simplement aider à gagner du temps.',
    applications: [
      'Reformuler un message ou une communication',
      'Organiser et structurer des idées',
      'Créer une première version de rapport',
      'Résumer une information non confidentielle',
    ],
    advice:
      'L\'idée n\'est pas de faire confiance à l\'IA les yeux fermés, mais de l\'utiliser sur des tâches simples et peu risquées. Vous gardez toujours le dernier mot sur les décisions importantes. L\'IA est un assistant, pas un décideur.',
  },
};

export default profiles;
