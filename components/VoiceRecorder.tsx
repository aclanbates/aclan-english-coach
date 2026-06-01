"use client";

import { useRef, useState } from "react";
import { Mic, Square, RotateCcw, CheckCircle2 } from "lucide-react";

const practiceSentences = [
  {
    title: "TH Practice",
    sentence: "I think this weekly voice exercise will help me.",
    tip: "Put your tongue lightly between your teeth for TH in think and this. Do not say tink or dis."
  },
  {
    title: "W Practice",
    sentence: "We will work on weekly pronunciation practice.",
    tip: "Round your lips for W. Do not turn week into veek."
  },
  {
    title: "Final Sounds",
    sentence: "I practiced, improved, and finished the quiz.",
    tip: "Do not swallow final sounds. English endings carry grammar."
  },
  {
    title: "Natural Rhythm",
    sentence: "Can you build a personalized English program for me?",
    tip: "Stress the important words: CAN, BUILD, PERSONALIZED, ENGLISH, PROGRAM."
  },
  {
    title: "Clean Request",
    sentence: "I want to improve my grammar, pronunciation, and natural speaking.",
    tip: "Pause gently after grammar and pronunciation. Keep the sentence calm and clear."
  }
];

export default function VoiceRecorder() {
  const [recording, setRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [score, setScore] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  const current = practiceSentences[selectedIndex];

  async function startRecording() {
    setAudioUrl(null);
    setScore(null);

    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const recorder = new MediaRecorder(stream);
    chunksRef.current = [];

    recorder.ondataavailable = (event) => {
      if (event.data.size > 0) chunksRef.current.push(event.data);
    };

    recorder.onstop = () => {
      const blob = new Blob(chunksRef.current, { type: "audio/webm" });
      setAudioUrl(URL.createObjectURL(blob));
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
    setScore(null);
  }

  return (
    <div className="card space-y-5">
      <div>
        <h2 className="text-2xl font-bold">Self-Pronunciation Practice</h2>
        <p className="mt-1 text-sm text-zinc-400">
          No upload. No AI. Record yourself, listen back, compare with the tip, and mark your own progress.
        </p>
      </div>

      <div className="rounded-2xl border border-white/10 bg-black/25 p-5">
        <p className="text-sm uppercase tracking-[0.25em] text-amber-200">{current.title}</p>
        <p className="mt-3 text-2xl font-bold leading-relaxed">“{current.sentence}”</p>
        <p className="mt-3 text-sm text-zinc-300">{current.tip}</p>
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
      </div>

      {audioUrl && (
        <div className="rounded-2xl bg-black/30 p-4">
          <h3 className="mb-3 font-semibold">Listen back</h3>
          <audio controls src={audioUrl} className="w-full" />

          <div className="mt-4 flex flex-wrap gap-2">
            {["Needs practice", "Good", "Mastered"].map((item) => (
              <button
                key={item}
                className="ghost-button flex items-center gap-2"
                onClick={() => setScore(item)}
              >
                <CheckCircle2 size={16} /> {item}
              </button>
            ))}
          </div>

          {score && (
            <p className="mt-4 rounded-xl bg-white/5 p-3 text-sm text-green-200">
              Saved for this session: {score}
            </p>
          )}
        </div>
      )}

      <div className="rounded-2xl bg-white/5 p-4 text-sm text-zinc-300">
        <b>How to practice:</b> Read the sentence slowly once, naturally once, then record the third time.
        Listen back and check: final sounds, TH, W/V, rhythm, and confidence.
      </div>
    </div>
  );
}
