import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Sparkles, Star } from 'lucide-react';
import AnimatedBackground from './AnimatedBackground';
import FloatingHearts from './FloatingHearts';
import { RomanticButton } from './RomanticButton';
import { voice } from '../utils/voiceAssistant';


// ─── Rock-solid Typewriter with cursor ────────────────────────────────────
function TypewriterText({ text, delay = 0, speed = 45, className = '' }) {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    setDisplayed('');
    setDone(false);
    let i = 0;
    let iv = null;

    const timer = setTimeout(() => {
      iv = setInterval(() => {
        i++;
        setDisplayed(text.slice(0, i));
        if (i >= text.length) {
          clearInterval(iv);
          setDone(true);
        }
      }, speed);
    }, delay * 1000);

    return () => {
      clearTimeout(timer);
      if (iv) clearInterval(iv);
    };
  }, [text, delay, speed]);

  return (
    <span className={className}>
      {displayed}
      {!done && (
        <motion.span
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 0.6, repeat: Infinity }}
          className="text-rose-400 font-normal ml-0.5"
        >|</motion.span>
      )}
    </span>
  );
}

// ─── Sparkle ring around the heart ───────────────────────────────────────
function SparkleRing() {
  const count = 8;
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none" aria-hidden="true">
      {Array.from({ length: count }, (_, i) => {
        const angle = (i / count) * 360;
        const rad   = 68;
        const x = Math.cos((angle * Math.PI) / 180) * rad;
        const y = Math.sin((angle * Math.PI) / 180) * rad;
        return (
          <motion.div
            key={i}
            className="absolute"
            style={{ x, y }}
            animate={{
              scale:   [0.5, 1.3, 0.5],
              opacity: [0.3, 1, 0.3],
              rotate:  [0, 180],
            }}
            transition={{
              duration: 2.5 + i * 0.25,
              delay:    i * 0.2,
              repeat:   Infinity,
              ease:     'easeInOut',
            }}
          >
            <Star
              size={i % 2 === 0 ? 10 : 7}
              className="text-rose-300"
              fill="currentColor"
            />
          </motion.div>
        );
      })}
    </div>
  );
}

// ─── Animated stats / love facts strip ───────────────────────────────────
const FACTS = [
  { icon: '❤️', label: 'Days loved' },
  { icon: '✨', label: 'Magical moments' },
  { icon: '🌹', label: 'Reasons you\'re special' },
  { icon: '💕', label: 'Times I smiled because of you' },
];

function LoveFact({ icon, label, value, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="glass rounded-2xl px-5 py-4 flex flex-col items-center gap-1.5 min-w-[110px]"
      style={{ boxShadow: '0 4px 20px rgba(244,63,94,0.12), 0 0 0 1px rgba(255,255,255,0.08)' }}
    >
      <span className="text-2xl" style={{ filter: 'drop-shadow(0 0 8px rgba(244,63,94,0.5))' }}>{icon}</span>
      <span className="text-2xl font-bold text-white">{value}</span>
      <span className="text-[10px] text-white/40 text-center leading-tight">{label}</span>
    </motion.div>
  );
}

// ─── Animated quote strip ─────────────────────────────────────────────────
const QUOTES = [
  '"You are my favorite notification." ❤️',
  '"In a sea of people, my eyes will always look for you." 🌹',
  '"Every love story is beautiful, but ours is my favorite." 💕',
];

function QuoteCarousel() {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx((p) => (p + 1) % QUOTES.length), 4500);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="relative h-10 overflow-hidden w-full max-w-xs mx-auto">
      <AnimatePresence mode="wait">
        <motion.p
          key={idx}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 text-center text-xs text-white/45 flex items-center justify-center px-4 leading-snug tracking-wide"
          style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic' }}
        >
          {QUOTES[idx]}
        </motion.p>
      </AnimatePresence>
    </div>
  );
}

// ─── Main Welcome Screen ──────────────────────────────────────────────────
export default function WelcomeScreen({ onStart }) {
  return (
    <div className="page-container min-h-screen">
      <AnimatedBackground />
      <FloatingHearts count={14} petals />

      {/* Radial center glow */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        aria-hidden="true"
      >
        <motion.div
          animate={{
            scale:   [1, 1.15, 1],
            opacity: [0.25, 0.45, 0.25],
          }}
          transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            width: 500, height: 500,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(244,63,94,0.28) 0%, transparent 70%)',
          }}
        />
      </div>

      <div className="relative z-20 w-full max-w-2xl mx-auto px-6 py-10 md:py-14 flex flex-col items-center text-center gap-6 md:gap-7">

        {/* Glowing heart with sparkle ring */}
        <motion.div
          className="relative"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <SparkleRing />
          <motion.div
            animate={{
              scale:  [1, 1.12, 1],
              filter: [
                'drop-shadow(0 0 18px rgba(244,63,94,0.55))',
                'drop-shadow(0 0 40px rgba(244,63,94,1))',
                'drop-shadow(0 0 18px rgba(244,63,94,0.55))',
              ],
            }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            className="text-7xl md:text-8xl relative z-10"
            style={{ display: 'block' }}
          >
            ❤️
          </motion.div>
        </motion.div>

        {/* Main name title */}
        <motion.h1
          initial={{ opacity: 0, y: 24, scale: 0.94 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="font-serif leading-tight"
          style={{ fontFamily: 'var(--font-serif)' }}
        >
          <span
            className="block text-6xl md:text-7xl lg:text-8xl gradient-text font-bold"
            style={{ textShadow: '0 0 60px rgba(244,63,94,0.28)' }}
          >
            Hey Liaba
          </span>
        </motion.h1>

        {/* Typewriter text container */}
        <div className="flex flex-col items-center gap-3 w-full max-w-lg min-h-[110px] justify-center px-2">
          {/* Line 1 */}
          <p
            className="text-xl md:text-2xl text-white/90 font-medium"
            style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic' }}
          >
            <TypewriterText
              text="Today is a little more special..."
              speed={50}
              delay={0.5}
            />
          </p>

          {/* Line 2 */}
          <p
            className="text-lg md:text-xl text-rose-200/85"
            style={{ fontFamily: 'var(--font-serif)' }}
          >
            <TypewriterText
              text="Because the most beautiful person in my world..."
              speed={45}
              delay={2.2}
            />
          </p>

          {/* Line 3 */}
          <p
            className="text-xl md:text-2xl text-white font-semibold"
            style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic' }}
          >
            <TypewriterText
              text="Was born on this magical day! 🎂✨"
              speed={50}
              delay={4.2}
            />
          </p>
        </div>

        {/* Decorative sparkle divider */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ delay: 0.6, duration: 0.8, ease: 'easeOut' }}
          className="flex items-center gap-4 w-full max-w-xs"
        >
          <div
            className="flex-1 h-px"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(244,63,94,0.6))' }}
          />
          <motion.span
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 7, repeat: Infinity, ease: 'linear' }}
          >
            <Sparkles size={18} className="text-rose-400" />
          </motion.span>
          <Heart size={16} fill="currentColor" className="text-rose-500" />
          <motion.span
            animate={{ rotate: [360, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: 'linear' }}
          >
            <Sparkles size={18} className="text-rose-400" />
          </motion.span>
          <div
            className="flex-1 h-px"
            style={{ background: 'linear-gradient(90deg, rgba(244,63,94,0.6), transparent)' }}
          />
        </motion.div>

        {/* Love stats cards */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="flex flex-wrap justify-center gap-3"
        >
          {FACTS.map((f, i) => (
            <LoveFact
              key={i}
              icon={f.icon}
              label={f.label}
              value="∞"
              delay={0.9 + i * 0.1}
            />
          ))}
        </motion.div>

        {/* Quote carousel */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="w-full"
        >
          <QuoteCarousel />
        </motion.div>

        {/* Start Button - ALWAYS Rendered with high visibility & spring animation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.88, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 1.0, type: 'spring', stiffness: 200, damping: 18 }}
          className="pt-2"
        >
          <RomanticButton
            id="start-surprise-btn"
            variant="primary"
            onClick={(e) => {
              voice.speakBirthdayWish();
              onStart?.(e);
            }}
            className="text-lg px-10 py-4 shadow-2xl"
          >
            <span className="flex items-center gap-3">
              <Sparkles size={18} />
              Start the surprise ✨
              <Sparkles size={18} />
            </span>
          </RomanticButton>

          <p className="mt-3 text-xs text-white/40 tracking-widest font-light">
            Made with ❤️ just for you, Liaba
          </p>
        </motion.div>
      </div>
    </div>
  );
}


