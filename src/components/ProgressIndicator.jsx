import { motion } from 'motion/react';

export default function ProgressIndicator({ current, total }) {
  return (
    <div className="flex flex-col items-center gap-3">
      {/* Text */}
      <motion.span
        key={current}
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-sm font-medium text-white/50 tracking-widest uppercase"
      >
        Question {current} / {total}
      </motion.span>

      {/* Dots */}
      <div className="flex items-center gap-2">
        {Array.from({ length: total }, (_, i) => {
          const idx = i + 1;
          const done = idx < current;
          const active = idx === current;

          return (
            <motion.div
              key={idx}
              initial={false}
              animate={{
                scale: active ? 1.3 : 1,
                opacity: done ? 1 : active ? 1 : 0.3,
              }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="rounded-full"
              style={{
                width: active ? 28 : 10,
                height: 10,
                background: done
                  ? 'linear-gradient(90deg, #f43f5e, #fb7185)'
                  : active
                  ? 'linear-gradient(90deg, #f43f5e, #fda4af)'
                  : 'rgba(255,255,255,0.25)',
                transition: 'width 0.3s ease',
                borderRadius: 999,
                boxShadow: active ? '0 0 12px rgba(244,63,94,0.6)' : 'none',
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
