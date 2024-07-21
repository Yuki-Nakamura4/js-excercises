function detectFileType(arrayBuffer) {
  const byteArray = new Uint8Array(arrayBuffer); // ArrayBufferからUint8Arrayを作成

  const signatures = {
    PDF: [[0x25, 0x50, 0x44, 0x46]],
    ZIP: [
      [0x50, 0x4b, 0x03, 0x04],
      [0x50, 0x4b, 0x05, 0x06],
      [0x50, 0x4b, 0x07, 0x08],
    ],
    GIF: [
      [0x47, 0x49, 0x46, 0x38, 0x37, 0x61],
      [0x47, 0x49, 0x46, 0x38, 0x39, 0x61],
    ],
    PNG: [[0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]],
  };

  // マジックナンバーが一致するか確認する関数
  function matchesSignature(signature, byteArray) {
    return signature.every((byte, index) => byteArray[index] === byte);
  }

  // 各ファイルタイプに対してマジックナンバーを確認
  for (const [type, sigArrays] of Object.entries(signatures)) {
    for (const sig of sigArrays) {
      if (matchesSignature(sig, byteArray)) {
        return type;
      }
    }
  }

  // 一致するものがなければ UNKNOWN を返す
  return "UNKNOWN";
}

export { detectFileType };
