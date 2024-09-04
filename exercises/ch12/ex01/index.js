import { counterIter, counterGen } from "./iterable.js";

console.log("======== iterator ========");
// イテレータを作成
const itr = counterIter(3); // => counterIter

// 明示的にメソッドを呼ぶと、valueとdoneプロパティを持つ反復結果オブジェクトが返る。
console.log(itr.next()); // => CounterIter: next { value: 1, done: false }

// 間接的にメソッドを呼ぶと、valueプロパティの値だけが返る。
for (const c of itr) {
  // => counterIter: Symbol.iterator => counterIter: next
  console.log(c); // => 2
}

// イテレーションが終了すると、valueプロパティがundefinedで、doneプロパティがtrueの反復結果オブジェクトが返る。
console.log(itr.next()); // => { value: undefined, done: true }

// イテレーションを途中で終了させると、イテレータのreturn()メソッドが呼ばれる。
console.log("==== call return ====");
const itr2 = counterIter(3);
for (const c of itr2) {
  console.log(c); // => 1
  break;
}

console.log("======== generator ========");
// ジェネレータを作成
const gen = counterGen(3); // => counterGen

// ジェネレータ関数によって生成されたオブジェクトがイテレータインターフェースを満たしていることを確認する。
// nextがあり、戻り値が反復結果オブジェクトであることを確認する。
console.log("==== next ====");
console.log(typeof gen.next === "function"); // => true
console.log(gen.next()); // => counterGen: next { value: 1, done: false }

// returnがあり、戻り値が反復結果オブジェクトであること、かつdoneプロパティがtrueであることを確認する。
console.log("==== return ====");
console.log(typeof gen.return === "function"); // => true
console.log(gen.return()); // => counterGen: finally { value: undefined, done: true }

// throwがあり、戻り値が反復結果オブジェクトであることを確認する。
console.log("==== throw ====");
console.log(typeof gen.throw === "function"); // => true
