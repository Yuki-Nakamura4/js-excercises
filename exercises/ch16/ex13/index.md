# 問題 16.13

## 1. `node path/to/shell.js` と実行してみなさい

コマンド入力を促すプロンプトが表示された。

## 2. プログラム中の `FIXME` という箇所を修正しパイプやリダイレクトを実装しなさい

指定されたファイル(cmd.file)に書き込むための書き込みストリーム(outStream)を作成し、コマンドの出力が outStream に書き込まれるように設定している。

```javascript
    case ">": // RedirCmd
      {
        // cmd.file のストリームを createWriteStream で作成し runcmd を再帰的に呼び出す
        const outStream = fs.createWriteStream(cmd.file);
        await runcmd(cmd.cmd, stdin, outStream);
      }
      break;
```

指定されたファイル (cmd.file) から読み取るための読み取りストリーム(inStream)を作成し、コマンドの入力が inStream から読み取られるように設定している。

```javascript
    case "<": // RedirCmd
      {
        // cmd.file のストリームを createReadStream で作成し runcmd を再帰的に呼び出す
        const inStream = fs.createReadStream(cmd.file);
        await runcmd(cmd.cmd, inStream, stdout);
      }
      break;
```

PassThroughストリームは、入力されたデータをそのまま出力するストリーム。
左側のコマンドの出力をpassThroughストリームに接続し、それを右側のコマンドの入力に接続することでリダイレクトを実装している。

```javascript
    case "|": // PipeCmd
      {
        // cmd.left と cmd.right に対して runcmd を再帰的に呼び出し Promise.all で待つ
        // left と right を繋ぐには new PassThrought() で作成したストリームを使用する
        const passThrough = new PassThrough();
        await Promise.all([
          runcmd(cmd.left, stdin, passThrough),
          runcmd(cmd.right, passThrough, stdout),
        ]);
      }
      break;
```
