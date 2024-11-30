# 実際のサービスにおけるCORSの設定

ブラウザのデベロッパーツールのネットワークタブから、楽天の認証ページにおいて発生していたプリフライトリクエスト(OPTIONSメソッドの通信)を確認した。

## access-control-allow-headers

Content-Type,Content-Length,Accept-Encoding,X-CSRF-Token,Authorization,X-Max,X-Tt-Client-Version,X-Tt-Client-Type,X-Tt-System-Version,X-Tt-Release-Version,X-Tt-Request-ID,X-Tt-User-Type

## access-control-allow-methods

GET,POST,DELETE,PUT,PATCH

## access-control-allow-origin

`*`
