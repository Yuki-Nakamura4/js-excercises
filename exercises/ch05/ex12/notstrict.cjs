const obj = { x: 10 };

with (obj) {
  console.log(x); // 非 strict モードでは動作するが、strict モードではエラーが発生する
}

// 10