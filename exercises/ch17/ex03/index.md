# ch17/ex03

## npxとは

Node Package eXecuteの略。npmパッケージを簡単に実行するためのツール

## npxの利点

### 環境を汚さない

npxでは使いたいパッケージのインストール + 実行 + アンインストールをまとめて行う。
つまり、npxを利用すると**環境を汚さずに任意のコードを実行できる**。

### ローカルにインストールされたパッケージを簡単に実行できる

ローカルインストールしたパッケージを実行する際にパスを省略できる。  
通常、ローカルにインストールされたパッケージの実行ファイルを実行するには、`node_modules/.bin`ディレクトリをフルパスで指定する必要があるが、 npxを使用すると、ローカルにインストールされたパッケージの実行ファイルをフルパスを指定せずに実行できる。

例えば、eslintをローカルにインストールした場合、以下のように実行できる

```sh
npx eslint .
```

## いつ使うべきか

- パッケージを一度しか実行する必要が無いとき
- 実験的にパッケージを実行したいとき
- ローカルにインストールしたパッケージを簡単に実行したいとき

参考：

- [npx](https://docs.npmjs.com/cli/v10/commands/npx)
- [How Does npx Actually Work and When to Use It](https://dev.to/orlikova/understanding-npx-1m4)
- [【npmとnpxの違い】便利なnpxについて理解する](https://www.geeklibrary.jp/counter-attack/npx/)
