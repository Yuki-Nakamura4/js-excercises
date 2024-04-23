import { resize1, resize2 } from "./index";

function resize(params) {
  let maxWidth = 600;
  let maxHeight = 480;

  if (params && params.maxWidth) {
    maxWidth = params.maxWidth;
  }

  if (params && params.maxHeight) {
    maxHeight = params.maxHeight;
  }

  console.log({ maxWidth, maxHeight });
}

const obj1 = { maxWidth: 2000, maxHeight: 3000 };
const obj2 = { maxWidth: 2000 };
const obj3 = { maxHeight: 3000 };

describe("resize", () => {
  test("should match the result with the result of previous function", () => {});
  expect(resize1(undefined)).toBe(resize(undefined));
  expect(resize1(obj1)).toBe(resize(obj1));
  expect(resize1(obj2)).toBe(resize(obj2));
  expect(resize1(obj3)).toBe(resize(obj3));

  expect(resize2(undefined)).toBe(resize(undefined));
  expect(resize2(obj1)).toBe(resize(obj1));
  expect(resize2(obj2)).toBe(resize(obj2));
  expect(resize2(obj3)).toBe(resize(obj3));
});
