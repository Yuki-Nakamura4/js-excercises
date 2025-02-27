## Graceful Shutdown

システムやアプリケーションが停止する際に、現在進行中のタスクや接続を安全に終了させ、データの整合性やサービスの信頼性を保つために行う手続き。

KubernetesやAmazon ECSなどのDockerランタイム上でコンテナのGraceful Shutdownのために送信されるシグナルは `SIGTERM`

## SIGTERM(終了要求シグナル)

Graceful Shutdownを開始するためのシグナル。アプリケーションに対して終了準備（リクエスト処理の停止、リソース解放など）を行う時間を与える。コンテナ内のプロセスがこのシグナルをキャッチして適切な処理を実装することが推奨される。

なお、指定された猶予期間中にプロセスが終了しなければ、 `SIGKILL`を送信して即時終了する。

参考：入門：[グレースフルシャットダウン](https://zenn.dev/loglass/articles/348886ded0f0bd)
