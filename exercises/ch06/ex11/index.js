export const CoordinateConverter = {
  // 極座標 `r` と `theta` は読み書き可のデータプロパティ
  r: 2,
  theta: Math.PI / 3, // 60度

  // 上記設定よりx, yの初期値はそれぞれ1, √3

  // x, yはゲッターとセッターを持つ読み書き可のアクセサプロパティ
  get x() {
    return this.r * Math.cos(this.theta);
  },
  set x(value) {
    if (isNaN(value)) {
      throw new Error("Invalid value: NaN");
    }
    const theta = Math.atan2(this.y, value); // atan2 = 2つの引数をとるアークタンジェント
    this.r = Math.sqrt(value ** 2 + this.y ** 2);
    this.theta = theta;
  },

  get y() {
    return this.r * Math.sin(this.theta);
  },
  set y(value) {
    if (isNaN(value)) {
      throw new Error("Invalid value: NaN");
    }
    const theta = Math.atan2(value, this.x);
    this.r = Math.sqrt(this.x ** 2 + value ** 2);
    this.theta = theta;
  },
};
