// 2次元配列の行列を加算する関数
export function addMatrices(matrix1, matrix2) {
  // 2つの行列の行数または列数が異なる場合加算不可
  if (
    matrix1.length !== matrix2.length ||
    matrix1[0].length !== matrix2[0].length
  ) {
    throw new Error("加算不可");
  }

  const result = [];
  for (let i = 0; i < matrix1.length; i++) {
    result[i] = [];
    for (let j = 0; j < matrix1[0].length; j++) {
      result[i][j] = matrix1[i][j] + matrix2[i][j];
    }
  }
  return result;
}

// 2次元配列の行列の乗算を行う関数
export function multiplyMatrices(matrix1, matrix2) {
  // 行列1の列数と行列2の行数が異なる場合乗算不可
  if (matrix1[0].length !== matrix2.length) {
    throw new Error("乗算不可");
  }

  const result = [];
  for (let i = 0; i < matrix1.length; i++) {
    result[i] = [];
    for (let j = 0; j < matrix2[0].length; j++) {
      let sum = 0;
      for (let k = 0; k < matrix1[0].length; k++) {
        sum += matrix1[i][k] * matrix2[k][j];
      }
      result[i][j] = sum;
    }
  }
  return result;
}
