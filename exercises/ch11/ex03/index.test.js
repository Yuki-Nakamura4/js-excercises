import { littleEndianToBigEndian, bigEndianToLittleEndian } from "./index";

describe("エンディアン変換関数のテスト", () => {
  test("リトルエンディアンからビッグエンディアンへ正しく変換されること", () => {
    const littleEndianArray = new Uint32Array([0x78563412, 0xabcdef01]);
    const expectedBigEndianArray = new Uint32Array([0x12345678, 0x01efcdab]);
    const convertedArray = littleEndianToBigEndian(littleEndianArray);
    expect(convertedArray).toEqual(expectedBigEndianArray);
  });

  test("ビッグエンディアンからリトルエンディアンへ正しく変換されること", () => {
    const bigEndianArray = new Uint32Array([0x12345678, 0x01efcdab]);
    const expectedLittleEndianArray = new Uint32Array([0x78563412, 0xabcdef01]);
    const convertedArray = bigEndianToLittleEndian(bigEndianArray);
    expect(convertedArray).toEqual(expectedLittleEndianArray);
  });
});
