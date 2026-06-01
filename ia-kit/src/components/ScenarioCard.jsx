import useQuiz from '../hooks/useQuiz';
import ChoiceButton from './ChoiceButton';
import Feedback from './Feedback';

export default function ScenarioCard({ scenario }) {
  const { showFeedback, lastChoice, selectChoice, nextScenario } = useQuiz();

  return (
    <article className="scenario-card" aria-label={`Scénario : ${scenario.title}`}>
      <h2 className="scenario-title">{scenario.title}</h2>
      <p className="scenario-context">{scenario.context}</p>

      <div className="choices" role="group" aria-label="Vos choix">
        {scenario.choices.map((choice, index) => (
          <ChoiceButton
            key={choice.id}
            choice={choice}
            index={index}
            isSelected={lastChoice?.id === choice.id}
            isDisabled={showFeedback}
            onSelect={selectChoice}
          />
        ))}
      </div>

      {showFeedback && lastChoice && (
        <Feedback
          feedback={lastChoice.feedback}
          onNext={() => nextScenario(scenario.id)}
        />
      )}
    </article>
  );
}
