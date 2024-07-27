import {
  getDaysInMonth,
  countWeekdaysBetween,
  getWeekday,
  getFirstDayOfLastMonth,
} from "./index";

describe("getDaysInMonth", () => {
  test("2024年1月は31日", () => {
    expect(getDaysInMonth(2024, 1)).toBe(31);
  });

  test("2024年2月は29日", () => {
    expect(getDaysInMonth(2024, 2)).toBe(29);
  });

  test("2024年12月は31日", () => {
    expect(getDaysInMonth(2024, 4)).toBe(30);
  });
});

describe("countWeekdaysBetween", () => {
  test("2024年1月1日から2024年1月31日までの土日以外の日数は23日", () => {
    expect(countWeekdaysBetween("2024-01-01", "2024-01-31")).toBe(23);
  });

  test("2024年2月1日から2024年2月29日までの土日以外の日数は20日", () => {
    expect(countWeekdaysBetween("2024-02-01", "2024-02-29")).toBe(21);
  });
});

describe("getWeekday", () => {
  test("2024年1月1日は月曜日", () => {
    expect(getWeekday("2024-01-01", "ja-JP")).toBe("月曜日");
  });

  test("2024年2月1日は木曜日", () => {
    expect(getWeekday("2024-02-01", "ja-JP")).toBe("木曜日");
  });
});

describe("getFirstDayOfLastMonth", () => {
  test("getFirstDayOfLastMonth関数の返すオブジェクトが先月1日0時0分0秒のDateオブジェクトであること", () => {
    const today = new Date();
    const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);
    expect(getFirstDayOfLastMonth()).toEqual(lastMonth);

    // オブジェクトの日が1、時・分・秒が0であることを確認
    expect(getFirstDayOfLastMonth().getDate()).toBe(1);
    expect(getFirstDayOfLastMonth().getHours()).toBe(0);
    expect(getFirstDayOfLastMonth().getMinutes()).toBe(0);
    expect(getFirstDayOfLastMonth().getSeconds()).toBe(0);
  });
});
