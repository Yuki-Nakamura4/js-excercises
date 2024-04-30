import { parseJSON } from "./index";

describe("文字列がJSON としてパースできるか判定する" ,() => {
    test("パースできる場合", () => {
        expect(parseJSON('{"name": "John", "age": 30}')).toEqual({ success: true, data: { name: "John", age: 30 }})
    })
    test("パースできない場合", ()=> {
        expect(parseJSON('{"name": "John", "age": 30')).toEqual({ success: false, error: 'Unexpected end of JSON input' });
        expect(parseJSON('Hello world')).toEqual({ success: false, error: 'Unexpected token H in JSON at position 0' })
    })
})