import * as fsPromises from "node:fs/promises";
import { join } from "node:path";

export async function fetchSumOfFileSizes(path) {
  const files = await fsPromises.readdir(path);
  const statsPromises = files.map((file) => fsPromises.stat(join(path, file)));
  const stats = await Promise.all(statsPromises);
  return stats.reduce((total, stat) => total + stat.size, 0);
}
