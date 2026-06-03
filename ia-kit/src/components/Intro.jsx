import useQuiz from '../hooks/useQuiz';

export default function Intro() {
  const { goToScenarios } = useQuiz();

  return (
    <section className="phase intro-phase" aria-label="Mise en situation">
      <div className="intro-layout">
        <div className="intro-visual">
          <div className="intro-warning-card">
            <svg className="intro-warning-icon" aria-hidden="true" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#FFA500" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/>
              <line x1="12" y1="9" x2="12" y2="13"/>
              <line x1="12" y1="17" x2="12.01" y2="17"/>
            </svg>
          </div>
          <blockquote className="intro-quote">
            "L'IA transforme notre métier. Encore faut-il savoir l'utiliser intelligemment."
          </blockquote>
        </div>

        <div className="intro-content">
          <span className="intro-badge">Mise en situation</span>

          <h2 className="intro-title">
            L'IA au service du retail : opportunité ou risque ?
          </h2>

          <p className="intro-text">
            Vous êtes manager dans la gande distribution. Chaque jour, vous prenez des décisions qui impactent vos équipes, vos stocks, vos clients.
          </p>

          <p className="intro-text">
            Aujourd'hui, de nouveaux outils d'intelligence artificielle promettent de vous faciliter la vie : génération automatique de plannings, prévisions de ruptures, rédaction de rapports...
          </p>

          <p className="intro-text">
            Mais attention : mal utilisée, l'IA peut créer plus de problèmes qu'elle n'en résout.
          </p>

          <div className="intro-mission">
            <p>
              <strong>Votre mission :</strong> Traverser des situations réalistes et découvrir comment utiliser l'IA de manière responsable et efficace.
            </p>
          </div>

          <button className="intro-cta" onClick={goToScenarios}>
            Je commence →
          </button>
        </div>
      </div>
    </section>
  );
}
