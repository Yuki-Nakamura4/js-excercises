import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const runtime = "edge";

export async function POST(req: Request) {
  const { messages } = await req.json();

  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages,
  });

  console.log(response.choices[0].message.content);

  return new Response(response.choices[0].message.content, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
