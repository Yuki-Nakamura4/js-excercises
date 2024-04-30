"use strict"

const obj = { x: 10 };

with (obj) {
  console.log(x); //strict モードではエラーが発生する
}

// Uncaught SyntaxError: strict mode code may not contain 'with' statements