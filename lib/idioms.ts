export type Idiom = {
  idiom: string;
  meaning: string;
  turkish: string;
  example: string;
  pronunciation: string;
  speakingPrompt: string;
  fillBlank: string;
  turkishPrompt: string;
  set: number;
};

const seedIdioms = [
  ["Keep an eye on something", "To watch or monitor something carefully.", "Bir şeyi dikkatle izlemek, göz kulak olmak.", "Can you keep an eye on my bag while I get a coffee?", "kee-pən-EYE-on. Keep an often connects together.", "Say three things you need to keep an eye on this week.", "Can you ______ my notes while I step outside?", "Göz kulak olmak.", 1],
  ["Figure something out", "To understand or solve something.", "Bir şeyi çözmek, anlamak.", "I need to figure out how to make my English sound more natural.", "FIG-yər-it-OUT. Stress FIG and OUT.", "Describe something you are trying to figure out.", "I need time to ______ the best way to explain this scene.", "Bir şeyi çözmek.", 1],
  ["Run out of something", "To have no more of something left.", "Bir şeyin bitmesi, tükenmesi.", "We ran out of time before the final rehearsal.", "run-OUT-uv. Link out of softly.", "Talk about something you often run out of.", "We ______ coffee before the morning rehearsal.", "Bir şeyin tükenmesi.", 1],
  ["Be up for something", "To be willing or interested in doing something.", "Bir şeye istekli olmak, varım demek.", "I am up for a serious pronunciation challenge.", "up-fər. The for is light.", "Say one challenge you are up for this month.", "I am ______ a longer speaking exercise today.", "Bir şeye varım/istekliyim.", 1],
  ["Take your time", "Do not rush.", "Acele etme, zamanını al.", "Take your time and pronounce the final sounds clearly.", "TAYK-yər-TIME. Link your softly.", "Tell someone politely not to rush.", "Do not rush the monologue. ______.", "Acele etme.", 1],
  ["Cut to the chase", "To skip unnecessary detail and talk about the main point.", "Lafı dolandırmadan konuya gelmek.", "Let us cut to the chase and discuss the real issue.", "CUT-tə-thə-CHASE. Stress CUT and CHASE.", "Ask someone to get to the main point.", "We do not need the whole story. Let us ______.", "Sadede gelmek.", 2],
  ["At the end of the day", "When everything is considered.", "Sonuçta, nihayetinde.", "At the end of the day, clarity matters more than speed.", "at-thə-END-uv-thə-DAY. Stress END and DAY.", "Give your final opinion about learning English.", "______, I want to sound clear and confident.", "Sonuçta.", 2],
  ["Go the extra mile", "To make more effort than expected.", "Beklenenden fazlasını yapmak.", "You went the extra mile to prepare for the interview.", "GO-thə-EK-struh-MILE. Stress GO and MILE.", "Describe a time you went the extra mile.", "A serious artist should ______ for the work.", "Fazladan çaba göstermek.", 2],
  ["Get back to someone", "To contact someone later with information.", "Birine daha sonra geri dönmek.", "I will get back to you after I check the schedule.", "get-BACK-tə. Stress BACK.", "Promise to reply to someone later.", "I need to check the details and ______ tomorrow.", "Birine geri dönüş yapmak.", 2],
  ["On the same wavelength", "To think or communicate in a similar way.", "Aynı frekansta olmak, birbirini iyi anlamak.", "The director and actors were on the same wavelength.", "same-WAVE-length. Stress WAVE.", "Talk about someone you work well with.", "We work quickly because we are ______.", "Aynı frekansta olmak.", 2],
  ["Bring something up", "To mention a topic.", "Bir konuyu açmak, gündeme getirmek.", "I want to bring up one problem with the dialogue.", "bring-it-UP. Stress UP.", "Bring up a topic politely in a meeting.", "Can I ______ one small concern?", "Bir konuyu gündeme getirmek.", 3],
  ["Catch up", "To talk after time apart, or reach the same level.", "Arayı kapatmak; hasret gidermek.", "Let us catch up after rehearsal.", "catch-UP. Stress UP.", "Invite someone to talk after a busy week.", "We have not talked for months. Let us ______.", "Arayı kapatmak.", 3],
  ["Work out", "To succeed, develop well, or solve.", "Yoluna girmek, işe yaramak, çözülmek.", "The scene did not work out the way I imagined.", "work-OUT. Stress OUT.", "Talk about a plan that worked out.", "I hope this new routine will ______.", "Yoluna girmek.", 3],
  ["Come across as", "To give a certain impression.", "Öyle görünmek, öyle bir izlenim bırakmak.", "You come across as confident when you speak slowly.", "come-ə-CROSS-as. Stress CROSS.", "Say how you want to come across in English.", "I want to ______ calm and articulate.", "Bir izlenim bırakmak.", 3],
  ["Turn out", "To happen or end in a particular way.", "Sonuçlanmak, ortaya çıkmak.", "The interview turned out better than I expected.", "turn-OUT. Stress OUT.", "Describe something that turned out well.", "The final scene ______ beautifully.", "Sonuçlanmak.", 3],
  ["Hang in there", "Do not give up during a difficult time.", "Dayan, pes etme.", "Hang in there. Your spoken English is improving.", "HANG-in-there. Stress HANG.", "Encourage someone who is struggling.", "I know this is difficult, but ______.", "Pes etme.", 4],
  ["Take it easy", "Relax, do not push too hard.", "Sakin ol, kendini yorma.", "Take it easy tonight and review the idioms tomorrow.", "tay-kit-EE-zee. Link take it.", "Tell a friend to relax.", "You look tired. ______ tonight.", "Sakin ol.", 4],
  ["Get around to", "To finally do something after delay.", "Bir şeyi sonunda yapmaya fırsat bulmak.", "I finally got around to reviewing my pronunciation notes.", "get-ə-ROUND-tə. Stress ROUND.", "Name something you finally got around to doing.", "I finally ______ organizing my script notes.", "Sonunda fırsat bulup yapmak.", 4],
  ["Give someone a hand", "To help someone.", "Birine yardım etmek.", "Can you give me a hand with this translation?", "giv-mē-ə-HAND. Stress HAND.", "Ask someone for help naturally.", "Could you ______ with these lines?", "Yardım etmek.", 4],
  ["Make up your mind", "To decide.", "Kararını vermek.", "I need to make up my mind about the ending.", "make-up-yər-MIND. Stress MIND.", "Talk about a decision you need to make.", "I cannot ______ about the title.", "Karar vermek.", 4],
  ["Be on the same page", "To understand or agree with each other.", "Aynı fikirde olmak, aynı şeyi anlamış olmak.", "Before rehearsal, I want everyone to be on the same page.", "on-thə-SAME-PAGE. Stress SAME and PAGE.", "Use it in a director's note.", "Before we continue, let us make sure we are ______.", "Aynı fikirde olmak.", 5],
  ["Call it a day", "To stop working for the day.", "Bugünlük bırakmak, işi paydos etmek.", "We have rehearsed enough. Let us call it a day.", "CALL-it-ə-DAY. Stress CALL and DAY.", "Say when you usually call it a day.", "We practiced for six hours. Let us ______.", "Bugünlük bırakmak.", 5],
  ["Slip your mind", "To forget something unintentionally.", "Aklından çıkmak, unutmak.", "The meeting slipped my mind.", "slip-yər-MIND. Stress MIND.", "Apologize because something slipped your mind.", "I am sorry. The call completely ______.", "Aklından çıkmak.", 5],
  ["Play it by ear", "To decide what to do as the situation develops.", "Duruma göre hareket etmek.", "We do not need a fixed plan; we can play it by ear.", "play-it-by-EAR. Stress EAR.", "Talk about a plan you can keep flexible.", "Let us not decide now. We can ______.", "Duruma göre hareket etmek.", 5],
  ["Get the hang of something", "To learn how to do something.", "Bir şeyin mantığını kapmak, alışmak.", "I am getting the hang of speaking English more naturally.", "get-thə-HANG-uv-it. Stress HANG.", "Use it to describe something you are learning now.", "After a few weeks, I started to ______ natural rhythm.", "Mantığını kapmak.", 5],
  ["Look into something", "To investigate or examine something.", "Bir şeyi araştırmak, incelemek.", "I will look into better ways to practice pronunciation.", "look-IN-tə. Stress IN.", "Say what you need to look into this week.", "I will ______ the schedule problem.", "Araştırmak.", 6],
  ["End up", "To finally be in a place or situation.", "Sonunda bir durumda olmak.", "I ended up rewriting the whole scene.", "end-UP. Stress UP.", "Describe where a plan ended up.", "We ______ rehearsing until midnight.", "Sonunda yapmak/olmak.", 6],
  ["Back someone up", "To support someone.", "Birini desteklemek, arkasında durmak.", "My team backed me up during the difficult production.", "back-me-UP. Stress UP.", "Talk about someone who backs you up.", "I trust her because she always ______.", "Desteklemek.", 6],
  ["Be tied up", "To be very busy and unavailable.", "Çok meşgul olmak, eli kolu bağlı olmak.", "I am tied up with rehearsals today.", "TIED-up. Stress TIED.", "Explain politely that you are busy.", "I cannot meet at noon. I am ______.", "Çok meşgul olmak.", 6],
  ["Go with the flow", "To accept events and adapt calmly.", "Akışına bırakmak.", "Sometimes on set, you have to go with the flow.", "go-with-thə-FLOW. Stress FLOW.", "Describe a situation where flexibility helped.", "The plan changed, so we had to ______.", "Akışına bırakmak.", 6],
  ["Put something off", "To postpone something.", "Bir şeyi ertelemek.", "Do not put off your pronunciation practice.", "put-it-OFF. Stress OFF.", "Name something you should not put off.", "I should not ______ my English practice again.", "Ertelemek.", 7],
  ["Drop by", "To visit briefly and casually.", "Uğramak.", "Drop by the theater after lunch.", "drop-BY. Stress BY.", "Invite someone to visit briefly.", "You can ______ after rehearsal.", "Uğramak.", 7],
  ["Pick up on", "To notice or understand something subtle.", "Bir şeyi fark etmek, sezmek.", "She picked up on the tension in the room.", "pick-up-ON. Stress ON.", "Describe a detail you picked up on.", "The audience will ______ that small gesture.", "Fark etmek.", 7],
  ["Keep in touch", "To continue communicating.", "İletişimde kalmak.", "Let us keep in touch after the festival.", "keep-in-TOUCH. Stress TOUCH.", "End a conversation warmly.", "It was good to meet you. Let us ______.", "İletişimde kalmak.", 7],
  ["Take care of", "To handle, manage, or look after someone/something.", "İlgilenmek, halletmek, bakımını üstlenmek.", "I will take care of the rehearsal notes.", "take-CARE-uv. Stress CARE.", "Say what you will handle today.", "Do not worry. I will ______ the details.", "Halletmek.", 7],
  ["Show up", "To arrive or appear.", "Ortaya çıkmak, gelmek.", "He showed up late to rehearsal.", "show-UP. Stress UP.", "Talk about arriving prepared.", "A professional should ______ on time.", "Gelmek/ortaya çıkmak.", 8],
  ["Run into someone", "To meet someone unexpectedly.", "Birine tesadüfen rastlamak.", "I ran into an old actor friend yesterday.", "run-IN-tə. Stress IN.", "Describe someone you ran into recently.", "I ______ my former teacher at the festival.", "Tesadüfen rastlamak.", 8],
  ["Settle in", "To become comfortable in a new place or situation.", "Alışmak, yerleşmek.", "It took me a week to settle in.", "SET-l-in. Stress SET.", "Talk about settling into a new routine.", "It takes time to ______ to a new city.", "Alışmak.", 8],
  ["Count on someone/something", "To rely on someone or something.", "Birine/bir şeye güvenmek.", "You can count on me to be prepared.", "COUNT-on. Stress COUNT.", "Talk about someone you can count on.", "I can always ______ my closest collaborator.", "Güvenmek.", 8],
  ["Miss out on", "To lose the chance to experience something.", "Bir fırsatı kaçırmak.", "Do not miss out on the chance to practice speaking.", "miss-OUT-on. Stress OUT.", "Name something you do not want to miss out on.", "I do not want to ______ this opportunity.", "Fırsatı kaçırmak.", 8],
  ["Get over something", "To recover from something difficult.", "Bir şeyi atlatmak, üstesinden gelmek.", "It took time to get over that failure.", "get-OH-vər. Stress OH.", "Talk about something you got over.", "It took months to ______ that disappointment.", "Atlatmak.", 9],
  ["Fill someone in", "To give someone missing information.", "Birini bilgilendirmek.", "Can you fill me in on what happened?", "fill-me-IN. Stress IN.", "Ask someone to update you.", "I missed the meeting. Can you ______?", "Bilgilendirmek.", 9],
  ["Cut back on", "To reduce the amount of something.", "Bir şeyi azaltmak.", "I should cut back on rushing when I speak English.", "cut-BACK-on. Stress BACK.", "Say one habit you should cut back on.", "I need to ______ speaking too quickly.", "Azaltmak.", 9],
  ["Get by", "To manage with limited resources or ability.", "İdare etmek.", "I can get by in English, but I want to sound polished.", "get-BY. Stress BY.", "Explain where you can get by and where you want to improve.", "I can ______ in casual English, but I want more precision.", "İdare etmek.", 9]
] as const;

export const dailyIdioms: Idiom[] = seedIdioms.map((item) => ({
  idiom: item[0],
  meaning: item[1],
  turkish: item[2],
  example: item[3],
  pronunciation: item[4],
  speakingPrompt: item[5],
  fillBlank: item[6],
  turkishPrompt: item[7],
  set: item[8]
}));
