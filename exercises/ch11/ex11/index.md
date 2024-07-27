## JavaScriptの最適化

JavaScriptエンジンは、コードの実行速度を向上させるために様々な最適化を行う。今回の場合、エンジンは"Hello".lengthがループ内で変化しないことを検出し、その結果をキャッシュするか、またはループの外に移動させる（hoistする）。その結果、実際の"Hello".lengthの計算がループの各イテレーションで行われないため、予想よりもはるかに短い時間が測定される。

> ## Loop-invariant code motion
>
> There are many ways for an optimizing compiler to spoil your calculations. One of them is the loop-invariant code motion usually abbreviated as LICM. This optimization identifies expressions that produce **the same value on all loop iterations and hoists them out of the loop**.

> In fact many JavaScript programmers are actually performing LICM by hand when they manually move array.length expression out of the loop condition and keep in the temporary variable during iteration.

**出典**: [microbenchmarks fairy tale](https://mrale.ph/blog/2012/12/15/microbenchmarks-fairy-tale.html)
