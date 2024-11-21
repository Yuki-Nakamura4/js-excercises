document.getElementById("image").addEventListener("change", (event) => {
  const file = event.target.files[0];
  if (!file) {
    return;
  }

  const img = new Image();
  const reader = new FileReader();

  reader.addEventListener("load", (e) => {
    img.src = e.target.result;
  });

  img.addEventListener("load", () => {
    const originalCanvas = document.getElementById("original");
    const filteredCanvas = document.getElementById("filtered");
    const originalCtx = originalCanvas.getContext("2d");
    const filteredCtx = filteredCanvas.getContext("2d");

    originalCanvas.width = img.width;
    originalCanvas.height = img.height;
    filteredCanvas.width = img.width;
    filteredCanvas.height = img.height;

    originalCtx.drawImage(img, 0, 0);

    const imageData = originalCtx.getImageData(0, 0, img.width, img.height);
    const data = imageData.data;
    const width = img.width;
    const height = img.height;

    // 出力用のデータ配列
    const outputData = new Uint8ClampedArray(data.length);

    // 5x5 のガウシアンカーネル（重み行列）
    // 本来はガウス関数を使って重みを計算するが、ここでは簡単のために固定値を使用
    const kernel = [
      [1, 4, 6, 4, 1],
      [4, 16, 24, 16, 4],
      [6, 24, 36, 24, 6],
      [4, 16, 24, 16, 4],
      [1, 4, 6, 4, 1],
    ];
    const kernelSum = 256; // カーネルの合計値で正規化

    // ガウシアンぼかしの適用
    for (let y = 2; y < height - 2; y++) {
      for (let x = 2; x < width - 2; x++) {
        let r = 0,
          g = 0,
          b = 0;

        // カーネルを適用してぼかし処理
        for (let ky = -2; ky <= 2; ky++) {
          for (let kx = -2; kx <= 2; kx++) {
            // 2次元配列のインデックスを1次元配列のインデックスに変換(rgbaなので4倍する)
            const pixelIndex = ((y + ky) * width + (x + kx)) * 4;
            // カーネルの重みを取得
            const weight = kernel[ky + 2][kx + 2];

            r += data[pixelIndex] * weight;
            g += data[pixelIndex + 1] * weight;
            b += data[pixelIndex + 2] * weight;
          }
        }

        const outputIndex = (y * width + x) * 4;
        outputData[outputIndex] = r / kernelSum;
        outputData[outputIndex + 1] = g / kernelSum;
        outputData[outputIndex + 2] = b / kernelSum;
        outputData[outputIndex + 3] = data[outputIndex + 3]; // アルファ値はそのまま保持
      }
    }

    // 処理結果をキャンバスに表示
    const outputImageData = new ImageData(outputData, img.width, img.height);
    filteredCtx.putImageData(outputImageData, 0, 0);
  });

  reader.readAsDataURL(file);
});
