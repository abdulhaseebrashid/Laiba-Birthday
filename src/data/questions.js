// hasEscapingNo: true  → escaping behavior on hover/touch for the secondary button
// extraButtons: [...]  → for questions with more than 2 answer options

export const questions = [
  {
    id: 1,
    text: "Do you love me?",
    emoji: "❤️",
    accent: "#f43f5e",
    yesButton: { label: "Yes ❤️" },
    noButton: { label: "No 🙈" },
    hasEscapingNo: true,
  },
  {
    id: 2,
    text: "Am I your favorite person in this entire universe?",
    emoji: "🥹",
    accent: "#e879f9",
    yesButton: { label: "Of course ❤️" },
    noButton: { label: "Maybe... 👀" },
    hasEscapingNo: true,
  },
  {
    id: 3,
    text: "If I asked you for one more year of beautiful memories together, would you say yes?",
    emoji: "💕",
    accent: "#fb7185",
    yesButton: { label: "Yes, always ❤️" },
    noButton: { label: "Let me think... 🙈" },
    hasEscapingNo: true,
  },
  {
    id: 4,
    text: "Are you ready for your birthday surprise?",
    emoji: "🎁",
    accent: "#fbbf24",
    yesButton: { label: "YESSS! 🎉" },
    noButton: { label: "Not yet 😭" },
    hasEscapingNo: true,
  },
  {
    id: 5,
    text: "Will you keep smiling all day today?",
    emoji: "🥺",
    accent: "#f43f5e",
    yesButton: { label: "Always for you ❤️" },
    noButton: { label: "I'll try 🥹" },
    hasEscapingNo: true,
  },
  {
    id: 6,
    text: "It's your birthday, soooo… can we break our bed tonight? 🔥",
    emoji: "🔥",
    accent: "#ff4d6d",
    isSpecial: true,
    yesButton: { label: "Yes babe 😘" },
    extraButtons: [
      { label: "Yes babe, harder 🔥" },
      { label: "Yeah, harder... yeah 🥵" },
    ],
    noButton: null,
  },
];

// ✏️ EASY TO EDIT — Change your birthday message here
export const birthdayMessage = `Laiba, on your special day — September 23rd — I want you to know that you are the most breathtakingly beautiful, endlessly kind, and genuinely wonderful soul I have ever been lucky enough to love.

Every single day with you feels like the universe decided to be generous — gifting me something I will never deserve but will always cherish. Your smile is my favorite sunrise. Your laugh is my favorite song. And the way you look at me makes me feel like the luckiest person alive.

I hope this year brings you every dream you've been quietly holding in your heart. Happiness that never fades. Love that only deepens. And moments so beautiful they steal your breath.

You deserve every single soft, magnificent, beautiful thing life has to offer.

Happy Birthday, my love. 🌹❤️`;

// ✏️ EASY TO EDIT — Change the final surprise message here
export const finalSurpriseMessage = `There are not enough words in any language to tell you how much you mean to me.

But I promise you this — every single day, in every little way I can, I will try to show you.

You are my home. My peace. My greatest joy. My most beautiful adventure.

On your birthday and every single day after — I choose you. Over and over again. Without hesitation.

I love you more than you'll ever fully know. ❤️`;
