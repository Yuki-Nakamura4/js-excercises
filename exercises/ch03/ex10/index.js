const myObject = {
  name: "Yuki",
  age: 23,
  city: "Yokohama",
};

// プロパティ名の一覧を出力
console.log("プロパティ名の一覧:");
for (let key in myObject) {
  console.log(key);
}

// 値の一覧を出力
console.log("\n値の一覧:");
for (let key in myObject) {
  console.log(myObject[key]);
}
