"use client";

import { useEffect, useMemo, useState } from "react";
import { appendActivity, progressKeys, readJson, todayKey, writeJson } from "@/lib/progress";

const tasks = [
  "Study today’s 5 idioms",
  "Record or rehearse one voice sample",
  "Review one grammar pattern",
  "Complete one natural rewrite",
  "Take or review the weekly quiz"
];

type DailyProgress = {
  date: string;
  checked: Record<string, boolean>;
  completedDates: string[];
};

function dateKey(date: Date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

function streakFrom(completedDates: string[]) {
  const completed = new Set(completedDates);
  const cursor = new Date();
  let streak = 0;

  while (completed.has(dateKey(cursor))) {
    streak += 1;
    cursor.setDate(cursor.getDate() - 1);
  }

  return streak;
}

function normalizeProgress(saved: unknown): DailyProgress {
  const today = todayKey();
  if (!saved || typeof saved !== "object" || !("checked" in saved)) {
    return { date: today, checked: {}, completedDates: [] };
  }

  const value = saved as Partial<DailyProgress>;
  return {
    date: value.date || today,
    checked: value.date === today || !value.date ? value.checked || {} : {},
    completedDates: Array.isArray(value.completedDates) ? value.completedDates : []
  };
}

export default function ProgressChecklist() {
  const [progress, setProgress] = useState<DailyProgress>({
    date: todayKey(),
    checked: {},
    completedDates: []
  });

  useEffect(() => {
    setProgress(normalizeProgress(readJson(progressKeys.daily, null)));
  }, []);

  const completed = useMemo(
    () => tasks.filter((task) => progress.checked[task]).length,
    [progress.checked]
  );
  const streak = useMemo(() => streakFrom(progress.completedDates), [progress.completedDates]);

  function saveProgress(nextChecked: Record<string, boolean>) {
    const isComplete = tasks.every((task) => nextChecked[task]);
    const completedDates = new Set(progress.completedDates);

    if (isComplete) {
      completedDates.add(todayKey());
      if (!progress.completedDates.includes(todayKey())) {
        appendActivity({
          type: "daily-complete",
          title: "Completed daily practice",
          detail: `${tasks.length} practice steps`
        });
      }
    } else {
      completedDates.delete(todayKey());
    }

    const next = {
      date: todayKey(),
      checked: nextChecked,
      completedDates: Array.from(completedDates).sort()
    };
    setProgress(next);
    writeJson(progressKeys.daily, next);
  }

  function toggle(task: string) {
    saveProgress({ ...progress.checked, [task]: !progress.checked[task] });
  }

  return (
    <div className="card">
      <h2 className="text-2xl font-bold">Daily Progress</h2>
      <p className="mt-1 text-sm text-zinc-400">
        Completed {completed} of {tasks.length} practice steps today.
      </p>

      <div className="mt-4 grid gap-3 md:grid-cols-2">
        <div className="rounded-2xl bg-black/25 p-4">
          <p className="text-3xl font-black text-amber-100">{streak}</p>
          <p className="text-sm text-zinc-400">day streak</p>
        </div>
        <div className="rounded-2xl bg-black/25 p-4">
          <p className="text-3xl font-black text-amber-100">{tasks.length - completed}</p>
          <p className="text-sm text-zinc-400">steps left today</p>
        </div>
      </div>

      <div className="mt-4 space-y-3">
        {tasks.map((task) => (
          <label key={task} className="flex cursor-pointer items-center gap-3 rounded-2xl bg-black/25 p-4">
            <input
              type="checkbox"
              checked={!!progress.checked[task]}
              onChange={() => toggle(task)}
              className="h-5 w-5"
            />
            <span className={progress.checked[task] ? "text-green-200 line-through" : "text-zinc-200"}>
              {task}
            </span>
          </label>
        ))}
      </div>

      <button className="ghost-button mt-5" onClick={() => saveProgress({})}>
        Reset today
      </button>
    </div>
  );
}
