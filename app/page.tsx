import VoiceRecorder from "@/components/VoiceRecorder";
import IdiomCards from "@/components/IdiomCards";
import GrammarCoach from "@/components/GrammarCoach";
import WeeklyQuiz from "@/components/WeeklyQuiz";
import ProgressChecklist from "@/components/ProgressChecklist";
import NaturalRewrite from "@/components/NaturalRewrite";
import WeakIdiomReview from "@/components/WeakIdiomReview";
import ChatGptButton from "@/components/ChatGptButton";
import ProgressHistory from "@/components/ProgressHistory";
import MonthlyQuiz from "@/components/MonthlyQuiz";
import SyncSettings from "@/components/SyncSettings";
import { BookOpen, Mic, PenLine, Trophy } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen px-5 py-8 md:px-10">
      <section className="mx-auto max-w-6xl">
        <div className="mb-8 rounded-[2rem] border border-white/10 bg-white/[0.07] p-8 shadow-2xl backdrop-blur">
          <p className="mb-3 text-sm uppercase tracking-[0.35em] text-amber-200">
            Aclan English Coach
          </p>
          <h1 className="max-w-3xl text-4xl font-black tracking-tight md:text-6xl">
            Grammar, idioms, pronunciation, and confident spoken English.
          </h1>
          <p className="mt-5 max-w-2xl text-zinc-300">
            A polished English training dashboard for a Turkish-speaking film and theater
            director: idioms, grammar, pronunciation, natural rewrites, voice practice,
            and weekly review.
          </p>

          <div className="mt-6 grid gap-3 md:grid-cols-4">
            <div className="rounded-2xl bg-black/25 p-4">
              <BookOpen className="mb-2" />
              <b>Daily idioms</b>
              <p className="text-sm text-zinc-400">Five essential expressions every day.</p>
            </div>
            <div className="rounded-2xl bg-black/25 p-4">
              <Mic className="mb-2" />
              <b>Self-pronunciation</b>
              <p className="text-sm text-zinc-400">Record yourself, listen back, and self-check.</p>
            </div>
            <div className="rounded-2xl bg-black/25 p-4">
              <Trophy className="mb-2" />
              <b>Weekly quiz</b>
              <p className="text-sm text-zinc-400">Pass the idioms you studied this week.</p>
            </div>
            <div className="rounded-2xl bg-black/25 p-4">
              <PenLine className="mb-2" />
              <b>Natural rewrites</b>
              <p className="text-sm text-zinc-400">Clean long thoughts into spoken English.</p>
            </div>
          </div>
        </div>

        <div className="grid gap-6">
          <SyncSettings />
          <ProgressChecklist />
          <VoiceRecorder />
          <IdiomCards />
          <GrammarCoach />
          <NaturalRewrite />
          <WeeklyQuiz />
          <MonthlyQuiz />
          <ProgressHistory />
          <WeakIdiomReview />
        </div>
      </section>
      <ChatGptButton />
    </main>
  );
}
