export function substring(str, indexStart, indexEnd) {
  // indexStartがNaNの場合は0にする
  if (Number.isNaN(indexStart)) indexStart = 0;

  // indexEndが指定されなかった場合は文字列の最後までを指定する
  if (indexEnd === undefined) indexEnd = str.length;
  // indexEndがNaNの場合は0にする
  if (Number.isNaN(indexEnd)) indexEnd = 0;

  // indexEnd が indexStart より小さい場合は入れ替える
  if (indexEnd < indexStart) {
    const temp = indexStart;
    indexStart = indexEnd;
    indexEnd = temp;
  }

  // 小数点以下を切り捨て、負の値は0にする
  indexStart = Math.max(0, Math.min(str.length, Math.floor(indexStart)));
  indexEnd = Math.max(0, Math.min(str.length, Math.floor(indexEnd)));

  // startIndex から endIndex-1 までの文字列を取り出して返す
  let result = "";
  for (let i = indexStart; i < indexEnd; i++) {
    result += str[i];
  }
  return result;
}

export function slice(str, indexStart, indexEnd) {
  // indexStartが指定されなかった場合は0にする
  if (indexStart === undefined) indexStart = 0;
  // indexStartがNaNの場合は0にする
  if (Number.isNaN(indexStart)) indexStart = 0;

  // indexEndが指定されなかった場合は文字列の最後までを指定する
  if (indexEnd === undefined) indexEnd = str.length;
  // indexEndがNaNの場合は0にする
  if (Number.isNaN(indexEnd)) indexEnd = 0;

  // indexStartが文字列の範囲外の場合は空文字列を返す
  if (indexStart >= str.length) return "";
  // indexEndが文字列の範囲外の場合は、文字列の末尾までを指定する
  if (indexEnd >= str.length) indexEnd = str.length;

  // indexStartが負の場合、文字列の末尾から数えた位置に変換する
  if (indexStart < 0) indexStart = Math.max(indexStart + str.length, 0);
  // indexEndが負の場合、文字列の末尾から数えた位置に変換する
  if (indexEnd < 0) indexEnd = Math.max(indexEnd + str.length, 0);

  // 小数点以下を切り捨てる
  indexStart = Math.floor(indexStart);
  indexEnd = Math.floor(indexEnd);

  // indexEnd が indexStart より小さい場合は空文字列を返す
  if (indexEnd <= indexStart) return "";

  // startIndex から endIndex までの文字列を取り出して返す
  let result = "";
  for (let i = indexStart; i < indexEnd; i++) {
    result += str[i];
  }
  return result;
}

export function padStart(str, targetLength, padString) {
  if (str.length >= targetLength) return str;
  if (padString === undefined) padString = " ";
  const paddingLength = targetLength - str.length;
  const padding = padString
    .repeat(Math.ceil(paddingLength / padString.length))
    .slice(0, paddingLength);
  return padding + str;
}

export function trim(str) {
  return str.replace(/^\s+|\s+$/g, "");
}
