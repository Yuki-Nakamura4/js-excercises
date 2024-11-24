const ws = new WebSocket("ws://localhost:3003");

// 未解決のリクエストを管理するMap
// レスポンスが返ってきたときに対応するPromiseを完了させる
// これにより並行して複数のリクエストを扱える
const pendingRequests = new Map();

let requestId = 0;

ws.onmessage = (event) => {
  // レスポンスを受け取った際に、対応するリクエストを解決する
  const { id, response } = JSON.parse(event.data);
  if (pendingRequests.has(id)) {
    pendingRequests.get(id).resolve(response);
    pendingRequests.delete(id);
  }
};

ws.onclose = () => {
  // WebSocket が閉じられた際に、全てのリクエストをrejectで完了させる
  pendingRequests.forEach(({ reject }) =>
    reject(new Error("WebSocket connection closed"))
  );
  pendingRequests.clear();
};

function sendRequest(request) {
  // リクエストを送信し、対応するレスポンスを返すPromiseを生成して返す
  return new Promise((resolve, reject) => {
    const id = requestId++;

    // 未解決のリクエストを管理するMapにPromiseを登録
    // resolveとrejectを保存しておくことで、レスポンスを受け取った際にPromiseを解決できる
    pendingRequests.set(id, { resolve, reject });

    ws.send(JSON.stringify({ id, request }));

    setTimeout(() => {
      // タイムアウト処理
      if (pendingRequests.has(id)) {
        // タイムアウトした場合、未解決のリクエストから対応するreject関数を呼び出してPromiseを完了させる
        pendingRequests.get(id).reject(new Error("Request timed out"));
        pendingRequests.delete(id);
      }
    }, 5000); // タイムアウト時間を5秒に設定
  });
}

export { sendRequest };
