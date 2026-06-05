# NOVAÏ — Kit de sensibilisation à l'IA

Application web de formation destinée aux managers de la grande distribution. Parcours de 10 scénarios métier avec profil utilisateur en sortie.

---

## Stack

- **React 19** + **Vite 8**
- **CSS custom** (polices Romie & ABC Monument Grotesk)
- **Context API + useReducer** — état global
- **EmailJS** — envoi des résultats aux RH
- **Jose** — vérification de token JWT 
- **Vercel** — hébergement

---

## Installation

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

---

## Variables d'environnement

Créer un fichier `.env` à la racine de `ia-kit/` :

```env
VITE_EMAILJS_SERVICE_ID=
VITE_EMAILJS_TEMPLATE_ID=
VITE_EMAILJS_PUBLIC_KEY=
VITE_HR_EMAIL=
VITE_JWT_SECRET=
```

Sans ces variables, l'app fonctionne — l'envoi email et l'identification JWT sont simplement ignorés.

---

## Structure

```
src/
├── components/     # Composants UI (ScenarioCard, ChoiceButton, ResultPhase...)
├── context/        # QuizContext + useReducer
├── data/
│   ├── scenarios.js   # 10 scénarios (contexte, choix, feedback, points)
│   └── profiles.js    # 3 profils (captain, explorer, skeptic)
├── hooks/
│   └── useQuiz.js     # Hook principal — expose l'état et les actions
├── services/
│   ├── email.js       # Envoi EmailJS à la fin du parcours
│   └── token.js       # Vérification JWT (identification utilisateur)
└── App.jsx            # Layout + Header
```

---

## Fonctionnement

**5 phases :** `Accueil → Intro → Scénarios → Résultats → Ressources`

La navigation est pilotée par `currentPhase` dans le Context — pas de React Router.

Chaque scénario propose 3 choix notés 0, 0.5 ou 1 point. Le profil final est déterminé par le choix majoritaire sur les 10 scénarios. Le score est affiché en pourcentage.

À la fin du parcours :
1. L'utilisateur doit télécharger le mémo PDF pour accéder à ses résultats
2. Un email est envoyé automatiquement aux RH (nom, profil, score, détail des réponses)

---

## Déploiement (Vercel)

Le déploiement est automatique à chaque push sur `main`. Vercel détecte Vite et utilise `dist/` comme dossier de sortie.
