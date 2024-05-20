import { repeatChar, square, getCurrentTime } from "./index";

test("repeatChar", () => {
  expect(repeatChar(3, "hello")).toEqual(["hello", "hello", "hello"]);
  expect(repeatChar(1, "x")).toEqual(["x"]);
});

test("square", () => {
  expect(square(3)).toBe(9);
  expect(square(0)).toBe(0);
  expect(square(-2)).toBe(4);
});

test("getCurrentTime", () => {
  expect(getCurrentTime()).toHaveProperty("now");
  expect(getCurrentTime().now).toBeInstanceOf(Date);
});
