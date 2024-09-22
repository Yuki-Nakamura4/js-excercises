/* eslint-disable no-undef */
document.addEventListener("DOMContentLoaded", function () {
  const myDiv = document.getElementById("editor-front");
  const myInput = document.getElementById("editor-back");

  // 初期状態の div 要素の背景色を白色に設定
  myDiv.style.backgroundColor = "white";

  // 1. div 要素をクリックすると input 要素が focus される
  myDiv.addEventListener("click", function () {
    myInput.focus();
  });

  // 2. input 要素に focus されると div 要素が灰色 (silver) になる
  myInput.addEventListener("focus", function () {
    myDiv.style.backgroundColor = "silver";
  });

  // input 要素から focus が外れると div 要素が白色に戻る
  myInput.addEventListener("blur", function () {
    myDiv.style.backgroundColor = "white";
  });

  // 3. input 要素に入力された text は div 要素にも表示される
  myInput.addEventListener("input", function () {
    myDiv.textContent = myInput.value;
  });
});
