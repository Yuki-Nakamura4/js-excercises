倍精度浮動小数点型数値は仮数部を表わすのに 52 ビットしかないため、安全に表現できる整数は -(2^53 – 1) と 2^53 – 1 との間
この文脈で示している「安全」とは、整数を正確に表現し、正しく比較する能力を指す
Number.MAX_SAFE_INTEGER + 1 === Number.MAX_SAFE_INTEGER + 2 は、数学的には不正確だが true と評価される

参考:
Number.MAX_SAFE_INTEGER - JavaScript - MDN Web Docs
https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Number/MAX_SAFE_INTEGER


整数値 2^53 + 1 は直接 IEEE-754 では表現できず、四捨五入や切り捨ての丸めによって 2^53 になってしまう

参考:
Number.isSafeInteger() - JavaScript - MDN Web Docs
https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Number/isSafeInteger


ちなみにJavaなどにおけるint型の最大値は 2^31 - 1 (2,147,483,647) であり、最小値は -2^31
最近睡眠時間管理アプリ「ポケモンスリープ」にて、ゲーム内の「ねむけパワー」の値が21億4748万3647を超えると、数値表示がマイナスになってしまう不具合が発生した

参考:
『ポケモンスリープ』「ねむけパワーが21億4748万3647超でマイナスになる」不具合になぜか“見覚えある”との声あがる。一部の人にやたら馴染み深い数値でマイナスに
https://automaton-media.com/articles/newsjp/20240330-287967/


JavaScriptとJavaの整数値の範囲の違いは、それぞれの言語が異なる数値型を使用していることに起因する。

JavaScript:
JavaScriptのNumber型はIEEE 754倍精度浮動小数点数を使用している。これは、64ビットの浮動小数点数で仮数部を表わすのに 52 ビットしかない。

Java:
Javaのint型は32ビット符号付き整数で、範囲は約-2,147,483,648から2,147,483,647まで。Javaは整数と浮動小数点数を別々の型で扱う。
そのため、整数型（int、longなど）と浮動小数点数型（float、doubleなど）の範囲は異なる。

以上のような違いから扱える整数値の範囲も異なる。

参考:
倍精度浮動小数点数
https://ja.wikipedia.org/wiki/%E5%80%8D%E7%B2%BE%E5%BA%A6%E6%B5%AE%E5%8B%95%E5%B0%8F%E6%95%B0%E7%82%B9%E6%95%B0