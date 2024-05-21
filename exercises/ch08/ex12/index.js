export function f(body) {
  return Function(
    "$1, $2, $3, $4, $5, $6, $7, $8, $9, $10",
    "return " + body.replace(/\$(\d+)/g, (_, num) => "$" + num)
  );
}

const arr = [3, 1, 4, 1, 5, 9];
console.log(arr.reduce(f("$1 + $2"), 0)); // 23
console.log(arr.sort(f("$1 - $2"))); // [ 1, 1, 3, 4, 5, 9 ]
