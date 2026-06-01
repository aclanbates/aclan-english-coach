export type Idiom = {
  idiom: string;
  meaning: string;
  turkish: string;
  example: string;
  pronunciation: string;
  speakingPrompt: string;
};

export const dailyIdioms: Idiom[] = [
  {
    idiom: "Get the hang of it",
    meaning: "To learn how to do something.",
    turkish: "Bir şeyin mantığını kapmak, alışmak.",
    example: "I’m getting the hang of speaking English more naturally.",
    pronunciation: "get-thuh-HANG-uv-it",
    speakingPrompt: "Use it to describe something you are learning now."
  },
  {
    idiom: "Call it a day",
    meaning: "To stop working for the day.",
    turkish: "Bugünlük bırakmak, işi paydos etmek.",
    example: "We’ve rehearsed enough. Let’s call it a day.",
    pronunciation: "CALL-it-uh-DAY",
    speakingPrompt: "Say when you usually call it a day."
  },
  {
    idiom: "On the same page",
    meaning: "To understand or agree with each other.",
    turkish: "Aynı fikirde olmak, aynı şeyi anlamış olmak.",
    example: "Before rehearsal, I want everyone to be on the same page.",
    pronunciation: "on-thuh-SAME-PAYJ",
    speakingPrompt: "Use it in a director’s note."
  },
  {
    idiom: "Step by step",
    meaning: "Gradually, one stage at a time.",
    turkish: "Adım adım.",
    example: "We’ll improve your pronunciation step by step.",
    pronunciation: "STEP-by-STEP",
    speakingPrompt: "Explain one goal you can improve step by step."
  },
  {
    idiom: "Be on the right track",
    meaning: "To be doing the right thing.",
    turkish: "Doğru yolda olmak.",
    example: "Your English is on the right track; now we need to polish it.",
    pronunciation: "bee-on-thuh-RIGHT-TRAK",
    speakingPrompt: "Say why your English is on the right track."
  }
];
