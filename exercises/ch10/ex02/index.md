## IIFE(Immediately-invoked function expression)

- 即時実行関数の形で関数を定義することでグローバルへの汚染を避けるようにした形式
- その内部で定義された変数や関数はその内部のみ(ローカルスコープ)で扱える

```javascript
(function () {
  console.log("This is an IIFE.");
})();
```

## AMD(Asynchronous Module Definition)

- CommonJSは当初ブラウザ環境で実行されることが想定されていなかったため、ブラウザ環境での実行を考慮し、依存関係の解決および遅延ロードに対応した
- define()に配列でモジュール名を指定する

```javascript
// math.js
define(function () {
  return {
    add: function (a, b) {
      return a + b;
    },
  };
});

// main.js
require(["math"], function (math) {
  console.log(math.add(3, 4)); // 7
});
```

参考

- [AMD & RequireJS](https://qiita.com/nanocloudx/items/70f1316debf05b93ac82)
