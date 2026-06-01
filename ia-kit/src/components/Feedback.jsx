import useQuiz from '../hooks/useQuiz';

const feedbackMeta = {
  captain: { title: 'Bonne initiative !',   isPositive: true },
  explorer: { title: 'Très bon réflexe !', isPositive: true },
  skeptic:  { title: "Point d'attention",  isPositive: false },
};

export default function Feedback({ choice, onNext }) {
  const { reviewChoices } = useQuiz();
  const meta = feedbackMeta[choice.profile] ?? feedbackMeta.explorer;
  const isPositive = meta.isPositive;

  return (
    <div className="feedback-phase phase" aria-live="polite" role="status">
      <div className={`feedback-card${isPositive ? '' : ' feedback-card--warning'}`}>
        <div className="feedback-header">
          <div className={`feedback-icon${isPositive ? '' : ' feedback-icon--warning'}`} aria-hidden="true">
            {isPositive ? '✓' : '⚠'}
          </div>
          <h3 className="feedback-title">{meta.title}</h3>
        </div>

        <p className="feedback-body">{choice.feedback}</p>

        <div className="feedback-tip">
          <strong>Astuce :</strong> Gardez en mémoire ce principe pour vos prochaines décisions avec l'IA.
        </div>

        <div className="feedback-actions">
          <button className="btn-outline" onClick={reviewChoices}>
            ← Revoir les choix
          </button>
          <button className="btn-next" onClick={onNext}>
            Scénario suivant →
          </button>
        </div>
      </div>
    </div>
  );
}
