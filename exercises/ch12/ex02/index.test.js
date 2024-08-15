import { fibonacciSequence } from "./index";

describe("fibonacciSequenceのテスト", () => {
  it("フィボナッチ数を正しく返すこと。", () => {
    const fib = fibonacciSequence();
    expect(fib.next().value).toBe(1);
    expect(fib.next().value).toBe(1);
    expect(fib.next().value).toBe(2);
    expect(fib.next().value).toBe(5);
    expect(fib.next().value).toBe(8);
  });
});
