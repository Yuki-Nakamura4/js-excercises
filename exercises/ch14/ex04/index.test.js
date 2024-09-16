import { Hiragana } from "./index.js";

describe("Hiraganaっクラスのテスト", () => {
  test("ひらがな1文字でない場合はエラーが投げられる", () => {
    expect(() => new Hiragana("あい")).toThrowError(
      "ひらがな1文字を入力してください"
    );
    expect(() => new Hiragana("a")).toThrowError(
      "ひらがな1文字を入力してください"
    );
    expect(() => new Hiragana("漢")).toThrowError(
      "ひらがな1文字を入力してください"
    );
  });

  test("ひらがな1文字が正しく格納される", () => {
    const hiragana = new Hiragana("あ");
    expect(hiragana.char).toBe("あ");
    expect(hiragana.code).toBe("あ".charCodeAt(0));
  });

  test("文字コードでの比較が正しく行われる (< や >)", () => {
    const a = new Hiragana("あ");
    const ka = new Hiragana("か");
    expect(a < ka).toBe(true);
    expect(ka > a).toBe(true);
  });

  test("ひらがな文字列でソートができる", () => {
    const hiraganas = [
      new Hiragana("く"),
      new Hiragana("い"),
      new Hiragana("え"),
      new Hiragana("あ"),
    ];
    hiraganas.sort();
    expect(hiraganas.map((h) => String(h))).toEqual(["あ", "い", "え", "く"]);
  });

  test("文字列変換が正しく行われる", () => {
    const hiragana = new Hiragana("う");
    expect(String(hiragana)).toBe("う");
  });

  test("数値変換が正しく行われる", () => {
    const hiragana = new Hiragana("い");
    expect(Number(hiragana)).toBe("い".charCodeAt(0));
  });

  test("デフォルトの変換では文字列として扱われる", () => {
    const hiragana = new Hiragana("え");
    expect(`${hiragana}`).toBe("え");
  });
});
