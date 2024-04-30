const human = { name: "John", age: 32, job: "Programmer" };
const iterations = 100000;

// with文を使用しない場合
const startTimeWithoutWith = performance.now();
for (let i = 0; i < iterations; i++) {
    const _ = human.name;
}
const endTimeWithoutWith = performance.now();
console.log("withなし: ", endTimeWithoutWith - startTimeWithoutWith, "ミリ秒");

// with文を使用する場合
const startTimeWith = performance.now();
for (let i = 0; i < iterations; i++) {
    // eslint-disable-next-line no-with
    with (human) {
        const _ = name;
    }
}
const endTimeWith = performance.now();
console.log("withあり: ", endTimeWith - startTimeWith, "ミリ秒");

// withなし:  5 ミリ秒
// withあり:  17 ミリ秒