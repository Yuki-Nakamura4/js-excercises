// ジュリア集合の計算を行うワーカー
// ジュリア集合の計算はマンデルブロ集合の計算とほぼ同じだが、定数が異なる
onmessage = function (message) {
  const { tile, x0, y0, perPixel, maxIterations } = message.data;
  const { width, height } = tile;

  const imageData = new ImageData(width, height);
  const iterations = new Uint32Array(imageData.data.buffer);

  // Julia集合の定数（c = c_r + c_i i）
  // マンデルブロ集合では、c = x + y i だったが、ジュリア集合ではcは固定
  // この定数の値を変えると、描かれる図形が変わる
  const c_r = -0.7; // 定数の実部
  const c_i = 0.35; // 定数の虚部

  let index = 0,
    max = 0,
    min = maxIterations;

  for (let row = 0, y = y0; row < height; row++, y += perPixel) {
    for (let column = 0, x = x0; column < width; column++, x += perPixel) {
      let n;
      let r = x,
        i = y;
      for (n = 0; n < maxIterations; n++) {
        const rr = r * r,
          ii = i * i;
        if (rr + ii > 4) break;
        i = 2 * r * i + c_i; // 定数の虚部を使う
        r = rr - ii + c_r; // 定数の実部を使う
      }
      iterations[index++] = n;
      if (n > max) max = n;
      if (n < min) min = n;
    }
  }

  postMessage({ tile, imageData, min, max }, [imageData.data.buffer]);
};

// 以下は教科書のコードそのまま(マンデルブロ集合)

// // 親スレッドからのメッセージを受け取り、そのメッセージに記述されている計算を実行し、
// // その計算結果を親スレッドに送信するシンプルなワーカー
// onmessage = function (message) {
//   const { tile, x0, y0, perPixel, maxIterations } = message.data;
//   const { width, height } = tile;

//   const imageData = new ImageData(width, height);
//   const iterations = new Uint32Array(imageData.data.buffer);

//   let index = 0,
//     max = 0,
//     min = maxIterations;
//   for (let row = 0, y = y0; row < height; row++, y += perPixel) {
//     for (let column = 0, x = x0; column < width; column++, x += perPixel) {
//       let n;
//       let r = x,
//         i = y;
//       for (n = 0; n < maxIterations; n++) {
//         const rr = r * r,
//           ii = i * i;
//         if (rr + ii > 4) break;
//         i = 2 * r * i + y;
//         r = rr - ii + x;
//       }
//       iterations[index++] = n;
//       if (n > max) max = n;
//       if (n < min) min = n;
//     }
//   }

//   postMessage({ tile, imageData, min, max }, [imageData.data.buffer]);
// };
