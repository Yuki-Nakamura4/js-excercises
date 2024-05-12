export function assign(copyTo, ...copyFromList) {
  for (const copyFrom of copyFromList) {
    for (const prop in copyFrom) {
      copyTo[prop] = copyFrom[prop];
    }
  }
  return copyTo;
}
