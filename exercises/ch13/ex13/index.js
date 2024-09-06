import fs from 'fs/promises';
import path from 'path';

async function* walkRecursive(rootPath, currentPath = rootPath) {
  // ファイルやディレクトリに関する情報を取得
  const stats = await fs.stat(currentPath);

  if (stats.isDirectory()) {
    // ルートパスからの相対パスをyieldする
    yield { path: path.relative(rootPath, currentPath), isDirectory: true };
    // ディレクトリの中身を取得し、再帰的に処理する
    const directoryContents = await fs.readdir(currentPath);
    for (const content of directoryContents) {
      // 再帰呼び出しで現在のディレクトリ内のファイル/ディレクトリを探索する
      yield* walkRecursive(rootPath, path.join(currentPath, content));
    }
  } else {
    // ルートパスからの相対パスをyieldする
    yield { path: path.relative(rootPath, currentPath), isDirectory: false };
  }
}

// 再帰的ジェネレータをラップする非同期ジェネレータ
export async function* walk(rootPath) {
  yield* walkRecursive(rootPath);
}