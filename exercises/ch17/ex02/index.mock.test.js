import { jest } from '@jest/globals';
import { createIssue, closeIssue, listIssues } from './index.js';

jest.mock('axios');

describe('GitHub Issue操作関数のテスト', () => {
  let api;

  beforeAll(() => {
    api = {
      post: jest.fn(),
      patch: jest.fn(),
      get: jest.fn(),
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('createIssue関数のテスト', async () => {
    const mockResponse = { data: { id: 1, title: 'Test Issue' } };
    api.post.mockResolvedValue(mockResponse);

    const result = await createIssue('Test Issue', 'This is a test issue', api);
    expect(result).toEqual(mockResponse.data);
    expect(api.post).toHaveBeenCalledWith(
      '/repos/Yuki-Nakamura4/js-excercises/issues',
      { title: 'Test Issue', body: 'This is a test issue' }
    );
  });

  test('closeIssue関数のテスト', async () => {
    const mockResponse = { data: { id: 1, state: 'closed' } };
    api.patch.mockResolvedValue(mockResponse);

    const result = await closeIssue(1, api);
    expect(result).toEqual(mockResponse.data);
    expect(api.patch).toHaveBeenCalledWith(
      '/repos/Yuki-Nakamura4/js-excercises/issues/1',
      { state: 'closed' }
    );
  });

  test('listIssues関数のテスト', async () => {
    const mockResponse = { data: [{ number: 1, title: 'Test Issue' }] };
    api.get.mockResolvedValue(mockResponse);

    const result = await listIssues(api);
    expect(result).toEqual(mockResponse.data);
    expect(api.get).toHaveBeenCalledWith(
      '/repos/Yuki-Nakamura4/js-excercises/issues',
      { params: { state: 'open' } }
    );
  });
});
