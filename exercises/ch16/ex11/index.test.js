import net from "net";
import { spawn } from "child_process";

let serverProcess;

beforeAll((done) => {
  // サーバを起動
  serverProcess = spawn("node", ["ch16/ex11/index.js"]);
  serverProcess.stdout.on("data", (data) => {
    if (data.toString().includes("Server is listening on port 3009")) {
      done();
    }
  });
  serverProcess.stderr.on("data", (data) => {
    console.error(`stderr: ${data}`);
  });
});

afterAll(() => {
  // サーバを終了
  serverProcess.kill();
});

describe("HTTPサーバのテスト", () => {
  test("GET / に対して挨拶フォームを返すこと。", (done) => {
    const client = net.createConnection({ port: 3009 }, () => {
      client.write("GET / HTTP/1.1\r\nHost: localhost\r\n\r\n");
    });

    client.on("data", (data) => {
      const response = data.toString();
      expect(response).toContain("HTTP/1.1 200 OK");
      expect(response).toContain("<title>Greeting Form</title>");
      client.end();
      done();
    });
  });

  test("POST /greeting に対して挨拶メッセージを返すこと。", (done) => {
    const client = net.createConnection({ port: 3009 }, () => {
      const body = "name=John&greeting=Hello";
      client.write(
        `POST /greeting HTTP/1.1\r\nHost: localhost\r\nContent-Type: application/x-www-form-urlencoded\r\nContent-Length: ${body.length}\r\n\r\n${body}`
      );
    });

    client.on("data", (data) => {
      const response = data.toString();
      expect(response).toContain("HTTP/1.1 200 OK");
      expect(response).toContain("<h1>Hello, John!</h1>");
      client.end();
      done();
    });
  });

  test("存在しないパスに対して404を返すこと。", (done) => {
    const client = net.createConnection({ port: 3009 }, () => {
      client.write("GET /nonexistent HTTP/1.1\r\nHost: localhost\r\n\r\n");
    });

    client.on("data", (data) => {
      const response = data.toString();
      expect(response).toContain("HTTP/1.1 404 Not Found");
      client.end();
      done();
    });
  });

  test("サポートされていないメソッドに対して405を返すこと。", (done) => {
    const client = net.createConnection({ port: 3009 }, () => {
      client.write("PUT / HTTP/1.1\r\nHost: localhost\r\n\r\n");
    });

    client.on("data", (data) => {
      const response = data.toString();
      expect(response).toContain("HTTP/1.1 405 Method Not Allowed");
      client.end();
      done();
    });
  });
});
