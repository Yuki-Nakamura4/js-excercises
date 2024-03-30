describe("Emoji Length Test", () => {
  test("Length of 💯 should be 2", () => {
    expect("💯".length).toBe(2);
  });

  test("UTF-16 code point representation should be equivalent to 💯", () => {
    expect("\uD83D\uDCAF").toBe("💯");
  });

  test("UTF-32 code point representation should be equivalent to 💯", () => {
    expect("\u{0001F4AF}").toBe("💯");
  });
});
