# ch17/ex01

## eslint.config.js

`eslint-config-google`という[Google公式が提供する共有設定](https://qiita.com/mysticatea/items/dc35ced6bd5e782f50cd#eslint-config-google)があり、Google JavaScript Style Guideに準じたルールを適用できる。。。と思ったが、**この共有設定は`eslintrc.js`を前提としていて、ESLintの最新の設定形式であるFlatConfig(`eslintconfig.js`)には対応していない**よう？  
FlatConfig形式のGoogleの既存設定を探してみたが見当たらなかったため、この共有設定をFlatConfig形式にマイグレーションする方向で試した。

ES Lint公式のマイグレーションガイド([Configuration Migration Guide](https://eslint.org/docs/latest/use/configure/migration-guide#using-eslintrc-configs-in-flat-config )によると、eslintrc形式のconfigをFlat Config形式に変換するために`FlatCompat`というものが提供されているらしい。

また、マイグレーションにあたって`eslint-config-google`に含まれる`valid-jsdoc`や`require-jsdoc`などのルールは現在は非推奨または廃止されているらしく、それらが原因でエラーが発生したため、`eslint-config-google`内の該当設定をコメントアウトしたうえ、適宜新しいルール(`eslint-plugin-jsdoc`)に置き換えた。

```javascript
import { fileURLToPath } from "url";
import { dirname } from "path";
import { FlatCompat } from "@eslint/eslintrc";
import jsdoc from "eslint-plugin-jsdoc";
import google from "eslint-config-google";
import eslintConfigPrettier from "eslint-config-prettier";

// FlatCompat をインスタンス化
const compat = new FlatCompat({
    baseDirectory: dirname(fileURLToPath(import.meta.url))
});

export default [
    ...compat.extends("google"), // Googleの設定を適用。"valid-jsdoc", "require-jsdoc"などの設定がおそらく互換性問題でエラーになったため、コメントアウトした
    eslintConfigPrettier, // Prettierの設定を適用
    {
        plugins: {
            jsdoc, // jsdocプラグインを適用
        },
    },
    // ignoresはignoresだけのオブジェクトを作らないと適用されないので注意 (適用されず発狂しそうになった)
    // 他のキーがあると、「そのキーの設定が無視される対象」を指定することになるよう
    {
        ignores: ["ex01/format_sample.js"], // format_sample.js を ESLint 対象から除外
    }
];
```

ちなみに、ESLintの適用されないファイルを指定する`ignores`(旧形式では`ignorePatterns`)は、[オブジェクト内に他のキーが存在すると「その設定が」適用されないファイルを指定することになるため注意](https://github.com/eslint/eslint/issues/17400)。ESLintの設定全体が適用されないファイルを指定するには、`ignores`だけのオブジェクトを記述する必要がある。

### Flat Config

参考：

- [仕組みと嬉しさから理解するeslint FlatConfig対応](https://zenn.dev/cybozu_frontend/articles/about-eslint-flat-config)
- [新卒エンジニアがESLintのFlat Config移行と格闘した話](https://blog.nnn.dev/entry/2023/10/19/110000)
- [GatsbyでESlint flat config(v9)対応のメモ](https://til.swfz.io/entries/eslint_flatconfig/)

ESLint の新しい設定システム。

今まで ESLint の設定は eslintrc に記述していたが、Flat Configでは `eslint.config.js`というファイルに記述する。

違いは主に以下：

- plugin や perser の読み込み方が変わった
- extends が廃止された
- glob pattern で対象のファイルを毎に設定を書くことができるようになった
  - `.eslintignore`で除外ファイルを指定する必要がなくなった
  - `overrides`プロパティを使う必要がなくなった

## .prettierrc

以下の記事を参考に設定(デフォルト値のままの個所は省略した)。  
コメントは設定に対応する公式スタイルガイドの抜粋

参考：

- [vscodeでサクッとprettierを使う(Google JavaScript Style Guide参考)](https://qiita.com/wwwy/items/510f54837432d6c9b4fe)
- [Google JavaScript Style Guide](https://google.github.io/styleguide/jsguide.html)

```json
{
  "arrowParens": "always", // Always using parentheses even for single-parameter arrow functions can avoid situations where adding parameters, but forgetting to add parentheses, may result in parseable code which no longer works as intended.
  "bracketSpacing": true,
  "jsxSingleQuote": true, 
  "printWidth": 80, // JavaScript code has a column limit of 80 characters.
  "tabWidth": 2, // Each time a new block or block-like construct is opened, the indent increases by two spaces.
  "semi": true, // Every statement must be terminated with a semicolon.
  "singleQuote": true, // Ordinary string literals are delimited with single quotes 
  "trailingComma": "es5", // Include a trailing comma whenever there is a line break between the final element and the closing bracket.
  "useTabs": false // Tab characters are not used for indentation.
}
```

### trailing comma

末尾のカンマのこと。  
Prettierのオブションで`es-5`を指定すると、ES5で有効な場所(配列やオブジェクトの末尾)にもカンマを付ける。ただし、TypeScriptの型定義には、末尾にカンマを付けない(これが`all`との違い。

ちなみに、JSONは古いJavaScriptの仕様に基づいているため、末尾のカンマは許されない(復習)。

