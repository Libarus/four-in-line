import React from 'react';
import { ChipSize, Player } from '../types/gameTypes';

interface ChipProps {
  player: Player;
  size: ChipSize;
}

const Chip: React.FC<ChipProps> = ({ player, size }) => {
  const chipClass = `chip player-${player} ${size}`;
  return <div className={chipClass}></div>;
};

export default Chip;