import http from 'http';  // HTTPサーバ用（httpsにも対応）
import url from 'url';   // URL解析用
import path from 'path'; // ファイルシステムのパス操作用
import fs from 'fs';     // ファイル読み込み用

// 指定されたポートで待ち受けるHTTPサーバを作成して、
// 指定されたルートディレクトリ配下のファイルを提供する。
export function serve(rootDirectory, port) {
    const server = new http.Server(); // 新しいHTTPサーバを作成
    server.listen(port);            // 指定されたポートで待ち受ける
    console.log("Listening on port", port);

    // リクエストが届いたら、この関数で処理を行う
    server.on("request", (request, response) => {
        // リクエストURLのパス部分を取得する
        const endpoint = url.parse(request.url).pathname;

        // リクエストが[/test/mirror]の場合、リクエストをそのまま返す
        if (endpoint === "/test/mirror") {
            // レスポンスヘッダを設定する
            response.setHeader("Content-Type", "text/plain; charset=UTF-8");

            // レスポンスのステータスコードを指定する
            response.writeHead(200); // 200 OK

            // レスポンスボディの最初はリクエスト情報
            response.write(`${request.method} ${request.url} HTTP/${request.httpVersion}\r\n`);

            // リクエストヘッダを出力する
            const headers = request.rawHeaders;
            for (let i = 0; i < headers.length; i += 2) {
                response.write(`${headers[i]}: ${headers[i + 1]}\r\n`);
            }

            // ヘッダの末尾に空行を追加する
            response.write("\r\n");

            request.pipe(response); // リクエストをレスポンスにパイプする
        }
        else if (request.method === "PUT") {
            // ファイルアップロードの処理
            let filename = endpoint.substring(1); // 最初の/を取り除く

            // セキュリティ上のホールにならないように
            filename = filename.replace(/\\/g, "").replace(/\.\./g, "");

            filename = path.resolve(rootDirectory, filename);

            const writeStream = fs.createWriteStream(filename);
            request.pipe(writeStream);

            writeStream.on("finish", () => {
                response.writeHead(201, { "Content-Type": "text/plain; charset=UTF-8" });
                response.end("File uploaded successfully");
            });

            writeStream.on("error", (err) => {
                response.writeHead(500, { "Content-Type": "text/plain; charset=UTF-8" });
                response.end("File upload failed: " + err.message);
            });
        }
        else {
            // エンドポイントをローカルファイルシステムのファイルにマッピングする
            let filename = endpoint.substring(1); // 最初の/を取り除く

            // セキュリティ上のホールにならないように
            filename = filename.replace(/\\/g, "").replace(/\.\./g, "");

            filename = path.resolve(rootDirectory, filename);

            // 拡張子に基づいて、ファイルのコンテンツタイプを推測する
            let type;
            switch (path.extname(filename)) {
                case ".html": type = "text/html"; break;
                case ".js": type = "text/javascript"; break;
                case ".css": type = "text/css"; break;
                case ".png": type = "image/png"; break;
                case ".txt": type = "text/plain"; break;
                default: type = "application/octet-stream"; break;
            }

            const stream = fs.createReadStream(filename);
            stream.once("readable", () => {
                // ストリームが読み込めるようになったら、Content-Typeヘッダと
                // 200 OKステータスを設定する。そして、ファイル読み出し
                // ストリームをレスポンスにパイプする。ストリームが終了すると
                // response.end()が呼び出される。
                response.setHeader("Content-Type", type);
                response.writeHead(200);
                stream.pipe(response);
            });

            stream.on("error", (err) => {
                // ストリームを開こうとしてエラーが発生した場合、
                // そのファイルはおそらく存在しないか、読めないと思われる。
                // エラーメッセージをプレーンテキストで記述して、
                // 404 Not Foundレスポンスを送信する。
                response.setHeader("Content-Type", "text/plain; charset=UTF-8");
                response.writeHead(404);
                response.end(err.message);
            });
        }
    });
}