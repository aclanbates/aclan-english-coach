"use client";

import { useState } from "react";
import { weeklyQuiz } from "@/lib/quiz";

export default function WeeklyQuiz() {
  const [revealed, setRevealed] = useState(false);

  return (
    <div className="card">
      <h2 className="text-2xl font-bold">Weekly Quiz</h2>
      <p className="mt-1 text-sm text-zinc-400">
        Practice first. Reveal answers only after you try.
      </p>

      <div className="mt-4 space-y-4">
        {weeklyQuiz.map((q, index) => (
          <div key={q.question} className="rounded-2xl border border-white/10 bg-black/25 p-4">
            <p className="font-semibold">{index + 1}. {q.question}</p>
            <input className="input mt-3" placeholder="Type your answer..." />
            {revealed && <p className="mt-3 text-sm text-green-200">Answer: {q.answer}</p>}
          </div>
        ))}
      </div>

      <button className="button mt-5" onClick={() => setRevealed(!revealed)}>
        {revealed ? "Hide answers" : "Reveal answers"}
      </button>
    </div>
  );
}
