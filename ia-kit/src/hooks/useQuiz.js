import scenarios from '../data/scenarios';
import profiles from '../data/profiles';
import { useQuizState, useQuizDispatch } from '../context/QuizContext';

export default function useQuiz() {
  const state = useQuizState();
  const dispatch = useQuizDispatch();

  const currentScenario = scenarios[state.currentScenarioIndex] ?? null;

  const userProfile = calculateProfile(state.answers);

  function calculateProfile(answers) {
    if (answers.length < 3) return null;

    const counts = answers.reduce((acc, answer) => {
      acc[answer.profile] = (acc[answer.profile] || 0) + 1;
      return acc;
    }, {});

    const maxCount = Math.max(...Object.values(counts));
    const topProfiles = Object.keys(counts).filter((k) => counts[k] === maxCount);
    const profileKey = topProfiles.length === 1 ? topProfiles[0] : 'explorer';

    const score = Math.round(
      answers.reduce((sum, a) => sum + (a.points ?? 0), 0) / answers.length
    );

    return { key: profileKey, ...profiles[profileKey], score };
  }

  const startQuiz = () => dispatch({ type: 'START_QUIZ' });

  const goToScenarios = () => dispatch({ type: 'GO_TO_SCENARIOS' });

  const selectChoice = (choice) =>
    dispatch({ type: 'SELECT_CHOICE', payload: choice });

  const submitChoice = () =>
    dispatch({ type: 'SUBMIT_CHOICE' });

  const reviewChoices = () =>
    dispatch({ type: 'REVIEW_CHOICES' });

  const nextScenario = (scenarioId) =>
    dispatch({ type: 'NEXT_SCENARIO', payload: { scenarioId } });

  const showResources = () => dispatch({ type: 'SHOW_RESOURCES' });
  const showResults = () => dispatch({ type: 'SHOW_RESULTS' });
  const restart = () => dispatch({ type: 'RESTART' });

  const progress = {
    current: state.currentScenarioIndex + 1,
    total: scenarios.length,
  };

  return {
    ...state,
    currentScenario,
    userProfile,
    progress,
    startQuiz,
    goToScenarios,
    selectChoice,
    submitChoice,
    reviewChoices,
    nextScenario,
    showResources,
    showResults,
    restart,
  };
}
