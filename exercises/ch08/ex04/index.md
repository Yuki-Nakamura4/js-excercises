## 予想

false, true  
true, false

## 結果

false, true  
true, false

## 説明

入れ子型の関数がメソッドとして呼び出された場合、関数を呼び出したオブジェクトがthisの値になる。  
よって、nmではnmをメソッドとして呼び出したnestがthisの値になるため、一つ目のconsole.log()ではfalse, trueが表示される。  
一方で、アロー関数ではthisの値が適切に継承される。よって、arrowではnmではなくobjがthisの値となる。

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
