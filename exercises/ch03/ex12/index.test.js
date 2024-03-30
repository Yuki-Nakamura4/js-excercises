import { equals } from "./index";

test("objects with same properties should return true", () => {
  const obj1 = { x: 1, y: 2 };
  const obj2 = { x: 1, y: 2 };
  expect(equals(obj1, obj2)).toBe(true);
});

test("objects with different properties should return false", () => {
  const obj1 = { x: 1, y: 2 };
  const obj2 = { x: 1, z: 3 };
  expect(equals(obj1, obj2)).toBe(false);
});

test("objects with same properties but different values should return false", () => {
  const obj1 = { x: 1, y: 2 };
  const obj2 = { x: 1, y: 3 };
  expect(equals(obj1, obj2)).toBe(false);
});

test("objects with same properties but different order should return true", () => {
  const obj1 = { x: 1, y: 2 };
  const obj2 = { y: 2, x: 1 };
  expect(equals(obj1, obj2)).toBe(true);
});

test("empty objects should return true", () => {
  const obj1 = {};
  const obj2 = {};
  expect(equals(obj1, obj2)).toBe(true);
});

test("objects with different number of properties should return false", () => {
  const obj1 = { x: 1, y: 2 };
  const obj2 = { x: 1 };
  expect(equals(obj1, obj2)).toBe(false);
});
