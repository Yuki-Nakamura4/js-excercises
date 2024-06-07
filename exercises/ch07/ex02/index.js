// fizzbuzz関数をmap()とforEach()を用いて実装
export function fizzbuzz(n) {
  // 1からnまでの連番の配列を生成 https://qiita.com/suin/items/1b39ce57dd660f12f34b
  const numbers = [...Array(n)].map((_, i) => i + 1);

  numbers.forEach((num) => {
    const output =
      (num % 3 === 0 ? "Fizz" : "") + (num % 5 === 0 ? "Buzz" : "") || num;
    console.log(output);
  });
}

// 次の関数、ぜんぶメソッドまんべんなく使いたいという意図で最初map使って実装してましたが
// よく見たら上でmap使っていたのでreduceに直しました

// 各要素の差の二乗の総和を求める関数をreduce()を用いて実装
export function sumOfSquaredDifference(f, g) {
  return f.reduce((acc, value, index) => {
    return acc + (value - g[index]) ** 2;
  }, 0);
}

// 偶数の要素の合計が42以上になるかどうかを判定する関数をfilterとreduceを用いて実装
export function sumOfEvensIsLargerThan42(array) {
  const sum = array
    .filter((num) => num % 2 === 0)
    .reduce((acc, num) => acc + num, 0);
  return sum >= 42;
}
