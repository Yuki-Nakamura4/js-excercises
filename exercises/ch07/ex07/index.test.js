import { bubbleSort } from "./index";

describe("ソートアルゴリズムのテスト", () => {
  const seq1 = [2, 1, 4, 5, 3];
  const seq2 = [-1, 0, 2, 1, -2]; // 負数と0を含む

  test("バブルソート", () => {
    expect(bubbleSort(seq1)).toEqual([1, 2, 3, 4, 5]);
    expect(bubbleSort(seq2)).toEqual([-2, -1, 0, 1, 2]);
  });
});
