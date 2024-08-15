import { readLines } from ".";

describe("readLinesのテスト", () => {
  it("ファイルの内容を1行ずつ返すこと", () => {
    const generator = readLines("./ch12/ex05/test.txt");
    expect(generator.next().value).toBe("Hello World.");
    expect(generator.next().value).toBe("This is a test file.");
    expect(generator.next().value).toBe("Goodbye.");
    expect(generator.next().done).toBe(true);
  });
});
