import { useContext } from 'react';
import { QuizContext, QuizDispatchContext } from './quizContexts';

export function useQuizState() {
  return useContext(QuizContext);
}

export function useQuizDispatch() {
  return useContext(QuizDispatchContext);
}