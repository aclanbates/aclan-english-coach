import { dailyIdioms } from "./idioms";

export type QuizQuestion = {
  type: string;
  question: string;
  answer: string;
  idiom: string;
  speaking?: boolean;
};

function dayNumber() {
  const now = new Date();
  return Math.floor(
    new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime() /
      86400000
  );
}

function weekNumber() {
  return Math.floor(dayNumber() / 7);
}

export function todayIdioms() {
  const start = (dayNumber() * 5) % dailyIdioms.length;
  return Array.from({ length: 5 }, (_, index) => dailyIdioms[(start + index) % dailyIdioms.length]);
}

export function weekIdioms() {
  const start = (weekNumber() * 5) % dailyIdioms.length;
  return Array.from({ length: 5 }, (_, index) => dailyIdioms[(start + index) % dailyIdioms.length]);
}

export function weeklyQuiz(): QuizQuestion[] {
  const idioms = weekIdioms();

  return [
    {
      type: "Part A — Fill in the Blank",
      question: idioms[0].fillBlank,
      answer: idioms[0].idiom,
      idiom: idioms[0].idiom
    },
    {
      type: "Part B — Meaning Question",
      question: `What idiom means: ${idioms[1].meaning}`,
      answer: idioms[1].idiom,
      idiom: idioms[1].idiom
    },
    {
      type: "Part C — Turkish to English",
      question: idioms[2].turkishPrompt,
      answer: idioms[2].idiom,
      idiom: idioms[2].idiom
    },
    {
      type: "Part D — Choose the Correct Idiom",
      question: `Which idiom means "${idioms[3].meaning}"?\nA) ${idioms[3].idiom}\nB) ${idioms[4].idiom}\nC) ${idioms[0].idiom}`,
      answer: "A",
      idiom: idioms[3].idiom
    },
    {
      type: "Part E — Speaking Prompt",
      question: idioms[4].speakingPrompt,
      answer: "Self-score fluency, idiom usage, pronunciation, rhythm, and grammar.",
      idiom: idioms[4].idiom,
      speaking: true
    }
  ];
}

export function normalizeAnswer(value: string) {
  return value
    .toLowerCase()
    .replace(/[^\w\s]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

export function isCloseAnswer(userAnswer: string, expected: string) {
  const user = normalizeAnswer(userAnswer);
  const answer = normalizeAnswer(expected);
  return Boolean(user) && (user.includes(answer) || answer.includes(user));
}

export function quizLabel(score: number) {
  if (score >= 90) return "Pass with distinction";
  if (score >= 80) return "Strong pass";
  if (score >= 70) return "Pass";
  if (score >= 60) return "Borderline pass";
  return "Review and retake";
}
