import { spawn } from "child_process";
import path from "path";

// ESMでこのファイルの絶対パスとして__dirnameを定義するイディオム
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// startChildで起動したプロセスの参照
let child = null;

// node ./child.js を起動し、このプロセスが終了したときに解決するPromiseを返す
// cf. https://nodejs.org/api/child_process.html#event-close
async function startChild() {
  const childPath = path.join(__dirname, "child.js");
  child = spawn("node", [childPath]);

  child.stdout.on("data", (data) => {
    console.log(`stdout: ${data}`);
  });

  child.stderr.on("data", (data) => {
    console.error(`stderr: ${data}`);
  });

  return new Promise((res) => {
    child.on("close", (code, signal) => {
      res([code, signal]);
    });
  });
}

///////////TODO////////////////////////////
// 子プロセスを監視し、異常終了した場合に再起動する関数
async function monitorChild() {
  while (true) {
    const [code, signal] = await startChild();
    if (signal) {
      // シグナルを受信した場合は親プロセスも終了
      console.log(`子プロセスがシグナル ${signal} を受信して終了しました`);
      process.exit(0);
    } else if (code !== 0) {
      // 終了コードが0以外の場合は異常終了として再起動
      console.log(`子プロセスが終了コード ${code} で終了しました。再起動します...`);
    } else {
      // 終了コードが0の場合は正常終了としてループを終了
      console.log(`子プロセスが正常に終了しました。終了コード: ${code}`);
      break;
    }
  }
}

// シグナルをトラップし、子プロセスに通知する
const signals = ["SIGINT", "SIGTERM"];
signals.forEach((signal) => {
  process.on(signal, () => {
    console.log(`シグナル ${signal} を受信しました。子プロセスに転送します...`);
    if (child) {
      child.kill(signal);
    }
  });
});

// 子プロセスの監視を開始
monitorChild();
///////////////////////////////////////////////////