import { useEffect, useState } from 'react';
import GameMenu from '../GameMenu';
import GameBoard from '../GameBoard';
import GameResult from '../GameResult';
import { GameMode, GameState, Player } from '../../types/gameTypes';
import './App.css';

export function App() {
    useEffect(() => {
        if (window.Telegram?.WebApp) {
            const webApp = window.Telegram.WebApp;
            webApp.expand();
            webApp.enableClosingConfirmation();

            // Настройка MainButton
            webApp.MainButton.setText('В меню');
            webApp.MainButton.onClick(() => {
                // Логика возврата в меню
            });
        }
    }, []);

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
        <div className='p-5'>
            <h1 className='text-center text-2xl p-5'>ЧЕТЫРЕ В РЯД</h1>
            <div>
                {gameState === 'menu' && <GameMenu startGame={startGame} />}
                {gameState === 'game' && gameMode && <GameBoard gameMode={gameMode} endGame={endGame} returnToMenu={returnToMenu} />}
                {gameState === 'result' && winner && <GameResult winner={winner} returnToMenu={returnToMenu} />}
            </div>
        </div>
    );
}

export default App;
