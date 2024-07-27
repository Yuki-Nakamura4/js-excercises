export function sortJapanese(strings) {
  return strings
    .map((s) => s.normalize("NFKC").toLowerCase())
    .sort((a, b) => a.localeCompare(b, "ja"));
}

export function toJapaneseDateString(date) {
  const eraMap = [
    { name: "令和", start: new Date(2019, 4 - 1, 1) },
    { name: "平成", start: new Date(1989, 1 - 1, 8) },
    { name: "昭和", start: new Date(1926, 12 - 1, 25) },
    { name: "大正", start: new Date(1912, 7 - 1, 30) },
  ];

  const era = eraMap.find((era) => date >= era.start);
  if (!era) return "不明な元号";

  const year = date.getFullYear() - era.start.getFullYear() + 1;
  const formattedYear = year === 1 ? "元" : year.toString();

  return `${era.name}${formattedYear}年${
    date.getMonth() + 1
  }月${date.getDate()}日`;
}
