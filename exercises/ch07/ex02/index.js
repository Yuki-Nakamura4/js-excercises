// fizzbuzz関数をforEach()を用いて実装
export function fizzbuzz(n) {
  // 1からnまでの連番の配列を生成 https://qiita.com/suin/items/1b39ce57dd660f12f34b
  const numbers = [...Array(n)].map((_, i) => i + 1);

  numbers.forEach((num) => {
    const output =
      (num % 3 === 0 ? "Fizz" : "") + (num % 5 === 0 ? "Buzz" : "") || num;
    console.log(output);
  });
}

// 各要素の差の二乗の総和を求める関数をmap()を用いて実装
export function sumOfSquaredDifference(f, g) {
  let result = 0;
  f.map((value, index) => {
    result += (value - g[index]) ** 2;
  });
  return result;
}

// 偶数の要素の合計が42以上になるかどうかを判定する関数をfilterとreduceを用いて実装
export function sumOfEvensIsLargerThan42(array) {
  const sum = array
    .filter((num) => num % 2 === 0)
    .reduce((acc, num) => acc + num, 0);
  return sum >= 42;
}
