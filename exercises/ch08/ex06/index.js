// 引数を残余パラメータにし、アロー関数で定義
const m = (...arg) => {
  console.log(arg[1]);
};

m("a", "b"); // b
