export function retryWithExponentialBackoff(func, maxRetry, callback) {
  let attempt = 0;

  const tryFunc = () => {
    if (func()) {
      callback(true);
    } else if (attempt < maxRetry) {
      // 指数関数的バックオフでリトライ
      attempt++;
      const waitTime = Math.pow(2, attempt - 1);
      setTimeout(tryFunc, waitTime * 1000);
    } else {
      callback(false);
    }
  };

  tryFunc();
}
