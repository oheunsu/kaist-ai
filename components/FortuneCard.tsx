"use client";

import { useState } from "react";
import { drawFortune } from "@/lib/fortunes";
import type { HistoryEntry } from "@/lib/history";

type Result = { fortune: string; luckyItem: { emoji: string; name: string } };

export default function FortuneCard({
  onDraw,
}: {
  onDraw?: (entry: HistoryEntry) => void;
}) {
  const [flipped, setFlipped] = useState(false);
  const [result, setResult] = useState<Result | null>(null);

  function draw() {
    const drawn = drawFortune();
    setResult(drawn);
    setFlipped(true);
    onDraw?.({ time: new Date().toISOString(), ...drawn });
  }

  function handleClick() {
    if (!flipped) {
      draw();
      return;
    }

    // already showing a result: flip back, then draw a fresh one
    setFlipped(false);
    setTimeout(draw, 400);
  }

  return (
    <div className="flex flex-col items-center gap-8">
      <div className="[perspective:1200px]">
        <div
          className={`relative h-96 w-72 transition-transform duration-700 ease-out [transform-style:preserve-3d] ${
            flipped ? "[transform:rotateY(180deg)]" : ""
          }`}
        >
          {/* front */}
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 rounded-3xl bg-gradient-to-br from-indigo-500 to-purple-600 p-8 text-center shadow-xl [backface-visibility:hidden]">
            <span className="text-6xl">🔮</span>
            <h1 className="text-2xl font-bold text-white">오늘의 운세</h1>
            <p className="text-sm text-indigo-100">
              카드를 눌러 오늘의 운세를 확인해보세요
            </p>
          </div>

          {/* back */}
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-5 rounded-3xl bg-gradient-to-br from-amber-300 to-pink-400 p-8 text-center shadow-xl [backface-visibility:hidden] [transform:rotateY(180deg)]">
            <span className="text-5xl">✨</span>
            <p className="text-lg font-semibold leading-relaxed text-zinc-900">
              {result?.fortune}
            </p>
            {result && (
              <div className="flex flex-col items-center gap-1 rounded-2xl bg-white/60 px-5 py-3">
                <span className="text-3xl">{result.luckyItem.emoji}</span>
                <span className="text-sm font-medium text-zinc-700">
                  행운의 아이템: {result.luckyItem.name}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      <button
        onClick={handleClick}
        className="rounded-full bg-zinc-900 px-8 py-3 text-base font-semibold text-white shadow-md transition-colors hover:bg-zinc-700 active:scale-95 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200"
      >
        {flipped ? "다시 뽑기" : "카드 뒤집기"}
      </button>
    </div>
  );
}
