import { dailyIdioms } from "./idioms";

export type QuizQuestion = {
  question: string;
  answer: string;
};

export const weeklyQuiz: QuizQuestion[] = [
  {
    question: "Fill in the blank: We practiced for six hours. Let’s ____.",
    answer: "call it a day"
  },
  {
    question: "What does 'get the hang of it' mean?",
    answer: "to learn how to do something"
  },
  {
    question: "Translate naturally: Aynı fikirde olduğumuzdan emin olalım.",
    answer: "Let’s make sure we’re on the same page."
  },
  {
    question: "Use 'step by step' in a sentence about English.",
    answer: "Example: I will improve my English step by step."
  },
  {
    question: "Which idiom means 'doing the right thing'?",
    answer: "be on the right track"
  }
];

export function todayIdioms() {
  return dailyIdioms;
}
