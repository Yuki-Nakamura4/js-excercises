substring() と slice() の違い

- indexStart が indexEnd よりも大きい場合 
  - substring()
    - 2 つの引数を交換する
  - slice()
    - 空文字列を返す

- どちらかまたは両方の引数が負の数の場合
  - substring()
    - 0 として扱う
  - slice()
    - 文字列の末尾からの文字数で位置を探す

参考:
- javascriptのStringのsubstring slice substr
  - https://qiita.com/littlekbt/items/4a47f485391b6b45d96c

- String.prototype.substring() - JavaScript - MDN Web Docs
  - https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/String/substring

- String.prototype.slice() - JavaScript - MDN Web Docs - Mozilla
  - https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/String/slice