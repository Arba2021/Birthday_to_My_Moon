import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { duas, finalDua } from '@/data/duas';
import { triggerConfetti } from '@/components/effects/ConfettiBurst';
import { FaTimes, FaHeart, FaStarAndCrescent } from 'react-icons/fa';



const DuaCardItem = ({ dua, index, onClick }: { dua: any, index: number, onClick: () => void }) => {
  return (
    <motion.button
      onClick={onClick}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      whileTap={{ scale: 0.98 }}
      // THE FIX: rounded-2xl (Standard), bg-white/5 (Glass), No dark fill
      className="group relative w-full rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 p-5 flex items-center gap-5 overflow-hidden transition-all duration-300 hover:bg-white/10"
    >
      {/* Icon Circle */}
      <div className="w-12 h-12 shrink-0 rounded-full bg-white/5 flex items-center justify-center border border-white/5 group-hover:scale-110 transition-transform">
         <FaStarAndCrescent className="text-lg text-pink-200/80" />
      </div>

      {/* Text Content */}
      <div className="flex flex-col items-start text-left z-10 flex-1">
        <h3 className="text-lg text-white font-serif tracking-wide group-hover:text-pink-200 transition-colors">
          {dua.title}
        </h3>
        <p className="text-[10px] text-white/40 uppercase tracking-widest font-medium mt-1">
          Tap to Read
        </p>
      </div>

      {/* Arrow */}
      <div className="text-white/20 group-hover:text-white/60 transition-colors text-xl">
        ›
      </div>
    </motion.button>
  );
};

// 2. The Modal (Matching Rose Theme)
const DuaModal = ({ dua, onClose }: { dua: any, onClose: () => void }) => {
  const [isSent, setIsSent] = useState(false);

  const handleAmeen = () => {
    triggerConfetti();
    setIsSent(true);
    setTimeout(onClose, 2000); 
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: 20 }}
      // THE FIX: Deep Rose Glass Background (No Black Box)
      className="relative w-[90%] max-w-md bg-rose-950/90 backdrop-blur-2xl border border-white/10 rounded-[2rem] p-8 shadow-2xl overflow-hidden text-center"
      onClick={(e) => e.stopPropagation()} 
    >
      {/* Close Button */}
      <button 
        onClick={onClose}
        className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white/50 hover:bg-rose-600 hover:text-white transition-all z-20"
      >
        <FaTimes />
      </button>

      {!isSent ? (
        <div className="relative z-10 flex flex-col items-center">
          {/* Header Tag */}
          <span className="px-3 py-1 rounded-full border border-white/10 bg-white/5 text-[10px] text-pink-200 uppercase tracking-widest mb-6">
            {dua.title}
          </span>

          {/* Arabic Text */}
          <p className="text-2xl md:text-3xl text-white leading-loose mb-6 font-serif w-full drop-shadow-sm" dir="rtl">
            {dua.arabic}
          </p>

          <div className="w-12 h-px bg-white/10 mx-auto mb-6" />

          {/* Translation */}
          <p className="text-white/80 italic font-serif text-lg leading-relaxed mb-10">
            "{dua.translation}"
          </p>

          {/* Action Button */}
          <button
            onClick={handleAmeen}
            className="w-full py-4 rounded-xl bg-gradient-to-r from-rose-700 to-pink-600 text-white font-bold tracking-widest shadow-lg hover:scale-[1.01] active:scale-95 transition-all"
          >
            SAY AMEEN
          </button>
        </div>
      ) : (
        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          className="py-12 flex flex-col items-center justify-center"
        >
          <motion.div 
            initial={{ scale: 0 }} animate={{ scale: 1 }}
            className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mb-4 border border-green-500/30"
          >
            <FaHeart className="text-2xl text-green-400" />
          </motion.div>
          <h3 className="text-xl text-white font-serif mb-2">Ameen.</h3>
          <p className="text-white/50 text-sm">May Allah accept it.</p>
        </motion.div>
      )}
    </motion.div>
  );
};

// --- MAIN COMPONENT ---
const Duas = () => {
  const [selectedDua, setSelectedDua] = useState<any | null>(null);

  return (
    <section className="min-h-screen py-24 px-4 flex flex-col items-center relative overflow-hidden" id="duas">
      
      {/* 1. Theme Background (PURE ROSE - Removed the Black "Box" effect) */}
      <div className="absolute inset-0 bg-gradient-to-b from-rose-900 via-rose-950 to-black pointer-events-none" />
      
      {/* 2. Header */}
      <div className="relative z-10 text-center mb-12">
        <h2 className="text-6xl text-white drop-shadow-md mb-2" style={{ fontFamily: "'Great Vibes', cursive" }}>
          My Prayers
        </h2>
        <p className="text-pink-200/60 uppercase tracking-[0.3em] text-[10px] font-medium">
          Whispers to the Heavens for You
        </p>
      </div>

      {/* 3. The List (Clean Cards, No Outer Box) */}
      <div className="relative z-10 flex flex-col gap-4 w-full max-w-md mb-16 px-2">
        {duas.map((dua, index) => (
          <DuaCardItem 
            key={dua.id} 
            dua={dua} 
            index={index} 
            onClick={() => setSelectedDua(dua)} 
          />
        ))}
      </div>

      {/* 4. The Ultimate Dua (Floating Heart) */}
      <div className="relative z-10 pb-10">
        <motion.button
          onClick={() => setSelectedDua(finalDua)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative group flex flex-col items-center justify-center"
        >
          <div className="absolute inset-0 bg-rose-500 rounded-full blur-2xl opacity-20 group-hover:opacity-40 animate-pulse" />
          
          <div className="relative w-16 h-16 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/10 z-10 shadow-lg">
             <FaHeart className="text-2xl text-rose-400 drop-shadow-lg group-hover:text-white transition-colors" />
          </div>
          
          <span className="mt-3 text-[10px] text-white/40 uppercase tracking-widest font-bold whitespace-nowrap group-hover:text-rose-200 transition-colors">
            The Ultimate Dua
          </span>
        </motion.button>
      </div>

      {/* 5. Modal Overlay */}
      <AnimatePresence>
        {selectedDua && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={() => setSelectedDua(null)}>
            <DuaModal 
              dua={selectedDua} 
              onClose={() => setSelectedDua(null)} 
            />
          </div>
        )}
      </AnimatePresence>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Great+Vibes&display=swap');
      `}</style>
    </section>
  );
};

export default Duas;