import WebSocket from "ws";

const ws = new WebSocket("ws://localhost:3003");

ws.on("message", (message) => {
  const { id, request } = JSON.parse(message);
  const response = `Hello, ${request}`;
  ws.send(JSON.stringify({ id, response }));
});

ws.on("open", () => {
  console.log("Connected to WebSocket server");
});

ws.on("close", () => {
  console.log("Disconnected from WebSocket server");
});
