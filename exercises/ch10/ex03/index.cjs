const { greet, Person } = require("./myModule.js");

// インポートした関数を実行
greet("Alice");

// インポートしたクラスをインスタンス化
const john = new Person("John");
john.introduce();
