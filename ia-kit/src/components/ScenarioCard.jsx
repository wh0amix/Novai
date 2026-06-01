import useQuiz from '../hooks/useQuiz';
import ChoiceButton from './ChoiceButton';
import Feedback from './Feedback';

export default function ScenarioCard({ scenario }) {
  const { showFeedback, lastChoice, selectChoice, submitChoice, nextScenario } = useQuiz();

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
      <h2 className="scenario-title">{scenario.title}</h2>

      <div className="scenario-context-card">
        <div className="scenario-context-icon" aria-hidden="true">📋</div>
        <div>
          <p className="scenario-context-label">Contexte</p>
          <p className="scenario-context-text">{scenario.context}</p>
        </div>
      </div>

      <p className="scenario-question">Comment gérez-vous cette situation ?</p>

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
