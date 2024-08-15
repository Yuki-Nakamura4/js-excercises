import fs from "fs";
import path from "path";

export function* walk(rootPath) {
  const stack = [rootPath];

  while (stack.length > 0) {
    // stack.shift()で先頭の要素を取り出し、幅優先探索を行う
    const currentPath = stack.shift();
    // ファイルやディレクトリに関する情報を取得
    const stats = fs.statSync(currentPath);

    if (stats.isDirectory()) {
      // ルートパスからの相対パスをyieldする
      yield { path: path.relative(rootPath, currentPath), isDirectory: true };
      // ディレクトリの中身をstackに追加
      const directoryContents = fs.readdirSync(currentPath);
      for (const content of directoryContents) {
        stack.push(path.join(currentPath, content));
      }
    } else {
      // ルートパスからの相対パスをyieldする
      yield { path: path.relative(rootPath, currentPath), isDirectory: false };
    }
  }
}
