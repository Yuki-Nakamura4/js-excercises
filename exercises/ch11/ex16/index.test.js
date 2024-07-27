import { retryWithExponentialBackoff } from "./index";
import { jest } from "@jest/globals";

describe("retryWithExponentialBackoff", () => {
  jest.useFakeTimers();

  test("should succeed before reaching max retries", (done) => {
    const func = jest
      .fn()
      .mockReturnValueOnce(false)
      .mockReturnValueOnce(false)
      .mockReturnValue(true); // 3回目でtrueを返す

    const callback = (result) => {
      try {
        expect(result).toBe(true);
        expect(func).toHaveBeenCalledTimes(3);
        done();
      } catch (error) {
        done(error);
      }
    };

    retryWithExponentialBackoff(func, 5, callback);
    jest.runAllTimers(); // すべてのタイマーを実行
  });

  test("should fail after reaching max retries", (done) => {
    const func = jest.fn().mockReturnValue(false); // 常にfalseを返す

    const callback = (result) => {
      try {
        expect(result).toBe(false);
        expect(func).toHaveBeenCalledTimes(5 + 1); // maxRetry回数だけ呼び出される
        done();
      } catch (error) {
        done(error);
      }
    };

    retryWithExponentialBackoff(func, 5, callback);
    jest.runAllTimers(); // すべてのタイマーを実行
  });
});
