// クロージャにより更新したx, yの値を保持できる
export function fibonacciSequence() {
  let x = 0,
    y = 1;
  return {
    next: function () {
      const current = y;
      [x, y] = [y, x + y];
      return { value: current, done: false };
    },
  };
}
