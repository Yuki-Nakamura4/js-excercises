export function instanceOf(object, constructor) {
  // 非オブジェクトを渡された場合、falseを返す
  if (object === null || typeof object !== "object") {
    return false;
  }

  let prototype = Object.getPrototypeOf(object);

  while (prototype !== null) {
    if (prototype === constructor.prototype) {
      return true;
    }
    prototype = Object.getPrototypeOf(prototype);
  }

  return false;
}
