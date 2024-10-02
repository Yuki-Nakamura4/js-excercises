export function createLoggingProxy(obj) {
  // メソッド呼び出し履歴を保存するための配列
  const callHistory = [];

  // Proxyのハンドラ
  const handler = {
    // メソッドが呼び出されたときの処理
    get(target, property) {
      // Reflect APIを使ってプロパティの値を取得する
      const value = Reflect.get(target, property);
      // プロパティが関数である場合のみラップする
      if (typeof value === 'function') {
        return function (...args) {
          // 元のメソッドを呼び出し、結果を取得
          // applyを使用し、実行時のthisを正しく設定する
          const result = value.apply(target, args);
          // メソッド呼び出し履歴に追加
          callHistory.push({
            timestamp: new Date(),
            methodName: property,
            parameters: args,
          });
          return result;
        };
      }

      // 関数でない場合はそのまま返す
      return value;
    },
  };

  // Proxyを作成する
  const proxy = new Proxy(obj, handler);

  // Proxyと配列 双方への参照を返却する
  return { proxy, callHistory };
}
