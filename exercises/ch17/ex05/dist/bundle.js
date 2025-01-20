/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./grid.js":
/*!*****************!*\
  !*** ./grid.js ***!
  \*****************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   COLS: () => (/* binding */ COLS),\n/* harmony export */   RESOLUTION: () => (/* binding */ RESOLUTION),\n/* harmony export */   ROWS: () => (/* binding */ ROWS),\n/* harmony export */   renderGrid: () => (/* binding */ renderGrid),\n/* harmony export */   updateGrid: () => (/* binding */ updateGrid)\n/* harmony export */ });\nconst ROWS = 50;\nconst COLS = 50;\nconst RESOLUTION = 10;\n\n// grid を canvas に描画する\nfunction renderGrid(grid, ctx) {\n  for (let row = 0; row < ROWS; row++) {\n    for (let col = 0; col < COLS; col++) {\n      const cell = grid[row][col];\n      ctx.beginPath();\n      ctx.rect(col * RESOLUTION, row * RESOLUTION, RESOLUTION, RESOLUTION);\n      ctx.fillStyle = cell ? \"black\" : \"white\";\n      ctx.fill();\n      ctx.stroke();\n    }\n  }\n}\n\n// Life Game のルールに従ってセルを更新する\nfunction updateGrid(grid) {\n  // 新しいグリッドを作成\n  const nextGrid = grid.map(arr => [...arr]);\n  for (let row = 0; row < ROWS; row++) {\n    for (let col = 0; col < COLS; col++) {\n      // 周囲のセルの生存数を数えて nextGrid[row][col] に true or false を設定する\n      let liveNeighbors = 0;\n      for (let i = -1; i <= 1; i++) {\n        for (let j = -1; j <= 1; j++) {\n          if (i === 0 && j === 0) {\n            continue;\n          }\n          const newRow = row + i;\n          const newCol = col + j;\n          if (newRow >= 0 && newRow < ROWS && newCol >= 0 && newCol < COLS) {\n            liveNeighbors += grid[newRow][newCol] ? 1 : 0;\n          }\n        }\n      }\n      if (grid[row][col]) {\n        // 生きているセル\n        if (liveNeighbors < 2 || liveNeighbors > 3) {\n          // 2個未満なら過疎、3個より多ければ過密で死亡\n          nextGrid[row][col] = false;\n        }\n      } else {\n        // 死んでいるセル\n        if (liveNeighbors === 3) {\n          // ちょうど3つの生きているセルが隣接していれば再生\n          nextGrid[row][col] = true;\n        }\n      }\n    }\n  }\n  return nextGrid;\n}\n\n//# sourceURL=webpack:///./grid.js?");

/***/ }),

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _grid_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./grid.js */ \"./grid.js\");\n\nconst canvas = document.querySelector(\"#screen\");\nconst ctx = canvas.getContext(\"2d\");\nconst startButton = document.querySelector(\"#start\");\nconst pauseButton = document.querySelector(\"#pause\");\ncanvas.width = _grid_js__WEBPACK_IMPORTED_MODULE_0__.ROWS * _grid_js__WEBPACK_IMPORTED_MODULE_0__.RESOLUTION;\ncanvas.height = _grid_js__WEBPACK_IMPORTED_MODULE_0__.COLS * _grid_js__WEBPACK_IMPORTED_MODULE_0__.RESOLUTION;\n\n// https://developer.mozilla.org/ja/docs/Web/API/Window/requestAnimationFrame が返す ID\nlet animationId = null;\n\n// NOTE: download from https://soundeffect-lab.info/sound/button/mp3/decision1.mp3\nconst sound = new Audio(\"/ch15.04-10/ex10/decision1.mp3\");\n\n// ライフゲームのセル (true or false) をランダムに初期化する\nlet grid = new Array(_grid_js__WEBPACK_IMPORTED_MODULE_0__.ROWS).fill(null).map(() => new Array(_grid_js__WEBPACK_IMPORTED_MODULE_0__.COLS).fill(null).map(() => !!Math.floor(Math.random() * 2)));\n\n// canvas がクリックされたときの処理 (セルの値を反転する)\ncanvas.addEventListener(\"click\", function (evt) {\n  const rect = canvas.getBoundingClientRect();\n  const pos = {\n    x: evt.clientX - rect.left,\n    y: evt.clientY - rect.top\n  };\n  const row = Math.floor(pos.y / _grid_js__WEBPACK_IMPORTED_MODULE_0__.RESOLUTION);\n  const col = Math.floor(pos.x / _grid_js__WEBPACK_IMPORTED_MODULE_0__.RESOLUTION);\n  grid[row][col] = !grid[row][col];\n  sound.cloneNode().play();\n  (0,_grid_js__WEBPACK_IMPORTED_MODULE_0__.renderGrid)(grid, ctx);\n});\n\n// requestAnimationFrame によって一定間隔で更新・描画を行う\n// NOTE: リフレッシュレートの高い画面では速く実行される (これを防ぐ場合は下記の例を参照)\n// https://developer.mozilla.org/ja/docs/Web/API/Window/requestAnimationFrame\nfunction update() {\n  grid = (0,_grid_js__WEBPACK_IMPORTED_MODULE_0__.updateGrid)(grid);\n  (0,_grid_js__WEBPACK_IMPORTED_MODULE_0__.renderGrid)(grid, ctx);\n  animationId = requestAnimationFrame(update);\n}\nstartButton.addEventListener(\"click\", () => {\n  // 既にアニメーションが動いている場合は何もしない\n  if (animationId) {\n    return;\n  }\n  update();\n});\npauseButton.addEventListener(\"click\", () => {\n  // アニメーションが停止している場合は何もしない\n  if (!animationId) {\n    return;\n  }\n  cancelAnimationFrame(animationId);\n  animationId = null;\n});\n(0,_grid_js__WEBPACK_IMPORTED_MODULE_0__.renderGrid)(grid, ctx);\n\n//# sourceURL=webpack:///./index.js?");

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
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./index.js");
/******/ 	
/******/ })()
;