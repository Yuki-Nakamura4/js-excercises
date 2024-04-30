import { fibonacciWhile, fibonacciDoWhile, fibonacciFor } from "./index";

describe("フィボナッチ数列のテスト", () => {
    test("fibonacciWhileのテスト", () => {
        expect(fibonacciWhile()).toEqual(
            [1, 1, 2, 3, 5, 8, 13, 21, 34, 55]
        )
    })
    test("fibonacciDoWhileのテスト", () => {
        expect(fibonacciDoWhile()).toEqual(
            [1, 1, 2, 3, 5, 8, 13, 21, 34, 55]
        )
    })
    test("fibonacciForのテスト", () => {
        expect(fibonacciFor()).toEqual(
            [1, 1, 2, 3, 5, 8, 13, 21, 34, 55]
        )
    })
})