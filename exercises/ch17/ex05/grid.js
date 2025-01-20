export const ROWS = 50;
export const COLS = 50;
export const RESOLUTION = 10;

// grid を canvas に描画する
export function renderGrid(grid, ctx) {
  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      const cell = grid[row][col];
      ctx.beginPath();
      ctx.rect(col * RESOLUTION, row * RESOLUTION, RESOLUTION, RESOLUTION);
      ctx.fillStyle = cell ? "black" : "white";
      ctx.fill();
      ctx.stroke();
    }
  }
}

// Life Game のルールに従ってセルを更新する
export function updateGrid(grid) {
  // 新しいグリッドを作成
  const nextGrid = grid.map((arr) => [...arr]);

  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      // 周囲のセルの生存数を数えて nextGrid[row][col] に true or false を設定する
      let liveNeighbors = 0;
      for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
          if (i === 0 && j === 0) {
            continue;
          }
          const newRow = row + i;
          const newCol = col + j;
          if (newRow >= 0 && newRow < ROWS && newCol >= 0 && newCol < COLS) {
            liveNeighbors += grid[newRow][newCol] ? 1 : 0;
          }
        }
      }

      if (grid[row][col]) {
        // 生きているセル
        if (liveNeighbors < 2 || liveNeighbors > 3) {
          // 2個未満なら過疎、3個より多ければ過密で死亡
          nextGrid[row][col] = false;
        }
      } else {
        // 死んでいるセル
        if (liveNeighbors === 3) {
          // ちょうど3つの生きているセルが隣接していれば再生
          nextGrid[row][col] = true;
        }
      }
    }
  }
  return nextGrid;
}