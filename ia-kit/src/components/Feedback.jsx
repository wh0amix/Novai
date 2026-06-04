import useQuiz from '../hooks/useQuiz';

const feedbackMeta = {
  1: { title: 'Excellente réponse !',   icon: '✓' },
  0.5:  { title: 'Réponse modérée',        icon: '→' },
  0:   { title: "Mauvaise réponse",       icon: '⚠' },
};

export default function Feedback({ choice, onNext, isLast = false }) {
  const { reviewChoices } = useQuiz();
  const meta = feedbackMeta[choice.points] ?? feedbackMeta[0.5];
  const rawFeedback = choice.feedback ?? '';
  const feedbackParts = rawFeedback.split(/À retenir\s*:\s*/i);
  const feedbackText = (feedbackParts[0] ?? rawFeedback).trim();
  const takeawayText = (choice.takeaway ?? feedbackParts[1] ?? '').trim();
  const gameMeta = choice.gameMeta ?? null;

  const feedbackInsight = (() => {
    if (!gameMeta?.scenarioId) return null;

    if (gameMeta.scenarioId === 'sales-analysis-confidentiality') {
      const entries = gameMeta.boardEntries ?? [];
      return {
        title: 'Analyse du tri des données',
        emptyText: 'Aucune donnée n’a été déplacée dans le tri.',
        items: entries.map((entry) => ({
          id: entry.id,
          label: `${entry.label} - ${entry.zoneLabel}`,
          badge: entry.kind === 'secret' ? 'Sensible' : 'Exploitable',
          important: entry.kind === 'secret',
        })),
      };
    }

    if (gameMeta.scenarioId === 'hr-data-confidentiality') {
      const entries = gameMeta.redactionEntries ?? [];
      return {
        title: 'Analyse des informations anonymisées',
        emptyText: 'Aucune information n’a été renseignée.',
        items: entries.map((entry) => ({
          id: entry.id,
          label: `${entry.label} - ${entry.redacted ? 'Masqué' : 'Visible'}`,
          badge: entry.sensitive ? 'Sensible' : 'Standard',
          important: entry.sensitive,
        })),
      };
    }

    if (gameMeta.scenarioId === 'promo-team-brief') {
      const selectedInfos = gameMeta.selectedInfos ?? [];
      return {
        title: 'Analyse des informations intégrées',
        emptyText: 'Aucune information n\'a été ajoutée au brief.',
        items: selectedInfos.map((info) => ({
          id: info.id,
          label: info.label,
          badge: info.important ? 'Critique' : 'Optionnelle',
          important: info.important,
        })),
      };
    }

    return null;
  })();
  
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

        {feedbackInsight && (
          <div className="feedback-insight">
            <p className="feedback-insight-title">{feedbackInsight.title}</p>
            {feedbackInsight.items.length === 0 ? (
              <p className="feedback-insight-empty">{feedbackInsight.emptyText}</p>
            ) : (
              <ul className="feedback-insight-list">
                {feedbackInsight.items.map((item) => (
                  <li key={item.id} className="feedback-insight-item">
                    <span>{item.label}</span>
                    <span className={`feedback-insight-badge${item.important ? ' feedback-insight-badge--important' : ''}`}>
                      {item.badge}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        <div className="feedback-actions">
          {choice.points !== 1 && (
            <button className="btn-outline" onClick={reviewChoices}>
              ← Revoir les choix
            </button>
          )}
          <button className="btn-next" onClick={onNext}>
            {isLast ? 'Découvrir mes résultats →' : 'Scénario suivant →'}
          </button>
        </div>
      </div>
    </div>
  );
}
