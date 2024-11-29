const ROWS = 50;
const COLS = 50;
const RESOLUTION = 10; // 1セルの幅

const canvas = document.querySelector("#screen");
const ctx = canvas.getContext("2d");
const startButton = document.querySelector("#start");
const pauseButton = document.querySelector("#pause");

canvas.width = ROWS * RESOLUTION;
canvas.height = COLS * RESOLUTION;

let grid = [];
let socket;

function drawGrid() {
    // キャンバスをクリア
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLS; col++) {
            ctx.fillStyle = grid[row][col] ? "black" : "white"; // セルの色を設定
            ctx.fillRect(col * RESOLUTION, row * RESOLUTION, RESOLUTION, RESOLUTION); // セルを描画
            ctx.strokeRect(col * RESOLUTION, row * RESOLUTION, RESOLUTION, RESOLUTION); // セルの枠を描画
        }
    }
}

function connectWebSocket() {
    socket = new WebSocket("ws://localhost:3003");

    socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        // サーバーから送られてきたデータに応じて処理を分岐
        if (data.type === "update") {
            grid = data.grid;
            drawGrid();
        } else if (data.type === "pause") {
            console.log("Game paused");
        } else if (data.type === "start") {
            console.log("Game started");
        }
    };

    socket.onerror = (error) => {
        console.error("WebSocket error:", error);
    };
}

canvas.addEventListener("click", (event) => {
    const rect = canvas.getBoundingClientRect(); // キャンバスの位置とサイズを取得
    const x = event.clientX - rect.left; // クリックされた位置のx座標
    const y = event.clientY - rect.top;
    const row = Math.floor(y / RESOLUTION); // クリックされたセルの行と列を計算
    const col = Math.floor(x / RESOLUTION);

    if (socket.readyState === WebSocket.OPEN) {
        socket.send(JSON.stringify({ type: "toggle", row, col })); // サーバーにクリックされたセルの位置を送信
    } else {
        console.warn("WebSocket is not open. Cannot send message.");
    }
});

startButton.addEventListener("click", () => {
    if (socket.readyState === WebSocket.OPEN) {
        socket.send(JSON.stringify({ type: "start" })); // サーバーにゲーム開始のメッセージを送信
    } else {
        console.warn("WebSocket is not open. Cannot send message.");
    }
});

pauseButton.addEventListener("click", () => {
    if (socket.readyState === WebSocket.OPEN) {
        socket.send(JSON.stringify({ type: "pause" })); // サーバーにゲーム停止のメッセージを送信
    } else {
        console.warn("WebSocket is not open. Cannot send message.");
    }
});

connectWebSocket();