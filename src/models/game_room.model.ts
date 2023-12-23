import { GameSteps } from "@/values/game";
import Player from "./player.model";
import { CellContent } from "./cell_content.model";

export class GameRoomState {
    players: Map<string, Player> = new Map<string, Player>();
    revealedContents = new Map<string, CellContent>();
    step: string = GameSteps.WAITING;
    cols: number = 0;
    rows: number = 0;
    count: number = 0;
}