import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { FlatCompat } from '@eslint/eslintrc';
import jsdoc from 'eslint-plugin-jsdoc';
import google from 'eslint-config-google';
import eslintConfigPrettier from 'eslint-config-prettier';

// FlatCompat をインスタンス化
const compat = new FlatCompat({
  baseDirectory: dirname(fileURLToPath(import.meta.url)),
});

export default [
  // Googleの設定を適用
  ...compat.extends('google'),
  // "valid-jsdoc", "require-jsdoc"などの設定が互換性問題でエラーになったため、無効化した
  {
    rules: {
      'valid-jsdoc': 'off', 
      'require-jsdoc': 'off', 
    },
  },
  {
    plugins: {
      jsdoc, // jsdocプラグインを適用
    },
  },
  eslintConfigPrettier, // Prettierの設定を適用
  // ignoresはignoresだけのオブジェクトを作らないと適用されないので注意
  // 他のキーがあると、「そのキーの設定が無視される対象」を指定することになる
  {
    ignores: ['ex01/format_sample.js'], // format_sample.js を ESLint 対象から除外
  },
];
