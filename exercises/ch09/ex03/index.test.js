import { C, C2 } from "./index";

test("プライベートフィールド", () => {
  const c = new C();
  expect(c.getX()).toBe(42);
  // expect(console.log(c.#x)).toBeUndefined();
  // 上記のコードはエラーになる
});

test("クロージャ", () => {
  const c = new C2();
  expect(c.getX()).toBe(42);
  expect(c.x).toBeUndefined(); // クロージャの外部からフィールドには直接アクセスできない
});
