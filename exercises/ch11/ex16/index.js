export function retryWithExponentialBackoff(func, maxRetry, callback) {
  let attempt = 0;

  const tryFunc = () => {
    if (func()) {
      // funcがtrueを返した場合、成功としてcallbackを呼び出す
      callback(true);
    } else if (attempt < maxRetry) {
      // funcがfalseを返し、かつ最大リトライ回数に達していない場合、指数関数的バックオフでリトライ
      attempt++;
      const waitTime = Math.pow(2, attempt - 1); // 待ち時間を計算
      setTimeout(tryFunc, waitTime * 1000); // setTimeoutで非同期にリトライ
    } else {
      // 最大リトライ回数に達した場合、失敗としてcallbackを呼び出す
      callback(false);
    }
  };

  tryFunc(); // 関数の初回実行
}
