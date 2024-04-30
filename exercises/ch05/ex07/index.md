**予想**

falseが返る

**結果**

falseが返った

**説明**
「return文やcontinue文、break文で処理がtryブロックから移動する場合は、処理が移動する前にfinallyブロックが実行される」(p.131)ため。

```
function f() {
    try {
        return true;
    } finally {
        return false;
    }
}

console.log(f());
```
