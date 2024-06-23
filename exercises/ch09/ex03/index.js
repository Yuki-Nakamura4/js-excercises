/* eslint-disable */

export class C {
  #x = 42; // ESLintに怒られる？ 設定でes2022はtrueになってるはず

  getX() {
    return this.#x;
  }
}

export class C2 {
  constructor() {
    let x = 42;

    this.getX = function () {
      return x;
    };
  }
}
