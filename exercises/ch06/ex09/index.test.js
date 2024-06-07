import { jest } from "@jest/globals";

const mock = jest.fn();

const obj = {
  x: 0,
  y: 0,
  sum() {
    mock();
    return this.x + this.y;
  },
};

obj.toJSON = function () {
  return { ...this, sum: this.sum() };
};

test("マッチャーに成功することを確認", () => {
  obj.x = 1;
  obj.y = 2;
  expect(JSON.stringify(obj)).toBe(`{"x":1,"y":2,"sum":3}`);
  expect(mock).toHaveBeenCalled();
});
