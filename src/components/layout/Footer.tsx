import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <footer className="relative z-10 w-full py-8 flex justify-center items-center overflow-hidden">
      
      {/* Optional: Very faint glow at the bottom to blend */}
      <div className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-t from-rose-950/20 to-transparent pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="flex flex-col items-center gap-2"
      >
        {/* The Only Text You Wanted */}
        <p className="text-rose-200/50 font-serif italic tracking-[0.15em] text-xs md:text-sm">
          in this dunya and the next inshaAllah
        </p>
        
        {/* Tiny Infinity Symbol (Optional, adds a nice touch) */}
        <span className="text-rose-500/30 text-[10px]">∞</span>
      </motion.div>

    </footer>
  );
};

export default Footer;