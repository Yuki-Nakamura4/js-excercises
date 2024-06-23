export class TypedMap {
  constructor(keyType, valueType, entries) {
    this.map = new Map(entries);

    // entriesが指定されている場合、型をチェックする
    if (entries) {
      for (const [k, v] of entries) {
        if (typeof k !== keyType || typeof v !== valueType) {
          throw new TypeError(`Wrong type for entry [${k}, ${v}]`);
        }
      }
    }

    // 次に、型を保存する
    this.keyType = keyType;
    this.valueType = valueType;
  }

  // set()メソッドを再定義して、マップに追加されるキーと値のペアに対して
  // 型チェックを行うようにする
  set(key, value) {
    // keyやvalueの型が異なっている場合は、エラーをスローする
    if (this.keyType && typeof key !== this.keyType) {
      throw new TypeError(`${key} is not of type ${this.keyType}`);
    }
    if (this.valueType && typeof value !== this.valueType) {
      throw new TypeError(`${value} is not of type ${this.valueType}`);
    }

    // Mapオブジェクトのsetメソッドを呼び出して値を設定する
    this.map.set(key, value);
    return this;
  }

  // Mapオブジェクトの他のメソッドにも同様の方法でラッパーを提供する

  // getメソッド
  get(key) {
    return this.map.get(key);
  }

  // deleteメソッド
  delete(key) {
    return this.map.delete(key);
  }

  // hasメソッド
  has(key) {
    return this.map.has(key);
  }

  // clearメソッド
  clear() {
    return this.map.clear();
  }

  // keysメソッド
  keys() {
    return this.map.keys();
  }

  // valuesメソッド
  values() {
    return this.map.values();
  }

  // entriesメソッド
  entries() {
    return this.map.entries();
  }

  // forEachメソッド
  forEach(callbackFn, thisArg) {
    return this.map.forEach(callbackFn, thisArg);
  }

  // sizeプロパティ
  get size() {
    return this.map.size;
  }
}

// export class TypedMap extends Map {
//   constructor(keyType, valueType, entries) {
//     // entriesが指定されている場合、型をチェックする
//     if (entries) {
//       for (const [k, v] of entries) {
//         if (typeof k !== keyType || typeof v !== valueType) {
//           throw new TypeError(`Wrong type for entry [${k}, ${v}]`);
//         }
//       }
//     }

//     // (型チェックされた)entriesを使って、スーパークラスを初期化する
//     super(entries);

//     // 次に、型を保存してサブクラスを初期化する
//     this.keyType = keyType;
//     this.valueType = valueType;
//   }

//   // set()メソッドを再定義して、マップに追加されるキーと値のペアに対して
//   // 型チェックを行うようにする
//   set(key, value) {
//     // keyやvalueの型が異なっている場合は、エラーをスローする
//     if (this.keyType && typeof key !== this.keyType) {
//       throw new TypeError(`${key} is not of type ${this.keyType}`);
//     }
//     if (this.valueType && typeof value !== this.valueType) {
//       throw new TypeError(`${value} is not of type ${this.valueType}`);
//     }

//     return super.set(key, value);
//   }
// }
