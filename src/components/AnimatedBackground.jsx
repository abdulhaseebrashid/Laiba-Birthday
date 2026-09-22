import { useMemo } from 'react';

const ORBS = [
  { cls: 'orb-rose',   top: '-15%', left: '-15%', w: '65vw' },
  { cls: 'orb-purple', bottom: '-12%', right: '-12%', w: '55vw' },
  { cls: 'orb-pink',   top: '30%', left: '40%', w: '45vw' },
];

const FIRE_ORBS = [
  { cls: 'orb-fire',   top: '-10%', right: '-10%', w: '55vw' },
  { cls: 'orb-rose',   bottom: '-10%', left: '-10%', w: '50vw' },
  { cls: 'orb-pink',   top: '40%', left: '30%', w: '40vw' },
];

export default function AnimatedBackground({ variant = 'default' }) {
  const particles = useMemo(() =>
    Array.from({ length: 22 }, (_, i) => ({
      id: i,
      size: `${3 + Math.random() * 5}px`,
      left: `${Math.random() * 100}%`,
      top:  `${Math.random() * 100}%`,
      color: i % 3 === 0
        ? 'rgba(244,63,94,0.65)'
        : i % 3 === 1
        ? 'rgba(253,164,175,0.50)'
        : 'rgba(216,180,254,0.45)',
      dur: `${2.5 + Math.random() * 3}s`,
      del: `${Math.random() * 3}s`,
      px:  `${-18 + Math.random() * 36}px`,
      py:  `${-18 + Math.random() * 36}px`,
    })), []);

  const isSpecial = variant === 'special';
  const isFinal   = variant === 'final';
  const orbs      = isSpecial ? FIRE_ORBS : ORBS;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {/* Base gradient */}
      <div
        className="absolute inset-0"
        style={{
          background: isSpecial
            ? 'linear-gradient(135deg, #130008 0%, #200010 40%, #1a0015 100%)'
            : 'linear-gradient(135deg, #0d0814 0%, #160a22 50%, #1a0820 100%)',
        }}
      />

      {/* Ambient orbs */}
      {orbs.map((o, i) => (
        <div
          key={i}
          className={`orb ${o.cls} absolute`}
          style={{
            width: o.w, height: o.w,
            top: o.top, left: o.left,
            bottom: o.bottom, right: o.right,
            opacity: 0.55,
          }}
        />
      ))}

      {/* Final-screen center glow */}
      {isFinal && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            style={{
              width: 480, height: 480,
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(244,63,94,0.22) 0%, transparent 70%)',
              animation: 'glowPulse 3.5s ease-in-out infinite',
            }}
          />
        </div>
      )}

      {/* Glowing micro-particles */}
      {particles.map((p) => (
        <div
          key={p.id}
          className="particle"
          style={{
            width: p.size, height: p.size,
            left: p.left, top: p.top,
            background: p.color,
            boxShadow: `0 0 6px ${p.color}`,
            '--pduration': p.dur,
            '--pdelay':    p.del,
            '--px': p.px,
            '--py': p.py,
          }}
        />
      ))}

      {/* Subtle dot-grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: 'radial-gradient(rgba(255,255,255,0.8) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />
    </div>
  );
}
