## 組み込み関数

```javascript
console.log(Math.max.toString());

// function max() { [native code] }
```

## 自作関数

```javascript
function hello() {
  console.log("Hello");
}
console.log(hello.toString());

// function hello() {
// console.log("Hello");
// }
```

## 結果

- 組み込み関数の場合は関数本体が`[native code]`という文字列になった
  - `[native code]`は、JavaScriptの組み込みオブジェクトや組み込み関数が実装されている部分が実際のJavaScriptのコードではなく、ブラウザやJavaScriptエンジンの内部でネイティブに実装されていることを示す特別な文字列
