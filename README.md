# TelloをNode.jsで操作するデモ

* [swarm.js](https://github.com/miya0001/tello-example/blob/master/swarm.js) - 2台のTelloを編隊飛行させる。
* [drone-controller.js](https://github.com/miya0001/tello-example/blob/master/drone-controller.js) - 1台のTelloをコントローラーとして、もう1台の別のTelloを操作する。

## 使い方

事前にTello EDUをStationモードに設定して、ソースコード内のIPアドレスを修正すること。

### セットアップ

```
$ git clone git@github.com:miya0001/tello-example.git
$ cd tello-example
$ npm install
```

### 実行

```
$ node swarm.js
```

または

```
$ node drone-controller.js
```