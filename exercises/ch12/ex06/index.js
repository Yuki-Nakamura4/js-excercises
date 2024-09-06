import fs from 'fs';
import path from 'path';

export function* walk(rootPath, currentPath = rootPath) {
  // ファイルやディレクトリに関する情報を取得
  const stats = fs.statSync(currentPath);

  if (stats.isDirectory()) {
    // ルートパスからの相対パスをyieldする
    yield { path: path.relative(rootPath, currentPath), isDirectory: true };
    // ディレクトリの中身を取得し、再帰的に処理する
    const directoryContents = fs.readdirSync(currentPath);
    for (const content of directoryContents) {
      // 再帰呼び出しで現在のディレクトリ内のファイル/ディレクトリを探索する
      yield* walk(rootPath, path.join(currentPath, content));
    }
  } else {
    // ルートパスからの相対パスをyieldする
    yield { path: path.relative(rootPath, currentPath), isDirectory: false };
  }
}