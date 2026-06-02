import { createContext, useContext, useReducer } from 'react';

const QuizContext = createContext(null);
const QuizDispatchContext = createContext(null);

const initialState = {
  currentPhase: 'hook',
  currentScenarioIndex: 0,
  answers: [],
  showFeedback: false,
  lastChoice: null,
};

function quizReducer(state, action) {
  switch (action.type) {
    case 'START_QUIZ':
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
      const isFinished = nextIndex >= 3;

      return {
        ...state,
        answers: newAnswers,
        showFeedback: false,
        lastChoice: null,
        currentScenarioIndex: isFinished ? state.currentScenarioIndex : nextIndex,
        currentPhase: isFinished ? 'result' : 'scenario',
      };
    }

    case 'RESTART':
      return { ...initialState };

    default:
      return state;
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(quizReducer, initialState);

  return (
    <QuizContext.Provider value={state}>
      <QuizDispatchContext.Provider value={dispatch}>
        {children}
      </QuizDispatchContext.Provider>
    </QuizContext.Provider>
  );
}

export function useQuizState() {
  return useContext(QuizContext);
}

export function useQuizDispatch() {
  return useContext(QuizDispatchContext);
}
