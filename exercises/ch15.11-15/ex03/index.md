##  `contents/index.js` 

`fetch` のオプション設定を変更。

- `mode: "cors"`：, CORSモードを指定し、クロスオリジンリソース共有を有効化
- `credentials: "include"`：リクエストにクッキーや認証ヘッダーを常に含める
- `headers: {"Content-Type": "application/json"}`：リクエストのコンテンツタイプがJSON形式であることを指定

```javascript
    mode: "cors", // CORSモードを指定
    credentials: "include", // Cookieを送信する
    headers: {
      "Content-Type": "application/json",
    },
```

## `server.js`

### CORSのヘッダーを返すミドルウェア

`res.setHeader()`でCORSに必要なヘッダーをレスポンスに追加している。

以下は各ヘッダーの意味:

- Access-Control-Allow-Origin：許可されたオリジン
- Access-Control-Allow-Methods：許可されたメソッド
- Access-Control-Allow-Headers：許可されたHTTPリクエストヘッダー
  - `Content-Type`を許可しないと、プリフライトリクエストが失敗し、実際のリクエストがブロックされる
- Access-Control-Allow-Credentials：クレデンシャル（Cookie、認証ヘッダー、TLSクライアント証明書など）の送信を許可するかどうか

```javascript
// CORS のヘッダを返すミドルウェア
function corsMiddleware(_url, _req, res) {
  // TODO: CORS に必要なヘッダを複数設定する
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  return true;
}
```

ミドルウェア：リクエストとレスポンスの間で何らかの処理を行う関数

### ルーティング設定

プリフライトリクエストとして使用されるOPTIONSリクエストを処理するためのハンドラーを設定

```javacript
http
  .createServer(async function (req, res) {
    await routes(
      ["OPTIONS", "/api/*", nopHandler, cors], // 追加。CORS の preflight リクエストに対応
```
