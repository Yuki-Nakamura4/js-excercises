import { equalArrays } from "./index";

describe("equalArrays", () => {
  test("should return true if two arrays are equal", () => {
    const a = [1, 2, 3];
    const b = [1, 2, 3];
    expect(equalArrays(a, b)).toBeTruthy();
  });

  test("should return false if two arrays are not equal", () => {
    const a = [1, 2, 3];
    const b = [1, 2, 4];
    expect(equalArrays(a, b)).toBeFalsy();
  });

  // 明らかに異なる値だがtrueが返る
  test("should return false but actually return true", () => {
    const a = NaN;
    const b = Infinity;
    expect(equalArrays(a, b)).toBeTruthy(); // trueが返る
  });
});
