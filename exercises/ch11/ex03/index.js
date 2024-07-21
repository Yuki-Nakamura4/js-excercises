// リトルエンディアンからビッグエンディアンへ変換する関数
export function littleEndianToBigEndian(littleEndianArray) {
  return littleEndianArray.map(
    (value) =>
      ((value & 0xff) << 24) | // 下から1バイト目を上から1バイト目に移動
      ((value & 0xff00) << 8) | // 下から2バイト目を上から2バイト目に移動
      ((value & 0xff0000) >> 8) | //  下から3バイト目を上から3バイト目に移動
      ((value & 0xff000000) >>> 24) // 最上位が1の場合に符号拡張されないよう符号なし右シフト(>>>)
  );
}

// ビッグエンディアンからリトルエンディアンへ変換する関数
export function bigEndianToLittleEndian(bigEndianArray) {
  return bigEndianArray.map(
    (value) =>
      ((value & 0xff) << 24) |
      ((value & 0xff00) << 8) |
      ((value & 0xff0000) >> 8) |
      ((value & 0xff000000) >>> 24)
  );
}
