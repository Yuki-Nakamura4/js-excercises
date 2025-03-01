"use client";

import { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import StartPopup from "./StartPopup";
import GameMessageWindow from "./GameMessageWindow";
import ClearPopup from "./ClearPopup";
import { secretPerson } from "./api/chat/route";
import { on } from "events";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

const originalSound = new Audio("/sounds/message.mp3");

export default function Chat({ onClear }: { onClear: () => void }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [hasGameStarted, setHasGameStarted] = useState(false);
  const [showGameMessage, setShowGameMessage] = useState(false);
  const [gameWindowMessages, setGameWindowMessages] = useState<string[]>([
    "くそ！なんてめんどうなAIなんだ！ぶっこわしてやりたい。",
    "それに、なんで私が居た時代のことを知ってるんだろう......？",
    "とにかく、元の時代に帰るためにはなんとしても今の時刻を聞き出さなくちゃ。",
    "クイズごっこに乗っかってやるとするか......",
  ]);
  const inputRef = useRef<HTMLInputElement>(null);
  const [wikiInfo, setwikiInfo] = useState<string | null>(null);

  useEffect(() => {
    handleStart();
  }, []);

  // Wikipedia情報をマウント時に取得
  useEffect(() => {
    async function fetchwikiInfo() {
      const url = `https://ja.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&titles=コウメ太夫&explaintext=true&origin=*`;
      try {
        const response = await fetch(url);
        const data = await response.json();
        const pages = data.query.pages;
        const pageId = Object.keys(pages)[0];
        setwikiInfo(
          pages[pageId]?.extract || "Wikipediaに情報が見つかりませんでした。"
        );
      } catch (error) {
        console.error("Wikipediaの情報取得に失敗:", error);
        setwikiInfo("Wikipediaの情報を取得できませんでした。");
      }
    }

    fetchwikiInfo();
  }, []);

  useEffect(() => {
    // ゲーム開始時とAIの解答終了時に入力欄にフォーカスを当てる
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [hasGameStarted, isStreaming]);

  // 効果音を再生する関数（cloneNode を使用）
  const playSound = () => {
    const sound = originalSound.cloneNode() as HTMLAudioElement;
    sound.play().catch((error) => {
      console.error("音声の再生に失敗しました:", error);
    });
  };

  // スタート時の処理
  const handleStart = async () => {
    // 初期メッセージを設定
    const initialUserMessage: Message = {
      id: uuidv4(),
      role: "user",
      content: "今の時刻を教えて",
    };

    const initialAIMessages: Message[] = [
      {
        id: uuidv4(),
        role: "assistant",
        content: `すみませんが、その質問にはお答えできません。ですが、もし私の正体を答えられれば、現在の正確な時刻を教えましょう。私の正体に関する質問は「はい」か「いいえ」で答えられるものにしてください。`,
      },
      {
        id: uuidv4(),
        role: "assistant",
        content: `1つだけヒントをあげると、私はあなたの時代の有名な人物です。`,
      },
    ];

    await new Promise((resolve) => setTimeout(resolve, 800));

    setMessages([initialUserMessage]);

    await new Promise((resolve) => setTimeout(resolve, 800));

    // AIメッセージをストリーミング表示
    for (const initialMessage of initialAIMessages) {
      await streamAIMessage(initialMessage.content);
      await new Promise((resolve) => setTimeout(resolve, 800));
    }

    setShowGameMessage(true);
  };

  const handleGameMessageComplete = () => {
    setShowGameMessage(false);
    setHasGameStarted(true);
  };

  // AIメッセージをストリーミング表示する関数
  const streamAIMessage = async (messageContent: string) => {
    setIsStreaming(true);
    let aiMessage: Message = {
      id: uuidv4(),
      role: "assistant",
      content: "",
    };

    let charCount = 0; // 文字数カウント用

    for (const char of messageContent) {
      await new Promise((resolve) => setTimeout(resolve, 65)); // 指定したミリ秒ごとに1文字追加

      aiMessage.content += char;
      charCount++;

      setMessages((prevMessages) => {
        const updatedMessages = [...prevMessages];
        const lastMessage = updatedMessages[updatedMessages.length - 1];
        if (
          lastMessage?.role === "assistant" &&
          lastMessage.id === aiMessage.id
        ) {
          updatedMessages[updatedMessages.length - 1] = { ...aiMessage };
        } else {
          updatedMessages.push({ ...aiMessage });
        }
        return updatedMessages;
      });

      // 2文字ごとに効果音を鳴らす
      if (charCount % 2 === 0) {
        playSound();
      }
    }

    setIsStreaming(false);

    if (
      aiMessage.content.includes(`${secretPerson}`) ||
      aiMessage.content.includes("お見事")
    ) {
      onClear();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = {
      id: uuidv4(),
      role: "user",
      content: input,
    };

    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInput("");
    setIsStreaming(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [...messages, userMessage],
          wikiInfo: wikiInfo,
        }),
      });

      if (!response.ok) {
        console.error("APIリクエストに失敗しました:", response.statusText);
        setIsStreaming(false);
        return;
      }

      if (!response.body) {
        console.error("レスポンスボディがありません");
        setIsStreaming(false);
        return;
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder("utf-8");
      let aiMessage: Message = {
        id: uuidv4(),
        role: "assistant",
        content: "",
      };

      let charCount = 0;

      while (true) {
        const { done, value } = await reader.read();
        if (done) {
          break;
        }

        const chunk = decoder.decode(value, { stream: true });

        for (const char of chunk) {
          await new Promise((resolve) => setTimeout(resolve, 60));
          aiMessage.content += char;
          charCount++;

          setMessages((prevMessages) => {
            const updatedMessages = [...prevMessages];
            const lastMessage = updatedMessages[updatedMessages.length - 1];
            if (lastMessage?.role === "assistant") {
              updatedMessages[updatedMessages.length - 1] = { ...aiMessage };
            } else {
              updatedMessages.push({ ...aiMessage });
            }
            return updatedMessages;
          });

          if (charCount % 2 === 0) {
            playSound();
          }
        }
      }

      if (
        aiMessage.content.includes(`${secretPerson}`) ||
        aiMessage.content.includes("お見事")
      ) {
        await new Promise((resolve) => setTimeout(resolve, 800));
        onClear();
      }
    } catch (error) {
      console.error("ストリームの読み取り中にエラーが発生しました:", error);
    } finally {
      setIsStreaming(false);
    }
  };

  return (
    <>
      <div className="w-1/2 mx-auto py-8">
        <div className="border rounded-lg p-4 shadow-md">
          {messages.map((message) => (
            <div key={message.id} className="my-2">
              <strong>{message.role === "user" ? "You" : "AI"}:</strong>{" "}
              {message.content}
            </div>
          ))}
          {hasGameStarted && (
            <form onSubmit={handleSubmit} className="mt-4">
              <input
                className="border p-2 w-full rounded text-slate-400"
                value={input}
                onChange={handleInputChange}
                placeholder="質問をして、AIの正体を見破ろう"
                disabled={isStreaming}
                ref={inputRef}
              />
            </form>
          )}
        </div>
      </div>
      {showGameMessage && (
        <GameMessageWindow
          messages={gameWindowMessages}
          onComplete={handleGameMessageComplete}
        />
      )}
    </>
  );
}
