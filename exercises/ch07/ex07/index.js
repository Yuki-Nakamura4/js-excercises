// バブルソート
export function bubbleSort(
  array,
  compare = (lhs, rhs) => (lhs < rhs ? -1 : lhs > rhs ? +1 : 0)
) {
  // (N-1)個の要素それぞれについて(最後の1つの位置はそれ以外の位置が定まった際に自動的に確定するので(N-1)回で良い)
  for (let i = 0; i < array.length - 1; i++) {
    // 最初は(N-1)回の比較を行い最大の値を確定する、次は(N-2)回、その次は(N-3)回......
    for (let j = 0; j < array.length - 1 - i; j++) {
      if (compare(array[j], array[j + 1]) > 0) {
        // 左の要素が右の要素より大きいなら左右の位置を交換する
        [array[j], array[j + 1]] = [array[j + 1], array[j]];
      }
    }
  }
  return array;
}
