let Q = [
  "apple",
  "banana",
  "melon",
  "mango",
  "strawberry",
  "blueberry",
  "orange",
]; //問題文
let questionNumber = Math.floor(Math.random() * Q.length); //問題をランダムで出題する

// HTML要素の取得

const scoreElement = document.getElementById("score");
const timeElement = document.getElementById("time");
const yourMissCount = document.getElementById("miss-count");
const startBtn = document.getElementById("start-btn");
const resetBtn = document.getElementById("reset-btn");
const userInput = document.getElementById("user-input");
const questionSection = document.getElementById("start");

// ゲームの初期状態
let score = 0;
let time = 60;
let missCount = 0;
let isPlaying = false;
let timerId;
let timerIntervalId;

let questionIndex = 0; //回答初期値・現在単語のどこまでが合っているか判定している文字番号
let questionLength = Q[questionNumber].length; //計算用の文字の長さ

scoreElement.textContent = `Score: ${score}`;
timeElement.textContent = `Remaining Time: ${time}`;
yourMissCount.textContent = `You have made ${missCount} ${
  missCount === 0 || 1 ? "mistake" : "mistakes"
}.`;

// スタートボタンのクリックイベントリスナー
startBtn.addEventListener("click", () => {
  if (!isPlaying) {
    isPlaying = true;
    userInput.disabled = false;
    userInput.value = "";
    userInput.focus();
    startGame();
    timerId = setTimeout(() => {
      clearInterval(timerIntervalId);
      alert(`Game over! Your score is ${score}.`);
      isPlaying = false;
      userInput.disabled = true;
    }, 60 * 1000);
    timerIntervalId = setInterval(() => {
      time--;
      updateDisplay();
      if (time <= 0) {
        clearInterval(timerIntervalId);
        isPlaying = false;
      }
    }, 1000);
  }
});

function startGame() {
  score = 0;
  time = 60;
  questionNumber = Math.floor(Math.random() * Q.length);
  questionIndex = 0;
  questionLength = Q[questionNumber].length;
  questionSection.textContent = Q[questionNumber].substring(
    questionIndex,
    questionLength
  );
  updateDisplay();
}

// リセットボタンのクリックイベントリスナー
resetBtn.addEventListener("click", () => {
  // ゲームの状態を初期化
  score = 0;
  time = 60;
  questionNumber = Math.floor(Math.random() * Q.length);
  questionIndex = 0;
  questionLength = Q[questionNumber].length;
  isPlaying = false;
  userInput.disabled = true;
  userInput.value = "";

  // タイマーを停止
  clearInterval(timerIntervalId);
  clearTimeout(timerId);

  // HTML要素を更新
  questionSection.textContent = "もう一回やりましょう";
  updateDisplay();
});

// ディスプレイの更新
function updateDisplay() {
  scoreElement.innerText = `Score: ${score}`;
  timeElement.innerText = `Remaining Time: ${time}`;
  yourMissCount.textContent = `You have made ${missCount} ${
    missCount === 0 || 1 ? "mistake" : "mistakes"
  }.`;
}

//ユーザー入力のチェック
userInput.addEventListener("input", () => {
  const inputValue = userInput.value;
  if (inputValue === Q[questionNumber].substring(0, questionIndex + 1)) {
    questionIndex++;
    if (questionIndex === questionLength) {
      const scoreIncrement = calcScore(time, missCount, questionLength);
      score += scoreIncrement;
      questionNumber = Math.floor(Math.random() * Q.length);
      questionIndex = 0;
      questionLength = Q[questionNumber].length;
      userInput.value = "";
    }
    questionSection.textContent = Q[questionNumber].substring(
      questionIndex,
      questionLength
    );
    updateDisplay();
  } else {
    // 間違った文字を入れた場合、userInputをその一文字前までとする
    userInput.value = userInput.value.slice(0, -1); // 如果输入错误，移除最后一个字符
    missCount++;
    yourMissCount.textContent = `You have made ${missCount} ${
      missCount === 0 || 1 ? "mistake" : "mistakes"
    }.`;
  }
});
