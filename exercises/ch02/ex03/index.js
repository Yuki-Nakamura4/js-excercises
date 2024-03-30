// 第一引数に渡された文字列の正規化形式を第二引数で指定し、Unicodeエスケープシーケンスを返す関数
function getUnicodeEscapeSequence(text, normalizationForm) {
  let normalizedString = text.normalize(normalizationForm);
  let unicodeEscapeSequence = "";
  for (let i = 0; i < normalizedString.length; i++) {
    unicodeEscapeSequence +=
      "\\u" + normalizedString.charCodeAt(i).toString(16).padStart(4, "0");
  }
  return unicodeEscapeSequence;
}

const text = "パン";

const nfcUnicodeSequence = getUnicodeEscapeSequence(text, "NFC");
console.log("NFC Unicodeエスケープシーケンス:", nfcUnicodeSequence);
// => NFC Unicodeエスケープシーケンス: \u30d1\u30f3

const nfdUnicodeSequence = getUnicodeEscapeSequence(text, "NFD");
console.log("NFD Unicodeエスケープシーケンス:", nfdUnicodeSequence);
// => NFD Unicodeエスケープシーケンス: \u30cf\u309a\u30f3
