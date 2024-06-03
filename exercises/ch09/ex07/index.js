// 振る舞い（Behavior）の定義
const EatingBehavior = {
  eat() {
    console.log("Eating...");
  },
};

const BarkingBehavior = {
  makeSound() {
    console.log("Barking...");
  },
};

const MeowingBehavior = {
  makeSound() {
    console.log("Meowing...");
  },
};

const ChirpingBehavior = {
  makeSound() {
    console.log("Chirping...");
  },
};

const FlyingBehavior = {
  fly() {
    console.log("Flying...");
  },
};

const SwimmingBehavior = {
  swim() {
    console.log("Swimming...");
  },
};

// 動物クラスの定義
class Animal {
  constructor(eatingBehavior) {
    this.eatingBehavior = eatingBehavior;
  }

  eat() {
    this.eatingBehavior.eat();
  }
}

// それぞれの動物クラスの定義
class Dog extends Animal {
  constructor(eatingBehavior, soundBehavior) {
    super(eatingBehavior);
    this.soundBehavior = soundBehavior;
  }

  makeSound() {
    this.soundBehavior.makeSound();
  }
}

class Cat extends Animal {
  constructor(eatingBehavior, soundBehavior) {
    super(eatingBehavior);
    this.soundBehavior = soundBehavior;
  }

  makeSound() {
    this.soundBehavior.makeSound();
  }
}

class Bird extends Animal {
  constructor(eatingBehavior, soundBehavior, flyingBehavior) {
    super(eatingBehavior);
    this.soundBehavior = soundBehavior;
    this.flyingBehavior = flyingBehavior;
  }

  makeSound() {
    this.soundBehavior.makeSound();
  }

  fly() {
    this.flyingBehavior.fly();
  }
}

class Fish extends Animal {
  constructor(eatingBehavior, swimmingBehavior) {
    super(eatingBehavior);
    this.swimmingBehavior = swimmingBehavior;
  }

  swim() {
    this.swimmingBehavior.swim();
  }
}

// インスタンスの生成
const dog = new Dog(EatingBehavior, BarkingBehavior);
const cat = new Cat(EatingBehavior, MeowingBehavior);
const bird = new Bird(EatingBehavior, ChirpingBehavior, FlyingBehavior);
const fish = new Fish(EatingBehavior, SwimmingBehavior);

// メソッドの実行
dog.eat(); // Eating...
dog.makeSound(); // Barking...

cat.eat(); // Eating...
cat.makeSound(); // Meowing...

bird.eat(); // Eating...
bird.makeSound(); // Chirping...
bird.fly(); // Flying...

fish.eat(); // Eating...
fish.swim(); // Swimming...
