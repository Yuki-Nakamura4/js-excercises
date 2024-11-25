## CORSのヘッダーを返すミドルウェア

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