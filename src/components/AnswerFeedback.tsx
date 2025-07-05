import React from 'react';
import { AnswerResult, GameMode } from '../types';
import './AnswerFeedback.css';

interface AnswerFeedbackProps {
  answerResult: AnswerResult;
  gameMode: GameMode;
  onContinue: () => void;
}

const AnswerFeedback: React.FC<AnswerFeedbackProps> = ({
  answerResult,
  gameMode,
  onContinue
}) => {
  const { isCorrect, userAnswer, correctAnswer, car } = answerResult;
  const isAskingBrand = gameMode.includes('brand');

  return (
    <div className="answer-feedback">
      <div className="feedback-container">
        <div className={`feedback-header ${isCorrect ? 'correct' : 'incorrect'}`}>
          {isCorrect ? (
            <>
              <div className="feedback-icon">✓</div>
              <h2>Correct!</h2>
            </>
          ) : (
            <>
              <div className="feedback-icon">✗</div>
              <h2>Incorrect</h2>
            </>
          )}
        </div>

        <div className="car-info">
          <img
            src={car.imageUrl}
            alt={car.fullName}
            className="feedback-car-image"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = '/placeholder-car.jpg';
            }}
          />
          
          <div className="car-details">
            <h3>{car.fullName}</h3>
            
            <div className="answer-comparison">
              {!isCorrect && (
                <div className="user-answer">
                  <span className="label">Your answer:</span>
                  <span className="value incorrect-answer">{userAnswer}</span>
                </div>
              )}
              
              <div className="correct-answer">
                <span className="label">
                  {isCorrect ? 'You correctly identified the' : 'Correct answer:'} {isAskingBrand ? 'brand' : 'model'}:
                </span>
                <span className="value correct-answer-text">{correctAnswer}</span>
              </div>
            </div>

            <div className="car-link">
              <a 
                href={car.wikipediaUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="wikipedia-link"
              >
                Learn more on Wikipedia →
              </a>
            </div>
          </div>
        </div>

        <button className="continue-button" onClick={onContinue}>
          Continue to Next Question
        </button>
      </div>
    </div>
  );
};

export default AnswerFeedback;