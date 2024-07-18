/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./exercises/ch10/ex01/index.cjs":
/*!***************************************!*\
  !*** ./exercises/ch10/ex01/index.cjs ***!
  \***************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("const stats = __webpack_require__(/*! ./stats.cjs */ \"./exercises/ch10/ex01/stats.cjs\");\r\nconst BitSet = (__webpack_require__(/*! ./sets.cjs */ \"./exercises/ch10/ex01/sets.cjs\").BitSet);\r\n\r\nlet s = new BitSet(100);\r\ns.insert(10);\r\ns.insert(20);\r\ns.insert(30);\r\nlet average = stats.mean([...s]); // average is 20\n\n//# sourceURL=webpack:///./exercises/ch10/ex01/index.cjs?");

/***/ }),

/***/ "./exercises/ch10/ex01/sets.cjs":
/*!**************************************!*\
  !*** ./exercises/ch10/ex01/sets.cjs ***!
  \**************************************/
/***/ ((module) => {

eval("class AbstractSet {\r\n    has(x) { throw new Error(\"Abstract method\"); }\r\n}\r\n\r\n\r\nclass NotSet extends AbstractSet {\r\n    constructor(set) {\r\n        super();\r\n        this.set = set;\r\n    }\r\n\r\n    has(x) { return !this.set.has(x); }\r\n    toString() { return `{ x| x ∉ ${this.set.toString()} }`; }\r\n}\r\n\r\n\r\nclass RangeSet extends AbstractSet {\r\n    constructor(from, to) {\r\n        super();\r\n        this.from = from;\r\n        this.to = to;\r\n    }\r\n\r\n    has(x) { return x >= this.from && x <= this.to; }\r\n    toString() { return `{ x| ${this.from} ≤ x ≤ ${this.to} }`; }\r\n}\r\n\r\n\r\nclass AbstractEnumerableSet extends AbstractSet {\r\n    get size() { throw new Error(\"Abstract method\"); }\r\n    [Symbol.iterator]() { throw new Error(\"Abstract method\"); }\r\n\r\n    isEmpty() { return this.size === 0; }\r\n    toString() { return `{${Array.from(this).join(\", \")}}`; }\r\n    equals(set) {\r\n        if (!(set instanceof AbstractEnumerableSet)) return false;\r\n\r\n        if (this.size !== set.size) return false;\r\n\r\n        for(let element of this) {\r\n            if (!set.has(element)) return false;\r\n        }\r\n\r\n        return true;\r\n    }\r\n}\r\n\r\nclass SingletonSet extends AbstractEnumerableSet {\r\n    constructor(member) {\r\n        super();\r\n        this.member = member;\r\n    }\r\n\r\n    has(x) { return x === this.member; }\r\n    get size() { return 1; }\r\n    *[Symbol.iterator]() { yield this.member; }\r\n}\r\n\r\n\r\nclass AbstractWritableSet extends  AbstractEnumerableSet {\r\n    insert(x) { throw new Error(\"Abstract method\"); }\r\n    remove(x) { throw new Error(\"Abstract method\"); }\r\n\r\n    add(set) {\r\n        for(let element of set) {\r\n            this.insert(element);\r\n        }\r\n    }\r\n\r\n    subtract(set) {\r\n        for(let element of set) {\r\n            this.remove(element);\r\n        }\r\n    }\r\n\r\n    intersect(set) {\r\n        for(let element of this) {\r\n            if (!set.has(element)) {\r\n                this.remove(element);\r\n            }\r\n        }\r\n    }\r\n}\r\n\r\nclass BitSet extends AbstractWritableSet {\r\n    constructor(max) {\r\n        super();\r\n        this.max = max;  // The maximum integer we can store.\r\n        this.n = 0;      // How many integers are in the set\r\n        this.numBytes = Math.floor(max / 8) + 1;   // How many bytes we need\r\n        this.data = new Uint8Array(this.numBytes); // The bytes\r\n    }\r\n\r\n    _valid(x) { return Number.isInteger(x) && x >= 0 && x <= this.max; }\r\n\r\n    _has(byte, bit) { return (this.data[byte] & BitSet.bits[bit]) !== 0; }\r\n\r\n    has(x) {\r\n        if (this._valid(x)) {\r\n            let byte = Math.floor(x / 8);\r\n            let bit = x % 8;\r\n            return this._has(byte, bit);\r\n        } else {\r\n            return false;\r\n        }\r\n    }\r\n\r\n    insert(x) {\r\n        if (this._valid(x)) {               // If the value is valid\r\n            let byte = Math.floor(x / 8);   // convert to byte and bit\r\n            let bit = x % 8;\r\n            if (!this._has(byte, bit)) {    // If that bit is not set yet\r\n                this.data[byte] |= BitSet.bits[bit]; // then set it\r\n                this.n++;                            // and increment set size\r\n            }\r\n        } else {\r\n            throw new TypeError(\"Invalid set element: \" + x );\r\n        }\r\n    }\r\n\r\n    remove(x) {\r\n        if (this._valid(x)) {              // If the value is valid\r\n            let byte = Math.floor(x / 8);  // compute the byte and bit\r\n            let bit = x % 8;\r\n            if (this._has(byte, bit)) {    // If that bit is already set\r\n                this.data[byte] &= BitSet.masks[bit];  // then unset it\r\n                this.n--;                              // and decrement size\r\n            }\r\n        } else {\r\n            throw new TypeError(\"Invalid set element: \" + x );\r\n        }\r\n    }\r\n\r\n    get size() { return this.n; }\r\n\r\n    *[Symbol.iterator]() {\r\n        for(let i = 0; i <= this.max; i++) {\r\n            if (this.has(i)) {\r\n                yield i;\r\n            }\r\n        }\r\n    }\r\n}\r\n\r\nBitSet.bits = new Uint8Array([1, 2, 4, 8, 16, 32, 64, 128]);\r\nBitSet.masks = new Uint8Array([~1, ~2, ~4, ~8, ~16, ~32, ~64, ~128])\r\n\r\nmodule.exports.BitSet = BitSet;\n\n//# sourceURL=webpack:///./exercises/ch10/ex01/sets.cjs?");

/***/ }),

/***/ "./exercises/ch10/ex01/stats.cjs":
/*!***************************************!*\
  !*** ./exercises/ch10/ex01/stats.cjs ***!
  \***************************************/
/***/ ((module) => {

eval("class AbstractSet {\r\n    has(x) { throw new Error(\"Abstract method\"); }\r\n}\r\n\r\n\r\nclass NotSet extends AbstractSet {\r\n    constructor(set) {\r\n        super();\r\n        this.set = set;\r\n    }\r\n\r\n    has(x) { return !this.set.has(x); }\r\n    toString() { return `{ x| x ∉ ${this.set.toString()} }`; }\r\n}\r\n\r\n\r\nclass RangeSet extends AbstractSet {\r\n    constructor(from, to) {\r\n        super();\r\n        this.from = from;\r\n        this.to = to;\r\n    }\r\n\r\n    has(x) { return x >= this.from && x <= this.to; }\r\n    toString() { return `{ x| ${this.from} ≤ x ≤ ${this.to} }`; }\r\n}\r\n\r\n\r\nclass AbstractEnumerableSet extends AbstractSet {\r\n    get size() { throw new Error(\"Abstract method\"); }\r\n    [Symbol.iterator]() { throw new Error(\"Abstract method\"); }\r\n\r\n    isEmpty() { return this.size === 0; }\r\n    toString() { return `{${Array.from(this).join(\", \")}}`; }\r\n    equals(set) {\r\n        if (!(set instanceof AbstractEnumerableSet)) return false;\r\n\r\n        if (this.size !== set.size) return false;\r\n\r\n        for(let element of this) {\r\n            if (!set.has(element)) return false;\r\n        }\r\n\r\n        return true;\r\n    }\r\n}\r\n\r\nclass SingletonSet extends AbstractEnumerableSet {\r\n    constructor(member) {\r\n        super();\r\n        this.member = member;\r\n    }\r\n\r\n    has(x) { return x === this.member; }\r\n    get size() { return 1; }\r\n    *[Symbol.iterator]() { yield this.member; }\r\n}\r\n\r\n\r\nclass AbstractWritableSet extends  AbstractEnumerableSet {\r\n    insert(x) { throw new Error(\"Abstract method\"); }\r\n    remove(x) { throw new Error(\"Abstract method\"); }\r\n\r\n    add(set) {\r\n        for(let element of set) {\r\n            this.insert(element);\r\n        }\r\n    }\r\n\r\n    subtract(set) {\r\n        for(let element of set) {\r\n            this.remove(element);\r\n        }\r\n    }\r\n\r\n    intersect(set) {\r\n        for(let element of this) {\r\n            if (!set.has(element)) {\r\n                this.remove(element);\r\n            }\r\n        }\r\n    }\r\n}\r\n\r\n\r\nmodule.exports = class BitSet extends AbstractWritableSet {\r\n    constructor(max) {\r\n        super();\r\n        this.max = max;  // The maximum integer we can store.\r\n        this.n = 0;      // How many integers are in the set\r\n        this.numBytes = Math.floor(max / 8) + 1;   // How many bytes we need\r\n        this.data = new Uint8Array(this.numBytes); // The bytes\r\n    }\r\n\r\n    _valid(x) { return Number.isInteger(x) && x >= 0 && x <= this.max; }\r\n\r\n    _has(byte, bit) { return (this.data[byte] & BitSet.bits[bit]) !== 0; }\r\n\r\n    has(x) {\r\n        if (this._valid(x)) {\r\n            let byte = Math.floor(x / 8);\r\n            let bit = x % 8;\r\n            return this._has(byte, bit);\r\n        } else {\r\n            return false;\r\n        }\r\n    }\r\n\r\n    insert(x) {\r\n        if (this._valid(x)) {               // If the value is valid\r\n            let byte = Math.floor(x / 8);   // convert to byte and bit\r\n            let bit = x % 8;\r\n            if (!this._has(byte, bit)) {    // If that bit is not set yet\r\n                this.data[byte] |= BitSet.bits[bit]; // then set it\r\n                this.n++;                            // and increment set size\r\n            }\r\n        } else {\r\n            throw new TypeError(\"Invalid set element: \" + x );\r\n        }\r\n    }\r\n\r\n    remove(x) {\r\n        if (this._valid(x)) {              // If the value is valid\r\n            let byte = Math.floor(x / 8);  // compute the byte and bit\r\n            let bit = x % 8;\r\n            if (this._has(byte, bit)) {    // If that bit is already set\r\n                this.data[byte] &= BitSet.masks[bit];  // then unset it\r\n                this.n--;                              // and decrement size\r\n            }\r\n        } else {\r\n            throw new TypeError(\"Invalid set element: \" + x );\r\n        }\r\n    }\r\n\r\n    get size() { return this.n; }\r\n\r\n    *[Symbol.iterator]() {\r\n        for(let i = 0; i <= this.max; i++) {\r\n            if (this.has(i)) {\r\n                yield i;\r\n            }\r\n        }\r\n    }\r\n}\r\n\r\nBitSet.bits = new Uint8Array([1, 2, 4, 8, 16, 32, 64, 128]);\r\nBitSet.masks = new Uint8Array([~1, ~2, ~4, ~8, ~16, ~32, ~64, ~128])\n\n//# sourceURL=webpack:///./exercises/ch10/ex01/stats.cjs?");

/***/ })

/******/ 	});
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
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./exercises/ch10/ex01/index.cjs");
/******/ 	
/******/ })()
;