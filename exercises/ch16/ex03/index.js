import crypto from "crypto";
import fs from "fs";

// 鍵を生成する
function generateKey() {
    // 32バイトの暗号論的疑似乱数を生成する
    // 暗号を扱うときは、このような暗号論的疑似乱数を使うことが重要(通常の乱数は解析される)
    return crypto.randomBytes(32);
}

// 平文を鍵とAES-256-CBCで暗号化する。次に、暗号文と初期化ベクトル(IV)を、Base64エンコードして返す。
function encrypt64(text, key) {
    // 16バイトの暗号論的疑似乱数を初期化ベクトル (IV) とする
    // ここを埋める
    const iv = crypto.randomBytes(16);

    // 暗号化とBase64エンコード
    // ここを埋める
    const cipher = crypto.createCipheriv("aes-256-cbc", key, iv);
    let encryptedBase64 = cipher.update(text, "utf8", "base64");
    encryptedBase64 += cipher.final("base64"); // 最後のデータを追加し、暗号化を完了

    // 暗号文とIVをbase64で返す
    return {
        value: encryptedBase64,
        iv: iv.toString("base64"),
    };
}

// generateKeyの返り値を、JSON形式でファイルに保存する(非同期)
async function writeKey(key) {
    // ここを埋める（fs.promisesで鍵を保存）
    await fs.promises.writeFile("key.json", JSON.stringify({ key: key.toString("base64") }, null, 2));
}

// encrypt64の返り値を、JSON形式でファイルに保存する(非同期)
async function writeEncrypt64(data) {
    // ここを埋める（fs.promisesで暗号データを保存）
    await fs.promises.writeFile("encryptedData.json", JSON.stringify(data, null, 2), "utf-8");
}

async function readKey() {
    // ここを埋める（return Promise<鍵>）
    const data = await fs.promises.readFile("key.json", "utf8");
    return Buffer.from(JSON.parse(data).key, "base64");
}

// ファイルから暗号データを読み込む (非同期)
async function readEncrypt64() {
    // ここを埋める（return Promise<data>）
    const data = await fs.promises.readFile("encryptedData.json", "utf8");
    return JSON.parse(data);
}

// 復号して平文を返す
function decrypt64(data, key) {
    // ここを埋める
    const iv = Buffer.from(data.iv, "base64");
    const encryptedText = Buffer.from(data.value, "base64");
    const decipher = crypto.createDecipheriv("aes-256-cbc", key, iv);
    let decrypted = decipher.update(encryptedText, "base64", "utf8");
    decrypted += decipher.final("utf8");
    return decrypted;
}

// 指定の平文を暗号化とBase64エンコードし、後に復号する一連の処理
(async () => {
    // 平文
    const text = "Hello, World!";

    // 暗号化とBase64エンコード
    const key = generateKey();
    const encryptedData = encrypt64(text, key);

    // 鍵と暗号データをJSONで保存
    await writeKey(key);
    await writeEncrypt64(encryptedData);

    console.log("Encrypted Text (Base64):", encryptedData.value);

    // Base64デコードと復号
    const storedKey = await readKey();
    const storedEncryptedData = await readEncrypt64();
    const decryptedText = decrypt64(storedEncryptedData, storedKey);

    console.log("Decrypted Text:", decryptedText);
})();