// 引数は整数とする
// 除算の解は小数点以下第一位で答えるものとする

// 加算
export function add(a, b) {
  const new_real = a.real + b.real;
  const new_imag = a.imag + b.imag;
  return { real: new_real, imag: new_imag };
}

// 減算
export function sub(a, b) {
  const new_real = a.real - b.real;
  const new_imag = a.imag - b.imag;
  return { real: new_real, imag: new_imag };
}

// 乗算
// (a_real + a_imag)(b_real + b_imag)を展開し、実部になるものと虚部になるものごとにまとめる
export function mul(a, b) {
  const new_real = a.real * b.real - a.imag * b.imag;
  const new_imag = a.real * b.imag + a.imag * b.real;
  return { real: new_real, imag: new_imag };
}

// 除算
// (a_real + a_imag) / (b_real + b_imag) = (a_real + a_imag)(b_real - b_imag) / (b_real + b_imag)(b_real - b_imag)
// = (a_real + a_imag)(b_real - b_imag) / (b_real^2 + b_imag^2)
// = ( a_real * b_real + a_imag*b_imag ) / ( b_real^2  + b_imag^2 )  +  { ( a_imag * b_real - a_real * b_imag )  / () b_real^2 + b_imag^2 ) } * i
export function div(a, b) {
  const denominator = b.real ** 2 + b.imag ** 2;
  let new_real = Math.floor(a.real * b.real + a.imag * b.imag) / denominator;
  let new_imag = (a.imag * b.real - a.real * b.imag) / denominator;
  new_real = Math.round(new_real * 10) / 10; // 小数点以下第一位までで表示
  new_imag = Math.round(new_imag * 10) / 10;
  return { real: new_real, imag: new_imag };
}
