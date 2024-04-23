export function example() {
  const str = "apple";
  console.log(str);
  {
    const str = "orange";
    console.log(str);
  }
}
