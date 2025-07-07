import React from 'react';
import { GameStats } from '../types';
import './GameResults.css';

interface GameResultsProps {
  stats: GameStats;
  onPlayAgain: () => void;
  onShowCredits?: () => void;
}

const GameResults: React.FC<GameResultsProps> = ({ stats, onPlayAgain, onShowCredits }) => {
  const getScoreMessage = (percentage: number) => {
    if (percentage >= 90) return "Excellent! You're a car expert! 🏆";
    if (percentage >= 70) return "Great job! You know your cars! 👍";
    if (percentage >= 50) return "Good effort! Keep learning! 🚗";
    return "Keep practicing! You'll get better! 💪";
  };

  const getScoreColor = (percentage: number) => {
    if (percentage >= 90) return '#4CAF50';
    if (percentage >= 70) return '#2196F3';
    if (percentage >= 50) return '#FF9800';
    return '#F44336';
  };

  return (
    <div className="game-results">
      <div className="results-container">
        <h2>Game Complete!</h2>
        
        <div className="score-circle">
          <div 
            className="score-fill"
            style={{ 
              background: `conic-gradient(${getScoreColor(stats.percentage)} ${stats.percentage * 3.6}deg, #e0e0e0 0deg)`
            }}
          >
            <div className="score-content">
              <span className="score-percentage">{stats.percentage}%</span>
              <span className="score-fraction">
                {stats.correctAnswers}/{stats.totalQuestions}
              </span>
            </div>
          </div>
        </div>

        <div className="score-details">
          <div className="stat-item">
            <span className="stat-label">Correct Answers</span>
            <span className="stat-value">{stats.correctAnswers}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Total Questions</span>
            <span className="stat-value">{stats.totalQuestions}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Accuracy</span>
            <span className="stat-value">{stats.percentage}%</span>
          </div>
        </div>

        <p className="score-message">{getScoreMessage(stats.percentage)}</p>

        <div className="action-buttons">
          <button className="play-again-button" onClick={onPlayAgain}>
            Play Again
          </button>
          {onShowCredits && (
            <button className="credits-button-results" onClick={onShowCredits}>
              📷 Credits
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default GameResults;