const lessons = [
  {
    title: "by + verb-ing",
    wrong: "by listen my voice",
    correct: "by listening to my voice",
    note: "After 'by', use the -ing form when you describe how something is done."
  },
  {
    title: "Make a cleaner request",
    wrong: "Can you build me an advanced grammar and English teaching guide?",
    correct: "Can you build a personalized English program for me?",
    note: "Native English often prefers shorter, cleaner sentence architecture."
  },
  {
    title: "Every day vs. everyday",
    wrong: "Give me everyday five idioms.",
    correct: "Give me five idioms every day.",
    note: "'Every day' means each day. 'Everyday' is an adjective: everyday English."
  }
];

export default function GrammarCoach() {
  return (
    <div className="card">
      <h2 className="text-2xl font-bold">Grammar Coach</h2>
      <p className="mt-1 text-sm text-zinc-400">Your current high-impact correction patterns.</p>

      <div className="mt-4 grid gap-4">
        {lessons.map((lesson) => (
          <div key={lesson.title} className="rounded-2xl border border-white/10 bg-black/25 p-4">
            <h3 className="font-bold">{lesson.title}</h3>
            <p className="mt-2 text-sm text-red-200">Not natural: {lesson.wrong}</p>
            <p className="mt-1 text-sm text-green-200">Better: {lesson.correct}</p>
            <p className="mt-2 text-sm text-zinc-400">{lesson.note}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
