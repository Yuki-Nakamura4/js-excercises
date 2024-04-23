import { escapeStringWithIfElse, escapeStringWithSwitch } from "./index";

describe("Escape String Function Tests", () => {
  test("Test escapeStringWithIfElse", () => {
    expect(escapeStringWithIfElse('abc\\def\nghi"jkl')).toBe(
      'abc\\\\def\\nghi\\"jkl'
    );
    expect(escapeStringWithIfElse("no special characters")).toBe(
      "no special characters"
    );
    expect(escapeStringWithIfElse("foo\tbar")).toBe("foo\\tbar");
    expect(escapeStringWithIfElse("baz\bqux")).toBe("baz\\bqux");
    expect(escapeStringWithIfElse('escape\\"me')).toBe('escape\\\\\\"me');
  });

  test("Test escapeStringWithSwitch", () => {
    expect(escapeStringWithSwitch('abc\\def\nghi"jkl')).toBe(
      'abc\\\\def\\nghi\\"jkl'
    );
    expect(escapeStringWithSwitch("no special characters")).toBe(
      "no special characters"
    );
    expect(escapeStringWithSwitch("foo\tbar")).toBe("foo\\tbar");
    expect(escapeStringWithSwitch("baz\bqux")).toBe("baz\\bqux");
    expect(escapeStringWithSwitch('escape\\"me')).toBe('escape\\\\\\"me');
  });
});
