export default class Player {
    id: string;
    name: string;
    score: number;
    color: string;
    posX: number;
    posY: number;
    isActive: boolean;

    constructor(id: string, name: string, score: number, color: string, posX: number, posY: number, isActive: boolean){
        this.id = id;
        this.name = name;
        this.score = score;
        this.posX = posX;
        this.posY = posY;
        this.color = color;
        this.isActive = isActive;
    }
}