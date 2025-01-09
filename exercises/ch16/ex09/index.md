## Express

Node.js用のウェブアプリケーションフレームワーク。ウェブサーバーやAPIを構築するために使用される。  
Expressで処理を抽象化することで、もともと命令的に記述していた一連のコードをより宣言的でシンプルに書くことができる。

たとえば、元々のルーティング処理は以下のようにURLのパス部分をパースして変数に代入し、その変数(エンドポイント)を文字列と比較していた。

```javascript
const endpoint = url.parse(request.url).pathname;

        if (endpoint === "/test/mirror") {
```

一方で、Expressを用いた場合、以下のように `app.use()`の第一引数にパスを指定することで、特定のパスに一致するリクエストに対する処理を記述することができる。

```javascript
    app.use('/test/mirror', (req, res) => {
```

このように、Expressは低レベルな処理を隠蔽してくれるため、開発者は高レベルなロジックに集中することができる。

## supertest

Node.jsのアプリケーションのHTTPリクエストをテストするためのライブラリ。  
特に、ExpressなどのHTTPサーバーをテストする際に使われる。
