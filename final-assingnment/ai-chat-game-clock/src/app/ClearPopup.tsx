"use client";

import { useEffect } from "react";

function ClearPopup({ onClose }: { onClose: () => void }) {
  const now = new Date();
  const futureYears = now.getFullYear() + 10000;
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const date = String(now.getDate()).padStart(2, "0");
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  return (
    <div className="flex text-white items-center justify-center">
      <div className="bg-black p-8 rounded-lg max-w-md mx-auto">
        <h2 className="text-xl font-bold mb-8 text-center">おめでとう！</h2>
        <div className="space-y-4 text-white">
          <p>
            あなたはAIの正体を見破り、現在の時刻を聞き出すことに成功しました。
            <br />
          </p>
          <p>
            今の時刻は
            <span className="text-blue-400">
              {futureYears}年{month}月{date}日 {hours}時{minutes}分{seconds}秒
            </span>
            です。
          </p>
          <p>
            これであなたは元の時代に帰ることができますね。
            <br />
            おつかれさまでした！
          </p>
        </div>
      </div>
    </div>
  );
}

export default ClearPopup;
