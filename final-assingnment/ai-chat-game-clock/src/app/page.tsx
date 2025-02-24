"use client";

import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

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

  // 効果音を再生する関数（cloneNode を使用）
  const playSound = () => {
    const sound = originalSound.cloneNode() as HTMLAudioElement;
    sound.play().catch((error) => {
      console.error("音声の再生に失敗しました:", error);
    });
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

    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ messages: [...messages, userMessage] }),
    });

    if (!response.body) {
      console.error("No response body");
      return;
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder("utf-8");
    let aiMessage: Message = {
      id: uuidv4(),
      role: "assistant",
      content: "",
    };

    try {
      let charCount = 0; // 文字数カウント用

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });

        // 1文字ずつ表示するためのループ
        for (const char of chunk) {
          await new Promise((resolve) => setTimeout(resolve, 75)); // 指定したミリ秒ごとに1文字追加

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
      }
    } catch (error) {
      console.error("Error reading stream", error);
    } finally {
      setIsStreaming(false);
      reader.releaseLock();
    }
  };

  return (
    <div className="max-w-md mx-auto py-8">
      <div className="border rounded-lg p-4 shadow-md">
        {messages.map((message) => (
          <div key={message.id} className="my-2">
            <strong>{message.role === "user" ? "You" : "AI"}:</strong>{" "}
            {message.content}
          </div>
        ))}
        <form onSubmit={handleSubmit} className="mt-4">
          <input
            className="border p-2 w-full rounded text-slate-400"
            value={input}
            onChange={handleInputChange}
            placeholder="Type your message..."
            disabled={isStreaming}
          />
        </form>
      </div>
    </div>
  );
}
