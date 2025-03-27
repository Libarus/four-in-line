import React, { useState } from 'react';
import GameMenu from './components/GameMenu';
import GameBoard from './components/GameBoard';
import GameResult from './components/GameResult';
import { GameMode, GameState, Player } from './types/gameTypes';
import './App.css';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>('menu');
  const [gameMode, setGameMode] = useState<GameMode | null>(null);
  const [winner, setWinner] = useState<Player | 'draw' | null>(null);

  const startGame = (mode: GameMode) => {
    setGameMode(mode);
    setGameState('game');
  };

  const endGame = (result: Player | 'draw') => {
    setWinner(result);
    setGameState('result');
  };

  const returnToMenu = () => {
    setGameState('menu');
    setWinner(null);
  };

  return (
    <div className="app">
      <h1>ЧЕТЫРЕ В РЯД</h1>
      <div>
      {gameState === 'menu' && <GameMenu startGame={startGame} />}
      {gameState === 'game' && gameMode && (
        <GameBoard gameMode={gameMode} endGame={endGame} returnToMenu={returnToMenu} />
      )}
      {gameState === 'result' && winner && (
        <GameResult winner={winner} returnToMenu={returnToMenu} />
      )}
      </div>
    </div>
  );
};

export default App;