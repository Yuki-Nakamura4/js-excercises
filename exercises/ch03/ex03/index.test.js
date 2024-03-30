import { areEqual } from "./index";

describe("areEqual", () => {
  test("2つの数値が同値かどうかを判定する", () => {
    expect(areEqual(0.3 - 0.2, 0.1)).toBeTruthy();
    expect(areEqual(0.2 - 0.1, 0.1)).toBeTruthy();
  });
});
