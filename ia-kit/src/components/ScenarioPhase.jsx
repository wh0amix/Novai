import useQuiz from '../hooks/useQuiz';
import ScenarioCard from './ScenarioCard';

export default function ScenarioPhase() {
  const { currentScenario, progress } = useQuiz();

  return (
    <section className="phase scenario-phase" aria-label="Scénario en cours">
      <span className="scenario-progress-badge">
        Scénario {progress.current} / {progress.total}
      </span>
      <ScenarioCard scenario={currentScenario} />
    </section>
  );
}
