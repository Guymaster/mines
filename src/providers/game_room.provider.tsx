'use client';

import { createContext, useState, useContext } from "react";
import { Room } from 'colyseus.js';
import { GameRoomState } from "@/models/game_room.model";

const GameRoomContext = createContext<{gameRoom: Room<GameRoomState> | null, setGameRoom: Function}>({ gameRoom: null, setGameRoom: ()=>{}});

export function GameRoomProvider({ children }: { children: React.ReactNode }) {
    const [gameRoom, setGameRoom] = useState<null | Room<GameRoomState>>(null);
    return (
        <GameRoomContext.Provider value={{ gameRoom, setGameRoom }}>
            {children}
        </GameRoomContext.Provider>
    );
};

export const useGameRoomContext = () => useContext(GameRoomContext);