import { useMemo } from 'react';

const COLORS = ['#f43f5e', '#fb7185', '#fda4af', '#e879f9', '#c084fc', '#fbbf24', '#f472b6'];

export default function Confetti({ active = false, count = 80 }) {
  const pieces = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      color: COLORS[i % COLORS.length],
      left: `${Math.random() * 100}%`,
      width: `${6 + Math.random() * 8}px`,
      height: `${10 + Math.random() * 8}px`,
      duration: `${2 + Math.random() * 2.5}s`,
      delay: `${Math.random() * 2}s`,
      rot: `${360 + Math.random() * 720}deg`,
      scale: Math.random() > 0.5 ? '-1' : '1',
    }));
  }, [count]);

  if (!active) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden" aria-hidden="true">
      {pieces.map((p) => (
        <div
          key={p.id}
          className="confetti-piece absolute top-0"
          style={{
            left: p.left,
            width: p.width,
            height: p.height,
            backgroundColor: p.color,
            '--cduration': p.duration,
            '--cdelay': p.delay,
            '--crot': p.rot,
            '--cscale': p.scale,
          }}
        />
      ))}
    </div>
  );
}
