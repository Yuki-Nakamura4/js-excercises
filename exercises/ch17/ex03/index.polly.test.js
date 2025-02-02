import { Polly } from '@pollyjs/core';
import NodeHttpAdapter from '@pollyjs/adapter-node-http';
import FSPersister from '@pollyjs/persister-fs';
import { createIssue, closeIssue, listIssues } from '../../ch16/ex08/index.js';

Polly.register(NodeHttpAdapter);
Polly.register(FSPersister);

describe('GitHub Issue操作関数のPolly.JSを用いたテスト', () => {
  let polly;

  beforeAll(() => {
    polly = new Polly('GitHub API', {
      adapters: ['node-http'],
      persister: 'fs',
      persisterOptions: {
        fs: {
          recordingsDir: './recordings',
        },
      },
    });
  });

  afterAll(async () => {
    await polly.stop();
  });

  test('createIssue関数のテスト', async () => {
    const result = await createIssue('Test Issue', 'This is a test issue');
    expect(result).toHaveProperty('id');
    expect(result).toHaveProperty('title', 'Test Issue');
  });

  test('closeIssue関数のテスト', async () => {
    const result = await closeIssue(1);
    expect(result).toHaveProperty('id');
    expect(result).toHaveProperty('state', 'closed');
  });

  test('listIssues関数のテスト', async () => {
    const result = await listIssues();
    expect(result).toBeInstanceOf(Array);
    if (result.length > 0) {
      expect(result[0]).toHaveProperty('number');
      expect(result[0]).toHaveProperty('title');
    }
  });
});
