export function sum(array) {
  if (array) {
    return array.reduce((acc, num) => acc + num, 0);
  } else return 0;
}

export function join(array, separator = ",") {
  if (array) {
    // 最初の文字 + (区切り文字 + 次の文字) + (区切り文字 + 次の文字)......
    return array.reduce((acc, currentValue, currentIndex) => {
      if (currentIndex === 0) {
        return String(currentValue);
      } else {
        return acc + separator + String(currentValue ? currentValue : "");
      }
    }, "");
  } else throw new Error("Array must be provided");
}

export function reverse(array) {
  if (array) {
    // reduceでやろうとすると毎回返り値の配列の先頭にunshiftで挿入する必要があるが、
    // そうすると毎回配列の要素をズラす操作(O(N))が生じるため非効率。後ろから取ってきて順に並べた方が良い
    // よってreduceRightを使用した
    return array.reduceRight((acc, currentValue) => {
      acc.push(currentValue);
      return acc;
    }, []);
  } else throw new Error("Array must be provided");
}

export function every(array, predicate) {
  return array.reduce((acc, currentValue, index) => {
    // もし前の結果がfalseならその時点でリターン
    if (!acc) {
      return false;
    }
    // 第二引数で受け取った関数の結果を返す
    return predicate(currentValue, index, array);
  }, true);
}

export function some(array, predicate) {
  return array.reduce((acc, currentValue, index) => {
    // もし前の結果がtrueならその時点でリターン
    if (acc) {
      return true;
    }
    // 第二引数で受け取った関数の結果を返す
    return predicate(currentValue, index, array);
  }, false);
}
