"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";

export default function TodayBadge() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    supabase.rpc("today_fortune_count").then(({ data, error }) => {
      if (!error && typeof data === "number") setCount(data);
    });
  }, []);

  if (count === null) return null;

  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-100 px-4 py-1.5 text-sm font-medium text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
      🔥 오늘 {count}명이 운세를 뽑았어요
    </span>
  );
}
