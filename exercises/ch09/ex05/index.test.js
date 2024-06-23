class A {}
class B extends A {}
class C extends B {}

class X {}
class Y extends X {}

// instanceOf 関数のインポート
import { instanceOf } from "./index";

describe("instanceOf", () => {
  test("多段に継承したクラスのインスタンスと基底クラスのコンストラクタを入力するケース", () => {
    const c = new C(); // 多段に継承したクラスのインスタンス
    expect(instanceOf(c, C)).toBe(true);
    expect(instanceOf(c, B)).toBe(true);
    expect(instanceOf(c, A)).toBe(true);
  });

  test("継承関係にないインスタンスとクラスのコンストラクタを入力するケース", () => {
    const c = new C();
    const y = new Y();
    expect(instanceOf(c, Y)).toBe(false);
    expect(instanceOf(y, C)).toBe(false);
  });

  test("非オブジェクトを渡した場合のケース", () => {
    expect(instanceOf(null, A)).toBe(false);
    expect(instanceOf(undefined, A)).toBe(false);
  });

  test("プリミティブを渡した場合のケース", () => {
    expect(instanceOf(123, Number)).toBe(false);
    expect(instanceOf("string", String)).toBe(false);
    expect(instanceOf(true, Boolean)).toBe(false);
  });

  test("インスタンスと関数ではないものを渡した場合のケース", () => {
    const obj = {};
    expect(instanceOf(obj, {})).toBe(false);
    expect(instanceOf(obj, [])).toBe(false);
  });
});
