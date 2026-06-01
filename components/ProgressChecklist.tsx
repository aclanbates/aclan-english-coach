"use client";

import { useEffect, useState } from "react";

const tasks = [
  "Study today’s 5 idioms",
  "Read the grammar cards",
  "Record one pronunciation sentence",
  "Listen back once",
  "Take or review the weekly quiz"
];

export default function ProgressChecklist() {
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const saved = localStorage.getItem("english-coach-progress");
    if (saved) setChecked(JSON.parse(saved));
  }, []);

  function toggle(task: string) {
    const next = { ...checked, [task]: !checked[task] };
    setChecked(next);
    localStorage.setItem("english-coach-progress", JSON.stringify(next));
  }

  const completed = tasks.filter((task) => checked[task]).length;

  return (
    <div className="card">
      <h2 className="text-2xl font-bold">Daily Progress</h2>
      <p className="mt-1 text-sm text-zinc-400">
        Completed {completed} of {tasks.length} practice steps today.
      </p>

      <div className="mt-4 space-y-3">
        {tasks.map((task) => (
          <label key={task} className="flex cursor-pointer items-center gap-3 rounded-2xl bg-black/25 p-4">
            <input
              type="checkbox"
              checked={!!checked[task]}
              onChange={() => toggle(task)}
              className="h-5 w-5"
            />
            <span className={checked[task] ? "text-green-200 line-through" : "text-zinc-200"}>
              {task}
            </span>
          </label>
        ))}
      </div>

      <button
        className="ghost-button mt-5"
        onClick={() => {
          setChecked({});
          localStorage.removeItem("english-coach-progress");
        }}
      >
        Reset today
      </button>
    </div>
  );
}
