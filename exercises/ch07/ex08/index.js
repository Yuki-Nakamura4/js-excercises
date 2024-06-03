export function reverse(str) {
  const segments = [];
  // Intl.Segmenterを使用することで書記素(見た目上の1文字)で分割できる
  for (const segment of new Intl.Segmenter().segment(str)) {
    segments.push(segment.segment);
  }
  return segments.reverse().join("");
}

// 参考：https://qiita.com/debiru/items/a5813c8efbae6f2cba72
// 参考：https://zenn.dev/cybozu_frontend/articles/explore-intl-segmenter
