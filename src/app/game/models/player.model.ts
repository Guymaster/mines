export default class Player {
    name: string;
    score: number;
    color: string;
    cursorPosition: number | null;

    constructor(name: string, score: number, color: string, cursorPosition: number | null){
        this.name = name;
        this.score = score;
        this.cursorPosition = cursorPosition;
        this.color = color;
    }
}