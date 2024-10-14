(function updateClock() {
  let now = new Date();
  let sec = now.getSeconds();
  let min = now.getMinutes();
  +sec / 60;
  let hour = (now.getHours() % 12) + min / 60;
  let secangle = sec * 6; // 追加。秒針の角度
  let minangle = min * 6;
  let hourangle = hour * 30;

  let clock = document.querySelector("#clock");
  let sechand = document.querySelector("#clock .secondhand");

  // もし秒針がすでに存在すれば削除
  if (sechand) {
    clock.removeChild(sechand);
  }

  // 新しい秒針を作成して追加
  sechand = document.createElementNS("http://www.w3.org/2000/svg", "line");
  sechand.setAttribute("class", "secondhand");
  sechand.setAttribute("x1", "50");
  sechand.setAttribute("y1", "50");
  sechand.setAttribute("x2", "50");
  sechand.setAttribute("y2", "10");
  sechand.setAttribute("stroke", "grey");
  clock.appendChild(sechand);

  let minhand = document.querySelector("#clock .minutehand");
  let hourhand = document.querySelector("#clock .hourhand");

  sechand.setAttribute("transform", `rotate(${secangle}, 50, 50)`); // 追加。秒針の角度を設定
  minhand.setAttribute("transform", `rotate(${minangle}, 50, 50)`);
  hourhand.setAttribute("transform", `rotate(${hourangle}, 50, 50)`);

  setTimeout(updateClock, 1000); // 1秒ごとに実行
})();
