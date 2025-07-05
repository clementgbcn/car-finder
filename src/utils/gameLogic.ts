import { Car, GameQuestion, GameMode } from '../types';

export const shuffleArray = <T>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export const generateRandomOptions = (
  correctAnswer: string,
  allOptions: string[],
  count: number = 4
): string[] => {
  const otherOptions = allOptions.filter(option => option !== correctAnswer);
  const selectedOptions = shuffleArray(otherOptions).slice(0, count - 1);
  return shuffleArray([correctAnswer, ...selectedOptions]);
};

export const generateQuestions = (
  cars: Car[],
  gameMode: GameMode,
  count: number = 20
): GameQuestion[] => {
  const selectedCars = shuffleArray(cars).slice(0, count);
  
  return selectedCars.map(car => {
    let correctAnswer: string;
    let allOptions: string[];
    
    switch (gameMode) {
      case GameMode.BRAND_MULTIPLE_CHOICE:
        correctAnswer = car.brand;
        allOptions = Array.from(new Set(cars.map(c => c.brand)));
        break;
      case GameMode.BRAND_INPUT:
        correctAnswer = car.brand;
        allOptions = [];
        break;
      case GameMode.MODEL_MULTIPLE_CHOICE:
        correctAnswer = car.model;
        allOptions = Array.from(new Set(cars.map(c => c.model)));
        break;
      case GameMode.MODEL_INPUT:
        correctAnswer = car.model;
        allOptions = [];
        break;
      default:
        correctAnswer = car.brand;
        allOptions = Array.from(new Set(cars.map(c => c.brand)));
    }
    
    const options = gameMode.includes('multiple-choice') 
      ? generateRandomOptions(correctAnswer, allOptions, 4)
      : [];
    
    return {
      car,
      options,
      correctAnswer
    };
  });
};

export const isAnswerCorrect = (userAnswer: string, correctAnswer: string): boolean => {
  return userAnswer.toLowerCase().trim() === correctAnswer.toLowerCase().trim();
};

export const calculateScore = (correctAnswers: number, totalQuestions: number): number => {
  return Math.round((correctAnswers / totalQuestions) * 100);
};