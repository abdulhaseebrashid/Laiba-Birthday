import { useMemo } from 'react';

const HEART_EMOJIS = ['❤️', '🩷', '💕', '💗', '💖', '💝', '🌹', '💓'];

// ─── Rose petals (falling from top) ──────────────────────────────────────
function RosePetals({ count = 10 }) {
  const petals = useMemo(() =>
    Array.from({ length: count }, (_, i) => ({
      id: i,
      left:  `${Math.random() * 100}%`,
      dur:   `${5 + Math.random() * 6}s`,
      delay: `${Math.random() * 6}s`,
      px:    `${-40 + Math.random() * 80}px`,
      prot:  `${180 + Math.random() * 360}deg`,
      size:  `${14 + Math.random() * 10}px`,
    })), [count]);

  return (
    <>
      {petals.map((p) => (
        <span
          key={p.id}
          className="rose-petal"
          style={{
            left: p.left,
            top: '-3%',
            fontSize: p.size,
            '--pdur': p.dur,
            '--pdel': p.delay,
            '--px':   p.px,
            '--prot': p.prot,
          }}
        >
          🌸
        </span>
      ))}
    </>
  );
}

// ─── Floating hearts (rising from bottom) ─────────────────────────────────
export default function FloatingHearts({ count = 12, active = true, petals = false }) {
  const hearts = useMemo(() =>
    Array.from({ length: count }, (_, i) => ({
      id: i,
      emoji:    HEART_EMOJIS[i % HEART_EMOJIS.length],
      left:     `${4 + Math.random() * 92}%`,
      duration: `${3 + Math.random() * 5}s`,
      delay:    `${Math.random() * 5}s`,
      rot:      `${-18 + Math.random() * 36}deg`,
      size:     `${0.75 + Math.random() * 0.9}rem`,
    })), [count]);

  if (!active) return null;

  return (
    <div
      className="fixed inset-0 pointer-events-none z-10 overflow-hidden"
      aria-hidden="true"
    >
      {hearts.map((h) => (
        <span
          key={h.id}
          className="heart-float absolute select-none"
          style={{
            left: h.left,
            bottom: '-5%',
            fontSize: h.size,
            '--duration': h.duration,
            '--delay':    h.delay,
            '--rot':      h.rot,
          }}
        >
          {h.emoji}
        </span>
      ))}
      {petals && <RosePetals count={8} />}
    </div>
  );
}
