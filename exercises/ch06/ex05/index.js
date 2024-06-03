const obj = { num: 7, str: "apple" };

const inheritedObj = Object.create(obj);

inheritedObj.newNum = 14;
inheritedObj.newStr = "orange";

// 通常は独自プロパティ → プロトタイプのプロパティの順に列挙される
// (プロトタイプを順に辿っていくため)
for (const prop in inheritedObj) {
  console.log(prop);
}
// newNum
// newStr
// num
// str

// プロトタイプは列挙可のプロパティ(num, str)と同名の列挙不可のプロパティをもたせる
Object.defineProperty(inheritedObj, "num", {
  enumerable: false, // enumerableの初期値はfalseなので明示しなくてもよい
});
Object.defineProperty(inheritedObj, "str", {
  enumerable: false,
});

// numとstrは列挙不可なので、for/inループで列挙されない
// (プロトタイプで同名のプロパティが列挙可でも)
for (const prop in inheritedObj) {
  console.log(prop);
}
// newNum
// newStr
