self.addEventListener("message", (event) => {
    const { imageData, width, height } = event.data;
    const data = imageData.data;

    // 出力用のデータ配列
    const outputData = new Uint8ClampedArray(data.length);

    // 5x5 のガウシアンカーネル（重み行列）
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
                    const pixelIndex = ((y + ky) * width + (x + kx)) * 4;
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

    self.postMessage({ outputData, width, height });
});