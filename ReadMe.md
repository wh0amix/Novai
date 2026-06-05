# NOVAI - IA Kit (Formation Interactive)

Application web de sensibilisation a l'IA pour les managers de la grande distribution.

Le projet propose un parcours pedagogique base sur des scenarios metier, des mini-jeux decisionnels, un score final (reel et corrige), un profil IA, un memo PDF et une page de ressources.
## Lien du Kit 

https://novai-five.vercel.app/

## Equipe

- Ismail (Developpeur)
- Anas (Developpeur)

## Objectif du produit

- Former aux bons usages de l'IA en contexte magasin
- Renforcer les reflexes de verification, de confidentialite et de prise de decision
- Mesurer les acquis via des scenarios notes et un bilan final

## Stack technique

- React 19
- Vite 8
- CSS custom (sans framework UI)
- Context API + useReducer pour l'etat global
- EmailJS pour l'envoi des resultats RH
- jose pour la verification de token JWT

## Structure du repository

- ia-kit/ : application front principale
- ReadMe.md : documentation projet (ce fichier)

## Structure applicative (ia-kit/src)

- components/ : ecrans et composants UI
- context/ : store global (QuizContext, reducer, persistance)
- hooks/ : hook metier principal (useQuiz)
- data/ : scenarios et profils
- services/ : integration EmailJS et JWT

## Fonctionnalites principales

- Parcours en phases : hook -> intro -> scenario -> result -> resources
- Scenarios notes (0, 0.5, 1) avec feedback detaille
- Mini-jeux sur certains scenarios (confidentialite, brief equipe, etc.)
- Distinction score reel (premiere tentative) vs score corrige
- Affichage d'un profil IA et d'un score par profil reel
- Telechargement du memo depuis public/memo-ia.pdf
- Envoi automatique des resultats a la fin (si variables EmailJS configurees)
- Persistance locale de progression (localStorage)

## Installation locale

Depuis la racine du repo :

```bash
cd ia-kit
npm install
npm run dev
```

## Scripts utiles

Dans ia-kit/ :

```bash
npm run dev      # serveur local
npm run build    # build production
npm run preview  # preview du build
npm run lint     # verifications eslint
```

## Variables d'environnement

Creer un fichier .env dans ia-kit/ :

```env
VITE_EMAILJS_SERVICE_ID=
VITE_EMAILJS_TEMPLATE_ID=
VITE_EMAILJS_PUBLIC_KEY=
VITE_HR_EMAIL=
VITE_JWT_SECRET=
```

Notes :

- Sans variables EmailJS, l'app fonctionne mais l'envoi RH est ignore.
- Sans VITE_JWT_SECRET, la verification d'identite via token est ignoree.

## Flux fonctionnel resumee

1. L'utilisateur demarre la formation et parcourt les scenarios.
2. Chaque choix alimente :
	- une premiere tentative (score reel),
	- une reponse finale (score corrige).
3. En fin de parcours, telechargement du memo requis pour acceder au bilan.
4. Page resultat :
	- score corrige,
	- score reel,
	- niveau de vigilance,
	- score par profil reel,
	- alertes prevention selon comportement et scores.
5. Option d'envoi des resultats et fermeture du module.

## Notes produit importantes

- Les reponses sont dedupliquees par scenario pour eviter de depasser le score max.
- Le scenario 7 randomise les informations affichees pour eviter le biais de position.
- Le bouton retour aux resultats en page ressources est conditionnel et sticky.

## Deploiement

Le projet est deployable sur Vercel (configuration deja presente dans ia-kit/vercel.json).

Build target : dist/

## Convention de collaboration (suggestion equipe)

- Branches feature : feature/nom-dev-x
- Merge vers main apres validation fonctionnelle
- Petits commits atomiques et messages explicites
- Verification npm run lint avant merge

## Contact interne

Pour le support metier / formation :

- Novai-support@entreprise.fr