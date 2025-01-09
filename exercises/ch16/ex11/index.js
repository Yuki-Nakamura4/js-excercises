import net from "net";

const server = net.createServer((socket) => {
  let body = "";

  socket.on("data", (data) => {
    const request = data.toString();
    const [requestLine, ...headers] = request.split("\r\n");
    const [method, path] = requestLine.split(" ");

    if (method === "GET" && path === "/") {
      const response = `
HTTP/1.1 200 OK
Content-Type: text/html

<!doctype html>
<html lang="ja">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Greeting Form</title>
  </head>
  <body>
    <form action="/greeting" method="POST">
      <label for="name">Name:</label>
      <input type="text" id="name" name="name" />
      <label for="greeting">Greeting:</label>
      <input type="text" id="greeting" name="greeting" />
      <button type="submit">Submit</button>
    </form>
  </body>
</html>
`;
      socket.write(response);
      socket.end();
    } else if (method === "POST" && path === "/greeting") {
      body += data.toString();

      if (body.includes("\r\n\r\n")) {
        const bodyContent = body.split("\r\n\r\n")[1]; // ボディのみを取得
        const params = new URLSearchParams(bodyContent);
        const name = params.get("name");
        const greeting = params.get("greeting");

        const response = `
HTTP/1.1 200 OK
Content-Type: text/html

<!doctype html>
<html lang="ja">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Greeting</title>
  </head>
  <body>
    <h1>${greeting}, ${name}!</h1>
  </body>
</html>
`;
        socket.write(response);
        socket.end();
      }
    } else if (method === "GET" || method === "POST") {
      const response = `
HTTP/1.1 404 Not Found
Content-Type: text/html

<!doctype html>
<html lang="ja">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Not Found</title>
  </head>
  <body>
    <h1>404 Not Found</h1>
  </body>
</html>
`;
      socket.write(response);
      socket.end();
    } else {
      const response = `
HTTP/1.1 405 Method Not Allowed
Content-Type: text/html

<!doctype html>
<html lang="ja">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Method Not Allowed</title>
  </head>
  <body>
    <h1>405 Method Not Allowed</h1>
  </body>
</html>
`;
      socket.write(response);
      socket.end();
    }
  });

  socket.on("error", (err) => {
    console.error("Socket error:", err);
  });
});

server.listen(3009, () => {
  console.log("Server is listening on port 3009");
});
