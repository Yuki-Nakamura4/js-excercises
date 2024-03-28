class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  add(otherPoint) {
    // 引数として渡されたPointインスタンスの座標を自分の座標に加算する
    this.x += otherPoint.x;
    this.y += otherPoint.y;
  }
}
