import React from 'react';
import { GameMode } from '../types/gameTypes';
import { Button, Card, CardContent } from '@/shared/components/ui';

interface GameMenuProps {
    startGame: (mode: GameMode, cells: number) => void;
}

const GameMenu: React.FC<GameMenuProps> = ({ startGame }) => {
    return (
        <div className='flex justify-center w-full'>
            <div className='grid grid-cols-1 gap-4 w-fit'>
                <Card className='p-5'>
                    <CardContent>
                        <p>
                            Правила: стратегическая игра для двух игроков на поле 4×4, где нужно выставлять фишки разного размера. Существует всего
                            три размера фишек: маленький, средний, большой. Побеждает тот, кто первым соберет 4 свои фишки в ряд (по горизонтали,
                            вертикали или диагонали). Фишки ставятся по следующему правилу: на пустое место ставится маленькая, на маленькую -
                            средняя, на среднюю - большая. Учитывается только размер, а не чья фишка стоит в клетке (на фишку противника можно
                            поставить свою фишку).
                        </p>
                        <div className='flex flex-col gap-4 pt-5'>
                            <Card>
                                <CardContent>
                                    <div className='grid grid-cols-3 gap-4'>
                                        <Button variant='secondary' onClick={() => startGame('player', 3)} className='p-10 border-2'>
                                            Играть вдвоём 3x3
                                        </Button>
                                        <Button variant='secondary' onClick={() => startGame('player', 4)} className='p-10 border-2'>
                                            Играть вдвоём 4x4
                                        </Button>
                                        <Button variant='secondary' onClick={() => startGame('player', 5)} className='p-10 border-2'>
                                            Играть вдвоём 5x5
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardContent>
                                    <div className='grid grid-cols-3 gap-4'>
                                        <Button variant='secondary' onClick={() => startGame('computer', 3)} className='p-10 border-2'>
                                            Играть с компьютером 3x3
                                        </Button>
                                        <Button variant='secondary' onClick={() => startGame('computer', 4)} className='p-10 border-2'>
                                            Играть с компьютером 4x4
                                        </Button>
                                        <Button variant='secondary' onClick={() => startGame('computer', 5)} className='p-10 border-2'>
                                            Играть с компьютером 5x5
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default GameMenu;
