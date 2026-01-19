import { forwardRef, InputHTMLAttributes, ReactNode } from 'react';
import { motion } from 'framer-motion';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: ReactNode;
  label?: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ icon, label, error, className = "", ...props }, ref) => {
    return (
      <div className="w-full space-y-2">
        {label && (
          <label className="text-sm font-medium text-textsoft ml-1">
            {label}
          </label>
        )}
        
        <div className="relative group">
          {icon && (
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-textsoft/50 group-focus-within:text-neonpink transition-colors">
              {icon}
            </div>
          )}
          
          <input
            ref={ref}
            className={`
              w-full bg-surface/50 border border-white/10 rounded-xl py-3.5 
              ${icon ? 'pl-11' : 'pl-4'} pr-4
              text-white placeholder:text-textsoft/30
              focus:outline-none focus:border-neonpink/50 focus:bg-surface/80
              focus:ring-1 focus:ring-neonpink/50
              transition-all duration-300
              ${error ? 'border-red-500/50 focus:border-red-500' : ''}
              ${className}
            `}
            {...props}
          />
          
          <div className="absolute inset-0 rounded-xl bg-neonpink/5 opacity-0 group-focus-within:opacity-100 pointer-events-none transition-opacity duration-500" />
        </div>

        {error && (
          <motion.p 
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xs text-red-400 ml-1"
          >
            {error}
          </motion.p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;