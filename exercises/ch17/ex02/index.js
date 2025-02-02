// GitHubのリポジトリ情報
const OWNER = 'Yuki-Nakamura4';
const REPO = 'js-excercises';

export async function createIssue(title, body, apiInstance) {
  try {
    const response = await apiInstance.post(`/repos/${OWNER}/${REPO}/issues`, {
      title,
      body,
    });
    return response.data;
  } catch (error) {
    throw new Error(
      error.response ? error.response.data.message : error.message
    );
  }
}

export async function closeIssue(issueNumber, apiInstance) {
  try {
    const response = await apiInstance.patch(
      `/repos/${OWNER}/${REPO}/issues/${issueNumber}`,
      { state: 'closed' }
    );
    return response.data;
  } catch (error) {
    throw new Error(
      error.response ? error.response.data.message : error.message
    );
  }
}

export async function listIssues(apiInstance) {
  try {
    const response = await apiInstance.get(`/repos/${OWNER}/${REPO}/issues`, {
      params: { state: 'open' },
    });
    return response.data;
  } catch (error) {
    throw new Error(
      error.response ? error.response.data.message : error.message
    );
  }
}
