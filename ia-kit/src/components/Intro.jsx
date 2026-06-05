import useQuiz from '../hooks/useQuiz';
import scenarios from '../data/scenarios';

export default function Intro() {
  const { goToScenarios } = useQuiz();
  const totalScenarios = scenarios.length;

  return (
    <section className="phase intro-phase" aria-label="Mise en situation">
      <div className="intro-progress" aria-label={`Progression: 0 sur ${totalScenarios}`}>
        <div className="intro-progress-track" aria-hidden="true">
          {Array.from({ length: totalScenarios }).map((_, index) => (
            <span key={index} className="intro-progress-segment" />
          ))}
        </div>
        <span className="intro-progress-value">0/{totalScenarios}</span>
      </div>

      <div className="intro-content">
        <span className="intro-badge">Mise en situation</span>

        <h2 className="intro-title">
          L'IA au service du retail :<br />
          opportunité ou risque ?
        </h2>

        <p className="intro-text">
          Vous êtes manager dans une grande surface. Chaque jour, vous prenez des décisions qui impactent vos équipes, vos stocks, vos clients.
        </p>

        <p className="intro-text">
          Aujourd'hui, de nouveaux outils d'intelligence artificielle promettent de vous faciliter la vie : génération automatique de plannings, prévisions de ruptures, rédaction de rapports...
        </p>

        <p className="intro-text intro-text--muted">
          Mais attention : mal utilisée, l'IA peut créer plus de problèmes qu'elle n'en résout.
        </p>

        <div className="intro-mission">
          <div className="intro-mission-icon" aria-hidden="true">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M2 3h8a4 4 0 014 4v14a3 3 0 00-3-3H2z" />
              <path d="M22 3h-8a4 4 0 00-4 4v14a3 3 0 013-3h9z" />
            </svg>
          </div>
          <div>
            <p className="intro-mission-title">Mission</p>
            <p className="intro-mission-text">Traverser Plusieurs situations réalistes et découvrir comment utiliser l'IA de manière responsable et efficace.</p>
          </div>
        </div>

        <button className="intro-cta" onClick={goToScenarios}>
          Je commence →
        </button>
      </div>
    </section>
  );
}
