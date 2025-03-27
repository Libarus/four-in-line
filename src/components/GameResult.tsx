import React from 'react';
import { Player } from '../types/gameTypes';

interface GameResultProps {
    winner: Player | 'draw';
    returnToMenu: () => void;
}

const GameResult: React.FC<GameResultProps> = ({ winner, returnToMenu }) => {
    return (
        <div className='game-result'>
            <h1>{winner === 'draw' ? 'Ничья!' : `Игрок ${winner} победил!`}</h1>
            <button onClick={returnToMenu}>В меню</button>
        </div>
    );
};

export default GameResult;
