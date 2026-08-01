"use client";

import { useEffect, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import FortuneCard from "@/components/FortuneCard";
import FortuneHistory from "@/components/FortuneHistory";
import AuthPanel from "@/components/AuthPanel";
import { loadHistory, saveHistory, type HistoryEntry } from "@/lib/history";
import { supabase } from "@/lib/supabase/client";

const NAME_STORAGE_KEY = "fortune-user-name";

export default function Home() {
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [name, setName] = useState("");
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    setHistory(loadHistory());
    setName(window.localStorage.getItem(NAME_STORAGE_KEY) ?? "");
  }, []);

  function handleNameChange(value: string) {
    setName(value);
    window.localStorage.setItem(NAME_STORAGE_KEY, value);
  }

  function handleDraw(entry: HistoryEntry) {
    setHistory((prev) => {
      const next = [entry, ...prev];
      saveHistory(next);
      return next;
    });

    const savedName = session?.user.email ?? name.trim();

    supabase
      .from("fortunes")
      .insert({ name: savedName || "익명", fortune: entry.fortune })
      .then(({ error }) => {
        if (error) console.error("Failed to save fortune to Supabase", error);
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
        <AuthPanel onSessionChange={setSession} />
        {!session && (
          <input
            type="text"
            value={name}
            onChange={(e) => handleNameChange(e.target.value)}
            placeholder="이름을 입력하세요"
            className="w-64 rounded-full border border-zinc-300 bg-white px-5 py-2 text-center text-sm text-zinc-900 shadow-sm outline-none focus:border-indigo-400 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-50"
          />
        )}
        <FortuneCard onDraw={handleDraw} />
      </div>
      <FortuneHistory history={history} />
    </div>
  );
}
