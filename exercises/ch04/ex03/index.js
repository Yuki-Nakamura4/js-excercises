function bitAdd(a, b) {
  let sum = a ^ b;
  let carry = (a & b) << 1;

  while (carry !== 0) {
    const tempSum = sum;
    const tempCarry = carry;
    sum = tempSum ^ tempCarry;
    carry = (tempSum & tempCarry) << 1;
  }

  return sum;
}

export function sub(num1, num2) {
  if (isNaN(num1) || isNaN(num2)) {
    return NaN;
  }
  num2 = bitAdd(~num2, 1);
  return bitAdd(num1, num2);
}
