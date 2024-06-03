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

Object.defineProperty(obj, "sum", { get: obj.sum }); // アクセサプロパティとして再定義

// JSON.stringifyはオブジェクトをシリアライズするときそのオブジェクトのすべての列挙可なプロパティを列挙し、値を取得する
// ゲッターメソッドが定義されているプロパティの場合、値を取得するためにそのゲッターメソッドが呼び出される
test("ゲッターメソッドが実行されることを確認する", () => {
  obj.x = 1;
  obj.y = 2;
  expect(JSON.stringify(obj)).toBe(`{"x":1,"y":2,"sum":3}`);
  expect(mock).toHaveBeenCalled();
});
