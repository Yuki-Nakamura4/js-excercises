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

// 1. mathの全員の合計点 => 530
const mathTotal = data.reduce((total, student) => total + student.math, 0);
console.log("mathの全員の合計点:", mathTotal);

// 2. クラスAのchemistryの平均点 => 45
const classAChemistryAvg = data
  .filter((student) => student.class === "A")
  .reduce(
    // reduceメソッドの第4引数は元の配列
    (total, student, _, arr) => total + student.chemistry / arr.length,
    0
  );
console.log("クラスAのchemistryの平均点:", classAChemistryAvg);

// 3. 3科目合計点のクラスC内での平均点 => 176.66666666666669
const classCTotalAvg = data
  .filter((student) => student.class === "C")
  .reduce(
    (total, student, _, arr) =>
      total +
      (student.math + student.chemistry + student.geography) / arr.length,
    0
  );
console.log("3科目合計点のクラスC内での平均点:", classCTotalAvg);

// 4. 3科目合計点が最も高い人のname => Frank
const highestTotalStudent = data.reduce((prevStudent, currentStudent) => {
  const prevTotal =
    prevStudent.math + prevStudent.chemistry + prevStudent.geography;
  const currentTotal =
    currentStudent.math + currentStudent.chemistry + currentStudent.geography;
  return prevTotal > currentTotal ? prevStudent : currentStudent;
}).name;
console.log("3科目合計点が最も高い人のname:", highestTotalStudent);

// 5. 全体のgeographyの標準偏差 => 22.3330569358242
const geographyScores = data.map((student) => student.geography);
const geographyAvg =
  geographyScores.reduce((total, score) => total + score, 0) /
  geographyScores.length;
const geographyVariance =
  geographyScores.reduce(
    (variance, score) => variance + Math.pow(score - geographyAvg, 2),
    0
  ) / geographyScores.length;
const geographyStdDev = Math.sqrt(geographyVariance);
console.log("全体のgeographyの標準偏差:", geographyStdDev);

// mathの全員の合計点: 530
// クラスAのchemistryの平均点: 45
// 科目合計点のクラスC内での平均点: 176.66666666666669
// 3科目合計点が最も高い人のname: Frank
// 全体のgeographyの標準偏差: 22.3330569358242
