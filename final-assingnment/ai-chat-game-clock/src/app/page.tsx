"use client";

import { useChat } from "@ai-sdk/react";
import { v4 as uuidv4 } from "uuid";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit, setMessages } =
    useChat({
      api: "/api/chat",
      onResponse: async (response) => {
        const aiMessage = await response.text();
        const newMessage: Message = {
          id: uuidv4(),
          role: "assistant",
          content: aiMessage,
        };
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      },
    });

  return (
    <div className="max-w-md mx-auto py-8">
      <div className="border rounded-lg p-4 shadow-md">
        {messages.map((message, index) => (
          <div key={message.id} className="my-2">
            <strong>{message.role === "user" ? "You" : "AI"}:</strong>{" "}
            {message.content}
          </div>
        ))}
        <form onSubmit={handleSubmit} className="mt-4">
          <input
            className="border p-2 w-full rounded"
            value={input}
            onChange={handleInputChange}
            placeholder="Type your message..."
          />
        </form>
      </div>
    </div>
  );
}
