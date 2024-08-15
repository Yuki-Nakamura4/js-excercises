export function* counterGenerator() {
  let count = 0;
  while (true) {
    try {
      yield count;
      count++;
    } catch (e) {
      count = 0; // リセット
      yield count;
    }
  }
}
