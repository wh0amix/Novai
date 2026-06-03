import useQuiz from '../hooks/useQuiz';

const feedbackMeta = {
  1: { title: 'Excellente réponse !',   icon: '✓' },
  0.5:  { title: 'Réponse modérée',        icon: '→' },
  0:   { title: "Mauvaise réponse",       icon: '⚠' },
};

export default function Feedback({ choice, onNext }) {
  const { reviewChoices } = useQuiz();
  const meta = feedbackMeta[choice.points] ?? feedbackMeta[0.5];
  const rawFeedback = choice.feedback ?? '';
  const feedbackParts = rawFeedback.split(/À retenir\s*:\s*/i);
  const feedbackText = (feedbackParts[0] ?? rawFeedback).trim();
  const takeawayText = (choice.takeaway ?? feedbackParts[1] ?? '').trim();
  
  let cardClass = 'feedback-card';
  let iconClass = 'feedback-icon';
  
  if (choice.points === 1) {
    // Réponse correcte - vert (pas de classe supplémentaire)
  } else if (choice.points === 0.5) {
    // Réponse modérée - orange
    cardClass += ' feedback-card--moderate';
    iconClass += ' feedback-icon--moderate';
  } else if (choice.points === 0) {
    // Mauvaise réponse - rouge
    cardClass += ' feedback-card--warning';
    iconClass += ' feedback-icon--warning';
  }

  return (
    <div className="feedback-phase phase" aria-live="polite" role="status">
      <div className={cardClass}>
        <div className="feedback-header">
          <div className={iconClass} aria-hidden="true">
            {meta.icon}
          </div>
          <h3 className="feedback-title">{meta.title}</h3>
        </div>

        <p className="feedback-body">{feedbackText}</p>

        <div className="feedback-tip">
          <strong>À retenir :</strong>{' '}
          {takeawayText || "Appliquez cette logique dans vos prochaines décisions terrain."}
        </div>

        <div className="feedback-actions">
          {choice.points !== 1 && (
            <button className="btn-outline" onClick={reviewChoices}>
              ← Revoir les choix
            </button>
          )}
          <button className="btn-next" onClick={onNext}>
            Scénario suivant →
          </button>
        </div>
      </div>
    </div>
  );
}
