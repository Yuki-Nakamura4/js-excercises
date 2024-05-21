## 組み込み関数

```
console.log(Object.prototype.toString.toString());

// function toString() { [native code] }
```

## 自作関数

```
function hello() {
console.log("Hello");
}
console.log(hello.toString());

// function hello() {
// console.log("Hello");
// }
```

## 結果

組み込み関数の場合は関数本題が"[native code]"という文字列になった
