export function retryWithExponentialBackoff(func, maxRetry) {
  return new Promise((resolve, reject) => {
    let attempt = 0;

    const tryFunc = () => {
      func()
        .then(resolve)
        .catch((error) => {
          if (attempt < maxRetry) {
            attempt++;
            const waitTime = Math.pow(2, attempt - 1);
            setTimeout(tryFunc, waitTime * 1000);
          } else {
            reject(error);
          }
        });
    };

    tryFunc();
  });
}
