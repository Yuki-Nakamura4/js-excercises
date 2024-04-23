**void関数とは**
引数に何を渡しても必ずundefinedを返す関数
void関数は非常に単純な関数で、「真のundefined」を取得する事を目的に作られている


**なぜ古いJavaScriptコードで`void 0`を使うか**

かつてのJavaScriptではundefinedは自由に上書き可能であったため

```js
console.log( undefined ); // undefined
let undefined = 123;
console.log( undefined ); // 古いjsエンジンだと、「123」と表示される
```

「定義されていない」という事を表すundefinedを勝手に上書きされてしまったら、定義されていないかどうか判別するのにいちいちtypeof演算子を利用しないといけなくなってしまう。そのため、void関数で真のundefinedを取得するようにしていた。


**なぜ今は`void 0`と書かないのか**

- ES5からグローバル変数undefinedは書き換え不可能となったため
- undefinedと書いたほうが直感的で可読性が高いため