import { powerRecursive, powerLoop } from "./index";

test("powerRecursive", () => {
  expect(powerRecursive(2, 5)).toBe(32);
  expect(powerRecursive(3, 4)).toBe(81);
  expect(powerRecursive(4, 0)).toBe(1);
  expect(powerRecursive(8, 1)).toBe(8);
});

test("powerLoop", () => {
  expect(powerLoop(2, 5)).toBe(32);
  expect(powerLoop(3, 4)).toBe(81);
  expect(powerLoop(4, 0)).toBe(1);
  expect(powerLoop(8, 1)).toBe(8);
});
