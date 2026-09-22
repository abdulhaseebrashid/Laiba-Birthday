// ─── Browser Web Speech API Voice Assistant (100% Non-blocking Frontend Speech) ───

class VoiceAssistant {
  constructor() {
    this.voices = [];
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.loadVoices();
      window.speechSynthesis.onvoiceschanged = () => this.loadVoices();
    }
  }

  loadVoices() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      try {
        this.voices = window.speechSynthesis.getVoices();
      } catch {
        // ignore voice loading failure
      }
    }
  }

  speak(text, options = {}) {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    // Use setTimeout so speech synthesis never blocks React state changes / navigation
    setTimeout(() => {
      try {
        window.speechSynthesis.cancel(); // Stop any ongoing speech immediately

        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = options.rate || 0.92;   // Gentle, clear pacing
        utterance.pitch = options.pitch || 1.15;  // Sweet, warm romantic pitch
        utterance.volume = options.volume || 1.0;

        // Select sweet natural English voice if available
        const sweetVoice = this.voices.find(
          (v) =>
            v.lang.startsWith('en') &&
            (v.name.includes('Natural') ||
              v.name.includes('Google') ||
              v.name.includes('Samantha') ||
              v.name.includes('Victoria') ||
              v.name.includes('Female') ||
              v.name.includes('Karen'))
        ) || this.voices.find((v) => v.lang.startsWith('en'));

        if (sweetVoice) {
          utterance.voice = sweetVoice;
        }

        window.speechSynthesis.speak(utterance);
      } catch {
        // Ignore if browser restricts speech
      }
    }, 10);
  }

  // Pre-configured voice events requested by user:

  // 1. Birthday Wish Voice on "Start the surprise" button click
  speakBirthdayWish() {
    this.speak("Happy Birthday Laiba! I love you so much, my sweetheart! Let's start your surprise!");
  }

  // 2. Click on "There's something I want to ask you..." button
  speakHurryIntro() {
    this.speak("Ahan, you seem in a hurry to see your surprise, my love!");
  }

  // 3. Question positive answers voice responses
  speakPositiveAnswer(questionId) {
    switch (questionId) {
      case 1:
        // Q1: Do you love me?
        this.speak("I love you too babe! Hehe shaka laka boom boom, moving to second question!");
        break;
      case 2:
        // Q2: Am I your favorite person?
        this.speak("I know babe, I am your favorite person! Numnum!");
        break;
      case 3:
        // Q3: Can I get one more year together?
        this.speak("We will be together for our entire life, Laiba!");
        break;
      case 4:
        // Q4: Are you ready for your birthday surprise?
        this.speak("I am gonna eat your lips babe!");
        break;
      case 5:
        // Q5: Will you keep smiling all day?
        this.speak("We will laugh all night when you are in my arms!");
        break;
      default:
        this.speak("I love you so much Laiba!");
        break;
    }
  }

  // 4. Playful Deny / Hesitant Voice Lines per question
  speakDenyResponse(questionId) {
    switch (questionId) {
      case 1:
        this.speak("Say you love me first! You can't say no to me!");
        break;
      case 2:
        this.speak("Hey! You know the right answer is me!");
        break;
      case 3:
        this.speak("Aww come on, Laiba! You know I am your favorite person!");
        break;
      case 4:
        this.speak("No excuses! One hundred kisses are minimum today!");
        break;
      case 5:
        this.speak("You are spending your birthday with me, no doubts allowed!");
        break;
      default:
        this.speak("Say you love me first! You can't choose that!");
        break;
    }
  }

  // 5. Bedroom Question 6 Buttons
  speakSpecialOption(btnIndex) {
    if (btnIndex === 0) {
      // Yes babe 😘
      this.speak("Sure, we'll break our bed sexy!");
    } else if (btnIndex === 1) {
      // Yes babe, harder 🔥
      this.speak("I'm gonna break your back honey!");
    } else {
      // Yeah, harder... yeah 🥵
      this.speak("I'm gonna eat you tonight sweetheart!");
    }
  }

  // 6. One last surprise click
  speakFinalSurprise() {
    this.speak("Your smile is precious. You are precious. Kissing your eyes, Laiba.");
  }
}

export const voice = new VoiceAssistant();
