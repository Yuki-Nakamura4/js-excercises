import { counterGenerator } from ".";

describe("counterGeneratorのテスト", () => {
  it("throw()でリセットされること", () => {
    const gen = counterGenerator();
    expect(gen.next().value).toBe(0);
    expect(gen.next().value).toBe(1);
    expect(gen.next().value).toBe(2);
    gen.throw();
    expect(gen.next().value).toBe(0);
  });
});
