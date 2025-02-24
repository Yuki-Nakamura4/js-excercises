import React, { useState, useEffect } from "react";

const GameMessageWindow = ({
  messages,
  onComplete,
}: {
  messages: String[];
  onComplete: () => void;
}) => {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  useEffect(() => {
    const handleUserInput = () => {
      if (currentMessageIndex < messages.length - 1) {
        setCurrentMessageIndex((prevIndex) => prevIndex + 1);
      } else {
        onComplete();
      }
    };

    // クリックとキーボードイベントのリスナーを追加
    window.addEventListener("click", handleUserInput);
    window.addEventListener("keydown", handleUserInput);

    // クリーンアップ関数でイベントリスナーを削除
    return () => {
      window.removeEventListener("click", handleUserInput);
      window.removeEventListener("keydown", handleUserInput);
    };
  }, [currentMessageIndex, messages.length, onComplete]);

  return (
    <div className="fixed bottom-1/4 left-1/2 transform -translate-x-1/2 w-1/2 p-4 bg-gray-800 text-white rounded-lg border border-gray-200">
      <p>{messages[currentMessageIndex]}</p>
      <div className="flex justify-end">
        <span className="animate-blink">▼</span>
      </div>
    </div>
  );
};

export default GameMessageWindow;
