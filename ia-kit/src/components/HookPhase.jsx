import useQuiz from '../hooks/useQuiz';

export default function HookPhase() {
  const { startQuiz } = useQuiz();

  return (
    <section className="phase hook-phase" aria-label="Introduction">
      <div className="hook-content">
        <span className="hook-emoji" aria-hidden="true">🤖</span>
        <h1>L'IA débarque dans votre rayon</h1>
        <p className="hook-subtitle">
          Êtes-vous prêt à manager avec l'intelligence artificielle ?
        </p>
        <p className="hook-description">
          3 mises en situation réelles. 3 décisions à prendre.
          <br />
          Découvrez votre profil manager face à l'IA.
        </p>
        <div className="hook-meta">
          <span>⏱️ 5 minutes</span>
          <span>📱 Aucune inscription</span>
        </div>
        <button
          className="btn btn-primary btn-lg"
          onClick={startQuiz}
          aria-label="Commencer le parcours de sensibilisation"
        >
          C'est parti !
        </button>
      </div>
    </section>
  );
}
