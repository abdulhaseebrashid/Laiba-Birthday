// ─── Browser Web Speech API Voice Assistant (100% Frontend - No Backend Required) ───

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
      this.voices = window.speechSynthesis.getVoices();
    }
  }

  speak(text, options = {}) {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

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
      // Ignore if browser restricts speech prior to user interaction
    }
  }

  // Pre-configured voice events requested by user:

  // 1. Birthday Wish Voice on "Start the surprise" button click
  speakBirthdayWish() {
    this.speak("Happy Birthday Liaba! I love you so much, my sweetheart! Let's start your surprise!");
  }

  // 2. Playful Deny / Hesitant Voice Lines per question
  speakDenyResponse(questionId) {
    switch (questionId) {
      case 1:
        this.speak("Say you love me first! You can't say no to me!");
        break;
      case 2:
        this.speak("Hey! You know the right answer is me!");
        break;
      case 3:
        this.speak("Aww come on, Liaba! You know I am your favorite person!");
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

  // 3. Romantic & Cheeky Voice for Q6 Bedroom Buttons
  speakSpecialOption(optionLabel) {
    if (optionLabel.includes('harder... yeah')) {
      this.speak("Mmm... yes baby! Tonight is going to be wild!");
    } else if (optionLabel.includes('harder')) {
      this.speak("Ooh, harder it is! You are so hot, Liaba!");
    } else {
      this.speak("Yay! Yes babe, I can't wait for tonight with you!");
    }
  }
}

export const voice = new VoiceAssistant();
