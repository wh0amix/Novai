import useQuiz from '../hooks/useQuiz';
import Home from './Home';
import ScenarioPhase from './ScenarioPhase';
import ResultPhase from './ResultPhase';

export default function PhaseRouter() {
  const { currentPhase } = useQuiz();

  switch (currentPhase) {
    case 'hook':
      return <Home />;
    case 'scenario':
      return <ScenarioPhase />;
    case 'result':
      return <ResultPhase />;
    default:
      return null;
  }
}
