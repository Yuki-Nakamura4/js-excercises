export function cache(f) {
  const cacheMap = new WeakMap(); // キャッシュがガベージコレクションの対象になるようWeakMapを使用

  return function (obj) {
    if (cacheMap.has(obj)) {
      // キャッシュに存在する場合はキャッシュから結果を返す
      return cacheMap.get(obj);
    } else {
      // キャッシュに存在しない場合は関数を実行し、結果をキャッシュに保存
      const result = f(obj);
      cacheMap.set(obj, result);
      return result;
    }
  };
}

export function slowFn(obj) {
  const start = Date.now();
  while (Date.now() < start + 10000); // 10秒処理を遅延させる
  return Object.keys(obj).length;
}
