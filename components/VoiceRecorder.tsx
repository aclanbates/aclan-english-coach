"use client";

import { useEffect, useRef, useState } from "react";
import { Copy, Mic, RotateCcw, Square } from "lucide-react";

const practiceSentences = [
  {
    title: "Personalized Program Drill",
    sentence: "Can you build a personalized English program for me?",
    tip: "Stress CAN, BUILD, PERSONALIZED, ENGLISH, PROGRAM.",
    words: ["personalized — PER-suh-nuh-lized", "program — PRO-gram"]
  },
  {
    title: "Full Practice Goal",
    sentence: "I want to improve my grammar, pronunciation, and natural speaking.",
    tip: "Pause after grammar and pronunciation. Keep it calm and direct.",
    words: ["grammar — GRA-mur", "pronunciation — pro-NUN-see-AY-shun", "natural — NA-chuh-rul"]
  },
  {
    title: "TH Practice",
    sentence: "I think this weekly voice exercise will help me speak more clearly.",
    tip: "Use the tongue lightly between the teeth for think and this.",
    words: ["think", "this", "that", "through"]
  },
  {
    title: "Final Sounds",
    sentence: "I worked, passed, suggested, prepared, and finished the guide.",
    tip: "Do not swallow final consonants. English endings carry grammar.",
    words: ["worked", "passed", "suggested", "prepared", "guide", "quiz"]
  },
  {
    title: "W/V Distinction",
    sentence: "This week, my voice work will become very clear.",
    tip: "Round your lips for W. Use teeth and lip for V.",
    words: ["week", "voice", "very", "work"]
  }
];

const categories = [
  "Fluency",
  "Correct idiom usage",
  "Pronunciation",
  "Natural rhythm",
  "Grammar accuracy"
];

const reportKey = "aclan-next-voice-report";

function coachPrompt() {
  return `You are an advanced English pronunciation, grammar, and accent coach for a Turkish-speaking film/theater director. Give direct, supportive, practical feedback. Focus on clarity, natural spoken English, pronunciation, sentence structure, rhythm, stress, idiom usage, and Turkish-speaker-specific patterns. Avoid generic comments.

Please analyze my 45-90 second voice sample. Return:
1. Transcript
2. Overall speaking score out of 10
3. Grammar corrections
4. Natural spoken English rewrite
5. Pronunciation targets
6. Rhythm and stress advice
7. Turkish-speaker-specific pronunciation warnings
8. Five sentences to practice
9. Tiny daily assignment`;
}

export default function VoiceRecorder() {
  const [recording, setRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scores, setScores] = useState<Record<string, number>>({});
  const [report, setReport] = useState<{ overall: number } | null>(null);
  const [recordingStatus, setRecordingStatus] = useState("Recommended sample: 45-90 seconds.");
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const startedAtRef = useRef(0);

  const current = practiceSentences[selectedIndex];

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem(reportKey) || "{}");
    setScores(saved.scores || {});
    setReport(saved.report || null);
  }, []);

  async function startRecording() {
    setAudioUrl(null);
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const recorder = new MediaRecorder(stream);
    chunksRef.current = [];
    startedAtRef.current = Date.now();

    recorder.ondataavailable = (event) => {
      if (event.data.size > 0) chunksRef.current.push(event.data);
    };

    recorder.onstop = () => {
      const blob = new Blob(chunksRef.current, { type: "audio/webm" });
      setAudioUrl(URL.createObjectURL(blob));
      setRecordingStatus(`Recorded ${Math.round((Date.now() - startedAtRef.current) / 1000)} seconds. Recommended sample: 45-90 seconds.`);
      stream.getTracks().forEach((track) => track.stop());
    };

    mediaRecorderRef.current = recorder;
    recorder.start();
    setRecording(true);
  }

  function stopRecording() {
    mediaRecorderRef.current?.stop();
    setRecording(false);
  }

  function nextSentence() {
    setSelectedIndex((current) => (current + 1) % practiceSentences.length);
    setAudioUrl(null);
  }

  function updateScore(category: string, score: number) {
    const next = { ...scores, [category]: score };
    setScores(next);
    localStorage.setItem(reportKey, JSON.stringify({ scores: next, report }));
  }

  function createReport() {
    const values = categories.map((category) => scores[category] || 7);
    const overall = Math.round((values.reduce((sum, value) => sum + value, 0) / values.length) * 10) / 10;
    const nextReport = { overall };
    setReport(nextReport);
    localStorage.setItem(reportKey, JSON.stringify({ scores, report: nextReport }));
  }

  async function copyPrompt() {
    try {
      await navigator.clipboard.writeText(coachPrompt());
      alert("ChatGPT voice-analysis prompt copied.");
    } catch {
      alert(coachPrompt());
    }
  }

  return (
    <div className="card space-y-5">
      <div>
        <h2 className="text-2xl font-bold">Voice Coach</h2>
        <p className="mt-1 text-sm text-zinc-400">
          Record a 45-90 second sample, listen back, self-score, and create a local pronunciation report.
          For true AI feedback, copy the coach prompt and use the floating ChatGPT button.
        </p>
      </div>

      <div className="rounded-2xl border border-white/10 bg-black/25 p-5">
        <p className="text-sm uppercase tracking-[0.25em] text-amber-200">{current.title}</p>
        <p className="mt-3 text-2xl font-bold leading-relaxed">“{current.sentence}”</p>
        <p className="mt-3 text-sm text-zinc-300">{current.tip}</p>
        <p className="mt-3 text-sm text-zinc-400">{current.words.join(" · ")}</p>
      </div>

      <div className="flex flex-wrap gap-3">
        {!recording ? (
          <button className="button flex items-center gap-2" onClick={startRecording}>
            <Mic size={18} /> Record myself
          </button>
        ) : (
          <button className="ghost-button flex items-center gap-2" onClick={stopRecording}>
            <Square size={18} /> Stop recording
          </button>
        )}
        <button className="ghost-button flex items-center gap-2" onClick={nextSentence}>
          <RotateCcw size={18} /> Next sentence
        </button>
        <button className="ghost-button flex items-center gap-2" onClick={copyPrompt}>
          <Copy size={18} /> Copy ChatGPT prompt
        </button>
      </div>

      <p className="text-sm text-zinc-400">{recordingStatus}</p>

      {audioUrl && (
        <div className="rounded-2xl bg-black/30 p-4">
          <h3 className="mb-3 font-semibold">Listen back</h3>
          <audio controls src={audioUrl} className="w-full" />
        </div>
      )}

      <div className="grid gap-3 md:grid-cols-5">
        {categories.map((category) => (
          <label key={category} className="rounded-2xl border border-white/10 bg-white/5 p-3 text-sm">
            <span className="block min-h-10 text-zinc-300">{category}</span>
            <select
              className="mt-2 w-full rounded-xl bg-black/30 p-2 text-white"
              value={scores[category] || 7}
              onChange={(event) => updateScore(category, Number(event.target.value))}
            >
              {Array.from({ length: 10 }, (_, index) => index + 1).map((score) => (
                <option key={score} value={score}>{score}</option>
              ))}
            </select>
          </label>
        ))}
      </div>

      <button className="button" onClick={createReport}>Create voice report</button>

      {report && (
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-zinc-300">
          <h3 className="text-lg font-bold text-amber-100">Latest Pronunciation Report</h3>
          <p className="mt-2"><b>Overall:</b> {report.overall}/10. You are understandable and confident; the main work is cleaner structure, final consonants, TH, W/V, and rhythm.</p>
          <p className="mt-2"><b>Natural rewrite target:</b> Can you build a personalized English program for me? I want it to focus on grammar, pronunciation, daily idioms, and weekly quizzes.</p>
          <p className="mt-2"><b>Tiny daily assignment:</b> Record one 60-second answer using one idiom and one clean request.</p>
        </div>
      )}
    </div>
  );
}
