import { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Flame } from 'lucide-react';
import ProgressIndicator from './ProgressIndicator';
import { RomanticButton, EscapingButton } from './RomanticButton';
import AnimatedBackground from './AnimatedBackground';
import { voice } from '../utils/voiceAssistant';


// ─── Per-question decoration configs ─────────────────────────────────────
const Q_DECO = {
  1: { emojis: ['❤️','💕','🌹'], ring: '#f43f5e' },
  2: { emojis: ['🥹','✨','💫'], ring: '#e879f9' },
  3: { emojis: ['💕','🌸','💗'], ring: '#fb7185' },
  4: { emojis: ['🎁','🎉','✨'], ring: '#fbbf24' },
  5: { emojis: ['🥺','😊','🌟'], ring: '#f43f5e' },
  6: { emojis: ['🔥','💋','🌹'], ring: '#ff4d6d' },
};

// ─── Orbiting emoji decoration ────────────────────────────────────────────
function OrbitingEmojis({ qId }) {
  const deco   = Q_DECO[qId] || Q_DECO[1];
  const radius = 90;

  return (
    <div className="absolute inset-0 pointer-events-none flex items-center justify-center" aria-hidden="true">
      {deco.emojis.map((em, i) => {
        const angle  = (i / deco.emojis.length) * 360;
        const delay  = i * 0.35;
        const dur    = 6 + i * 0.8;
        const rad    = radius + i * 10;
        return (
          <motion.div
            key={i}
            className="absolute text-2xl"
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0, 1, 1, 0],
              rotate: [angle, angle + 360],
            }}
            transition={{
              opacity:  { duration: 1, delay },
              rotate:   { duration: dur, repeat: Infinity, ease: 'linear', delay },
            }}
            style={{ transformOrigin: `0 ${rad}px` }}
          >
            {em}
          </motion.div>
        );
      })}
    </div>
  );
}

// ─── Floating hearts burst on answer ─────────────────────────────────────
function HeartBurst({ active, isSpecial = false }) {
  if (!active) return null;
  const emojis = isSpecial
    ? ['🔥','💋','🥵','❤️‍🔥','🌹','🥵','💋','🔥']
    : ['❤️','💕','🌹','💗','💖','💝','🩷','❤️'];

  return (
    <div className="fixed inset-0 pointer-events-none flex items-center justify-center z-40" aria-hidden="true">
      {emojis.map((em, i) => {
        const angle = (i / emojis.length) * 360;
        const dist  = 70 + Math.random() * 80;
        return (
          <motion.div
            key={i}
            className="absolute text-2xl"
            initial={{ scale: 0, x: 0, y: 0, opacity: 1 }}
            animate={{
              scale:   [0, 1.5, 0.8],
              x: Math.cos((angle * Math.PI) / 180) * dist,
              y: Math.sin((angle * Math.PI) / 180) * dist,
              opacity: [1, 1, 0],
              rotate:  [0, angle > 180 ? 30 : -30],
            }}
            transition={{ duration: 0.75, ease: 'easeOut' }}
          >
            {em}
          </motion.div>
        );
      })}
    </div>
  );
}

// ─── Special Q6 — three-button cheeky screen ─────────────────────────────
function SpecialQuestionScreen({ question, questionIndex, totalQuestions, onAnswer }) {
  const [showBurst, setShowBurst] = useState(false);
  const containerRef = useRef(null);

  const handleAnswer = useCallback((label) => {
    setShowBurst(true);
    setTimeout(() => { setShowBurst(false); onAnswer(label); }, 800);
  }, [onAnswer]);

  const allButtons = [
    question.yesButton,
    ...(question.extraButtons || []),
  ];

  return (
    <div className="page-container">
      <AnimatedBackground variant="special" />
      <HeartBurst active={showBurst} isSpecial />

      {/* Fire particles */}
      <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden" aria-hidden="true">
        {Array.from({ length: 10 }, (_, i) => (
          <motion.span
            key={i}
            className="absolute text-xl"
            style={{ left: `${Math.random() * 100}%`, bottom: '-5%', fontSize: `${0.8 + Math.random()}rem` }}
            animate={{ y: [0, '-100vh'], opacity: [0, 0.9, 0] }}
            transition={{ duration: 3 + Math.random() * 3, delay: Math.random() * 4, repeat: Infinity, ease: 'easeIn' }}
          >
            🔥
          </motion.span>
        ))}
      </div>

      <motion.div
        key="q6"
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: -20 }}
        transition={{ type: 'spring', stiffness: 180, damping: 22 }}
        className="relative z-20 w-full max-w-2xl mx-auto px-4"
      >
        <div
          ref={containerRef}
          className="glass-strong rounded-3xl p-8 md:p-12 flex flex-col items-center gap-8 text-center"
          style={{
            minHeight: 420,
            boxShadow: '0 24px 80px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,77,109,0.18), 0 0 60px rgba(255,77,109,0.12)',
            border: '1px solid rgba(255,100,130,0.25)',
          }}
        >
          <ProgressIndicator current={questionIndex} total={totalQuestions} />

          {/* Animated flame emoji */}
          <motion.div
            initial={{ scale: 0, rotate: -20 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 280, damping: 16, delay: 0.1 }}
            className="text-6xl"
          >
            <motion.span
              animate={{ scale: [1, 1.2, 1], rotate: [-5, 5, -5] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              style={{ display: 'inline-block', filter: 'drop-shadow(0 0 20px rgba(255,77,109,0.7))' }}
            >
              🔥
            </motion.span>
          </motion.div>

          {/* Question text */}
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.55 }}
            className="font-serif text-2xl md:text-3xl text-white/95 leading-snug"
            style={{ fontFamily: 'var(--font-serif)', textShadow: '0 2px 20px rgba(255,77,109,0.3)' }}
          >
            {question.text}
          </motion.h2>

          {/* Three answer buttons */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.28, duration: 0.5 }}
            className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-4 w-full"
          >
            {allButtons.map((btn, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.35 + idx * 0.12, type: 'spring', stiffness: 260 }}
              >
                <RomanticButton
                  id={`q6-btn-${idx}`}
                  variant={idx === 0 ? 'primary' : idx === 1 ? 'fire' : 'fire'}
                  onClick={() => {
                    voice.speakSpecialOption(idx);
                    handleAnswer(btn.label);
                  }}
                  className={idx > 0 ? 'text-sm md:text-base' : ''}
                >
                  <span className="flex items-center gap-2">
                    {idx > 0 && <Flame size={14} className="text-orange-300" />}
                    {btn.label}
                    {idx > 0 && <Flame size={14} className="text-orange-300" />}
                  </span>
                </RomanticButton>
              </motion.div>
            ))}
          </motion.div>

          {/* Subtle disclaimer */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="text-xs text-white/25 italic"
          >
            All answers lead to the same beautiful place 😏
          </motion.p>
        </div>
      </motion.div>
    </div>
  );
}

// ─── Standard question screen ─────────────────────────────────────────────
export default function QuestionScreen({ question, questionIndex, totalQuestions, onAnswer }) {
  const [showBurst, setShowBurst] = useState(false);
  const containerRef = useRef(null);

  const handleAnswer = useCallback((label) => {
    setShowBurst(true);
    setTimeout(() => { setShowBurst(false); onAnswer(label); }, 750);
  }, [onAnswer]);

  if (question.isSpecial) {
    return (
      <SpecialQuestionScreen
        question={question}
        questionIndex={questionIndex}
        totalQuestions={totalQuestions}
        onAnswer={onAnswer}
      />
    );
  }

  return (
    <div className="page-container" aria-label={`Question ${questionIndex} of ${totalQuestions}`}>
      <AnimatedBackground />
      <HeartBurst active={showBurst} />

      <motion.div
        key={question.id}
        initial={{ opacity: 0, scale: 0.9, y: 32 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: -24 }}
        transition={{ type: 'spring', stiffness: 190, damping: 23 }}
        className="relative z-20 w-full max-w-2xl mx-auto px-4"
      >
        <div
          ref={containerRef}
          className="glass-strong rounded-3xl p-8 md:p-12 flex flex-col items-center gap-8 text-center relative overflow-hidden"
          style={{
            minHeight: 400,
            boxShadow: '0 24px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.075)',
          }}
        >
          {/* Orbiting emoji decoration */}
          <OrbitingEmojis qId={question.id} />

          {/* Soft inner glow */}
          <div
            className="absolute inset-0 pointer-events-none rounded-3xl"
            style={{
              background: `radial-gradient(ellipse at 50% -10%, ${Q_DECO[question.id]?.ring || '#f43f5e'}22 0%, transparent 65%)`,
            }}
          />

          {/* Progress */}
          <div className="relative z-10">
            <ProgressIndicator current={questionIndex} total={totalQuestions} />
          </div>

          {/* Animated emoji */}
          <motion.div
            key={`emoji-${question.id}`}
            initial={{ scale: 0, rotate: -25 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 16, delay: 0.08 }}
            className="relative z-10 text-5xl md:text-6xl"
          >
            <motion.span
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
              style={{
                display: 'inline-block',
                filter: `drop-shadow(0 0 18px ${Q_DECO[question.id]?.ring || '#f43f5e'}88)`,
              }}
            >
              {question.emoji}
            </motion.span>
          </motion.div>

          {/* Question */}
          <motion.h2
            key={`text-${question.id}`}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.14, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 font-serif text-2xl md:text-3xl text-white/95 leading-snug"
            style={{ fontFamily: 'var(--font-serif)', textShadow: '0 2px 20px rgba(0,0,0,0.4)' }}
          >
            {question.text}
          </motion.h2>

          {/* Buttons */}
          <motion.div
            key={`btns-${question.id}`}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.26, duration: 0.5 }}
            className="relative z-10 flex flex-wrap items-center justify-center gap-4 w-full"
          >
            {/* Yes button — always primary */}
            <RomanticButton
              id={`yes-btn-${question.id}`}
              variant="primary"
              onClick={() => {
                voice.speakPositiveAnswer(question.id);
                handleAnswer(question.yesButton.label);
              }}
            >
              <span className="flex items-center gap-2">
                <Heart size={15} className="inline" fill="currentColor" />
                {question.yesButton.label}
              </span>
            </RomanticButton>

            {/* No/hesitant button — always escaping with voice feedback */}
            {question.noButton && (
              <EscapingButton
                id={`no-btn-${question.id}`}
                containerRef={containerRef}
                variant="secondary"
                onEscape={() => voice.speakDenyResponse(question.id)}
                onClick={() => handleAnswer(question.noButton.label)}
              >
                {question.noButton.label}
              </EscapingButton>
            )}
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
