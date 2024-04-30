**予想**

5が出力される

**結果**

5が出力された

**説明**

- catchブロック内にbreakがあるが、この処理が移動する前にfinallyブロック内の処理が実行される。その結果、breakより前にcontinueが実行されることになるため、ループが続行される
- for文中のcontinueの場合インクメント式を評価してから次の繰り返し処理に進むため、ループごとにiの値が増えて最終的に6になり、条件外のためループが終了する。xに代入されるiの値は5までのため、console.log(x)は5が出力される

```
let x = 0;

for(let i = 1; i <= 5; i++) {
    x = i;
    try {
        throw Error();
    } catch {
        break;
    } finally {
        continue;
    }
}

console.log(x);
```
