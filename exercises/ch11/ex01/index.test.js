import { TypeMap } from "./index";

class Foo {}

describe("TypeMapのテスト", () => {
  let typeMap;

  beforeEach(() => {
    typeMap = new TypeMap();
  });

  test("値のset/getができること", () => {
    typeMap.set(String, "string");
    typeMap.set(Number, 123);
    typeMap.set(Foo, new Foo());

    expect(typeMap.get(String)).toBe("string");
    expect(typeMap.get(Number)).toBe(123);
    expect(typeMap.get(Foo)).toBeInstanceOf(Foo);
  });

  test("コンストラクタ関数のクラスでない値が渡されたときにエラーが起きること", () => {
    expect(() => {
      typeMap.set(Date, "not a date");
    }).toThrow(
      "Value must be an instance of the provided constructor function"
    );
  });

  test("キーがコンストラクタ関数でない場合にエラーが起きること", () => {
    expect(() => {
      typeMap.set({}, "string");
    }).toThrow("Key must be a constructor function");
  });

  test("プリミティブ値は、ラッパークラスのコンストラクタ関数でset/get可能であること", () => {
    typeMap.set(String, "string");
    typeMap.set(Number, 123);
    typeMap.set(Boolean, true);

    expect(typeMap.get(String)).toBe("string");
    expect(typeMap.get(Number)).toBe(123);
    expect(typeMap.get(Boolean)).toBe(true);
  });
});
