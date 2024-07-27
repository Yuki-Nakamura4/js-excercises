// 名前変更を伴うインポート
import myGreet from "./human/greet.js"; // 別名でインポート
import { Person as myPerson } from "./human/person.js"; // エイリアスで別名を指定

// human.jsで再エクスポートしたものなら一行でインポートできる
// import { greetChanged as myGreet, Person as myPerson } from "./human.js";

console.log(myGreet("ALice")); // "Hello, Alice!"

const person = new myPerson("John");
person.introduce(); // "My name is John."
