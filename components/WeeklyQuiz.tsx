"use client";

import { useEffect, useMemo, useState } from "react";
import { CheckCircle2, Eye, RotateCcw } from "lucide-react";
import { isCloseAnswer, quizLabel, weeklyQuiz } from "@/lib/quiz";
import { appendActivity, progressKeys } from "@/lib/progress";

type QuizResult = {
  score: number;
  correct: number;
  total: number;
  label: string;
};

export default function WeeklyQuiz() {
  const questions = useMemo(() => weeklyQuiz(), []);
  const [revealed, setRevealed] = useState(false);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [result, setResult] = useState<QuizResult | null>(null);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem(progressKeys.weeklyQuiz) || "{}");
    setAnswers(saved.answers || {});
    setRevealed(saved.revealed || false);
    setResult(saved.result || null);
  }, []);

  function saveState(nextAnswers = answers, nextRevealed = revealed, nextResult = result) {
    localStorage.setItem(
      progressKeys.weeklyQuiz,
      JSON.stringify({ answers: nextAnswers, revealed: nextRevealed, result: nextResult })
    );
  }

  function updateAnswer(index: number, value: string) {
    const next = { ...answers, [index]: value };
    setAnswers(next);
    saveState(next);
  }

  function scoreQuiz() {
    let correct = 0;
    questions.forEach((question, index) => {
      if (question.speaking) return;
      if (question.type.includes("Choose")) {
        if (answers[index]?.trim().toLowerCase() === "a" || isCloseAnswer(answers[index], question.idiom)) {
          correct += 1;
        }
        return;
      }
      if (isCloseAnswer(answers[index], question.answer)) correct += 1;
    });

    const score = Math.round((correct / 4) * 100);
    const nextResult = { score, correct, total: 4, label: quizLabel(score) };
    setResult(nextResult);
    setRevealed(true);
    saveState(answers, true, nextResult);
    appendActivity({
      type: "weekly-quiz",
      title: "Weekly quiz completed",
      detail: nextResult.label,
      score: nextResult.score
    });
  }

  function resetQuiz() {
    setAnswers({});
    setRevealed(false);
    setResult(null);
    localStorage.removeItem(progressKeys.weeklyQuiz);
  }

  const attempted = questions.filter((_, index) => answers[index]?.trim()).length;

  return (
    <div className="card">
      <h2 className="text-2xl font-bold">Weekly Quiz</h2>
      <p className="mt-1 text-sm text-zinc-400">
        Generated from this week’s idioms: fill-in-the-blank, meaning, Turkish-to-English,
        multiple choice, and a speaking prompt.
      </p>
      <p className="mt-3 text-sm font-bold text-amber-200">
        Attempted {attempted} of {questions.length} questions.
      </p>

      <div className="mt-4 space-y-4">
        {questions.map((q, index) => (
          <div key={`${q.type}-${q.idiom}`} className="rounded-2xl border border-white/10 bg-black/25 p-4">
            <p className="text-xs font-black uppercase tracking-[0.25em] text-amber-200">{q.type}</p>
            <p className="mt-2 whitespace-pre-line font-semibold">{index + 1}. {q.question}</p>
            <textarea
              className="input mt-3 min-h-24"
              placeholder={q.speaking ? "Write notes for your spoken answer..." : "Type your answer..."}
              value={answers[index] || ""}
              onChange={(event) => updateAnswer(index, event.target.value)}
            />
            {revealed && <p className="mt-3 text-sm text-green-200">Answer: {q.answer}</p>}
          </div>
        ))}
      </div>

      <div className="mt-5 flex flex-wrap gap-3">
        <button className="button flex items-center gap-2" onClick={scoreQuiz}>
          <CheckCircle2 size={18} /> Score quiz
        </button>
        <button
          className="ghost-button flex items-center gap-2"
          onClick={() => {
            const next = !revealed;
            setRevealed(next);
            saveState(answers, next);
          }}
        >
          <Eye size={18} /> {revealed ? "Hide answers" : "Reveal answers"}
        </button>
        <button className="ghost-button flex items-center gap-2" onClick={resetQuiz}>
          <RotateCcw size={18} /> Reset quiz
        </button>
      </div>

      {result && (
        <div className="mt-5 rounded-2xl border border-white/10 bg-white/5 p-4">
          <h3 className="font-bold text-amber-100">{result.label}</h3>
          <p className="mt-2 text-sm text-zinc-300">
            {result.score}% — {result.correct} of {result.total} written answers matched.
            Part E is self-scored in the Voice Coach.
          </p>
        </div>
      )}
    </div>
  );
}
