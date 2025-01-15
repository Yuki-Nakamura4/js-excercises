import { fileURLToPath } from "url";
import { dirname } from "path";
import { FlatCompat } from "@eslint/eslintrc";
import jsdoc from "eslint-plugin-jsdoc";

// FlatCompat をインスタンス化
const compat = new FlatCompat({
    baseDirectory: dirname(fileURLToPath(import.meta.url))
});

export default [
    ...compat.extends("google"), // Google の設定を適用
    {
        plugins: {
            jsdoc,
        },
        rules: {
            "valid-jsdoc": "off", // 古いルールを無効化
            "require-jsdoc": "off", // 古いルールを無効化
            "jsdoc/require-jsdoc": "warn",
        },
    },
];
