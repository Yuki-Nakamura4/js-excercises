import axios from "axios";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import dotenv from "dotenv";

dotenv.config();

// GitHubのリポジトリ情報
const OWNER = "Yuki-Nakamura4";
const REPO = "js-excercises";

// GitHubのパーソナルアクセストークン
const TOKEN = process.env.GITHUB_PAT;

// axiosインスタンスを作成
const api = axios.create({
  baseURL: "https://api.github.com",
  headers: {
    Authorization: `token ${TOKEN}`,
    Accept: "application/vnd.github.v3+json",
  },
});

// コマンドライン引数の設定
const argv = yargs(hideBin(process.argv))
  .option("verbose", {
    alias: "v",
    type: "boolean",
    description: "HTTPログを出力する",
  })
  .command("create <title> [body]", "Issueを作成する", (yargs) => {
    yargs
      .positional("title", {
        describe: "Issueのタイトル",
        type: "string",
      })
      .positional("body", {
        describe: "Issueの本文",
        type: "string",
      });
  })
  .command("close <issue_number>", "指定したIssueをクローズする", (yargs) => {
    yargs.positional("issue_number", {
      describe: "クローズするIssueの番号",
      type: "number",
    });
  })
  .command("list", "オープンなIssueのIdとTitleの一覧を表示する")
  .help("h")
  .alias("h", "help").argv;

// HTTPログを出力するオプションが指定された場合
if (argv.verbose) {
  api.interceptors.request.use((request) => {
    console.log("Starting Request", request);
    return request;
  });

  api.interceptors.response.use((response) => {
    console.log("Response:", response);
    return response;
  });
}

// Issueを作成する関数
export async function createIssue(title, body) {
  try {
    const response = await api.post(`/repos/${OWNER}/${REPO}/issues`, {
      title,
      body,
    });
    console.log("Issue created:", response.data);
  } catch (error) {
    console.error(
      "Error creating issue:",
      error.response ? error.response.data : error.message
    );
  }
}

// Issueをクローズする関数
export async function closeIssue(issueNumber) {
  try {
    const response = await api.patch(
      `/repos/${OWNER}/${REPO}/issues/${issueNumber}`,
      {
        state: "closed",
      }
    );
    console.log("Issue closed:", response.data);
  } catch (error) {
    console.error(
      "Error closing issue:",
      error.response ? error.response.data : error.message
    );
  }
}

// オープンなIssueの一覧を表示する関数
export async function listIssues() {
  try {
    const response = await api.get(`/repos/${OWNER}/${REPO}/issues`, {
      params: {
        state: "open",
      },
    });
    response.data.forEach((issue) => {
      console.log(`Id: ${issue.number}, Title: ${issue.title}`);
    });
  } catch (error) {
    console.error(
      "Error listing issues:",
      error.response ? error.response.data : error.message
    );
  }
}

// コマンドに応じた関数を実行
if (argv._.includes("create")) {
  // argv._は、コマンドライン引数のうち、オプションとして指定されなかった引数を格納する配列
  createIssue(argv.title, argv.body);
} else if (argv._.includes("close")) {
  closeIssue(argv.issue_number);
} else if (argv._.includes("list")) {
  listIssues();
}
