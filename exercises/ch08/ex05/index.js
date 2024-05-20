export const sequenceToObject = (...values) => {
  // 値の個数が偶数であることを確認する
  if (values.length % 2 !== 0) {
    throw new Error("値の個数が偶数ではありません");
  }

  const result = {};

  for (let i = 0; i < values.length; i += 2) {
    const key = values[i];
    const value = values[i + 1];

    // 奇数番の値がstringであることを確認する
    if (typeof key !== "string") {
      throw new Error("奇数番の値が文字列ではありません");
    }

    result[key] = value;
  }

  return result;
};
