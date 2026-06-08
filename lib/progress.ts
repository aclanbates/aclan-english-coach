export const progressKeys = {
  daily: "english-coach-progress",
  studiedIdioms: "aclan-next-studied-idioms",
  weakIdioms: "aclan-next-weak-idioms",
  weeklyQuiz: "aclan-next-weekly-quiz",
  monthlyQuiz: "aclan-next-monthly-quiz",
  activityLog: "aclan-next-activity-log",
  voiceReport: "aclan-next-voice-report",
  naturalRewrite: "aclan-next-natural-rewrite"
};

export type ActivityType =
  | "daily-complete"
  | "idiom-studied"
  | "weekly-quiz"
  | "monthly-quiz"
  | "voice-report"
  | "natural-rewrite";

export type ActivityEntry = {
  type: ActivityType;
  title: string;
  date: string;
  detail?: string;
  score?: number;
};

export function todayKey() {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
}

export function monthKey(date = new Date()) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
}

export function readJson<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;

  try {
    const saved = window.localStorage.getItem(key);
    return saved ? JSON.parse(saved) : fallback;
  } catch {
    return fallback;
  }
}

export function writeJson<T>(key: string, value: T) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(key, JSON.stringify(value));
}

export function appendActivity(entry: Omit<ActivityEntry, "date"> & { date?: string }) {
  const log = readJson<ActivityEntry[]>(progressKeys.activityLog, []);
  writeJson(progressKeys.activityLog, [{ ...entry, date: entry.date || todayKey() }, ...log].slice(0, 300));
}
