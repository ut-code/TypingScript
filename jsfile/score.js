function calcScore(time, missCount, questionLength) {
  const typePerSecond = questionLength / time;
  const accuracy = (questionLength - missCount) / questionLength;
  const userScore = Math.floor(typePerSecond * accuracy * 25);
  return userScore;
}
