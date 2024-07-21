export class TypeMap {
  constructor() {
    this.map = new Map();
  }

  set(key, value) {
    if (typeof key !== "function") {
      throw new Error("Key must be a constructor function");
    }

    const isInstance = value instanceof key;
    const isValidPrimitive = this.isValidPrimitive(key, value);

    if (!isInstance && !isValidPrimitive) {
      throw new Error(
        "Value must be an instance of the provided constructor function"
      );
    }

    this.map.set(key, value);
  }

  get(key) {
    if (typeof key !== "function") {
      throw new Error("Key must be a constructor function");
    }

    return this.map.get(key);
  }

  isValidPrimitive(constructor, value) {
    const types = {
      String: "string",
      Number: "number",
      Boolean: "boolean",
    };
    return typeof value === types[constructor.name];
  }
}
