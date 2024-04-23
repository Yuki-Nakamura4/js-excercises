import { bitCount } from "./index";

describe("bitCount", () => {
  test("should count the number of set bits in a 32-bit integer", () => {
    expect(bitCount(0b111)).toBe(3);
    expect(bitCount(0b1111111111111111111111111111111)).toBe(31);
    expect(bitCount(0b1010101010101010101010101010101)).toBe(16);
    expect(bitCount(0)).toBe(0);
    expect(bitCount(0xffffffff)).toBe(32);
  });
});
