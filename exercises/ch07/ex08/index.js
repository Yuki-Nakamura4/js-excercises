export function reverse(str) {
  const segments = [];
  // Intl.Segmenterを使用することで書記素(見た目上の1文字)で分割できる
  for (const segment of new Intl.Segmenter().segment(str)) {
    segments.push(segment.segment);
  }
  return segments.reverse().join("");
}
