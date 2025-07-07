export interface Car {
  id: string;
  brand: string;
  model: string;
  fullName: string;
  imageUrl: string;
  wikipediaUrl: string;
  license?: string;
  author?: string;
  attribution?: string;
  imageSource?: string;
}

export interface GameQuestion {
  car: Car;
  options: string[];
  correctAnswer: string;
}

export interface GameState {
  currentQuestion: number;
  score: number;
  questions: GameQuestion[];
  gameMode: GameMode;
  isGameStarted: boolean;
  isGameFinished: boolean;
  lastAnswerResult: AnswerResult | null;
  showAnswerFeedback: boolean;
}

export interface AnswerResult {
  isCorrect: boolean;
  userAnswer: string;
  correctAnswer: string;
  car: Car;
}

export enum GameMode {
  BRAND_MULTIPLE_CHOICE = 'brand-multiple-choice',
  BRAND_INPUT = 'brand-input',
  MODEL_MULTIPLE_CHOICE = 'model-multiple-choice',
  MODEL_INPUT = 'model-input'
}

export interface GameStats {
  totalQuestions: number;
  correctAnswers: number;
  percentage: number;
}