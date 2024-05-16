const data = [
  { name: "Alice", class: "A", math: 10, chemistry: 30, geography: 20 },
  { name: "Bob", class: "A", math: 50, chemistry: 50, geography: 60 },
  { name: "Carol", class: "A", math: 70, chemistry: 55, geography: 30 },
  { name: "Dave", class: "B", math: 40, chemistry: 20, geography: 60 },
  { name: "Ellen", class: "B", math: 60, chemistry: 70, geography: 40 },
  { name: "Frank", class: "B", math: 90, chemistry: 70, geography: 80 },
  { name: "Isaac", class: "C", math: 70, chemistry: 40, geography: 50 },
  { name: "Justin", class: "C", math: 80, chemistry: 40, geography: 30 },
  { name: "Mallet", class: "C", math: 60, chemistry: 70, geography: 90 },
];

const sortedData = [...data].sort((a, b) => {
  if (b.math !== a.math) {
    return b.math - a.math;
  }
  if (b.chemistry !== a.chemistry) {
    return b.chemistry - a.chemistry;
  }
  return b.geography - a.geography;
});

console.log(sortedData);
// `math`の点数が高い順、`math`が同点数の場合は`chemistry`の点数が高い順。さらに同点数の場合は`geography`の点数が高い順にソートされている
// 0: {name: 'Frank', class: 'B', math: 90, chemistry: 70, geography: 80}
// 1: {name: 'Justin', class: 'C', math: 80, chemistry: 40, geography: 30}
// 2: {name: 'Carol', class: 'A', math: 70, chemistry: 55, geography: 30}
// 3: {name: 'Isaac', class: 'C', math: 70, chemistry: 40, geography: 50}
// 4: {name: 'Mallet', class: 'C', math: 60, chemistry: 70, geography: 90}
// 5: {name: 'Ellen', class: 'B', math: 60, chemistry: 70, geography: 40}
// 6: {name: 'Bob', class: 'A', math: 50, chemistry: 50, geography: 60}
// 7: {name: 'Dave', class: 'B', math: 40, chemistry: 20, geography: 60}
// 8: {name: 'Alice', class: 'A', math: 10, chemistry: 30, geography: 20

// [...data].sortとして非破壊的にしたので元のdataはそのまま
// console.log(data)
// { name: "Alice", class: "A", math: 10, chemistry: 30, geography: 20 },
// { name: "Bob", class: "A", math: 50, chemistry: 50, geography: 60 },
// { name: "Carol", class: "A", math: 70, chemistry: 55, geography: 30 },
// { name: "Dave", class: "B", math: 40, chemistry: 20, geography: 60 },
// { name: "Ellen", class: "B", math: 60, chemistry: 70, geography: 40 },
// { name: "Frank", class: "B", math: 90, chemistry: 70, geography: 80 },
// { name: "Isaac", class: "C", math: 70, chemistry: 40, geography: 50 },
// { name: "Justin", class: "C", math: 80, chemistry: 40, geography: 30 },
// { name: "Mallet", class: "C", math: 60, chemistry: 70, geography: 90 },
