// 予想
// `undefined` => undefined
// `null` -> object 以前の章で歴史的な経緯からnullはobjectを返すと書いてあったため(ただし厳密にはnullはオブジェクトではなくそのプロパティ)
// `オブジェクト` => object
//  `NaN` => NaN
//  `数値` => number
//  `関数` => object

console.log(typeof undefined); // "undefined"
console.log(typeof null); // "object"
console.log(typeof {}); // "object"
console.log(typeof NaN); // "number"  !!
console.log(typeof 123); // "number"
console.log(typeof function () {}); // "function"  !!

// NaNはNot a Numberのくせにnumber型を返すのが面白かった
// 関数はオブジェクトだと思っていたが、functionが返された。
// 「関数はオブジェクトの一種ですが、関数は戻り値を持つので、他のオブジェクトとは異なると判断し、typeof演算子は"function"という文字列を返します」
