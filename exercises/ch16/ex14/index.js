import { Worker } from 'worker_threads';
import { createCanvas, loadImage } from 'canvas';
import fs from 'fs';

// 画像ファイルのパス
const inputImagePath = 'input.jpg';
const outputImagePath = 'output.jpg';

// 画像を読み込む
loadImage(inputImagePath)
    .then(image => {
        const canvas = createCanvas(image.width, image.height);
        const ctx = canvas.getContext('2d');
        ctx.drawImage(image, 0, 0);

        // 画像データを取得
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

        // ワーカースレッドを作成
        const worker = new Worker(new URL('./worker.js', import.meta.url), {
            workerData: {
                width: imageData.width,
                height: imageData.height,
                data: imageData.data
            }
        });

        // ワーカースレッドからのメッセージを受け取る
        worker.on('message', (filteredData) => {
            // フィルタ適用後のデータを画像に設定
            const outputImageData = ctx.createImageData(filteredData.width, filteredData.height);
            outputImageData.data.set(filteredData.data);
            ctx.putImageData(outputImageData, 0, 0);

            // 画像を保存
            const out = fs.createWriteStream(outputImagePath);
            const stream = canvas.createJPEGStream();
            stream.pipe(out);
            out.on('finish', () => {
                console.log('ガウシアンフィルタを適用した画像を保存しました:', outputImagePath);
            });
        });

        // エラーハンドリング
        worker.on('error', (error) => {
            console.error('ワーカースレッドでエラーが発生しました:', error);
        });

        worker.on('exit', (code) => {
            if (code !== 0) {
                console.error(`ワーカースレッドが異常終了しました。終了コード: ${code}`);
            }
        });
    })
    .catch(error => {
        console.error('画像の読み込みに失敗しました:', error);
    });