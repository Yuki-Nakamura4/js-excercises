## 結果

何も出力されなかった。

理由: longRunningButAsyncFunction 関数内の無限ループがマイクロタスクキューにタスクを無限に追加し続けるため、setTimeout によってスケジュールされたコールバックが呼び出されることがないから。

JavaScript の実行環境は、マクロタスクキュー(setTimeoutやsetIntervalによってスケジュールされたタスクが含まれる)とマイクロタスクキュー(Promiseのthenやasync/awaitによってスケジュールされたタスクが含まれる)の二つのタスクキューを持っている。イベントループは、現在のマクロタスクを完了させた後、マイクロタスクキューが空になるまでマイクロタスクを処理する。

longRunningButAsyncFunction関数では、await null;がマイクロタスクとしてスケジュールされ、無限ループのためこれが無限に繰り返される。awaitの使用により、関数の実行は一時的に中断され、マイクロタスクキューにタスクが追加される。しかし、この関数が無限ループしているため、イベントループはこのマイクロタスクキューから抜け出すことができず、結果として setTimeoutによってスケジュールされたコールバックが呼び出されることがない。

```js
setTimeout(() => console.log("Hello, world!"), 1000);

async function longRunningButAsyncFunction() {
  while (true) {
    // NOTE: ループの中で凄く時間のかかる処理 (大きい行列の処理とか...) を実行していると想像して下さい。
    // (適当な値で await するのが目的であり null に理由はない)
    await null;
  }
}

longRunningButAsyncFunction();
```
