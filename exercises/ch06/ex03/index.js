/* eslint-disable no-prototype-builtins */

let o = {};
o.x = 1;
let p = Object.create(o);
p.y = 2;
let q = Object.create(p);
q.z = 3;

// ` o` が `p` および `q` のプロトタイプチェーン上に存在する
console.log(o.isPrototypeOf(p)); // true
console.log(o.isPrototypeOf(q)); // true
// `p` が `q` のプロトタイプチェーン上に存在する
console.log(p.isPrototypeOf(q)); // true

// `Object`, `Array`, `Date`, `Map` はすべてObject.prototypeからプロパティを継承している
console.log(Object.prototype.isPrototypeOf(new Object())); // true

console.log(Object.prototype.isPrototypeOf(new Array())); // true
console.log(Array.prototype.isPrototypeOf(new Array())); // true

console.log(Object.prototype.isPrototypeOf(new Date())); // true
console.log(Object.prototype.isPrototypeOf(new Date())); // true

console.log(Object.prototype.isPrototypeOf(new Map())); // true
console.log(Map.prototype.isPrototypeOf(new Map())); // true
