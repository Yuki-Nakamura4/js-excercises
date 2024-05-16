export function reverse(str) {
  const segments = [];
  for (const segment of new Intl.Segmenter().segment(str)) {
    segments.push(segment.segment);
  }
  return segments.reverse().join("");
}

// 参考：https://qiita.com/debiru/items/a5813c8efbae6f2cba72
// 上記リンクでは文字列を都度結合していたが、文字列は不変のためメモリ効率が悪いと考え配列に要素を格納した
