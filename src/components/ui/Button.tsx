import { motion, HTMLMotionProps } from 'framer-motion';
import { ReactNode } from 'react';

interface ButtonProps extends HTMLMotionProps<"button"> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  icon?: ReactNode;
  className?: string;
}

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  href,
  icon,
  className = "",
  ...props
}: ButtonProps) => {
  const baseStyles = "relative inline-flex items-center justify-center gap-2 rounded-full font-bold transition-all duration-300 overflow-hidden z-10";
  
  const variants = {
    primary: "bg-gradient-to-r from-royal to-neonpink text-white shadow-[0_0_20px_rgba(124,58,237,0.4)] hover:shadow-[0_0_30px_rgba(255,79,216,0.6)] border border-transparent",
    secondary: "bg-white/5 border border-white/10 text-white hover:bg-white/10 hover:border-neonpink/30 backdrop-blur-sm",
    ghost: "bg-transparent text-textsoft hover:text-white hover:bg-white/5"
  };

  const sizes = {
    sm: "px-4 py-2 text-xs",
    md: "px-6 py-3 text-sm",
    lg: "px-8 py-4 text-lg"
  };

  const combinedClasses = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;

  const content = (
    <>
      {icon && <span className="text-lg">{icon}</span>}
      {children}
      {variant === 'primary' && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-[shimmer_2s_infinite] pointer-events-none" />
      )}
    </>
  );

  if (href) {
    return (
      <motion.a
        href={href}
        whileHover={{ scale: 1.02, y: -2 }}
        whileTap={{ scale: 0.95 }}
        className={combinedClasses}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.95 }}
      className={combinedClasses}
      {...props}
    >
      {content}
    </motion.button>
  );
};

export default Button;