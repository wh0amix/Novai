import { useReducer, useEffect } from 'react';
import { verifyIdentityToken } from '../services/token';
import scenarios from '../data/scenarios';
import { QuizContext, QuizDispatchContext } from './quizContexts';

const initialState = {
  currentPhase: 'hook',
  currentScenarioIndex: 0,
  answers: [],
  showFeedback: false,
  lastChoice: null,
  userIdentity: null,
  reviewCount: 0,
  memoDownloaded: false,
};

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
      return {
        ...state,
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
  const [state, dispatch] = useReducer(quizReducer, initialState);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
    if (!token) return;
    verifyIdentityToken(token).then((identity) => {
      if (identity) dispatch({ type: 'INIT_IDENTITY', payload: identity });
    });
  }, []);

  return (
    <QuizContext.Provider value={state}>
      <QuizDispatchContext.Provider value={dispatch}>
        {children}
      </QuizDispatchContext.Provider>
    </QuizContext.Provider>
  );
}
