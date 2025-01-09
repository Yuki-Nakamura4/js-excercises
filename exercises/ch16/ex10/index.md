# 大きな `file.txt` に対し `fs.createReadStream` を利用した場合と `fs.read` を利用した場合でメモリ使用量の違い

RSS (Resident Set Size): プロセスが使用している物理メモリの総量
HeapTotal: JavaScriptヒープの総量
HeapUsed: 使用中のJavaScriptヒープの量
External: V8エンジン外で使用されているメモリの量

## `fs.createReadStream`

`readStream.js`  
Memory Usage: RSS=53088256, HeapTotal=8585216, HeapUsed=6793280, External=16395342

## `fs.read`

`readBuffer.js`  
Memory Usage: RSS=34295808, HeapTotal=7798784, HeapUsed=6008696, External=1520872

## 結果

`readStream.js`の方がメモリの使用量が高くなった。
