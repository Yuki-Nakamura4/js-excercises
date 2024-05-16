// arrayUtils.test.js

import { pop, push, shift, unshift, sort } from "./index";

describe("非破壊的な関数のテスト", () => {
  const seq = [1, 2, 3, 4, 5];

  test("pop", () => {
    expect(pop(seq)).toEqual([1, 2, 3, 4]);
    expect(seq).toEqual([1, 2, 3, 4, 5]); // 元の配列は変更されない
  });

  test("push", () => {
    expect(push(seq, 6)).toEqual([1, 2, 3, 4, 5, 6]);
    expect(seq).toEqual([1, 2, 3, 4, 5]);
  });

  test("shift", () => {
    expect(shift(seq)).toEqual([2, 3, 4, 5]);
    expect(seq).toEqual([1, 2, 3, 4, 5]);
  });

  test("unshift", () => {
    expect(unshift(seq, 0)).toEqual([0, 1, 2, 3, 4, 5]);
    expect(seq).toEqual([1, 2, 3, 4, 5]);
  });

  test("sort", () => {
    expect(sort(seq, (a, b) => b - a)).toEqual([5, 4, 3, 2, 1]);
    expect(seq).toEqual([1, 2, 3, 4, 5]);
  });
});
