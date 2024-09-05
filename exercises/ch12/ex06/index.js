import fs from "fs";
import path from "path";

function* walkRecursive(rootPath, currentPath = rootPath) {
  // ファイルやディレクトリに関する情報を取得
  const stats = fs.statSync(currentPath);

  if (stats.isDirectory()) {
    // ルートパスからの相対パスをyieldする
    yield { path: path.relative(rootPath, currentPath), isDirectory: true };
    // ディレクトリの中身を取得し、再帰的に処理する
    const directoryContents = fs.readdirSync(currentPath);
    for (const content of directoryContents) {
      // 再帰呼び出しで現在のディレクトリ内のファイル/ディレクトリを探索する
      yield* walkRecursive(rootPath, path.join(currentPath, content));
    }
  } else {
    // ルートパスからの相対パスをyieldする
    yield { path: path.relative(rootPath, currentPath), isDirectory: false };
  }
}

// 再帰的ジェネレータをラップするジェネレータ
export function* walk(rootPath) {
  yield* walkRecursive(rootPath);
}
