export type PlayerColorName = "BLUE" | "RED" | "GREEN" | "YELLOW" ;

export const PlayerColors = {
    RED: "#FF6B6B",
    BLUE: "#4D96FF",
    GREEN: "#6BCB77",
    YELLOW: "#FFD93D"
};

export function getColorHex(name: PlayerColorName): string {
    switch(name){
        case PlayerColors.RED:
            return "#FF6B6B";
        case PlayerColors.GREEN:
            return "#6BCB77";
        case PlayerColors.YELLOW:
            return "#FFD93D";
        default:
            return "#4D96FF";
    }
}