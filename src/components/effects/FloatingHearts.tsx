import { motion, useReducedMotion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { FaHeart } from 'react-icons/fa';

const FloatingHearts = () => {
  const [hearts, setHearts] = useState<{ id: number; left: number; duration: number; delay: number }[]>([]);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    // Mobile Fix: Reduced count to 10 to save battery
    const newHearts = Array.from({ length: 10 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      duration: Math.random() * 10 + 10,
      delay: Math.random() * 5
    }));
    setHearts(newHearts);
  }, []);

  // Accessibility: Don't render animations if user prefers reduced motion
  if (shouldReduceMotion) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          initial={{ y: '110vh', opacity: 0 }}
          animate={{ y: '-10vh', opacity: [0, 0.4, 0] }}
          transition={{
            duration: heart.duration,
            repeat: Infinity,
            delay: heart.delay,
            ease: "linear"
          }}
          style={{
            position: 'absolute',
            left: `${heart.left}%`,
          }}
        >
          {/* Mobile Fix: Removed blur to save GPU, text-xl is plenty big for mobile */}
          <FaHeart className="text-neonpink/20 text-xl" />
        </motion.div>
      ))}
    </div>
  );
};

export default FloatingHearts;