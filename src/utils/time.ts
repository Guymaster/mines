export function secondsToHHMMSS(secs: number): string {
    let hh = Math.floor(secs/(60*60));
    let mm = Math.floor((secs%(60*60))/60);
    let ss = (secs%(60*60))%60;
    return `${hh<10?"0"+hh:hh}:${mm<10?"0"+mm:mm}:${ss<10?"0"+ss:ss}`;
}