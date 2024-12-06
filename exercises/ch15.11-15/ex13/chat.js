document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("input").focus(); // ページ読み込み時に入力欄にフォーカスを当てる
  document.getElementById("send").addEventListener("click", sendMessage);
  document.getElementById("input").addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      sendMessage(); // エンターキー押下でも送信できる
    }
  });
});

// メッセージを送信する関数
async function sendMessage() {
  const inputField = document.getElementById("input");
  const sendButton = document.getElementById("send");
  const message = inputField.value.trim();
  if (message === "") return; // 入力欄が空の場合は何もしない

  // 送信中は送信ボタンと入力欄を無効にする
  sendButton.disabled = true;
  inputField.disabled = true;

  addMessage("user", message);
  inputField.value = ""; // 入力欄をクリア

  const aiMessageDiv = createMessageElement("ai", ""); // AIのメッセージエリアを作成
  try {
    // ollamaにメッセージを送信
    const response = await fetch("http://localhost:11434/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gemma:2b",
        // TODO: 履歴を送るようにする
        messages: [{ role: "user", content: message }],
        stream: true, // ストリーム形式でデータを受信
      }),
    });

    if (!response.ok) {
      throw new Error(`エラーが発生しました: ${response.status}`);
    }

    // レスポンスのボディをストリーム形式で受信
    const reader = response.body.getReader(); // ストリームからデータを読み取るためのReaderを取得
    const decoder = new TextDecoder(); // バイナリデータをテキストに変換するためのTextDecoder
    let aiMessage = "";

    while (true) {
      const { done, value } = await reader.read(); // ストリームからデータを読み取る
      if (done) break; // ストリームの終了を検知したらループを抜ける

      const chunk = decoder.decode(value, { stream: true }); // バイナリデータをテキストに変換
      const lines = chunk.split("\n").filter((line) => line.trim() !== ""); // 改行で分割して空行を除外

      // レスポンスの内容をパース
      for (const line of lines) {
        const json = JSON.parse(line);
        // AIからのメッセージがあれば表示
        if (json.message && json.message.content) {
          aiMessage += json.message.content; // 新しい内容を追加
          updateMessage(aiMessageDiv, aiMessage); // メッセージを更新
        }
      }
    }
  } catch (error) {
    console.error("Error:", error);
    updateMessage(aiMessageDiv, "エラーが発生しました。");
  } finally {
    // 送信ボタンと入力欄を再度有効にする
    sendButton.disabled = false;
    inputField.disabled = false;
    inputField.focus(); // 入力欄にフォーカスを当てる
  }
}

// メッセージを表示する関数
function addMessage(role, content) {
  const chat = document.getElementById("chat");
  const messageDiv = createMessageElement(role, content);
  chat.appendChild(messageDiv);
  chat.scrollTop = chat.scrollHeight;
}

// メッセージの表示エリアを作成する関数
function createMessageElement(role, content) {
  const messageDiv = document.createElement("div");
  messageDiv.className = `message ${role}`;
  messageDiv.textContent = content;
  const chat = document.getElementById("chat");
  chat.appendChild(messageDiv);
  chat.scrollTop = chat.scrollHeight;
  return messageDiv;
}

// メッセージの内容を更新する関数
function updateMessage(messageDiv, content) {
  messageDiv.textContent = content;
  const chat = document.getElementById("chat");
  chat.scrollTop = chat.scrollHeight;
}
