import { useEffect, useRef } from 'react';
import useQuiz from '../hooks/useQuiz';
import { sendResultsToHR } from '../services/email';
import scenarios from '../data/scenarios';


const totalScenarios = scenarios.length;

function getVigilanceFromRealScore(realScore) {
  if (realScore >= 70) {
    return {
      level: 'Vigilance élevée',
      description: 'Votre score réel montre une bonne maîtrise des bons réflexes IA.',
    };
  }

  if (realScore >= 40) {
    return {
      level: 'Vigilance modérée',
      description: 'Les bases sont présentes, mais certains réflexes IA doivent encore être consolidés.',
    };
  }

  return {
    level: 'Vigilance faible',
    description: 'Votre score réel indique qu\'un renforcement des pratiques IA est nécessaire.',
  };
}

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
  const { userProfile, answers, showResources, userIdentity, reviewCount, memoDownloaded, downloadMemo, restart } = useQuiz();
  const emailSentRef = useRef(false);
  const closingRef = useRef(false);

  function handleMemoDownload() {
    const link = document.createElement('a');
    link.href = '/memo-ia.pdf';
    link.download = 'memo-ia.pdf';
    link.click();
    downloadMemo();
  }

  async function handleSendAndClose() {
    if (!userProfile || closingRef.current) return;
    closingRef.current = true;

    if (!emailSentRef.current) {
      emailSentRef.current = true;
      try {
        await sendResultsToHR({ profile: userProfile, score: userProfile.score, answers, userIdentity, reviewCount });
      } catch (err) {
        console.error('[Brevo] Échec envoi email :', err.message);
      }
    }

    if (typeof window !== 'undefined' && window.parent && window.parent !== window) {
      window.parent.postMessage({ type: 'NOVAI_CLOSE_MODULE' }, '*');
    }

    if (typeof window !== 'undefined') {
      window.close();
      window.setTimeout(() => {
        if (!window.closed) restart();
      }, 120);
    }
  }

  useEffect(() => {
    if (!userProfile || emailSentRef.current) return;
    emailSentRef.current = true;

    sendResultsToHR({ profile: userProfile, score: userProfile.score, answers, userIdentity, reviewCount })
      .then((res) => {
        if (!res?.skipped) console.info('[Brevo] Email RH envoyé avec succès.');
      })
      .catch((err) => console.error('[Brevo] Échec envoi email :', err.message));
  }, [userProfile, answers, userIdentity, reviewCount]);

  if (!userProfile) return null;

  const {
    title,
    tagline,
    description,
    score,
    totalPoints,
    maxPoints,
    realScore,
    improvedScore,
    realPoints,
    correctedCount,
    profilePercentages,
    realProfileKey,
  } = userProfile;
  const activeProfileKey = realProfileKey ?? userProfile.key;
  const vigilanceFromRealScore = getVigilanceFromRealScore(realScore);
  const scoreColorClass = score >= 70 ? 'result-score-card--green' : score >= 40 ? 'result-score-card--orange' : 'result-score-card--red';
  const hasLowScoresWarning = realScore <= 45 && improvedScore <= 45;

  if (!memoDownloaded) {
    return (
      <section className="result-phase phase" aria-label="Téléchargement du mémo">
        <div className="result-hero">
          <h2 className="result-title">Formation terminée !</h2>
          <p className="result-subtitle">
            Vous avez complété les {totalScenarios} scénarios de sensibilisation à l'IA
          </p>
        </div>

        <div className="result-memo-gate">
          <div className="result-memo-gate-icon" aria-hidden="true">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#4347f3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
              <polyline points="7 10 12 15 17 10"/>
              <line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
          </div>
          <h3 className="result-memo-gate-title">Téléchargez votre mémo de formation</h3>
          <p className="result-memo-gate-desc">
            Votre mémo personnalisé récapitule les bonnes pratiques IA à retenir. Téléchargez-le pour accéder à vos résultats.
          </p>
          <button className="result-memo-gate-btn" onClick={handleMemoDownload}>
            Télécharger le mémo PDF
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="result-phase phase" aria-label="Votre bilan">

      <div className="result-hero">
        <h2 className="result-title">Formation terminée !</h2>
        <p className="result-subtitle">
          Vous avez complété les {totalScenarios} scénarios de sensibilisation à l'IA
        </p>
      </div>

      {reviewCount >= 3 && (
        <div className="result-review-warning" role="alert" aria-live="polite">
          <div className="result-review-warning-icon" aria-hidden="true">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/>
              <line x1="12" y1="9" x2="12" y2="13"/>
              <line x1="12" y1="17" x2="12.01" y2="17"/>
            </svg>
          </div>
          <div>
            <strong>Attention :</strong> vous avez consulté les choix {reviewCount} fois pendant la formation. Cela peut indiquer une difficulté à identifier les bonnes pratiques IA — pensez à relire les ressources disponibles. Il est possible que vous deviez repasser la formation dans la durée pour vérifier que les acquis sont bien validés.
          </div>
        </div>
      )}

      {hasLowScoresWarning && (
        <div className="result-review-warning" role="alert" aria-live="polite">
          <div className="result-review-warning-icon" aria-hidden="true">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/>
              <line x1="12" y1="9" x2="12" y2="13"/>
              <line x1="12" y1="17" x2="12.01" y2="17"/>
            </svg>
          </div>
          <div>
            <strong>Prévention :</strong> vos scores réel et corrigé restent bas. Cela indique que les bonnes pratiques IA ne sont pas encore suffisamment acquises. Il est fortement recommandé de relire les ressources puis de repasser le test pour valider durablement les acquis.
          </div>
        </div>
      )}

      <div className="result-overview-grid">
        <div className="result-profile-panel">
          <div className="result-profile-top">
            <div className="result-profile-icon" aria-hidden="true">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="8" r="6"/>
                <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/>
              </svg>
            </div>
            <div className="result-profile-main">
              <span className="result-profile-badge">Votre profil IA</span>
              <span className="result-profile-name-pill">{title}</span>
              <p className="result-profile-tagline">{tagline}</p>
            </div>
          </div>

          <div className="result-profile-description-card">
            <p className="result-profile-description-main">{description}</p>
            {(userProfile.details || []).map((paragraph, i) => (
              <p key={i} className="result-profile-description-detail">{paragraph}</p>
            ))}
          </div>

          <div className="result-keypoints-card">
            <h3 className="result-keypoints-title">Points clés à retenir</h3>
            <ul className="result-keypoints-list">
              {(userProfile[getProfileContent(userProfile.key).listLabel] || []).map((point, i) => (
                <li key={i} className="result-keypoint-item">
                  <span className="result-check" aria-hidden="true">✓</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="result-vigilance-card">
            <h3 className="result-vigilance-title">Point de vigilance</h3>
            <p className="result-vigilance-text">
              {userProfile.vigilance || 'Gardez un esprit critique sur chaque réponse proposée par l\'IA.'}
            </p>
          </div>

          <div className="result-advice-card">
            <h3 className="result-advice-title">Conseil personnalisé</h3>
            <p className="result-advice-text">{userProfile.advice}</p>
          </div>
        </div>

        <div className="result-side-panel">
          <div className={`result-score-card ${scoreColorClass}`}>
            <strong className="result-score-main-value">{score}%</strong>
            <p className="result-score-points-detail">
              Score améliore : {improvedScore}% ({totalPoints}/{maxPoints} points)
            </p>
            <p className="result-score-points-detail result-score-points-detail--secondary">
              Score reel : {realScore}% ({realPoints}/{maxPoints} points)
            </p>
            {correctedCount > 0 && (
              <p className="result-score-correction-note">
                +{correctedCount} reponse{correctedCount > 1 ? 's' : ''} moderee/mauvaise corrigee{correctedCount > 1 ? 's' : ''}.
              </p>
            )}
            <div className="result-score-line" aria-hidden="true" />
            <p className="result-score-main-label">Niveau de vigilance IA (score réel)</p>
            <p className="result-score-main-desc">
              {vigilanceFromRealScore.level} - {vigilanceFromRealScore.description}
            </p>
            <div className="result-score-review-stat">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                <circle cx="12" cy="12" r="3"/>
              </svg>
              {reviewCount === 0
                ? 'Aucun retour sur les choix'
                : `${reviewCount} retour${reviewCount > 1 ? 's' : ''} vers les choix`}
            </div>
          </div>

          <div className="result-profile-score-card">
            <p className="result-profile-score-title">Score par profil (%)</p>
            {[
              ['captain', 'Le Capitaine'],
              ['explorer', 'L\'Explorateur'],
              ['skeptic', 'Le Sceptique'],
            ].map(([key, label]) => {
              const value = profilePercentages?.[key] ?? 0;
              const isMainProfile = key === activeProfileKey;
              return (
                <div key={key} className="result-profile-score-row">
                  <div className="result-profile-score-row-top">
                    <span className={`result-profile-score-label${isMainProfile ? ' result-profile-score-label--active' : ''}`}>
                      {label}
                    </span>
                    <strong className="result-profile-score-value">{value}%</strong>
                  </div>
                  <div className="result-profile-score-bar" aria-hidden="true">
                    <span
                      className={`result-profile-score-fill${isMainProfile ? ' result-profile-score-fill--active' : ''}`}
                      style={{ width: `${value}%` }}
                    />
                  </div>
                </div>
              );
            })}
            <p className="result-profile-score-note">
              Le profil réel avec le pourcentage le plus élevé détermine l'indexation du score profil.
            </p>
          </div>

          <div className="result-side-actions">
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
                  <p className="result-action-desc">Téléchargez le résumé en PDF</p>
                </div>
              </div>
              <button className="result-action-btn result-action-btn--blue" onClick={handleMemoDownload}>
                Télécharger le mémo PDF
              </button>
            </div>

            <div className="result-action-card result-action-card--violet">
              <div className="result-action-header">
                <div className="result-action-icon-wrapper" style={{ background: 'rgba(142,0,250,0.12)' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#8e00fa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z"/>
                    <path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z"/>
                  </svg>
                </div>
                <div>
                  <p className="result-action-title">Ressources IA</p>
                  <p className="result-action-desc">Outils et bonnes pratiques</p>
                </div>
              </div>
              <button className="result-action-btn result-action-btn--violet" onClick={showResources}>
                Voir les ressources
              </button>
            </div>
          </div>
        </div>
      </div>

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

      {/* Footer */}
      <div className="result-footer-section">
        <p className="result-footer-note">
          Merci d'avoir suivi cette formation. Cette attestation sera ajoutée à votre dossier RH.
        </p>
        <p className="result-footer-brand">
          Formation propulsée par <strong>NOVAÏ</strong> • Juin 2026
        </p>
        <button className="result-action-btn result-action-btn--blue result-close-module-btn" onClick={handleSendAndClose}>
          Envoyer vos résultats et fermer le module
        </button>
      </div>

    </section>
  );
}
