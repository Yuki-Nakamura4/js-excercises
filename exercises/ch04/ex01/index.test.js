import { add, sub, mul, div } from "./index";

describe("Complex Number Operations", () => {
  const a = { real: 3, imag: 9 };
  const b = { real: -4, imag: 7 }; // 実部が負数
  const c = { real: 2, imag: -6 }; // 虚部が負数
  // const d = {real: 1.2, img: 0.9} // 小数を含む

  test("Addition", () => {
    expect(add(a, a)).toEqual({ real: 6, imag: 18 });
    expect(add(a, b)).toEqual({ real: -1, imag: 16 });
    expect(add(a, c)).toEqual({ real: 5, imag: 3 });
  });

  test("Subtraction", () => {
    expect(sub(a, a)).toEqual({ real: 0, imag: 0 });
    expect(sub(a, b)).toEqual({ real: 7, imag: 2 });
    expect(sub(a, c)).toEqual({ real: 1, imag: 15 });
  });

  test("Multiplication", () => {
    expect(mul(a, a)).toEqual({ real: -72, imag: 54 });
    expect(mul(a, b)).toEqual({ real: -75, imag: -15 });
    expect(mul(a, c)).toEqual({ real: 60, imag: 0 });
  });

  test("Division", () => {
    expect(div(a, a)).toEqual({ real: 1, imag: 0 });
    expect(div(a, b)).toEqual({ real: 0.8, imag: -0.9 });
    expect(div(a, c)).toEqual({ real: -1.2, imag: 0.9 });
  });
});
