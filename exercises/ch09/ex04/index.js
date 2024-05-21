// 戦士クラス
export class Warrior {
  constructor(atk) {
    this.atk = atk;
  }

  attack() {
    return this.atk * 2;
  }
}

// 魔法戦士クラス
export class MagicWarrior extends Warrior {
  constructor(atk, mgc) {
    super(atk);
    this.mgc = mgc;
  }

  attack() {
    return super.attack() + this.mgc;
  }
}
// 戦士クラス
export function Warrior2(atk) {
  this.atk = atk;
}

Warrior2.prototype.attack = function () {
  return this.atk * 2;
};

// 魔法戦士クラス
export function MagicWarrior2(atk, mgc) {
  Warrior2.call(this, atk);
  this.mgc = mgc;
}

Object.setPrototypeOf(MagicWarrior2.prototype, Warrior2.prototype);

MagicWarrior2.prototype.attack = function () {
  return Warrior2.prototype.attack.call(this) + this.mgc;
};
