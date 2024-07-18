/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((module) => {

class AbstractSet {
    has(x) { throw new Error("Abstract method"); }
}


class NotSet extends AbstractSet {
    constructor(set) {
        super();
        this.set = set;
    }

    has(x) { return !this.set.has(x); }
    toString() { return `{ x| x ∉ ${this.set.toString()} }`; }
}


class RangeSet extends AbstractSet {
    constructor(from, to) {
        super();
        this.from = from;
        this.to = to;
    }

    has(x) { return x >= this.from && x <= this.to; }
    toString() { return `{ x| ${this.from} ≤ x ≤ ${this.to} }`; }
}


class AbstractEnumerableSet extends AbstractSet {
    get size() { throw new Error("Abstract method"); }
    [Symbol.iterator]() { throw new Error("Abstract method"); }

    isEmpty() { return this.size === 0; }
    toString() { return `{${Array.from(this).join(", ")}}`; }
    equals(set) {
        if (!(set instanceof AbstractEnumerableSet)) return false;

        if (this.size !== set.size) return false;

        for(let element of this) {
            if (!set.has(element)) return false;
        }

        return true;
    }
}

class SingletonSet extends AbstractEnumerableSet {
    constructor(member) {
        super();
        this.member = member;
    }

    has(x) { return x === this.member; }
    get size() { return 1; }
    *[Symbol.iterator]() { yield this.member; }
}


class AbstractWritableSet extends  AbstractEnumerableSet {
    insert(x) { throw new Error("Abstract method"); }
    remove(x) { throw new Error("Abstract method"); }

    add(set) {
        for(let element of set) {
            this.insert(element);
        }
    }

    subtract(set) {
        for(let element of set) {
            this.remove(element);
        }
    }

    intersect(set) {
        for(let element of this) {
            if (!set.has(element)) {
                this.remove(element);
            }
        }
    }
}


module.exports = class BitSet extends AbstractWritableSet {
    constructor(max) {
        super();
        this.max = max;  // The maximum integer we can store.
        this.n = 0;      // How many integers are in the set
        this.numBytes = Math.floor(max / 8) + 1;   // How many bytes we need
        this.data = new Uint8Array(this.numBytes); // The bytes
    }

    _valid(x) { return Number.isInteger(x) && x >= 0 && x <= this.max; }

    _has(byte, bit) { return (this.data[byte] & BitSet.bits[bit]) !== 0; }

    has(x) {
        if (this._valid(x)) {
            let byte = Math.floor(x / 8);
            let bit = x % 8;
            return this._has(byte, bit);
        } else {
            return false;
        }
    }

    insert(x) {
        if (this._valid(x)) {               // If the value is valid
            let byte = Math.floor(x / 8);   // convert to byte and bit
            let bit = x % 8;
            if (!this._has(byte, bit)) {    // If that bit is not set yet
                this.data[byte] |= BitSet.bits[bit]; // then set it
                this.n++;                            // and increment set size
            }
        } else {
            throw new TypeError("Invalid set element: " + x );
        }
    }

    remove(x) {
        if (this._valid(x)) {              // If the value is valid
            let byte = Math.floor(x / 8);  // compute the byte and bit
            let bit = x % 8;
            if (this._has(byte, bit)) {    // If that bit is already set
                this.data[byte] &= BitSet.masks[bit];  // then unset it
                this.n--;                              // and decrement size
            }
        } else {
            throw new TypeError("Invalid set element: " + x );
        }
    }

    get size() { return this.n; }

    *[Symbol.iterator]() {
        for(let i = 0; i <= this.max; i++) {
            if (this.has(i)) {
                yield i;
            }
        }
    }
}

BitSet.bits = new Uint8Array([1, 2, 4, 8, 16, 32, 64, 128]);
BitSet.masks = new Uint8Array([~1, ~2, ~4, ~8, ~16, ~32, ~64, ~128])

/***/ }),
/* 2 */
/***/ ((module) => {

class AbstractSet {
    has(x) { throw new Error("Abstract method"); }
}


class NotSet extends AbstractSet {
    constructor(set) {
        super();
        this.set = set;
    }

    has(x) { return !this.set.has(x); }
    toString() { return `{ x| x ∉ ${this.set.toString()} }`; }
}


class RangeSet extends AbstractSet {
    constructor(from, to) {
        super();
        this.from = from;
        this.to = to;
    }

    has(x) { return x >= this.from && x <= this.to; }
    toString() { return `{ x| ${this.from} ≤ x ≤ ${this.to} }`; }
}


class AbstractEnumerableSet extends AbstractSet {
    get size() { throw new Error("Abstract method"); }
    [Symbol.iterator]() { throw new Error("Abstract method"); }

    isEmpty() { return this.size === 0; }
    toString() { return `{${Array.from(this).join(", ")}}`; }
    equals(set) {
        if (!(set instanceof AbstractEnumerableSet)) return false;

        if (this.size !== set.size) return false;

        for(let element of this) {
            if (!set.has(element)) return false;
        }

        return true;
    }
}

class SingletonSet extends AbstractEnumerableSet {
    constructor(member) {
        super();
        this.member = member;
    }

    has(x) { return x === this.member; }
    get size() { return 1; }
    *[Symbol.iterator]() { yield this.member; }
}


class AbstractWritableSet extends  AbstractEnumerableSet {
    insert(x) { throw new Error("Abstract method"); }
    remove(x) { throw new Error("Abstract method"); }

    add(set) {
        for(let element of set) {
            this.insert(element);
        }
    }

    subtract(set) {
        for(let element of set) {
            this.remove(element);
        }
    }

    intersect(set) {
        for(let element of this) {
            if (!set.has(element)) {
                this.remove(element);
            }
        }
    }
}

class BitSet extends AbstractWritableSet {
    constructor(max) {
        super();
        this.max = max;  // The maximum integer we can store.
        this.n = 0;      // How many integers are in the set
        this.numBytes = Math.floor(max / 8) + 1;   // How many bytes we need
        this.data = new Uint8Array(this.numBytes); // The bytes
    }

    _valid(x) { return Number.isInteger(x) && x >= 0 && x <= this.max; }

    _has(byte, bit) { return (this.data[byte] & BitSet.bits[bit]) !== 0; }

    has(x) {
        if (this._valid(x)) {
            let byte = Math.floor(x / 8);
            let bit = x % 8;
            return this._has(byte, bit);
        } else {
            return false;
        }
    }

    insert(x) {
        if (this._valid(x)) {               // If the value is valid
            let byte = Math.floor(x / 8);   // convert to byte and bit
            let bit = x % 8;
            if (!this._has(byte, bit)) {    // If that bit is not set yet
                this.data[byte] |= BitSet.bits[bit]; // then set it
                this.n++;                            // and increment set size
            }
        } else {
            throw new TypeError("Invalid set element: " + x );
        }
    }

    remove(x) {
        if (this._valid(x)) {              // If the value is valid
            let byte = Math.floor(x / 8);  // compute the byte and bit
            let bit = x % 8;
            if (this._has(byte, bit)) {    // If that bit is already set
                this.data[byte] &= BitSet.masks[bit];  // then unset it
                this.n--;                              // and decrement size
            }
        } else {
            throw new TypeError("Invalid set element: " + x );
        }
    }

    get size() { return this.n; }

    *[Symbol.iterator]() {
        for(let i = 0; i <= this.max; i++) {
            if (this.has(i)) {
                yield i;
            }
        }
    }
}

BitSet.bits = new Uint8Array([1, 2, 4, 8, 16, 32, 64, 128]);
BitSet.masks = new Uint8Array([~1, ~2, ~4, ~8, ~16, ~32, ~64, ~128])

module.exports.BitSet = BitSet;

/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
const stats = __webpack_require__(1);
const ex01_BitSet = (__webpack_require__(2).BitSet);

let s = new ex01_BitSet(100);
s.insert(10);
s.insert(20);
s.insert(30);
let average = stats.mean([...s]); // average is 20
/******/ })()
;