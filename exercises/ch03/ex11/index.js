// 同じ文字列から生成された2つのSymbol変数を作成
const symbol1 = Symbol("mySymbol");
const symbol2 = Symbol("mySymbol");

// オブジェクトを作成し、Symbolをプロパティとして持たせる
const obj = {
  [symbol1]: "dog",
  [symbol2]: "cat",
};

// シンボルを使ってプロパティの値を取得
console.log(obj[symbol1]); // "dog"
console.log(obj[symbol2]); // "cat"

// Symbol.forで同じ名前のSymbolを作成
const symbol3 = Symbol.for("sharedSymbol");
const symbol4 = Symbol.for("sharedSymbol");

// オブジェクトを作成し、Symbolをプロパティとして持たせる
const obj2 = {
  [symbol3]: "dog",
  [symbol4]: "cat", // 同じ名前のSymbolがすでに存在するため、symbol3の値が上書きされる
};

// シンボルを使ってプロパティの値を取得
console.log(obj2[symbol3]); // "cat"
console.log(obj2[symbol4]); // "cat"
