"use client";

import { useEffect, useMemo, useState } from "react";
import { ActivityEntry, progressKeys, readJson } from "@/lib/progress";

export default function ProgressHistory() {
  const [log, setLog] = useState<ActivityEntry[]>([]);
  const [studied, setStudied] = useState<Record<string, boolean>>({});
  const [weak, setWeak] = useState<Record<string, boolean>>({});

  useEffect(() => {
    setLog(readJson(progressKeys.activityLog, []));
    setStudied(readJson(progressKeys.studiedIdioms, {}));
    setWeak(readJson(progressKeys.weakIdioms, {}));
  }, []);

  const stats = useMemo(() => {
    const weeklyScores = log.filter((entry) => entry.type === "weekly-quiz" && typeof entry.score === "number");
    const monthlyScores = log.filter((entry) => entry.type === "monthly-quiz" && typeof entry.score === "number");

    return {
      studiedCount: Object.values(studied).filter(Boolean).length,
      weakCount: Object.values(weak).filter(Boolean).length,
      weeklyAverage: average(weeklyScores.map((entry) => entry.score || 0)),
      monthlyAverage: average(monthlyScores.map((entry) => entry.score || 0)),
      voiceReports: log.filter((entry) => entry.type === "voice-report").length,
      rewrites: log.filter((entry) => entry.type === "natural-rewrite").length
    };
  }, [log, studied, weak]);

  return (
    <div className="card">
      <h2 className="text-2xl font-bold">Progress Record</h2>
      <p className="mt-1 text-sm text-zinc-400">
        A local record of studied idioms, quiz scores, voice reports, rewrites, and completed days.
      </p>

      <div className="mt-4 grid gap-3 md:grid-cols-3">
        <Stat label="Idioms studied" value={stats.studiedCount} />
        <Stat label="Weak idioms" value={stats.weakCount} />
        <Stat label="Voice reports" value={stats.voiceReports} />
        <Stat label="Rewrite notes" value={stats.rewrites} />
        <Stat label="Weekly avg" value={stats.weeklyAverage ? `${stats.weeklyAverage}%` : "—"} />
        <Stat label="Monthly avg" value={stats.monthlyAverage ? `${stats.monthlyAverage}%` : "—"} />
      </div>

      <div className="mt-5 rounded-2xl border border-white/10 bg-black/25 p-4">
        <h3 className="font-bold text-amber-100">Recent work</h3>
        {!log.length ? (
          <p className="mt-2 text-sm text-zinc-400">No progress recorded yet.</p>
        ) : (
          <div className="mt-3 space-y-3">
            {log.slice(0, 10).map((entry, index) => (
              <div key={`${entry.date}-${entry.title}-${index}`} className="rounded-xl bg-white/5 p-3 text-sm">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <b>{entry.title}</b>
                  <span className="text-zinc-500">{entry.date}</span>
                </div>
                <p className="mt-1 text-zinc-400">
                  {entry.detail || entry.type}
                  {typeof entry.score === "number" ? ` · Score: ${entry.score}` : ""}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-2xl bg-black/25 p-4">
      <p className="text-3xl font-black text-amber-100">{value}</p>
      <p className="text-sm text-zinc-400">{label}</p>
    </div>
  );
}

function average(values: number[]) {
  if (!values.length) return 0;
  return Math.round(values.reduce((sum, value) => sum + value, 0) / values.length);
}
