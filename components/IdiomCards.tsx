"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, Repeat2 } from "lucide-react";
import { todayIdioms } from "@/lib/quiz";
import { appendActivity, progressKeys } from "@/lib/progress";

export default function IdiomCards() {
  const idioms = todayIdioms();
  const [studied, setStudied] = useState<Record<string, boolean>>({});
  const [weak, setWeak] = useState<Record<string, boolean>>({});

  useEffect(() => {
    setStudied(JSON.parse(localStorage.getItem(progressKeys.studiedIdioms) || "{}"));
    setWeak(JSON.parse(localStorage.getItem(progressKeys.weakIdioms) || "{}"));
  }, []);

  function toggleStudied(idiom: string) {
    const next = { ...studied, [idiom]: !studied[idiom] };
    setStudied(next);
    localStorage.setItem(progressKeys.studiedIdioms, JSON.stringify(next));

    if (next[idiom]) {
      appendActivity({ type: "idiom-studied", title: idiom, detail: "Marked studied" });
    }
  }

  function toggleWeak(idiom: string) {
    const next = { ...weak, [idiom]: !weak[idiom] };
    setWeak(next);
    localStorage.setItem(progressKeys.weakIdioms, JSON.stringify(next));
  }

  return (
    <div className="card">
      <div className="mb-4">
        <h2 className="text-2xl font-bold">Today’s 5 Idioms</h2>
        <p className="text-sm text-zinc-400">
          Daily rotation from your original idiom sets, with Turkish explanation and speaking practice.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {idioms.map((item) => (
          <div
            key={item.idiom}
            className={`rounded-2xl border bg-black/25 p-4 ${
              studied[item.idiom] ? "border-green-300/40" : "border-white/10"
            }`}
          >
            <div className="flex items-start justify-between gap-3">
              <h3 className="text-lg font-bold">{item.idiom}</h3>
              <span className="whitespace-nowrap text-xs font-black uppercase tracking-widest text-amber-200">
                Set {item.set}
              </span>
            </div>
            <p className="mt-2 text-sm text-zinc-300">{item.meaning}</p>
            <p className="mt-2 text-sm text-amber-200">{item.turkish}</p>
            <p className="mt-2 text-sm italic text-zinc-400">“{item.example}”</p>
            <div className="mt-3 rounded-xl bg-white/5 p-3 text-sm">
              <b>Pronunciation:</b> {item.pronunciation}
            </div>
            <div className="mt-2 rounded-xl bg-white/5 p-3 text-sm">
              <b>Speaking:</b> {item.speakingPrompt}
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              <button className="ghost-button flex items-center gap-2 text-sm" onClick={() => toggleStudied(item.idiom)}>
                <CheckCircle2 size={16} /> {studied[item.idiom] ? "Studied" : "Mark studied"}
              </button>
              <button className="ghost-button flex items-center gap-2 text-sm" onClick={() => toggleWeak(item.idiom)}>
                <Repeat2 size={16} /> {weak[item.idiom] ? "Weak idiom" : "Mark weak"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
