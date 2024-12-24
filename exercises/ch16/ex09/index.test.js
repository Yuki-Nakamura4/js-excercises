import request from 'supertest';
import path from 'path';
import { serve } from './index.js';
import { fileURLToPath } from 'url';

// __dirnameをESモジュールで使用するための設定
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rootDirectory = path.resolve(__dirname, 'public'); // ルートディレクトリを指定
const port = 3001; // テスト用に別のポート番号を指定

// テスト用のExpressアプリケーションとサーバーを作成
const { app, server } = serve(rootDirectory, port);

afterAll(() => {
    server.close(); // テスト終了後にサーバーを閉じる
});

describe('HTTP Server Tests', () => {
    test('should return 200 and mirror the request for /test/mirror', async () => {
        const response = await request(app)
            .get('/test/mirror')
            .set('Accept', 'text/plain');

        expect(response.status).toBe(200);
        expect(response.headers['content-type']).toMatch(/text\/plain/);
        expect(response.text).toContain('GET /test/mirror HTTP/1.1');
    });

    test('should return 200 and serve static files', async () => {
        const response = await request(app)
            .get('/testfile.txt')
            .set('Accept', 'text/plain');

        expect(response.status).toBe(200);
        expect(response.headers['content-type']).toMatch(/text\/plain/);
        expect(response.text).toBe('This is a test file.');
    });

    test('should return 404 for non-existent files', async () => {
        const response = await request(app)
            .get('/nonexistentfile.txt')
            .set('Accept', 'text/plain');

        expect(response.status).toBe(404);
        expect(response.headers['content-type']).toMatch(/text\/plain/);
    });
});