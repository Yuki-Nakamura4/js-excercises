## かつてhashbangが使用されていた理由

当時、検索エンジンはJavaScriptで生成されたコンテンツをクロールするのが難しかった。  
そこでGoogleが「#!」を「?_escaped_fragment_=」に変換してクロール可能にする仕様を公開したため、FacebookやLifehacker.comをはじめ各所で使われるようになった。

現在はHTML5のHistory APIを利用することでhash-bang URLを使わなくて済む。


参考:
[さらなる「#!」URL批判](https://karasuyamatengu.hatenadiary.org/entry/20110212/1297465199)

[XMLの第一人者Tim Bray氏「URLに#!入れるな」](https://gihyo.jp/dev/clip/01/orangenews/vol62/0005)