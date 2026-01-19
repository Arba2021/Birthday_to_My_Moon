import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaHeart, FaQuoteLeft, FaSignature, FaChevronDown } from 'react-icons/fa';
// IMPORT YOUR REAL DATA HERE
import { halalGallery } from '@/data/letter'; 

// --- COMPONENTS ---

// 1. The Wax Seal Button
const WaxSeal = ({ onClick }: { onClick: () => void }) => (
  <motion.button
    onClick={onClick}
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.95 }}
    className="relative z-50 w-24 h-24 rounded-full bg-gradient-to-br from-rose-600 to-red-800 shadow-[0_10px_20px_rgba(0,0,0,0.5)] flex items-center justify-center border-4 border-rose-900/50"
  >
    <div className="absolute inset-2 rounded-full border border-rose-400/30 opacity-70" />
    <motion.div 
      animate={{ scale: [1, 1.1, 1] }} 
      transition={{ duration: 1.5, repeat: Infinity }}
    >
      <FaHeart className="text-3xl text-rose-200 drop-shadow-md" />
    </motion.div>
    <span className="absolute -bottom-10 text-[10px] text-white/50 uppercase tracking-widest font-bold whitespace-nowrap">
      Tap to Open
    </span>
  </motion.button>
);

// 2. The Closed Envelope
const Envelope = ({ onOpen }: { onOpen: () => void }) => (
  <motion.div
    initial={{ scale: 0.8, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    exit={{ scale: 1.5, opacity: 0, rotate: 5 }}
    transition={{ duration: 0.8 }}
    className="relative w-full max-w-lg aspect-[4/3] flex items-center justify-center perspective-1000"
  >
    <div className="absolute inset-0 bg-rose-950 rounded-lg shadow-2xl border border-white/5 overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" />
        <div className="absolute top-0 left-0 w-full h-1/2 bg-rose-900 origin-top transform skew-y-3 shadow-lg z-10 opacity-80" />
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-rose-900/80 z-20" />
    </div>
    <WaxSeal onClick={onOpen} />
  </motion.div>
);

// 3. The Opened Letter (With Scroll Fix)
const OpenedLetter = () => {
  // We use your real data here
  const { reasonsILoveYou } = halalGallery;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 50 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.3 }}
      // Fixed height on mobile so it doesn't overflow the screen
      className="relative w-full max-w-2xl h-[75vh] md:h-auto bg-white/10 backdrop-blur-xl border border-white/20 rounded-[2rem] shadow-2xl overflow-hidden flex flex-col"
    >
      {/* Decorative Glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-rose-500/20 rounded-full blur-[80px] pointer-events-none" />
      
      {/* Sticky Header */}
      <div className="relative z-20 text-center pt-8 pb-4 bg-gradient-to-b from-black/20 to-transparent shrink-0">
        <FaQuoteLeft className="text-3xl text-rose-200/20 mx-auto mb-2" />
        <h2 className="text-3xl md:text-5xl text-white drop-shadow-md" style={{ fontFamily: "'Great Vibes', cursive" }}>
          My Dearest Baraa
        </h2>
      </div>

      {/* SCROLLABLE CONTENT AREA */}
      <div className="relative z-10 flex-1 overflow-y-auto px-6 md:px-12 pb-8 custom-scrollbar">
        
        {/* Intro */}
        <p className="text-lg text-pink-100/90 leading-relaxed font-serif italic text-center mb-6">
          "Every time I look at you, I realize that the moon is jealous of your light. Here are the reasons why you are my everything..."
        </p>

        {/* Divider */}
        <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-rose-300/50 to-transparent mx-auto my-6" />

        {/* The 20 Reasons List */}
        <div className="space-y-4 pb-4">
          {reasonsILoveYou.map((reason, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + (i * 0.05) }} // Faster stagger so she doesn't wait
              className="flex items-start gap-3 bg-black/20 p-3 rounded-xl border border-white/5 hover:bg-rose-900/20 transition-colors"
            >
              <FaHeart className="text-rose-400 mt-1 shrink-0 text-xs" />
              <span className="text-pink-100/80 text-sm md:text-base font-medium font-serif leading-snug">
                {reason}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Signature */}
        <div className="pt-8 text-center opacity-80 pb-8">
          <p className="text-2xl text-rose-200" style={{ fontFamily: "'Great Vibes', cursive" }}>
            Yours, Forever.
          </p>
          <div className="text-xs text-white/30 uppercase tracking-widest mt-2 flex items-center justify-center gap-2">
            <FaSignature /> Always & Forever
          </div>
        </div>

      </div>
      
      {/* Scroll Hint (Fades at bottom) */}
      <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-rose-950/80 to-transparent pointer-events-none z-30 flex justify-center items-end pb-2">
        <motion.div 
            animate={{ y: [0, 5, 0], opacity: [0.5, 1, 0.5] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="text-white/50 text-xs flex flex-col items-center"
        >
            <span className="text-[9px] uppercase tracking-widest mb-1">Scroll</span>
            <FaChevronDown />
        </motion.div>
      </div>

    </motion.div>
  );
};

// --- MAIN COMPONENT ---
const LoveLetter = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="min-h-full flex flex-col items-center justify-center py-4 px-2 md:px-4">
      
      <AnimatePresence mode="wait">
        {!isOpen ? (
          <Envelope key="envelope" onOpen={() => setIsOpen(true)} />
        ) : (
          <OpenedLetter key="letter" />
        )}
      </AnimatePresence>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Great+Vibes&display=swap');
        
        /* Custom Scrollbar for the letter */
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(244, 63, 94, 0.5);
          border-radius: 10px;
        }
      `}</style>
    </section>
  );
};

export default LoveLetter;