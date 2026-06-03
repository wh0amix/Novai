import useQuiz from '../hooks/useQuiz';
import ChoiceButton from './ChoiceButton';
import Feedback from './Feedback';
import ScenarioGamification from './ScenarioGamification';

const gamifiedScenarioIds = new Set([
  'sales-analysis-confidentiality',
  'hr-data-confidentiality',
  'promo-team-brief',
]);

export default function ScenarioCard({ scenario }) {
  const { showFeedback, lastChoice, selectChoice, submitChoice, nextScenario } = useQuiz();
  const isGamifiedScenario = gamifiedScenarioIds.has(scenario.id);

  if (showFeedback && lastChoice) {
    return (
      <Feedback
        choice={lastChoice}
        onNext={() => nextScenario(scenario.id)}
      />
    );
  }

  return (
    <article className="scenario-card" aria-label={`Scénario : ${scenario.title}`}>
      {scenario.video && (
        <div className="scenario-image-container scenario-media-container">
          <video
            src={scenario.video}
            className="scenario-video"
            controls
            preload="metadata"
          >
            Votre navigateur ne prend pas en charge la lecture vidéo.
          </video>
        </div>
      )}

      {!scenario.video && scenario.image && (
        <div className="scenario-image-container">
          <img
            src={scenario.image}
            alt={scenario.title}
            className="scenario-image"
            loading="lazy"
          />
        </div>
      )}

      <h2 className="scenario-title">
        {scenario.title}
        {scenario.subtitle && <span className="scenario-subtitle">{scenario.subtitle}</span>}
      </h2>

      <div className="scenario-context-card">
        <div className="scenario-context-icon" aria-hidden="true">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
            <polyline points="14 2 14 8 20 8"/>
            <line x1="16" y1="13" x2="8" y2="13"/>
            <line x1="16" y1="17" x2="8" y2="17"/>
            <polyline points="10 9 9 9 8 9"/>
          </svg>
        </div>
        <div>

          <p className="scenario-context-text">{scenario.context}</p>
        </div>
      </div>

      <p className="scenario-question">Comment gérez-vous cette situation ?</p>

      {isGamifiedScenario ? (
        <ScenarioGamification
          scenario={scenario}
          lastChoice={lastChoice}
          onSelect={selectChoice}
        />
      ) : (
        <div className="choices" role="group" aria-label="Vos choix">
          {scenario.choices.map((choice, index) => (
            <ChoiceButton
              key={choice.id}
              choice={choice}
              index={index}
              isSelected={lastChoice?.id === choice.id}
              onSelect={selectChoice}
            />
          ))}
        </div>
      )}

      <div className="scenario-actions">
        <button
          className="btn-validate"
          onClick={submitChoice}
          disabled={!lastChoice}
          aria-label="Valider mon choix"
        >
          Valider mon choix
        </button>
      </div>
    </article>
  );
}
