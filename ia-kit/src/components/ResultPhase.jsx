import { useEffect, useRef } from 'react';
import useQuiz from '../hooks/useQuiz';
import { sendResultsToHR } from '../services/email';
import scenarios from '../data/scenarios';

const totalScenarios = scenarios.length;
const getProfileContent = (profileKey) => {
  const profileContent = {
    captain: {
      sectionTitle: 'Ce que vous faites bien',
      listLabel: 'strengths',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1a1a1a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <polyline points="20 6 9 17 4 12"/>
        </svg>
      ),
    },
    explorer: {
      sectionTitle: 'Ce que vous pouvez améliorer',
      listLabel: 'improvements',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1a1a1a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2"/>
        </svg>
      ),
    },
    skeptic: {
      sectionTitle: 'Cas d\'usage simples à explorer',
      listLabel: 'applications',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1a1a1a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="12" cy="12" r="10"/>
          <line x1="12" y1="16" x2="12" y2="12"/>
          <line x1="12" y1="8" x2="12.01" y2="8"/>
        </svg>
      ),
    },
  };
  return profileContent[profileKey];
};

const nextSteps = [
  {
    color: 'rgba(227,30,36,0.1)',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#e31e24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/>
        <line x1="12" y1="9" x2="12" y2="13"/>
        <line x1="12" y1="17" x2="12.01" y2="17"/>
      </svg>
    ),
    title: 'Restez vigilant',
    desc: "Continuez à vérifier systématiquement les suggestions de l'IA",
  },
  {
    color: 'rgba(67,71,243,0.1)',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#4347f3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 00-3-3.87"/>
        <path d="M16 3.13a4 4 0 010 7.75"/>
      </svg>
    ),
    title: 'Partagez vos pratiques',
    desc: 'Formez vos équipes aux bonnes pratiques que vous avez apprises',
  },
  {
    color: 'rgba(0,255,139,0.1)',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#00a85a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
        <polyline points="17 6 23 6 23 12"/>
      </svg>
    ),
    title: 'Continuez à apprendre',
    desc: "L'IA évolue vite, restez informé des nouvelles capacités et limites",
  },
];

export default function ResultPhase() {
  const { userProfile, answers, showResources, userIdentity } = useQuiz();
  const emailSentRef = useRef(false);

  useEffect(() => {
    if (!userProfile || emailSentRef.current) return;
    emailSentRef.current = true;

    sendResultsToHR({ profile: userProfile, score: userProfile.score, answers, userIdentity })
      .then((res) => {
        if (!res?.skipped) console.info('[Brevo] Email RH envoyé avec succès.');
      })
      .catch((err) => console.error('[Brevo] Échec envoi email :', err.message));
  }, [userProfile, answers, userIdentity]);

  if (!userProfile) return null;

  const { title, tagline, description, score } = userProfile;

  return (
    <section className="result-phase phase" aria-label="Votre bilan">

      {/* Header */}
      <div className="result-hero">
        <div className="result-hero-icon" aria-hidden="true">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="8" r="6"/>
            <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/>
          </svg>
        </div>
        <h2 className="result-title">Formation terminée !</h2>
        <p className="result-subtitle">
          Vous avez complété les {totalScenarios} scénarios de sensibilisation à l'IA
        </p>
      </div>

      {/* Profile card */}
      <div className="result-profile-card">
        <div className="result-profile-top">
          <span className="result-profile-badge">Votre profil IA</span>
          <span className="result-profile-name-pill">{title}</span>
        </div>
        <p className="result-profile-tagline">{tagline}</p>
        <div className="result-score-pill">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4347f3" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
            <polyline points="17 6 23 6 23 12"/>
          </svg>
          <span className="result-score-label-text">Niveau de vigilance IA :</span>
          <strong className="result-score-value">{score}%</strong>
        </div>
        <p className="result-profile-description">{description}</p>
      </div>

      {/* Key points - personnalisé selon le profil */}
      <div className="result-keypoints-card">
        <h3 className="result-keypoints-title">
          {getProfileContent(userProfile.key).icon}
          {getProfileContent(userProfile.key).sectionTitle}
        </h3>
        <ul className="result-keypoints-list">
          {(userProfile[getProfileContent(userProfile.key).listLabel] || []).map((point, i) => (
            <li key={i} className="result-keypoint-item">
              <span className="result-check" aria-hidden="true">✓</span>
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Next steps */}
      <div className="result-nextsteps-section">
        <h3 className="result-nextsteps-title">Vos prochaines étapes</h3>
        <div className="result-nextsteps-grid">
          {nextSteps.map((step, i) => (
            <div key={i} className="result-nextstep-card">
              <div className="result-nextstep-icon-wrapper" style={{ background: step.color }}>
                {step.icon}
              </div>
              <strong className="result-nextstep-title">{step.title}</strong>
              <p className="result-nextstep-desc">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Action cards */}
      <div className="result-actions-grid">
        <div className="result-action-card result-action-card--blue">
          <div className="result-action-header">
            <div className="result-action-icon-wrapper" style={{ background: 'rgba(67,71,243,0.1)' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#4347f3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
                <polyline points="7 10 12 15 17 10"/>
                <line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
            </div>
            <div>
              <p className="result-action-title">Mémo de formation</p>
              <p className="result-action-desc">Téléchargez le résumé de formation PDF</p>
            </div>
          </div>
          <button className="result-action-btn result-action-btn--blue">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
              <polyline points="7 10 12 15 17 10"/>
              <line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
            Télécharger le mémo
          </button>
        </div>

        <div className="result-action-card result-action-card--red">
          <div className="result-action-header">
            <div className="result-action-icon-wrapper" style={{ background: 'rgba(227,30,36,0.1)' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#e31e24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z"/>
                <path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z"/>
              </svg>
            </div>
            <div>
              <p className="result-action-title">Ressources IA</p>
              <p className="result-action-desc">Outils et bonnes pratiques</p>
            </div>
          </div>
          <button className="result-action-btn result-action-btn--red" onClick={showResources}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z"/>
              <path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z"/>
            </svg>
            Voir les ressources
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="result-footer-section">
        <p className="result-footer-note">
          Merci d'avoir suivi cette formation. Cette attestation sera ajoutée à votre dossier RH.
        </p>
        <p className="result-footer-brand">
          Formation propulsée par <strong>NOVAÏ</strong> • Juin 2026
        </p>
      </div>

    </section>
  );
}
