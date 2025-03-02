"use client";

import { useState } from "react";
import StartPopup from "./StartPopup";
import Scroll2dGameScreen from "./Scroll2dGameScreen";
import Chat from "./Chat";
import ClearPopup from "./ClearPopup";
import { useRouter } from "next/navigation";

export default function Page() {
  const [hasStarted, setHasStarted] = useState(false);
  const [hasEnteredMonolith, setHasEnteredMonolith] = useState(false);
  const [gameCleared, setGameCleared] = useState(false);
  const router = useRouter();

  // **最初からやり直す**
  const restartGame = () => {
    setHasStarted(false);
    setHasEnteredMonolith(false);
    setGameCleared(false);

    // ページを完全リロードして状態をリセットする（Next.js の場合）
    router.refresh(); // または `window.location.reload();`
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
        <ClearPopup onClose={restartGame} />
      )}
    </div>
  );
}
