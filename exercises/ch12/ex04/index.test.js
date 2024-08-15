import { primeGenerator } from "./index";

describe("generatePrimesのテスト", () => {
  it("呼び出しごとに素数を順番に返すこと。", () => {
    const generator = primeGenerator();
    expect(generator.next().value).toBe(2);
    expect(generator.next().value).toBe(3);
    expect(generator.next().value).toBe(5);
    expect(generator.next().value).toBe(7);
    expect(generator.next().value).toBe(11);
    expect(generator.next().value).toBe(13);
    expect(generator.next().value).toBe(17);
    expect(generator.next().value).toBe(19);
    expect(generator.next().value).toBe(23);
    expect(generator.next().value).toBe(29);
    expect(generator.next().value).toBe(31);
  });
});
