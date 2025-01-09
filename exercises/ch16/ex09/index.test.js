import request from "supertest";
import path from "path";
import fs from "fs";
import { serve } from "./index.js";
import { fileURLToPath } from "url";

// __dirnameをESモジュールで使用するための設定
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rootDirectory = path.resolve(__dirname, "public"); // ルートディレクトリを指定
const port = 3008; // テスト用のポート番号を指定

// テスト用のExpressアプリケーションとサーバーを作成
const { app, server } = serve(rootDirectory, port);

afterAll(() => {
  server.close(); // テスト終了後にサーバーを閉じる
});

describe("HTTP Server Tests", () => {
  test("/test/mirrorへのリクエストにはリクエストをそのまま送り返すこと。", async () => {
    const response = await request(app).get("/test/mirror");

    expect(response.status).toBe(200); // 200 OKを返すこと
    expect(response.text).toContain("GET /test/mirror HTTP/1.1"); // リクエストをミラーリングしていること
  });

  test("指定されたパスのtxtファイルを提供すること。", async () => {
    const response = await request(app).get("/testfile.txt");

    expect(response.status).toBe(200);
    expect(response.headers["content-type"]).toMatch(/text\/plain/); // text/plainを返すこと
    expect(response.text).toBe("This is a test file."); // ファイルの内容を返すこと
  });

  test("指定されたパスのpngファイルを提供すること。", async () => {
    const response = await request(app).get("/pasta.png");

    expect(response.status).toBe(200);
    expect(response.headers["content-type"]).toMatch(/image\/png/); // image/pngを返すこと

    // 期待されるバイナリデータを読み込む
    const expectedBuffer = fs.readFileSync(
      path.join(rootDirectory, "pasta.png")
    );
    // レスポンスのバイナリデータを比較
    expect(response.body).toEqual(expectedBuffer);
  });

  test("存在しないファイルに対しては404を返すこと。", async () => {
    const response = await request(app).get("/nonexistentfile.txt");

    expect(response.status).toBe(404);
    expect(response.headers["content-type"]).toMatch(/text\/plain/); // コンテンツタイプは拡張子に基づいて返す
  });
});
