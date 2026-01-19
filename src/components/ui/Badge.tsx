import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface BadgeProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'glass';
  className?: string;
  onClick?: () => void;
}

const Badge = ({ 
  children, 
  variant = 'glass', 
  className = "", 
  onClick 
}: BadgeProps) => {
  
  const variants = {
    primary: "bg-neonpink text-white shadow-[0_0_10px_rgba(255,79,216,0.4)] border-transparent",
    secondary: "bg-royal text-white shadow-[0_0_10px_rgba(124,58,237,0.4)] border-transparent",
    outline: "bg-transparent border-white/20 text-textsoft hover:text-white hover:border-white/40",
    glass: "bg-white/5 border-white/10 text-neonpink backdrop-blur-sm"
  };

  const Component = onClick ? motion.button : motion.span;

  return (
    <Component
      onClick={onClick}
      whileHover={onClick ? { scale: 1.05 } : {}}
      whileTap={onClick ? { scale: 0.95 } : {}}
      className={`
        inline-flex items-center justify-center px-3 py-1 
        rounded-full text-[10px] md:text-xs font-bold uppercase tracking-widest border
        transition-all duration-300
        ${variants[variant]}
        ${className}
      `}
    >
      {children}
    </Component>
  );
};

export default Badge;