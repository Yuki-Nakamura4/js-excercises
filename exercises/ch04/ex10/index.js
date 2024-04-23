const array = ["r", "i", "c", "o", "h"];

console.log(array); // 削除前: ["r", "i", "c", "o", "h"]
console.log(array.length); // 5

delete array[3];

console.log(array); // 削除後: ["r", "i", "c", なし, "h"]
console.log(array.length); // 5

// 要素は削除されていたが、配列の長さは変わらなかった
