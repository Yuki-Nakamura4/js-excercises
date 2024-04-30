// 2つの数値が同値かどうかを判定する関数
export function areEqual(num1, num2) {
  return Math.abs(num1 - num2) < 1e-10; // 10のマイナス10乗未満の誤差を許容する
}