class A {}
class B extends A {}
class C extends B {}

class X {}
class Y extends X {}

// instanceOf 関数のインポート
import { instanceOf } from "./index";

describe("instanceOf", () => {
  test("多段に継承したクラスのインスタンスと基底クラスのコンストラクタを入力するケース", () => {
    const c = new C();
    expect(instanceOf(c, C)).toBe(true); // C のインスタンス
    expect(instanceOf(c, B)).toBe(true); // B のインスタンス
    expect(instanceOf(c, A)).toBe(true); // A のインスタンス
  });

  test("継承関係にないインスタンスとクラスのコンストラクタを入力するケース", () => {
    const c = new C();
    const y = new Y();
    expect(instanceOf(c, Y)).toBe(false); // 継承関係にない
    expect(instanceOf(y, C)).toBe(false); // 継承関係にない
  });

  test("非オブジェクトを渡した場合のケース", () => {
    expect(instanceOf(null, A)).toBe(false); // nullはオブジェクトではない
    expect(instanceOf(undefined, A)).toBe(false); // undefinedはオブジェクトではない
  });

  test("プリミティブを渡した場合のケース", () => {
    expect(instanceOf(123, Number)).toBe(false); // numberはオブジェクトではない
    expect(instanceOf("string", String)).toBe(false); // stringはオブジェクトではない
    expect(instanceOf(true, Boolean)).toBe(false); // booleanはオブジェクトではない
  });

  test("インスタンスと関数ではないものを渡した場合のケース", () => {
    const obj = {};
    expect(instanceOf(obj, {})).toBe(false); // {} は関数ではない
    expect(instanceOf(obj, [])).toBe(false); // [] は関数ではない
  });
});
