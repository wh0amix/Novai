export default function Feedback({ feedback, onNext }) {
  return (
    <aside className="feedback" aria-live="polite" role="status">
      <div className="feedback-icon" aria-hidden="true">💡</div>
      <p className="feedback-text">{feedback}</p>
      <button className="btn btn-primary" onClick={onNext}>
        Continuer
      </button>
    </aside>
  );
}
