import { convertLFtoCRLF, convertCRLFtoLF } from "./index";

describe("Newline Conversion Test", () => {
  test("LF to CRLF", () => {
    const input = "line1\nline2\nline3";
    const expectedOutput = "line1\r\nline2\r\nline3";
    expect(convertLFtoCRLF(input)).toBe(expectedOutput);
  });

  test("CRLF to LF", () => {
    const input = "line1\r\nline2\r\nline3";
    const expectedOutput = "line1\nline2\nline3";
    expect(convertCRLFtoLF(input)).toBe(expectedOutput);
  });
});
