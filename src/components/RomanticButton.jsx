import { useState, useRef, useCallback, useId } from 'react';
import { motion, useSpring } from 'motion/react';

// ─── Ripple effect on click ───────────────────────────────────────────────
function useRipple() {
  const [ripples, setRipples] = useState([]);

  const addRipple = useCallback((e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX || rect.left + rect.width / 2) - rect.left;
    const y = (e.clientY || rect.top + rect.height / 2) - rect.top;
    const id = Date.now();
    setRipples((prev) => [...prev, { id, x, y }]);
    setTimeout(() => setRipples((prev) => prev.filter((r) => r.id !== id)), 700);
  }, []);

  return { ripples, addRipple };
}

// ─── Primary / secondary / ghost button ──────────────────────────────────
export function RomanticButton({ onClick, children, className = '', variant = 'primary', disabled = false, id }) {
  const { ripples, addRipple } = useRipple();

  const styleMap = {
    primary: {
      background: 'linear-gradient(135deg, #f43f5e 0%, #be123c 100%)',
      boxShadow: '0 4px 28px rgba(244,63,94,0.5), inset 0 1px 0 rgba(255,255,255,0.14)',
      color: 'white',
    },
    secondary: {
      background: 'rgba(255,255,255,0.075)',
      boxShadow: '0 2px 14px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.08)',
      border: '1px solid rgba(255,255,255,0.13)',
      color: 'white',
    },
    fire: {
      background: 'linear-gradient(135deg, #ff4d6d 0%, #c2185b 100%)',
      boxShadow: '0 4px 28px rgba(255,77,109,0.55), inset 0 1px 0 rgba(255,255,255,0.16)',
      color: 'white',
    },
    ghost: {
      background: 'transparent',
      border: '1px solid rgba(255,255,255,0.15)',
      color: 'rgba(255,255,255,0.6)',
    },
  };

  const handleClick = (e) => {
    if (disabled) return;
    addRipple(e);
    onClick?.(e);
  };

  return (
    <motion.button
      id={id}
      disabled={disabled}
      className={`btn-romantic relative px-7 py-4 rounded-2xl text-base font-medium select-none overflow-hidden ${className}`}
      style={styleMap[variant]}
      whileHover={disabled ? {} : { scale: 1.05, boxShadow: variant === 'primary' ? '0 8px 40px rgba(244,63,94,0.65), inset 0 1px 0 rgba(255,255,255,0.18)' : variant === 'fire' ? '0 8px 40px rgba(255,77,109,0.7)' : undefined }}
      whileTap={disabled ? {} : { scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 380, damping: 22 }}
      onClick={handleClick}
    >
      {ripples.map((r) => (
        <span
          key={r.id}
          className="ripple-effect"
          style={{ left: r.x - 12, top: r.y - 12, width: 24, height: 24 }}
        />
      ))}
      {children}
    </motion.button>
  );
}

// ─── Escaping button — moves away on hover OR tap ────────────────────────
const PADDING = 18;

export function EscapingButton({ containerRef, onClick, children, id, variant = 'secondary' }) {
  const btnRef    = useRef(null);
  const lastEsc   = useRef(0);
  const springX   = useSpring(0, { stiffness: 200, damping: 20, mass: 0.7 });
  const springY   = useSpring(0, { stiffness: 200, damping: 20, mass: 0.7 });

  const styleMap = {
    secondary: {
      background: 'rgba(255,255,255,0.075)',
      border: '1px solid rgba(255,255,255,0.13)',
      color: 'white',
      boxShadow: '0 2px 14px rgba(0,0,0,0.35)',
    },
    fire: {
      background: 'rgba(255,77,109,0.12)',
      border: '1px solid rgba(255,77,109,0.3)',
      color: '#fda4af',
      boxShadow: '0 2px 14px rgba(255,77,109,0.2)',
    },
  };

  const escape = useCallback(() => {
    const now = Date.now();
    if (now - lastEsc.current < 250) return;
    lastEsc.current = now;

    if (!containerRef.current || !btnRef.current) return;
    const box = containerRef.current.getBoundingClientRect();
    const btn = btnRef.current.getBoundingClientRect();
    const bw  = btn.width;
    const bh  = btn.height;

    // Available range inside container
    const maxX = box.width  - bw - PADDING;
    const maxY = box.height - bh - PADDING;
    const newX = PADDING + Math.random() * maxX;
    const newY = PADDING + Math.random() * maxY;

    // Convert to offset from natural (centered) position
    const originX = (box.width  - bw) / 2;
    const originY = (box.height - bh) / 2;

    springX.set(newX - originX);
    springY.set(newY - originY);
  }, [containerRef, springX, springY]);

  // Desktop proximity
  const handleMouseMove = useCallback((e) => {
    if (!btnRef.current) return;
    const r = btnRef.current.getBoundingClientRect();
    const cx = r.left + r.width  / 2;
    const cy = r.top  + r.height / 2;
    if (Math.hypot(e.clientX - cx, e.clientY - cy) < 90) escape();
  }, [escape]);

  // Mobile tap → escape instead of submitting
  const handleTouchStart = useCallback((e) => {
    e.preventDefault();
    escape();
  }, [escape]);

  return (
    <motion.button
      ref={btnRef}
      id={id}
      className="btn-romantic relative px-6 py-4 rounded-2xl text-base font-medium select-none overflow-hidden"
      style={{ ...styleMap[variant], x: springX, y: springY, touchAction: 'none' }}
      onMouseMove={handleMouseMove}
      onTouchStart={handleTouchStart}
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </motion.button>
  );
}
