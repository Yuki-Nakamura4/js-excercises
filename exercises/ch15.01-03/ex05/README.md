## index.html1

2, 3, 4でHelloが表示された。

defer属性を使用するとスクリプトの読み込みを非同期に行うことができ、かつスクリプトはHTMLのパースが完了した後に実行されるため、HTMLの表示に影響を与えない。
このため、表示速度が向上する。

asyncの場合もスクリプトの読み込みは非同期に行われるが、実行はダウンロードが完了したものから順に行われる。
そのため、スクリプトの実行順序は保証されず、jQueryのロードよりも前にスクリプトが実行されてしまう可能性があり、上手くいかない。

また、`document.addEventListener("DOMContentLoaded", () => {})`で囲むと、その処理をDOMが完全に構築された後に実行するようにできる。
スクリプトがHTMLのパースをブロックしないため、表示速度が向上する。

`window.addEventListener("load", () => {})`の場合は、DOMだけでなく画像や外部リソースなど、ページ内のすべてのリソースの読み込みが完了するまで待つ。
今回の場合はそのようなリソースがないので、"DOMContentLoaded"のときと同様に表示速度が向上する。

## index.html2

1, 2, 3, 4でHelloが表示された。

`defer="true"`にした場合、前述したようにHTMLのパースを待つため、Helleの表示が適切に行われる。

`async="true"`の場合は、HTMLのパースが終わる前にjsファイルの読み込みが終わった場合はそちらが先に実行されてしまう可能性があるが、今回はHelloが適切に表示されていた。jsファイルが読み込みが終わる前にHTMLのパースが完了したのだと思われる。

また、`document.addEventListener("DOMContentLoaded", () => {})`や`window.addEventListener("load", () => {})`で囲んだ場合も、`index.html1`と同様にHelloが適切に表示された。
