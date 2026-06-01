import { todayIdioms } from "@/lib/quiz";

export default function IdiomCards() {
  const idioms = todayIdioms();

  return (
    <div className="card">
      <div className="mb-4">
        <h2 className="text-2xl font-bold">Today’s 5 Idioms</h2>
        <p className="text-sm text-zinc-400">Meaning, Turkish explanation, pronunciation, and speaking prompt.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {idioms.map((item) => (
          <div key={item.idiom} className="rounded-2xl border border-white/10 bg-black/25 p-4">
            <h3 className="text-lg font-bold">{item.idiom}</h3>
            <p className="mt-2 text-sm text-zinc-300">{item.meaning}</p>
            <p className="mt-2 text-sm text-amber-200">{item.turkish}</p>
            <p className="mt-2 text-sm italic text-zinc-400">“{item.example}”</p>
            <div className="mt-3 rounded-xl bg-white/5 p-3 text-sm">
              <b>Pronunciation:</b> {item.pronunciation}
            </div>
            <div className="mt-2 rounded-xl bg-white/5 p-3 text-sm">
              <b>Speaking:</b> {item.speakingPrompt}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
