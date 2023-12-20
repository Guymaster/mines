export enum PlayerColorName {
    RED = "RED",
    BLUE = "BLUE",
    GREEN = "GREEN",
    YELLOW = "YELLOW"
};

export function getColorHex(name: PlayerColorName): string {
    switch(name){
        case PlayerColorName.RED:
            return "#FF6B6B";
        case PlayerColorName.GREEN:
            return "#6BCB77";
        case PlayerColorName.YELLOW:
            return "#FFD93D";
        default:
            return "#4D96FF";
    }
}