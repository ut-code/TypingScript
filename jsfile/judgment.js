// ユーザー入力のチェック
userInput.addEventListener("input", () => {
  const inputValue = userInput.value;
  if (inputValue === Q[Q_No].substring(0, Q_i + 1)) {
    Q_i++;
    if (Q_i === Q_l) {
      score++;
      Q_No = Math.floor(Math.random() * Q.length);
      Q_i = 0;
      Q_l = Q[Q_No].length;
      userInput.value = "";
    }
    document.getElementById("start").innerHTML = Q[Q_No].substring(Q_i, Q_l);
    updateDisplay();
  } else if (!currentWord.startsWith(inputValue)) {
    userInput.value = userInput.value.slice(0, -1); // 如果输入错误，移除最后一个字符
  }
});
