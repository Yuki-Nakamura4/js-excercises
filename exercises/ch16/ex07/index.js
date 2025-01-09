import fs from "fs";

export function checkEntry(path) {
  // 非同期にファイルの種類を判定する
  return new Promise((resolve, reject) => {
    // fs.stat()でファイルの情報を取得
    fs.stat(path, (err, stats) => {
      // エラーが発生した場合はreject()を呼び出す
      if (err) {
        reject(err);
        return;
      }

      if (stats.isFile()) {
        resolve("file");
      } else if (stats.isDirectory()) {
        resolve("directory");
      } else {
        // それ以外なら"other"を返す
        resolve("other");
      }
    });
  });
}
