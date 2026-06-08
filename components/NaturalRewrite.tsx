"use client";

import { useEffect, useState } from "react";
import { appendActivity, progressKeys } from "@/lib/progress";

export default function NaturalRewrite() {
  const [text, setText] = useState("");

  useEffect(() => {
    setText(localStorage.getItem(progressKeys.naturalRewrite) || "");
  }, []);

  return (
    <div className="card">
      <h2 className="text-2xl font-bold">Natural Spoken English Rewrite</h2>
      <p className="mt-1 text-sm text-zinc-400">
        Write something you might say, then compare it with a cleaner spoken model.
      </p>

      <textarea
        className="input mt-4 min-h-28"
        placeholder="Write your sentence here..."
        value={text}
        onChange={(event) => setText(event.target.value)}
      />

      <div className="mt-4 rounded-2xl border border-white/10 bg-black/25 p-4 text-sm text-zinc-300">
        <h3 className="font-bold text-amber-100">Model rewrite pattern</h3>
        <p className="mt-2">
          <b>Corrected:</b> Do you think you can build me an advanced grammar,
          English-learning, and pronunciation guide by listening to my voice and giving me suggestions?
        </p>
        <p className="mt-2">
          <b>More natural spoken version:</b> Can you build a personalized English program for me?
          I want it to focus on grammar, pronunciation, daily idioms, and weekly quizzes. I would
          also like you to listen to my voice and tell me what I should improve.
        </p>
      </div>

      <button
        className="button mt-4"
        onClick={() => {
          localStorage.setItem(progressKeys.naturalRewrite, text);
          appendActivity({
            type: "natural-rewrite",
            title: "Natural rewrite saved",
            detail: text.trim() ? text.trim().slice(0, 80) : "Rewrite note"
          });
          alert("Rewrite note saved.");
        }}
      >
        Save note
      </button>
    </div>
  );
}
