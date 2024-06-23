// 複数行を受け取るテストが通らない
export function f(body) {
  return Function(
    "$1, $2, $3, $4, $5, $6, $7, $8, $9, $10",
    "return " + body.replace(/\$(\d+)/g, (_, num) => "$" + num)
  );
}
