import React from 'react';
import { GameMode } from '../types/gameTypes';
import { Button, Card, CardContent } from '@/shared/components/ui';

interface GameMenuProps {
    startGame: (mode: GameMode) => void;
}

const GameMenu: React.FC<GameMenuProps> = ({ startGame }) => {
    return (
        <Card className='p-5'>
            <CardContent>
                <p>
                    Правила: Игра для двух игроков. Игроки делают ход по очереди. В игре присутствует 3 размера фишек: маленькие, средние и большие.
                    Выставляйте фишки разных размеров. В пустую ячейку можно поставить только маленькую фишку, в ячейку с маленькой только среднюю, а
                    в срднюю только большоую. На фишку противника тоже можно ставить свою фишку. Первый, кто соберёт ряд из 4 своих фишек, побеждает!
                </p>
                <div className='flex flex-col gap-4 pt-5'>
                    <Button variant='outline' onClick={() => startGame('player')}>
                        Играть вдвоём
                    </Button>
                    <Button variant='outline' onClick={() => startGame('computer')}>
                        Играть с компьютером
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
};

export default GameMenu;
