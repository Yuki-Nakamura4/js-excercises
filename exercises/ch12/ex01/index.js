import { counterIter, counterGen } from "./iterable.js";

// イテレータを作成
const itr = counterIter(3);

// 明示的にメソッドを呼ぶと、valueとdoneプロパティを持つ反復結果オブジェクトが返る。
console.log(itr.next()); // => { value: 1, done: false }

// 間接的にメソッドを呼ぶと、valueプロパティの値だけが返る。
for (const c of itr) {
  console.log(c); // => 2, 3
}
console.log(itr.next()); // => { value: undefined, done: true }

// イテレーションを途中で終了させると、イテレータのreturn()メソッドが呼ばれる。
console.log("======== call return() ========");
const itr2 = counterIter(3);
for (const c of itr2) {
  console.log(c); // => 1
  break;
}

console.log("======== generator ========");
// ジェネレータを作成
const gen = counterGen(3); // => counterGen

// ジェネレータ関数によって生成されたオブジェクトがイテレータインターフェースを満たしていることを確認する。
console.log(typeof gen.next === "function"); // => true
console.log(typeof gen.return === "function"); // => true
console.log(typeof gen.throw === "function"); // => true
console.log(typeof gen[Symbol.iterator] === "function"); // => true

console.log(gen.next()); // => counterGen: next { value: 1, done: false }

console.log(gen.next()); // => counterGen: next { value: 2, done: false }
console.log(gen.next()); // => counterGen: next { value: 3, done: false }
console.log(gen.next()); // => counterGen: finally { value: undefined, done: true }
