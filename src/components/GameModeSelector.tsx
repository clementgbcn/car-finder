import React from 'react';
import { GameMode } from '../types';
import './GameModeSelector.css';

interface GameModeSelectorProps {
  onSelectMode: (mode: GameMode) => void;
  onShowCredits: () => void;
}

const GameModeSelector: React.FC<GameModeSelectorProps> = ({ onSelectMode, onShowCredits }) => {
  const handleCreditsClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onShowCredits();
  };
  const modes = [
    {
      mode: GameMode.BRAND_MULTIPLE_CHOICE,
      title: 'Brand Recognition - Multiple Choice',
      description: 'Identify the car brand from 4 options'
    },
    {
      mode: GameMode.BRAND_INPUT,
      title: 'Brand Recognition - Input',
      description: 'Type the car brand name'
    },
    {
      mode: GameMode.MODEL_MULTIPLE_CHOICE,
      title: 'Model Recognition - Multiple Choice',
      description: 'Identify the car model from 4 options'
    },
    {
      mode: GameMode.MODEL_INPUT,
      title: 'Model Recognition - Input',
      description: 'Type the car model name'
    }
  ];

  return (
    <div className="game-mode-selector">
      <h2>Choose Your Challenge</h2>
      <div className="mode-grid">
        {modes.map(({ mode, title, description }) => (
          <button
            key={mode}
            className="mode-card"
            onClick={() => onSelectMode(mode)}
          >
            <h3>{title}</h3>
            <p>{description}</p>
          </button>
        ))}
      </div>
      
      <div className="credits-section">
        <button className="credits-button" onClick={handleCreditsClick}>
          📷 Image Credits & Attributions
        </button>
      </div>
    </div>
  );
};

export default GameModeSelector;