import { motion } from 'motion/react';
import { Sparkles, Heart } from 'lucide-react';
import AnimatedBackground from './AnimatedBackground';
import FloatingHearts from './FloatingHearts';
import { RomanticButton } from './RomanticButton';
import { sounds } from '../utils/soundEffects';


// ─── Candle flame ─────────────────────────────────────────────────────────
function Candle({ delay = 0 }) {
  return (
    <div className="flex flex-col items-center">
      {/* Flame */}
      <motion.div
        animate={{ scaleY: [1, 1.35, 0.85, 1.2, 1], scaleX: [1, 0.75, 1.1, 0.85, 1] }}
        transition={{ duration: 0.55 + delay * 0.15, repeat: Infinity, ease: 'easeInOut', delay }}
        className="w-3.5 h-6 rounded-full"
        style={{
          background: 'radial-gradient(circle at 50% 75%, #fbbf24, #f97316, #ef4444)',
          boxShadow: '0 0 10px #fbbf24, 0 0 20px rgba(251,191,36,0.55)',
          transformOrigin: 'bottom center',
        }}
      />
      {/* Wick */}
      <div className="w-1 h-9 rounded-full" style={{ background: 'linear-gradient(to bottom, #fde68a, #d97706)' }} />
    </div>
  );
}

// ─── Birthday cake ────────────────────────────────────────────────────────
function BirthdayCake() {
  return (
    <div className="relative flex flex-col items-center" aria-hidden="true">
      {/* Candles row */}
      <div className="flex gap-7 mb-1 relative z-10">
        {[0, 1, 2].map((i) => <Candle key={i} delay={i * 0.2} />)}
      </div>

      {/* Tier 1 — top */}
      <motion.div
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.25, type: 'spring', stiffness: 240 }}
        className="w-28 h-14 rounded-t-2xl flex items-center justify-center text-white text-[10px] font-bold tracking-widest"
        style={{
          background: 'linear-gradient(135deg, #f9a8d4, #f43f5e)',
          boxShadow: '0 4px 20px rgba(244,63,94,0.45)',
        }}
      >
        LAIBA ❤️
      </motion.div>

      {/* Tier 2 — middle */}
      <motion.div
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.38, type: 'spring', stiffness: 240 }}
        className="w-44 h-16 flex items-center justify-center gap-3 text-2xl"
        style={{
          background: 'linear-gradient(135deg, #fda4af, #f43f5e)',
          boxShadow: '0 4px 24px rgba(244,63,94,0.5)',
        }}
      >
        🌹 ❤️ 🌹
      </motion.div>

      {/* Tier 3 — bottom */}
      <motion.div
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.5, type: 'spring', stiffness: 240 }}
        className="w-60 h-20 rounded-b-3xl flex items-center justify-center text-4xl"
        style={{
          background: 'linear-gradient(135deg, #be123c, #f43f5e)',
          boxShadow: '0 8px 36px rgba(244,63,94,0.55)',
        }}
      >
        🎂
      </motion.div>

      {/* Plate shadow */}
      <div
        className="w-72 h-3 rounded-full mt-1"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.18), transparent)' }}
      />

      {/* Glow pool */}
      <motion.div
        animate={{ opacity: [0.5, 0.9, 0.5], scaleX: [1, 1.15, 1] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-64 h-8 rounded-full"
        style={{
          background: 'radial-gradient(ellipse, rgba(244,63,94,0.5) 0%, transparent 70%)',
          filter: 'blur(14px)',
        }}
      />
    </div>
  );
}

// ─── Animated floating balloons ────────────────────────────────────────────
function Balloons() {
  const balloons = [
    { emoji: '🎈', x: '-20%', delay: 0, dur: 3.2 },
    { emoji: '🎈', x: '20%',  delay: 0.4, dur: 3.6 },
    { emoji: '🎀', x: '-32%', delay: 0.8, dur: 4 },
    { emoji: '🎊', x: '32%',  delay: 1.1, dur: 3.4 },
  ];
  return (
    <div className="absolute top-0 left-0 right-0 h-full pointer-events-none" aria-hidden="true">
      {balloons.map((b, i) => (
        <motion.div
          key={i}
          className="absolute text-4xl md:text-5xl"
          style={{ left: `calc(50% + ${b.x})`, top: '4%' }}
          animate={{ y: [0, -20, 0], rotate: [-6, 6, -6] }}
          transition={{ duration: b.dur, repeat: Infinity, ease: 'easeInOut', delay: b.delay }}
        >
          {b.emoji}
        </motion.div>
      ))}
    </div>
  );
}

// ─── Scrolling ribbon of well-wishes ─────────────────────────────────────
const WISHES = [
  '✨ Wishing you all the happiness', '❤️ You deserve every beautiful thing',
  '🌹 Today is your day, Liaba', '💕 May all your dreams come true',
  '🎂 Another year of you being amazing', '🥂 Cheers to you, gorgeous',
];

function WishRibbon() {
  const doubled = [...WISHES, ...WISHES];
  return (
    <div className="overflow-hidden w-full max-w-lg relative" style={{ maskImage: 'linear-gradient(90deg, transparent, white 15%, white 85%, transparent)' }}>
      <motion.div
        className="flex gap-8 whitespace-nowrap"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
      >
        {doubled.map((w, i) => (
          <span key={i} className="text-xs text-white/35 flex-shrink-0" style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic' }}>
            {w}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

// ─── Main BirthdayIntro ───────────────────────────────────────────────────
export default function BirthdayIntro({ onContinue }) {
  return (
    <div className="page-container min-h-screen">
      <AnimatedBackground />
      <FloatingHearts count={10} petals />
      <Balloons />

      <div className="relative z-20 w-full max-w-2xl mx-auto px-6 py-16 flex flex-col items-center text-center gap-8">

        {/* Date badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-2 px-5 py-2 rounded-full glass text-sm font-medium border"
          style={{
            color: '#fda4af',
            borderColor: 'rgba(244,63,94,0.25)',
            boxShadow: '0 0 20px rgba(244,63,94,0.15)',
          }}
        >
          <Sparkles size={14} className="text-rose-400" />
          <span>September 23rd · Your Birthday 🎂</span>
          <Sparkles size={14} className="text-rose-400" />
        </motion.div>

        {/* Main heading */}
        <motion.h1
          initial={{ opacity: 0, y: 34 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          className="font-serif leading-tight"
          style={{ fontFamily: 'var(--font-serif)' }}
        >
          <span
            className="block text-5xl md:text-6xl lg:text-7xl gradient-text"
            style={{ textShadow: '0 4px 30px rgba(244,63,94,0.3)' }}
          >
            Happy Birthday,
          </span>
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.7 }}
            className="block text-white text-5xl md:text-6xl lg:text-7xl mt-1"
          >
            Laiba <span className="text-rose-400">❤️</span>
          </motion.span>
        </motion.h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.7 }}
          className="text-xl md:text-2xl text-white/55 leading-relaxed"
          style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic' }}
        >
          Today is all about you — the most wonderful person I know. ✨
        </motion.p>

        {/* Cake */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.8 }}
          className="my-2"
        >
          <BirthdayCake />
        </motion.div>

        {/* Scrolling wishes */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="w-full"
        >
          <WishRibbon />
        </motion.div>

        {/* Decorative hearts row */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.0, type: 'spring' }}
          className="flex items-center gap-3"
        >
          {['🌹','❤️','💕','❤️','🌹'].map((em, i) => (
            <motion.span
              key={i}
              className="text-xl"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 2.2, delay: i * 0.18, repeat: Infinity, ease: 'easeInOut' }}
            >
              {em}
            </motion.span>
          ))}
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.05, type: 'spring', stiffness: 200 }}
        >
          <RomanticButton
            id="birthday-continue-btn"
            variant="primary"
            onClick={() => {
              try { voice.speakHurryIntro(); } catch {}
              onContinue?.();
            }}
            className="text-lg px-10 py-5"
          >
            There&apos;s something I want to ask you... 💌
          </RomanticButton>
        </motion.div>
      </div>
    </div>
  );
}
