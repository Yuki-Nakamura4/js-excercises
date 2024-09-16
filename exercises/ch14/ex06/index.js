export function createLoggingProxy(obj) {
  // メソッド呼び出し履歴を保存するための配列
  const callHistory = [];

  // Proxyのハンドラ
  const handler = {
    // メソッドが呼び出されたときの処理
    get(target, property) {
      // 元のメソッドを取得
      const originalMethod = target[property];
      return function (...args) {
        // メソッドをこのオブジェクトにバインドして呼び出す
        const result = originalMethod.apply(this, args);
        // メソッド呼び出し履歴に追加
        callHistory.push({
          timestamp: new Date(),
          methodName: property,
          parameters: args,
        });
        return result;
      };
    },
  };

  // Proxyを作成する
  const proxy = new Proxy(obj, handler);

  // Proxyと配列 双方への参照を返却する
  return { proxy, callHistory };
}
