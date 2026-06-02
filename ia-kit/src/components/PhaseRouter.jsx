import useQuiz from '../hooks/useQuiz';
import Home from './Home';
import Intro from './Intro';
import ScenarioPhase from './ScenarioPhase';
import ResultPhase from './ResultPhase';
import ResourcesPhase from './ResourcesPhase';

export default function PhaseRouter() {
  const { currentPhase } = useQuiz();

  switch (currentPhase) {
    case 'hook':
      return <Home />;
    case 'intro':
      return <Intro />;
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
