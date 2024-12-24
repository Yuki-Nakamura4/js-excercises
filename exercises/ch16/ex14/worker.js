import { parentPort, workerData } from 'worker_threads';

// ガウシアンフィルタのカーネル
const gaussianKernel = [
    [1, 4, 7, 4, 1],
    [4, 16, 26, 16, 4],
    [7, 26, 41, 26, 7],
    [4, 16, 26, 16, 4],
    [1, 4, 7, 4, 1]
];
const kernelSum = 273; // カーネルの要素の合計

// ガウシアンフィルタを適用する関数
function applyGaussianFilter(imageData) {
    const { width, height, data } = imageData;
    const filteredData = new Uint8Array(data.length);

    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            let r = 0, g = 0, b = 0;

            for (let ky = -2; ky <= 2; ky++) {
                for (let kx = -2; kx <= 2; kx++) {
                    const px = Math.min(width - 1, Math.max(0, x + kx));
                    const py = Math.min(height - 1, Math.max(0, y + ky));
                    const pixelIndex = (py * width + px) * 4;
                    const kernelValue = gaussianKernel[ky + 2][kx + 2];

                    r += data[pixelIndex] * kernelValue;
                    g += data[pixelIndex + 1] * kernelValue;
                    b += data[pixelIndex + 2] * kernelValue;
                }
            }

            const index = (y * width + x) * 4;
            filteredData[index] = r / kernelSum;
            filteredData[index + 1] = g / kernelSum;
            filteredData[index + 2] = b / kernelSum;
            filteredData[index + 3] = data[index + 3]; // アルファチャンネルはそのまま
        }
    }

    return { width, height, data: filteredData };
}

// ガウシアンフィルタを適用して結果をメインスレッドに送信
const filteredImageData = applyGaussianFilter(workerData);
parentPort.postMessage(filteredImageData);