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

  // 静的メソッド。クラスから直接呼び出す
  static method() {
    return 1;
  }

  // インスタンスメソッド。インスタンスから呼び出す
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
