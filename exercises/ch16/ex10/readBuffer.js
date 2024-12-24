import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// __filenameと__dirnameをESモジュールで使用するための設定
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 大きなファイルのパス
const filePath = path.resolve(__dirname, 'test/largefile.txt');

// メモリ使用量をログに出力する関数
function logMemoryUsage() {
    const memoryUsage = process.memoryUsage();
    console.log(`Memory Usage: RSS=${memoryUsage.rss}, HeapTotal=${memoryUsage.heapTotal}, HeapUsed=${memoryUsage.heapUsed}, External=${memoryUsage.external}`);
}

// ファイルをバッファで読み込む
fs.open(filePath, 'r', (err, fd) => {
    if (err) {
        console.error('Error opening file:', err);
        return;
    }

    const buffer = Buffer.alloc(1024 * 1024); // 1MBのバッファを作成
    function readNextChunk() {
        fs.read(fd, buffer, 0, buffer.length, null, (err, bytesRead) => {
            if (err) {
                console.error('Error reading file:', err);
                fs.close(fd, () => { });
                return;
            }

            if (bytesRead > 0) {
                // チャンクを受け取るたびにメモリ使用量をログに出力
                logMemoryUsage();
                readNextChunk();
            } else {
                console.log('File read completed.');
                logMemoryUsage();
                fs.close(fd, () => { });
            }
        });
    }

    readNextChunk();
});