const iterable = [99]; // イテラブルオブジェクト

// イテラブルオブジェクトのイテレータメソッドを呼び出してイテレータオブジェクトを取得する
const iterator = iterable[Symbol.iterator]();

// イテレータオブジェクトのnext()メソッドを呼び出して反復結果オブジェクトを取得する
for (let result = iterator.next(); !result.done; result = iterator.next()) {
  console.log(result.value);
}
