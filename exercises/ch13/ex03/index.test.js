import { readdir, stat } from ".";

describe("Promise版のfsモジュール", () => {
  it("Promiseでファイル一覧を取得", async () => {
    readdir("ch13/ex03").then((files) => {
      expect(files).toEqual(["index.js", "index.test.js", "test.txt"]);
    });
  });

  it("Promiseでファイルの情報を取得", async () => {
    stat("ch13/ex03/test.txt").then((stats) => {
      expect(stats.isFile()).toBe(true);
      expect(stats.size).toBe(0);
    });
  });
});
