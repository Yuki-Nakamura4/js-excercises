import { getAllPropertyNames } from "./index";

const obj1 = { item: "apple", num: 3 };

const obj2 = {};
Object.defineProperties(obj2, {
  item: { enumerable: false },
  num: { enumerable: false },
});

const obj3 = {
  [Symbol("foo")]: "bar",
};

const parentObj = {};
Object.defineProperties(parentObj, {
  item: { value: "apple", enumerable: true },
  num: { value: 3, enumerable: true },
  price: { value: 100, enumerable: false }, // priceのみ列挙不可
});
const obj4 = Object.create(parentObj);

describe("すべての独自プロパティと列挙可能な継承プロパティを取得する", () => {
  test("独自プロパティのみ、列挙可のみ => すべて取得できる)", () => {
    expect(getAllPropertyNames(obj1)).toEqual(["item", "num"]);
  });

  test("独自プロパティのみ、列挙不可のみ => すべて取得できる)", () => {
    expect(getAllPropertyNames(obj2)).toEqual(["item", "num"]);
  });

  test("独自プロパティのみ、Symbolのみ => すべて取得できる)", () => {
    expect(getAllPropertyNames(obj3).length).toEqual(1); // プロパティ名が1つ返ってきていればOK
  });

  test("継承プロパティのみ => 列挙可のプロパティ名のみ取得できる)", () => {
    expect(getAllPropertyNames(obj4)).toEqual(["item", "num"]);
  });
});
