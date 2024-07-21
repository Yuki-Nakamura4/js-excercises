import { cache, slowFn } from "./index";

describe("cacheのテスト", () => {
  test("キャッシュが正しく動作すること", () => {
    const obj = { a: 1, b: 2 };
    const cachedSlowFn = cache(slowFn);

    const start = Date.now();
    expect(cachedSlowFn(obj)).toBe(2);
    const firstTime = Date.now() - start;

    const start2 = Date.now();
    expect(cachedSlowFn(obj)).toBe(2);
    const secondTime = Date.now() - start2;

    // 2回目の呼び出しは1回目の呼び出しの半分以下の時間で終わること
    expect(secondTime).toBeLessThan(firstTime / 2);
  });
});
