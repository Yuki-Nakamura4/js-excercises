import { streamText } from "ai";
import { openai } from "@ai-sdk/openai";

export const secretPerson = "コウメ太夫";

export const runtime = "edge";

export async function POST(req: Request) {
  const { messages, wikiInfo } = await req.json();

  const systemPrompt = {
    role: "system",
    content: `あなたの正体は${secretPerson}です。

      以下の情報を元に、あなたのプロフィールを把握してください：
      ---
      ${wikiInfo}
      ---

      解答の際は、以下のルールに従ってください：
      - ユーザーは現在の時刻を知りたがっていますが、あなたの正体をユーザーが答えるまでは現在の時刻を教えてはいけません
      - ユーザーが正解するまでは、自分から${secretPerson}という単語を口にしてはいけません。
      - あなたの正体に関する質問は「はい」か「いいえ」で答えてください
      - 「はい」か「いいえ」で答えられないものに対しては、「「はい」か「いいえ」で答えられる質問をしてください」とユーザーに伝えてください。
      - 与えられた情報だけでは回答がわからない場合は、「それは秘密です」と答えてください
      - ユーザーがあなたが${secretPerson}であることを当てたら(ユーザーの入力に「${secretPerson}」という言葉があったら)、「お見事、正解です！私の正体は${secretPerson}です。現在の時刻を教えましょう......」と答えてください`,
  };

  // システムプロンプトをメッセージの先頭に追加
  const updatedMessages = [systemPrompt, ...messages];

  const result = streamText({
    model: openai("gpt-4o-mini"),
    messages: updatedMessages,
  });

  return result.toTextStreamResponse();
}
