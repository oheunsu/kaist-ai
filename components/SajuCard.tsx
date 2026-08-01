"use client";

import { useState } from "react";
import type { HistoryEntry } from "@/lib/history";
import LuckyItemBadge from "@/components/LuckyItemBadge";

type Result = { fortune: string; luckyItem: { emoji: string; name: string } };

export default function SajuCard({
  birthdate,
  onDraw,
}: {
  birthdate: string;
  onDraw?: (entry: HistoryEntry) => void;
}) {
  const [flipped, setFlipped] = useState(false);
  const [result, setResult] = useState<Result | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function show(drawn: Result) {
    setResult(drawn);
    setFlipped(true);
    onDraw?.({ time: new Date().toISOString(), ...drawn });
  }

  async function drawSaju() {
    if (!birthdate) {
      setError("생년월일을 먼저 입력해주세요.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/ai-fortune", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ birthdate }),
      });
      if (!res.ok) throw new Error("request failed");
      const drawn: Result = await res.json();
      show(drawn);
    } catch {
      setError("사주 풀이에 실패했어요. 잠시 후 다시 시도해주세요.");
    } finally {
      setLoading(false);
    }
  }

  function handleClick() {
    if (!flipped) {
      drawSaju();
      return;
    }

    setFlipped(false);
    setTimeout(drawSaju, 400);
  }

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="[perspective:1200px]">
        <div
          className={`relative h-96 w-72 transition-transform duration-700 ease-out [transform-style:preserve-3d] ${
            flipped ? "[transform:rotateY(180deg)]" : ""
          }`}
        >
          {/* front */}
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 rounded-3xl bg-gradient-to-br from-sky-500 to-blue-700 p-8 text-center shadow-xl [backface-visibility:hidden]">
            <span className="text-6xl">🔮</span>
            <h2 className="text-xl font-bold text-white">오늘의 사주보기</h2>
            <p className="text-sm text-sky-100">동양 사주 · 서양 별자리 종합</p>
          </div>

          {/* back */}
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-5 rounded-3xl bg-gradient-to-br from-sky-400 to-blue-600 p-8 text-center shadow-xl [backface-visibility:hidden] [transform:rotateY(180deg)]">
            <span className="text-5xl">🔯</span>
            <p className="whitespace-pre-line text-lg font-semibold leading-relaxed text-white">
              {result?.fortune}
            </p>
            {result && <LuckyItemBadge luckyItem={result.luckyItem} />}
          </div>
        </div>
      </div>

      <button
        onClick={handleClick}
        disabled={loading}
        className="rounded-full bg-blue-600 px-8 py-3 text-base font-semibold text-white shadow-md transition-colors hover:bg-blue-700 active:scale-95 disabled:opacity-60"
      >
        {loading ? "풀이 중..." : flipped ? "다시 보기" : "사주 보기"}
      </button>
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}
