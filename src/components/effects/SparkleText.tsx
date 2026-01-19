import { motion } from 'framer-motion';

interface SparkleTextProps {
  text: string;
  className?: string;
}

const SparkleText = ({ text, className = "" }: SparkleTextProps) => {
  return (
    <div className="relative inline-block">
      <motion.h1
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className={`relative z-10 font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-textsoft to-muted ${className}`}
      >
        {text}
      </motion.h1>
      
      {/* Accessibility Fix: Added aria-hidden */}
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 z-0 blur-lg bg-gradient-to-r from-royal/0 via-neonpink/30 to-royal/0"
        animate={{
          opacity: [0.3, 0.6, 0.3],
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </div>
  );
};

export default SparkleText;