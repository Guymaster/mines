abstract class CellContent {
    isBomb: Boolean = false;
}

export class BombCellContent extends CellContent {
    override isBomb: Boolean = true;
}

export class NumberCellContent extends CellContent {
    number: number;
    NumberCellContent(number: number){
        this.number = number;
    }
}