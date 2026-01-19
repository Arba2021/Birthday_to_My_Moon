import { motion } from 'framer-motion';
import { finalDua } from '@/data/duas';
import { triggerHeartExplosion } from '@/components/effects/ConfettiBurst';
import { FaHeart, FaInfinity } from 'react-icons/fa';

const Finale = () => {
  return (
    <section className="min-h-screen flex flex-col justify-center items-center py-20 relative overflow-hidden" id="finale">
      
      {/* 1. Theme Background (Pure Rose - No Dark Patches) */}
      <div className="absolute inset-0 bg-gradient-to-b from-rose-900 to-rose-950 pointer-events-none" />
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 pointer-events-none" />
      
      {/* Soft Center Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-rose-500/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-3xl px-6 text-center">
        
        {/* Header Tag (Just Text, No Box) */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <span className="text-xs font-bold tracking-[0.3em] uppercase text-rose-200/60">
            One Last Prayer
          </span>
        </motion.div>

        {/* The Final Dua Text */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mb-16"
        >
           <p 
              className="text-4xl md:text-6xl text-white leading-[1.6] mb-10 drop-shadow-md" 
              dir="rtl"
              style={{ fontFamily: 'serif' }}
            >
              {finalDua.arabic}
            </p>
            
            {/* Elegant Divider */}
            <div className="w-24 h-px bg-gradient-to-r from-transparent via-rose-400/50 to-transparent mx-auto mb-10" />
            
            <p className="text-xl md:text-2xl text-pink-100/90 font-serif italic leading-relaxed">
              "{finalDua.translation}"
            </p>
        </motion.div>

        {/* The Giant Heart Button */}
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, type: "spring" }}
          className="mb-24"
        >
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={triggerHeartExplosion}
            className="group relative w-32 h-32 md:w-40 md:h-40 flex items-center justify-center mx-auto"
          >
            {/* Pulsing Aura */}
            <div className="absolute inset-0 bg-rose-500 rounded-full blur-2xl opacity-30 group-hover:opacity-60 animate-pulse duration-1000" />
            
            {/* The Heart */}
            <div className="relative z-10 w-full h-full bg-gradient-to-tr from-rose-600 to-pink-500 rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(244,63,94,0.4)] border-4 border-rose-400/30 group-hover:border-white/50 transition-all">
              <FaHeart className="text-5xl md:text-6xl text-white drop-shadow-lg" />
            </div>

            <span className="absolute -bottom-12 text-sm font-bold text-rose-200 uppercase tracking-widest group-hover:text-white transition-colors">
              Say Ameen
            </span>
          </motion.button>
        </motion.div>

        {/* Signature (The End) */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="space-y-6"
        >
          <p className="text-white/40 uppercase tracking-[0.3em] text-xs flex items-center justify-center gap-3">
            <span className="w-8 h-px bg-white/20" /> 
            Forever & Always 
            <span className="w-8 h-px bg-white/20" />
          </p>
          <h1 className="text-7xl md:text-9xl text-transparent bg-clip-text bg-gradient-to-b from-white to-rose-200" style={{ fontFamily: "'Great Vibes', cursive" }}>
            My Baraa
          </h1>
          <FaInfinity className="text-2xl text-rose-500/50 mx-auto mt-6" />
        </motion.div>

      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Great+Vibes&display=swap');
      `}</style>
    </section>
  );
};

export default Finale;