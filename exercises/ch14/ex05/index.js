// テンプレートリテラルを受けとり文字列を返す関数
export function typeTemplate(strings, ...values) {
  // 固定の文字部分の配列を走査し、各要素にvalueの型を表す文字列を連結していく
  return strings.reduce((result, str, i) => {
    // 値がある場合は型を取得し、ない場合は空文字を返す
    const valueType = i < values.length ? typeof values[i] : "";
    // 値を連結し、集積していく
    return result + str + (valueType ? valueType : "");
  }, "");
}
