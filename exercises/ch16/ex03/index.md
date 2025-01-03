## AES(Advanced Encryption Satndard)

アメリカが2001年に標準暗号として定めた**共通鍵暗号**アルゴリズム。
**ブロック暗号**であり、ブロック長は128ビット、鍵長には128ビット・192ビット・256ビットの3種類が選択できる(鍵長が大きいほうが暗号強度が高い)

AES以前の標準暗号であったDES(Data Encryption Standard)では、以下の2点が問題であった。

- コンピュータの能力とネットワーク技術の上昇による相対的な強度の低下
- NSA(アメリカ国家安全保障)の関与がある設計の不透明性

そこで、新しい標準暗号がアメリカ国立標準技術研究所(NIST)の主導によって公募され、AESが選出された。  

## Base64

データを64種類の印字可能な英数字のみを用いて、それ以外の文字を扱うことの出来ない通信環境にてマルチバイト文字やバイナリデータを扱うためのエンコード方式。

MIME標準では、電子メールやHTTPでバイナリデータを安全に送るためにエンコード方式としてBase64が使用される。これは、電子メール(SMTP)やHTTPの初期仕様では、純粋な7ビットのASCIIテキストしか扱えなかったため。

Base64エンコーディングでは8ビット(1バイト)単位のデータを6ビット単位に変換するために、3バイト(24ビット)のデータを4つの6ビットに分割する。これにより文字数が3⇒4になるため、入力データの**サイズがエンコード後に約33%増加**する。

また、暗号化ではなく単なるエンコード方式であるため、**セキュリティ目的には不適**であることに注意が必要である。

## 参考

[Wikipedia - Advanced Encryption Standard](https://ja.wikipedia.org/wiki/Advanced_Encryption_Standard#cite_note-okamoto2002_51-4)

[Wikipedia - Base64](https://ja.wikipedia.org/wiki/Base64)