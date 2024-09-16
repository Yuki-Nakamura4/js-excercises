// unwritableAndUnconfigurableObj関数
export function unwritableAndUnconfigurableObj() {
  // 一度プロパティを定義してから属性の設定を変更する。定義した時点ではすべてのデフォルト値がtrue
  const obj = { a: 1 };

  // Object.defineProperty()メソッドでプロパティの属性を設定する
  Object.defineProperty(obj, "a", {
    writable: false,
    configurable: false,
  });
  return obj;
}

// writableAndUnconfigurableObj関数
export function writableAndUnconfigurableObj() {
  const obj = { b: 2 };
  Object.defineProperty(obj, "b", {
    configurable: false,
  });
  return obj;
}

// nestedUnwritableObj関数
export function nestedUnwritableObj() {
  // ネストされている場合、cを書き込み不可にしてもそのプロパティへの書き込みは可能のまま
  const obj = { c: { d: { e: 3 } } };

  // Object.freeze()メソッドでオブジェクトを拡張不可にする
  // 再定義と書き込みを禁止する
  Object.freeze(obj.c.d);
  Object.freeze(obj.c);
  Object.freeze(obj);
  return obj;
}

// 一度プロパティを定義してから変更するのではなく、空のオブジェクトを作成してから
// Object.defineProperty()でプロパティの定義も同時にする場合は、
// 明示的に指定しなかった属性のデフォルト値がfalseになることに注意。
// よって、その場合は以下のようにtrueにする属性を指定することになる。

// // unwritableAndUnconfigurableObj関数
// export function unwritableAndUnconfigurableObj() {
//     const obj = {};
//     // Object.defineProperty()メソッドでプロパティの属性を設定する
//     Object.defineProperty(obj, "a", {
//       value: 1,
//       enumerable: true,
//     });
//     return obj;
//   }

//   // writableAndUnconfigurableObj関数
//   export function writableAndUnconfigurableObj() {
//     const obj = {};
//     Object.defineProperty(obj, "b", {
//       value: 2,
//       writable: true,
//       enumerable: true,
//     });
//     return obj;
//   }

//   // nestedUnwritableObj関数
//   export function nestedUnwritableObj() {
//     const obj = {};
//     Object.defineProperty(obj, "c", {
//       value: { d: { e: 3 } },
//       enumerable: true,
//     });
//     Object.freeze(obj.c.d);
//     Object.freeze(obj.c);
//     Object.freeze(obj);
//     return obj;
//   }
