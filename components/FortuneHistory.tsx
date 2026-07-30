"use client";

import type { HistoryEntry } from "@/lib/history";

function formatTime(iso: string) {
  return new Date(iso).toLocaleString("ko-KR", { hour12: false });
}

export default function FortuneHistory({ history }: { history: HistoryEntry[] }) {
  if (history.length === 0) {
    return (
      <p className="text-center text-sm text-zinc-500 dark:text-zinc-400">
        아직 뽑은 운세 기록이 없어요. 카드를 눌러 운세를 확인해보세요!
      </p>
    );
  }

  return (
    <div className="w-full max-w-2xl">
      <h2 className="mb-4 text-center text-xl font-bold text-zinc-900 dark:text-zinc-50">
        내 운세 기록
      </h2>
      <div className="overflow-hidden rounded-2xl border border-zinc-200 shadow-sm dark:border-zinc-800">
        <table className="w-full text-left text-sm">
          <thead className="bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">
            <tr>
              <th className="px-4 py-3 font-medium">뽑은 시각</th>
              <th className="px-4 py-3 font-medium">운세</th>
              <th className="px-4 py-3 font-medium">행운의 아이템</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
            {history.map((entry, i) => (
              <tr key={`${entry.time}-${i}`} className="bg-white dark:bg-zinc-900">
                <td className="whitespace-nowrap px-4 py-3 text-zinc-500 dark:text-zinc-400">
                  {formatTime(entry.time)}
                </td>
                <td className="px-4 py-3 text-zinc-800 dark:text-zinc-100">
                  {entry.fortune}
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-zinc-600 dark:text-zinc-300">
                  {entry.luckyItem.emoji} {entry.luckyItem.name}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
