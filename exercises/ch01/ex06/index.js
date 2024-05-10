// // 再帰的に求める場合 => これだと終わらない
// export function fib(number) {
//   return number <= 1 ? number : fib(number - 1) + fib(number - 2);
// }

// フィボナッチ数列の一般項を求める公式を使った場合
export function fib2(number) {
  const sqrt5 = Math.sqrt(5);
  const phi = (1 + sqrt5) / 2;
  return Math.round(
    (Math.pow(phi, number) - Math.pow(1 - phi, number)) / sqrt5,
  );
}