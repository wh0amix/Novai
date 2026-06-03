import useQuiz from '../hooks/useQuiz';

const tools = [
  {
    name: 'ChatGPT',
    badge: 'OpenAI',
    badgeColor: '#6b6b6b',
    url: 'https://chat.openai.com',
    desc: "Assistant conversationnel pour la rédaction, l'analyse et le brainstorming",
    tags: ['Rédaction de textes', 'Analyse de données', 'Aide à la décision'],
    warning: "Ne partagez jamais de données confidentielles clients ou RH",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <rect width="28" height="28" rx="6" fill="#10a37f"/>
        <path d="M14 7.5c-2.07 0-3.83 1.3-4.55 3.15a4.5 4.5 0 00.05 8.7A4.75 4.75 0 0014 21.5c2.07 0 3.83-1.3 4.55-3.15a4.5 4.5 0 00-.05-8.7A4.75 4.75 0 0014 7.5z" fill="white" opacity="0.9"/>
        <circle cx="14" cy="14" r="3" fill="#10a37f"/>
      </svg>
    ),
  },
  {
    name: 'Gemini',
    badge: 'Google',
    badgeColor: '#6b6b6b',
    url: 'https://gemini.google.com',
    desc: "IA multimodale pour l'analyse de documents, images et données",
    tags: ["Analyse de documents", "Recherche d'information", "Synthèse de données"],
    warning: "Vérifiez toujours les sources et citations proposées",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <rect width="28" height="28" rx="6" fill="#f0f4ff"/>
        <path d="M14 6l2 6h6l-5 3.5 2 6L14 18l-5 3.5 2-6L6 12h6z" fill="url(#gem)" opacity="0.9"/>
        <defs>
          <linearGradient id="gem" x1="6" y1="6" x2="22" y2="22" gradientUnits="userSpaceOnUse">
            <stop stopColor="#4347f3"/>
            <stop offset="1" stopColor="#00ff8b"/>
          </linearGradient>
        </defs>
      </svg>
    ),
  },
  {
    name: 'Euria',
    badge: 'Enseignes partenaires',
    badgeColor: '#6b6b6b',
    url: 'https://euria.infomaniak.com/',
    desc: "Solution IA certifiée pour la grande distribution française",
    tags: ['Prévisions de stock', 'Optimisation des plannings', 'Rapports automatisés'],
    warning: "Privilégiez cet outil pour les données métier sensibles",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <rect width="28" height="28" rx="6" fill="#fff0f0"/>
        <path d="M14 5L7 8.5v7c0 4.1 3 7.9 7 9 4-1.1 7-4.9 7-9v-7L14 5z" fill="#e31e24" opacity="0.8"/>
        <text x="14" y="18" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold" fontFamily="sans-serif">E</text>
      </svg>
    ),
  },
];

const bestPracticeCards = [
  {
    color: 'rgba(227,30,36,0.1)',
    iconColor: '#e31e24',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#e31e24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
    title: 'Données personnelles',
    items: [
      "Ne jamais partager de données clients (noms, adresses, emails)",
      "Ne pas utiliser de données RH identifiables",
      "Anonymiser systématiquement avant d'utiliser une IA publique",
    ],
  },
  {
    color: 'rgba(0,200,100,0.1)',
    iconColor: '#00a85a',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#00a85a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12"/>
      </svg>
    ),
    title: 'Vérification',
    items: [
      "Toujours vérifier les chiffres et statistiques générés",
      "Croiser avec vos propres sources de données",
      "Relire attentivement avant d'envoyer ou publier",
    ],
  },
  {
    color: 'rgba(255,165,0,0.1)',
    iconColor: '#FFA500',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FFA500" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/>
        <line x1="12" y1="9" x2="12" y2="13"/>
        <line x1="12" y1="17" x2="12.01" y2="17"/>
      </svg>
    ),
    title: 'Limites',
    items: [
      "L'IA ne remplace pas votre jugement professionnel",
      "Les algorithmes peuvent être biaisés",
      "Les réponses ne sont pas toujours à jour",
    ],
  },
];

const doList = [
  "Utiliser l'IA comme assistant, pas comme décideur",
  "Vérifier systématiquement les résultats",
  "Croiser avec votre expertise terrain",
  "Anonymiser les données sensibles",
  "Signaler les erreurs ou biais détectés",
];

const dontList = [
  "Copier-coller sans vérifier",
  "Partager des données clients ou RH",
  "Faire confiance aveuglément aux chiffres",
  "Prendre des décisions RH uniquement via IA",
  "Ignorer les alertes ou incohérences",
];

const docs = [
  {
    title: "Guide CNIL : IA et données personnelles",
    desc: "Réglementation et bonnes pratiques",
    url: "https://www.cnil.fr/fr/intelligence-artificielle",
  },
  {
    title: "Charte d'utilisation de l'IA en entreprise",
    desc: "Document interne à consulter",
    url: "https://www.insp.gouv.fr/files/files/actualites/2025-09/ia_agents-avec_compression.pdf",
  },
  {
    title: "Support IA : aide et questions",
    desc: "Contact : ia-support@entreprise.fr",
    url: "mailto:ia-support@entreprise.fr",
  },
];

export default function ResourcesPhase() {
  const { showResults } = useQuiz();

  return (
    <section className="resources-phase phase" aria-label="Ressources IA">

      {/* Back button */}
      <button className="resources-back-btn" onClick={showResults}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <polyline points="15 18 9 12 15 6"/>
        </svg>
        Retour aux résultats
      </button>

      {/* Page title */}
      <div className="resources-header">
        <h1 className="resources-title">Ressources IA pour le retail</h1>
        <p className="resources-subtitle">
          Outils, bonnes pratiques et ressources pour utiliser l'IA de manière responsable
        </p>
      </div>

      {/* Section 1 – Outils */}
      <section aria-labelledby="tools-heading">
        <h2 className="resources-section-title" id="tools-heading">Outils IA disponibles</h2>
        <div className="resources-tools-list">
          {tools.map((tool) => (
            <div key={tool.name} className="resources-tool-card">
              <div className="resources-tool-header">
                <div className="resources-tool-icon">{tool.icon}</div>
                <div className="resources-tool-meta">
                  <span className="resources-tool-name">{tool.name}</span>
                  <span className="resources-tool-badge">{tool.badge}</span>
                </div>
                <a href={tool.url} target="_blank" rel="noopener noreferrer" className="resources-tool-link" aria-label={`Ouvrir ${tool.name}`}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/>
                    <polyline points="15 3 21 3 21 9"/>
                    <line x1="10" y1="14" x2="21" y2="3"/>
                  </svg>
                </a>
              </div>
              <p className="resources-tool-desc">{tool.desc}</p>
              <div className="resources-tool-tags-row">
                <span className="resources-tool-tags-label">Cas d'usage recommandés :</span>
                <div className="resources-tool-tags">
                  {tool.tags.map((tag) => (
                    <span key={tag} className="resources-tag">{tag}</span>
                  ))}
                </div>
              </div>
              <div className="resources-tool-warning">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FFA500" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/>
                  <line x1="12" y1="9" x2="12" y2="13"/>
                  <line x1="12" y1="17" x2="12.01" y2="17"/>
                </svg>
                <span><strong>Attention :</strong> {tool.warning}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section 2 – Bonnes pratiques */}
      <section aria-labelledby="practices-heading">
        <h2 className="resources-section-title" id="practices-heading">Bonnes pratiques essentielles</h2>

        {/* Row 1 : 3 cards */}
        <div className="resources-practices-grid">
          {bestPracticeCards.map((card) => (
            <div key={card.title} className="resources-practice-card">
              <div className="resources-practice-header">
                <div className="resources-practice-icon" style={{ background: card.color }}>
                  {card.icon}
                </div>
                <strong className="resources-practice-title">{card.title}</strong>
              </div>
              <ul className="resources-practice-list">
                {card.items.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Row 2 : À faire / À éviter */}
        <div className="resources-dodonts-grid">
          <div className="resources-do-card">
            <div className="resources-dodonts-header">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#00a85a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
              <strong>À FAIRE</strong>
            </div>
            <ul className="resources-dodonts-list resources-do-list">
              {doList.map((item, i) => (
                <li key={i}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#00a85a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="resources-dont-card">
            <div className="resources-dodonts-header">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#e31e24" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
              <strong>À ÉVITER</strong>
            </div>
            <ul className="resources-dodonts-list resources-dont-list">
              {dontList.map((item, i) => (
                <li key={i}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#e31e24" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <line x1="18" y1="6" x2="6" y2="18"/>
                    <line x1="6" y1="6" x2="18" y2="18"/>
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Section 3 – Documentation */}
      <section aria-labelledby="docs-heading">
        <div className="resources-docs-card">
          <h2 className="resources-docs-title" id="docs-heading">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1a1a1a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
              <rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
            </svg>
            Documentation complémentaire
          </h2>
          <ul className="resources-docs-list">
            {docs.map((doc, i) => (
              <li key={i} className="resources-docs-item">
                <div className="resources-docs-item-text">
                  <span className="resources-docs-item-title">{doc.title}</span>
                  <span className="resources-docs-item-desc">{doc.desc}</span>
                </div>
                <a href={doc.url} target={doc.url.startsWith('mailto') ? '_self' : '_blank'} rel="noopener noreferrer" className="resources-tool-link" aria-label={`Ouvrir ${doc.title}`}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/>
                    <polyline points="15 3 21 3 21 9"/>
                    <line x1="10" y1="14" x2="21" y2="3"/>
                  </svg>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Footer CTA */}
      <div className="resources-footer-cta">
        <p className="resources-footer-cta-text">Besoin d'aide ou de formation complémentaire ?</p>
        <a href="mailto:ia-support@entreprise.fr" className="resources-footer-cta-btn">
          Contacter le support IA
        </a>
      </div>

    </section>
  );
}
