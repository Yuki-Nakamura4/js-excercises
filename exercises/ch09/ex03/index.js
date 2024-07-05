export class C {
  #x = 42;

  getX() {
    return this.#x;
  }
}

export class C2 {
  constructor() {
    const x = 42;

    this.getX = function () {
      return x;
    };
  }
}
