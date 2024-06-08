let question = [
  "apple",
  "banana",
  "melon",
  "mango",
  "strawberry",
  "blueberry",
  "orange",
]; //問題文
let questionNumber = Math.floor(Math.random() * question.length); //問題をランダムで出題する

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
let time = 0;
let missCount = 0;
let isPlaying = false;
// let timerId;
let timerIntervalId;
let questionCount; // 今何問目か

let questionIndex = 0; //回答初期値・現在単語のどこまでが合っているか判定している文字番号
let questionLength = question[questionNumber].length; //計算用の文字の長さ

scoreElement.textContent = `Score: ${score}`;
timeElement.textContent = `Time Passed: ${time}`;
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
    timerIntervalId = setInterval(() => {
      time++;
      timeElement.innerText = `Time Passed: ${time}`;
    }, 1000);
  }
});

function startGame() {
  score = 0;
  time = 0;
  questionCount = 1;
  questionNumber = Math.floor(Math.random() * question.length);
  questionIndex = 0;
  questionLength = question[questionNumber].length;
  questionSection.textContent = question[questionNumber].substring(
    questionIndex,
    questionLength
  );
  highlightNextCharacter();
  updateDisplay();
}

// リセットボタンのクリックイベントリスナー
resetBtn.addEventListener("click", () => {
  // ゲームの状態を初期化
  score = 0;
  time = 0;
  missCount = 0;
  questionCount = 1;
  questionNumber = Math.floor(Math.random() * question.length);
  questionIndex = 0;
  questionLength = question[questionNumber].length;
  isPlaying = false;
  userInput.disabled = true;
  userInput.value = "";

  // タイマーを停止
  clearInterval(timerIntervalId);

  // HTML要素を更新
  questionSection.textContent = "もう一回やりましょう";
  updateDisplay();
});

// ディスプレイの更新
function updateDisplay() {
  scoreElement.innerText = `Score: ${score}`;
  timeElement.innerText = `Time Passed: ${time}`;
  yourMissCount.textContent = `You have made ${missCount} ${
    missCount === 0 || 1 ? "mistake" : "mistakes"
  }.`;
}

// 次に入力すべき文字の背景色を変更する関数
function highlightNextCharacter() {
  const questionText = question[questionNumber];
  const highlightedText = questionText
    .split("")
    .map((char, index) => {
      return index === questionIndex
        ? `<span class="highlight">${char}</span>`
        : char;
    })
    .join("");
  questionSection.innerHTML = highlightedText;
}

//ユーザー入力時に動く関数
userInput.addEventListener("input", () => {
  const inputValue = userInput.value;
  if (inputValue === question[questionNumber].substring(0, questionIndex + 1)) {
    questionIndex++;
    if (questionIndex === questionLength) {
      const scoreIncrement = calcScore(time, missCount, questionLength);
      score += scoreIncrement;
      questionNumber = Math.floor(Math.random() * question.length);
      questionIndex = 0;
      questionLength = question[questionNumber].length;
      userInput.value = "";
      questionCount++;
      questionSection.textContent = "";
    }
    questionSection.textContent = question[questionNumber].substring(
      questionIndex,
      questionLength
    );
    highlightNextCharacter();
    scoreElement.innerText = `Score: ${score}`;
    if (questionCount == 5) {
      //終了
      // ここ変えたい @kiyokaanan
      alert(`Congratulations! Your score is ${score}.`);
      resetBtn.click();
    }
  } else {
    // 間違った文字を入れた場合、userInputをその一文字前までとする
    userInput.value = userInput.value.slice(0, -1); // 如果输入错误，移除最后一个字符
    missCount++;
    yourMissCount.textContent = `You have made ${missCount} ${
      missCount === 0 || 1 ? "mistake" : "mistakes"
    }.`;
  }
});
