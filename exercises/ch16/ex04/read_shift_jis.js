import fs from 'fs';
import iconv from 'iconv-lite';

// Shift_JISで保存されたテキストファイルを読み込む
fs.readFile('hello.txt', (err, data) => {
    if (err) {
        console.error('ファイルの読み込みに失敗しました:', err);
        return;
    }

    // Shift_JISからUTF-8に変換
    const text = iconv.decode(data, 'Shift_JIS');
    console.log('ファイルの内容:', text);
});