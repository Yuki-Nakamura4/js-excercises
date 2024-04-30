import { filterEvenProperties } from "./index";

describe("値が偶数のプロパティだけを持つオブジェクトを返す", () => {
    test("filterEvenPropertiesのテスト", () => {
        const obj = {a: 1, b: 2, c: 3}
        const obj2 = {a:0, b:10, c: 5, d:8}
        const obj3 = {a:3, b:1, c:15}

        expect(filterEvenProperties(obj)).toEqual({b: 2})
        expect(filterEvenProperties(obj2)).toEqual({a:0, b:10, d:8})
        expect(filterEvenProperties(obj3)).toEqual({})
    })
})