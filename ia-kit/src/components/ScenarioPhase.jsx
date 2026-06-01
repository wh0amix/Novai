import useQuiz from '../hooks/useQuiz';
import ScenarioCard from './ScenarioCard';

export default function ScenarioPhase() {
  const { currentScenario, progress } = useQuiz();

  return (
    <section className="phase scenario-phase" aria-label="Scénario en cours">
      <div className="progress-bar-container" role="progressbar" aria-valuenow={progress.current} aria-valuemin={1} aria-valuemax={progress.total}>
        <div
          className="progress-bar-fill"
          style={{ width: `${(progress.current / progress.total) * 100}%` }}
        />
      </div>
      <p className="progress-text">
        Scénario {progress.current} / {progress.total}
      </p>
      <ScenarioCard scenario={currentScenario} />
    </section>
  );
}
