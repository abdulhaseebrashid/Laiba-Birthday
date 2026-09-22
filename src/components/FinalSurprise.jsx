import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Sparkles, Gift } from 'lucide-react';
import AnimatedBackground from './AnimatedBackground';
import FloatingHearts from './FloatingHearts';
import Confetti from './Confetti';
import { RomanticButton } from './RomanticButton';
import { birthdayMessage, finalSurpriseMessage } from '../data/questions';

// ─── Animated paragraph reveal ────────────────────────────────────────────
function AnimatedMessage({ text }) {
  const paragraphs = text.trim().split('\n\n');
  return (
    <div className="flex flex-col gap-5">
      {paragraphs.map((para, i) => (
        <motion.p
          key={i}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 + i * 0.22, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="text-white/80 text-base md:text-lg leading-relaxed"
          style={{
            fontFamily: 'var(--font-serif)',
            fontStyle: i > 0 ? 'italic' : 'normal',
          }}
        >
          {para}
        </motion.p>
      ))}
    </div>
  );
}

// ─── Final Surprise Modal ─────────────────────────────────────────────────
function SurpriseModal({ onClose }) {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Backdrop */}
      <motion.div
        className="absolute inset-0 bg-black/75 backdrop-blur-xl"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      />

      {/* Card */}
      <motion.div
        className="relative z-10 max-w-lg w-full glass-strong rounded-3xl p-8 md:p-12 text-center flex flex-col items-center gap-6 overflow-hidden"
        initial={{ scale: 0.75, opacity: 0, y: 50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.88, opacity: 0, y: 20 }}
        transition={{ type: 'spring', stiffness: 190, damping: 22 }}
        style={{
          boxShadow: '0 40px 100px rgba(0,0,0,0.65), 0 0 0 1px rgba(255,255,255,0.1), 0 0 60px rgba(244,63,94,0.2)',
        }}
      >
        {/* Inner floating hearts */}
        <div className="absolute inset-0 overflow-hidden rounded-3xl pointer-events-none" aria-hidden="true">
          {['❤️','💕','🌹','💖','🩷','💝'].map((em, i) => (
            <motion.span
              key={i}
              className="absolute"
              style={{ left: `${8 + i * 15}%`, bottom: '-8%', fontSize: `${0.9 + Math.random() * 0.6}rem` }}
              animate={{ y: [0, -280], opacity: [0, 0.8, 0] }}
              transition={{ duration: 3.5, delay: i * 0.55, repeat: Infinity, ease: 'easeOut' }}
            >
              {em}
            </motion.span>
          ))}
        </div>

        {/* Shaking envelope */}
        <motion.div
          animate={{ rotate: [0, -12, 12, -10, 10, -5, 5, 0] }}
          transition={{ duration: 1, delay: 0.35 }}
          className="text-7xl"
          style={{ filter: 'drop-shadow(0 0 24px rgba(244,63,94,0.65))' }}
        >
          💌
        </motion.div>

        <h3
          className="font-serif text-3xl text-white relative z-10"
          style={{ fontFamily: 'var(--font-serif)' }}
        >
          A Letter From My Heart
        </h3>

        <div className="text-left w-full relative z-10">
          {finalSurpriseMessage.trim().split('\n\n').map((para, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, x: -18 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.55 + i * 0.28 }}
              className="text-white/80 text-base md:text-lg leading-relaxed mb-4"
              style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic' }}
            >
              {para}
            </motion.p>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          className="flex items-center gap-2 relative z-10"
        >
          <Heart size={14} fill="currentColor" className="text-rose-500" />
          <span className="text-xs text-white/35 tracking-wider font-medium">Written with all my love</span>
          <Heart size={14} fill="currentColor" className="text-rose-500" />
        </motion.div>

        <RomanticButton variant="secondary" onClick={onClose} className="relative z-10 mt-1">
          Close 🥹
        </RomanticButton>
      </motion.div>
    </motion.div>
  );
}

// ─── Twinkling stars ──────────────────────────────────────────────────────
function TwinkleStars() {
  const stars = Array.from({ length: 18 }, (_, i) => ({
    id: i,
    size: 3 + Math.random() * 5,
    x: Math.random() * 100,
    y: Math.random() * 100,
    delay: Math.random() * 3.5,
    dur: 1.8 + Math.random() * 2,
  }));
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
      {stars.map((s) => (
        <motion.div
          key={s.id}
          className="absolute rounded-full bg-white"
          style={{ width: s.size, height: s.size, left: `${s.x}%`, top: `${s.y}%` }}
          animate={{ opacity: [0.1, 1, 0.1], scale: [1, 1.6, 1] }}
          transition={{ duration: s.dur, delay: s.delay, repeat: Infinity }}
        />
      ))}
    </div>
  );
}

// ─── Main FinalSurprise ───────────────────────────────────────────────────
export default function FinalSurprise() {
  const [showModal,    setShowModal]    = useState(false);
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setShowConfetti(false), 5500);
    return () => clearTimeout(t);
  }, []);

  const handleSurprise = () => {
    setShowModal(true);
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 4500);
  };

  return (
    <div className="page-container min-h-screen py-16">
      <AnimatedBackground variant="final" />
      <FloatingHearts count={16} petals />
      <Confetti active={showConfetti} count={100} />
      <TwinkleStars />

      <AnimatePresence>
        {showModal && <SurpriseModal onClose={() => setShowModal(false)} />}
      </AnimatePresence>

      <div className="relative z-20 w-full max-w-3xl mx-auto px-6 flex flex-col items-center text-center gap-10">

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="flex items-center gap-3"
        >
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Heart size={20} fill="currentColor" className="text-rose-400" />
          </motion.div>
          <span className="text-xs tracking-widest uppercase text-white/35 font-medium">
            For Liaba · September 23rd · With Love
          </span>
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, delay: 0.5, repeat: Infinity }}
          >
            <Heart size={20} fill="currentColor" className="text-rose-400" />
          </motion.div>
        </motion.div>

        {/* Main heading */}
        <motion.div
          initial={{ opacity: 0, y: 45 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
        >
          <h1
            className="font-serif text-5xl md:text-7xl leading-tight shimmer-text"
            style={{ fontFamily: 'var(--font-serif)' }}
          >
            Happy Birthday,
            <br />
            Liaba ❤️
          </h1>
        </motion.div>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="w-56 h-px"
          style={{ background: 'linear-gradient(90deg, transparent, #f43f5e, transparent)' }}
        />

        {/* Sub-message */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="text-xl md:text-2xl text-white/65 leading-relaxed max-w-xl"
          style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic' }}
        >
          You deserve all the happiness, smiles and beautiful moments this world can hold.
        </motion.p>

        {/* Birthday message card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85, duration: 0.9 }}
          className="glass-strong rounded-3xl p-8 md:p-10 w-full text-left"
          style={{ boxShadow: '0 20px 60px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.07)' }}
        >
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="text-sm tracking-widest text-rose-400 uppercase mb-6 font-medium flex items-center gap-2"
          >
            <Sparkles size={13} />
            On your special day, I just want you to know...
          </motion.p>
          <AnimatedMessage text={birthdayMessage} />
        </motion.div>

        {/* Final surprise button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.45, type: 'spring', stiffness: 200 }}
        >
          <RomanticButton
            id="final-surprise-btn"
            variant="primary"
            onClick={handleSurprise}
            className="text-lg px-10 py-5"
          >
            <span className="flex items-center gap-3">
              <Gift size={20} />
              One last surprise 🎁
              <Gift size={20} />
            </span>
          </RomanticButton>
        </motion.div>

        {/* Floating emoji row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.65 }}
          className="flex items-center gap-3 pb-4"
        >
          {['❤️','💕','🌹','💕','❤️'].map((em, i) => (
            <motion.span
              key={i}
              className="text-xl"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2.2, delay: i * 0.22, repeat: Infinity, ease: 'easeInOut' }}
            >
              {em}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
