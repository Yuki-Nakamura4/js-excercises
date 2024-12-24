import fs from 'fs';

export function checkEntry(path) {
    return new Promise((resolve, reject) => {
        fs.stat(path, (err, stats) => {
            if (err) {
                reject(err);
                return;
            }

            if (stats.isFile()) {
                resolve('file');
            } else if (stats.isDirectory()) {
                resolve('directory');
            } else {
                resolve('other');
            }
        });
    });
}