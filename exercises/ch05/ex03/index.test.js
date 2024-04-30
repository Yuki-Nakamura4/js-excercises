import { isHolidayIfElse, isHolidaySwitch } from "./index";

describe("休日であるかを判定する", () => {
    test("isHolidayIfElseのテスト", () => {
        expect(isHolidayIfElse("月")).toBe(false);
        expect(isHolidayIfElse("火")).toBe(false);
        expect(isHolidayIfElse("水")).toBe(false);
        expect(isHolidayIfElse("木")).toBe(false);
        expect(isHolidayIfElse("金")).toBe(false);
        expect(isHolidayIfElse("土")).toBe(true);
        expect(isHolidayIfElse("日")).toBe(true);
    })
    test("isHolidaySwitchのテスト", () => {
        expect(isHolidaySwitch("月")).toBe(false);
        expect(isHolidaySwitch("火")).toBe(false);
        expect(isHolidaySwitch("水")).toBe(false);
        expect(isHolidaySwitch("木")).toBe(false);
        expect(isHolidaySwitch("金")).toBe(false);
        expect(isHolidaySwitch("土")).toBe(true);
        expect(isHolidaySwitch("日")).toBe(true);
    })
})