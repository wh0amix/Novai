import useQuiz from '../hooks/useQuiz';
import ScenarioCard from './ScenarioCard';

export default function ScenarioPhase() {
  const { currentScenario, progress } = useQuiz();
  const progressPercentage = (progress.current / progress.total) * 100;

  return (
    <section className="phase scenario-phase" aria-label="Scénario en cours">
      <div className="progress-container" aria-label={`Progression: ${progress.current} sur ${progress.total} scénarios`}>
        <span className="progress-text">
          Scénario {progress.current} / {progress.total}
        </span>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progressPercentage}%` }} />
        </div>
      </div>
      
      <ScenarioCard scenario={currentScenario} />
    </section>
  );
}