# ch16/ex05

## 設問1

### 標準入力 (Standard Input, stdin)

プログラムが外部からデータを受け取るためのデフォルトの入力ストリーム。  
通常、キーボードからの入力が標準入力に送られる。

### 標準出力 (Standard Output, stdout)

説明: 標準出力は、プログラムがデータを出力するためのデフォルトの出力ストリーム。  
通常、コンソールやターミナルに表示される。
たとえば、`console.log`のメッセージは標準出力に表示される。

### 標準エラー出力 (Standard Error, stderr)

エラーメッセージや診断情報を出力するためのデフォルトの出力ストリーム。 
標準出力とは別に扱われる。
たとえば、`console.error`のメッセージは標準エラー出力に表示される。

### リダイレクト (Redirection)

標準入力、標準出力、標準エラー出力を別の場所(ファイルや別のコマンド)に送る操作。
たとえば、`node script.js > output.txt`は、標準出力の結果をoutput.txtファイルに書き込む。

### パイプ (Pipe)

あるコマンドの出力を別のコマンドの入力として渡す機能。  
複数のコマンドを連結して実行する際に使用される。  
たとえば、 `cat file.txt | grep "search"`は、`file.txt`の内容を`grep`コマンドに渡して検索する。

## 設問2

### `node cat.mjs`

予想： 標準入力に入力した内容がそのまま表示される。

結果：予想通り。

### `echo FOO | node cat.mjs`

予想： `FOO`と出力される。  
左のコマンドの標準出力結果`FOO`がパイプで右のコマンドに渡され、それがそのまま出力される。

結果：予想通り。

### `node cat.mjs > output.txt`

予想： 標準入力に入力した内容が`output.txt`に書き込まれる。  
左のコマンドは引数が無いため標準入力の内容がそのまま標準出力に表示されるが、左の標準出力先は`output.txt`にリダイレクトされているので、ファイルに文字が書きこまれていく。

結果：予想通りだったが、日本語を入力するとファイルでは文字化けしていた。  
VS Codeの画面右下に表示されるファイルのエンコーディングを見たところ`UTF-16 LE`となっていた。  
[PowerShellの既定のエンコードが`Unicode UTF-16LE`](https://learn.microsoft.com/ja-jp/powershell/module/microsoft.powershell.core/about/about_character_encoding?view=powershell-7.4)らしいので、そのせいだと思われる。

### `node cat.mjs file`

予想：指定したファイルの内容が標準出力(コンソール)に表示される。

結果：予想通りだったが、こちらは文字化けしなかった。  

### `node cat.mjs file > output.txt`

予想：指定したファイルの内容が`output.txt`に書き込まれる。

結果：予想通りだったが、日本語部分が文字化けしていた。

### `node cat.mjs invalid-file > output.txt`

予想：ファイルが存在しないのでエラーになる。

結果：予想通りだったが、`output.txt`は空になって更新されていた。  
エラーが発生してもそこで止まらず、空の標準出力が`output.txt`にリダイレクトされているよう。

### `node cat.mjs invalid-file 2> error.txt`

予想：エラー内容が`error.txt`に書き込まれる。  
標準エラー出力をファイルにリダイレクトしているため。

結果：予想通り。
