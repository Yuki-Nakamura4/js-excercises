import axios from 'axios';
import { Polly } from '@pollyjs/core';
import NodeHttpAdapter from '@pollyjs/adapter-node-http';
import FSPersister from '@pollyjs/persister-fs';
import { createIssue, closeIssue, listIssues } from './index.js';
import dotenv from 'dotenv';

dotenv.config();
const TOKEN = process.env.GITHUB_PAT;

// Pollyにアダプターとパーシスターを登録
Polly.register(NodeHttpAdapter); // adapterは、PollyがHTTPリクエストをキャプチャするためのもの
Polly.register(FSPersister); // persisterは、PollyがHTTPリクエストを保存するためのもの

describe('GitHub Issue操作関数のPolly.JSを用いたテスト', () => {
  let polly;
  let api;

  beforeAll(() => {
    polly = new Polly('GitHub API', {
      adapters: ['node-http'],
      persister: 'fs',
      persisterOptions: {
        fs: {
          recordingsDir: './ch17/ex02/recordings', // recordingsディレクトリに保存
        },
      },
      recordIfMissing: true, // recordingsディレクトリにリクエストが存在しない場合、リクエストを記録
    });

    api = axios.create({
      baseURL: 'https://api.github.com',
      headers: {
        Authorization: `token ${TOKEN}`,
        Accept: 'application/vnd.github.v3+json',
      },
    });
  });

  afterAll(async () => {
    await polly.stop();
  });

  test('createIssue関数のテスト', async () => {
    const result = await createIssue('Test Issue', 'This is a test issue', api);
    expect(result).toHaveProperty('id');
    expect(result).toHaveProperty('title', 'Test Issue');
  });

  test('closeIssue関数のテスト', async () => {
    const result = await closeIssue(1, api);
    expect(result).toHaveProperty('id');
    expect(result).toHaveProperty('state', 'closed');
  });

  test('listIssues関数のテスト', async () => {
    const result = await listIssues(api);
    expect(result).toBeInstanceOf(Array);
    if (result.length > 0) {
      expect(result[0]).toHaveProperty('number');
      expect(result[0]).toHaveProperty('title');
    }
  });
});
