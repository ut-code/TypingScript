export function calcScore(time,missCount,questionLength){
    let typePerSecond = questionLength / time;
    let accuracy = (questionLength - missCount) / questionLength;
    let score = Math.floor(typePerSecond * accuracy * 25);
    return score;
}