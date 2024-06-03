export function getAllPropertyNames(obj) {
  // プロパティ名の重複を避けるため集合を使用
  const allProps = new Set();

  // すべての独自プロパティ(列挙不可、プロパティ名が `Symbol`のものを含む)を取得
  const ownProps = Reflect.ownKeys(obj);
  ownProps.forEach((prop) => {
    allProps.add(prop);
  });

  // 列挙可能なプロパティ(継承プロパティを含む)を取得
  for (const prop in obj) {
    allProps.add(prop);
  }

  return Array.from(allProps);
}
