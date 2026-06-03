const scenarios = [
  {
    id: 'stock-shortage',
    video: '/videos/Mise_en_situation_stock.mp4',
    title: 'Rupture de stock : ',
    subtitle: 'anticiper grâce aux données',
    contextLabel: 'Retranscription',
    context:
      "Vous êtes manager du rayon frais. Un outil d'IA vous alerte sur un risque de rupture de stock sur les yaourts avant jeudi et vous recommande de commander automatiquement 200 unités. Mais vous savez qu'un élément important du terrain peut fausser cette recommandation : votre fournisseur habituel sera en grève la semaine prochaine. Cette information n'a pas forcément été intégrée par l'IA. Dans cette situation, quel est votre bon réflexe ?",
    choices: [
      {
        id: 'a',
        profile: 'explorer',
        title: "Je valide la commande, l'IA a les données",
        label: "Je valide la commande, l'IA a les données.",
        points: 0,
        feedback:
          "Ce choix est risqué. L'IA a bien repéré un possible problème de stock, mais elle n'avait pas toutes les informations du terrain. Ici, elle ne savait pas que le fournisseur habituel serait en grève. La commande ne serait pas livrée à temps, et le rayon se retrouverait presque vide en fin de semaine. À retenir : L'IA peut alerter, mais il faut toujours vérifier avant d'agir.",
      },
      {
        id: 'b',
        profile: 'skeptic',
        title: "J'ignore la recommandation et je gère comme d'habitude",
        label: "J'ignore la recommandation et je gère comme d'habitude.",
        points: 0.5,
        feedback:
          "Ce choix n'est pas idéal. Même si l'IA peut se tromper, elle peut aussi signaler un vrai risque. En l'ignorant complètement, vous passez à côté d'une information utile. La rupture arrive plus vite que prévu et le rayon manque de produits avant jeudi. À retenir : Il ne faut pas tout accepter, mais il ne faut pas non plus tout rejeter. Le mieux est de vérifier.",
      },
      {
        id: 'c',
        profile: 'captain',
        title: "Je vérifie d'abord les infos fournisseur",
        label: "Je vérifie d'abord les informations fournisseur.",
        points: 1,
        feedback:
          "Bon réflexe. Vous repérez le problème à temps et vous adaptez la commande. Vous contactez un autre fournisseur ou vous ajustez la quantité pour limiter la rupture. Vous utilisez l'IA comme une aide, mais vous ne lui faites pas confiance les yeux fermés. En vérifiant les informations du fournisseur, vous évitez une mauvaise décision. À retenir : L'IA aide à repérer un problème, mais le manager garde la décision finale.",
      },
    ],
  },
  {
    id: 'team-planning',
    image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=800&q=80',
    title: "Planning d'équipe : ",
    subtitle: "l'humain avant l'algorithme",
    context:
      "L'IA vous propose un planning d'équipe en quelques secondes. À première vue, tout semble bien organisé : les horaires sont équilibrés et les besoins du magasin sont couverts. Mais vous voyez que Sophie est placée en fermeture vendredi soir. Pourtant, vous savez qu'elle ne peut pas être là ce soir-là, car elle vous l'avait déjà signalé. Quel est votre premier réflexe face à cette proposition ?",
    choices: [
      {
        id: 'a',
        profile: 'explorer',
        title: "Je publie le planning tel quel",
        label: "Je publie le planning tel quel.",
        points: 0,
        feedback:
          "Ce choix peut poser problème. Le planning est publié, mais Sophie rappelle qu'elle ne peut pas être présente vendredi soir. Il faut modifier l'organisation en urgence, ce qui crée du stress et des tensions dans l'équipe. L'IA a proposé un planning logique, mais elle ne connaissait pas toutes les contraintes de l'équipe. À retenir : Un planning généré par l'IA doit toujours être vérifié par quelqu'un qui connaît l'équipe.",
      },
      {
        id: 'b',
        profile: 'skeptic',
        title: "Je modifie manuellement le créneau de Sophie",
        label: "Je modifie manuellement le créneau de Sophie.",
        points: 0.5,
        feedback:
          "Bonne réaction. Vous gardez la base proposée par l'IA, mais vous l'adaptez à la réalité de votre équipe. Le planning est corrigé avant d'être envoyé à l'équipe. Sophie n'est plus placée sur le créneau impossible, et l'organisation reste stable. À retenir : L'IA peut faire gagner du temps, mais le manager doit toujours ajuster selon le terrain.",
      },
      {
        id: 'c',
        profile: 'captain',
        title: "Je demande à l'IA de refaire le planning avec la contrainte de Sophie",
        label: "Je demande à l'IA de refaire le planning avec la contrainte de Sophie.",
        points: 1,
        feedback:
          "Très bonne approche. L'IA recalcule le planning en prenant en compte la contrainte de Sophie. Elle propose une nouvelle répartition plus adaptée, que vous pouvez ensuite relire avant de la valider. À retenir : Plus on donne de contexte à l'IA, plus sa réponse peut être utile.",
      },
    ],
  },
  {
    id: 'director-report',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60',
    title: 'Rapport au directeur : ',
    subtitle: 'vérifier avant d\'envoyer',
    context:
      "Votre directeur attend un rapport à 10h. Pour gagner du temps, vous utilisez l'IA afin de mettre en forme les chiffres de vente et rédiger une première version. L'IA indique une baisse de 12 % par rapport à l'année dernière. Le chiffre est bon, mais il manque une information importante : l'année dernière, il y avait eu une opération commerciale exceptionnelle qui avait fortement augmenté les ventes. Sans cette précision, le rapport peut donner une mauvaise impression. Que faites-vous ?",
    choices: [
      {
        id: 'a',
        profile: 'explorer',
        title: "J'envoie le rapport tel quel",
        label: "J'envoie le rapport tel quel.",
        points: 0,
        feedback:
          "Ce choix est risqué. Le rapport est envoyé rapidement, mais il donne une lecture incomplète de la situation. Le directeur peut penser que les résultats sont mauvais, alors que la baisse s'explique surtout par l'opération exceptionnelle de l'année précédente. À retenir : L'IA peut calculer et rédiger, mais elle ne comprend pas toujours le contexte métier.",
      },
      {
        id: 'b',
        profile: 'skeptic',
        title: "Je réécris tout le rapport moi-même",
        label: "Je réécris tout le rapport moi-même.",
        points: 0.5,
        feedback:
          "Ce choix est sûr, mais pas forcément le plus efficace. Le rapport est plus juste, car vous ajoutez le contexte nécessaire. Mais vous perdez beaucoup de temps alors que l'IA pouvait déjà vous aider à structurer une première base. À retenir : L'IA peut être utile pour préparer une première version, tant qu'elle est relue et complétée.",
      },
      {
        id: 'c',
        profile: 'captain',
        title: "Je garde la base de l'IA et j'ajoute le contexte moi-même",
        label: "Je garde la base de l'IA et j'ajoute le contexte moi-même.",
        points: 1,
        feedback:
          "C'est la meilleure solution. Le rapport est envoyé à temps, avec une analyse plus claire. L'IA vous a aidé à gagner du temps sur la structure, et vous avez ajouté l'information essentielle pour éviter une mauvaise interprétation. À retenir : L'IA fait une partie du travail, mais l'humain apporte le sens, le contexte et la décision finale.",
      },
    ],
  },
  {
    id: 'sales-analysis-confidentiality',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
    title: 'Analyse des ventes et confidentialité : ',
    subtitle: 'protéger les données stratégiques',
    context:
      "Vous êtes responsable du rayon frais et vous devez analyser les mauvaises performances du dernier trimestre. Pour gagner du temps, vous décidez d'utiliser une IA grand public (comme ChatGPT ou Claude) pour dégager des tendances. Vous disposez d'un fichier Excel brut qui contient les volumes de ventes, mais aussi les noms de vos fournisseurs locaux, vos marges commerciales exactes et les identifiants de vos employés. Comment procédez-vous avec ce fichier ?",
    choices: [
      {
        id: 'a',
        profile: 'captain',
        title: "Je nettoie d'abord le fichier",
        label: "Je nettoie d'abord le fichier (supprimer marges, noms, identifiants).",
        points: 1,
        feedback:
          "C'est le réflexe parfait ! L'IA vous fournit une excellente analyse des tendances de vente sans compromettre la sécurité de votre magasin. Vous avez compris qu'il ne faut jamais entrer de données confidentielles dans un outil non sécurisé. À retenir : L'IA est une aide précieuse pour analyser les données, à condition de toujours les anonymiser au préalable.",
      },
      {
        id: 'b',
        profile: 'skeptic',
        title: "Je n'utilise pas l'IA pour ça",
        label: "Je n'utilise pas l'IA pour ça (trop de risques).",
        points: 0.5,
        feedback:
          "C'est une réaction très prudente, mais qui vous prive du gain de temps que l'IA peut offrir aux managers. Vos données sont en sécurité totale, mais vous avez perdu une demi-journée de travail sur le terrain à faire des tableaux croisés dynamiques vous-même. À retenir : L'IA peut vous faire gagner beaucoup de temps, apprenez simplement à filtrer ce que vous lui confiez.",
      },
      {
        id: 'c',
        profile: 'explorer',
        title: "Je donne le fichier Excel tel quel à l'IA",
        label: "Je donne le fichier Excel tel quel à l'IA.",
        points: 0,
        feedback:
          "C'est une erreur majeure. L'analyse est bonne, mais vous venez d'alimenter une base de données externe avec les marges secrètes de votre enseigne et les données personnelles de vos équipes. À retenir : Ne partagez jamais de données confidentielles, de marges financières ou d'informations sur vos équipes avec une IA publique.",
      },
    ],
  },
  {
    id: 'hr-data-confidentiality',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60',
    title: 'Données RH et confidentialité : ',
    subtitle: 'anonymiser avant de partager',
    context:
      "Vous souhaitez demander à une IA de vous aider à préparer les entretiens annuels de votre équipe. Pour cela, vous envisagez de copier les évaluations individuelles des collaborateurs, avec leurs noms et commentaires. Quel comportement devriez-vous privilégier ?",
    choices: [
      {
        id: 'a',
        profile: 'skeptic',
        title: "Je n'utilise pas l'IA",
        label: "Je n'utilise pas l'IA (trop de risques RH).",
        points: 0.5,
        feedback:
          "Une utilisation sécurisée reste possible lorsqu'elle respecte les règles de l'entreprise. Aucun risque mais aucun gain de temps. À retenir : Le bon usage consiste à concilier efficacité et protection des données.",
      },
      {
        id: 'b',
        profile: 'explorer',
        title: "Je copie toutes les informations dans l'outil",
        label: "Je copie toutes les informations dans l'outil.",
        points: 0,
        feedback:
          "Ce comportement présente un risque important pour la confidentialité. Des données personnelles et confidentielles sont partagées sans garantie sur leur utilisation. À retenir : Les données RH ne doivent pas être transmises à n'importe quel outil IA.",
      },
      {
        id: 'c',
        profile: 'captain',
        title: "J'anonymise les informations et je respecte les règles internes",
        label: "J'anonymise les informations et je respecte les règles internes.",
        points: 1,
        feedback:
          "C'est la meilleure pratique. Vous obtenez une aide à la préparation tout en protégeant les données personnelles. À retenir : La confidentialité reste une responsabilité du manager.",
      },
    ],
  },
  {
    id: 'product-assortment',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60',
    title: 'Proposition d\'assortiment rayon : ',
    subtitle: 'équilibrer données et contexte',
    context:
      "L'IA analyse les ventes du rayon et vous recommande de retirer plusieurs références de produits régionaux qui se vendent moins que les autres. À la place, elle propose d'augmenter les produits à forte rotation pour optimiser les ventes. Cependant, vous savez que les produits régionaux sont particulièrement appréciés par vos clients et contribuent à l'image du magasin. Comment réagissez-vous à cette recommandation ?",
    choices: [
      {
        id: 'a',
        profile: 'explorer',
        title: "J'applique la recommandation de l'IA telle quelle",
        label: "J'applique la recommandation de l'IA telle quelle.",
        points: 0,
        feedback:
          "Ce choix est risqué. L'IA s'est basée sur les volumes de vente, mais elle n'a pas pris en compte les attentes spécifiques de votre clientèle ni l'image du magasin. Les références régionales sont retirées du rayon, mais plusieurs clients habitués regrettent leur disparition. À retenir : Une recommandation de l'IA doit toujours être confrontée à la réalité du terrain.",
      },
      {
        id: 'b',
        profile: 'captain',
        title: "J'analyse la recommandation et j'adapte l'assortiment",
        label: "J'analyse la recommandation et j'adapte l'assortiment.",
        points: 1,
        feedback:
          "Très bonne approche. Vous conservez les références régionales les plus appréciées tout en optimisant certaines gammes moins performantes. Le rayon reste attractif pour les clients et cohérent avec les objectifs commerciaux. À retenir : L'IA fournit des recommandations, mais le manager reste le mieux placé pour prendre la décision finale.",
      },
      {
        id: 'c',
        profile: 'skeptic',
        title: "Je conserve l'assortiment actuel sans tenir compte de l'analyse",
        label: "Je conserve l'assortiment actuel sans tenir compte de l'analyse.",
        points: 0.5,
        feedback:
          "Ce choix est prudent, mais il vous prive d'informations potentiellement utiles. L'IA peut apporter un éclairage intéressant sur les performances du rayon. Certaines opportunités d'amélioration ne sont pas étudiées. À retenir : Ignorer systématiquement les recommandations de l'IA n'est pas plus efficace que les appliquer sans réflexion.",
      },
    ],
  },
  {
    id: 'promo-team-brief',
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60',
    title: 'Brief d\'équipe avant opération promo : ',
    subtitle: 'adapter l\'IA à la réalité terrain',
    context:
      "Une grosse opération promotionnelle commence le lendemain. Le manager utilise l'IA pour préparer un brief d'équipe clair et rapide. L'IA propose un brief bien structuré, mais oublie certaines contraintes du magasin : manque de personnel, livraison en retard et rayon à réorganiser. Comment utilisez-vous le brief proposé par l'IA ?",
    choices: [
      {
        id: 'a',
        profile: 'captain',
        title: "Je complète le brief avec les contraintes du magasin",
        label: "Je complète le brief avec les contraintes du magasin avant de le présenter.",
        points: 1,
        feedback:
          "Très bonne approche. L'équipe reçoit un brief clair qui intègre les difficultés prévues : effectifs réduits, retard de livraison et réorganisation du rayon. Vous utilisez l'IA pour structurer rapidement le brief tout en ajoutant les informations essentielles que seul le terrain permet d'identifier. À retenir : L'IA aide à préparer le travail, mais le manager apporte le contexte, l'adaptation et la décision finale.",
      },
      {
        id: 'b',
        profile: 'explorer',
        title: "Je l'utilise tel quel (le brief est très clair)",
        label: "Je l'utilise tel quel (le brief est très clair).",
        points: 0,
        feedback:
          "Ce choix est risqué. L'équipe dispose d'instructions claires, mais certaines difficultés apparaissent rapidement : la livraison retardée n'a pas été anticipée, le manque de personnel complique la mise en place et certaines tâches doivent être réorganisées dans l'urgence. À retenir : L'IA peut aider à préparer une communication, mais elle ne connaît pas toujours la réalité du terrain.",
      },
      {
        id: 'c',
        profile: 'skeptic',
        title: "Je le refais entièrement moi-même",
        label: "Je le refais entièrement moi-même.",
        points: 0.5,
        feedback:
          "Le brief prend en compte toutes les contraintes du magasin, mais sa préparation demande davantage de temps. Ce choix permet d'éviter les oublis, mais vous ne profitez pas réellement du gain de temps que peut apporter l'IA. À retenir : L'IA peut constituer une bonne base de travail, à condition qu'elle soit relue et adaptée.",
      },
    ],
  },
  {
    id: 'daily-task-prioritization',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60',
    title: 'Priorisation des tâches en journée chargée : ',
    subtitle: 'rester maître de l\'urgence',
    context:
      "Le magasin est en sous-effectif et l'activité est intense. Vous demandez à l'IA de vous aider à organiser les priorités de la journée. L'IA propose une liste bien structurée et recommande de commencer par la mise à jour de l'affichage promotionnel. Au même moment, plusieurs caisses sont saturées et une file d'attente importante commence à se former. Quelle décision prenez-vous face à cette situation ?",
    choices: [
      {
        id: 'a',
        profile: 'skeptic',
        title: "J'ignore complètement la proposition de l'IA",
        label: "J'ignore complètement la proposition de l'IA et je gère comme d'habitude.",
        points: 0.5,
        feedback:
          "Ce choix permet de répondre aux besoins immédiats, mais vous vous privez d'un outil qui peut vous aider à structurer et anticiper l'activité. Vous traitez les urgences du moment, mais certaines tâches importantes risquent d'être oubliées ou repoussées. À retenir : Les recommandations de l'IA peuvent être utiles, à condition d'être adaptées à la situation.",
      },
      {
        id: 'b',
        profile: 'captain',
        title: "Je traite d'abord l'affluence en caisse puis j'ajuste les priorités",
        label: "Je traite d'abord l'affluence en caisse puis j'ajuste les priorités de l'IA.",
        points: 1,
        feedback:
          "Très bonne approche. Les files d'attente diminuent rapidement et les autres tâches sont réorganisées en fonction des besoins réels du magasin. L'équipe reste concentrée sur les priorités essentielles. À retenir : L'IA peut aider à planifier l'activité, mais le manager reste responsable des arbitrages et des décisions opérationnelles.",
      },
      {
        id: 'c',
        profile: 'explorer',
        title: "Je suis l'ordre de priorité proposé par l'IA",
        label: "Je suis l'ordre de priorité proposé par l'IA.",
        points: 0,
        feedback:
          "Ce choix est risqué. L'affichage promotionnel est mis à jour rapidement, mais les files d'attente continuent de s'allonger. Plusieurs clients manifestent leur mécontentement et certains quittent le magasin sans effectuer leurs achats. À retenir : L'IA peut aider à organiser les tâches, mais elle ne remplace pas l'observation du terrain.",
      },
    ],
  },
  {
    id: 'internal-communication',
    image: 'https://images.unsplash.com/photo-1577563908411-5077b6dc7624?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60',
    title: 'Communication interne rédigée par l\'IA :',
    subtitle: 'valider le fond avant la forme',
    context:
      "Votre directeur vous demande de transmettre à votre équipe une nouvelle procédure de sécurité concernant votre rayon. Pour gagner du temps, vous demandez à l'IA de rédiger une note simple et claire à diffuser sur le groupe interne. Le message proposé est bien structuré, mais en le relisant, vous remarquez qu'il contient une consigne imprécise sur le moment où la procédure doit être appliquée. Quelle est la meilleure réaction ?",
    choices: [
      {
        id: 'a',
        profile: 'captain',
        title: "Je vérifie la consigne avec la procédure officielle",
        label: "Je vérifie la consigne avec la procédure officielle avant de la transmettre.",
        points: 1,
        feedback:
          "Très bonne pratique. L'équipe reçoit une information fiable, adaptée à la réalité du magasin et conforme aux règles internes. Vous utilisez l'IA comme appui rédactionnel, mais vous sécurisez le contenu avant diffusion. À retenir : Le manager doit toujours valider les informations générées par l'IA, surtout quand elles concernent la sécurité, l'organisation ou les procédures.",
      },
      {
        id: 'b',
        profile: 'skeptic',
        title: "Je modifie seulement la tournure du message",
        label: "Je modifie seulement la tournure du message, sans vérifier le fond.",
        points: 0.5,
        feedback:
          "Le message paraît plus naturel, mais l'erreur de fond reste présente. L'équipe peut appliquer une consigne incorrecte sans s'en rendre compte. Ce choix montre que la forme a été travaillée, mais pas le contenu. À retenir : Relire le style ne suffit pas : il faut contrôler le sens, les dates, les conditions d'application et les exceptions.",
      },
      {
        id: 'c',
        profile: 'explorer',
        title: "J'envoie le message tel quel",
        label: "J'envoie le message tel quel (car l'IA a déjà formulé une version claire).",
        points: 0,
        feedback:
          "Ce choix est risqué. L'équipe reçoit une consigne lisible, mais une erreur de timing peut créer de la confusion dans l'application de la procédure. Un message clair ne suffit pas s'il contient une information inexacte. À retenir : L'IA peut aider à rédiger, mais elle ne remplace pas la vérification des faits et des consignes opérationnelles.",
      },
    ],
  },
  {
    id: 'onboarding-new-hire',
    image: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60',
    title: 'Accueil d\'un nouvel arrivant : ',
    subtitle: 'l\'humain complète l\'IA',
    context:
      "Un nouvel arrivant rejoint votre équipe en période de forte activité. Vous manquez de temps pour lui expliquer en détail le fonctionnement du rayon. Vous demandez à l'IA de générer un parcours d'accueil ultra rapide, avec une liste de tâches simples. L'IA propose de le laisser pratiquement en autonomie dès le deuxième jour, car le planning est serré. Mais vous voyez qu'il est encore perdu, qu'il n'a pas intégré les priorités du rayon et qu'il hésite à poser des questions. Quelle attitude adoptez-vous face à la situation ?",
    choices: [
      {
        id: 'a',
        profile: 'explorer',
        title: "Je laisse suivre le parcours seul",
        label: "Je laisse le nouvel arrivant suivre seul le parcours proposé par l'IA.",
        points: 0,
        feedback:
          "Ce choix fait gagner du temps à court terme, mais il fragilise l'intégration du collaborateur. Il continue à avancer, mais reste perdu sur les priorités du rayon et ne pose pas ses questions. Il risque de prendre de mauvaises habitudes et de se mettre en difficulté sur des tâches importantes. À retenir : Un nouvel arrivant a besoin d'un cadre humain, pas seulement d'un support automatique généré par l'IA.",
      },
      {
        id: 'b',
        profile: 'captain',
        title: "Je garde la base mais l'accompagne",
        label: "Je garde la base de l'IA comme base, mais je reste présent pour l'accompagner.",
        points: 1,
        feedback:
          "Très bonne approche. Il progresse à son rythme, ose poser des questions et comprend mieux les priorités du rayon. Vous sécurisez son intégration tout en utilisant l'IA pour structurer l'accueil et gagner du temps. Vous utilisez l'IA comme outil d'organisation, mais vous restez le garant de la qualité de l'accompagnement. À retenir : L'IA peut aider à préparer l'accueil, mais le manager doit décider du bon niveau d'autonomie selon la situation du collaborateur.",
      },
      {
        id: 'c',
        profile: 'skeptic',
        title: "Je reprends entièrement l'accueil",
        label: "J'abandonne la proposition de l'IA et je reprends entièrement l'accueil.",
        points: 0.5,
        feedback:
          "L'accueil devient très encadré et personnalisé, mais vous perdez beaucoup de temps sur des tâches que l'IA aurait pu simplifier. Vous êtes vite en difficulté pour tenir vos autres responsabilités de manager. Ce choix permet d'éviter les oublis, mais vous ne profitez pas réellement du gain de temps que l'IA peut apporter. À retenir : L'enjeu n'est pas de tout faire soi-même, mais d'utiliser l'IA comme support de préparation tout en gardant la main sur l'accompagnement humain.",
      },
    ],
  },
];

export default scenarios;