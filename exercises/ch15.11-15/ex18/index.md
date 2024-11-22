# Webアプリケーションがユーザの機密情報をセキュアに扱うためにはどのようなことが必要か

- HTTPSなどのプロトコルを用いて通信を暗号化する
- XSSやSQLインジェクションを防ぐため、適切なサニタイズ処理を行う
- セッションIDをCookieに保存する際にHttpOnly属性やSecure属性を設定する
  - HttpOnly属性：JavaScriptからCookieにアクセスできなくする
  - Secure属性：CookieがHTTPS接続を介してのみ送信されるようにする
- CSP(Content Security Policy)を設定し、ウェブサイトが特定の種類のリソースをどのソースから読み込むことができるかを制御する
- 多要素認証(MFA)を導入する
