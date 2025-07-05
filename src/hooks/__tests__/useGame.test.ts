import { renderHook, act } from '@testing-library/react';
import { useGame } from '../useGame';
import { Car, GameMode } from '../../types';

const mockCars: Car[] = [
  {
    id: '1',
    brand: 'Ferrari',
    model: 'F40',
    fullName: 'Ferrari F40',
    imageUrl: '/images/ferrari-f40.jpg',
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Ferrari_F40'
  },
  {
    id: '2',
    brand: 'Lamborghini',
    model: 'Countach',
    fullName: 'Lamborghini Countach',
    imageUrl: '/images/lamborghini-countach.jpg',
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Lamborghini_Countach'
  },
  {
    id: '3',
    brand: 'Porsche',
    model: '911',
    fullName: 'Porsche 911',
    imageUrl: '/images/porsche-911.jpg',
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Porsche_911'
  },
  {
    id: '4',
    brand: 'BMW',
    model: 'M3',
    fullName: 'BMW M3',
    imageUrl: '/images/bmw-m3.jpg',
    wikipediaUrl: 'https://en.wikipedia.org/wiki/BMW_M3'
  }
];

describe('useGame', () => {
  it('should initialize with correct default state', () => {
    const { result } = renderHook(() => useGame(mockCars));
    
    expect(result.current.gameState.currentQuestion).toBe(0);
    expect(result.current.gameState.score).toBe(0);
    expect(result.current.gameState.questions).toHaveLength(0);
    expect(result.current.gameState.isGameStarted).toBe(false);
    expect(result.current.gameState.isGameFinished).toBe(false);
    expect(result.current.gameState.showAnswerFeedback).toBe(false);
    expect(result.current.gameState.lastAnswerResult).toBe(null);
  });

  it('should start game correctly', () => {
    const { result } = renderHook(() => useGame(mockCars));
    
    act(() => {
      result.current.startGame(GameMode.BRAND_MULTIPLE_CHOICE);
    });
    
    expect(result.current.gameState.isGameStarted).toBe(true);
    expect(result.current.gameState.gameMode).toBe(GameMode.BRAND_MULTIPLE_CHOICE);
    expect(result.current.gameState.questions.length).toBeGreaterThan(0);
  });

  it('should handle correct answer', () => {
    const { result } = renderHook(() => useGame(mockCars));
    
    act(() => {
      result.current.startGame(GameMode.BRAND_MULTIPLE_CHOICE);
    });
    
    // Get the correct answer for the first question
    const firstQuestion = result.current.gameState.questions[0];
    const correctAnswer = firstQuestion.correctAnswer;
    
    act(() => {
      const isCorrect = result.current.submitAnswer(correctAnswer);
      expect(isCorrect).toBe(true);
    });
    
    expect(result.current.gameState.score).toBe(1);
    expect(result.current.gameState.showAnswerFeedback).toBe(true);
    expect(result.current.gameState.lastAnswerResult?.isCorrect).toBe(true);
    expect(result.current.gameState.currentQuestion).toBe(0); // Still on same question until continue
  });

  it('should handle incorrect answer', () => {
    const { result } = renderHook(() => useGame(mockCars));
    
    act(() => {
      result.current.startGame(GameMode.BRAND_MULTIPLE_CHOICE);
    });
    
    act(() => {
      const isCorrect = result.current.submitAnswer('IncorrectAnswer');
      expect(isCorrect).toBe(false);
    });
    
    expect(result.current.gameState.score).toBe(0);
    expect(result.current.gameState.showAnswerFeedback).toBe(true);
    expect(result.current.gameState.lastAnswerResult?.isCorrect).toBe(false);
    expect(result.current.gameState.currentQuestion).toBe(0); // Still on same question until continue
  });

  it('should reset game correctly', () => {
    const { result } = renderHook(() => useGame(mockCars));
    
    act(() => {
      result.current.startGame(GameMode.BRAND_MULTIPLE_CHOICE);
    });
    
    act(() => {
      result.current.resetGame();
    });
    
    expect(result.current.gameState.currentQuestion).toBe(0);
    expect(result.current.gameState.score).toBe(0);
    expect(result.current.gameState.isGameStarted).toBe(false);
    expect(result.current.gameState.isGameFinished).toBe(false);
  });

  it('should calculate game stats correctly', () => {
    const { result } = renderHook(() => useGame(mockCars));
    
    act(() => {
      result.current.startGame(GameMode.BRAND_MULTIPLE_CHOICE);
    });
    
    const stats = result.current.getGameStats();
    expect(stats.totalQuestions).toBeGreaterThan(0);
    expect(stats.correctAnswers).toBe(0);
    expect(stats.percentage).toBe(0);
  });
});