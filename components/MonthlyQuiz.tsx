"use client";

import { useEffect, useMemo, useState } from "react";
import { CalendarCheck, CheckCircle2, Eye, RotateCcw } from "lucide-react";
import { dailyIdioms, Idiom } from "@/lib/idioms";
import { isCloseAnswer, quizLabel } from "@/lib/quiz";
import { ActivityEntry, appendActivity, monthKey, progressKeys, readJson, writeJson } from "@/lib/progress";

type MonthlyQuestion = {
  type: string;
  question: string;
  answer: string;
  idiom: string;
  speaking?: boolean;
};

type MonthlyResult = {
  score: number;
  correct: number;
  total: number;
  label: string;
};

type MonthlyQuizState = {
  answers?: Record<number, string>;
  revealed?: boolean;
  result?: MonthlyResult | null;
};

export default function MonthlyQuiz() {
  const questions = useMemo(() => buildMonthlyQuiz(), []);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [revealed, setRevealed] = useState(false);
  const [result, setResult] = useState<MonthlyResult | null>(null);

  useEffect(() => {
    const saved = readJson<MonthlyQuizState>(progressKeys.monthlyQuiz, {});
    setAnswers(saved.answers || {});
    setRevealed(saved.revealed || false);
    setResult(saved.result || null);
  }, []);

  function saveState(nextAnswers = answers, nextRevealed = revealed, nextResult = result) {
    writeJson(progressKeys.monthlyQuiz, { answers: nextAnswers, revealed: nextRevealed, result: nextResult });
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
        if (answers[index]?.trim().toLowerCase() === "a" || isCloseAnswer(answers[index], question.idiom)) correct += 1;
        return;
      }
      if (isCloseAnswer(answers[index], question.answer)) correct += 1;
    });

    const writtenTotal = questions.filter((question) => !question.speaking).length;
    const score = Math.round((correct / writtenTotal) * 100);
    const nextResult = { score, correct, total: writtenTotal, label: quizLabel(score) };
    setResult(nextResult);
    setRevealed(true);
    saveState(answers, true, nextResult);
    appendActivity({
      type: "monthly-quiz",
      title: "Monthly quiz completed",
      detail: nextResult.label,
      score: nextResult.score
    });
  }

  function resetQuiz() {
    setAnswers({});
    setRevealed(false);
    setResult(null);
    localStorage.removeItem(progressKeys.monthlyQuiz);
  }

  const attempted = questions.filter((_, index) => answers[index]?.trim()).length;

  return (
    <div className="card">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Monthly Quiz</h2>
          <p className="mt-1 text-sm text-zinc-400">
            Built from idioms you studied this month whenever possible.
          </p>
        </div>
        <div className="rounded-2xl bg-black/25 p-3 text-sm font-bold text-amber-100">
          <CalendarCheck className="mb-1" size={18} /> {monthKey()}
        </div>
      </div>

      <p className="mt-4 text-sm font-bold text-amber-200">
        Attempted {attempted} of {questions.length} questions.
      </p>

      <div className="mt-4 space-y-4">
        {questions.map((q, index) => (
          <div key={`${q.type}-${q.idiom}-${index}`} className="rounded-2xl border border-white/10 bg-black/25 p-4">
            <p className="text-xs font-black uppercase tracking-[0.25em] text-amber-200">{q.type}</p>
            <p className="mt-2 whitespace-pre-line font-semibold">{index + 1}. {q.question}</p>
            <textarea
              className="input mt-3 min-h-24"
              placeholder={q.speaking ? "Write speaking notes..." : "Type your answer..."}
              value={answers[index] || ""}
              onChange={(event) => updateAnswer(index, event.target.value)}
            />
            {revealed && <p className="mt-3 text-sm text-green-200">Answer: {q.answer}</p>}
          </div>
        ))}
      </div>

      <div className="mt-5 flex flex-wrap gap-3">
        <button className="button flex items-center gap-2" onClick={scoreQuiz}>
          <CheckCircle2 size={18} /> Score monthly quiz
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
          <RotateCcw size={18} /> Reset monthly quiz
        </button>
      </div>

      {result && (
        <div className="mt-5 rounded-2xl border border-white/10 bg-white/5 p-4">
          <h3 className="font-bold text-amber-100">{result.label}</h3>
          <p className="mt-2 text-sm text-zinc-300">
            {result.score}% — {result.correct} of {result.total} written answers matched.
            Speaking prompts remain self-scored.
          </p>
        </div>
      )}
    </div>
  );
}

function buildMonthlyQuiz(): MonthlyQuestion[] {
  const pool = monthlyStudyPool();
  const selected = Array.from({ length: 8 }, (_, index) => pool[index % pool.length]);

  return [
    { type: "Fill in the Blank", question: selected[0].fillBlank, answer: selected[0].idiom, idiom: selected[0].idiom },
    { type: "Meaning Question", question: `What idiom means: ${selected[1].meaning}`, answer: selected[1].idiom, idiom: selected[1].idiom },
    { type: "Turkish to English", question: selected[2].turkishPrompt, answer: selected[2].idiom, idiom: selected[2].idiom },
    {
      type: "Choose the Correct Idiom",
      question: `Which idiom means "${selected[3].meaning}"?\nA) ${selected[3].idiom}\nB) ${selected[4].idiom}\nC) ${selected[5].idiom}`,
      answer: "A",
      idiom: selected[3].idiom
    },
    { type: "Fill in the Blank", question: selected[4].fillBlank, answer: selected[4].idiom, idiom: selected[4].idiom },
    { type: "Meaning Question", question: `What idiom means: ${selected[5].meaning}`, answer: selected[5].idiom, idiom: selected[5].idiom },
    { type: "Turkish to English", question: selected[6].turkishPrompt, answer: selected[6].idiom, idiom: selected[6].idiom },
    { type: "Speaking Prompt", question: selected[7].speakingPrompt, answer: "Self-score fluency, idiom usage, pronunciation, rhythm, and grammar.", idiom: selected[7].idiom, speaking: true }
  ];
}

function monthlyStudyPool(): Idiom[] {
  const log = readJson<ActivityEntry[]>(progressKeys.activityLog, []);
  const studiedThisMonth = new Set(
    log
      .filter((entry) => entry.type === "idiom-studied" && entry.date.startsWith(monthKey()))
      .map((entry) => entry.title)
  );

  const studied = readJson<Record<string, boolean>>(progressKeys.studiedIdioms, {});
  const studiedAnytime = new Set(Object.keys(studied).filter((name) => studied[name]));
  const preferredNames = studiedThisMonth.size ? studiedThisMonth : studiedAnytime;
  const preferred = dailyIdioms.filter((idiom) => preferredNames.has(idiom.idiom));

  return preferred.length >= 4 ? preferred : dailyIdioms;
}
