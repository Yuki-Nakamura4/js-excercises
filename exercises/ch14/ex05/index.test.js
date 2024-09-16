import { typeTemplate } from "./index.js";

describe("typeTemplateのテスト", () => {
  test("値の型を含む文字列を返す", () => {
    const result = typeTemplate`こんにちは${"世界"}、数値は${42}`;
    expect(result).toBe("こんにちはstring、数値はnumber");
  });

  test("値がない場合の処理", () => {
    const result = typeTemplate`値がないただの文字列`;
    expect(result).toBe("値がないただの文字列");
  });

  test("複数の型を処理する", () => {
    const result = typeTemplate`真偽値: ${true}、オブジェクト: ${{}}、配列: ${[]}`;
    expect(result).toBe("真偽値: boolean、オブジェクト: object、配列: object");
  });

  test("undefinedとnullを処理する", () => {
    const result = typeTemplate`未定義: ${undefined}、null: ${null}`;
    expect(result).toBe("未定義: undefined、null: object");
  });
});
