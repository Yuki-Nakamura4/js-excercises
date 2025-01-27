# ch17/ex10

## TypeScriptとFlowの違い

### 言語の拡張性

TypeScriptは、JavaScriptに型システムを追加した独自のプログラミング言語である。クラス、インターフェース、列挙型、ジェネリクスなどの機能が組み込まれており、オブジェクト指向プログラミングを強力にサポートする。一方、Flowは、あくまでもJavaScriptに型アノテーションを追加するための静的型チェッカーであり、言語仕様の拡張は最小限に抑えられている。

### 型推論の強さ

Flowは、型推論が非常に強力。明示的な型アノテーションを付けなくても、Flowは変数や式の型を推論することができる。これにより、型アノテーションの量を最小限に抑えつつ、型の安全性を確保できる。TypeScriptも型推論を行いますが、Flowほど積極的ではない。

### 漸進的な型付け

Flowは、漸進的な型付けをサポートしている。つまり、既存のJavaScriptコードに段階的に型アノテーションを追加していくことができる。これにより、大規模なJavaScriptプロジェクトに対して、部分的に型チェックを導入することが可能。TypeScriptでもany型を使って漸進的な型付けを実現できるが、コードの書き換えが必要になる場合がある。

### 型定義ファイル

TypeScriptには型定義ファイル（.d.ts）の仕組みがあり、外部ライブラリの型情報を提供することができる。TypeScriptの型定義ファイルはDefinitelyTypedというリポジトリで管理されており、数千以上のライブラリの型定義が提供されている。Flowでもlibdefという形で型定義ファイルを利用できるが、TypeScriptほど充実しているとは言えない。

### ツールのサポート

TypeScriptは、Microsoft製の言語であるため、Visual Studio Code（VSCode）との統合が非常に良い。VSCodeでは、TypeScriptの型チェック、コード補完、リファクタリングなどの機能が優れている。また、TypeScriptは、Angular、Vue.js、Reactなどの人気フレームワークとの相性も良い。

一方、FlowはFacebookがメインでサポートしているため、WebStormやVSCodeなどのIDEでもサポートされているが、TypeScriptほどの広がりはない。ただし、FlowはReact Nativeの開発で使われることが多く、React Nativeとの相性は良いと言える。

参考：

- [静的型付けJavaScript：FlowとTypeScriptを徹底比較！](https://inside-alpha-media.com/%E9%9D%99%E7%9A%84%E5%9E%8B%E4%BB%98%E3%81%91javascript%EF%BC%9Aflow%E3%81%A8typescript%E3%82%92%E5%BE%B9%E5%BA%95%E6%AF%94%E8%BC%83%EF%BC%81/#toc7)

## どちらが主流か

主流となっているのはTypeScript

理由:

- トランスパイラとしても役割も果たすなど、型チェック以外の機能も充実している
- VS Codeとの統合が強力で開発体験が良い
- エコシステムが充実しており、コミュニティが活発
