/* eslint-disable no-prototype-builtins */

// テンプレートオブジェクトに存在しないプロパティをあるオブジェクトから削除する関数
export function restrict(target, template) {
  for (const key in target) {
    if (!template.hasOwnProperty(key)) {
      delete target[key];
    }
  }
  return target;
}

// あるオブジェクトのプロパティを別のオブジェクトから削除する
export function substract(target, ...sources) {
  for (const source of sources) {
    for (const key in target) {
      if (source.hasOwnProperty(key)) {
        delete target[key];
      }
    }
  }
  return target;
}

// 余談：「substract...? subtractでは？」と思ったが、調べたらsubtractの古い語らしい
// 書籍でもsubstractとなっていた。ただあえてなのかは不明
