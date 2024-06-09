// HTML要素の取得
const scoreElement = document.getElementById("score");
const timeElement = document.getElementById("time");
const yourMissCount = document.getElementById("miss-count");
const theQuestionCount = document.getElementById("question-count");
const startSection = document.getElementById("start");
const answerSection = document.getElementById("answer-section");
const questionSection = document.getElementById("question-section");

const startBtn = document.getElementById("start-btn");
const resetBtn = document.getElementById("reset-btn");
const userInput = document.getElementById("user-input");
const py_q_length = 22;

let questionNumber;
let question;
// ゲームの初期状態
let score = 0;
let time = 0;
let missCount = 0;
let isPlaying = false;
// let timerId;
let timerIntervalId;
let questionCount; // 今何問目か

let questionIndex = 0; //回答初期値・現在単語のどこまでが合っているか判定している文字番号
let questionLength; //計算用の文字の長さ

//backspace無効化
userInput.addEventListener("keydown", function (e) {
  if (e.key === "Backspace") {
    e.preventDefault();
  }
});

document.addEventListener("click", () => {
  userInput.focus();
});
scoreElement.textContent = `Score: ${score}`;
timeElement.textContent = `Time Passed: ${time} s`;
yourMissCount.textContent = `You made ${missCount} ${
  missCount === 0 || 1 ? "mistake" : "mistakes"
}.`;
theQuestionCount.textContent = "";

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
      timeElement.innerText = `Time Passed: ${time} s`;
    }, 1000);
  }
});

async function startGame() {
  score = 0;
  time = 0;
  questionCount = 1;
  setQuestion();
  theQuestionCount.textContent = `Question ${questionCount}`;
  answerSection.textContent = "";
}

async function setQuestion() {
  questionNumber = Math.floor(Math.random() * py_q_length);
  const response = await fetch(`./code_python/${questionNumber}`);
  question = await response.text();
  questionIndex = 0;
  questionLength = question.length;
  highlightNextCharacter();
  startSection.textContent = "";
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
  questionLength = question.length;
  isPlaying = false;
  userInput.disabled = true;
  userInput.value = "";

  // タイマーを停止
  clearInterval(timerIntervalId);

  // HTML要素を更新
  startSection.textContent = "スタートボタンを押すと再開できます";
  updateDisplay();
  theQuestionCount.textContent = "";
});

// ディスプレイの更新
function updateDisplay() {
  scoreElement.innerText = `Score: ${score}`;
  timeElement.innerText = `Time Passed: ${time} s`;
  yourMissCount.textContent = `You made ${missCount} ${
    missCount === 0 || 1 ? "mistake" : "mistakes"
  }.`;
}

// 次に入力すべき文字の背景色を変更する関数
function highlightNextCharacter() {
  const questionText = question;
  const highlightedText = questionText
    .split("")
    .map((char, index) => {
      return index === questionIndex
        ? `<span class="highlight">${char == " " ? "&nbsp;" : char}</span>`
        : char !== " "
        ? char
        : "&nbsp;";
    })
    .join("");
  questionSection.innerHTML = highlightedText.replace(/\n/g, "<br>");
}

//ユーザー入力時に動く関数
userInput.addEventListener("input", () => {
  const inputValue = userInput.value;
  if (inputValue === question.substring(0, questionIndex + 1)) {
    questionIndex++;
    if (questionIndex === questionLength) {
      const scoreIncrement = calcScore(time, missCount, questionLength);
      score += scoreIncrement;
      setQuestion();
      userInput.value = "";
      questionCount++;
      startSection.textContent = "";
    }
    highlightNextCharacter();
    scoreElement.innerText = `Score: ${score}`;
    theQuestionCount.textContent = `Question ${questionCount}`;
    if (questionCount == 6) {
      //終了
      theQuestionCount.textContent = "";
      answerSection.textContent = `Congratulations! Your score is ${score}.`;
      resetBtn.click();
    }
  } else {
    // 間違った文字を入れた場合、userInputをその一文字前までとする
    userInput.value = userInput.value.slice(0, -1);
    missCount++;
    yourMissCount.textContent = `You made ${missCount} ${
      missCount === 0 || 1 ? "mistake" : "mistakes"
    }.`;
  }
});
