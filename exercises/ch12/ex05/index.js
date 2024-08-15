import fs from "fs";

export function* readLines(filePath) {
  const fileDescriptor = fs.openSync(filePath, "r");
  const bufferSize = 1024;
  const buffer = Buffer.alloc(bufferSize);
  let bytesRead;

  try {
    // バッファの端に残った部分を次のバッファ読み込み時に結合するため必要
    let leftOver = "";
    while (
      (bytesRead = fs.readSync(fileDescriptor, buffer, 0, bufferSize, null)) !==
      0
    ) {
      const data = leftOver + buffer.toString("utf8", 0, bytesRead);
      const lines = data.split("\n");
      leftOver = lines.pop(); // 最後の行は次のチャンクで処理されるために保持
      for (const line of lines) {
        yield line; // 1行ずつ返す
      }
    }
    if (leftOver) {
      yield leftOver;
    }
  } finally {
    fs.closeSync(fileDescriptor);
  }
}
