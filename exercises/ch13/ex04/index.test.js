import { fetchFirstFileSize, fetchSumOfFileSizes } from ".";

describe("fetchFirstFileSizeのテスト", () => {
  it("ファイルサイズを取得", async () => {
    fetchFirstFileSize("ch13/ex04/test").then((size) => {
      expect(size).toBe(11);
    });
  });
});

describe("fetchSumOfFileSizesのテスト", () => {
  it("ファイルサイズの合計を取得", async () => {
    fetchSumOfFileSizes("ch13/ex04/test").then((size) => {
      expect(size).toBe(22);
    });
  });
});
