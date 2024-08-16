import { fetchSumOfFileSizes } from "./index";

describe("fetchSumOfFileSizesのテスト", () => {
  it("ファイルサイズの合計を取得", async () => {
    fetchSumOfFileSizes("ch13/ex04/test").then((size) => {
      expect(size).toBe(22);
    });
  });
});
