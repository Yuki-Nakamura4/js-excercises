import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// __filenameと__dirnameをESモジュールで使用するための設定
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 大きなファイルのパス
const filePath = path.resolve(__dirname, "test/largefile.txt");

// メモリ使用量をログに出力する関数
function logMemoryUsage() {
  const memoryUsage = process.memoryUsage();
  console.log(
    `Memory Usage: RSS=${memoryUsage.rss}, HeapTotal=${memoryUsage.heapTotal}, HeapUsed=${memoryUsage.heapUsed}, External=${memoryUsage.external}`
  );
}

// ファイルをバッファで読み込む
fs.open(filePath, "r", (err, fd) => {
  if (err) {
    console.error("Error opening file:", err);
    return;
  }

  // ファイルサイズを取得
  fs.fstat(fd, (err, stats) => {
    if (err) {
      console.error("Error getting file stats:", err);
      fs.close(fd, () => {});
      return;
    }

    const buffer = Buffer.alloc(stats.size); // ファイルサイズに基づいてバッファを作成

    fs.read(fd, buffer, 0, buffer.length, 0, (err, bytesRead) => {
      if (err) {
        console.error("Error reading file:", err);
        fs.close(fd, () => {});
        return;
      }

      console.log("File read completed.");
      logMemoryUsage();
      fs.close(fd, () => {});
    });
  });
});
