function greet(name) {
  console.log(`Hello, ${name}!`);
}

class Person {
  constructor(name) {
    this.name = name;
  }

  introduce() {
    console.log(`My name is ${this.name}.`);
  }
}

module.exports = {
  greet,
  Person,
};
