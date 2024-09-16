// 合成可能なダイアクリティカルマークを無視する正規表現パターンクラス
export class IgnoreAccentPattern {
  // 正規表現パターンを受け取り、インスタンスを生成する
  constructor(pattern) {
    // 正規表現の場合は、sourceを正規化した後にsourceとflags を使って新しい正規表現を生成する
    if (pattern instanceof RegExp) {
      this.originalPattern = pattern;
      this.normalizedPattern = new RegExp(
        this.normalizeString(pattern.source), // sourceを正規化した文字列に変換
        pattern.flags // フラグはそのままコピー
      );
      // 文字列の場合は、正規化した文字列を保持する
    } else {
      this.originalPattern = pattern;
      this.normalizedPattern = this.normalizeString(pattern);
    }
  }

  // 文字列を正規化し、ダイアクリティカルマークを除去する
  normalizeString(str) {
    // NFD正規化を使って文字列を分解し、
    // ダイアクリティカルマークの部分のみを削除する
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }

  // searchメソッドをオーバーライド
  [Symbol.search](str) {
    const normalizedStr = this.normalizeString(str);
    return normalizedStr.search(this.normalizedPattern);
  }

  // matchメソッドをオーバーライド
  [Symbol.match](str) {
    const normalizedStr = this.normalizeString(str);
    return normalizedStr.match(this.normalizedPattern);
  }
}
