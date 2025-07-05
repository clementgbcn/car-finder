import { generateRandomOptions, generateQuestions, isAnswerCorrect, calculateScore } from '../gameLogic';
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

describe('gameLogic', () => {
  describe('generateRandomOptions', () => {
    it('should return correct number of options', () => {
      const allOptions = ['Ferrari', 'Lamborghini', 'Porsche', 'BMW', 'Audi'];
      const options = generateRandomOptions('Ferrari', allOptions, 4);
      
      expect(options).toHaveLength(4);
      expect(options).toContain('Ferrari');
    });

    it('should not include duplicates', () => {
      const allOptions = ['Ferrari', 'Lamborghini', 'Porsche', 'BMW', 'Audi'];
      const options = generateRandomOptions('Ferrari', allOptions, 4);
      
      const uniqueOptions = [...new Set(options)];
      expect(uniqueOptions).toHaveLength(4);
    });

    it('should handle case where not enough options available', () => {
      const allOptions = ['Ferrari', 'BMW'];
      const options = generateRandomOptions('Ferrari', allOptions, 4);
      
      expect(options).toHaveLength(2);
      expect(options).toContain('Ferrari');
    });
  });

  describe('generateQuestions', () => {
    it('should generate correct number of questions', () => {
      const questions = generateQuestions(mockCars, GameMode.BRAND_MULTIPLE_CHOICE, 3);
      
      expect(questions).toHaveLength(3);
    });

    it('should generate brand multiple choice questions correctly', () => {
      const questions = generateQuestions(mockCars, GameMode.BRAND_MULTIPLE_CHOICE, 2);
      
      questions.forEach(question => {
        expect(question.options).toHaveLength(4);
        expect(question.options).toContain(question.correctAnswer);
        expect(question.correctAnswer).toBe(question.car.brand);
      });
    });

    it('should generate brand input questions correctly', () => {
      const questions = generateQuestions(mockCars, GameMode.BRAND_INPUT, 2);
      
      questions.forEach(question => {
        expect(question.options).toHaveLength(0);
        expect(question.correctAnswer).toBe(question.car.brand);
      });
    });

    it('should generate model multiple choice questions correctly', () => {
      const questions = generateQuestions(mockCars, GameMode.MODEL_MULTIPLE_CHOICE, 2);
      
      questions.forEach(question => {
        expect(question.options).toHaveLength(4);
        expect(question.options).toContain(question.correctAnswer);
        expect(question.correctAnswer).toBe(question.car.model);
      });
    });

    it('should generate model input questions correctly', () => {
      const questions = generateQuestions(mockCars, GameMode.MODEL_INPUT, 2);
      
      questions.forEach(question => {
        expect(question.options).toHaveLength(0);
        expect(question.correctAnswer).toBe(question.car.model);
      });
    });
  });

  describe('isAnswerCorrect', () => {
    it('should return true for exact match', () => {
      expect(isAnswerCorrect('Ferrari', 'Ferrari')).toBe(true);
    });

    it('should return true for case-insensitive match', () => {
      expect(isAnswerCorrect('ferrari', 'Ferrari')).toBe(true);
      expect(isAnswerCorrect('FERRARI', 'Ferrari')).toBe(true);
    });

    it('should return true for match with extra whitespace', () => {
      expect(isAnswerCorrect(' Ferrari ', 'Ferrari')).toBe(true);
      expect(isAnswerCorrect('Ferrari ', ' Ferrari')).toBe(true);
    });

    it('should return false for incorrect answer', () => {
      expect(isAnswerCorrect('Ferrari', 'Lamborghini')).toBe(false);
    });

    it('should return false for partial match', () => {
      expect(isAnswerCorrect('Ferr', 'Ferrari')).toBe(false);
    });
  });

  describe('calculateScore', () => {
    it('should calculate percentage correctly', () => {
      expect(calculateScore(8, 10)).toBe(80);
      expect(calculateScore(10, 10)).toBe(100);
      expect(calculateScore(0, 10)).toBe(0);
    });

    it('should round to nearest integer', () => {
      expect(calculateScore(1, 3)).toBe(33);
      expect(calculateScore(2, 3)).toBe(67);
    });

    it('should handle zero total questions', () => {
      expect(calculateScore(0, 0)).toBeNaN();
    });
  });
});