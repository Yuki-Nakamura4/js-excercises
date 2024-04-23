export function bitCount(num) {
  // 32ビット整数表現形式で1であるビットの数を数える
  let count = 0;
  for (let i = 0; i < 32; i++) {
    if ((num & (1 << i)) !== 0) {
      count++;
    }
  }
  return count;
}
