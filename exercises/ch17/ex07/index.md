# ch17/ex07

## TypeScriptのトランスパイル方法の違い

### @babel/preset-typescript

Babelを使用してTypeScriptのコードをJavaScriptにトランスパイルするためのプリセット。

`@babel/preset-typescript`はTypeScriptのコードをJavaScriptにトランスパイルするだけで、**型チェックは行わない**。型チェックは別途tscやeslintなどを使用して行う必要がある。

#### なぜBabelは型チェックを行わないか

おそらく設計思想や責務的に、あくまで最新のJavaScriptコードを古い下位互換バージョンのJavaScriptコードに高速にトランスパイルをすることに重点を置いているからだと思われる。

### tsc (TypeScript Compiler)

TypeScriptに公式に付属しているコンパイラで、TypeScriptのコードをJavaScriptにトランスパイルする。  
tscはコードのトランスパイル中に**型チェック**を行い、型エラーがある場合には警告やエラーを出力する。  

### 運用について

Babel, esbuild, SWCなどのトランスパイラは、新しい構文を古い構文に変換するだけでなく、TypeScriptから型注釈を取り除く機能も備えている。これにより、トランスパイラがあればTypeScriptコンパイラによるトランスパイル機能のほぼすべてを代替可能である。そのため、**TypeScriptコンパイラは型チェックのみに使用し、トランスパイルは全部Babelが担当するというセットアップもよく行われる**(鈴木, 2022)

### 参考

- 鈴木僚太.プロを目指す人のためのTypeScript入門.技術評論社, 2022, 411p
- [Babel vs. TypeScript: Choosing the right compiler for your project](https://blog.logrocket.com/babel-vs-typescript-choosing-right-compiler-project/)
