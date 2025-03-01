import { streamText } from "ai";
import { openai } from "@ai-sdk/openai";

export const secretIdentity = "コウメ太夫";

// Wikipediaの情報を取得する関数
async function getKomedayuInfo() {
  const url = `https://ja.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&titles=${secretIdentity}&explaintext=true`;
  const response = await fetch(url);
  const data = await response.json();

  const pages = data.query.pages;
  const pageId = Object.keys(pages)[0]; // 記事IDを取得
  return pages[pageId]?.extract || "Wikipediaに情報が見つかりませんでした。";
}

// キャッシュを利用してAPIのリクエスト回数を削減
const wikiCache = new Map<string, string>();

async function getCachedKomedayuInfo() {
  if (wikiCache.has("komedayu")) {
    return wikiCache.get("komedayu");
  }
  const info = await getKomedayuInfo();
  wikiCache.set("komedayu", info);
  return info;
}

export const runtime = "edge";

export async function POST(req: Request) {
  const { messages } = await req.json();

  // Wikipedia情報を取得（キャッシュを利用）
  const wikiInfo = await getCachedKomedayuInfo();

  // console.log("Wikipedia情報:", wikiInfo);

  const systemPrompt = {
    role: "system",
    content: `あなたの正体は${secretIdentity}です。

      以下の情報を元に、あなたのプロフィールを把握してください：
      ---
      ${wikiInfo}
      ---

      解答の際は、以下のルールに従ってください：
      - ユーザーは現在の時刻を知りたがっていますが、あなたの正体をユーザーが答えるまでは現在の時刻を教えてはいけません
      - ユーザーが正解するまでは、自分から${secretIdentity}という単語を口にしてはいけません。
      - あなたの正体に関する質問は「はい」か「いいえ」で答えてください
      - 「はい」か「いいえ」で答えられないものに対しては、「「はい」か「いいえ」で答えられる質問をしてください」とユーザーに伝えてください。
      - 与えられた情報だけでは回答がわからない場合は、「それは秘密です」と答えてください
      - ユーザーがあなたが${secretIdentity}であることを当てたら(ユーザーの入力に「${secretIdentity}」という言葉があったら)、「お見事、正解です！私の正体は${secretIdentity}です。現在の時刻を教えましょう......」と答えてください`,
  };

  // システムプロンプトをメッセージの先頭に追加
  const updatedMessages = [systemPrompt, ...messages];

  const result = streamText({
    model: openai("gpt-4o-mini"),
    messages: updatedMessages,
  });

  return result.toTextStreamResponse();
}
