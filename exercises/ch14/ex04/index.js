export class Hiragana {
  constructor(char) {
    // ひらがな1文字でない場合はエラーを投げる
    if (!/^[\u3040-\u309F]$/.test(char)) {
      throw new Error("ひらがな1文字を入力してください");
    }
    this.char = char; // ひらがな1文字
    this.code = char.charCodeAt(0); // ひらがな1文字の文字コード
  }

  [Symbol.toPrimitive](hint) {
    if (hint === "number") {
      return this.code;
    } else {
      return this.char;
    }
  }
}
