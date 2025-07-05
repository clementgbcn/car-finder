import React, { useState } from 'react';
import { GameQuestion, GameMode } from '../types';
import './QuestionCard.css';

interface QuestionCardProps {
  question: GameQuestion;
  questionNumber: number;
  totalQuestions: number;
  gameMode: GameMode;
  onAnswer: (answer: string) => void;
}

const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  questionNumber,
  totalQuestions,
  gameMode,
  onAnswer
}) => {
  const [inputValue, setInputValue] = useState('');
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const isMultipleChoice = gameMode.includes('multiple-choice');
  const isAskingBrand = gameMode.includes('brand');

  const handleSubmit = () => {
    const answer = isMultipleChoice ? selectedOption : inputValue;
    if (answer) {
      onAnswer(answer);
      setInputValue('');
      setSelectedOption(null);
    }
  };

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
  };

  const handleInputSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      handleSubmit();
    }
  };

  return (
    <div className="question-card">
      <div className="question-header">
        <span className="question-counter">
          Question {questionNumber} of {totalQuestions}
        </span>
        <div className="progress-bar">
          <div 
            className="progress-fill"
            style={{ width: `${(questionNumber / totalQuestions) * 100}%` }}
          />
        </div>
      </div>

      <div className="car-image-container">
        <img
          src={question.car.imageUrl}
          alt="Car to identify"
          className="car-image"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = '/placeholder-car.jpg';
          }}
        />
      </div>

      <div className="question-content">
        <h3>
          What is the {isAskingBrand ? 'brand' : 'model'} of this car?
        </h3>

        {isMultipleChoice ? (
          <div className="options-grid">
            {question.options.map((option, index) => (
              <button
                key={index}
                className={`option-button ${selectedOption === option ? 'selected' : ''}`}
                onClick={() => handleOptionClick(option)}
              >
                {option}
              </button>
            ))}
          </div>
        ) : (
          <form onSubmit={handleInputSubmit} className="input-form">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={`Enter the car ${isAskingBrand ? 'brand' : 'model'}...`}
              className="answer-input"
              autoFocus
            />
          </form>
        )}

        <button
          className="submit-button"
          onClick={handleSubmit}
          disabled={isMultipleChoice ? !selectedOption : !inputValue.trim()}
        >
          Submit Answer
        </button>
      </div>
    </div>
  );
};

export default QuestionCard;