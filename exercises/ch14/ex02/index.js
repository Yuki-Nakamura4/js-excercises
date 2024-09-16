export class MyArrayLike {
  constructor(length = 0) {
    this.length = length;
  }
}

// Arrayを継承したMyArrayクラスを定義
export class MyArray extends Array {
  constructor(items) {
    super(...items);
  }

  // Symbol.speciesプロパティをオーバーライドする。
  // MaArrayのmap()やslice()などのメソッドを呼び出した際に、
  // MyArrayLikeクラスのインスタンスが返るようになる。
  static get [Symbol.species]() {
    return MyArrayLike;
  }
}
