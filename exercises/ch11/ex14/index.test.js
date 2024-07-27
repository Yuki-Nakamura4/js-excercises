import { sortJapanese, toJapaneseDateString } from "./index";

describe("sortJapanese", () => {
  test("日本語文字列の配列を正しくソートする", () => {
    const input = ["つきう", "つぎい", "っかあ", "っくあ"];
    const expected = ["っかあ", "つぎい", "つきう", "っくあ"];
    expect(sortJapanese(input)).toEqual(expected);
  });
});

describe("toJapaneseDateString", () => {
  test("令和の日付を正しくフォーマットする", () => {
    const input = new Date(2024, 7 - 1, 27); // 2024年7月27日
    const expected = "令和6年7月27日";
    expect(toJapaneseDateString(input)).toEqual(expected);
  });

  test("平成の日付を正しくフォーマットする", () => {
    const input = new Date(1993, 5 - 1, 22); // 1993年5月22日
    const expected = "平成5年5月22日";
    expect(toJapaneseDateString(input)).toEqual(expected);
  });

  test("不明な元号の日付を処理する", () => {
    const input = new Date(1912, 7 - 1, 29); // 1912年7月29日
    const expected = "不明な元号";
    expect(toJapaneseDateString(input)).toEqual(expected);
  });
});
