import fs from "fs/promises";
import path from "path";

export async function* walk(rootPath) {
  const stack = [rootPath];

  while (stack.length > 0) {
    const currentPath = stack.shift();
    const stats = await fs.stat(currentPath);

    if (stats.isDirectory()) {
      yield { path: path.relative(rootPath, currentPath), isDirectory: true };
      const directoryContents = await fs.readdir(currentPath);
      for (const content of directoryContents) {
        stack.push(path.join(currentPath, content));
      }
    } else {
      yield { path: path.relative(rootPath, currentPath), isDirectory: false };
    }
  }
}
