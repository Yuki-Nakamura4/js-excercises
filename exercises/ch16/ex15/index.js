if (threads.isMainThread) {
  let num = 0;
  const worker = new threads.Worker(__filename);

  worker.on("online", () => {
    for (let i = 0; i < 10_000_000; i++) {
      num++; // メインスレッドでnumをインクリメント
    }
  });

  worker.on("message", (message) => {
    if (message === "increment") {
      num++; // サブスレッドからのメッセージを受信してnumをインクリメント
    } else if (message === "done") {
      console.log(num); // 両方のスレッドが終了したらnumの値を表示
    }
  });
} else {
  for (let i = 0; i < 10_000_000; i++) {
    threads.parentPort.postMessage("increment"); // メインスレッドにnumをインクリメントするようにメッセージを送信
  }
  threads.parentPort.postMessage("done"); // 処理が完了したことをメインスレッドに通知
}
