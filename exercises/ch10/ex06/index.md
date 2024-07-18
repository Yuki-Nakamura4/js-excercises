## 予想

- importしたファイルは巻き上げられて最初に実行される
- import文はimportされた順に実行される
- 同じファイルを複数回importすると最初の1回のみ実行される

## 結果

```
Module 1 is executed.
Module 2 is executed.
Start of index.js
Middle of index.js
End of index.js
```

- importしたファイルは巻き上げられて最初に実行された
- import文はimportされた順に実行された
- 同じファイルを複数回importすると最初の1回のみ実行された
