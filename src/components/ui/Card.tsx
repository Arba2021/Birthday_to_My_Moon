import { motion, HTMLMotionProps } from 'framer-motion';
import { ReactNode } from 'react';

interface CardProps extends HTMLMotionProps<"div"> {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  glow?: boolean;
}

const Card = ({ 
  children, 
  className = "", 
  hover = false,
  glow = false,
  ...props 
}: CardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      whileHover={hover ? { y: -5 } : {}}
      whileTap={hover ? { scale: 0.98 } : {}}
      className={`
        relative overflow-hidden rounded-3xl backdrop-blur-xl
        bg-surface/40 border border-white/5 
        ${glow ? 'shadow-[0_0_30px_rgba(124,58,237,0.15)] border-royal/20' : ''}
        ${className}
      `}
      {...props}
    >
      {glow && (
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-neonpink/20 blur-[60px] rounded-full pointer-events-none" />
      )}
      
      <div className="relative z-10">
        {children}
      </div>

      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
    </motion.div>
  );
};

export default Card;