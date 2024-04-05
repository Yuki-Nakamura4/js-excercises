// 途中で投げたので未解答

// export function eq(a, b) {
//   let aPrime = toPrimitive(a);
//   let bPrime = toPrimitive(b);

//   if (typeof a === 'object' && typeof b === 'object') {
//     return a === b;
//   }
//   if (typeof a === 'object' && typeof b === 'string' || typeof a === 'string' && typeof b === 'object') {
//     return a.toString() === b.toString();
//   }

//   if (aPrime === null && bPrime === undefined || aPrime === undefined && bPrime === null) {
//     return true;
//   }

//   if (typeof aPrime === 'string' && typeof bPrime === 'string') {
//     return aPrime === bPrime;
//   }

//   if (typeof aPrime === 'number' && typeof bPrime === 'string' || typeof aPrime === 'string' && typeof bPrime === 'number') {
//     const aNum = Number(aPrime);
//     const bNum = Number(bPrime);
//     return aNum === bNum;
//   }

//   if (typeof aPrime === 'number' && typeof bPrime === 'number') {
//     return aPrime === bPrime;
//   }

//   if (typeof aPrime === 'boolean') {
//     if (aPrime === true) {
//       aPrime === 1;
//     }
//     if (aPrime === false) {
//       aPrime === 0;
//     }

//     if (typeof bPrime === 'boolean') {
//       if (bPrime === true) {
//         bPrime === 1;
//       }
//       if (bPrime === false) {
//         bPrime === 0;
//       }
//     }
//     return aPrime === bPrime;
//   }
// }

// export function lte(a, b) {
//   const aPrime = toPrimitive(a);
//   const bPrime = toPrimitive(b);

//   if (typeof a === 'string' && typeof b === 'string') {
//     return aPrime < bPrime || aPrime === bPrime;
//   }

//   const aNum = Number(aPrime);
//   const bNum = Number(bPrime);

//   return aNum < bNum || aNum === bNum;
// }

// // 引数がオブジェクトの場合は、プリミティブ値に変換して返す関数
// function toPrimitive(value) {
//   if (typeof value === 'object') {
//     if (value === null) {
//       return value;
//     }
//     if (typeof value.valueOf() !== 'object') {
//       return value.valueOf();
//     }
//     if (typeof value.toString() !== 'object') {
//       return value.toString();
//     }
//   }
//   return value;
// }