# Aclan English Coach

A Codex-ready MVP for a personalized English, grammar, idiom, pronunciation, and weekly quiz app.

## Features
- Daily 5 idioms with Turkish explanations
- Grammar lesson cards
- Browser voice recorder
- AI pronunciation / grammar feedback API route
- Weekly quiz generator structure
- Progress dashboard
- Clean app structure for Codex to extend

## Setup

```bash
npm install
cp .env.example .env.local
npm run dev
```

Add your OpenAI API key to `.env.local`.

```env
OPENAI_API_KEY=your_key_here
```

Then open:

```bash
http://localhost:3000
```

## Suggested Codex instruction

Paste this into Codex:

> Continue this app. Improve the dashboard, add persistent user progress with localStorage first, then add Supabase later. Add daily idiom rotation, weekly quiz scoring, and a more detailed pronunciation report with categories: rhythm, stress, vowels, consonants, grammar, natural phrasing, and Turkish-speaker-specific corrections. Keep the design elegant, cinematic, and simple.

## Important
The voice analyzer uses the browser MediaRecorder API and sends the recorded audio to `/api/analyze-voice`.
Do not expose the OpenAI API key in client components.
