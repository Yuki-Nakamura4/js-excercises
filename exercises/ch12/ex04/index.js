// 本来のエラトステネスの篩は固定の範囲内で素数を計算するものだが、
// 今回は遅延評価を行うため、無限の素数を生成するジェネレータを作成する
export function* primeGenerator() {
  const primes = [];
  let num = 2; // 素数の開始値

  while (true) {
    let isPrime = true;
    for (const prime of primes) {
      // numの平方根より大きな素数で割る必要がない
      // numの平方根より大きい約数があるときは、それと対になるnumの平方根より小さい約数も存在するため
      if (prime * prime > num) break;

      // 素因数が見つかったら素数ではない
      if (num % prime === 0) {
        isPrime = false;
        break;
      }
    }

    // 素数であれば素数リストに追加してyieldする
    if (isPrime) {
      primes.push(num);
      yield num;
    }

    num++;
  }
}
