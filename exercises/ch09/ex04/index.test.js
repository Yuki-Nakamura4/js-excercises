import { Warrior, MagicWarrior, Warrior2, MagicWarrior2 } from "./index";

describe("Warrior", () => {
  test("attack() returns correct damage", () => {
    const warrior = new Warrior(10);
    expect(warrior.attack()).toBe(20);
  });
});

describe("MagicWarrior", () => {
  test("attack() returns correct damage", () => {
    const magicWarrior = new MagicWarrior(10, 5);
    expect(magicWarrior.attack()).toBe(25);
  });
});

describe("Warrior2", () => {
  test("attack() returns correct damage", () => {
    const warrior2 = new Warrior2(10);
    expect(warrior2.attack()).toBe(20);
  });
});

describe("MagicWarrior2", () => {
  test("attack() returns correct damage", () => {
    const magicWarrior2 = new MagicWarrior2(10, 5);
    expect(magicWarrior2.attack()).toBe(25);
  });
});
