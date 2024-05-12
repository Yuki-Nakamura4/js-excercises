import { addMatrices, multiplyMatrices } from "./index";

test("加算 2つの行列の行数と列数が同じ場合 => 計算可", () => {
  const matrix1 = [
    [1, 2],
    [3, 4],
  ];
  const matrix2 = [
    [5, 6],
    [7, 8],
  ];
  const expected = [
    [6, 8],
    [10, 12],
  ];
  expect(addMatrices(matrix1, matrix2)).toEqual(expected);
});

test("加算 2つの行列の行数と列数が異なる場合 => エラー", () => {
  const matrix1 = [
    [1, 2],
    [3, 4],
  ];
  const matrix2 = [
    [5, 6, 7],
    [8, 9, 10],
  ];
  expect(() => addMatrices(matrix1, matrix2)).toThrow("加算不可");
});

test("乗算 行数1の列数と行列2の行数が等しい場合  => 計算可", () => {
  const matrix1 = [
    [1, 2, 3],
    [4, 5, 6],
  ];
  const matrix2 = [
    [7, 8],
    [9, 10],
    [11, 12],
  ];
  const expected = [
    [58, 64],
    [139, 154],
  ];
  expect(multiplyMatrices(matrix1, matrix2)).toEqual(expected);
});

test("乗算 行数1の列数と行列2の行数が異なる場合 => エラー", () => {
  const matrix1 = [
    [1, 2],
    [3, 4],
  ];
  const matrix2 = [
    [5, 6, 7],
    [8, 9, 10],
    [11, 12, 13],
  ];
  expect(() => multiplyMatrices(matrix1, matrix2)).toThrow("乗算不可");
});
