import { CellContent } from "./cell_content.model";

export class CellModel {
    row:  number;
    col: number;
    content: CellContent | null;
    constructor(row: number, col: number, content: CellContent | null){
        this.row = row;
        this.col = col;
        this.content = content;
    }
}