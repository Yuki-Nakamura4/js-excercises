class Example {
  constructor(value) {
    this.value = value;
  }

  valueOf() {
    return this.value * 2;
  }

  toString() {
    return `The value is ${this.value}`;
  }
}

let obj = new Example(5);

// valueOf() を直接呼び出さずに結果を出力
// 演算子がオペランドとしてオブジェクトを受け取った場合、そのオブジェクトのプリミティブ型を取得するために valueOf() メソッドが呼び出される
console.log(obj + 0); // 10

// toString() を直接呼び出さずに結果を出力
// オブジェクトが文字列として使用される場合、toString() メソッドが呼び出される
console.log(`${obj}`); // The value is 5
