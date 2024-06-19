## 予想

false, true  
true, false

## 結果

false, true  
true, false

## 説明

- 通常の関数では、関数が呼び出されるコンテキストによってthisの値が動的に決まる。関数がオブジェクトのメソッドとして呼ばれた場合`this`はそのオブジェクトになる。
  よって、`nest.nem()`では`nm()`をメソッドとして呼び出した`nest`が`this`の値になり、1つ目の`console.log()`では`false`, `true`が表示される。

- 一方で、アロー関数では`this`はレキシカルスコープ(静的スコープ)で決定される。つまり、アロー関数自体が定義された時点での外部のコンテキストの`this`をそのまま参照する。よって、`nest.arrow()`では`obj`が`this`の値になり、2つ目の`console.log()`では`true`, `false`が表示される。

```js
const obj = {
  om: function () {
    const nest = {
      nm: function () {
        console.log(this === obj, this === nest);
      },
      arrow: () => {
        console.log(this === obj, this === nest);
      },
    };
    nest.nm();
    nest.arrow();
  },
};
obj.om();
```
