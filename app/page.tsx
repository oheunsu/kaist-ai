"use client";

import { useEffect, useState } from "react";
import FortuneCard from "@/components/FortuneCard";
import FortuneHistory from "@/components/FortuneHistory";
import { loadHistory, saveHistory, type HistoryEntry } from "@/lib/history";

export default function Home() {
  const [history, setHistory] = useState<HistoryEntry[]>([]);

  useEffect(() => {
    setHistory(loadHistory());
  }, []);

  function handleDraw(entry: HistoryEntry) {
    setHistory((prev) => {
      const next = [entry, ...prev];
      saveHistory(next);
      return next;
    });
  }

  return (
    <div className="flex flex-1 flex-col items-center gap-16 bg-gradient-to-b from-zinc-50 to-zinc-100 px-6 py-16 dark:from-black dark:to-zinc-900">
      <div className="flex flex-col items-center gap-10">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            오늘의 운세
          </h1>
          <p className="mt-2 text-zinc-500 dark:text-zinc-400">
            매일 눌러보는 나만의 작은 운세 카드
          </p>
        </div>
        <FortuneCard onDraw={handleDraw} />
      </div>
      <FortuneHistory history={history} />
    </div>
  );
}
