import { createLoggingProxy } from "./index.js";

describe("createLoggingProxyのテスト", () => {
  test("メソッド呼び出し履歴が記録されること", () => {
    const obj = {
      greet(name) {
        return `こんにちは、${name}!`;
      },
    };

    const { proxy, callHistory } = createLoggingProxy(obj);
    proxy.greet("太郎");

    expect(callHistory.length).toBe(1);
    expect(callHistory[0].methodName).toBe("greet");
    expect(callHistory[0].parameters).toEqual(["太郎"]);
  });

  test("複数のメソッド呼び出しが記録されること", () => {
    const obj = {
      add(a, b) {
        return a + b;
      },
      subtract(a, b) {
        return a - b;
      },
    };

    const { proxy, callHistory } = createLoggingProxy(obj);
    proxy.add(1, 2);
    proxy.subtract(5, 3);

    expect(callHistory.length).toBe(2);
    expect(callHistory[0].methodName).toBe("add");
    expect(callHistory[0].parameters).toEqual([1, 2]);
    expect(callHistory[1].methodName).toBe("subtract");
    expect(callHistory[1].parameters).toEqual([5, 3]);
  });

  test("メソッドの戻り値が正しいこと", () => {
    const obj = {
      multiply(a, b) {
        return a * b;
      },
    };

    const { proxy } = createLoggingProxy(obj);
    const result = proxy.multiply(3, 4);

    expect(result).toBe(12);
  });

  test("メソッドが呼び出されない場合、履歴が空であること", () => {
    const obj = {
      divide(a, b) {
        return a / b;
      },
    };

    const { callHistory } = createLoggingProxy(obj);

    expect(callHistory.length).toBe(0);
  });
});
