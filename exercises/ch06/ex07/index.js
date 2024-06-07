export function assign(copyTo, ...copyFromList) {
  for (const copyFrom of copyFromList) {
    for (const prop in copyFrom) {
      if (Object.prototype.hasOwnProperty.call(copyFrom, prop)) {
        copyTo[prop] = copyFrom[prop];
      }
    }
  }
  return copyTo;
}

// 列挙可な独自プロパティのみをコピーするよう修正
