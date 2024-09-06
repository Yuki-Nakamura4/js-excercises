import path from 'path';
import { walk } from './index';

test('walk function', async () => {
  const generator = walk("./ch13/ex13/test");
  const results = [];

  for await (const item of generator) {
    results.push(item);
  }

  expect(results).toEqual([
    { path: "", isDirectory: true },
    { path: "dir1", isDirectory: true },
    { path: path.normalize("dir1/file1.txt"), isDirectory: false },
    { path: path.normalize("dir1/file2.txt"), isDirectory: false },
    { path: "dir2", isDirectory: true },
    { path: path.normalize("dir2/file3.txt"), isDirectory: false },
    { path: path.normalize("dir2/file4.txt"), isDirectory: false },
  ]);
});