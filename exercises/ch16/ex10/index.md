# 大きな `file.txt` に対し `fs.createReadStream` を利用した場合と `fs.read` を利用した場合でメモリ使用量の違い

RSS (Resident Set Size): プロセスが使用している物理メモリの総量
HeapTotal: JavaScriptヒープの総量
HeapUsed: 使用中のJavaScriptヒープの量
External: V8エンジン外で使用されているメモリの量

## `fs.createReadStream`

`readStream.js`  
Memory Usage: RSS=53088256, HeapTotal=8585216, HeapUsed=6793280, External=16395342

## `fs.read`

`read.js`
Memory Usage: RSS=144097280, HeapTotal=6111232, HeapUsed=3548312, External=105402684

## 結果

`fs.read`の方がメモリの使用量が高くなった。
`fs.createReadStream`はストリーミングで漸次的にファイルを読み込むため、メモリへの負荷を軽減することができる。
