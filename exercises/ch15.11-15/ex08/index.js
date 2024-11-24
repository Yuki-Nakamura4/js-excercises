import { sendRequest } from "./client.js";

async function sendRequestFromInput(inputId) {
  console.log(inputId);
  const input = document.getElementById(inputId);
  const request = input.value;
  // inputIdの最後の文字(=インデックス)を取得してresponseのidに使う
  const responseDiv = document.getElementById(`response${inputId.slice(-1)}`);

  try {
    const response = await sendRequest(request);
    // Promiseがfullfilledの場合、responseDivのtextContentをレスポンス内容で更新
    responseDiv.textContent = `Response: ${response}`;
  } catch (error) {
    // Promiseがrejectedの場合、responseDivのtextContentをエラーメッセージで更新
    responseDiv.textContent = `Error: ${error.message}`;
  }
}

window.sendRequestFromInput = sendRequestFromInput;
