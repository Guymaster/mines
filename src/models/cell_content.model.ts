export class CellContent{
    isBomb: boolean = false;
    number: number;
    constructor(isBomb: boolean, number: number){
        this.number = number;
        this.isBomb = isBomb;
    }
    static bomb(){
        return new CellContent(true, 0);
    }
    static number(number: number){
        return new CellContent(false, number);
    }
}