import useQuiz from '../hooks/useQuiz';

export default function HookPhase() {
  const { startQuiz } = useQuiz();

  return (
    <section className="phase hook-phase" aria-label="Introduction">
      <div className="hook-card">
        <div className="hook-app-icon" aria-hidden="true">✦</div>

        <span className="hook-badge">Quiz de sensibilisation disponible</span>

        <h1 className="hook-title">
          Intelligence Artificielle & Grande Distribution
        </h1>

        <p className="hook-subtitle">
          Découvrez les opportunités et les risques de l'IA dans votre quotidien professionnel
        </p>

        <div className="hook-stats">
          <div className="hook-stat">
            <span className="hook-stat-label">Durée</span>
            <span className="hook-stat-value">8-10 min</span>
          </div>
          <div className="hook-stat">
            <span className="hook-stat-label">Niveau</span>
            <span className="hook-stat-value">Débutant</span>
          </div>
          <div className="hook-stat">
            <span className="hook-stat-label">Format</span>
            <span className="hook-stat-value">Interactif</span>
          </div>
        </div>

        <div className="hook-learn">
          <p className="hook-learn-title">Ce que vous allez apprendre :</p>
          <ul className="hook-learn-list">
            <li>Identifier les cas d'usage pertinents de l'IA en magasin</li>
            <li>Reconnaître les risques liés à une mauvaise utilisation</li>
            <li>Adopter les bonnes pratiques au quotidien</li>
          </ul>
        </div>

        <button className="hook-cta" onClick={startQuiz}>
          Commencer la formation
        </button>

        <p className="hook-footer">
          3 mises en situation · Aucune inscription · Propulsé par NOVAÏ
        </p>
      </div>
    </section>
  );
}
