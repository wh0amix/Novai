import useQuiz from '../hooks/useQuiz';

export default function Home() {
  const { startQuiz } = useQuiz();

  return (
    <section className="phase hook-phase" aria-label="Introduction">
      <div className="hook-card">
        <img src="/logo-seul.svg" alt="" className="hook-app-icon" aria-hidden="true" />

        <span className="hook-badge">Nouveau module disponible</span>

        <h1 className="hook-title">
          Intelligence Artificielle & Grande Distribution
        </h1>

        <p className="hook-subtitle">
          Découvrez les opportunités et les risques de l'IA dans votre quotidien professionnel
        </p>

        <div className="hook-stats">
          <div className="hook-stat">
            <svg className="hook-stat-icon" aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            <span className="hook-stat-label">Durée</span>
            <span className="hook-stat-value">8-10 min</span>
          </div>
          <div className="hook-stat">
            <svg className="hook-stat-icon" aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
            <span className="hook-stat-label">Niveau</span>
            <span className="hook-stat-value">Débutant</span>
          </div>
          <div className="hook-stat">
            <svg className="hook-stat-icon" aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
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
