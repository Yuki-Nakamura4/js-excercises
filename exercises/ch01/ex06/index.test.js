import { fib, fib2 } from "./index.js";

describe("fib", () => {
    it("returns 0 when 0 given", () => {
        expect(fib(0)).toBe(0);
    });

    it("returns 1 when 1 given", () => {
        expect(fib(1)).toBe(1);
    });

    it("returns 1 when 2 given", () => {
        expect(fib(2)).toBe(1);
    });

    it("returns 2 when 3 given", () => {
        expect(fib(3)).toBe(2);
    });

    it("returns 3 when 4 given", () => {
        expect(fib(4)).toBe(3);
    });

    it("returns 5 when 5 given", () => {
        expect(fib(5)).toBe(5);
    });

    it("returns 8 when 6 given", () => {
        expect(fib(6)).toBe(8);
    });

    it("returns 13 when 7 given", () => {
        expect(fib(7)).toBe(13);
    });

    it("returns 21 when 8 given", () => {
        expect(fib(8)).toBe(21);
    });

    it("returns 34 when 9 given", () => {
        expect(fib(9)).toBe(34);
    });

    // it("returns 2111485077978050 when 75 given", () => {
    //     expect(fib(75)).toBe(2111485077978050);
    // });
});

describe("fib2", () => {
    it("returns 0 when 0 given", () => {
        expect(fib(0)).toBe(0);
    });

    it("returns 1 when 1 given", () => {
        expect(fib(1)).toBe(1);
    });

    it("returns 1 when 2 given", () => {
        expect(fib(2)).toBe(1);
    });

    it("returns 2 when 3 given", () => {
        expect(fib(3)).toBe(2);
    });

    it("returns 3 when 4 given", () => {
        expect(fib(4)).toBe(3);
    });

    it("returns 5 when 5 given", () => {
        expect(fib(5)).toBe(5);
    });

    it("returns 8 when 6 given", () => {
        expect(fib(6)).toBe(8);
    });

    it("returns 13 when 7 given", () => {
        expect(fib(7)).toBe(13);
    });

    it("returns 21 when 8 given", () => {
        expect(fib(8)).toBe(21);
    });

    it("returns 34 when 9 given", () => {
        expect(fib(9)).toBe(34);
    });
});