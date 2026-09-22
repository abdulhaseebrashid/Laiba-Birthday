// ─── Web Audio API Sound Synthesizer (100% Frontend & Zero External Dependencies) ───

class SoundManager {
  constructor() {
    this.ctx = null;
  }

  init() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  // 1. Soft Bubbly Pop Sound for standard button clicks
  playPop() {
    try {
      this.init();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const now = this.ctx.currentTime;

      osc.type = 'sine';
      osc.frequency.setValueAtTime(520, now);
      osc.frequency.exponentialRampToValueAtTime(1080, now + 0.08);

      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.08);
    } catch {
      // Audio context might be restricted before interaction
    }
  }

  // 2. Romantic Chime / Harp Sound for candles, major steps & special Q6
  playChime() {
    try {
      this.init();
      if (!this.ctx) return;

      const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6 (C Major Arpeggio)
      const now = this.ctx.currentTime;

      notes.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const noteTime = now + idx * 0.09;

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, noteTime);

        gain.gain.setValueAtTime(0.08, noteTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, noteTime + 0.5);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(noteTime);
        osc.stop(noteTime + 0.5);
      });
    } catch {
      // Ignore audio restriction
    }
  }

  // 3. Playful Escape Sound when negative buttons move away
  playEscape() {
    try {
      this.init();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const now = this.ctx.currentTime;

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(320, now);
      osc.frequency.exponentialRampToValueAtTime(680, now + 0.12);

      gain.gain.setValueAtTime(0.07, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.12);
    } catch {
      // Ignore audio restriction
    }
  }

  // 4. Grand Birthday Celebration Fanfare Sound
  playCelebration() {
    try {
      this.init();
      if (!this.ctx) return;

      const notes = [523.25, 659.25, 783.99, 987.77, 1046.50, 1318.51];
      const now = this.ctx.currentTime;

      notes.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const startTime = now + idx * 0.12;

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, startTime);

        gain.gain.setValueAtTime(0.1, startTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 0.7);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(startTime);
        osc.stop(startTime + 0.7);
      });
    } catch {
      // Ignore audio restriction
    }
  }

  // 5. Synthesized Happy Birthday Tune (C4 C4 D4 C4 F4 E4...)
  playHappyBirthdayTune() {
    try {
      this.init();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      // Notes with frequency & timing offset: "Happy Birthday To You..."
      const melody = [
        { f: 261.63, d: 0.35, t: 0 },    // Hap-
        { f: 261.63, d: 0.35, t: 0.4 },  // py
        { f: 293.66, d: 0.7,  t: 0.8 },  // Birth-
        { f: 261.63, d: 0.7,  t: 1.6 },  // day
        { f: 349.23, d: 0.7,  t: 2.4 },  // to
        { f: 329.63, d: 1.2,  t: 3.2 },  // you
        
        { f: 261.63, d: 0.35, t: 4.5 },  // Hap-
        { f: 261.63, d: 0.35, t: 4.9 },  // py
        { f: 293.66, d: 0.7,  t: 5.3 },  // Birth-
        { f: 261.63, d: 0.7,  t: 6.1 },  // day
        { f: 392.00, d: 0.7,  t: 6.9 },  // to
        { f: 349.23, d: 1.2,  t: 7.7 },  // you (Laiba!)
      ];

      melody.forEach((note) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const start = now + note.t;

        osc.type = 'sine';
        osc.frequency.setValueAtTime(note.f, start);

        gain.gain.setValueAtTime(0.09, start);
        gain.gain.exponentialRampToValueAtTime(0.0001, start + note.d);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(start);
        osc.stop(start + note.d);
      });
    } catch {
      // Ignore audio restriction
    }
  }
}

export const sounds = new SoundManager();

