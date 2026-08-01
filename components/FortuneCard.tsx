"use client";

import { useState } from "react";
import { drawFortune } from "@/lib/fortunes";
import type { HistoryEntry } from "@/lib/history";

type Result = { fortune: string; luckyItem: { emoji: string; name: string } };

export default function FortuneCard({
  onDraw,
  birthdate,
}: {
  onDraw?: (entry: HistoryEntry) => void;
  birthdate?: string;
}) {
  const [flipped, setFlipped] = useState(false);
  const [result, setResult] = useState<Result | null>(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState("");

  function show(drawn: Result) {
    setResult(drawn);
    setFlipped(true);
    onDraw?.({ time: new Date().toISOString(), ...drawn });
  }

  function draw() {
    show(drawFortune());
  }

  async function drawWithAI() {
    setAiLoading(true);
    setAiError("");
    try {
      const res = await fetch("/api/ai-fortune", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ birthdate: birthdate || undefined }),
      });
      if (!res.ok) throw new Error("request failed");
      const drawn: Result = await res.json();
      show(drawn);
    } catch {
      setAiError("AI 운세 생성에 실패했어요. 잠시 후 다시 시도해주세요.");
    } finally {
      setAiLoading(false);
    }
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

  function handleAIClick() {
    if (!flipped) {
      drawWithAI();
      return;
    }

    setFlipped(false);
    setTimeout(drawWithAI, 400);
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
            <p className="whitespace-pre-line text-lg font-semibold leading-relaxed text-zinc-900">
              {result?.fortune}
            </p>
            {result && (
              <div className="relative w-56 overflow-hidden rounded-2xl bg-white/70 px-5 py-6 shadow-inner">
                <svg
                  viewBox="0 0 200 200"
                  className="pointer-events-none absolute left-1/2 top-1/2 h-44 w-44 -translate-x-1/2 -translate-y-1/2 opacity-50"
                  aria-hidden="true"
                >
                  <defs>
                    <radialGradient id="petalGradient" cx="50%" cy="35%" r="65%">
                      <stop offset="0%" stopColor="#fff5f7" />
                      <stop offset="55%" stopColor="#fbb6ce" />
                      <stop offset="100%" stopColor="#ec4899" />
                    </radialGradient>
                    <radialGradient id="centerGradient" cx="50%" cy="35%" r="70%">
                      <stop offset="0%" stopColor="#fff9db" />
                      <stop offset="100%" stopColor="#f6ad55" />
                    </radialGradient>
                  </defs>
                  <g transform="translate(100 100)">
                    {[0, 60, 120, 180, 240, 300].map((deg) => (
                      <ellipse
                        key={deg}
                        cx="0"
                        cy="-48"
                        rx="26"
                        ry="42"
                        fill="url(#petalGradient)"
                        transform={`rotate(${deg})`}
                      />
                    ))}
                  </g>
                  <circle cx="100" cy="100" r="22" fill="url(#centerGradient)" />
                </svg>
                <div className="relative flex flex-col items-center gap-1">
                  <span className="text-3xl">{result.luckyItem.emoji}</span>
                  <span className="text-sm font-medium text-zinc-700">
                    행운의 아이템: {result.luckyItem.name}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex gap-3">
        <button
          onClick={handleClick}
          className="rounded-full bg-zinc-900 px-8 py-3 text-base font-semibold text-white shadow-md transition-colors hover:bg-zinc-700 active:scale-95 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200"
        >
          {flipped ? "다시 뽑기" : "카드 뒤집기"}
        </button>
        <button
          onClick={handleAIClick}
          disabled={aiLoading}
          className="rounded-full border border-zinc-300 bg-white px-8 py-3 text-base font-semibold text-zinc-700 shadow-md transition-colors hover:bg-zinc-100 active:scale-95 disabled:opacity-60 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700"
        >
          {aiLoading ? "생성 중..." : "AI 운세 생성"}
        </button>
      </div>
      {aiError && <p className="text-sm text-red-500">{aiError}</p>}
    </div>
  );
}
