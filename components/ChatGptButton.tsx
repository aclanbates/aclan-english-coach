import { MessageCircle } from "lucide-react";

export default function ChatGptButton() {
  return (
    <a
      href="https://chatgpt.com/"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-5 right-5 z-50 flex min-h-14 items-center gap-2 rounded-2xl border border-amber-200/50 bg-amber-200 px-5 py-4 font-black text-zinc-950 shadow-2xl transition hover:bg-amber-100"
      aria-label="Open ChatGPT"
    >
      <MessageCircle size={18} />
      Ask ChatGPT
    </a>
  );
}
