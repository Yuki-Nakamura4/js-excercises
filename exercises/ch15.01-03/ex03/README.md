## 結果

1. `script.js`に`console.log("This is a secure script.");`とだけ記述し、`openssl`コマンドでファイルのハッシュを生成した。

2. `index.html`の`integrity`属性に生成したハッシュ値を設定した(先頭に`sha384-`や`sha256-`など使用したハッシュアルゴリズムを記述する必要がある)

3. `index.html`をブラウザで開く。コンソールに"This is a secure script."と表示されていることを確認する。

4. 次に、`script.js`の内容を改竄してみる。`console.log("This script has been tampered with.");`と書き換える。

5. `index.html`をブラウザで開く。コンソールに以下のエラーが表示されるようになった。

```
index.html:1 Failed to find a valid digest in the 'integrity' attribute for resource 'http://127.0.0.1:5500/exercises/ch15.01-03/ex03/script.js' with computed SHA-384 integrity 'bcFLxqtB4Tl/ETQ2fqadaVGLzhviND/+YEOpidU8/sUyGKQfj+sFJ9CALKq1lj22'. The resource has been blocked.
```

## どのような攻撃を防御できるか

このセキュリティ機能ではスクリプトが改竄されるとエラーが発生するため、スクリプトが作成者が意図した通りの状態で動作することを保証できる。
よって、クロスサイトスクリプティング(XSS)のような、悪意あるスクリプトを実行させることで被害を生むような攻撃を防ぐことができる。
