/* eslint-disable no-prototype-builtins */

const obj = {};

Object.defineProperty(obj, "property1", {
  value: 12,
  writable: false, // 書き込み不可
  enumerable: false, // 列挙不可
  configurable: false, // 再定義不可(削除できない、属性を変更できない)
});

obj.property1 = 24;
console.log(obj.property1); // 12
// 書き込み不可のため値が変更されない

delete obj.property1;
console.log(obj.property1); // 12
// 再定義不可のため値が削除されない

// hasOwnProperty()
// オブジェクト自身が（継承されていない）指定されたプロパティを持っているかどうかを返す
console.log(obj.hasOwnProperty("property1")); //true
// 列挙不可にしているが、この方法なら列挙するわけではないのでプロパティの有無を確認できる

// propertyIsEnumerable()
// 指定されたプロパティが列挙可能で、かつオブジェクト自身のプロパティであるかどうかを返す
console.log(obj.propertyIsEnumerable("property1")); // false
// 列挙不可に設定しているので、列挙できない

// 以下は比較用
const obj2 = {};
Object.defineProperty(obj2, "property1", {
  value: 33,
  writable: true, // 書き込み可
  enumerable: true, // 列挙可
  configurable: true, // 再定義可
});

console.log(obj2.hasOwnProperty("property1")); //true
console.log(obj2.propertyIsEnumerable("property1")); // true

obj2.property1 = 66;
console.log(obj2.property1); // 66

delete obj2.property1;
console.log(obj2.property1); // undefined
