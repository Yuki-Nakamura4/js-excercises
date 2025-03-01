"use client";

import { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import StartPopup from "./StartPopup";
import GameMessageWindow from "./GameMessageWindow";
import ClearPopup from "./ClearPopup";
import { secretIdentity } from "./api/chat/route";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

// 効果音の元インスタンス
const originalSound = new Audio("/sounds/message.mp3");

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [hasStartButtonPressed, setStartButtonPressed] = useState(false);
  const [hasGameStarted, setHasGameStarted] = useState(false);
  const [showGameMessage, setShowGameMessage] = useState(false);
  const [gameWindowMessages, setGameWindowMessages] = useState<string[]>([
    "なんてめんどうなAIだ！ぶっこわしてやりたい。",
    "そもそも、人工知能に正体もクソもないだろう......",
    "だが、元の時代に帰るためにはなんとしても今の時刻を聞き出さねば。",
    "クイズごっこに乗っかってやるとするか......",
  ]);
  const [isGameCleared, setIsGameCleared] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // コンポーネントのマウント時に input 要素にフォーカスを当てる
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

  // スタートボタンがクリックされたときの処理
  const handleStart = async () => {
    setStartButtonPressed(true);
    // 初期メッセージを設定
    const initialUserMessage: Message = {
      id: uuidv4(),
      role: "user",
      content: "今の時刻を教えてくれ",
    };

    const initialAIMessage: Message = {
      id: uuidv4(),
      role: "assistant",
      content: `すみませんが、その質問にはお答えできません。ですが、もし私の正体を答えられれば、現在の正確な時刻を教えましょう。私の正体に関する質問は「はい」か「いいえ」で答えられるものにしてください。`,
    };

    await new Promise((resolve) => setTimeout(resolve, 800));

    setMessages([initialUserMessage]);

    await new Promise((resolve) => setTimeout(resolve, 800));

    // AIメッセージをストリーミング表示
    await streamAIMessage(initialAIMessage.content);

    await new Promise((resolve) => setTimeout(resolve, 800));

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
        if (lastMessage?.role === "assistant") {
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
      aiMessage.content.includes(`${secretIdentity}`) ||
      aiMessage.content.includes("お見事")
    ) {
      setIsGameCleared(true);
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
        body: JSON.stringify({ messages: [...messages, userMessage] }),
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
        aiMessage.content.includes(`${secretIdentity}`) ||
        aiMessage.content.includes("お見事")
      ) {
        await new Promise((resolve) => setTimeout(resolve, 800));
        setIsGameCleared(true);
      }
    } catch (error) {
      console.error("ストリームの読み取り中にエラーが発生しました:", error);
    } finally {
      setIsStreaming(false);
    }
  };

  return (
    <>
      {!hasStartButtonPressed && <StartPopup onStart={handleStart} />}
      {hasStartButtonPressed && (
        <div className="max-w-md mx-auto py-8">
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
      )}
      {showGameMessage && (
        <GameMessageWindow
          messages={gameWindowMessages}
          onComplete={handleGameMessageComplete}
        />
      )}
      {isGameCleared && <ClearPopup />}
    </>
  );
}
