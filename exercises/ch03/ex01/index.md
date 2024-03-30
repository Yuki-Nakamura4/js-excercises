// 結果
// NaNが含まれる四則演算の結果はすべてNaNになった
// 正負のInfinity同士の和(あるいは正のInfinity同士の差)で互いに打ち消し合うと、0ではなくNaNになる
// Infinity同士の割り算は(正負に関わらず)1や-1ではなくNaNになる

Calculations for Infinity and Infinity:
+ : Infinity
- : NaN
* : Infinity
/ : NaN


Calculations for Infinity and -Infinity:0
+ : NaN
- : Infinity
* : -Infinity
/ : NaN


Calculations for Infinity and NaN:
+ : NaN
- : NaN
* : NaN
/ : NaN


Calculations for -Infinity and Infinity:
+ : NaN
- : -Infinity
* : -Infinity
/ : NaN


Calculations for -Infinity and -Infinity:
+ : -Infinity
- : NaN
* : Infinity
/ : NaN


Calculations for -Infinity and NaN:
+ : NaN
- : NaN
* : NaN
/ : NaN

Calculations for NaN and Infinity:
+ : NaN
- : NaN
* : NaN
/ : NaN

Calculations for NaN and -Infinity:
+ : NaN
- : NaN
* : NaN
/ : NaN

Calculations for NaN and NaN:
+ : NaN
- : NaN
* : NaN
/ : NaN