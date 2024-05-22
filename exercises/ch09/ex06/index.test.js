import { TypedMap } from "./index";

describe("TypedMapクラス", () => {
  test("setメソッドが正しく動作すること", () => {
    const typeMap = new TypedMap("string", "number");
    typeMap.set("key", 1);
    expect(typeMap.get("key")).toBe(1);
  });

  test("getメソッドが正しく動作すること", () => {
    const typeMap = new TypedMap("string", "number", [["key", 1]]);
    expect(typeMap.get("key")).toBe(1);
  });

  test("deleteメソッドが正しく動作すること", () => {
    const typeMap = new TypedMap("string", "number", [["key", 1]]);
    typeMap.delete("key");
    expect(typeMap.has("key")).toBe(false);
  });

  test("clearメソッドが正しく動作すること", () => {
    const typeMap = new TypedMap("string", "number", [["key", 1]]);
    typeMap.clear();
    expect(typeMap.size).toBe(0);
  });
});
