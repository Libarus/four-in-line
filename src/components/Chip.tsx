import { ChipSize, Player } from '../types/gameTypes';
import { Badge, BadgeX, Bolt } from 'lucide-react';

interface ChipProps {
    player: Player;
    size: ChipSize;
}

const chipSizes: Record<ChipSize, number> = {
    small: 20,
    medium: 40,
    large: 60,
};

export function Chip({ player, size }: ChipProps) {
    const chipClass = `player-${player}-color`;
    return player === 1 ? <Badge className={chipClass} size={chipSizes[size]} /> : <BadgeX className={chipClass} size={chipSizes[size]} />;
};
