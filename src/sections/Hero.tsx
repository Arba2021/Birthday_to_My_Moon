import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FloatingHearts from "@/components/effects/FloatingHearts";

/**
 * HERO SECTION
 * Fixes: Prevents blank screen on 9th option click.
 */

// --- CONFIGURATION ---
const MENU_ITEMS = [
  { id: "poems", label: "Read My Poems", icon: "✨", sub: "Words from my soul" },
  { id: "letter", label: "Love Letter", icon: "💌", sub: "My heart on paper" },
  { id: "timeline", label: "Our Story", icon: "📖", sub: "How forever began" },
  { id: "play", label: "Let's Play", icon: "🎶", sub: "Fun & Games" },
  { id: "surprises", label: "Surprises", icon: "🎁", sub: "Just for you" },
  { id: "playlist", label: "Our Melodies", icon: "🎵", sub: "Soundtrack of Us" }, 
  { id: "duas", label: "My Prayers", icon: "🤲", sub: "Blessed wishes" },
  { id: "forever", label: "Forever", icon: "∞", sub: "The Promise" },
  
  // ✅ 9th Option
  { id: "my_heart", label: "Baraa", icon: "❤️", sub: "My Everything", special: true },
];

const TEXT = {
  title: "Happy Birthday Baraa",
  subtitle: "Noor of my eyes",
  cta: "Open my heart", 
};

// --- COMPONENT 1: STANDARD ITEM ---
const NecklaceItem = ({ item, index, onSelect }: any) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, type: "spring", stiffness: 100 }}
      className="relative flex flex-col items-center z-10 w-full"
    >
      <motion.div 
        initial={{ height: 0 }}
        animate={{ height: index === 0 ? 30 : 20 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className="w-[2px] bg-white/20"
      />

      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={() => onSelect(item.id)}
        className="group relative flex items-center gap-4 w-[90vw] max-w-sm p-3 pr-5
                   bg-white/5 border border-white/10 backdrop-blur-md rounded-full 
                   hover:bg-rose-900/40 hover:border-rose-200/30 transition-all duration-300"
      >
        <div className="w-12 h-12 rounded-full flex items-center justify-center
                        bg-gradient-to-br from-rose-500 to-purple-700 
                        shadow-lg border border-white/10 group-hover:scale-105 transition-transform">
          <span className="text-xl filter drop-shadow-md">{item.icon}</span>
        </div>

        <div className="flex flex-col items-start text-left flex-grow pl-2">
          <span className="text-white font-semibold text-base group-hover:text-pink-100">
            {item.label}
          </span>
          <span className="text-pink-200/60 text-xs italic">
            {item.sub}
          </span>
        </div>

        <span className="text-rose-300 text-xs group-hover:translate-x-1 transition-transform">
          ❤
        </span>
      </motion.button>
    </motion.div>
  );
};

// --- COMPONENT 2: SPECIAL HEART ITEM (FIXED) ---
const SpecialHeartItem = ({ item, index, onSelect, isRevealed }: any) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.1 + 0.2, type: "spring", bounce: 0.5 }}
      className="relative flex flex-col items-center z-10 w-full mt-2"
    >
      <div className="w-[2px] h-8 bg-gradient-to-b from-white/20 to-rose-500/50" />

      <motion.button
        // ✅ Clicking this now triggers the Text Change, NOT a blank page
        onClick={() => onSelect(item.id)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`group relative flex items-center gap-4 w-[90vw] max-w-sm p-4
                   rounded-2xl shadow-[0_0_30px_rgba(225,29,72,0.4)]
                   transition-all duration-300 border
                   ${isRevealed 
                      ? "bg-rose-900/80 border-rose-400 shadow-[0_0_50px_rgba(225,29,72,0.8)]" 
                      : "bg-rose-900/40 border-rose-500/50 hover:shadow-[0_0_50px_rgba(225,29,72,0.6)]"
                   }`}
      >
        <div className="w-16 h-16 rounded-full flex items-center justify-center
                        bg-rose-600 shadow-inner border border-white/20">
           <motion.span 
             className="text-3xl"
             animate={{ scale: [1, 1.4, 1] }}
             transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
           >
             ❤️
           </motion.span>
        </div>

        {/* Text Area (Swaps based on 'isRevealed' state) */}
        <div className="flex flex-col items-start text-left flex-grow pl-2 h-12 justify-center relative overflow-hidden">
           
           {/* State 1: Default Text */}
           <div className={`absolute inset-0 flex flex-col justify-center transition-all duration-500 
                            ${isRevealed ? "opacity-0 -translate-y-4" : "opacity-100 translate-y-0"}`}>
              <span className="text-white text-xl font-bold font-serif">{item.label}</span>
              <span className="text-rose-200/70 text-xs uppercase tracking-widest">{item.sub}</span>
           </div>

           {/* State 2: Revealed Text (After Click) */}
           <div className={`absolute inset-0 flex items-center transition-all duration-500 
                            ${isRevealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
              <span className="text-rose-200 font-serif italic text-lg drop-shadow-md">
                "Here is my heart"
              </span>
           </div>
        </div>
      </motion.button>
    </motion.div>
  );
};


// --- MAIN HERO COMPONENT ---
interface HeroProps {
  onNavigate: (viewId: string) => void;
}

export default function Hero({ onNavigate }: HeroProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  
  // ✅ New State: Tracks if the 9th option text is revealed
  const [heartRevealed, setHeartRevealed] = useState(false);

  const handleSelect = (id: string) => {
    // ✅ CRITICAL FIX: If it's the Heart Option, DO NOT NAVIGATE.
    if (id === "my_heart") {
      setHeartRevealed(!heartRevealed); // Toggle text
      return; // Stop here!
    }

    // Normal navigation for other items
    setSelectedId(id);
    setTimeout(() => onNavigate(id), 600);
  };

  return (
    <section className="relative h-[100dvh] w-full overflow-hidden flex flex-col items-center text-center">
      
      <div className="absolute inset-0 bg-gradient-to-b from-rose-950 via-slate-950 to-rose-950" />
      <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] mix-blend-overlay" />
      <FloatingHearts />

      <div className="relative z-20 w-full h-full overflow-y-auto overflow-x-hidden no-scrollbar">
        <div className="min-h-full flex flex-col items-center pb-32">
          
          <motion.div
            animate={{ scale: isOpen ? 0.85 : 1, opacity: isOpen ? 0.8 : 1 }}
            transition={{ duration: 0.6 }}
            className="mt-24 mb-10 relative z-30 px-4" 
          >
            <h1 className="text-[4rem] md:text-[6rem] text-transparent bg-clip-text bg-gradient-to-b from-pink-100 to-rose-200/50 leading-none drop-shadow-[0_0_25px_rgba(255,20,147,0.3)]"
                style={{ fontFamily: "'Great Vibes', cursive" }}>
              {TEXT.title}
            </h1>
            <p className="text-pink-200/70 text-xs md:text-sm tracking-[0.4em] uppercase mt-4 font-medium">
              {TEXT.subtitle}
            </p>
          </motion.div>

          <div className="relative z-50 flex flex-col items-center justify-center w-full">
             <div className="relative">
                <div className="absolute inset-0 bg-rose-500/30 blur-2xl rounded-full" />
                <motion.button
                    onClick={() => setIsOpen(!isOpen)}
                    whileTap={{ scale: 0.9 }}
                    animate={{ scale: isOpen ? 1 : [1, 1.15, 1, 1.15, 1] }}
                    transition={{ duration: 1.2, repeat: Infinity, times: [0, 0.15, 0.3, 0.45, 1], ease: "easeInOut" }}
                    className={`
                      relative w-28 h-28 rounded-full flex items-center justify-center text-6xl shadow-[0_10px_40px_rgba(0,0,0,0.5)] 
                      border-[3px] border-white/20 backdrop-blur-md transition-all duration-500
                      ${isOpen ? 'bg-gradient-to-b from-white/10 to-transparent' : 'bg-gradient-to-tr from-rose-600 to-pink-500'}
                    `}
                >
                  <span className="filter drop-shadow-md">
                    {isOpen ? "🐱" : "💗"}
                  </span>
                </motion.button>
             </div>
             
             <AnimatePresence>
               {!isOpen && (
                 <motion.p 
                   initial={{ opacity: 0, y: -10 }} 
                   animate={{ opacity: 1, y: 0 }}
                   exit={{ opacity: 0 }}
                   className="absolute top-32 text-2xl text-white/90 drop-shadow-lg"
                   style={{ fontFamily: "'Great Vibes', cursive" }} 
                 >
                   {TEXT.cta}
                 </motion.p>
               )}
             </AnimatePresence>
          </div>

          <AnimatePresence>
            {isOpen && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center w-full mt-2"
              >
                {MENU_ITEMS.map((item, i) => {
                  if (item.special) {
                    return (
                      <SpecialHeartItem 
                        key={item.id} 
                        item={item} 
                        index={i} 
                        onSelect={handleSelect}
                        isRevealed={heartRevealed} // ✅ Pass the state here
                      />
                    );
                  }
                  return (
                    <NecklaceItem 
                      key={item.id} 
                      item={item} 
                      index={i} 
                      onSelect={handleSelect} 
                    />
                  );
                })}
                
                <motion.div 
                   initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}
                   className="mt-4 text-2xl text-rose-300/50"
                >
                  ∞
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </div>

      <AnimatePresence>
        {selectedId && (
          <motion.div
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             className="absolute inset-0 z-[100] bg-rose-950 flex items-center justify-center"
          >
             <div className="relative">
                <div className="w-24 h-24 border-4 border-rose-500/30 border-t-rose-400 rounded-full animate-spin" />
                <div className="absolute inset-0 flex items-center justify-center text-3xl">❤️</div>
             </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Great+Vibes&display=swap');
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </section>
  );
}