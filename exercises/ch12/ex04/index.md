## エラトステネスの篩

指定された整数以下の全ての素数を発見するためのアルゴリズム

```javascript
function findPrimesUpToX(x) {
  // ステップ 1: 初期化
  const isPrime = new Array(x + 1).fill(true);
  isPrime[0] = false;
  isPrime[1] = false;
  const primes = [];

  // ステップ 2 & 3: 素数を見つけ、その倍数を篩い落とす
  for (let p = 2; p <= Math.sqrt(x); p++) {
    if (isPrime[p]) {
      // pが素数の場合、素数リストに追加
      primes.push(p);
      // pの2乗から開始し、xまでのpの倍数をfalseに設定
      // pの2乗から開始するのは、それより小さい倍数はすでに篩い落とされているため
      for (let multiple = p * p; multiple <= x; multiple += p) {
        isPrime[multiple] = false;
      }
    }
  }

  // ステップ 4: 残りのtrueの要素の添字を素数リストに追加
  for (let p = Math.ceil(Math.sqrt(x)) + 1; p <= x; p++) {
    if (isPrime[p]) {
      primes.push(p);
    }
  }

  return primes;
}
```
