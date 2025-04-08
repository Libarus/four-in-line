import { Board, ChipSize, Player, TChip } from '@/types/gameTypes';

let stop = false;
let stepCount = 0;

export function getSteps(board: Board, player: Player) {
    stepCount = 0;
    const shadowBoard = board.map((row: (TChip | null)[]) => [...row]);
    shadowBoard[2][2] = { player: 2, size: 'large' };
    nextMoves(shadowBoard, player);
    console.log('stepCount', stepCount);
}

function nextMoves(board: Board, player: Player) {
    const steps = [];
    for (let row = 0; row < 4; row++) {
        for (let col = 0; col < 4; col++) {
            const cell = board[row][col];
            const nextSize = getNextChipSize(cell);
            if (nextSize) {
                steps.push({ row, col, size: nextSize });
            }
        }
    }

    console.clear();
    console.log('Player: ', player);
    for (let i = 0; i < steps.length; i++) {
        const step = steps[i];
        stepCount++;

        // перебор всех возможных ходов
        board[step.row][step.col] = { player, size: step.size };

        stop = checkWin(board, step.row, step.col, player);

        if (stop) { 
            //console.log(`WIN WIN WIN WIN WIN WIN WIN WIN WIN Player ${player}`);
            //break;
        }
        
        nextMoves(board, player === 1 ? 2 : 1);
    }

}

export const getNextChipSize = (cell: TChip | null): ChipSize | null => {
    if (!cell) return 'small';
    if (cell.size === 'small') return 'medium';
    if (cell.size === 'medium') return 'large';
    return null;
};

export const checkWin = (board: Board, row: number, col: number, player: Player): boolean => {
    const directions = [
        [0, 1], // горизонталь
        [1, 0], // вертикаль
        [1, 1], // диагональ вниз-вправо
        [1, -1], // диагональ вниз-влево
    ];

    for (const [dx, dy] of directions) {
        let count = 1;

        // Проверяем в положительном направлении
        for (let i = 1; i < 4; i++) {
            const newRow = row + i * dx;
            const newCol = col + i * dy;

            if (newRow >= 0 && newRow < 4 && newCol >= 0 && newCol < 4 && board[newRow][newCol]?.player === player) {
                count++;
            } else {
                break;
            }
        }

        // Проверяем в отрицательном направлении
        for (let i = 1; i < 4; i++) {
            const newRow = row - i * dx;
            const newCol = col - i * dy;

            if (newRow >= 0 && newRow < 4 && newCol >= 0 && newCol < 4 && board[newRow][newCol]?.player === player) {
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
