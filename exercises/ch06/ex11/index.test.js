import { CoordinateConverter } from "./index";

describe("CoordinateConverter", () => {
  test("xを書き換える", () => {
    CoordinateConverter.x = 3;
    expect(CoordinateConverter.r).toBeCloseTo(Math.sqrt(12));
    expect(CoordinateConverter.theta).toBeCloseTo(Math.atan2(Math.sqrt(3), 3));
    expect(CoordinateConverter.y).toBeCloseTo(Math.sqrt(3), 3);
  });

  test("yを書き換える", () => {
    // 初期値に戻す
    CoordinateConverter.x = 1;
    CoordinateConverter.y = Math.sqrt(3);

    CoordinateConverter.y = 2;
    expect(CoordinateConverter.r).toBeCloseTo(Math.sqrt(5));
    expect(CoordinateConverter.theta).toBeCloseTo(Math.atan2(2, 1));
    expect(CoordinateConverter.x).toBeCloseTo(1, 3);
  });

  test("x, yにNaNが設定される場合にエラーが発生する", () => {
    // 初期値に戻す
    CoordinateConverter.x = 1;
    CoordinateConverter.y = Math.sqrt(3);

    expect(() => {
      CoordinateConverter.x = NaN;
    }).toThrow("Invalid value: NaN");
    expect(() => {
      CoordinateConverter.y = NaN;
    }).toThrow("Invalid value: NaN");
  });
});
