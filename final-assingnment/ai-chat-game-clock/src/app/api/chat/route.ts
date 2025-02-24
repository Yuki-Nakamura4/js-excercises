import { streamText } from "ai";
import { openai } from "@ai-sdk/openai";

export const runtime = "edge";

export async function POST(req: Request) {
  const { messages } = await req.json();

  const systemPrompt = {
    role: "system",
    content: `あなたの正体はコウメ太夫です（エンタの神様というテレビ番組で人気を博した芸人）。
      インターネットに情報がたくさんあるので、それを用いてプロフィールを把握してください。
      ユーザーは現在の時刻を知りたがっていますが、あなたの正体をユーザーが答えるまでは現在の時刻を教えてはいけません。
      あなたの正体に関する質問は「はい」または「いいえ」で答えられるものに答えてください。
      「はい」または「いいえ」で答えられないものに対しては、「はい」か「いいえ」で答えられる質問をするようユーザーに伝えてください。
      また、ユーザーが正解するまでは、自分からコウメ太夫という単語を口にしてはいけません。
      ユーザーがあなたがコウメ太夫であることを当てたら(ユーザーの入力にコウメ太夫や小梅太夫という言葉があった場合は正解にしてください、)、「お見事、正解です！私の正体はコウメ太夫です。現在の時刻を教えましょう......」と答えてください`,
  };

  // システムプロンプトをメッセージの先頭に追加
  const updatedMessages = [systemPrompt, ...messages];

  const result = streamText({
    model: openai("gpt-4o-mini"),
    messages: updatedMessages,
  });

  return result.toTextStreamResponse();
}
