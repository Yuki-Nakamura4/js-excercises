// フィボナッチ数を生成するジェネレータ関数
function* fibonacciSequence() {
  // 直前の2つの数を保持する変数
  let x = 0,
    y = 1;
  for (;;) {
    yield y;
    [x, y] = [y, x + y];
  }
}

// n番目のフィボナッチ数を返す関数
function fibonacci(n) {
  for (const f of fibonacciSequence()) {
    if (n-- <= 0) return f;
  }
}

console.log(fibonacci(20)); // => 10946

// 指定した反復可能オブジェクトの最初のn個の要素を返す関数
function* take(n, iterable) {
  const it = iterable[Symbol.iterator]();
  while (n-- > 0) {
    const next = it.next();
    if (next.done) return;
    else yield next.value;
  }
}

console.log([...take(5, fibonacciSequence())]); // => [1, 1, 2, 3, 5]
