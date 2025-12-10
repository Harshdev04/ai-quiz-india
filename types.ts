export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

export interface QuizSettings {
  topic: string;
  difficulty: 'Easy' | 'Medium' | 'Hard' | 'Expert';
  questionCount: number;
}

export interface QuizState {
  currentQuestionIndex: number;
  score: number;
  answers: { questionIndex: number; selectedAnswer: string; isCorrect: boolean }[];
  isComplete: boolean;
}

export enum AppStatus {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  QUIZ = 'QUIZ',
  ERROR = 'ERROR',
  RESULTS = 'RESULTS',
}
