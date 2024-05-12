/* eslint-disable no-prototype-builtins */

import { assign } from "./index";

const obj1 = { item: "apple", num: 3 };
const obj2 = { price: 100 };
const obj3 = { item: "orange" };
const obj4 = { item: "banana" };
const obj5 = {
  get value() {
    return 5;
  },
};
const obj6 = {
  _value: 0,
  set value(value) {
    this._value = value;
  },
};

describe("Object.assign()とassign()が等価であることを確認する", () => {
  test("空のオブジェクトにコピー", () => {
    expect(Object.assign({}, obj1)).toEqual(assign({}, obj1));
  });
  test("既にプロパティのあるオブジェクトにコピー(同一のプロパティ名なし)", () => {
    expect(Object.assign(obj2, obj1)).toEqual(assign(obj2, obj1));
    expect(obj1).toEqual({ item: "apple", num: 3 }); // コピー元は変更されない
  });
  test("既にプロパティのあるオブジェクトにコピー(同一のプロパティ名あり)", () => {
    expect(Object.assign(obj3, obj1)).toEqual(assign(obj3, obj1));
    expect(obj3).toEqual({ item: "apple", num: 3 }); // itemをコピー元の値で上書き
  });

  test("複数のコピー元を引数として渡す", () => {
    expect(Object.assign(obj3, obj1, obj4)).toEqual(assign(obj3, obj1, obj4));
    expect(obj3).toEqual({ item: "banana", num: 3 }); // itemを2つ目のコピー元の値で上書き
  });

  test("コピー元のゲッターが呼び出され、ゲッターのメソッド自体はコピーされないか確認", () => {
    const copiedObj5 = assign({}, obj5);
    expect(copiedObj5).toEqual({ value: 5 });
    // ゲッターメソッドがコピーされていないことを確認
    const descriptor = Object.getOwnPropertyDescriptor(copiedObj5, "value");
    expect(descriptor.get).toBeUndefined();
  });

  test("コピー先のセッターが呼び出され、セッターのメソッド自体はコピーされないか確認", () => {
    const copiedObj6 = assign(obj6, obj1);
    expect(copiedObj6).toEqual({ _value: 0, item: "apple", num: 3 });
    // セッターメソッドがコピーされていないことを確認
    const descriptor = Object.getOwnPropertyDescriptor(copiedObj6, "_value");
    expect(descriptor.set).toBeUndefined();
  });
});
