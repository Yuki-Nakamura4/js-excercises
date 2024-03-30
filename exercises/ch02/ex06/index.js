// 一行でFizzBuzzを実装
export function fizzbuzz(){let r="";for(let i=1;i<=100;i++){let m="";m+=i%3===0?"Fizz":"";m+=i%5===0?"Buzz":"";r+=m||i;r+="\n"}return r}

// //三項演算子を使ったFizzBuzzの実装
// export function fizzbuzz() {
//   let result = "";
//   for (let i = 1; i <= 100; i++) {
//     let message = i % 3 === 0 ? "Fizz" : "";
//     message += i % 5 === 0 ? "Buzz" : "";
//     result += message === "" ? i + "\n" : message + "\n";
//   }
//   return result;
// }

// // 基本的なFizzBuzzの実装
// export function fizzbuzz() {
//   let result = "";
//   for (let i = 1; i <= 100; i++) {
//     let message = "";
//     if (i % 3 === 0) {
//       message = "Fizz";
//     }
//     if (i % 5 === 0) {
//       message += "Buzz";
//     }
//     result += message === "" ? i + "\n" : message + "\n";
//   }
//   return result;
// }
