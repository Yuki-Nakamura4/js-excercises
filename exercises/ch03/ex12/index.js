// 数値型のプロパティを持つオブジェクト obj1 を作成
const obj1 = { x: 1 };

// obj1 に新しいプロパティを追加して確認
obj1.y = 2;
console.log(obj1); // { x: 1, y: 2 }

// obj1 と同じプロパティ内容を持つオブジェクト obj2 を新規作成し、obj1 と obj2 を === で比較します。
const obj2 = { x: 1, y: 2 };
console.log(obj1 === obj2); // false
// obj1 と obj2 は同じプロパティ内容を持っているが、異なるオブジェクトなので === 演算子で比較すると false が返される

// obj1 と obj2 を引数に取り、2つのオブジェクトが同じ内容なら true を返す関数
export function equals(obj1, obj2) {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) {
    return false;
  }

  for (const key of keys1) {
    if (obj1[key] !== obj2[key]) {
      return false;
    }
  }

  return true;
}