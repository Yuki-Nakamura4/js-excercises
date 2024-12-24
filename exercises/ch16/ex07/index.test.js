import { checkEntry } from './index.js';

test('ファイルをファイルと判定できること。', async () => {
    const result = await checkEntry('ch16/ex07/test/a');
    expect(result).toBe('file');
});

test('ディレクトリをディレクトリと判定できること。', async () => {
    const result = await checkEntry('ch16/ex07/test/c');
    expect(result).toBe('directory');
});

test('ディレクトリ中のファイルもファイルと判定できること。', async () => {
    const result = await checkEntry('ch16/ex07/test/c/c-a');
    expect(result).toBe('file');
});

test('指定したファイルが存在しない場合にエラーになること。', async () => {
    await expect(checkEntry('invalidPath')).rejects.toThrow();
});