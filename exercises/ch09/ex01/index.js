export class C {
  constructor() {
    this.C = class {
      static method() {
        return 5;
      }
      method() {
        return 6;
      }
    };
  }

  static method() {
    return 1;
  }

  method() {
    return 2;
  }
}

C.C = class {
  static method() {
    return 3;
  }
  method() {
    return 4;
  }
};
