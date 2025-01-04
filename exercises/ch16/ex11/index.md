# 問題 16.11

16379台目のクライアントでエラーになった。

```sh
Client 16379 error: Error: connect EAGAIN ::1:3000 - Local (:::0)
    at internalConnect (node:net:1100:16)
    at defaultTriggerAsyncIdScope (node:internal/async_hooks:462:18)
    at GetAddrInfoReqWrap.emitLookup [as callback] (node:net:1381:9)
    at GetAddrInfoReqWrap.onlookup [as oncomplete] (node:dns:109:8) {
  errno: -35,
  code: 'EAGAIN',
  syscall: 'connect',
  address: '::1',
  port: 3000
}
```

`EAGAIN`は、プロセスの過多や一時的なメモリ不足が原因で発生するシステムコールエラーらしい。よって、エラーの原因は接続台数過多によるメモリ不足が原因だと考えられる。
