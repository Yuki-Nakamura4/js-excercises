import path from "path";
import { walk } from ".";

describe("walのテスト", () => {
  it("指定されたディレクトリ内のファイル/ディレクトリをすべて返すこと", () => {
    const generator = walk("./ch12/ex06/test");
    expect(generator.next().value).toEqual({
      path: "",
      isDirectory: true,
    });
    expect(generator.next().value).toEqual({
      path: "dir1",
      isDirectory: true,
    });
    expect(generator.next().value).toEqual({
      path: path.normalize("dir1/file1.txt"),
      isDirectory: false,
    });
    expect(generator.next().value).toEqual({
      path: path.normalize("dir1/file2.txt"),
      isDirectory: false,
    });
    expect(generator.next().value).toEqual({
      path: "dir2",
      isDirectory: true,
    });
    expect(generator.next().value).toEqual({
      path: path.normalize("dir2/file3.txt"),
      isDirectory: false,
    });
    expect(generator.next().value).toEqual({
      path: path.normalize("dir2/file4.txt"),
      isDirectory: false,
    });
    expect(generator.next().done).toBe(true);
  });
});
