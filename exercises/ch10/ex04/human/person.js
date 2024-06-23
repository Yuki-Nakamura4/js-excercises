// 名前付きエクスポート
export class Person {
  constructor(name) {
    this.name = name;
  }

  introduce() {
    console.log(`My name is ${this.name}.`);
  }
}
