// 教科書のコードそのまま

/* 
/* キャンバスや画像の矩形を表すクラス。
/* Tileを使ってキャンバスを領域に分割し、ワーカーが独立して処理できるようにする。  
*/
class Tile {
  // プロパティは、大きな矩形の中でのTileの位置とサイズを表す
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  // 指定された幅と高さの矩形を、指定された行と列に分解し、
  // その矩形を覆うように、numRows行*numCols列のTileを生成するジェネレータ
  static *tiles(width, height, numRows, numCols) {
    const columnWidth = Math.ceil(width / numCols);
    const rowHeight = Math.ceil(height / numRows);

    for (let row = 0; row < numRows; row++) {
      // Math.ceilしているので、最後の行が他の行より小さいことがある。
      // 例：height=100, numRows=3の場合、rowHeight=34, 34, 32
      for (let col = 0; col < numCols; col++) {
        const tileHeight =
          row < numRows - 1
            ? rowHeight // 行の高さ
            : height - rowHeight * (numRows - 1); // 最後の行の高さ。全体の高さから他の行の高さを引く
        const tileWidth =
          col < numCols - 1 ? columnWidth : width - columnWidth * (numCols - 1);
        yield new Tile(
          col * columnWidth,
          row * rowHeight,
          tileWidth,
          tileHeight
        );
      }
    }
  }
}

/* 
/* 同じコードを実行するワーカープールを表すクラス。
/* 指定したワーカーコードは、受信した各メッセージに応答して何らかの計算を行い、
/* その計算結果を1つのメッセージとして送信する。
/* 
/* WorkerPoolと実行する作業を表すメッセージがあれば、
/* メッセージを引数としてaddWork()メソッドを呼び出すだけ。
/* 現在アイドル状態のWorkerオブジェクトがあれば、メッセージはすぐにそのワーカーに送信される。
/* アイドル状態のワーカーがない場合は、メッセージはキューに入れられ、
/* そのワーカーが利用可能になったときに送信される。
/*
/* addWork()メソッドはPromiseを返す。このPromiseはワーカーから受け取ったメッセージで解決する。
/* または、ワーカーが未処理のエラーをスローした場合は失敗する。
*/
class WorkerPool {
  constructor(numWorkers, workerSource) {
    this.idleWorkers = []; // 現在処理を行っていないワーカー
    this.workQueue = []; // 現在処理されていない作業
    this.workerMap = new Map(); // ワーカーと解決・失敗時の処理をマッピングする

    // 指定した数のワーカーを作成し、メッセージハンドラとエラーハンドラを設定する
    // その後、idleWorkers配列に保存する
    for (let i = 0; i < numWorkers; i++) {
      let worker = new Worker(workerSource);
      worker.onmessage = (message) => {
        this._workerDone(worker, null, message.data);
      };
      worker.onerror = (error) => {
        this._workerDone(worker, error, null);
      };
      this.idleWorkers[i] = worker;
    }
  }

  // ワーカーがメッセージを送信したり、エラーをスローしたりして、
  // 処理を終了したときに呼び出される
  _workerDone(worker, error, response) {
    // このWorkerのresolve()とreject()関数を検索し、
    // マップからこのワーカーのエントリを削除する
    const [resolver, rejector] = this.workerMap.get(worker);
    this.workerMap.delete(worker);

    if (this.workQueue.length === 0) {
      this.idleWorkers.push(worker);
    } else {
      const [work, resolver, rejector] = this.workQueue.shift();
      this.workerMap.set(worker, [resolver, rejector]);
      worker.postMessage(work);
    }

    error === null ? resolver(response) : rejector(error);
  }

  addWork(work) {
    return new Promise((resolve, reject) => {
      if (this.idleWorkers.length > 0) {
        let worker = this.idleWorkers.pop();
        this.workerMap.set(worker, [resolve, reject]);
        worker.postMessage(work);
      } else {
        this.workQueue.push([work, resolve, reject]);
      }
    });
  }
}

/* 描画に必要な状態情報を保持するクラス。
/* cxとcyyプロパティは、画像の中心となる不起訴平面上の点を示す。
/* perPixelプロパティには、複素数の十数部と虚数部が画像のピクセルごとにどれだけ変化するかを指定する。
/* maxIterationsプロパティは、集合を計算するためにどれだけ処理を行うかを指定する。
/* 数値が大きいほど計算量は多くなるが、くっきりとした画像が得られる。
/*
/* このクラスのオブジェクトは、history.pushState()で使われる。
/* このオブジェクトを使って、ブックマークされたURLやシェアされたURLから必要な状態を読み取る。
*/
class PageState {
  static initialState() {
    const s = new PageState();
    s.cx = -0.5;
    s.cy = 0;
    s.perPixel = 3 / window.innerHeight;
    s.maxIterations = 2000;
    return s;
  }

  static fromURL(url) {
    const s = new PageState();
    const u = new URL(url);
    s.cx = parseFloat(u.searchParams.get("cx"));
    s.cy = parseFloat(u.searchParams.get("cy"));
    s.perPixel = parseFloat(u.searchParams.get("pp"));
    s.maxIterations = parseInt(u.searchParams.get("it"));

    return isNaN(s.cx) ||
      isNaN(s.cy) ||
      isNaN(s.perPixel) ||
      isNaN(s.maxIterations)
      ? null
      : s;
  }

  toURL() {
    const u = new URL(window.location);
    u.searchParams.set("cx", this.cx);
    u.searchParams.set("cy", this.cy);
    u.searchParams.set("pp", this.perPixel);
    u.searchParams.set("it", this.maxIterations);
    return u.href;
  }
}

const ROWS = 9,
  COLS = 12,
  NUMWORKERS = navigator.hardwareConcurrency || 2;

class MandelbrotCanvas {
  constructor(canvas) {
    this.canvas = canvas;
    this.context = canvas.getContext("2d");
    this.workerPool = new WorkerPool(NUMWORKERS, "worker.js");

    this.tiles = null;
    this.pendingRender = null;
    this.wantsRerender = false;
    this.resizeTimer = null;
    this.colorTable = null;

    this.canvas.addEventListener("pointerdown", (e) => this.handlePointer(e));
    window.addEventListener("keydown", (e) => this.handleKey(e));
    window.addEventListener("resize", (e) => this.handleResize(e));
    window.addEventListener("popstate", (e) => this.setState(e.state, false));

    this.state = PageState.fromURL(window.location) || PageState.initialState();
    history.replaceState(this.state, "", this.state.toURL());

    this.setSize();
    this.render();
  }

  setSize() {
    this.width = this.canvas.width = window.innerWidth;
    this.height = this.canvas.height = window.innerHeight;
    this.tiles = [...Tile.tiles(this.width, this.height, ROWS, COLS)];
  }

  setState(f, save = true) {
    if (typeof f === "function") {
      f(this.state);
    } else {
      for (let property in f) {
        this.state[property] = f[property];
      }
    }
    this.render();

    if (save) {
      history.pushState(this.state, "", this.state.toURL());
    }
  }

  render() {
    if (this.pendingRender) {
      this.wantsRender = true;
      return;
    }

    let { cx, cy, perPixel, maxIterations } = this.state;
    let x0 = cx - (perPixel * this.width) / 2;
    let y0 = cy - (perPixel * this.height) / 2;

    let promises = this.tiles.map((tile) =>
      this.workerPool.addWork({
        tile: tile,
        x0: x0 + tile.x * perPixel,
        y0: y0 + tile.y * perPixel,
        perPixel: perPixel,
        maxIterations: maxIterations,
      })
    );

    this.pendingRender = Promise.all(promises)
      .then((responses) => {
        let min = maxIterations,
          max = 0;
        for (let r of responses) {
          console.log(r);
          if (r.min < min) min = r.min;
          if (r.max > max) max = r.max;
        }
        if (!this.colorTable || this.colorTable.length !== maxIterations + 1) {
          this.colorTable = new Uint32Array(maxIterations + 1);
        }

        if (min === max) {
          if (min === maxIterations) {
            this.colorTable[min] = 0xff000000;
          } else {
            this.colorTable[min] = 0;
          }
        } else {
          let maxlog = Math.log(1 + max - min);
          for (let i = min; i <= max; i++) {
            this.colorTable[i] =
              Math.ceil((Math.log(1 + i - min) / maxlog) * 255) << 24;
          }
        }

        for (let r of responses) {
          let iterations = new Uint32Array(r.imageData.data.buffer);
          for (let i = 0; i < iterations.length; i++) {
            iterations[i] = this.colorTable[iterations[i]];
          }
        }

        this.canvas.style.transform = "";
        for (let r of responses) {
          this.context.putImageData(r.imageData, r.tile.x, r.tile.y);
        }
      })
      .catch((reason) => {
        console.error("Promise rejected in render():", reason);
      })
      .finally(() => {
        this.pendingRender = null;
        if (this.wantsRender) {
          this.wantsRender = false;
          this.render();
        }
      });
  }
  handleResize(event) {
    if (this.resizeTimer) clearTimeout(this.resizeTimer);
    this.resizeTimer = setTimeout(() => {
      this.resizeTimer = null;
      this.setSize();
      this.render();
    }, 200);
  }

  handleKey(event) {
    switch (event.key) {
      case "Escape":
        this.setState(PageState.initialState());
        break;
      case "+":
        this.setState((s) => {
          s.maxIterations = Math.round(s.maxIterations * 1.5);
        });
        break;
      case "-":
        this.setState((s) => {
          s.maxIterations = Math.round(s.maxIterations / 1.5);
          if (s.maxIterations < 1) s.maxIterations = 1;
        });
        break;
      case "o":
        this.setState((s = s.perPixel *= 2));
        break;
      case "ArrowUp":
        this.setState((s) => (s.cy -= (this.height / 10) * s.perPixel));
        break;
      case "ArrowDown":
        this.setState((s) => (s.cy += (this.width / 10) * s.perPixel));
        break;
      case "ArrowLeft":
        this.setState((s) => (s.cx -= (this.width / 10) * s.perPixel));
        break;
      case "ArrowRight":
        this.setState((s) => (s.cx += (this.width / 10) * s.perPixel));
        break;
    }
  }

  handlePointer(event) {
    const x0 = event.clientX,
      y0 = event.clientY,
      t0 = Date.now();
    const pointerMoveHandler = (event) => {
      let dx = event.clientX - x0,
        dy = event.clientY - y0,
        dt = Date.now() - t0;
      if (dx > 10 || dy > 10 || dt > 500) {
        this.canvas.style.transform = `translate(${dx}px, ${dy}px)`;
      }
    };

    const pointerUpHandler = (event) => {
      this.canvas.removeEventListener("pointermove", pointerMoveHandler);
      this.canvas.removeEventListener("pointerup", pointerUpHandler);

      const dx = event.clientX - x0,
        dy = event.clientY - y0,
        dt = Date.now() - t0;
      const { cx, cy, perPixel } = this.state;

      if (dx > 10 || dy > 10 || dt > 500) {
        this.setState({ cx: cx - dx * perPixel, cy: cy - dy * perPixel });
      } else {
        let cdx = x0 - this.width / 2;
        let cdy = y0 - this.height / 2;

        this.canvas.style.transform = `translate(${-cdy * 2}px, ${
          -cdy * 2
        }px) scale(2)`;
        this.setState((s) => {
          s.cx += cdx * s.perPixel;
          s.cy += cdy * s.perPixel;
          s.perPixel /= 2;
        });
      }
    };
    this.canvas.addEventListener("pointermove", pointerMoveHandler);
    this.canvas.addEventListener("pointerup", pointerUpHandler);
  }
}

// canvasを設定する。このJavaScriptファイルは自己完結している。
// HTMLファイルには<script>タグだけを記述すれば良い
const canvas = document.createElement("canvas");
document.body.append(canvas);
document.body.style = "margin:0";
canvas.style.width = "100%";
canvas.style.height = "100%";
new MandelbrotCanvas(canvas);
