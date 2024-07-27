class FileSizeError extends Error {
  constructor(message = "ファイルのサイズが許容値を超えています。") {
    super(message); // 親クラスのコンストラクタを呼び出す
    this.name = "FileSizeError"; // エラー名を設定
  }
}

const fs = require("fs");

function checkFileSize(filePath, maxSize) {
  const fileSize = fs.statSync(filePath).size;
  if (fileSize > maxSize) {
    throw new FileSizeError(
      `ファイル ${filePath} のサイズ (${fileSize} バイト) が許容値 ${maxSize} バイトを超えています。`
    );
  }
}

// 使用例
try {
  checkFileSize("example.txt", 1024);
} catch (e) {
  if (e instanceof FileSizeError) {
    console.error(e.message);
  } else {
    console.error("予期せぬエラーが発生しました。", e);
  }
}
