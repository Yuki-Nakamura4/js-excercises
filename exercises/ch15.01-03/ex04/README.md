## グローバルオブジェクトを参照する方法

### ブラウザ

ブラウザ環境では、グローバルオブジェクトは`window`  
`console.log(window);`のように参照できる。

### Node.js

Node.js環境では、グローバルオブジェクトは`global`  
`console.log(global);`のように参照できる。

### ブラウザ / Node.js問わず

`globalThis`を使用する。
`console.log(globalThis);`のように参照できる。

## ブラウザ独自のプロパティやメソッド

- document
- navigator
- localStorage
- sessionStorage
- fetch
- alert
- confirm
- prompt
- location
- history

## 過去のES仕様でのundefinedに関する問題

過去のECMAScript仕様では、undefinedは書き換え可能なグローバル変数として定義されていた。そのため、undefinedが書き換えられ、コードに予期しない動作やバグが発生する可能性があった。

```javascript
undefined = "not undefined";
console.log(undefined); // "not undefined"
```

なお、ECMAScript5以降では、undefinedは読み取り専用のプロパティとして定義されており、書き換えができなくなっている。そのため、上記の問題は現在は解決されている。
