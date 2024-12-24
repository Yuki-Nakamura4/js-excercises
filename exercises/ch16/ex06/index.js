import fs from 'fs';

// ファイルを拡張
fs.truncate('test.txt', 32, (err) => {
    if (err) throw err;
    console.log('ファイルが拡張されました。');
});