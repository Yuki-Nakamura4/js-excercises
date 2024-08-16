import * as fsPromises from "node:fs/promises";
import { join } from "node:path";

export function fetchFirstFileSize(path) {
  return fsPromises.readdir(path).then((files) => {
    if (files.length === 0) {
      return null;
    }
    return fsPromises.stat(join(path, files[0])).then((stats) => stats.size);
  });
}

export function fetchSumOfFileSizes(path) {
  return fsPromises.readdir(path).then((files) => {
    const statsPromises = files.map((file) =>
      fsPromises.stat(join(path, file))
    );
    return Promise.all(statsPromises).then((stats) =>
      stats.reduce((total, stat) => total + stat.size, 0)
    );
  });
}
