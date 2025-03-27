export type Player = 1 | 2;
export type ChipSize = 'small' | 'medium' | 'large';
export type GameMode = 'player' | 'computer';
export type GameState = 'menu' | 'game' | 'result';

export interface TChip {
    player: Player;
    size: ChipSize;
}

export type Board = (TChip | null)[][];

export interface PlayerChips {
    small: number;
    medium: number;
    large: number;
}

export interface GameInfo {
    board: Board;
    currentPlayer: Player;
    playerChips: Record<Player, PlayerChips>;
}
