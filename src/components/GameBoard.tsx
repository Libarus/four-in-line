import React, { useState, useEffect } from 'react';
import { Chip } from './Chip';
import { Board, TChip, ChipSize, GameMode, Player, PlayerChips } from '../types/gameTypes';
import { Button } from '@/shared/components/ui';
import { cn } from '@/shared/lib/utils';
import { checkWin, getNextChipSize, getSteps } from '@/libs/ai';

interface GameBoardProps {
    gameMode: GameMode;
    gameCells: number;
    endGame: (winner: Player | 'draw') => void;
    returnToMenu: () => void;
}

const GameBoard: React.FC<GameBoardProps> = ({ gameMode, gameCells, endGame, returnToMenu }) => {
    const initialBoard: Board = Array(gameCells)
        .fill(null)
        .map(() => Array(gameCells).fill(null));

    const initialPlayerChips = {
        small: 16,
        medium: 16,
        large: 16,
    };

    const [board, setBoard] = useState<Board>(initialBoard);
    const [currentPlayer, setCurrentPlayer] = useState<Player>(1);
    const [playerChips, setPlayerChips] = useState<Record<Player, PlayerChips>>({
        1: { ...initialPlayerChips },
        2: { ...initialPlayerChips },
    });

    useEffect(() => {
        if (gameMode === 'computer' && currentPlayer === 2) {
            makeComputerMove();
        }
    }, [currentPlayer]);

    const makeComputerMove = () => {
        setTimeout(() => {
            const validMoves: { row: number; col: number; size: ChipSize }[] = [];

            for (let row = 0; row < gameCells; row++) {
                for (let col = 0; col < gameCells; col++) {
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
        }, 100);
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

    const renderCell = (row: number, col: number) => {
        const cell = board[row][col];
        const isInteractive = gameMode === 'player' || currentPlayer === 1;

        const class_name = cn('w-20 h-20 bg-border rounded-md', 'flex items-center justify-center', 'hover:bg-primary/10 transition-colors');

        return (
            <div key={row + col * 4} onClick={() => isInteractive && handleCellClick(row, col)} className={class_name}>
                {cell && <Chip player={cell.player} size={cell.size} />}
            </div>
        );
    };

    const goSteps = () => {
        getSteps(board, currentPlayer);
    }

    return (
        <div>
            <div>
                <h2 className={`player-${currentPlayer}-color text-center text-2xl font-bold pb-10 pt-5`}>Ход игрока {currentPlayer}</h2>
            </div>
            <div className='flex justify-center w-full'>
                <div className={cn(`grid`, `grid-cols-${gameCells}`, `gap-4 w-fit`)}>
                    {board.map((row: (TChip | null)[], rowIndex: number) => (
                        row.map((_, colIndex) => renderCell(rowIndex, colIndex))
                    ))}
                </div>
            </div>
            <div className='text-center pt-5'>
                <Button variant='outline' className='menu-btn' onClick={returnToMenu}>
                    Вернуться в меню
                </Button>
                <hr/>
                <Button variant='outline' className='menu-btn' onClick={goSteps}>
                    Шаги
                </Button>
            </div>
        </div>
    );
};

export default GameBoard;
