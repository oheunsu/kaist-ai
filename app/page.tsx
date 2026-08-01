"use client";

import { useEffect, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import FortuneCard from "@/components/FortuneCard";
import SajuCard from "@/components/SajuCard";
import TodayBadge from "@/components/TodayBadge";
import FortuneHistory from "@/components/FortuneHistory";
import AuthPanel from "@/components/AuthPanel";
import { loadHistory, saveHistory, type HistoryEntry } from "@/lib/history";
import { supabase } from "@/lib/supabase/client";

const NAME_STORAGE_KEY = "fortune-user-name";
const BIRTHDATE_STORAGE_KEY = "fortune-user-birthdate";

export default function Home() {
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [name, setName] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    setHistory(loadHistory());
    setName(window.localStorage.getItem(NAME_STORAGE_KEY) ?? "");
    setBirthdate(window.localStorage.getItem(BIRTHDATE_STORAGE_KEY) ?? "");
  }, []);

  function handleNameChange(value: string) {
    setName(value);
    window.localStorage.setItem(NAME_STORAGE_KEY, value);
  }

  function handleBirthdateChange(value: string) {
    setBirthdate(value);
    window.localStorage.setItem(BIRTHDATE_STORAGE_KEY, value);
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
      {/* 사주 보기 (생년월일 필수) */}
      <div className="flex flex-col items-center gap-10">
        <div className="flex flex-col items-center gap-3 text-center">
          <TodayBadge />
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-sky-400 to-blue-600 text-5xl shadow-lg ring-4 ring-white dark:ring-zinc-900">
            🔮
          </div>
          <p className="text-sm font-semibold text-sky-600 dark:text-sky-400">
            용하다 소문난 오늘의 운세
          </p>
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            사주 보기
          </h1>
          <p className="max-w-sm text-sm text-zinc-500 dark:text-zinc-400">
            이름과 생년월일을 알려주시면 사주를 반영한 오늘의 운세를 봐드려요.
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
        <div className="flex w-64 flex-col gap-1">
          <label className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
            생년월일 <span className="text-rose-500">*필수</span>
          </label>
          <input
            type="date"
            value={birthdate}
            onChange={(e) => handleBirthdateChange(e.target.value)}
            className="w-full rounded-full border border-zinc-300 bg-white px-5 py-2 text-center text-sm text-zinc-900 shadow-sm outline-none focus:border-indigo-400 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-50"
          />
        </div>
        <SajuCard birthdate={birthdate} onDraw={handleDraw} />
      </div>

      <div className="h-px w-40 bg-zinc-200 dark:bg-zinc-800" />

      {/* 가볍게 오늘의 운세 보기 */}
      <div className="flex flex-col items-center gap-10">
        <div className="text-center">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            오늘의 운세 가볍게 보기
          </h2>
          <p className="mt-2 text-zinc-500 dark:text-zinc-400">
            생년월일 없이 바로 카드를 뽑아보세요
          </p>
        </div>
        <FortuneCard onDraw={handleDraw} />
      </div>

      <FortuneHistory history={history} />
    </div>
  );
}
