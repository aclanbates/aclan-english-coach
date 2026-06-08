"use client";

import { useEffect, useState } from "react";
import { dailyIdioms } from "@/lib/idioms";

const weakKey = "aclan-next-weak-idioms";

export default function WeakIdiomReview() {
  const [weak, setWeak] = useState<Record<string, boolean>>({});

  useEffect(() => {
    setWeak(JSON.parse(localStorage.getItem(weakKey) || "{}"));
  }, []);

  const weakNames = Object.keys(weak).filter((name) => weak[name]);

  return (
    <div className="card">
      <h2 className="text-2xl font-bold">Review Weak Idioms</h2>
      <p className="mt-1 text-sm text-zinc-400">
        Mark difficult idioms during daily practice, then rehearse them again here.
      </p>

      {!weakNames.length ? (
        <p className="mt-4 rounded-2xl bg-black/25 p-4 text-sm text-zinc-400">
          No weak idioms marked yet.
        </p>
      ) : (
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {weakNames.map((name) => {
            const item = dailyIdioms.find((idiom) => idiom.idiom === name);
            return (
              <div key={name} className="rounded-2xl border border-white/10 bg-black/25 p-4">
                <h3 className="font-bold">{name}</h3>
                <p className="mt-2 text-sm text-zinc-300">{item?.meaning}</p>
                <p className="mt-2 text-sm text-amber-200">{item?.turkish}</p>
                <p className="mt-2 text-sm text-zinc-400">Practice: {item?.speakingPrompt}</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
