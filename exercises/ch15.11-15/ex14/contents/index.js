"use strict";

const button = document.querySelector("#send-button");
const messageContainer = document.getElementById("message-container");
button.addEventListener("click", (e) => {
  e.preventDefault();
  getMessageFromServer();
});
async function getMessageFromServer() {
  const messageElement = document.createElement("div");
  messageElement.className = "message";
  messageElement.textContent = "";
  messageContainer.appendChild(messageElement);

  // TODO: ここにサーバーとのやり取り等を実装しなさい
  // ボタンを無効化
  button.disabled = true;

  // EventSourceを使用してサーバーからメッセージを受信
  const eventSource = new EventSource("http://localhost:3000/message");

  eventSource.onmessage = (event) => {
    const data = JSON.parse(event.data);
    const newMessageElement = document.createElement("div");
    newMessageElement.className = "message";
    newMessageElement.textContent = data.value;
    messageContainer.appendChild(newMessageElement);

    // 通信が完了したらボタンを再度有効化
    if (data.done) {
      eventSource.close();
      button.disabled = false;
    }
  };

  eventSource.onerror = (error) => {
    console.error("EventSource failed:", error);
    const errorMessageElement = document.createElement("div");
    errorMessageElement.className = "message error";
    errorMessageElement.textContent = "エラーが発生しました。";
    messageContainer.appendChild(errorMessageElement);

    eventSource.close();
    button.disabled = false;
  };
}
