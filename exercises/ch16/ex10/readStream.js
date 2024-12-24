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

// ファイルをストリームで読み込む
const readStream = fs.createReadStream(filePath);

readStream.on('data', (chunk) => {
    // チャンクを受け取るたびにメモリ使用量をログに出力
    logMemoryUsage();
});

readStream.on('end', () => {
    console.log('File read completed.');
    logMemoryUsage();
});

readStream.on('error', (err) => {
    console.error('Error reading file:', err);
});