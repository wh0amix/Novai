import useQuiz from '../hooks/useQuiz';
import HookPhase from './HookPhase';
import ScenarioPhase from './ScenarioPhase';
import ResultPhase from './ResultPhase';
import ResourcesPhase from './ResourcesPhase';

export default function PhaseRouter() {
  const { currentPhase } = useQuiz();

  switch (currentPhase) {
    case 'hook':
      return <HookPhase />;
    case 'scenario':
      return <ScenarioPhase />;
    case 'result':
      return <ResultPhase />;
    case 'resources':
      return <ResourcesPhase />;
    default:
      return null;
  }
}
