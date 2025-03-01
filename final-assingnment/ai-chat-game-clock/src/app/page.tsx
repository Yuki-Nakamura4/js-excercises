"use client";

import { useState } from "react";
import StartPopup from "./StartPopup";
import Scroll2dGameScreen from "./Scroll2dGameScreen";
import Chat from "./Chat";
import ClearPopup from "./ClearPopup";

export default function Page() {
  const [hasStarted, setHasStarted] = useState(false);
  const [hasEnteredMonolith, setHasEnteredMonolith] = useState(false);
  const [gameCleared, setGameCleared] = useState(false);

  const backToStart = () => {
    setHasStarted(false);
    setHasEnteredMonolith(false);
    setGameCleared(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      {!hasStarted ? (
        // 最初のポップアップ
        <StartPopup onStart={() => setHasStarted(true)} />
      ) : !hasEnteredMonolith ? (
        // 2Dゲーム画面
        <div className="flex items-center justify-center">
          <Scroll2dGameScreen
            onEnterPress={() => setHasEnteredMonolith(true)}
          />
        </div>
      ) : !gameCleared ? (
        // チャットゲーム画面
        <Chat onClear={(): void => setGameCleared(true)} />
      ) : (
        // クリア時のポップアップ
        <ClearPopup onClose={() => backToStart()} />
      )}
    </div>
  );
}
