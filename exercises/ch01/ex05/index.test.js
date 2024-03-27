import { abs, sum, factorial } from "./index.js";

// TypeScript の場合は以下:
// import { abs, sum, factorial } from "./index.ts";

describe("math", () => {
  // abs関数のテスト　引数の絶対値を返す
  describe("abs", () => {
    it("returns same value when positive value given", () => {
      expect(abs(42)).toBe(42);
    });

    it("returns negated value when negative value given", () => {
      expect(abs(-42)).toBe(42);
    });

    it("returns zero value when zero given", () => {
      expect(abs(0)).toBe(0);
    });
  });

  // sum関数のテスト　2つの引数の合計を返す
  describe("sum", () => {
    it("returns sum of two numbers when both values are positive", () => {
      expect(sum([3, 4])).toBe(7);
    });

    it("returns sum of two numbers when both values are zero", () => {
      expect(sum([0, 0])).toBe(0);
    });

    it("returns sum of two numbers when one value is negative", () => {
      expect(sum([-7, 2])).toBe(-5);
    });

    it("returns sum of two numbers when both values are negative", () => {
      expect(sum([-3, -4])).toBe(-7);
    });
  });

  // factorial関数のテスト 引数の階乗を返す
  describe("factorial", () => {
    it("returns 1 when 0 given", () => {
      expect(factorial(0)).toBe(1);
    });

    it("returns the factorial when positive integer given", () => {
      expect(factorial(5)).toBe(120);
    });
  });
});
