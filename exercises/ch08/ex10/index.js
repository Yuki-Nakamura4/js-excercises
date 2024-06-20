export function addMyCall(f) {
  // fにmyCallメソッドを追加する
  f.myCall = function (thisObj, ...args) {
    // fをthisObjにバインドする
    return f.bind(thisObj)(...args);
  };
  return f;
}
