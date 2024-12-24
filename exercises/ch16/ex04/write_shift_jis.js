import fs from 'fs';
import iconv from 'iconv-lite';

// 保存するテキスト
const text = 'こんにちは。\nHello!';

// Shift_JISにエンコード
const encodedText = iconv.encode(text, 'Shift_JIS');

// ファイルに書き込む
fs.writeFile('hello.txt', encodedText, (err) => {
    if (err) {
        console.error('ファイルの書き込みに失敗しました:', err);
        return;
    }
    console.log('ファイルがShift_JISで保存されました。');
});