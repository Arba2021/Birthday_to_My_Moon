import { useMotionValue, useSpring, useAnimationFrame } from 'framer-motion';
import { useEffect, useRef } from 'react';

export const useParallax = (multiplier: number = 10) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const targetX = useRef(0);
  const targetY = useRef(0);

  const springConfig = { damping: 50, stiffness: 300 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      const { innerWidth, innerHeight } = window;
      targetX.current = (e.clientX / innerWidth - 0.5) * multiplier;
      targetY.current = (e.clientY / innerHeight - 0.5) * multiplier;
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    return () => window.removeEventListener('pointermove', handlePointerMove);
  }, [multiplier]);

  // FIX: Replaced useRafLoop with useAnimationFrame
  useAnimationFrame(() => {
    mouseX.set(targetX.current);
    mouseY.set(targetY.current);
  });

  return { x: springX, y: springY };
};