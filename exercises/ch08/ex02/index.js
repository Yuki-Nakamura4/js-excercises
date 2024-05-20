// 再帰を用いた方法。O(logN)
export const powerRecursive = (x, n) => {
  if (n === 0) {
    return 1;
  } else if (n % 2 === 0) {
    const halfPower = powerRecursive(x, n / 2);
    return halfPower * halfPower;
  } else {
    const halfPower = powerRecursive(x, (n - 1) / 2);
    return x * halfPower * halfPower;
  }
};

// ループを用いた方法。O(logN)
export const powerLoop = (x, n) => {
  let result = 1;
  while (n > 0) {
    if (n % 2 === 1) {
      result *= x;
    }
    x *= x;
    n = Math.floor(n / 2);
  }
  return result;
};
