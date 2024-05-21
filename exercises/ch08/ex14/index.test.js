import { any, catching } from "./index";

describe("any関数", () => {
  test("残余パラメータとして任意の数の関数を受け取り、いずれかの関数がtrueを返せばtrueを返す新たな関数を返す", () => {
    const isNonZero = any(
      (n) => n > 0,
      (n) => n < 0
    );

    expect(isNonZero(0)).toBe(false);
    expect(isNonZero(42)).toBe(true);
    expect(isNonZero(-0.5)).toBe(true);
  });
});

describe("catching関数", () => {
  test("引数として2つの関数を受け取り、1つ目の関数で発生した例外を2つ目の関数の引数として処理し結果を返す新たな関数を返す", () => {
    const safeJsonParse = catching(JSON.parse, (e) => {
      return { error: e.toString() };
    });

    expect(safeJsonParse('{"a": 1}')).toEqual({ a: 1 });
    expect(safeJsonParse("{Invalid Json}")).toEqual({
      error: expect.any(String),
    });
  });
});
