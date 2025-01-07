# 問題 16.1

## マルチスレッド

コンピュータプログラムやプロセスが同時に複数の「スレッド」を実行する技術や手法。
スレッドは、プロセス内で実行される最小の実行単位であり、同一プロセス内の複数のスレッドはメモリやリソースを共有しながら並行して動作する。

以下のメリットがある。

- 並行処理が可能：マルチスレッドを用いることで、プログラムは複数のタスクを同時に実行できる。たとえば、ユーザーインターフェースの応答性を保ちながらバックグラウンドでデータ処理を行うことが可能になる
- 共有メモリ：複数のスレッドが同じプロセス内で動作するため、メモリやその他のリソースを共有しやすい。これにより、リソースの消費を抑えつつ高いパフォーマンスを実現できる
  - 別のプロセス間で通信する場合、データをシリアライズして共有メモリやメッセージキューを経由する必要があるが、スレッド間では単にポインタや参照を渡すだけで済む
- 軽量：スレッドはプロセスに比べて生成や切り替えが軽量であるため、オーバーヘッドが少なく高速に動作する

しかし、スレッド管理が複雑、デバッグが困難、など、マルチスレッドのプログラミングは非常に難しいとされている。

## スクリプト実行結果

- 実行時にスレッド数を指定したが、リソースモニターのnode.exeのスレッド数はそれより多かった
- スレッド数を1増やすと、リソースモニターのnode.exeのスレッド数も1増えた

node mFib.js 45 4
Worker 2 execution time: 1.972s
Worker 0 execution time: 2.900s
Worker 3 execution time: 4.521s
Worker 1 execution time: 6.578s
Total execution time: 6.584s
Fibonacci number: 1836311902

リソースモニターはスレッド：20

node mFib.js 45 5
Worker 1 execution time: 1.201s
Worker 0 execution time: 1.840s
Worker 2 execution time: 2.883s
Worker 3 execution time: 4.358s
Worker 4 execution time: 6.576s
Total execution time: 6.583s
Fibonacci number: 1836311902

リソースモニターはスレッド：21

node mFib.js 45 6
Worker 0 execution time: 800.606ms
Worker 2 execution time: 1.250s
Worker 3 execution time: 1.728s
Worker 4 execution time: 2.819s
Worker 5 execution time: 4.155s
Worker 1 execution time: 5.897s
Total execution time: 5.901s
Fibonacci number: 1836311902

リソースモニターはスレッド：22

## PCのCPUスペック

12th Gen Intel(R) Core(TM) i7-1265U

コア数：10  
論理プロセッサ数：12

### コア

CPU内で実際に計算や処理を行う物理的なユニット

### 論理プロセッサ

CPUの各コアが仮想的に持つスレッド。「ハイパースレッディング」という技術により、1つの物理コアが複数の論理プロセッサとして動作することが可能になる

## 適切なスレッド数について

論理プロセッサ数の上限に合わせた12スレッドが最適だと思われる。
項数47で試したとき、12スレッドが最速だった。  
しかし、スレッド数をコア数上限の10にしたときの方が実行時間が短かったときもあった。

### 10スレッド

node mFib.js 45 10
Total execution time: 5.768s

node mFib.js 45 10
Total execution time: 5.898s

node mFib.js 47 10
Total execution time: 16.694s

### 12スレッド

node mFib.js 45 12
Total execution time: 5.793s

node mFib.js 45 12
Total execution time: 5.828s

node mFib.js 47 12
Total execution time: 16.566s

### 14スレッド

node mFib.js 45 14
Total execution time: 6.084s

node mFib.js 45 14
Total execution time: 5.886s

node mFib.js 47 14
Total execution time: 18.720s
