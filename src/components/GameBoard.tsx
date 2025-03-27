import React, { useState, useEffect } from 'react';
import Chip from './Chip';
import { Board, TChip, ChipSize, GameMode, Player, PlayerChips } from '../types/gameTypes';

interface GameBoardProps {
  gameMode: GameMode;
  endGame: (winner: Player | 'draw') => void;
  returnToMenu: () => void;
}

const GameBoard: React.FC<GameBoardProps> = ({ gameMode, endGame, returnToMenu }) => {
  const initialBoard: Board = Array(4).fill(null).map(() => Array(4).fill(null));
  
  const initialPlayerChips = {
    small: 16,
    medium: 16,
    large: 16
  };

  const [board, setBoard] = useState<Board>(initialBoard);
  const [currentPlayer, setCurrentPlayer] = useState<Player>(1);
  const [playerChips, setPlayerChips] = useState<Record<Player, PlayerChips>>({
    1: { ...initialPlayerChips },
    2: { ...initialPlayerChips }
  });

  useEffect(() => {
    if (gameMode === 'computer' && currentPlayer === 2) {
      makeComputerMove();
    }
  }, [currentPlayer]);

  const getNextChipSize = (cell: TChip | null): ChipSize | null => {
    if (!cell) return 'small';
    if (cell.size === 'small') return 'medium';
    if (cell.size === 'medium') return 'large';
    return null;
  };

  const makeComputerMove = () => {
    setTimeout(() => {
      const validMoves: { row: number; col: number; size: ChipSize }[] = [];
      
      for (let row = 0; row < 4; row++) {
        for (let col = 0; col < 4; col++) {
          const cell = board[row][col];
          const nextSize = getNextChipSize(cell);
          
          if (nextSize && playerChips[2][nextSize] > 0) {
            validMoves.push({ row, col, size: nextSize });
          }
        }
      }
      
      if (validMoves.length > 0) {
        const randomMove = validMoves[Math.floor(Math.random() * validMoves.length)];
        handleCellClick(randomMove.row, randomMove.col);
      } else {
        // Нет возможных ходов - ничья
        endGame('draw');
      }
    }, 1000);
  };

  const handleCellClick = (row: number, col: number) => {
    const cell = board[row][col];
    const nextSize = getNextChipSize(cell);
    
    if (!nextSize || playerChips[currentPlayer][nextSize] <= 0) {
      return;
    }
    
    const newBoard = [...board];
    newBoard[row] = [...board[row]];
    newBoard[row][col] = { player: currentPlayer, size: nextSize };
    
    const newPlayerChips = { ...playerChips };
    newPlayerChips[currentPlayer] = { ...playerChips[currentPlayer] };
    newPlayerChips[currentPlayer][nextSize] -= 1;
    
    setBoard(newBoard);
    setPlayerChips(newPlayerChips);
    
    if (checkWin(newBoard, row, col, currentPlayer)) {
      endGame(currentPlayer);
      return;
    }
    
    // Проверка на ничью
    if (isDraw(newPlayerChips)) {
      endGame('draw');
      return;
    }
    
    setCurrentPlayer(currentPlayer === 1 ? 2 : 1);
  };

  const isDraw = (chips: Record<Player, PlayerChips>): boolean => {
    // Проверяем, есть ли у обоих игроков хотя бы один возможный ход
    for (let player of [1, 2] as Player[]) {
      for (let row = 0; row < 4; row++) {
        for (let col = 0; col < 4; col++) {
          const cell = board[row][col];
          const nextSize = getNextChipSize(cell);
          if (nextSize && chips[player][nextSize] > 0) {
            return false;
          }
        }
      }
    }
    return true;
  };

  const checkWin = (board: Board, row: number, col: number, player: Player): boolean => {
    const directions = [
      [0, 1],  // горизонталь
      [1, 0],  // вертикаль
      [1, 1],  // диагональ вниз-вправо
      [1, -1]  // диагональ вниз-влево
    ];
    
    for (const [dx, dy] of directions) {
      let count = 1;
      
      // Проверяем в положительном направлении
      for (let i = 1; i < 4; i++) {
        const newRow = row + i * dx;
        const newCol = col + i * dy;
        
        if (
          newRow >= 0 && newRow < 4 &&
          newCol >= 0 && newCol < 4 &&
          board[newRow][newCol]?.player === player
        ) {
          count++;
        } else {
          break;
        }
      }
      
      // Проверяем в отрицательном направлении
      for (let i = 1; i < 4; i++) {
        const newRow = row - i * dx;
        const newCol = col - i * dy;
        
        if (
          newRow >= 0 && newRow < 4 &&
          newCol >= 0 && newCol < 4 &&
          board[newRow][newCol]?.player === player
        ) {
          count++;
        } else {
          break;
        }
      }
      
      if (count >= 4) {
        return true;
      }
    }
    
    return false;
  };

  const renderCell = (row: number, col: number) => {
    const cell = board[row][col];
    const isInteractive = gameMode === 'player' || currentPlayer === 1;
    
    return (
      <div 
        className={`cell ${isInteractive ? 'interactive' : ''}`}
        onClick={() => isInteractive && handleCellClick(row, col)}
      >
        {cell && <Chip player={cell.player} size={cell.size} />}
      </div>
    );
  };

  // const getChipCountText = (player: Player, size: ChipSize): string => {
  //   return `${size.charAt(0).toUpperCase() + size.slice(1)}: ${playerChips[player][size]}`;
  // };

  return (
    <div className="game-board">
      <div className="game-info">
        <h2 className={`player-${currentPlayer}-color`}>Ход игрока {currentPlayer}</h2>
        {/*<div className="player-chips">
          <div className="player-1-chips">
            <h3>Игрок 1</h3>
            <p>{getChipCountText(1, 'small')}</p>
            <p>{getChipCountText(1, 'medium')}</p>
            <p>{getChipCountText(1, 'large')}</p>
          </div>
          <div className="player-2-chips">
            <h3>Игрок {gameMode === 'computer' ? 'Компьютер' : '2'}</h3>
            <p>{getChipCountText(2, 'small')}</p>
            <p>{getChipCountText(2, 'medium')}</p>
            <p>{getChipCountText(2, 'large')}</p>
          </div>
        </div>*/}
        <button className="menu-btn" onClick={returnToMenu}>В меню</button>
      </div>
      <div className="board">
        {board.map((row, rowIndex) => (
          <div key={rowIndex} className="board-row">
            {row.map((_, colIndex) => renderCell(rowIndex, colIndex))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GameBoard;