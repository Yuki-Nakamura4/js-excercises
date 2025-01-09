import express from "express";
import path from "path";

// 指定されたポートで待ち受けるHTTPサーバを作成して、
// 指定されたルートディレクトリ配下のファイルを提供する。
export function serve(rootDirectory, port) {
  const app = express(); // 新しいExpressアプリケーションを作成

  // /test/mirrorエンドポイントの処理
  app.use("/test/mirror", (req, res) => {
    res.setHeader("Content-Type", "text/plain; charset=UTF-8");
    res.write(`${req.method} ${req.originalUrl} HTTP/${req.httpVersion}\r\n`);

    // リクエストヘッダを出力する
    for (const [key, value] of Object.entries(req.headers)) {
      res.write(`${key}: ${value}\r\n`);
    }

    // ヘッダの末尾に空行を追加する
    res.write("\r\n");

    req.pipe(res); // リクエストをレスポンスにパイプする
  });

  // 静的ファイルの提供
  app.use(
    express.static(rootDirectory, {
      setHeaders: (res, filePath) => {
        // 拡張子に基づいて、ファイルのコンテンツタイプを推測する
        const ext = path.extname(filePath);
        let type;
        switch (ext) {
          case ".html":
            type = "text/html";
            break;
          case ".js":
            type = "text/javascript";
            break;
          case ".css":
            type = "text/css";
            break;
          case ".png":
            type = "image/png";
            break;
          case ".txt":
            type = "text/plain";
            break;
          default:
            type = "application/octet-stream";
            break;
        }
        res.setHeader("Content-Type", type);
      },
    })
  );

  // エラーハンドリング
  app.use((req, res) => {
    res.setHeader("Content-Type", "text/plain; charset=UTF-8");
    res.status(404).send("Not Found");
  });

  // 指定されたポートで待ち受ける
  const server = app.listen(port, () => {
    console.log("Listening on port", port);
  });

  return { app, server }; // テスト用にExpressアプリケーションとサーバーを返す
}
