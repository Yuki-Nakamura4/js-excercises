export const repeatChar = (n, c) => {
  // 引数が複数ある場合、丸括弧が必要
  for (let i = 0; i < n; i++) console.log(c);
  return Array(n).fill(c);
};

// prettier-ignore
export const square = x => x * x;
// 引数が1つの場合、引数の丸括弧を省略可能
// 関数本体がreturn文だけの場合、returnキーワードとセミコロン、中括弧を省略可能

export const getCurrentTime = () => ({ now: new Date() });
// 引数がない場合、空の丸括弧が必要
// 戻り値がオブジェクトリテラルの場合、丸括弧内にオブジェクトを明示する必要がある
// (関数本体かオブジェクトリテラルかを判別できるようにするため)
