'use client';

import { createContext, useState, useContext } from "react";
import { Room } from 'colyseus.js';

const GameRoomContext = createContext<{gameRoom: Room | null, setGameRoom: Function}>({ gameRoom: null, setGameRoom: ()=>{}});

export function GameRoomProvider({ children }: { children: React.ReactNode }) {
    const [gameRoom, setGameRoom] = useState<null | Room>(null);
    return (
        <GameRoomContext.Provider value={{ gameRoom, setGameRoom }}>
            {children}
        </GameRoomContext.Provider>
    );
};

export const useGameRoomContext = () => useContext(GameRoomContext);