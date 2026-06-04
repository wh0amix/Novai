import { useReducer, useEffect } from 'react';
import { verifyIdentityToken } from '../services/token';
import scenarios from '../data/scenarios';
import { QuizContext, QuizDispatchContext } from './quizContexts';

const QUIZ_STORAGE_KEY = 'novai-quiz-state-v1';
const validPhases = new Set(['hook', 'intro', 'scenario', 'result', 'resources']);

const initialState = {
  currentPhase: 'hook',
  currentScenarioIndex: 0,
  answers: [],
  firstAttemptAnswers: [],
  showFeedback: false,
  lastChoice: null,
  userIdentity: null,
  reviewCount: 0,
  memoDownloaded: false,
};

function readPersistedState() {
  if (typeof window === 'undefined') return null;

  try {
    const rawState = window.localStorage.getItem(QUIZ_STORAGE_KEY);
    if (!rawState) return null;

    const parsedState = JSON.parse(rawState);
    if (!parsedState || typeof parsedState !== 'object') return null;

    const safeScenarioIndex = Number.isInteger(parsedState.currentScenarioIndex)
      ? Math.min(Math.max(parsedState.currentScenarioIndex, 0), scenarios.length - 1)
      : initialState.currentScenarioIndex;

    return {
      ...initialState,
      currentPhase: validPhases.has(parsedState.currentPhase) ? parsedState.currentPhase : initialState.currentPhase,
      currentScenarioIndex: safeScenarioIndex,
      answers: Array.isArray(parsedState.answers) ? parsedState.answers : initialState.answers,
      firstAttemptAnswers: Array.isArray(parsedState.firstAttemptAnswers) ? parsedState.firstAttemptAnswers : initialState.firstAttemptAnswers,
      showFeedback: Boolean(parsedState.showFeedback),
      lastChoice: parsedState.lastChoice ?? null,
      reviewCount: Number.isInteger(parsedState.reviewCount) ? parsedState.reviewCount : initialState.reviewCount,
      memoDownloaded: Boolean(parsedState.memoDownloaded),
    };
  } catch {
    return null;
  }
}

function getInitialState() {
  return readPersistedState() ?? initialState;
}

function persistState(state) {
  if (typeof window === 'undefined') return;

  const persistedState = {
    currentPhase: state.currentPhase,
    currentScenarioIndex: state.currentScenarioIndex,
    answers: state.answers,
    firstAttemptAnswers: state.firstAttemptAnswers,
    showFeedback: state.showFeedback,
    lastChoice: state.lastChoice,
    reviewCount: state.reviewCount,
    memoDownloaded: state.memoDownloaded,
  };

  window.localStorage.setItem(QUIZ_STORAGE_KEY, JSON.stringify(persistedState));
}

function quizReducer(state, action) {
  switch (action.type) {
    case 'START_QUIZ':
      return { ...state, currentPhase: 'intro' };

    case 'GO_TO_SCENARIOS':
      return { ...state, currentPhase: 'scenario' };

    case 'SELECT_CHOICE':
      return {
        ...state,
        lastChoice: action.payload,
      };

    case 'SUBMIT_CHOICE':
        if (!state.lastChoice) {
          return {
            ...state,
            showFeedback: true,
          };
        }

        return {
          ...state,
          firstAttemptAnswers: state.firstAttemptAnswers.some(
            (answer) => answer.scenarioId === scenarios[state.currentScenarioIndex].id,
          )
            ? state.firstAttemptAnswers
            : [
              ...state.firstAttemptAnswers,
              {
                scenarioId: scenarios[state.currentScenarioIndex].id,
                choiceId: state.lastChoice.id,
                profile: state.lastChoice.profile,
                points: state.lastChoice.points,
              },
            ],
          showFeedback: true,
        };

    case 'REVIEW_CHOICES':
      return {
        ...state,
        showFeedback: false,
        reviewCount: state.reviewCount + 1,
      };

    case 'NEXT_SCENARIO': {
      const newAnswers = [
        ...state.answers,
        {
          scenarioId: action.payload.scenarioId,
          choiceId: state.lastChoice.id,
          profile: state.lastChoice.profile,
          points: state.lastChoice.points,
        },
      ];
      const nextIndex = state.currentScenarioIndex + 1;
      const isFinished = nextIndex >= scenarios.length;

      return {
        ...state,
        answers: newAnswers,
        showFeedback: false,
        lastChoice: null,
        currentScenarioIndex: isFinished ? state.currentScenarioIndex : nextIndex,
        currentPhase: isFinished ? 'result' : 'scenario',
      };
    }

    case 'DOWNLOAD_MEMO':
      return { ...state, memoDownloaded: true };

    case 'SHOW_RESOURCES':
      return { ...state, currentPhase: 'resources' };

    case 'SHOW_RESULTS':
      return { ...state, currentPhase: 'result' };

    case 'GO_HOME':
      return {
        ...state,
        currentPhase: 'hook',
        currentScenarioIndex: 0,
          firstAttemptAnswers: [],
        showFeedback: false,
        lastChoice: null,
      };

    case 'RESTART':
      return { ...initialState, userIdentity: state.userIdentity };

    case 'INIT_IDENTITY':
      return { ...state, userIdentity: action.payload };

    default:
      return state;
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(quizReducer, initialState, getInitialState);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
    if (!token) return;
    verifyIdentityToken(token).then((identity) => {
      if (identity) dispatch({ type: 'INIT_IDENTITY', payload: identity });
    });
  }, []);

  useEffect(() => {
    persistState(state);
  }, [state]);

  return (
    <QuizContext.Provider value={state}>
      <QuizDispatchContext.Provider value={dispatch}>
        {children}
      </QuizDispatchContext.Provider>
    </QuizContext.Provider>
  );
}
