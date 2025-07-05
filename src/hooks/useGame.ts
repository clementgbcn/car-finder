import { useState, useCallback } from 'react';
import { GameState, GameMode, Car } from '../types';
import { generateQuestions, isAnswerCorrect, calculateScore } from '../utils/gameLogic';

const initialGameState: GameState = {
  currentQuestion: 0,
  score: 0,
  questions: [],
  gameMode: GameMode.BRAND_MULTIPLE_CHOICE,
  isGameStarted: false,
  isGameFinished: false,
  lastAnswerResult: null,
  showAnswerFeedback: false
};

export const useGame = (cars: Car[]) => {
  const [gameState, setGameState] = useState<GameState>(initialGameState);

  const startGame = useCallback((mode: GameMode) => {
    const questions = generateQuestions(cars, mode, 20);
    setGameState({
      ...initialGameState,
      gameMode: mode,
      questions,
      isGameStarted: true
    });
  }, [cars]);

  const submitAnswer = useCallback((answer: string) => {
    const currentQuestion = gameState.questions[gameState.currentQuestion];
    const isCorrect = isAnswerCorrect(answer, currentQuestion.correctAnswer);
    
    const answerResult = {
      isCorrect,
      userAnswer: answer,
      correctAnswer: currentQuestion.correctAnswer,
      car: currentQuestion.car
    };
    
    const newScore = isCorrect ? gameState.score + 1 : gameState.score;
    
    // Show answer feedback first
    setGameState(prev => ({
      ...prev,
      lastAnswerResult: answerResult,
      showAnswerFeedback: true,
      score: newScore
    }));
    
    return isCorrect;
  }, [gameState]);

  const continueToNextQuestion = useCallback(() => {
    const nextQuestion = gameState.currentQuestion + 1;
    
    if (nextQuestion >= gameState.questions.length) {
      setGameState(prev => ({
        ...prev,
        isGameFinished: true,
        showAnswerFeedback: false,
        lastAnswerResult: null
      }));
    } else {
      setGameState(prev => ({
        ...prev,
        currentQuestion: nextQuestion,
        showAnswerFeedback: false,
        lastAnswerResult: null
      }));
    }
  }, [gameState]);

  const resetGame = useCallback(() => {
    setGameState(initialGameState);
  }, []);

  const getGameStats = useCallback(() => {
    return {
      totalQuestions: gameState.questions.length,
      correctAnswers: gameState.score,
      percentage: calculateScore(gameState.score, gameState.questions.length)
    };
  }, [gameState]);

  return {
    gameState,
    startGame,
    submitAnswer,
    continueToNextQuestion,
    resetGame,
    getGameStats
  };
};