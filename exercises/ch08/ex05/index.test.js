import { sequenceToObject } from "./index";

describe("可変長引数からオブジェクトを生成する関数のテスト", () => {
  test("正常系", () => {
    expect(sequenceToObject("a", 1, "b", 2)).toEqual({ a: 1, b: 2 });
    expect(sequenceToObject("1", 10, "2", -10, "3", 0)).toEqual({
      1: 10,
      2: -10,
      3: 0,
    });
  });
  test("スプレッド演算子で配列を与える", () => {
    const arry = ["a", 1, "b", 2];
    expect(sequenceToObject(...arry)).toEqual({ a: 1, b: 2 });
  });
  test("いずれかの奇数番の値が string でない場合に例外が発生する", () => {
    expect(() => sequenceToObject("a", 1, null, 2)).toThrow(
      "奇数番の値が文字列ではありません"
    );
  });

  test("値の個数の合計が偶数ではない場合に例外が発生する", () => {
    expect(() => sequenceToObject("a", 1, "b", 2, "c")).toThrow(
      "値の個数が偶数ではありません"
    );
  });
});
