// 【非破壊的な配列の操作】
// 元の配列をコピーした新しい配列を生成し、そこに対して操作を行うのが分かりやすい
// slice()などの非破壊的なメソッドが存在する場合それを利用しても良い

export function pop(arr) {
  const newArr = [...arr];
  newArr.pop();
  return newArr;
}

// // sliceを使ったpop関数。元の配列は変更されない
// export function pop(seq) {
//     return seq.slice(0, -1);
//   }

export function push(arr, num) {
  return [...arr, num];
}

export function shift(arr) {
  return arr.slice(1);
}

export function unshift(arr, num) {
  return [num, ...arr];
}

export function sort(arr, compareFn) {
  return [...arr].sort(compareFn);
}
