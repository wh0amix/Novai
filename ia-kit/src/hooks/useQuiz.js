import scenarios from '../data/scenarios';
import profiles from '../data/profiles';
import { useQuizState, useQuizDispatch } from '../context/useQuizContext';

export default function useQuiz() {
  const state = useQuizState();
  const dispatch = useQuizDispatch();

  const currentScenario = scenarios[state.currentScenarioIndex] ?? null;

  const userProfile = calculateProfile(state.answers, state.firstAttemptAnswers);

  function calculateProfile(answers, firstAttemptAnswers) {
    if (answers.length < scenarios.length) return null;

    const allProfileKeys = ['captain', 'explorer', 'skeptic'];
    const realCounts = firstAttemptAnswers.reduce((acc, answer) => {
      acc[answer.profile] = (acc[answer.profile] || 0) + 1;
      return acc;
    }, {
      captain: 0,
      explorer: 0,
      skeptic: 0,
    });

    const profilePercentages = allProfileKeys.reduce((acc, key) => {
      acc[key] = Math.round((realCounts[key] / scenarios.length) * 100);
      return acc;
    }, {});

    const counts = answers.reduce((acc, answer) => {
      acc[answer.profile] = (acc[answer.profile] || 0) + 1;
      return acc;
    }, {
      captain: 0,
      explorer: 0,
      skeptic: 0,
    });

    const maxCount = Math.max(...Object.values(counts));
    const topProfiles = Object.keys(counts).filter((k) => counts[k] === maxCount);
    const profileKey = topProfiles.length === 1 ? topProfiles[0] : 'explorer';

    // Calcul du score en pourcentage (maximum = 10 points pour 10 scénarios)
    const totalPoints = answers.reduce((sum, a) => sum + (a.points ?? 0), 0);
    const realPoints = firstAttemptAnswers.reduce((sum, a) => sum + (a.points ?? 0), 0);
    const maxPoints = scenarios.length; // 10 points max
    const improvedScore = Math.round((totalPoints / maxPoints) * 100);
    const realScore = Math.round((realPoints / maxPoints) * 100);

    const firstAttemptByScenario = new Map(
      firstAttemptAnswers.map((entry) => [entry.scenarioId, entry.points ?? 0]),
    );
    const correctedCount = answers.reduce((count, answer) => {
      const firstPoints = firstAttemptByScenario.get(answer.scenarioId);
      if (typeof firstPoints !== 'number') return count;
      const finalPoints = answer.points ?? 0;
      return firstPoints < 1 && finalPoints > firstPoints ? count + 1 : count;
    }, 0);

    return {
      key: profileKey,
      ...profiles[profileKey],
      score: improvedScore,
      realScore,
      improvedScore,
      profilePercentages,
      totalPoints,
      realPoints,
      maxPoints,
      correctedCount,
    };
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

  const downloadMemo = () => dispatch({ type: 'DOWNLOAD_MEMO' });
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
    downloadMemo,
    showResources,
    showResults,
    restart,
  };
}
