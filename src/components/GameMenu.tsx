import React from 'react';
import { GameMode } from '../types/gameTypes';

interface GameMenuProps {
  startGame: (mode: GameMode) => void;
}

const GameMenu: React.FC<GameMenuProps> = ({ startGame }) => {
  return (
    <div className="game-menu">
      <p>
        Правила: Игра для двух игроков. Игроки делают ход по очереди. В игре присутствует 3 размера фишек: маленькие, средние и большие.
        Выставляйте фишки разных размеров. В пустую ячейку можно поставить только маленькую фишку, в ячейку с маленькой только среднюю, а в срднюю только большоую.
        На фишку противника тоже можно ставить свою фишку. Первый, кто соберёт ряд из 4 своих фишек, побеждает!
      </p>
      <div className="menu-buttons">
        <button onClick={() => startGame('player')}>Играть вдвоём</button>
        <button onClick={() => startGame('computer')}>Играть с компьютером</button>
      </div>
    </div>
  );
};

export default GameMenu;