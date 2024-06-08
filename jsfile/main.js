let Q = [
  "apple",
  "banana",
  "melon",
  "mango",
  "starwberry",
  "blueberry",
  "orange",
]; //問題文
let Q_No = Math.floor(Math.random() * Q.length); //問題をランダムで出題する

// HTML要素の取得

const scoreElement = document.getElementById("score");
const timeElement = document.getElementById("time");
const startBtn = document.getElementById("start-btn");
const resetBtn = document.getElementById("reset-btn");
const userInput = document.getElementById("user-input");

// ゲームの初期状態
let score = 0;
let time = 60;
let isPlaying = false;
let timerId;
let timerIntervalId;

let Q_i = 0; //回答初期値・現在単語どこまで合っているか判定している文字番号
let Q_l = Q[Q_No].length; //計算用の文字の長さ

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
  Q_No = Math.floor(Math.random() * Q.length);
  Q_i = 0;
  Q_l = Q[Q_No].length;
  document.getElementById("start").innerHTML = Q[Q_No].substring(Q_i, Q_l);
  updateDisplay();
}

// リセットボタンのクリックイベントリスナー
resetBtn.addEventListener("click", () => {
  // ゲームの状態を初期化
  score = 0;
  time = 60;
  Q_No = Math.floor(Math.random() * Q.length);
  Q_i = 0;
  Q_l = Q[Q_No].length;
  isPlaying = false;
  userInput.disabled = true;
  userInput.value = "";

  // タイマーを停止
  clearInterval(timerIntervalId);
  clearTimeout(timerId);

  // HTML要素を更新
  document.getElementById("start").innerHTML = "もう一回やりましょう";
  updateDisplay();
});

// ディスプレイの更新
function updateDisplay() {
  scoreElement.innerText = `Score: ${score}`;
  timeElement.innerText = `Time: ${time}`;
}
