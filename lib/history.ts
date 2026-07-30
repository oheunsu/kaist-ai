export type HistoryEntry = {
  time: string;
  fortune: string;
  luckyItem: { emoji: string; name: string };
};

const STORAGE_KEY = "fortune-history";

export function loadHistory(): HistoryEntry[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as HistoryEntry[]) : [];
  } catch {
    return [];
  }
}

export function saveHistory(history: HistoryEntry[]) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
}
