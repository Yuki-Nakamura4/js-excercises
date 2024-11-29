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

        // Web Workerを使用して画像変換処理を行う
        const worker = new Worker("worker.js");
        worker.postMessage({ imageData, width: img.width, height: img.height });

        worker.addEventListener("message", (e) => {
            const { outputData, width, height } = e.data;
            const outputImageData = new ImageData(outputData, width, height);
            filteredCtx.putImageData(outputImageData, 0, 0);
        });
    });

    reader.readAsDataURL(file);
});

// メインスレッドがブロックされないことを確認するために、動くオブジェクトを配置
const movingObject = document.createElement("div");
movingObject.style.width = "50px";
movingObject.style.height = "50px";
movingObject.style.backgroundColor = "blue";
movingObject.style.position = "absolute";
movingObject.style.top = "0";
movingObject.style.left = "0";
document.body.appendChild(movingObject);

let posX = 0;
let posY = 0;
let directionX = 1;
let directionY = 1;

function animate() {
    posX += directionX;
    posY += directionY;

    if (posX + 50 > window.innerWidth || posX < 0) {
        directionX *= -1;
    }
    if (posY + 50 > window.innerHeight || posY < 0) {
        directionY *= -1;
    }

    movingObject.style.transform = `translate(${posX}px, ${posY}px)`;
    requestAnimationFrame(animate);
}

animate();