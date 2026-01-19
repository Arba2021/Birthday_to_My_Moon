import { Variants } from 'framer-motion';

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay: number = 0) => ({
    opacity: 1, 
    y: 0,
    transition: { 
      delay,
      duration: 0.8, 
      ease: [0.22, 1, 0.36, 1] 
    }
  })
};

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1
    }
  }
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

export const hoverLift = {
  initial: { y: 0, scale: 1 },
  hover: { 
    y: -8, 
    scale: 1.02,
    transition: { type: "spring", stiffness: 400, damping: 10 }
  }
};