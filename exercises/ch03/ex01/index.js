// 正負の Infinity と NaN の組み合わせで計算を行う関数
function performCalculations() {
  const values = [Infinity, -Infinity, NaN];

  for (let value1 of values) {
    for (let value2 of values) {
      console.log(`Calculations for ${value1} and ${value2}:`);
      console.log(`+ : ${value1 + value2}`);
      console.log(`- : ${value1 - value2}`);
      console.log(`* : ${value1 * value2}`);
      console.log(`/ : ${value1 / value2}`);
      console.log();
    }
  }
}

performCalculations();
