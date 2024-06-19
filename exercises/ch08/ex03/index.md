## 末尾再帰はなぜスタックオーバーフローが起こらないよう最適化ができるのか

> スタックフレームは関数の計算途中の値を保持するのに必要ですが、言い換えると、**計算途中の値がそれ以上使用されないのであれば、スタックフレームも不要**ということになります。ここで、関数の末尾呼び出しに着目してみましょう。ある関数fが別の関数gを末尾呼び出ししているとき、fの結果（リターン値）はgの結果そのものです。つまり、gの呼び出し後にfのスタックフレームは使用されません。したがって、gの呼び出し時にスタックフレームを新たに生成するのではなく、fのスタックフレームをgのスタックフレームとして再利用することが可能です。これを**末尾呼び出しの除去（tail call elimination）** と呼びます。コンパイラや実行環境が行う末尾呼び出しの除去を **末尾呼び出し最適化(tail call optimization)** といいます。

[引用：末尾再帰による最適化](https://qiita.com/pebblip/items/cf8d3230969b2f6b3132)

### 末尾再帰最適化できる例

最後の再帰の呼び出しの結果がそのまま返り値になるため、スタックフレームを積んでいく必要がない

```javascript
function factorialTail(n, acc = 1) {
  if (n === 0) {
    return acc;
  } else {
    return factorialTail(n - 1, acc * n);
  }
}
```

### 末尾再帰最適化できない例

最終的に関数の呼び出し元に戻る必要があるので、そのための情報をスタックに積んで保持する必要がある

```javascript
function factorial(n) {
  if (n === 0) {
    return 1;
  } else {
    return n * factorial(n - 1);
  }
}
```

## JavaScript で末尾再帰最適化を実装している処理系

- JavaScriptCore
  - Safariで使われているJavaScriptエンジン

ブラウザで末尾呼び出し最適化をサポートしているのは現状Safariのみのようである。
Babelも現在はサポートしていないらしい。

> 現在JavaScriptCoreエンジン（Safari）でのみ末尾最適化が実装されている  
> ES6でTCOを行うように定められたがV8（Chrome）,SpiderMonkey(Firefox)などの主要ブラウザでは実装されていない

> Babelではv5までTCOが実装されていたがv6で消滅（最新版はv7）

[引用：末尾呼び出し最適化とJavaScript（April 23, 2021）](https://speakerdeck.com/kota_yata/mo-wei-hu-bichu-sizui-shi-hua-tojavascript?slide=10)
