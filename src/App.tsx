import React, { useState } from 'react';
import { useGame } from './hooks/useGame';
import { GameMode } from './types';
import GameModeSelector from './components/GameModeSelector';
import QuestionCard from './components/QuestionCard';
import GameResults from './components/GameResults';
import AnswerFeedback from './components/AnswerFeedback';
import Credits from './components/Credits';
import cars from './data/cars';
import './App.css';

function App() {
  const { gameState, startGame, submitAnswer, continueToNextQuestion, resetGame, getGameStats } = useGame(cars);
  const [showCredits, setShowCredits] = useState(false);

  const handleStartGame = (mode: GameMode) => {
    startGame(mode);
  };

  const handleAnswer = (answer: string) => {
    submitAnswer(answer);
  };

  const handlePlayAgain = () => {
    resetGame();
  };

  const handleContinue = () => {
    continueToNextQuestion();
  };

  const handleGoHome = () => {
    resetGame();
  };

  const handleShowCredits = () => {
    setShowCredits(true);
  };

  const handleCloseCredits = () => {
    setShowCredits(false);
  };

  if (!gameState.isGameStarted) {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Car Finder Game</h1>
          <p>Test your knowledge of cars from around the world!</p>
        </header>
        <GameModeSelector onSelectMode={handleStartGame} onShowCredits={handleShowCredits} />
        {showCredits && <Credits onClose={handleCloseCredits} />}
      </div>
    );
  }

  if (gameState.isGameFinished) {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Car Finder Game</h1>
        </header>
        <GameResults stats={getGameStats()} onPlayAgain={handlePlayAgain} onShowCredits={handleShowCredits} />
        {showCredits && <Credits onClose={handleCloseCredits} />}
      </div>
    );
  }

  // Show answer feedback after submitting an answer
  if (gameState.showAnswerFeedback && gameState.lastAnswerResult) {
    return (
      <div className="App">
        <header className="App-header">
          <div className="header-left">
            <h1>Car Finder Game</h1>
          </div>
          <div className="header-right">
            <div className="score-display">
              Score: {gameState.score}/{gameState.currentQuestion + 1}
            </div>
            <button className="home-button" onClick={handleGoHome}>
              🏠 Home
            </button>
          </div>
        </header>
        <AnswerFeedback
          answerResult={gameState.lastAnswerResult}
          gameMode={gameState.gameMode}
          onContinue={handleContinue}
        />
        {showCredits && <Credits onClose={handleCloseCredits} />}
      </div>
    );
  }

  const currentQuestion = gameState.questions[gameState.currentQuestion];

  return (
    <div className="App">
      <header className="App-header">
        <div className="header-left">
          <h1>Car Finder Game</h1>
        </div>
        <div className="header-right">
          <div className="score-display">
            Score: {gameState.score}/{gameState.currentQuestion + 1}
          </div>
          <button className="home-button" onClick={handleGoHome}>
            🏠 Home
          </button>
        </div>
      </header>
      <QuestionCard
        question={currentQuestion}
        questionNumber={gameState.currentQuestion + 1}
        totalQuestions={gameState.questions.length}
        gameMode={gameState.gameMode}
        onAnswer={handleAnswer}
      />
      
      {showCredits && <Credits onClose={handleCloseCredits} />}
    </div>
  );
}

export default App;
