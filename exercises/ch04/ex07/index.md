```js
function set42(key) {
  eval(`${key} = 42;`);
}

// 負荷を与える例。無限ループでコンソールに文字列を出力させる
set42("while(true){console.log('attacked!')}; hello")
```