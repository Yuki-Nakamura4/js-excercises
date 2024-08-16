import { retryWithExponentialBackoff } from "./index";
import { jest } from "@jest/globals";

jest.useFakeTimers();

describe("retryWithExponentialBackoff", () => {
  it("関数が最初の試行で成功する場合、直ちに解決すること。s", async () => {
    const mockFunc = jest.fn().mockResolvedValue("成功");
    const promise = retryWithExponentialBackoff(mockFunc, 3);
    expect(mockFunc).toHaveBeenCalledTimes(1);
    await expect(promise).resolves.toBe("成功");
  });
});
